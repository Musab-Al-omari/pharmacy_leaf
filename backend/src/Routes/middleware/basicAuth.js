'use strict';

const base64 = require('base-64');
const User = require('../../Model/Users_schema');

module.exports = async (req, res, next) => {

    if (!req.headers.authorization) {
        next('Invalid Login');
        return;
    }

    let basic = req.headers.authorization.split(' ').pop();
    let [email, pass] = base64.decode(basic).split(':');
    try {
        req.user = await User.authenticateBasic(email, pass);
        next();
    } catch (e) {
        res.status(403).send('Invalid Login');
    }

};