const Router = require("express");
const router = new Router();
const addressRouter = require("./addressRouter");
const roomRouter = require("./roomRouter");
const typeRouter = require("./typeRouter");
const userRouter = require("./userRouter");

router.use("/type", typeRouter);
router.use("/user", userRouter);
router.use("/room", roomRouter);
router.use("/address", addressRouter);

module.exports = router;
