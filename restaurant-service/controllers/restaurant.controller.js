const restaurantService = require("../services/restaurant.service");

const createRestaurant = async (req, res) => {
    try {
        const id = await restaurantService.createRestaurant(req.body);

        res.status(201).json({
            message: "Restaurant created successfully",
            restaurantId: id
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create restaurant",
            error: error.message
        });
    }
};

const getRestaurants = async (req, res) => {
    try {
        const restaurants = await restaurantService.getRestaurants();

        res.status(200).json(restaurants);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve restaurants",
            error: error.message
        });
    }
};

const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await restaurantService.getRestaurantById(
            req.params.id
        );

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        res.status(200).json(restaurant);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve restaurant",
            error: error.message
        });
    }
};

const updateRestaurant = async (req, res) => {
    try {
        const affectedRows = await restaurantService.updateRestaurant(
            req.params.id,
            req.body
        );

        if (affectedRows === 0) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        res.status(200).json({
            message: "Restaurant updated successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update restaurant",
            error: error.message
        });
    }
};

const deleteRestaurant = async (req, res) => {
    try {
        const affectedRows = await restaurantService.deleteRestaurant(
            req.params.id
        );

        if (affectedRows === 0) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        res.status(200).json({
            message: "Restaurant deleted successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete restaurant",
            error: error.message
        });
    }
};

module.exports = {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
};