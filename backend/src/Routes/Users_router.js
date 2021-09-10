'use strict';

const express = require('express');
const usersRouter = express.Router();

const User = require('../Model/Users_schema');
const basicAuth = require('./middleware/basicAuth');
const bearerAuth = require('./middleware/bearerAuth');

usersRouter.get('/', (req, res) => {
    res.json({ hello: 'sada' });
});

usersRouter.post('/signup', async (req, res, next) => {


    try {
        const prevUsers = await User.findOne({ email: req.body.email });
        if (prevUsers != null) {
            res.status(201).json({ message: 'email exists' });
            return;
        }
    } catch (error) {
        console.log(error);
    }


    try {
        let user = new User(req.body);
        const userRecord = await user.save();
        const response = {
            user: userRecord,
            token: userRecord.token,
        };
        res.status(201).json(response);
    } catch (e) {
        next(e.message);
    }
});



usersRouter.post('/signin', basicAuth, (req, res, next) => {

    const user = {
        user: req.user,
        token: req.user.token,
    };
    res.status(200).json(user);
});

// tests
usersRouter.get('/users', bearerAuth, async (req, res) => {
    res.json({ message: 'you entered' });
});

module.exports = usersRouter;