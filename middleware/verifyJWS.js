import jwt from 'jsonwebtoken';

const verifyJWS = (req, res, next) => {
    // const authHeader = req.headers.authorization || req.headers.Authorization;

    // if(!authHeader?.startsWith('Bearer')) return res.status(401).json({'message' : 'Cannot verify, log again.'});

    // const token = authHeader.split(" ")[1];

    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    //     if(err) return res.status(401).json({ 'message' : 'Login/Register to get the data.', 'error': err.message });
    //     req.username = decoded.username;
    //     req.roles = decoded.roles;
    //     next();
    // });

    if(!req.cookies?.jwt) return res.status(404).json({ 'Message' : 'Cannot find the jwt cookie in req cookies' });
    const refreshToken = req.cookies.jwt;

    if(!refreshToken) return res.status(401).json({'message' : 'Please login again'});

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        req.username = decoded.username;
        req.roles = decoded.roles;
        if(err) return res.status(400).json({ message: err.message })
    });

    next();
}

export default verifyJWS;