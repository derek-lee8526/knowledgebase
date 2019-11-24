let loginmodel = require('../model/loginmodel');


exports.createUser = (req, res, next) => {
    // let addUser = loginModel.createUser();
    console.log(req.body)
    let user = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password
    }
    loginmodel.createUser(user)
}

exports.signInUser = (req, res, next) => {
    let user = req.body.user
    let signInUser = loginModel.signin(user);
    return signInUser;
}

exports.signOutUser = (req, res, next) => {
    return loginModel.signout();
}
