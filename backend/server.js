const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const mainRoute = require("./routes/index"); // Ana rotaları içeren dosya
const userRoute = require("./routes/users"); // Kullanıcı rotalarını içeren dosya

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

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

app.use(cors());  // CORS middleware doğru kullanımı
app.use(express.json()); // JSON verilerini işlemeye olanak tanır
app.use("/api", mainRoute); // Ana rotalar
app.use("/api/users", userRoute); // Kullanıcı rotaları

app.listen(PORT, () => {
    connect().catch(error => {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Bağlantı hatası olursa uygulamayı sonlandır
    });
    console.log(`Server is running on port ${PORT}`);
});
