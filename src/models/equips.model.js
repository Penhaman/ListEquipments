const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    brand: String,
    model: String,
    client: String,
    quantity: Number,
    observations: String,
    salesman: String,
    status: {type:Number, default:1},
},{
    timestamps:true,
});

const equips = mongoose.model('equips',DataSchema);
module.exports = equips;