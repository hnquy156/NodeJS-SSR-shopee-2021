document.addEventListener('DOMContentLoaded', (event) => {
    
    resizeCategoryItems();


    function resizeCategoryItems() {
        const items = document.querySelectorAll('.pc-category__item');
        let max = 0;
        items.forEach(item => {
            const height = item.offsetHeight;
            if (height > max) max = height;
        });
        items.forEach(item => {
            item.style.height = max + 'px';
        });
    }
});