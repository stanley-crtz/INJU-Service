const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const RoutesBackend = require('./Backend/Routes/index')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api/', RoutesBackend)

// Backend
app.use('/media/', express.static(path.join(path.resolve(), 'Backend', 'Resources')));

// Frontend
app.use(express.static(path.join(path.resolve(), 'Frontend', 'Styles')))
app.use(express.static(path.join(path.resolve(), 'Frontend', 'Styles', 'css')))
app.use(express.static(path.join(path.resolve(), 'Frontend', 'Views')))

module.exports = app;