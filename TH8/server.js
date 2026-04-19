const express = require("express");
const multer = require("multer");

const app = express();

// cấu hình lưu file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// upload nhiều file (tối đa 17)
const upload = multer({ storage: storage }).array("many-files", 17);

// route trang chủ
app.get("/", (req, res) => {
    res.send(`
        <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="many-files" multiple />
            <button type="submit">Upload</button>
        </form>
    `);
});

// route upload
app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.send("Lỗi upload");
        }
        res.send("Upload nhiều file thành công");
    });
});

// chạy server
app.listen(8017, () => {
    console.log("Server chạy tại http://localhost:8017");
});
