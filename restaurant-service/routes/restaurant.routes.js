const express = require("express");

const restaurantController = require("../controllers/restaurant.controller");

const router = express.Router();

router.post("/", restaurantController.createRestaurant);

router.get("/", restaurantController.getRestaurants);

router.get("/:id", restaurantController.getRestaurantById);

router.put("/:id", restaurantController.updateRestaurant);

router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;