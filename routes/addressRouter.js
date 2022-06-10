const Router = require("express");
const router = new Router();
const addressController = require("../controllers/addressController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), addressController.create);
router.get("/", addressController.getAll);

module.exports = router;
