const menuRepository = require("../repositories/menu.repository");

const createMenuItem = async (data) => {
    return await menuRepository.createMenuItem(data);
};

const getMenuItemsByRestaurant = async (restaurantId) => {
    return await menuRepository.getMenuItemsByRestaurant(restaurantId);
};

const getMenuItemById = async (id) => {
    return await menuRepository.getMenuItemById(id);
};

const updateMenuItem = async (id, data) => {
    return await menuRepository.updateMenuItem(id, data);
};

const deleteMenuItem = async (id) => {
    return await menuRepository.deleteMenuItem(id);
};

module.exports = {
    createMenuItem,
    getMenuItemsByRestaurant,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem
};