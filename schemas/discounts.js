const mongoose = require('mongoose');
const { Schema } = mongoose;

const databaseConfigs = require(__path_configs + 'database');

const items = new Schema({
	name: String,
    status: String,
    start: Date,
    end: Date,
    value: Number,
    ordering: Number,
    times: Number,
    used: Number,
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

module.exports = mongoose.model(databaseConfigs.col_discounts, items);