import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: String
});

export const Exercise = mongoose.model('Exercise', exerciseSchema);