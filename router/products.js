const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { orderItems, Products } = require("../models");

// 상품추가 api
router.post("/product", async (req, res) => {
  const { productName, type, price, quantity } = req.body;
  const optionId = 0;
  //  만약 (if) name이 null이면 return '{name}을 입력해주세요.' else name을 db에넣는다
  if (!productName) {
    return res.status(400), json({ errorMessage: "이름을 입력해주세요." });
  }
  // 만약 (if) type이 알맞은 type coffe juce food 아니면 return‘알맞은 타입을 지정해주세요’ else type을 db에 넣는다
  if (!type) {
    return res.status(400), json({ errorMessage: "알맞은 타입을 지정해주세요." });
  }

  const product = await Products.create({
    productName,
    type,
    price,
    quantity,
    optionId,
  });

  return res.status(201).json({ message: "상품추가완료" });
});

// 상품조회 api
router.get("/allProduct", async (req, res) => {
  try {
    const { productName } = req.params;
    const allProduct = await Products.findAll({
      where: {
        productName: productName,
      },
    });
    const product = await allProduct.findOne({
      where: { productName },
    });
    if (!productName) {
      return res.status(400).json({
        message: "상품 이름을 입력해주세요.",
      });
    }

    if (allProduct.length === 0) {
      return res.status(404).json({
        message: "상품 정보를 찾지 못했습니다.",
      });
    }

    return res.status(200).json({
      data: allProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "서버 오류입니다.",
    });
  }
});

// 상품 정보 수정

router.put("/Product/:productId", async (req, res) => {
  const { productId } = req.params;
  const { productName, type, price, quantity } = req.body;

  try {
    const product = await Products.findOne({ where: { productId } });

    if (!product) {
      return res.status(404).json({ message: "상품이 존재하지 않습니다." });
    }

    await product.update({
      productName,
      type,
      price,
      quantity,
    });

    return res.status(200).json({ message: "상품 변경이 완료 되었습니다." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "서버 오류입니다." });
  }
});

// 상품 삭제
router.delete("/Product/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Products.findOne({ where: { productId } });

    if (!product) {
      return res.status(404).json({ message: "상품이 존재하지 않습니다." });
    }

    await product.destroy();

    return res.status(200).json({ message: "상품 삭제 완료 되었습니다." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "서버 오류입니다." });
  }
});

module.exports = router;
