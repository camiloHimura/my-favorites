const errorHandle = require("../../../utils/errorHandler");

module.exports = (model, format, id) => async (req, res) => {
    try{
        id = id || req.params.id;
        let data = await model.findOne({_id: id}).fillTags().exec();
        if(!data){ return res.status(400).end() }

        res.status(200).send(format(data));

    }catch(error){
        errorHandle(error, res);
    }
}