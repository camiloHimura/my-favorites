const cors = require("cors");
const express = require("express");
const { json, urlencoded } = require("body-parser");

const db = require("./utils/db");
const config = require("./config");
const tagRouter = require("./routes/tag");

const App = express();
App.use(cors());
App.use(json());
App.use(urlencoded());

App.use("/api/tag", tagRouter);

module.exports = {
    async start(){
        try{
            await db.connect();
            App.listen(config.port, () => console.log("App Running"));
        }catch(error){
            console.log("index error", error)
        }
    }
}