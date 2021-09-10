'use strict';

const express = require('express');
const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
const cors = require('cors');
const mongoose = require('mongoose');


const usersRouter = require('./Routes/Users_router');
const medicineRouter = require('./Routes/Medicine_Router');

mongoose.connect(MONGODB_URI).then(() => {
    console.log('you are connecting to mongoose DB');
}).catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: 'main page' });
});
app.use('/api/users', usersRouter);
app.use('/api/users/Medicine', medicineRouter);

app.use('*', (req, res, error, next) => {
    res.status(404).json({
        error: 404,
        'this route dose not found': req.url,
    });
});

app.use((error, request, response, next) => {
    response.status(500).json({
        error: error,
        message: `sth wrong happened ${error.message}`,
        path: request.path,
    });
});

const start = (PORT) => {
    app.listen(PORT, () => {
        console.log(`the server on ${PORT}`);
    });
};

module.exports = {
    app,
    start,
};