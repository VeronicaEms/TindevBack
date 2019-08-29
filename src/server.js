const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const server = express();

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-cbukz.mongodb.net/omnistack8?retryWrites=true&w=majority',{
useNewUrlParser: true
});

server.use(cors())

//serve para colocar algum tipo de config em outro arquivo/módulo, usamos o "use"
server.use(express.json());
server.use(routes);
server.listen(3333);
