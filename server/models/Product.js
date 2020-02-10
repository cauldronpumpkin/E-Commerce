const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proSchema = new Schema({
    name            : String,
    author          : String,
    price           : Number,
    genre           : String,
    imgUrl          : String,
    purchasedBy     : Number,
    numberOfPages   : Number
}); 

module.exports = mongoose.model('Product', proSchema);