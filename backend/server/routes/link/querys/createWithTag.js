const errorHandle = require("../../../utils/errorHandler");

module.exports = (model, format) => async (req, res) => {
    try{
        let data = await model.create({ ...req.body });
        if(!data){ return res.status(400).end() }

        let finalInfo = await model.findOne({_id: data.id}).fillTags().exec();

        res.status(200).send({status: "saved", data: format(finalInfo)});

    }catch(error){
        errorHandle(error, res);
    }
}