const errorHandle = require("../../../utils/errorHandler");

module.exports = (model, arrayFormat) => async (req, res) => {
    try{
        let data = await model.find().fillTags().exec();
        if(!data){ return res.status(400).end() }

        res.status(200).send(arrayFormat(data));

    }catch(error){
        errorHandle(error, res);
    }
}