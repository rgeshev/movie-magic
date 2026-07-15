export function authMiddleware(req, res, next) {
    // TODO: Implement
    console.log('Auth middleware' + req.url);
    next();
}