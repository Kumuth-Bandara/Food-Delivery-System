const express = require("express");
const cors = require("cors");
require("dotenv").config();

const orderRoutes = require("./routes/order.routes");
const db = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Order Service is running"
    });
});

app.get("/health", async (req, res) => {
    try {
        const connection = await db.getConnection();

        await connection.ping();

        connection.release();

        res.json({
            status: "OK",
            service: "Order Service",
            database: "Connected"
        });

    } catch (error) {
        console.error("Database connection error:", error.message);

        res.status(500).json({
            status: "ERROR",
            service: "Order Service",
            database: "Disconnected"
        });
    }
});

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
});