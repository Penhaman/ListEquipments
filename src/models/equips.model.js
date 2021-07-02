const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    brand: String,
    model: String,
    client: String,
    quantity: Number,
    observations: String,
    salesman: String,
},{
    timestamps:true,
    status: {type: String, default: "Em Espera"},
});

const equips = mongoose.model('equips',DataSchema);
module.exports = equips;