import PassportHttpBearer from 'passport-http-bearer';
import PassportBaseStrategy from './base';

const { Strategy } = PassportHttpBearer;

class PassportBearerStrategy extends PassportBaseStrategy {

  static defaultOptions = {
    passReqToCallback: false,
    session: false
  }

  register(verify) {
    return new Strategy(this.options, async (token, done) => {
      try {
        const user = await verify({
          token
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
    strategy: PassportBearerStrategy,
    options
  };
}
