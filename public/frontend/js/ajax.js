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


    // CHANGE ORDERING //
    // $('.ajax-ordering').change(function(e) {
    //     const element = $(this);
    //     const id = element.data('id');
    //     const url = element.data('link');
    //     let ordering = +element.val();
        
    //     if (ordering <= 0) {
    //         showNotify(element, 'Ordering phải là giá trị lớn hơn 0!!!', 'error');
    //         ordering = 1;
    //         element.val(1);
    //         return -1;
    //     } else if (ordering !== Math.round(ordering)) {
    //         showNotify(element, 'Ordering phải là giá trị nguyên!!!', 'error');
    //         ordering = Math.round(ordering);
    //         element.val(ordering);
    //         return -1;
    //     }
    //     $.ajax({
    //         type: 'POST',
    //         data: {
    //             cid: id,
    //             ordering,
    //         },
    //         url,
    //         success: (data) => {
    //             showNotify(element, data.notify);
    //         }
    //     })
    // });


    // Change Group of Item (user/category/...)
    // $('.ajax-group-selectbox').change(function(e) {
    //     e.preventDefault();
    //     const element = $(this);
    //     const id = element.data('id');
    //     const group_id = element.val();
    //     const group_name = element.find('option:checked').text();
    //     const url = element.data('link');

    //     $.ajax({
    //         method: 'post',
    //         url,
    //         data: {
    //             id,
    //             group_id,
    //             group_name,
    //         },
    //         success: (data) => {
    //             showNotify(element, data.notify);
    //         }
    //     });
    // });

    
});

function showNotify(element, content, status = 'success') {
    element.notify(content, {
        className: status,
        position: 'top center',
        autoHideDelay: 2000,
    });
}
