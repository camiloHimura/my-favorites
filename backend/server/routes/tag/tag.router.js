const {Router} = require("express")
const {findAll, create, findOne, findAndremove, findAndUpdate} = require("./tag.controller");

const TagRouter = Router();

TagRouter.route("/")
    .put(create)
    .get(findAll)

TagRouter.route("/:id")
    .put(findAndUpdate)
    .delete(findAndremove)

module.exports = TagRouter;