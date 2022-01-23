$(document).ready(function () {
    
    // Checking status the order
    $('.order__check-btn').click(function() {
        const code = $('.order__check-input').val();
        if (!code) return showNotify($(this), 'Vui lòng nhập mã đơn hàng!', 'warn');
        
        const url = '/orders/' + code;
        $.ajax({
            method: 'get',
            url,
            success: (data) => {
                console.log(data);
                if (!data || !data.data) return showNotify($(this), 'Đơn hàng không tồn tại!', 'error');

                $('.order_information').css('display', 'block');
                $('.order__status-bar-full').css('width', data.data.status/3*100 + '%');
                $('.order__status-point').each(function() {
                    if ($(this).data('status') <= data.data.status) $(this).addClass('active')
                    else $(this).removeClass('active');
                });
                $('.order_information-code').text(data.data.code);
                $('.order_information-name').text(formatHideHelper(data.data.name));
                $('.order_information-phone').text(formatHideHelper(data.data.phone, 'right'));
                
                showNotify($(this), 'Xem thông tin đơn hàng của bạn bên dưới!', 'success');
            }
        });
    });

    // Confirm orders
    $('.cart__product-order-btn').click(async function() {
        // const isConfirm = confirm('Bạn có muốn thanh toán?');
        const isConfirm = await Swal.fire(swalConfig('Bạn có muốn thanh toán đơn hàng?', 'info', 'Đồng ý'));
        if (!isConfirm.value) return -1;

        const address = $('input[name="transport_address"]').val();
        const city = $('select[name="transport_city"]').val();
        const fee = $('td.transport-fee').data('fee');
        const discount = $('td.transport-discount').data('discount');
        const total = $('td.cart__product-checkout-price-total').data('total');
        const products = [];
        $('.cart__product-price-total').each(function() {
            const id = $(this).data('id');
            const quantity = $(this).data('quantity');
            products.push({product: id, quantity});
        });
        const data = {
            address,
            city,
            price: {
                fee,
                discount,
                total,
            },
            products,
        }
        
        $.ajax({
            method: 'post',
            url: '/orders/add',
            data: {"data": JSON.stringify(data)},
            success: async (data) => {
                await Swal.fire({
                    title: 'Đặt hàng thành công!', 
                    text: 'Mã đơn hàng của bạn là: ' + data.code, 
                    icon: 'success',
                    confirmButtonText: "Copy mã đơn hàng và chuyển đến trang theo dõi đơn hàng",
                });
                navigator.clipboard.writeText(data.code);
                window.location.pathname = '/orders';
            }
        })
    });

    // Update Total of Checkout price when load pages, change discount, transport
    updateTotalPriceCheckout();

    $('.product__voucher-change').click(function() {
        const discountCode = $('input.product__voucher-unit').val();
        if (!discountCode) return showNotify($(this), 'Vui lòng nhập mã giảm giá!', 'warn');
        let url = `/discounts/${discountCode}`;
        $.ajax({
            method: 'get',
            url,
            success: (data) => {
                if (!data.data) return showNotify($(this), 'Mã giảm giá không hợp lệ!', 'error');
                const newPrice = data.data.value;
                $('.product__voucher-price').text(formatCurrencyHelper(newPrice));
                $('td.transport-discount').text(formatCurrencyHelper(newPrice));
                $('td.transport-discount').data('discount', newPrice);
                showNotify($(this), 'Cập nhật mã giảm giá thành công!');
                updateTotalPriceCheckout();
            },
        });
    });

    $('.transport__destination-change').click(function() {
        const cityId = $('select[name="transport_city"]').val();
        let url = `/deliveries/${cityId}`;

        $.ajax({
            method: 'get',
            url,
            success: (data) => {
                if (!data || !data.data) return alert('Có lỗi khi thay đổi địa chỉ!');
                
                const fee = data.data.transport_fee;
                $('td.transport-fee').data('fee', fee);
                $('td.transport-fee').text(formatCurrencyHelper(fee));
                showNotify($(this), 'Thay đổi địa chỉ giao hành thành công!');
                updateTotalPriceCheckout();
            },
        });
    });
    
    // Go to checkout page when click button buy now
    $('.go-to-checkout').click(function() {
        let href = `/checkouts/${$(this).data('id')}`;
        location.href = href;
    });

    // Delete product from Cart on Cart Page
    $('.ajax-cart-delete').click(function(e) {
        const eleInput = $(this).parents('.product__cart-item').find('input.product__quantity-number');
        const ProductID  = eleInput.data('product-id');
        const CartID  = eleInput.data('cart-id');
        const url = `/carts/delete/${CartID}/${ProductID}`;
        
        $.ajax({
            method: 'get',
            url,
            success: (data) => {
                console.log(data)
                let quantityTotal = +$('.cart__product-total-quantity').text();
                let priceTotal = $('.cart__product-total-price').data('price');
                let price = $(this).parents('.product__cart-item').find('.cart__product-price-new').data('price');
                let quantity = +eleInput.val();
                priceTotal -= price * quantity;
                quantityTotal -= quantity;
                $(this).parents('.product__cart-item').remove();

                $('.cart__product-total-quantity').text(quantityTotal);
                $('.cart__product-total-price').data('price', priceTotal)
                $('.cart__product-total-price').text(formatCurrencyHelper(priceTotal));
                // $('.header__cart-notice').text(quantityTotal);
                resetCart();
            }
        });
    });

    // Delete Products in Carts on Header
    $('.header__cart-item-delete').click(deleteProductCart);

    // Increase/decrease quantity of product in product pages
    $('.product__quantity-btn').click(ajaxChangeQuantityProduct);
    $('input.product__quantity-number').change(ajaxChangeQuantityProduct);

    // Add to cart
    $('.ajax-cart').click(function(e) {
        e.preventDefault();
        const element = $(this);
        const ProductID  = element.closest('.home-product-item').data('id');
        const CartID  = element.data('id');
        const url = `/carts/add/${CartID}/${ProductID}?quantity=1`;

        $.ajax({
            method: 'get',
            url,
            success: (data) => {
                console.log(data);
                showNotify(element, 'Thêm sản phẩm vào giỏ hàng!');
                // updateQuantityProduct(1);
                resetCart();
            }
        });
    });
        // On product page
    $('.ajax-add-cart').click(function(e) {
        const element = $(this);
        const eleInput = $('input.product__quantity-number');
        if (eleInput.val() <= 0) return showNotify($(this), 'Vui lòng chọn số lượng sản phẩm cần thêm!', 'error');;

        const ProductID  = eleInput.data('product-id');
        const CartID  = eleInput.data('cart-id');
        const url = `/carts/add/${CartID}/${ProductID}?quantity=${eleInput.val()}`;
        
        $.ajax({
            method: 'get',
            url,
            success: (data) => {
                console.log(data)
                if (element.hasClass('product__add-cart')) {
                    // updateQuantityProduct(+eleInput.val());
                    eleInput.val(0);
                    showNotify($(this), 'Thêm sản phẩm vào giỏ hàng thành công!');
                    resetCart();

                } else if (element.hasClass('product__buy-now')) {
                    window.location.href = '/carts/' + CartID;
                }
            }
        });
    });


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
    });

    function ajaxChangeQuantityProduct() {
        const increase = $(this).data('increase') ? +$(this).data('increase') : 0;
        const eleInput = $(this).parent().find('input.product__quantity-number');
        const valInput = +eleInput.val();
        eleInput.val(valInput + increase < 0 ? 0 : valInput + increase);

        const isCartPage = document.getElementById('product-cart');
        if (!isCartPage) return -1;
        const ProductID  = eleInput.data('product-id');
        const CartID  = eleInput.data('cart-id');
        const url = `/carts/edit/${CartID}/${ProductID}?quantity=${eleInput.val()}`;
        $.ajax({
            method: 'get',
            url,
            success: (data) => {

                const quantity = +eleInput.val();
                const price    = $(this).parents('.product__cart-item')
                                        .find('.cart__product-price-new')
                                        .data('price');
                $(this).parents('.product__cart-item')
                                    .find('.cart__product-price-total')
                                    .text(formatCurrencyHelper(quantity * price));
                let priceTotal = 0;
                let quantityTotal = 0;
                data.data.forEach(item => {
                    quantityTotal += item.quantity;
                    priceTotal += item.product_id.price.price_new * item.quantity;
                });
                $('.cart__product-total-quantity').text(quantityTotal);
                $('.cart__product-total-price').text(formatCurrencyHelper(priceTotal));
                $('.cart__product-total-price').data('price', priceTotal);
                // $('.header__cart-notice').text(quantityTotal);
                resetCart();
            }
        });
    }

    function formatCurrencyHelper(price, unit = '₫') {
        let string = price.toString();
        let result = '';
        let count = 0;

        for(let i = string.length - 1; i >= 0; i--) {
            count++;
            result = string[i] + result;
            if (count % 3 === 0 && i > 0) result = '.' + result;
        }
        return result + ' ' + unit;
    }

    function formatHideHelper (text, showPosition = 'left', showLetterNumber = 3) {
        let from = 0;
        let to = text.length - 1;
        if (showPosition === 'left') {
            from += showLetterNumber;
        } else {
            to -= showLetterNumber;
        }
        let string = '';

        for(let i = 0; i < text.length; i++) {
            if (from <= i && i <= to) string += '*'
            else string += text[i];
        }
        return string;
    }

    function updateQuantityProduct(quantity) {
        let quantityTotal = +$('.header__cart-notice').text();
        $('.header__cart-notice').text(quantityTotal + quantity);
    }

    function updateTotalPriceCheckout() {
        const price_original = $('td.transport-price-original').data('price');
        const fee = $('td.transport-fee').data('fee');
        const discount = $('td.transport-discount').data('discount');
        let elePriceTotal = $('td.cart__product-checkout-price-total');
        let priceTotal = price_original + fee - discount;
        elePriceTotal.data('total', priceTotal);
        elePriceTotal.text(formatCurrencyHelper(priceTotal));
    }

    function resetCart() {
        const url = `/carts/get-products/`;
        $.ajax({
            method: 'get',
            url,
            success: (data) => {
                console.log(data);

                const id = $('.header__cart-list').data('id');
                $('#header__cart-wrap').html(showHtmlCart(data.data, id));
                $('.header__cart-item-delete').click(deleteProductCart);
            }
        });

    }

    function showHtmlCart(cartProducts, cartID) {
        let xhtml = '';
        let quantityTotal = 0;
        if (cartProducts && cartProducts.length > 0) {
            cartProducts.forEach(cartProduct => {
                const product = cartProduct.product_id;
                const quantity = cartProduct.quantity;
                quantityTotal += quantity;

                xhtml += `<li class="header__cart-item" data-id=${product._id}>
                            <img src="${product.thumb}" alt="${product.name}" class="header__cart-img">
                            <div class="header__cart-item-info">
                                <div class="header__cart-item-head">
                                    <h5 class="header__cart-item-name">${product.name}</h5>
                                    <div class="header__cart-item-price-wrap">
                                        <span class="header__cart-item-price">${formatCurrencyHelper(product.price.price_new)}</span>
                                        <span class="header__cart-item-multiply">x</span>
                                        <span class="header__cart-item-quantity">${quantity}</span>
                                    </div>
                                </div>
                                <div class="header__cart-item-body">
                                    <span class="header__cart-item-description"></span>
                                    <span class="header__cart-item-delete">Xóa</span>
                                </div>
                            </div>
                        </li>`;
            });

            xhtml = `<h4 class="header__cart-heading">Sản phẩm đã thêm</h4>
                    <ul class="header__cart-list-item">
                        ${xhtml}
                    </ul>
                    <a href="/carts/${cartID}" class="header__cart-view-cart btn btn--primary">Xem giỏ hàng</a>`;
        } else {
            xhtml = `<img src="/frontend/img/no_cart.png" alt="Không có sản phẩm" class="header__cart-empty-img">
                    <span class="header__cart-list-empty-msg">
                        Chưa có sản phẩm
                    </span>`;
        }

        return `<a style="display: block;" href="/carts/${cartID}"><i class="header__cart-icon fas fa-shopping-cart"></i></a>
                <span class="header__cart-notice">${quantityTotal}</span>
                <div class="header__cart-list" data-id=${cartID}>
                    ${xhtml}
                </div>`;
    }

    // function delete product in cart on header
    function deleteProductCart() {
        const eleProductItem = $(this).parents('.header__cart-item');
        const ProductID  = $(this).parents('.header__cart-item').data('id');
        const CartID  = $('.header__cart-list').data('id');
        const url = `/carts/delete/${CartID}/${ProductID}`;
        console.log(url)
        $.ajax({
            method: 'get',
            url,
            success: (data) => {
                console.log(data);
                resetCart();

                // Delete product in cart in Cart Page when delete product on header
                if ($('#product-cart').length > 0) {
                    $(`.product__cart-item[data-product-id="${ProductID}"]`).remove();
                };
            }
        });
    }

    //End $ready
});

function showNotify(element, content, status = 'success') {
    element.notify(content, {
        className: status,
        position: 'top center',
        autoHideDelay: 2000,
    });
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

