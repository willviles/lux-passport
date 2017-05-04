import { Controller } from 'lux-framework';
import Passport from 'app/middleware/passport';

class UsersController extends Controller {

  query = [
    "email",
    "password"
  ];

  params = [
    "email",
    "password"
  ];

  login() {
    return Passport.authenticate('local', ...arguments)
      .then(user => {
        return {
          user: user.id,
          accessToken: 'e1x2a3m4p5l6e7t8o9k10e11n'
        };
      });
  }

}

export default UsersController;
