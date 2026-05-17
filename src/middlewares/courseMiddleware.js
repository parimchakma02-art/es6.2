import { verifyToken } from "../utils/jwt.util.js";

const courseMiddleware = (req, res, next) => {
    console.log('Cookies:', req.cookies);
  console.log('Auth header:', req.headers.authorization);
  
  let token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
  console.log('Extracted token:', token ? 'present' : 'missing');
  
  //let token = null;

  // From Cookie
  if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // From Authorization Header
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  
  }

  try {
    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default courseMiddleware;