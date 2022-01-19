
const createFilterStatus = async (currentStatus, collection, condition = {}) => {
    const ItemsModel = require(__path_schemas + collection);
    const filterStatus = [
        {name: 'All', value: 'all', color: 'secondary', count: 15},
        {name: 'Active', value: 'active', color: 'secondary', count: 7},
        {name: 'Inactive', value: 'inactive', color: 'secondary', count: 8},
    ];
    const promiseCount = filterStatus.map(element => {
        let objWhere = {...condition};
        if (element.value !== 'all') objWhere.status = element.value
        else delete objWhere.status;
        if (element.value === currentStatus) element.color = 'info';

        return ItemsModel.countDocuments(objWhere).then(count => {element.count = count});
    });
    await Promise.all(promiseCount);
    return filterStatus;
}

const createFilterOrderStatus = async (currentStatus, collection, condition = {}) => {
    const ItemsModel = require(__path_schemas + collection);
    const filterStatus = [
        {name: 'All', value: 'all', color: 'secondary', count: 15},
        {name: 'Waiting', value: 0, color: 'secondary', count: 7},
        {name: 'Preparing', value: 1, color: 'secondary', count: 8},
        {name: 'Delivering', value: 2, color: 'secondary', count: 8},
        {name: 'Complete', value: 3, color: 'secondary', count: 8},
    ];
    const promiseCount = filterStatus.map(element => {
        let objWhere = {...condition};
        if (element.value !== 'all') objWhere.status = element.value
        else delete objWhere.status;
        if (element.value == currentStatus) element.color = 'info';

        return ItemsModel.countDocuments(objWhere).then(count => {element.count = count});
    });
    await Promise.all(promiseCount);
    return filterStatus;
}

module.exports = {
    createFilterStatus,
    createFilterOrderStatus,
}