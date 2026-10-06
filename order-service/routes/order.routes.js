const express = require("express");

const orderController = require("../controllers/order.controller");

const router = express.Router();

router.post("/", orderController.createOrder);

router.get("/:id", orderController.getOrderById);

router.get(
    "/customer/:customerId",
    orderController.getOrdersByCustomer
);

router.get(
    "/restaurant/:restaurantId",
    orderController.getOrdersByRestaurant
);

router.put(
    "/:id/status",
    orderController.updateOrderStatus
);

router.put(
    "/:id/cancel",
    orderController.cancelOrder
);

module.exports = router;