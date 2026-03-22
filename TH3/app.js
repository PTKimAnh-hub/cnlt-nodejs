const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

// DỮ LIỆU BLOG
const posts = [
  {
    id: 1,
    title: "Ngày đầu học NodeJS",
    content: "Hôm nay mình bắt đầu học NodeJS và Express. Ban đầu hơi rối nhưng làm dần thấy cũng dễ hiểu hơn.",
    author: "Kim Anh",
    hot: true
  },
  {
    id: 2,
    title: "Làm web bằng EJS có khó không?",
    content: "Thật ra EJS chỉ giống HTML nhưng thêm vòng lặp và biến nên làm rất nhanh.",
    author: "Kim Anh",
    hot: false
  },
  {
    id: 3,
    title: "Cách mình học lập trình hiệu quả",
    content: "Mỗi ngày mình học 1 ít, làm bài tập nhiều hơn đọc lý thuyết nên nhớ lâu hơn.",
    author: "Kim Anh",
    hot: true
  }
];

// Trang chủ (hiển thị danh sách bài viết)
app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.get("/list", (req, res) => {
  res.render("index", { posts });
});

// Trang chi tiết bài viết
app.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  const post = posts.find(p => p.id == id);
  res.render("post", { post });
});

app.listen(port, () => {
  console.log("Server đang chạy tại http://localhost:3000");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});
