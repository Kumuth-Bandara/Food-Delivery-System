const restaurantRepository = require("../repositories/restaurant.repository");

const createRestaurant = async (data) => {
    return await restaurantRepository.create(data);
};

const getRestaurants = async () => {
    return await restaurantRepository.findAll();
};

const getRestaurantById = async (id) => {
    return await restaurantRepository.findById(id);
};

const updateRestaurant = async (id, data) => {
    return await restaurantRepository.update(id, data);
};

const deleteRestaurant = async (id) => {
    return await restaurantRepository.remove(id);
};

module.exports = {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
};