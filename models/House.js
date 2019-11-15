const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HouseSchema = new Schema(
    {
        //_id: new mongoose.Types.ObjectId(),
        id: {
            type:String,
            unique: true
        },
        homeName: String,
        userId: String,

    },
    { timestamps: true }
);

module.exports = House = mongoose.model("houses", HouseSchema);