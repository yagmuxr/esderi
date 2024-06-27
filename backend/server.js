const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const mainRoute = require("./routes/index"); // Ensure this file exports a valid Express router
const userRoute = require("./routes/users"); // Ensure this file exports a valid Express router

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected!");
});

// Middleware setup
app.use(cors({ origin: 'https://esderi.onrender.com' })); // Update with your frontend URL
app.use(express.json());

// Routes setup
app.use("/api", mainRoute); // Ensure these routes match your frontend API calls
app.use("/api/users", userRoute);

// Start the server
app.listen(PORT, () => {
    connect().catch(error => {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    });
    console.log(`Server is running on port ${PORT}`);
});
