const express = require("express");
const app = express();
const { userRouter } = require("./routes/userRoute");
const { blogRouter } = require("./routes/blogRoute");
const { commentRouter } = require("./routes/commentRoute");

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

    app.listen(3000, () => console.log("server listening on port 3000"));
  } catch (err) {
    console.log(err);
  }
};

server();
