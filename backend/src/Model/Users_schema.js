'use strict';
require('dotenv').config();

const mongoose = require('mongoose');
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },

});

users.virtual('token').get(function () {
    let tokenObject = {
        email: this.email,
    };
    return jwt.sign(tokenObject, SECRET_KEY, { expiresIn: '3h' });
});

users.pre('save', async function () {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    } catch (error) {
        console.log(error);
    }

});

users.statics.authenticateBasic = async function (email, password) {
    try {
        const user = await this.findOne({ email });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) { return user; }
        throw new Error('Invalid User');

    } catch (error) {
        console.log(error);
    }

};

// BEARER AUTH
users.statics.authenticateWithToken = async function (token) {
    try {
        const parsedToken = jwt.verify(token, SECRET_KEY);
        const user = await this.findOne({ email: parsedToken.email });
        if (user) {
            return user;
        }
        throw new Error('User Not Found');
    } catch (e) {
        throw new Error(e.message);
    }

};



module.exports = mongoose.model('users', users);





























