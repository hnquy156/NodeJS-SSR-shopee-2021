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
    })
});

