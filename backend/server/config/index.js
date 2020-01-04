const port = process.env.PORT || 1991;
const env = process.env.NODE_ENV || 'dev';
const apiUrl = process.env.API_URL || `http://localhost:${port}/api`;
const dbUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/myFavorites';

const config = require(`./${env}`);

const generalConfig = {
    port,
    apiUrl,
    db:{
        url: dbUrl
    },
}

module.exports = {...generalConfig, ...config};