module.exports = {
    prefixAdmin: 'admin',
    time_format: 'DD-MM-YYYY',
    long_time_format: 'hh:mm DD-MM-YYYY',
    full_time_format: 'dddd, DD MMMM YYYY',
    salt: 10,
    password_default: '*8556+-/*54+4**-',
    dashboard_managements: [
        {name: 'Product', collection: 'products', icon: 'ion ion-ios-book'},
        {name: 'Category', collection: 'categories', icon: 'ion ion-clipboard'},
        // {name: 'RSS', collection: 'rss', icon: 'ion ion-clipboard'},
        {name: 'User', collection: 'users', icon: 'ion ion-ios-person'},
        {name: 'Group', collection: 'groups', icon: 'ion ion-ios-people'},
        {name: 'Contact', collection: 'contacts', icon: 'ion ion-ios-contact'},
    ],
}