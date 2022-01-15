$(document).ready(function () {
    
    // Change Like Product
    $('.ajax-liked-product').click(function(e) {
        e.preventDefault();
        const element = $(this);
        const url = element.closest('.home-product-item').data('link');
        const id  = element.closest('.home-product-item').data('id');

        $.ajax({
            method: 'post',
            url,
            data: {
                id,
            },
            success: (data) => {
                
            }
        });
    });

    //Sort Product
    $('.home-filter__btn').click(function() {
        const sort_type = $(this).data('sort');
        $('input[name="sort_type"]').val(sort_type);
        $('#form-filter').submit();
    });

    $('.select-input__link').click(function(e) {
        e.preventDefault();
        const sort_type = $(this).data('sort');
        $('input[name="sort_type"]').val(sort_type);
        $('#form-filter').submit();
    })

});

function showNotify(element, content, status = 'success') {
    element.notify(content, {
        className: status,
        position: 'top center',
        autoHideDelay: 2000,
    });
}
