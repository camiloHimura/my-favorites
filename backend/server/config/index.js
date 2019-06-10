const env = process.env.NODE_ENV || "dev";

const config = require(`./${env}`);

const generalConfig = {
    port: 1991,
    apiUrl: "http://localhost:1991/api"
}

module.exports = {...generalConfig, ...config};