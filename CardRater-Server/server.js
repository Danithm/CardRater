const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Connects the schema model and checks for synced db
//No more forced true - it takes like 48 hours for the table to rebuild
const db = require("./app/models");
db.sequelize.sync().then(() => {
    console.log("Drop and re-sync db.");
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the CardRater, it's a work in progress." });
});

//Check below for the rest of the routes
require("./app/routes/cards.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});