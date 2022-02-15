module.exports = {
    prefixAdmin: 'admin',
    time_format: 'DD-MM-YYYY',
    time_compare_format: 'YYYY-MM-DD',
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
        {name: 'Discount', collection: 'discounts', icon: 'ion ion-cash'},
        {name: 'Transport', collection: 'deliveries', icon: 'ion ion-android-car'},
        {name: 'Orders', collection: 'orders', icon: 'ion ion-android-clipboard'},
        {name: 'Sliders', collection: 'sliders', icon: 'ion ion-ios-albums-outline'},
    ],
    guest_id: "61e988c264c3211cacddaa9e",
    group_user_default: {
        id: '61e2e59bde85e7fa65800160',
        name: 'user',
    }
}