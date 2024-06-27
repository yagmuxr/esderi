const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const mainRoute = require("./routes/index");
const Product = require("./models/Product"); // Import the product model

dotenv.config();
if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in the environment variables.");
    process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

let connectionError = null;

const connect = async () => {
    try {
        console.log("Attempting to connect to MongoDB with URI:", process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        connectionError = error.message;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected!");
});

app.use(cors());
app.use(express.json());
app.use("/api", mainRoute);

app.get("/", (req, res) => {
    const dbState = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
    res.json({ message: "Backend!", dbState, connectionError });
    
});

app.listen(PORT, async () => {
    await connect();
    console.log(`Server is running on port ${PORT}`);
});
