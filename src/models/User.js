import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        phoneNumber: {type: Number, required: true},
        resetToken: String,
        resetTokenExpiration: Date
    },
    { timestamps: true }
)

const User = mongoose.model("User", userSchema);

export default User;
