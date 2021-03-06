import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: Number,
    description: {
        type: String,
        required: true,
    },
    weight: Number
});
