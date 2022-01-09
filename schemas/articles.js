const mongoose = require('mongoose');
const { Schema } = mongoose;

const databaseConfigs = require(__path_configs + 'database');

const items = new Schema({
	name: String,
    status: String,
    special: String,
    ordering: Number,
    slug: String,
    thumb: String,
    group: {
        id: String,
        name: String,
    },
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

module.exports = mongoose.model(databaseConfigs.col_articles, items);