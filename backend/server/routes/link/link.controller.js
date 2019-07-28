const LinkModel = require("./link.model");
const crud = require("../../utils/genericCrud");
const createWithTag = require("./querys/createWithTag");
const findAllWithTag = require("./querys/findAllWithTag");
const findOneWithTag = require("./querys/findOneWithTag");
const removeTag = require("./querys/removeTag");

const format = data => {
    let {_id, title, url, tags} = data;
    tags = tags.map(({_id, name, color}) => ({id: _id, name, color}));

    return {id: _id, title, url, tags}
}

const arrayFormat = data => data.reduce((accum, current) => [...accum, format(current)], [])

module.exports = {
    ...crud(LinkModel, {format, arrayFormat}),
    createWithTag: createWithTag(LinkModel, format),
    findOneWithTag: findOneWithTag(LinkModel, format),
    findAllWithTag: findAllWithTag(LinkModel, arrayFormat),
    removeTag: removeTag(LinkModel, format),
}