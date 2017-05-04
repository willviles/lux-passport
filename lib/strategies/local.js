import PassportLocal from 'passport-local';
import PassportBaseStrategy from './base';

const { Strategy } = PassportLocal;

class PassportLocalStrategy extends PassportBaseStrategy {

  static defaultOptions = {
    passReqToCallback: false,
    session: false
  }

  register(verify) {
    return new Strategy(this.options, async (username, password, done) => {
      try {
        const user = await verify({
          username, password
        }, null);
        done(null, user);
      } catch(err) {
        done(err);
      }

    });
  }

}

export default function(options) {
  return {
    strategy: PassportLocalStrategy,
    options
  };
}
