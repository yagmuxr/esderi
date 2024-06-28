const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const mainRoute = require("./routes/index");
const Product = require("./models/Product"); // Import the product model

// Use the constants directly
const MONGODB_URI = "mongodb+srv://yeni:yeni@esderi.chgvttl.mongodb.net/?retryWrites=true&w=majority&appName=esderi";
const PORT = 5000;
const STRIPE_SECRET_KEY = "sk_test_51PVJLOP1ZHI18gz6iSJX4VOpWlXYfa9wbDA9lf6MBhHSvAtgCEtzhVJZhGYul8Pe8jlrcvxv4hY5I6V428N4jdoc00HCNc4Xgq";
const CLIENT_DOMAIN = "http://localhost:5173/";

dotenv.config();

const app = express();

let connectionError = null;

const connect = async () => {
    try {
        console.log("Attempting to connect to MongoDB with URI:", MONGODB_URI);
        await mongoose.connect(MONGODB_URI, {
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

// CORS configuration
const corsOptions = {
    origin: CLIENT_DOMAIN, // Your client's domain
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
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
