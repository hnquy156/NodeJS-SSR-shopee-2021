document.addEventListener('DOMContentLoaded', (event) => {
    
    sliderMain();
    sliderImage();
    window.addEventListener('resize', sliderMain);

    function sliderMain() {
        const slider        = document.querySelector('#slider');
        if (!slider) return -1;
        const sliderItemImg = document.querySelectorAll('.slider__img');
        const sliderBox     = document.querySelector('.slider__box');
        const leftBtn       = document.querySelector('.slider__btn-arrow.slider__btn-left');
        const rightBtn      = document.querySelector('.slider__btn-arrow.slider__btn-right');
        const sliderWidth   = slider.offsetWidth;
        const sliderBoxWidth= sliderWidth * sliderItemImg.length;
        let count           = 0;
        let canClickSlideBtn= true;
        const delayClickBtn = 400;
    
    
        leftBtn.addEventListener('click', () => {
            if (!canClickSlideBtn) return -1;
            canClickSlideBtn = false;
            count += sliderWidth;
            if (count > 0) {
                count = -sliderBoxWidth + count;
            }
            sliderBox.style.transform = `translateX(${count}px)`;
            setTimeout(slideCanClick, delayClickBtn);
    
        });
    
        rightBtn.addEventListener('click', () => {
            if (!canClickSlideBtn) return -1;
            canClickSlideBtn = false;
            count -= sliderWidth;
            if (count <= -sliderBoxWidth) {
                count = 0;
            }
            sliderBox.style.transform = `translateX(${count}px)`;
            setTimeout(slideCanClick, delayClickBtn);
        });
    
        sliderItemImg.forEach(item => {
            item.style.width = `${sliderWidth}px`;
        })
    
        function slideCanClick() {
            canClickSlideBtn = true;
        }
    }

    function sliderImage() {
        const slider        = document.querySelector('.product__image-slider');
        if (!slider) return -1;
        const sliderItemImg = document.querySelectorAll('.product__image-item');
        const sliderBox     = document.querySelector('.product__image-slider-box');
        const leftBtn       = document.querySelector('.image__btn-arrow.image__btn-left');
        const rightBtn      = document.querySelector('.image__btn-arrow.image__btn-right');
        const sliderWidth   = slider.offsetWidth;
        const sliderBoxWidth= sliderWidth * sliderItemImg.length;
        let count           = 0;
        let canClickSlideBtn= true;
        const delayClickBtn = 400;
    
        leftBtn.addEventListener('click', () => {
            if (!canClickSlideBtn) return -1;
            canClickSlideBtn = false;
            count += sliderWidth;
            if (count > 0) {
                count = -sliderBoxWidth + count;
            }
            sliderBox.style.transform = `translateX(${count}px)`;
            setTimeout(slideCanClick, delayClickBtn);
    
        });
    
        rightBtn.addEventListener('click', () => {
            if (!canClickSlideBtn) return -1;
            canClickSlideBtn = false;
            count -= sliderWidth;
            if (count <= -sliderBoxWidth) {
                count = 0;
            }
            sliderBox.style.transform = `translateX(${count}px)`;
            setTimeout(slideCanClick, delayClickBtn);
        });
    
        sliderItemImg.forEach(item => {
            item.style.width = `${sliderWidth}px`;
        })
    
        function slideCanClick() {
            canClickSlideBtn = true;
        }
    }

    
});

