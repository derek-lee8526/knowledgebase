let loginmodel = require('../model/loginmodel');


exports.createUser = (req, res, next) => {
   
    console.log(req.body)
    let user = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password
    }
    // let addUser = loginmodel.addUser(user);
    // loginmodel.createUser(user)
}

exports.updateUser = (req, res) => {
    console.log('hello')
    console.log(req.body)
    let userData = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        img: req.body.img,
        desc: req.body.desc,
        country: req.body.country,
        dob: req.body.dob
    }
    // console.log(userData)
    let addUser = loginmodel.addUser(userData);
    // loginmodel.addUser(userData)   
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

exports.home = (req, res) => {
    res.render('profile')
}