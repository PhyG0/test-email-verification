import jwt from 'jsonwebtoken';
import userSchema from '../models/User.js';

const handleRefresh = async (req, res) => {
    const refreshToken = req.cookies.jwt;

    if(!refreshToken) return res.status(401).json({'message' : 'Please login again'});
    const foundOne = await userSchema.findOne({ refreshToken }).exec();

    if(!foundOne) return res.status(403).json({'message' : 'Something went wrong. Please try again'});

    jwt.verify(refreshToken, 
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(decoded.username != foundOne.username) return res.status(403).json({'message' : 'Token dose not matched.'});

            const accessToken = jwt.sign(
                {username: decoded.username, roles: foundOne.roles },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            res.json({accessToken});
        }
    );
}

export default { handleRefresh };