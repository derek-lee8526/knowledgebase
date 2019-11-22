let messengereModel = require('../model/messengerModel');


exports.getUserList = (req, res, next) => {
    let getData = messengereModel.getUserList();
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
    res.render('messenger', { users: getData, messengerCSS: true })

}

exports.getMessages = (req, res, next) => {
    console.log(req.query.id);
    let msgData = messengereModel.getMessage(req.query.id);

    res.send(JSON.stringify(msgData));
}


exports.sendMessage = (req, res, next) => {
    console.log(req.query.data);
    let data = req.query.data;
    let msgData = messengereModel.sendMessage(data);
    console.log(msgData);
}