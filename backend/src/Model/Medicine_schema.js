'use strict';
const mongoose = require('mongoose');

const Medicine = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: String, required: true },
    imageUrl: { type: String, required: true },
    descriptions: { type: String, required: true },
    price: { type: String, required: true },
    type: {
        type: String,
        enum: ['Liquid', 'Tablet', 'Capsules', 'DropsInjections', 'Inhalers', 'Suppositories', 'Topical medicines', 'Implants or patches'],
        required: true,
    },
    MedicinalRecipe: { type: Boolean, required: true }
    ,
    poster: { type: String, required: true },
});

module.exports = mongoose.model('Medicine', Medicine);