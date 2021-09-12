'use strict';

const express = require('express');
const MedicineRouter = express.Router();

const Medicine = require('../Model/Medicine_schema');
// const bearerAuth = require('./middleware/bearerAuth');


MedicineRouter.post('/', async (req, res) => {
    try {
        const medicineItem = new Medicine(req.body);
        const medicineItemRecord = await medicineItem.save();
        res.status(201).json(medicineItemRecord);
    } catch (error) {
        console.log(error);
    }

});


MedicineRouter.get('/', async (req, res) => {
    try {
        const medicineItems = await Medicine.find({});
        res.status(201).json(medicineItems);
    } catch (error) {
        console.log(error);

    }
});

MedicineRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Medicine.findOneAndDelete({ _id: id });
        res.status(201).json('item deleted');
    } catch (error) {
        console.log(error);
    }

});

module.exports = MedicineRouter;