let profileModel = require('../model/profileModel');


exports.getProfile = (req, res, next) => {
    let getData = profileModel.getUserProfile();
    console.log(getData);
    // getData.then(([data, metaData]) => {
    //     res.render('messengerUsers', { data: data, messengerCSS: true })
    // })

    // getData.forEach((data) => {
    //     console.log(data);
    //     let passingData = [];
    //     passingData.push(data);
    //     res.render('messenger', { users: passingData, messengerCSS: true })
    // })
    res.render('profile', { users: getData, messengerCSS: true })

}
