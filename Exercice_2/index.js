// Import dependencie
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

// Setup the express server
var app = express();
const PORT = 5000;

// Setup the express server router
const router = express.Router();

mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connection Success.");
    })
    .catch((err) => {
        console.error("Mongo Connection Error", err);
    });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //optional


// Import routes
const usersRouter = require("src/users/routes");

app.get("/", (req, res) => {
    return res.send({
        message: "Welcome to home page",
    });
});

// Setup all the routes
app.use("/api/users", usersRouter);


// Start the server
app.listen(PORT, () => {
    console.log("Server started listening on PORT : " + PORT);
});