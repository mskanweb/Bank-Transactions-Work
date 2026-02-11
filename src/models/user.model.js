const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required for creating a user'],
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid Email address'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name is required for creating an account']
    },
    password: {
        type: String,
        required: [true, 'Password is required for creating an account'],
        minlength: [6, 'Password should contain more than 6 characters'],
        select: false
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function() {
    if (!this.isModified('password')) 
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
    if (!this.password) return false;
    return bcrypt.compare(password, this.password);
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
