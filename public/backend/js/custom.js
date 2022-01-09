$(document).ready(function () {
    $.widget.bridge('uibutton', $.ui.button);

    const $btnClearSearch = $('#btn-clear-search');
    const $btnSearch = $('#btn-search');
    const $inputSearch = $(`input[name="search_value"]`);
    // Active Menu
    activeMenu();

    // Search event
    $btnSearch.click(function(e) {
        const search_value = $inputSearch.val();
        let pathname = window.location.pathname;

        if (search_value) {
            pathname += '?search_value=' + search_value;
        } else {
            
        }
        window.location.replace(pathname);
    });

    $btnClearSearch.click(function() {
        $inputSearch.val('');
        $btnSearch.click();
    });

    // $inputSearch.on('keyup', function(event) {
    //     if (event.key)
    // });

    // Check all
    $('#check-all').change(function() {
        const check = this.checked;
        $('input[name="cid"]').each(function() {
            this.checked = check;
            const $ordering = $(this).parents('tr').find('.ordering');
            if (check) {
                $ordering.attr('name', 'ordering');
            } else {
                $ordering.removeAttr('name');
            }
        });
        showSelectedRowInBulkAction($('input[name="cid"]:checked'));
    });

    // Ordering events
    $('#form-table input[name="cid"]').change(function() {
        const check = $(this).is(':checked');
        const $ordering = $(this).parents('tr').find('.ordering');
        if (check) {
            $ordering.attr('name', 'ordering');
        } else {
            $ordering.removeAttr('name');
        }
        showSelectedRowInBulkAction($('input[name="cid"]:checked'));
    });

    // Apply action
    $('#bulk-apply').click(function() {
        const action = $('#bulk-action').val();
        const linkPrefix = $('#bulk-action').data('link');
        const checkbox = $('#form-table input[name="cid"]:checked');
        const $form = $('#form-table');
        if (checkbox.length > 0) {
            switch(action) {
                case 'active':
                case 'inactive':
                    $form.attr('action', `${linkPrefix}/change-status/${action}`);
                    break;
                case 'delete':
                    Swal.fire(swalConfig('Bạn có muốn xóa dữ liệu này?', 'error', 'Xóa')).then(
                        (result) => {
                            if (result.value) {
                                $form.attr('action', `${linkPrefix}/delete`);
                                $form.submit();
                            }
                        }
                    );
                    action = '';
                    break;
                case 'ordering':
                    $form.attr('action', `${linkPrefix}/change-ordering`);
                    break;
                default:
                    showToast('warning', 'Vui lòng chọn Action');
                    break;
            }
            if (action) $form.submit();
        } else {
            showToast('warning', 'Vui lòng chọn dữ liệu cần thao tác');
        }
    });

    // Add Item Events
    $('#admin-form-submit').click(function() {
        $('#admin-form').submit();
    });

    // Add group_name to Input's value from selecting on selectbox of USER FORM
    $('select[name="group_id"]').change(function() {
        const group_name = $(this).find('option:selected').text();
        $('input[name="group_name"]').val(group_name);
    });

    // Filter by Group User
    $('select[name="group_filter"]').change(function() {
        let path = window.location.pathname.split('/');
        let link = '/' + path[1] + '/' + path[2] + '/filter-group/' + $(this).val();
        window.location.href = link;
    });

    // Hide Notify
    setTimeout(() => {
        $('.close-notify').click();
    }, 5000);

    // Change Name to Slug in Form
    $('#name-form').keyup(function() {
        $('#slug-form').val(changeToSlug($(this).val()));
    })


});

const changeToSlug = (str) => {
    let slug = str.toLowerCase();
    slug = slug.trim();
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    slug = slug.replace(/ +/gi, "-");
    return slug;
}

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
    timer: 5000,
    padding: '1rem',
});


function showToast(type, content) {
    Toast.fire({
        icon: type,
        title: ' ' + content,
    });
}

function activeMenu() {
    
    let [MenuLevel1, MenuLevel2] = $('#sidebar-active').data('active').split('|');
    let $currentMenuItemLevel1 = $('.nav-sidebar > .nav-item > [data-active="' + MenuLevel1 + '"]');
    $currentMenuItemLevel1.addClass('active');

    let $navTreeview = $currentMenuItemLevel1.next();
    if ($navTreeview.length > 0) {
        let $currentMenuItemLevel2 = $navTreeview.find('[data-active="' + MenuLevel2 + '"]');
        $currentMenuItemLevel2.addClass('active');
        $currentMenuItemLevel1.parent().addClass('menu-open');
    } else {
        $('.nav-sidebar > .nav-item > [data-active="' + MenuLevel2 + '"]').addClass('active');
    }
}

function swalConfig(text, icon, confirmText) {
    return {
        position: 'top',
        title: 'Thông báo!',
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmText,
        cancelButtonText: 'Hủy',
    };
}

function deleteItem(linkDelete) {
    Swal.fire(swalConfig('Bạn có muốn xóa dữ liệu này?', 'error', 'Xóa')).then(
        (result) => {
            if (result.value) {
                window.location.href = linkDelete;
            };
        }
    );
}

function sortList(field, order) {
    // http://php01.test/mvc-multi/index.php?module=admin&controller=group&action=index&filter_status=active&search=a&sort_field=name&sort_order=desc
    $('input[name="sort_field"]').val(field);
    $('input[name="sort_order"]').val(order);

    let exceptParams = ['page', 'sort_field', 'sort_order'];
    let link = createLink(exceptParams);

    link += `sort_field=${field}&sort_order=${order}`;
    window.location.href = link;

    // $('#form-table').submit();
}


function createLink(exceptParams) {
    let pathname = window.location.pathname;
    let searchParams = new URLSearchParams(window.location.search);
    let searchParamsEntries = searchParams.entries();

    let link = pathname + '?';
    for (let pair of searchParamsEntries) {
        if (exceptParams.indexOf(pair[0]) == -1) {
            link += `${pair[0]}=${pair[1]}&`;
        }
    }
    return link;
}

function filePreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#admin-preview-image').css('display', 'block');
            $('#admin-preview-image').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function showSelectedRowInBulkAction(checkbox) {
    // let checkbox = $('#form-table input[name="cid"]:checked');
    let navbarBadge = $('#bulk-apply .navbar-badge');
    if (checkbox.length > 0) {
        navbarBadge.html(checkbox.length);
        navbarBadge.css('display', 'inline');
    } else {
        navbarBadge.html('');
        navbarBadge.css('display', 'none');
    }
}
