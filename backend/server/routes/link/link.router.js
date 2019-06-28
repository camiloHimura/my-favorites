const {Router} = require("express");
const {createWithTag, findAllWithTag, findOneWithTag} = require("./link.controller");

const LinkRouter = Router();

LinkRouter.route("/")
    .put(createWithTag)
    .get(findAllWithTag);

LinkRouter.route("/:id")
    /* .put(create) */
    .get(findOneWithTag)

module.exports = LinkRouter;
