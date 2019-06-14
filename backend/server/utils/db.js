const config = require("../config");
const mongoose = require("mongoose");

module.exports = {
    connect(){
        mongoose.connect(config.db.url, { useNewUrlParser: true });
    }
}