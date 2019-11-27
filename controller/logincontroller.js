let loginmodel = require('../model/loginmodel');


exports.createUser = (req, res, next) => {
    // let addUser = loginModel.createUser();
    // console.log(req.body)
    let user = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password
    }
    loginmodel.createUser(user)
}

exports.updateUser = (req, res) => {
    console.log(req.body)
    let userData = {
        img: req.body.img,
        desc: req.body.desc,
        country: req.body.country,
        dob: req.body.dob
    }

    loginmodel.updateUser(userData)   
}

exports.signInUser = (req, res, next) => {
    let user = req.body.user
    let signInUser = loginmodel.signin(user);
    // res.render('landing')
    return signInUser;
}

exports.signOutUser = (req, res, next) => {
    return loginmodel.signout();
}
