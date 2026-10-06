const express = require("express");

const menuController = require("../controllers/menu.controller");

const router = express.Router();

router.post("/", menuController.createMenuItem);

router.get("/restaurant/:restaurantId", menuController.getMenuItemsByRestaurant);

router.get("/:id", menuController.getMenuItemById);

router.put("/:id", menuController.updateMenuItem);

router.delete("/:id", menuController.deleteMenuItem);

module.exports = router;