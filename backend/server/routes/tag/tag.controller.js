const TagModel = require("./tag.model");
const crud = require("../../utils/genericCrud");

const format = data => {
    let {_id, name, color} = data; 
    return {id: _id, name, color}
}

const arrayFormat = data => data.reduce((accum, current) => [...accum, format(current)], [])

module.exports = {
    ...crud(TagModel, {format, arrayFormat})
}
