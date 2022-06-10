const Router = require("express");
const router = new Router();
const roomController = require("../controllers/roomController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), roomController.create);
router.get("/", roomController.getAll);
router.get("/:id", roomController.getOne);

module.exports = router;
