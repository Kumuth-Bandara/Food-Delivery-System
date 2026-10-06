const orderService = require("../services/order.service");

const createOrder = async (req, res) => {
    try {
        const result = await orderService.createOrder(req.body);

        res.status(201).json({
            message: "Order created successfully",
            ...result
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Failed to create order",
            error: error.message
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json(order);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve order",
            error: error.message
        });
    }
};

const getOrdersByCustomer = async (req, res) => {
    try {
        const orders = await orderService.getOrdersByCustomer(
            req.params.customerId
        );

        res.status(200).json(orders);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve customer orders",
            error: error.message
        });
    }
};

const getOrdersByRestaurant = async (req, res) => {
    try {
        const orders = await orderService.getOrdersByRestaurant(
            req.params.restaurantId
        );

        res.status(200).json(orders);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve restaurant orders",
            error: error.message
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const validStatuses = [
            "PENDING",
            "CONFIRMED",
            "PREPARING",
            "READY_FOR_PICKUP",
            "PICKED_UP",
            "ON_THE_WAY",
            "DELIVERED",
            "CANCELLED"
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status",
                validStatuses
            });
        }

        const affectedRows = await orderService.updateOrderStatus(
            req.params.id,
            status
        );

        if (affectedRows === 0) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order status updated successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update order status",
            error: error.message
        });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const affectedRows = await orderService.cancelOrder(
            req.params.id
        );

        if (affectedRows === 0) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order cancelled successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to cancel order",
            error: error.message
        });
    }
};

module.exports = {
    createOrder,
    getOrderById,
    getOrdersByCustomer,
    getOrdersByRestaurant,
    updateOrderStatus,
    cancelOrder
};