import { Authenticator } from 'passport';
import Request from './handlers/request';
import Response from './handlers/response';
import UnauthorizedError from './errors/unauthorized-error';

class LuxPassport {
  constructor() {
    this._strategies = {};
    this._serializers = [];
    this._deserializers = [];
  }

  authenticate = async (strategyName, request, response) => {
    request = new Request(request);
    response = new Response(response);

    let strategy = this._strategy(strategyName);
    if (!strategy) { return new Error(`Unknown authentication strategy ${strategyName}`); }

    return await new Promise((resolve, reject) => {
      strategy = Object.create(strategy);

      strategy.success = function(user) {
        resolve(user);
      }

      strategy.fail = function(info) {
        reject(new UnauthorizedError(info));
      };

      strategy.redirect = function(url) {
        Reflect.set(response, 'statusCode', 302);
        Reflect.set(response.headers, 'Location', url);
        Reflect.set(response.headers, 'Content-Length', 0);
        reject(null);
      };

      strategy.pass = function() {
        reject(false);
      };

      strategy.error = function(err) {
        reject(err);
      };

      strategy.authenticate(request);

    });

  }

  use = Authenticator.prototype.use;
  unuse = Authenticator.prototype.unuse;

  serializeUser = Authenticator.prototype.serializeUser;
  deserializeUser = Authenticator.prototype.deserializeUser;

  _strategy = Authenticator.prototype._strategy;

}

export default LuxPassport;
