$(document).ready(function () {
    
    // Change Status
    $('.ajax-status').click(function(e) {
        e.preventDefault();
        const element = $(this);
        const url = element.attr('href');
        const preStatus = element.data('status');
        $.ajax({
            method: 'get',
            url,
            success: (data) => {
                const icon = {
                    active: 'fas fa-check',
                    inactive: 'fas fa-minus'
                }
                const classColor = {
                    active: 'btn-success',
                    inactive: 'btn-danger'
                }
                element.data('status', data.status);
                element.attr('href', url.replace(preStatus, data.status));
                element.find('i').attr('class', icon[data.status]);
                element.addClass(classColor[data.status]);
                element.removeClass(classColor[preStatus]);
                showNotify(element, data.notify);
            }
        });
    });

    // Change Special
    $('.ajax-special').click(function(e) {
        e.preventDefault();
        const element = $(this);
        const url = element.attr('href');
        const preSpecial = element.data('special');
        $.ajax({
            method: 'get',
            url,
            success: (data) => {
                const icon = {
                    active: 'fas fa-check',
                    inactive: 'fas fa-minus'
                }
                const classColor = {
                    active: 'btn-success',
                    inactive: 'btn-danger'
                }
                element.data('special', data.special);
                element.attr('href', url.replace(preSpecial, data.special));
                element.find('i').attr('class', icon[data.special]);
                element.addClass(classColor[data.special]);
                element.removeClass(classColor[preSpecial]);
                showNotify(element, data.notify);
            }
        });
    });

    // Change Group ACP
    $('.ajax-group-acp').click(function(e) {
        e.preventDefault();
        const element = $(this);
        const url = element.attr('href');
        const preGroupACP = element.data('group_acp');
        $.ajax({
            method: 'get',
            url,
            success: (data) => {
                const icon = {
                    yes: 'fa fa-2x fa-check-square',
                    no: 'fa fa-2x fa-square'
                }
                element.data('group_acp', data.group_acp);
                element.attr('href', url.replace(preGroupACP, data.group_acp));
                element.find('i').attr('class', icon[data.group_acp]);
                showNotify(element, data.notify);
            }
        });
    });

    // CHANGE ORDERING //
    $('.ajax-ordering').change(function(e) {
        const element = $(this);
        const id = element.data('id');
        const url = element.data('link');
        let ordering = +element.val();
        
        if (ordering <= 0) {
            showNotify(element, 'Ordering phải là giá trị lớn hơn 0!!!', 'error');
            ordering = 1;
            element.val(1);
            return -1;
        } else if (ordering !== Math.round(ordering)) {
            showNotify(element, 'Ordering phải là giá trị nguyên!!!', 'error');
            ordering = Math.round(ordering);
            element.val(ordering);
            return -1;
        }
        $.ajax({
            type: 'POST',
            data: {
                cid: id,
                ordering,
            },
            url,
            success: (data) => {
                showNotify(element, data.notify);
            }
        })
    });

    // Change Group of Item (user/category/...)
    $('.ajax-group-selectbox').change(function(e) {
        e.preventDefault();
        const element = $(this);
        const id = element.data('id');
        const group_id = element.val();
        const group_name = element.find('option:checked').text();
        const url = element.data('link');

        $.ajax({
            method: 'post',
            url,
            data: {
                id,
                group_id,
                group_name,
            },
            success: (data) => {
                showNotify(element, data.notify);
            }
        });
    });

    // Load RSS Articles
    $('.ajax-load-rss').click(function(e) {
        e.preventDefault();
        const element = $(this);
        const url = element.attr('href');
        const id = element.data('id');
        $.ajax({
            method: 'get',
            url,
            success: (data) => {
                
                showNotify(element, data.notify);
            }
        });
    });

    
});

function showNotify(element, content, status = 'success') {
    element.notify(content, {
        className: status,
        position: 'top center',
        autoHideDelay: 2000,
    });
}
