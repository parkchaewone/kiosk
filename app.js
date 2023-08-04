// const dotenv = require('dotenv');
// dotenv.config();

const express = require("express");
const app = express();
const port = 4000;
const cookieParser = require("cookie-parser");
const users = require("./router/users");
const productsRouter = require("./router/products");

app.use(express.json());
app.use(cookieParser());

app.use("/api", [users, productsRouter]);

app.listen(port, () => {
  console.log(port, "번 포트로 서버가 실행되었습니다.");
});
