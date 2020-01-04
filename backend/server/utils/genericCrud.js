const errorHandle = require("../utils/errorHandler");

const create = (model, {format}) => async (req, res) => {
    try{
        let data = await model.create({ ...req.body });
        if(!data){ return res.status(400).end() }

        res.status(201).send({status: "saved", data: format(data)});

    }catch(error){
        errorHandle(error, res);
    }
}

const findAll = (model, {arrayFormat}) => async (req, res) => {
    try{ 
        const {body = {}} = req;
        let data = await model.find(body).exec();
        if(!data){ return res.status(200).send([]) }

        res.status(200).send(arrayFormat(data));

    }catch(error){
        errorHandle(error, res);
    }
}

const findOne = (model, {format}) => async (req, res) => {
    try{
        let data = await model.findOne({_id: req.params.id}).exec();
        if(!data){ return res.status(400).end() }

        res.status(200).send(format(data));
    }catch(error){
        errorHandle(error, res);
    }
}

const findAndremove = (model, {format}) => async (req, res) => {
    try{
        let data = await model.findOneAndDelete({_id: req.params.id}).exec();
        if(!data){ return res.status(400).end() }

        res.status(200).send({status: "removed"});

    }catch(error){
        errorHandle(error, res);
    }
}

const findAndUpdate = (model, {format}) => async (req, res) => {
    try{
        let data = await model.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).exec();
        if(!data){ return res.status(400).end() }

        res.status(200).send({status: "updated", data: format(data)});
    }catch(error){
        errorHandle(error, res);
    }
}


const defaultFormat = data => data;

module.exports = (model, options) => {
    options = Object.assign({format: defaultFormat, arrayFormat: defaultFormat}, options)

    return {
        findAll: findAll(model, options),
        create: create(model, options),
        findOne: findOne(model, options),
        findAndremove: findAndremove(model, options),
        findAndUpdate: findAndUpdate(model, options)
    }
}