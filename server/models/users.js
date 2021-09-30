import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { token_key } from '../config';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    tokens: [
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
},{ timestamps: true });

// jwt token
userSchema.methods.getAuthToken = async function(){
    let params = {
        id: this._id,
        name: this.name,
        email: this.email,
        phone: this.phone
    };
    var tokenValue = jwt.sign(params,token_key,{ expiresIn: '300000s' });
    this.tokens = this.tokens.concat({ token: tokenValue });
    await this.save();
    return tokenValue;
}

export default mongoose.model('users',userSchema);