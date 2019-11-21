let House = require("../models/House");

module.exports.house_getAll = (req, res) => {
    House.find(function (err, houses) {
        if (err) return res.json({success: false, error: err});
        return res.send(houses);
    });
};

module.exports.house_update = (req, res) => {
    if (!req.body) {
        return res.status(400).json({error: "Error"});
    }

    let id = !!req.body.id && req.body.id;
    let newData = !!req.body.newName && req.body.newName;

    House.findOneAndUpdate({id: id }, {$set:{homeName: newData}},  function (err, house) {
        if (err) throw err;
    });
};
