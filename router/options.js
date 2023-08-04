const express = require("express");
const router = express.Router();
const { Option } = require("../models");

// 옵션 설정
router.post("/options", async (req, res) => {
  const { extra_price, shot_price, hot } = req.body;
  try {
    if (!extra_price || !shot_price || !hot) {
      return res.status(412).json({ message: "사이즈, 샷, 온도를 설정해주세요." });
    }
    const option = await Option.create({ extra_price, shot_price, hot });
    return res.status(200).json({ "설정한 옵션입니다.": option });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "옵션 설정에 실패하였습니다." });
  }
});

// 설정 옵션 조회
router.get("/options/:option_id", async (req, res) => {
  const { option_id } = req.params;
  try {
    const option = await Option.findOne({ where: { option_id } });
    return res.status(200).json({ "설정한 옵션입니다.": option });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "옵션 조회에 실패하였습니다." });
  }
});

// 옵션 삭제
router.delete("/options/:option_id", async (req, res) => {
  const { option_id } = req.params;
  try {
    await Option.destroy({ where: { option_id } });
    return res.status(200).json({ message: "옵션을 삭제하였습니다." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "옵션삭제에 실패하였습니다." });
  }
});
module.exports = router;
