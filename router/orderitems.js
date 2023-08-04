const express = require("express");
const router = express.Router();

const { Products, Order_items } = require("../models");

// 발주 생성
router.post("/order_item/:Product_id", async (req, res) => {
  const { Product_id } = req.params;
  const { state, amount } = req.body;
  try {
    const orderItem = await Order_items.create({ Product_id, state, amount });
    return res.status(200).json({ message: "상품이 발주되었습니다.", orderItem });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: "상품 발주에 실패하였습니다." });
  }
});

module.exports = router;
