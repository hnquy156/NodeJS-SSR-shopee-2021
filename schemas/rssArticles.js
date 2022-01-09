const mongoose = require('mongoose');
const { Schema } = mongoose;

const databaseConfigs = require(__path_configs + 'database');

const items = new Schema({
    categoryID: Schema.Types.ObjectId,
	title: String,
    link: String,
    pubDate: Date,
    content: String,
    image: String,
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
});

module.exports = mongoose.model(databaseConfigs.col_rss_articles, items);