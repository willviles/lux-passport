import bCrypt from 'bcrypt-nodejs';

import User from '../app/models/user';

export default async function seed(trx) {

  // User
  await User.transacting(trx).create({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@user.com',
    password: bCrypt.hashSync('password')
  });

}
