const express = require("express");
const router = express.Router();

const productRoute = require("./routes/products");
const categoryRoute = require("./routes/categories");
const authRoute = require("./routes/auth");
const couponRoute = require("./routes/coupons");
const userRoute = require("./routes/users");
const paymentRoute = require("./routes/payment");
// const favoritesRoute = require("./favorites"); 

router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/auth", authRoute);
router.use("/coupons", couponRoute);
router.use("/users", userRoute);
router.use("/payment", paymentRoute);
// router.use("/favorites", favoritesRoute); 

module.exports = router;
