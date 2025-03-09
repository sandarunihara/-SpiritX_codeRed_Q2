import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    cashamount: {
        type: Number,
        default: 9000000,
    },
    teamname: {
        type: String,
        required: true,
        unique: true,
    },
    teamcount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = bcryptjs.hashSync(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', UserSchema);

export default User;
