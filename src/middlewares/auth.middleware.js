import { verifyToken } from '../utils/jwt.util.js';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        req.user = verifyToken(token);
        console.log("Authenticated user:", req.user);
        return next();
    } catch (error) {
        console.log("Token verification failed:", error);
        return res.status(401).json({ error: "Unauthorized" });
    }
}

export default authMiddleware;