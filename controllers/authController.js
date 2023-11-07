import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userSchema from '../models/User.js';
import sendVerificationMail from '../services/email.js';

const handleRegister = async (req, res) => {
    const { username, password, email } = req.body;

    if(!username || !password || !email) return res.status(400).json({'message' : 'username and password required'});

    const foundOne = await userSchema.findOne({ username }).exec();

    if(foundOne) return res.status(401).json({'message' : `Username ${username} already exists.`});

    const newUser = await userSchema.create({
        refreshToken: '',
        username, 
        password: await bcrypt.hash(password, 10),
        email
    });

    const refreshToken = jwt.sign(
        { username, roles: newUser.roles },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    newUser.refreshToken = refreshToken;
    await newUser.save();

    const accessToken = jwt.sign(
        {username, roles: newUser.roles},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn : '1d' }
    );

    sendVerificationMail(newUser.email, newUser._id, newUser.username);

    // res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ 'accessToken' : accessToken });

}

const handleLogin = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) return res.status(400).json({'message' : 'require user and password to login'});

    const foundOne = await userSchema.findOne({ username }).exec();

    if(!foundOne) return res.status(400).json({'message' : 'user not found.'})

    const match = await bcrypt.compare(password, foundOne.password);
    
    if(match) {

        if(!foundOne.verified) return res.status(409).json({'message' : 'Verify the email to signin'});

        const accessToken = jwt.sign(
            { username, roles: foundOne.roles },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        const refreshToken = jwt.sign(
            { username, roles: foundOne.roles },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        
        foundOne.refreshToken = refreshToken;
        await foundOne.save();

        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        res.json({ accessToken });

    }else {
        return res.status(409).json({'message' : 'Username or password dose not matched.'});
    }

}


export default {handleRegister, handleLogin};