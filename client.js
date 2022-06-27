console.log("client code runnuing.123");
const axios = require("axios");

const URI = "http://localhost:3000";

// 비효율 적인 방법 :
//          10개일 때 3초 초반 걸림
//          20개일 때 6초 중후반 걸림

const test = async () => {
  console.time("loading time : ");
  let blogs = await axios.get(URI + "/blog");
  console.log(blogs.data[0]);
  //   blogs.data = await Promise.all(
  //     blogs.data.map(async (blog) => {
  //       const [res1, res2] = await Promise.all([
  //         axios.get(URI + `/user/${blog.user}`),
  //         axios.get(URI + `/blog/${blog._id}/comment`),
  //       ]);
  //       blog.user = res1.data;
  //       blog.comments = await Promise.all(
  //         res2.data.comments.map(async (comment) => {
  //           const user = await axios.get(URI + `/user/${comment.user}`);
  //           comment.user = user.data;
  //           return comment;
  //         })
  //       );
  //       return blog;
  //     })
  //   );
  console.timeEnd("loading time : ");
};

const testGroup = async () => {
  await test();
};

testGroup();
