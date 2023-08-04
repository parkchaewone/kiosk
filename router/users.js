const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Users } = require("../models");

//회원가입
router.post("/signup", async (req, res) => {
  try {
    const { userName, password, is_admin } = req.body;
    const existUser = await Users.findOne({
      where: { userName },
    });

    if (!userName || !password) {
      return res.status(400).json({ errorMessage: "이름이나 패스워드를 입력해주세요." });
    }
    if (existUser) {
      return res.status(402).json({ errorMessage: "중복된 이름입니다." });
    }

    await Users.create({
      userName,
      password,
      is_admin,
    });

    res.status(200).json({ message: "회원가입성공" });
  } catch (error) {
    console.error(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { userName, password, is_admin } = req.body;
    const userValid = await Users.findOne({
      where: { userName, password },
    });

    if (!userName || !password) {
      return res.status(400).json({ errorMessage: "이름이나 패스워드를 입력해주세요." });
    }

    if (!userValid) return res.status(400).json({ errorMessage: "일치하는 유저정보가 없습니다." });

    const token = jwt.sign({ userId: userValid.userId }, "key");
    res.cookie("Authorization", `Bearer ${token}`);

    res.status(201).json({ message: "로그인 성공", token });
  } catch (error) {
    res.status(400).json({ errorMessage: "오류가 발생하였습니다." });
  }
});

module.exports = router;
