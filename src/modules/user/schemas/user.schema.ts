import * as mongoose from 'mongoose';

export const UserSchema  = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    cart: {
        type: Object
    },
    id: {
        type: String,
        required: true
    }
}, { strict: false })