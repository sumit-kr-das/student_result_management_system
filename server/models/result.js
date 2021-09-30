import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    name: String,
    roll: String,
    hindi: String,
    english: String,
    math: String,
    computer: String,
    physics: String,
    chemistry: String,
    total: String,
    average: String
});

export default mongoose.model('result',resultSchema);