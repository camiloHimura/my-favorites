const express = require("express");
const config = require("./config");

console.log("config", config);

module.exports = {
    start(){
        console.log("running server");
    }
}