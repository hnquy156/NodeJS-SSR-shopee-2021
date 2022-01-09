const ItemsModels = require(__path_schemas + 'settings');

module.exports = {

    getItem: (options = null) => {
        return ItemsModels.findOne({});
    },

    getItemFrontend: (options = null) => {
        return ItemsModels.findOne({});
    },

    saveItem: (item, options) => {
        
        if (options.task === 'add') {
            return ItemsModels(item).save();

        }
        if (options.task === 'edit') {
            return ItemsModels.updateOne({_id: item.id}, item);
        }
    },
}