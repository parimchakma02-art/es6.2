import User from "../models/User.js";
export const findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
}

export const createUser = async (email, password, name, phoneNumber) => {
    const user = new User({ email, password, name, phoneNumber });
    await user.save();
    return user;
};

export const updateResetToken = async (userId, resetToken, resetTokenExpiry) => {
    await User.findByIdAndUpdate(userId, {
        resetToken,
        resetTokenExpiry
    }, { new: true });
}

export const updateUserPassword = async (userId, newPassword) => {
    await User.findByIdAndUpdate(userId, {
        password: newPassword,
        resetToken: null,
        resetTokenExpiry: null
    }, { new: true });
}

export const findUserProfileById = (id) => {
    return User.findById(id).select("name email");
}