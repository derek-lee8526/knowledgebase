let loginModel = require('../model/loginModel');


exports.createUser = (req, res, next) => {
    let addUser = loginModel.createUser();

}

exports.signInUser = (req, res, next) => {
    let user = req.body.user
    let signInUser = loginModel.signin(user);
}