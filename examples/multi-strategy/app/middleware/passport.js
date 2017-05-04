import {
  PassportBaseMiddleware,
  PassportLocalStrategy,
  PassportBearerStrategy,
  NotFoundError,
  UnauthorizedError
} from 'lux-passport';

import bCrypt from 'bcrypt-nodejs';

import User from 'app/models/user';

class PassportMiddleware extends PassportBaseMiddleware {

  // @static
  // @array strategies
  // Initialize Passport strategies

  static strategies = [
    PassportLocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      async verify({ username, password }) {
        let user = await User.where({
          email: username
        }).first();
        if (!user) {
          throw new NotFoundError(`No user for ${username}`);
        }
        if (!bCrypt.compareSync(password, user.password)) {
          throw new UnauthorizedError(`Password is incorrect`);
        }
        return user;
      }
    }),
    PassportBearerStrategy({
      async verify({ token }) {
        let user;
        if (token === 'e1x2a3m4p5l6e7t8o9k10e11n') {
          user = await User.first();
        }
        return user;
      }
    })
  ];

  // @async applicationAuthentication
  // Authenticate the user

  applicationAuthentication = async (request, response) => {
    await this.authenticate('bearer', request, response)
      .then(user => {
        Reflect.set(response, 'passport', {
          isAuthenticated: true,
          currentUser: user
        });
      })
      .catch(error => {
        const { message, name, statusCode } = error;
        Reflect.set(response, 'passport', {
          isAuthenticated: false,
          error: { message, name, statusCode }
        });
      });
  }

  // @async authenticatedRoute
  // Authenticate the user for a specific route

  async authenticatedRoute(request, response) {
    const { passport } = response;
    const { isAuthenticated, error } = passport;
    if (isAuthenticated !== true) {
      throw new UnauthorizedError(error.message);
    }
  }

}

export default new PassportMiddleware();
