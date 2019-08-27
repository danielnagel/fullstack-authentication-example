import {
    model,
    Schema,
    Document
} from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
}

// creating user schema
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
});

export const User = model < IUser > ('user', userSchema);