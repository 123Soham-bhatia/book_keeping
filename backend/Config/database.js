const mongoose = require('mongoose');
require("dotenv").config();

const dbconnect = () => {
    const dbUrl = process.env.DATABASE_URL; 
    if (!dbUrl) {
        console.error("DATABASE_URL is not defined in the environment variables.");
        return;
    }

    // Log only success/error, not the full URL
    mongoose.connect(dbUrl, { 
        dbName: "bookstore"  // Or remove if using the one in URL
    })
    .then(() => {
        console.log("DB connection successful!");
    })
    .catch((err) => {
        console.error("DB connection error:", err.message);
    });
};

module.exports = dbconnect;