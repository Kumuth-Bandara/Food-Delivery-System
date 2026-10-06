const db = require("../config/database");

const createOrder = async (order, connection = db) => {
    const [result] = await connection.execute(
        `INSERT INTO orders
        (customer_id, restaurant_id, delivery_address,
         subtotal, delivery_fee, total_amount, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            order.customer_id,
            order.restaurant_id,
            order.delivery_address,
            order.subtotal,
            order.delivery_fee,
            order.total_amount,
            order.status || "PENDING"
        ]
    );

    return result.insertId;
};

const createOrderItem = async (item, connection = db) => {
    const [result] = await connection.execute(
        `INSERT INTO order_items
        (order_id, menu_item_id, item_name, quantity, unit_price, total_price)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            item.order_id,
            item.menu_item_id,
            item.item_name,
            item.quantity,
            item.unit_price,
            item.total_price
        ]
    );

    return result.insertId;
};

const getOrderById = async (id) => {
    const [orders] = await db.execute(
        `SELECT *
         FROM orders
         WHERE id = ?`,
        [id]
    );

    if (orders.length === 0) {
        return null;
    }

    const [items] = await db.execute(
        `SELECT *
         FROM order_items
         WHERE order_id = ?
         ORDER BY id`,
        [id]
    );

    return {
        ...orders[0],
        items
    };
};

const getOrdersByCustomer = async (customerId) => {
    const [orders] = await db.execute(
        `SELECT *
         FROM orders
         WHERE customer_id = ?
         ORDER BY created_at DESC`,
        [customerId]
    );

    return orders;
};

const getOrdersByRestaurant = async (restaurantId) => {
    const [orders] = await db.execute(
        `SELECT *
         FROM orders
         WHERE restaurant_id = ?
         ORDER BY created_at DESC`,
        [restaurantId]
    );

    return orders;
};

const updateOrderStatus = async (id, status) => {
    const [result] = await db.execute(
        `UPDATE orders
         SET status = ?
         WHERE id = ?`,
        [status, id]
    );

    return result.affectedRows;
};

const cancelOrder = async (id) => {
    const [result] = await db.execute(
        `UPDATE orders
         SET status = 'CANCELLED'
         WHERE id = ?`,
        [id]
    );

    return result.affectedRows;
};

module.exports = {
    createOrder,
    createOrderItem,
    getOrderById,
    getOrdersByCustomer,
    getOrdersByRestaurant,
    updateOrderStatus,
    cancelOrder
};