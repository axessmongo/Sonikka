const express = require('express');
const app = express();
const Router = express.Router();
const Sonikka = require("../TaskControl/from.js");

Router.post("/api/post", Sonikka.SonikkaPostMethod);
Router.get("/api/get", Sonikka.SonikkagetMethod);


module.exports = Router;