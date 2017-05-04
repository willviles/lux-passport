import LuxPassport from './framework';

const REQUIRED_PARAMS = [
  'strategies'
];

export default class PassportBaseMiddleware {

  constructor() {
    REQUIRED_PARAMS.forEach(key => {
      if (!this.constructor[key]) {
        throw new Error(`Please configure '${key}' in PassportMiddleware`);
      }
    });

    this.passport = new LuxPassport();
    this.strategies = this.constructor.strategies.reduce((prev, { strategy, options }) => {
      return [
        ...prev,
        new strategy(this, options)
      ];
    }, []);

  }

  authenticate() {
    return this.passport.authenticate(...arguments);
  }

}
