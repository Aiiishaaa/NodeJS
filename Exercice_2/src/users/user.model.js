const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
    active: { type: Boolean, default: false },
    password: { type: String, required: true },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});
const User = mongoose.model("user", userSchema);
module.exports = User;

const bcrypt = require("bcryptjs");
module.exports.hashPassword = async(password) => {
    try {
        const salt = await bcrypt.genSalt(10); // 10 rounds
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error("Hashing failed", error);
    }
};