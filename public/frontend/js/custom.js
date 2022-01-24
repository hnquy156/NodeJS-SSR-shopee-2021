$(document).ready(function () {
    
    // Switch Login/Register form
    $('.auth-form__switch-btn').click(function() {
        let path = window.location.pathname;
        const auth_path = ['/auth/register', '/auth/login'];

        if (path == auth_path[0]) path = auth_path[1]
        else path = auth_path[0];

        window.location.pathname = path;
    });

    // Back
    $('.auth-form__control-back').click(function() {
        window.location.pathname = '/';
    });

    // Active sort bar in header in mobile/tablet device
    let queryString = window.location.search;
    let params = new URLSearchParams(queryString);
    let sort_type = params.get('sort_type');
    if(sort_type == null) sort_type = '';
   
    $('.header__sort-bar').find(`li.header__sort-item[data-sort="${sort_type}"]`).addClass('header__sort-item--active');
});

