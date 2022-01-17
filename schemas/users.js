const mongoose = require('mongoose');
const { Schema } = mongoose;

const databaseConfigs = require(__path_configs + 'database');

const items = new Schema({
	name: String,
	username: String,
	password: String,
    status: String,
    ordering: Number,
    avatar: String,
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts',
    },
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

module.exports = mongoose.model(databaseConfigs.col_users, items);