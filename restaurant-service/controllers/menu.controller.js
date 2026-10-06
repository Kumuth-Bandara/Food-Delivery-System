const menuService = require("../services/menu.service");

const createMenuItem = async (req, res) => {
    try {
        const id = await menuService.createMenuItem(req.body);

        res.status(201).json({
            message: "Menu item created successfully",
            menuItemId: id
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create menu item",
            error: error.message
        });
    }
};

const getMenuItemsByRestaurant = async (req, res) => {
    try {
        const items = await menuService.getMenuItemsByRestaurant(
            req.params.restaurantId
        );

        res.status(200).json(items);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve menu items",
            error: error.message
        });
    }
};

const getMenuItemById = async (req, res) => {
    try {
        const item = await menuService.getMenuItemById(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve menu item",
            error: error.message
        });
    }
};

const updateMenuItem = async (req, res) => {
    try {
        const affectedRows = await menuService.updateMenuItem(
            req.params.id,
            req.body
        );

        if (affectedRows === 0) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.status(200).json({
            message: "Menu item updated successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update menu item",
            error: error.message
        });
    }
};

const deleteMenuItem = async (req, res) => {
    try {
        const affectedRows = await menuService.deleteMenuItem(req.params.id);

        if (affectedRows === 0) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.status(200).json({
            message: "Menu item deleted successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete menu item",
            error: error.message
        });
    }
};

module.exports = {
    createMenuItem,
    getMenuItemsByRestaurant,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem
};