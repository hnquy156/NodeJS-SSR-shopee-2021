const mongoose = require('mongoose');
const { Schema } = mongoose;

const databaseConfigs = require(__path_configs + 'database');

const items = new Schema({
    products: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'products',
        },
        quantity: Number,
    }],
});

module.exports = mongoose.model(databaseConfigs.col_carts, items);