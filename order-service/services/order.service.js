const orderRepository = require("../repositories/order.repository");
const axios = require("axios");

const createOrder = async (data) => {
    const items = data.items;

    if (!items || items.length === 0) {
        throw new Error("Order must contain at least one item");
    }

        for (const item of items) {
        try {
            const response = await axios.get(
                `${process.env.RESTAURANT_SERVICE_URL}/api/menu/${item.menu_item_id}`
            );

            if (!response.data) {
                throw new Error(
                    `Menu item ${item.menu_item_id} not found`
                );
            }
        } catch (error) {
            throw new Error(
                `Menu item ${item.menu_item_id} could not be verified with Restaurant Service`
            );
        }
    }

    let subtotal = 0;

    const processedItems = items.map((item) => {
        const quantity = Number(item.quantity);
        const unitPrice = Number(item.unit_price);

        if (quantity <= 0) {
            throw new Error("Quantity must be greater than 0");
        }

        if (unitPrice < 0) {
            throw new Error("Unit price cannot be negative");
        }

        const totalPrice = quantity * unitPrice;

        subtotal += totalPrice;

        return {
            ...item,
            quantity,
            unit_price: unitPrice,
            total_price: totalPrice
        };
    });

    const deliveryFee = Number(data.delivery_fee || 0);
    const totalAmount = subtotal + deliveryFee;

    const connection = await require("../config/database").getConnection();

    try {
        await connection.beginTransaction();

        const orderId = await orderRepository.createOrder(
            {
                customer_id: data.customer_id,
                restaurant_id: data.restaurant_id,
                delivery_address: data.delivery_address,
                subtotal,
                delivery_fee: deliveryFee,
                total_amount: totalAmount,
                status: "PENDING"
            },
            connection
        );

        for (const item of processedItems) {
            await orderRepository.createOrderItem(
                {
                    order_id: orderId,
                    menu_item_id: item.menu_item_id,
                    item_name: item.item_name,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                    total_price: item.total_price
                },
                connection
            );
        }

        await connection.commit();

        return {
            orderId,
            subtotal,
            deliveryFee,
            totalAmount
        };

    } catch (error) {
        await connection.rollback();
        throw error;

    } finally {
        connection.release();
    }
};

const getOrderById = async (id) => {
    return await orderRepository.getOrderById(id);
};

const getOrdersByCustomer = async (customerId) => {
    return await orderRepository.getOrdersByCustomer(customerId);
};

const getOrdersByRestaurant = async (restaurantId) => {
    return await orderRepository.getOrdersByRestaurant(restaurantId);
};

const updateOrderStatus = async (id, status) => {
    return await orderRepository.updateOrderStatus(id, status);
};

const cancelOrder = async (id) => {
    return await orderRepository.cancelOrder(id);
};

module.exports = {
    createOrder,
    getOrderById,
    getOrdersByCustomer,
    getOrdersByRestaurant,
    updateOrderStatus,
    cancelOrder
};