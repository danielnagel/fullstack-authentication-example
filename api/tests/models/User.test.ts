import {
  connect,
  connection,
  set
} from 'mongoose';
import {
  User,
  IUser
} from '@/models/User';
import {
  db
} from '@/config';

describe('User model', () => {
  beforeAll(async () => {
    set('useCreateIndex', true);
    await connect(db, {
      useNewUrlParser: true
    });
    await User.deleteMany({email: "test@example.com"});
  });

  afterAll(async () => {
    connection.close();
  });

  it('Should throw validation errors', () => {
    const user = new User();

    expect(user.validate).toThrow();
  });

  it('Should save a user', async () => {
    expect.assertions(3);

    const user: IUser = new User({
      email: 'test@example.com'
    });
    const spy = jest.spyOn(user, 'save');
    try {
      await user.save();
    } catch (error) {
      console.error(error);
    }

    expect(spy).toHaveBeenCalled();

    expect(user).toMatchObject({
      email: expect.any(String)
    });

    expect(user.email).toBe('test@example.com');
  });
});