const mongoose = require('mongoose');
const { Schema } = mongoose;

const databaseConfigs = require(__path_configs + 'database');

const items = new Schema({
	linkedin: String,
    google: String,
    twitter: String,
    facebook: String,
    instagram: String,
    phone: String,
    email: String,
    address: String,
    copyright: String,
    logo: String,
    logo_white: String,
    name: String,
});

module.exports = mongoose.model(databaseConfigs.col_settings, items);