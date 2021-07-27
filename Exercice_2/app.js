const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const PORT = 5000;

mongoose.connect(
        "mongodb://localhost:27017/api", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //optional

app.get("/ping", (req, res) => {
    return res.send({
        error: false,
        message: "Server is healthy",
    });
});

app.use("/users", require("./routes/users"));

app.listen(PORT, () => {
    console.log("Server started listening on PORT : " + PORT);
});