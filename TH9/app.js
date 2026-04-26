const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();

const logger = require("./middleware/logger");

const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const indexRoutes = require("./routes/index");

app.use(express.json());

app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true
}));

app.use(logger);

app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/students", studentRoutes);

app.listen(3000, () => {
    console.log("Server chạy tại http://localhost:3000");
});
