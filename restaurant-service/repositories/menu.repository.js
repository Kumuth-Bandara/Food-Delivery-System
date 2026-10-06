const db = require("../config/database");

const createMenuItem = async (data) => {
    const [result] = await db.execute(
        `INSERT INTO menu_items
        (restaurant_id, item_name, description, category, price, availability, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            data.restaurant_id,
            data.item_name,
            data.description,
            data.category,
            data.price,
            data.availability ?? true,
            data.image_url
        ]
    );

    return result.insertId;
};

const getMenuItemsByRestaurant = async (restaurantId) => {
    const [rows] = await db.execute(
        `SELECT * FROM menu_items
         WHERE restaurant_id = ?
         ORDER BY id`,
        [restaurantId]
    );

    return rows;
};

const getMenuItemById = async (id) => {
    const [rows] = await db.execute(
        `SELECT * FROM menu_items
         WHERE id = ?`,
        [id]
    );

    return rows[0];
};

const updateMenuItem = async (id, data) => {
    const [result] = await db.execute(
        `UPDATE menu_items
         SET item_name = ?,
             description = ?,
             category = ?,
             price = ?,
             availability = ?,
             image_url = ?
         WHERE id = ?`,
        [
            data.item_name,
            data.description,
            data.category,
            data.price,
            data.availability,
            data.image_url,
            id
        ]
    );

    return result.affectedRows;
};

const deleteMenuItem = async (id) => {
    const [result] = await db.execute(
        `DELETE FROM menu_items
         WHERE id = ?`,
        [id]
    );

    return result.affectedRows;
};

module.exports = {
    createMenuItem,
    getMenuItemsByRestaurant,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem
};