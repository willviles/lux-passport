import camelCase from 'lodash.camelcase';
import defaultsDeep from 'lodash.defaultsdeep';

export default class PassportBaseStrategy {
  constructor() {
    this._id();

    this.container = arguments[0];
    if (!this.container) {
      throw new Error(`Lux strategy '${this.id}' must be initialized with an Passport middleware container instance`);
    }

    this.options = defaultsDeep({}, arguments[1] || {}, this.constructor.defaultOptions);
    if (!this.options.verify) {
      throw new Error(`Lux strategy '${this.id}' must have a verify method`);
    }

    this.verify = this.options.verify;
    delete this.options.verify;

    this._register();
  }

  _id() {
    const id = new RegExp(/^(Passport)(.*)(Strategy)/).exec(this.constructor.name)[2];
    if (!id) {
      throw new Error(`Please follow the Lux Passport strategy naming convention of 'Passport<name>Strategy'`);
    }
    this.id = camelCase(id);
  }

  async _register() {
    if (typeof this.register !== 'function') {
      throw new Error(`A Passport strategy must have a register hook`);
    }
    const strategy = await this.register(this.verify.bind(this.container));
    this.container.passport.use(strategy);
  }

}
