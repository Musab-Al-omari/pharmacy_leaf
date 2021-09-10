'use strict';

const users = require('../../Model/Users_schema');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        next('Invalid Login');
    } else {
        try {
            const token = req.headers.authorization.split(' ').pop();
            const validUser = await users.authenticateWithToken(token);
            if (validUser) {
                req.user = validUser;
                req.token = validUser.token;
                next();
            } else {
                next('Invalid Token!!!!');
            }


        } catch (e) {
            res.status(403).send('Invalid Login');
        }
    }
};