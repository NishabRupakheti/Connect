const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "This email already exists"]
    },
    userName: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "This username already exists"]
    },
    passwordHash: {
        type: String,
        required: true
    }
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    if (!this.isModified("passwordHash") || !this.passwordHash) return next();

    try {
        const saltRounds = 10;
        this.passwordHash = await bcrypt.hash(this.passwordHash, saltRounds);
        next(); 
    } catch (err) {
        console.error("Error hashing the password:", err);
        next(err); 
    }
});

module.exports = mongoose.model('User', UserSchema);
