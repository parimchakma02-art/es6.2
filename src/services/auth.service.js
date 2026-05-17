
import bcrypt from "bcryptjs";
import * as userRepo from "../repositories/auth.repository.js";
import {  signAuthToken, signResetToken, verifyResetToken } from "../utils/jwt.util.js"
import {sendPasswordResetEmail} from "../utils/mailer.js"

export const registerService = async (email, password , name, phoneNumber ) => {
    // check if existing
    const existingUser = await userRepo.findUserByEmail(email);

    
    if (existingUser) {
        throw new Error("User already exists", 409);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepo.createUser(email, hashedPassword, name, phoneNumber);
     const token = signAuthToken({ id: user._id, email: user.email, name: user.name });
    return { user, token };
};
export const loginService = async (email, password ) => {
    // check if existing
    const user = await userRepo.findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password", 401);
    }

    const ok = await bcrypt.compare(password, user.password);
    if(!ok) {
         throw new Error("Invalid email or password", 401);
    }

    const token = signAuthToken({ id:user._id, email: user.email, name: user.name});
    return { id:user._id, email: user.email, token}
    console.log(user);
}
export const requestReset = async (email) => {
    const user = await userRepo.findUserByEmail(email);

    if (!user) {
        // For security, we don't reveal whether the email exists
        return;
    }

    const resetToken = signResetToken({ id: user._id.toString(), anything: "anything" });
   

    await userRepo.updateResetToken(user._id, resetToken, null);

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    await sendPasswordResetEmail(user.email, resetLink);
}

export const resetUserPassword = async (token, newPassword) => {
    let payload = null;
  try {
    payload = verifyResetToken(token);
    console.log("Token payload:", payload);
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Invalid or expired token");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await userRepo.updateUserPassword(payload.id, hashedPassword);
};

export const getProfile = async (userId) => {
    if(!userId) {
        throw new Error("User id is required", 400);
    }

    const user = await userRepo.findUserProfileById(userId);
    if (!user) {
        throw new Error("User not found", 404);
    }

    return { id: user._id, name: user.name, email: user.email };
}
