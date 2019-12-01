let messengereModel = require('../model/messengerModel');


exports.getUserList = (req, res, next) => {
    console.log("============= GET USER LIST =================");
    let getData = messengereModel.getUserList();

    getData.then((data) => {
        console.log("users: ", data);
        res.render('messenger', { users: data, messengerCSS: true, loggedin: true });
    }).catch((err) => {
        console.log(err);
        if (err == "USER ID UNDEFINED") {
            res.redirect('/')
        }
        alert("An error occurred. Please try again later...");

    });


}

exports.getMessages = (req, res, next) => {
    console.log("================= GET MESSAGE ================");
    console.log("body:", req.params.id);
    let msgData = messengereModel.getMessage(req.params.id);

    msgData.then((data) => {
        console.log("data:", data);
        res.send(data);
    }).catch((err) => {
        if (err == "USER ID UNDEFINED") {
            res.redirect('/')
        }
        alert("An error occurred. Please try again later...");
    });

}


exports.sendMessage = (req, res, next) => {
    console.log("========= SEND MESSAGE ==========");
    let data = req.body;
    console.log("body: ", data);
    let msgData = messengereModel.sendMessage(data);
    msgData.then((data) => {
        console.log("data:", data);
        res.send(data);
    }).catch((err) => {
        if (err == "USER ID UNDEFINED") {
            res.redirect('/')
        }
        alert("An error occurred. Please try again later...");
    });
}

exports.sendMessageFromPage = (req, res, next) => {
    let receiverData = messengereModel.sendMessagePageData(req.query.id, req.body);

}
exports.sendMessagePage = (req, res, next) => {
    console.log("queryid:", req.params.id);
    let receiverData = messengereModel.sendMessagePageData(req.params.id);
    console.log(receiverData);
    receiverData.then((data) => {
        res.render("sendMessage", { receiver: data, sendMessageCSS: true, loggedin: true })
    }).catch((err) => {
        if (err == "USER ID UNDEFINED") {
            res.redirect('/')
        }
        alert("An error occurred. Please try again later...");
    });

}