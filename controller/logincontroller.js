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
    // res.send(addUser);
    res.status(200).send()
    // loginmodel.addUser(userData)   
}

exports.signInUser = async(req, res, next) => {
    let user = req.body
    let signInUser = await loginmodel.signin(user);

    console.log("signin", signInUser);
    if (signInUser == false) {
        res.status(400).send(new Error('Occurs an error'));
    } else {
        res.send(JSON.stringify(signInUser));
    }
}

exports.signOutUser = (req, res, next) => {
    console.log(req.body)
    // return loginmodel.signout();
}

exports.home = (req, res) => {
    res.render('profile')
}