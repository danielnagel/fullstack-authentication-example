import {
  encode
} from 'jwt-simple';
import {
  Request,
  Response,
  NextFunction
} from 'express';
import {
  User,
  IUser
} from '../models/User';
import {
  secret
} from '../config';

function tokenForUser(user: IUser) {
  const timestamp: number = new Date().getTime();
  return encode({
    sub: user.id,
    iat: timestamp
  }, secret);
}

export const signin = function (req: any, res: Response): void {
  res.send({
    token: tokenForUser(req.user)
  });
};

export const signup = async function (req: Request, res: Response, next: NextFunction): Promise < Response | void > {
  const email: string = req.body.email;
  const password: string = req.body.password;

  if (!email || !password) {
    return res.status(422).send({
      error: 'Email and password must be provided'
    });
  }

  try {
    let existingUser: IUser = await User.findOne({
      email: email
    });
    if (existingUser) {
      return res.status(422).send({
        error: 'Email is aleready in use...'
      });
    }
  } catch (error) {
    return next(error);
  }
  const user = new User({
    email: email,
    password: password
  });

  try {
    await user.save();
    res.json({
      token: tokenForUser(user)
    });
  } catch (error) {
    return next(error);
  }
};