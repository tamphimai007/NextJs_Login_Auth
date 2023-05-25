import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String
    },
    password: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: 'user'
    },
    file: {
        type: String,
        default: 'nodata.jpg'
    }
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', userSchema)