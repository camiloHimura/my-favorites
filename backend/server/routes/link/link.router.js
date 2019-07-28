const {Router} = require("express");
const {createWithTag, findAllWithTag, findOneWithTag, removeTag} = require("./link.controller");

const LinkRouter = Router();

LinkRouter.route("/")
    .put(createWithTag)
    .get(findAllWithTag);

LinkRouter.route("/:id")
    /* .put(create) */
    .get(findOneWithTag)

LinkRouter.route("/:id/:tagId")
    .put(removeTag)

module.exports = LinkRouter;
