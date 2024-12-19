const mongoose = require("mongoose");
require('dotenv').config();

const connectToMongoDB = async () => {
    console.log(process.env.DB_URL);
	try {
		await mongoose.connect(process.env.DB_URL);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

module.exports = connectToMongoDB;
