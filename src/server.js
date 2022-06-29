const express = require("express");
const app = express();
const { userRouter, blogRouter, commentRouter } = require("./routes");
const { generateFakeData } = require("../faker2");
const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://yungsu2391:PJrJXMvR9ZZVwEQV@mongodbtutorial.rtc9n.mongodb.net/BlogService?retryWrites=true&w=majority";

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.set("debug", true);

    console.log("MongoDB conneted");
    app.use(express.json());

    app.use("/user", userRouter);
    app.use("/blog", blogRouter);
    app.use("/blog/:blogId/comment/", commentRouter);

    app.listen(3000, async () => {
      console.log("server listening on port 3000");
      await generateFakeData(1, 1, 1);
    });
  } catch (err) {
    console.log(err);
  }
};

server();
