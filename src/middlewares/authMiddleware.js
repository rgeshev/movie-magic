import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const token = req.cookies.auth;

    if(!token) {
        return next();
    }

    try {
        const decodedToken =jwt.verify(token, 'SECRETGOESHERE');
        
        req.user = decodedToken;
    } catch (err) {
        console.log('Invalid token:', err);
        return res.status(401).send('Unauthorized: Invalid token');
    }

    next();
}