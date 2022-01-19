$(document).ready(function () {
    
    // Confirm orders
    $('.cart__product-order-btn').click(function() {
        const isConfirm = confirm('Bạn có muốn thanh toán?');
        if (!isConfirm) return -1;

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
            success: (data) => {
                console.log(data)
            }
        })
    });

    // Update Total of Checkout price when load pages, change discount, transport
    updateTotalPriceCheckout();

    $('.product__voucher-change').click(function() {
        const discountCode = $('input.product__voucher-unit').val();
        if (!discountCode) return alert('Vui lòng nhập mã giảm giá');
        let url = `/discounts/${discountCode}`;
        $.ajax({
            method: 'get',
            url,
            success: (data) => {
                if (!data.data) return alert('Mã giảm giá không hợp lệ');
                const newPrice = data.data.value;
                $('.product__voucher-price').text(formatCurrencyHelper(newPrice));
                $('td.transport-discount').text(formatCurrencyHelper(newPrice));
                $('td.transport-discount').data('discount', newPrice);
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
                updateTotalPriceCheckout();
            },
        });
    });
    
    // Go to checkout page when click button buy now
    $('.go-to-checkout').click(function() {
        let href = `/checkouts/${$(this).data('id')}`;
        location.href = href;
    });

    // Delete product from Cart
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
                $('.header__cart-notice').text(quantityTotal);
            }
        });
    });

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
                updateQuantityProduct(1);
            }
        });
    });

    $('.ajax-add-cart').click(function(e) {
        const element = $(this);
        const eleInput = $('input.product__quantity-number');
        if (eleInput.val() <= 0) return alert('Vui lòng chọn số lượng sản phẩm!');

        const ProductID  = eleInput.data('product-id');
        const CartID  = eleInput.data('cart-id');
        const url = `/carts/add/${CartID}/${ProductID}?quantity=${eleInput.val()}`;
        
        $.ajax({
            method: 'get',
            url,
            success: (data) => {
                console.log(data)
                if (element.hasClass('product__add-cart')) {
                    updateQuantityProduct(+eleInput.val());
                    eleInput.val(0);
                    alert('Thêm sản phẩm vào giỏ hàng thành công!');
                } else if (element.hasClass('product__buy-now')) {
                    window.location.href = '/carts/' + CartID;
                }
            }
        });
    });
//     product__add-cart
// product__buy-now

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
                $('.header__cart-notice').text(quantityTotal);
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

});

function showNotify(element, content, status = 'success') {
    element.notify(content, {
        className: status,
        position: 'top center',
        autoHideDelay: 2000,
    });
}
