let searchModel = require('../model/searchModel');


exports.getSearch = (req, res, next) => {

    let getData = searchModel.getSearch(req.params.topic);

    getData.then((data) => {
        console.log("posts: ", data);
        res.render('search', { searchedPost: data, postsCSS: true, loggedin: true });
    }).catch((err) => {
        console.log(err);
        if (err == "USER ID UNDEFINED") {
            res.redirect('/')
        }
        alert("An error occurred. Please try again later...");

    });


}