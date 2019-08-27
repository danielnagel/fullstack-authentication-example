import {
    Request,
    Response
} from 'express';
import {
    authenticate,
    Authenticator
} from 'passport'
import {
    signin,
    signup
} from './controllers/authentication';
import './services/passport';

const requireAuth: Authenticator = authenticate('jwt', {
    session: false
})
const requireSignIn: Authenticator = authenticate('local', {
    session: false
})

export default (app: any) => {

    app.get('/', (_: Request, res: Response) => {
        res.send('Express Server with JWT Authentication');
    });

    app.get('/user', requireAuth, function (req: any, res: Response) {
        try {
            res.send({
                user: req.user.email.split('@')[0]
            });
        } catch (error) {
            res.status(402).send(`request does not contain user object: ${error}`);
        }
    });

    app.post('/signin', requireSignIn, signin);

    app.post('/signup', signup);

}