const {Schema, model} = require('mongoose');

const ObjectId = Schema.Types.ObjectId;

const User = model('User', new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
}));

const Ad = model('Ad', new Schema({
    //user: {type: ObjectId, required: true},
    postDate: {type: Date, required: true},
    title: {type: String, required: true},
    description: {type: String, required: false},
    price: {type: Number, required: false},
    //quantity: {type: Number, required: true},
    location: {type: String, required: true},
    sold: {type: Boolean, required: true},
    image: {type: String, required: false},
    email: {type: String, required: true}, // set to true
    category: {type: [
        "itemWanted", 
        "itemForSale", 
        "academicService"
    ], required: true}
    //tags: [{tag: String}]  
}));

const Review = model('Review', new Schema({
    user: {type: ObjectId, required: true},
    Post: {type: ObjectId, required: true},
    reviewDate: {type: Date, required: true},
    description: {type: String, required: true}
}));

module.exports = {User, Ad, Review}
