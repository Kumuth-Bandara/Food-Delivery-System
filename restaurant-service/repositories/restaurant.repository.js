const db = require("../config/database");

const create = async (restaurant) => {
    const [result] = await db.execute(
        `INSERT INTO restaurants
        (name, description, address, contact_number, email, cuisine_type,
         opening_time, closing_time, status, owner_user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            restaurant.name,
            restaurant.description,
            restaurant.address,
            restaurant.contact_number,
            restaurant.email,
            restaurant.cuisine_type,
            restaurant.opening_time,
            restaurant.closing_time,
            restaurant.status || "ACTIVE",
            restaurant.owner_user_id
        ]
    );

    return result.insertId;
};

const findAll = async () => {
    const [rows] = await db.execute(
        "SELECT * FROM restaurants ORDER BY id DESC"
    );

    return rows;
};

const findById = async (id) => {
    const [rows] = await db.execute(
        "SELECT * FROM restaurants WHERE id = ?",
        [id]
    );

    return rows[0];
};

const update = async (id, restaurant) => {
    const [result] = await db.execute(
        `UPDATE restaurants
         SET name = ?,
             description = ?,
             address = ?,
             contact_number = ?,
             email = ?,
             cuisine_type = ?,
             opening_time = ?,
             closing_time = ?,
             status = ?
         WHERE id = ?`,
        [
            restaurant.name,
            restaurant.description,
            restaurant.address,
            restaurant.contact_number,
            restaurant.email,
            restaurant.cuisine_type,
            restaurant.opening_time,
            restaurant.closing_time,
            restaurant.status,
            id
        ]
    );

    return result.affectedRows;
};

const remove = async (id) => {
    const [result] = await db.execute(
        "DELETE FROM restaurants WHERE id = ?",
        [id]
    );

    return result.affectedRows;
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
};