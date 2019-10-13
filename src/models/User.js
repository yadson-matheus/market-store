const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uniqueValidation = require('mongoose-unique-validation');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: 'E-mail must be unique',
        required: [true, 'E-mail is required'],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
		type: Date, 
        default: Date.now 
	}
});

// Hash password before save user.
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) next();
  
    this.password = await bcrypt.hash(this.password, 10);
});

// Change modifiedAt to current date before update user.
UserSchema.pre('update', async function(next) {
    if (!this.isModified()) next();
    
    await this.update({}, { $set: { modifiedAt: new Date() } });
});
  
UserSchema.methods = {
    // Compares hash with user password.
    async compareHash(hash) {
        return await bcrypt.compare(hash, this.password);
    },
    
    // Generates user authentication token.
    generateToken() {
        return jwt.sign({ id: this.id }, 'secret', { expiresIn: 86400 });
    }
};

UserSchema.plugin(uniqueValidation);

module.exports = mongoose.model('User', UserSchema);