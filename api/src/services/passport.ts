import {
    use
} from 'passport';
import {
    User,
    IUser
} from '../models/User';
import {
    Strategy as JwtStrategy,
    ExtractJwt
} from 'passport-jwt';
import {
    Strategy as LocalStrategy
} from 'passport-local';
import {
    secret
} from '../config';

// setting local strategy:
const localOptions = {
    usernameField: 'email'
};
const localLogin = new LocalStrategy(localOptions, function (email: string, password: string, done) {
    User.findOne({
        email: email
    }, function (err, user: IUser) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false);
        }

        user.comparePasswords(password, function (err, isMatch) {
            if (err) {
                return done(err);
            }

            if (!isMatch) {
                return done(null, false);
            }

            return done(null, user);
        });
    });
});



// setting the jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    User.findById(payload.sub)
        .then((user: IUser) => {
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        })
        .catch((err) => done(err, false));
});


// tell passport to use defined strategies:
use(jwtLogin);
use(localLogin);