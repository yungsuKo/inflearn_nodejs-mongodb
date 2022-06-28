const {
  Schema,
  model,
  Types: { ObjectId },
  Types,
} = require("mongoose");

const { CommentSchema } = require("./Comment");
console.log(CommentSchema);

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    islive: { type: Boolean, required: true, default: false },
    user: {
      _id: { type: Types.ObjectId, required: true, ref: "user" },
      username: { type: String, required: true },
      name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
      },
    },

    comments: {
      content: { type: String, required: true },
      user: { type: ObjectId, required: true, ref: "user" },
      blog: { type: ObjectId, required: true, ref: "blog" },
    },
  },
  { timestamps: true }
);

// BlogSchema.virtual("comments", {
//   ref: "Comment",
//   localField: "_id",
//   foreignField: "blog",
// });

// BlogSchema.set("toObject", { virtuals: true });
// BlogSchema.set("toJson", { virtuals: true });

const Blog = model("Blog", BlogSchema);
module.exports = { Blog };
