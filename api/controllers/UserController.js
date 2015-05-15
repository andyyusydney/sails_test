/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function (req, res, next) {
    //sails.log(999);
    User.find(function foundUsers (err, users){
      sails.log('users=', JSON.stringify(users, null, 4));
      if (err) return next(err);
      res.view({
        users: users
      });
    });
  }
};

