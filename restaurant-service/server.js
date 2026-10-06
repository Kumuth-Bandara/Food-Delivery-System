const express = require("express");
const cors = require("cors");
require("dotenv").config();

const restaurantRoutes = require("./routes/restaurant.routes");
const menuRoutes = require("./routes/menu.routes");

const db = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menu", menuRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Restaurant Service is running"
    });
});

app.get("/health", async (req, res) => {
    try {
        const connection = await db.getConnection();
        await connection.ping();
        connection.release();

        res.json({
            status: "OK",
            service: "Restaurant Service",
            database: "Connected"
        });
    } catch (error) {
        console.error("Database connection error:", error.message);

        res.status(500).json({
            status: "ERROR",
            service: "Restaurant Service",
            database: "Disconnected"
        });
    }
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Restaurant Service running on port ${PORT}`);
});