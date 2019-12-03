let searchModel = require('../model/searchModel');


exports.getSearch = (req, res, next) => {

    let getData = searchModel.getSearch(req.param.topic);

    getData.then((data) => {
        console.log("users: ", data);
        res.render('search', { searchedPost: data, messengerCSS: true, loggedin: true });
    }).catch((err) => {
        console.log(err);
        if (err == "USER ID UNDEFINED") {
            res.redirect('/')
        }
        alert("An error occurred. Please try again later...");

    });


}