
const getParam = (param, key, defaultValue) => {
    if (param && param[key]) return param[key];
    return defaultValue;
}

module.exports = {
    getParam,
}