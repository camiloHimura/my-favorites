const errorHandle = require("../../../utils/errorHandler");

module.exports = (model, format) => async (req, res) => {
    try{
        console.log('req.params', req.params)
        const {id, tagId} = req.params;
        let data = await model.update({_id: id}, { $pull: { tags: tagId } }, {new: true}).exec();
        if(!data){ return res.status(400).end() }

        const {nModified, ok} = data;
        if(nModified === 1 && ok){
            res.status(200).send({status: 'updated'});
        }else{
            throw new Error('No updated')
        }

    }catch(error){
        errorHandle(error, res);
    }
}