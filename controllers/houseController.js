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
    const  params = req.body;
    House.findOneAndUpdate({_id: "58873bae28f4bf912185591b" }, {$set:{homeName: 'test'}},  function (err, house) {
        if (err) throw err;

        house.homeName = req.body.edit_house;

        house.save(function (err) {
            if (err) throw err;
        });
    });
};
