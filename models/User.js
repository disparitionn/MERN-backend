const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
                type:String,
                unique: true
        },
        password: String,
        email: {
                type:String,
                unique: true
        },
        name: String,
        age: Number,
        gender: String,
    },
    { timestamps: true }
);

module.exports = User = mongoose.model("users", UserSchema);