let messengereModel = require('../model/messengerModel');


exports.getAllMessenger = (req, res, next) => {
    let getData = messengereModel.getAllMsgData();
    console.log(getData);
    // getData.then(([data, metaData]) => {
    //     res.render('messengerUsers', { data: data, messengerCSS: true })
    // })

    getData.forEach((data) => {
        console.log(data);
        let passingData = [];
        passingData.push(data);
        res.render('messenger', { users: passingData, messengerCSS: true })
    })

}