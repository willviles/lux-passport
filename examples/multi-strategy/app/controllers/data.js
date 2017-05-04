import { Controller } from 'lux-framework';
import Passport from 'app/middleware/passport';

class DataController extends Controller {

  beforeAction = [
    Passport.authenticatedRoute
  ];

  index() {
    return {
      message: "This is protected data."
    };
  }

}

export default DataController;
