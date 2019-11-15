const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoomSchema = new Schema(
    {
        id: {
            type:String,
            unique: true
        },
        roomName: String,
        houseId: String,
        userId: String,

    },
    { timestamps: true }
);

module.exports = Room = mongoose.model("rooms", RoomSchema);