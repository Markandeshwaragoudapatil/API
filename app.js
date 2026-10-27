const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/productRoutes");
const loginRoutes = require("./routes/loginRoutes");
const profileRoutes = require("./routes/profileRoutes");
const logoutRoutes = require("./routes/logoutRoutes");
const registerRoutes = require("./routes/registerRoutes");
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/products", productRoutes);
app.use("/profile", profileRoutes);
app.use("/logout", logoutRoutes);

app.use((err, req, res, next) => {
    res.status(err.statusCode || err.status || 500).json({
        message: err.message || "Something went wrong"
    });
});

app.use((req, res) => {
    res.status(400).json({ message: "Invalid URL" });
});

const startServer = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected through mongoose");
    app.listen(PORT || 3000, () => {
        console.log(`Listening on ${PORT || 3000}`);
    });
};

// Importing the app for automated tests must not start a database connection.
if (require.main === module) {
    startServer().catch((error) => {
        console.error("Failed to start API:", error);
        process.exitCode = 1;
    });
}

module.exports = { app, startServer };
