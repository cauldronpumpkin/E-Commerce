const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordSchema = new Schema({
    orderedBy       : String,
    orderDate       : Date,
    products        : [String],
    orderAmount     : Number,
}); 

module.exports = mongoose.model('Order', ordSchema);