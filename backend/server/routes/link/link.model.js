const mongoose = require("mongoose");

let linkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'this path is Required'],
        validate: {
            validator: item => item.length > 3,
            message: 'Invalid title format.'
        }
    },
    url: {
        type: String,
        required: [true, 'this path is Required'],
        validate: {
            validator: item => /(http:|https:)/gi.test(item),
            message: 'Invalid Url format.'
        }
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    }],
})

linkSchema.index({title: 1, url: 1}, {unique: true});

linkSchema.query.fillTags = function(){
    return this.populate("tags")
}

linkSchema.pre("save", function(){
    this.title = this.title.trim();
    this.url = this.url.trim();
})

module.exports = mongoose.model("Link", linkSchema);
