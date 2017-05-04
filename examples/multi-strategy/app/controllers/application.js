import { Controller } from 'lux-framework';
import Passport from 'app/middleware/passport';

class ApplicationController extends Controller {

  beforeAction = [
    Passport.applicationAuthentication
  ];

}

export default ApplicationController;
