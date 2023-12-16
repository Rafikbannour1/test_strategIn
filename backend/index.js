const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const {connectDB} = require('./config/db');
const routes = require("./src/routes/index.js");
const app = express();
dotenv.config();

// Middleware pour traiter les données du formulaire
app.use(bodyParser.json({ limit: "30mb", extended: true })); 
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


app.use(cors());



connectDB(); // Connexion à la base de données 

app.use(routes) ; 

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`The server is running on port: ${port}`)); 

module.exports = app;  