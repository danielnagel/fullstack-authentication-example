import {
    model,
    Schema,
    Document
} from 'mongoose';
import {
    genSalt,
    hash,
    compare
} from 'bcrypt-nodejs';

export interface IUser extends Document {
    email: string;
    password: string;
    comparePasswords: (password: string, callback: (message: any, isMatch ? : boolean) => void) => void;
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

// encrypt password before saving a model
userSchema.pre < IUser > ('save', function (next) {
    const user = this;
    // generating hashed password
    genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;

            // proceed to saving the model
            next();
        });
    });
});

// comparing saved hashed password and provided password during signing in
userSchema.methods.comparePasswords = function (password: string, callback: (message: any, isMatch ? : boolean) => void) {
    compare(password, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

export const User = model < IUser > ('user', userSchema);