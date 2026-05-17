import jwt from "jsonwebtoken";

const authSecret = process.env.AUTH_SECRET;

export const signAuthToken = (payload) => {
    return jwt.sign(payload, authSecret, { expiresIn: "1week" });
  
}

export const signResetToken = (payload) => {
    return jwt.sign(payload, authSecret, { expiresIn: "16m" });
}

export const verifyResetToken = (token) => {
    return jwt.verify(token, authSecret);
}

export const verifyToken = (token) => {
    return jwt.verify(token, authSecret);
}
