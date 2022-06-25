const { Router } = require("express");
const commentRouter = Router({ mergeParams: true });
const { comment } = require("../models/Comment");
/*
    /user
    /blog
    /comment >> /blog/blogId/comment
*/

commentRouter.post("/:commentId", async (req, res) => {
  return res.send(req.params);
});
commentRouter.get("/");

module.exports = { commentRouter };
