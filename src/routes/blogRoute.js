const { Router } = require("express");
const { default: mongoose } = require("mongoose");
const blogRouter = Router();
const { Blog, User, Comment } = require("../models");
const { isValidObjectId } = require("mongoose");

blogRouter.post("/", async (req, res) => {
  try {
    const { title, content, islive, userId } = req.body;
    if (typeof title !== "string")
      return res.status(400).send({ err: "title is required" });
    if (typeof content !== "string")
      return res.status(400).send({ err: "content is required" });
    // if (typeof islive !== "string")
    //   res.status(200).send({ err: "islive is required" });
    console.log(userId);
    if (!isValidObjectId(userId))
      return res.status(400).send({ err: "userId is invalid" });
    let user = await User.findById(userId);
    if (!user) return res.status(400).send({ err: "user does not exist" });

    let blog = new Blog({ ...req.body, user });
    await blog.save();
    return res.send({ blog });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
});

blogRouter.get("/", async (req, res) => {
  try {
    let blogs = await Blog.find({})
      .limit(10)
      .populate([
        { path: "user" },
        { path: "comments", populate: { path: "user" } },
      ]);

    return res.send(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
});

blogRouter.get("/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!isValidObjectId(blogId))
      res.status(400).send({ err: "blogId is invalid" });
    const blog = await Blog.findOne({ _id: blogId });
    return res.send(blog);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
});

blogRouter.put("/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, content } = req.body;
    if (typeof title !== "string")
      res.status(400).send({ err: "title is required" });
    if (typeof content !== "string")
      res.status(400).send({ err: "content is required" });

    const blog = await Blog.findOneAndUpdate(
      { _id: blogId },
      { title, content },
      { new: true }
    );
    return res.send(blog);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
});

blogRouter.patch("/:blogId/live", async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!isValidObjectId(blogId))
      res.status(400).send({ err: "blogId is invalid" });

    const { islive } = req.body;
    if (!typeof islive) res.status(400).send({ err: "" });

    const blog = await Blog.findByIdAndUpdate(
      { _id: blogId },
      { islive },
      { new: true }
    );
    console.log(blog);
    return res.send(blog);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
});

module.exports = { blogRouter };
