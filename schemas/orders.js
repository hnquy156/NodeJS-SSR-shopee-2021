const mongoose = require('mongoose');
const { Schema } = mongoose;

const databaseConfigs = require(__path_configs + 'database');

const items = new Schema({
    name: String,
    code: String,
    status: Number,
    phone: String,
    address: String,
    city: {
        type: String,
        ref: 'deliveries'
    },
    email: String,
    price: {
        total: Number,
        fee: Number,
        discount: Number,
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products',
        },
        quantity: Number,
    }],
    created: {
        user_id: String,
        user_name: String,
        time: Date,
    },
    modified: {
        user_id: String,
        user_name: String,
        time: Date,
    },
    content: String,
});

module.exports = mongoose.model(databaseConfigs.col_orders, items);