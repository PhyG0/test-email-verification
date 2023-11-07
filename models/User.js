import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    username : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required : true
    },
    refreshToken: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false,
        required: true
    },
    roles : {
        user: { type: Boolean, default: true },
        admin: { type: Boolean, default: true },
        mod: { type: Boolean, default: false }
    }
});

export default mongoose.model('Data', userSchema);
