export default class Carousel {
    constructor(container, list) {
        this.length = list.length;
        this.index = 0;   
        
        list.forEach(item => container.append(this.createItem(item)));
        this.updatePreview();
        
        this.animation = true;
        container.addEventListener('mouseenter', () => this.animation = false);
        container.addEventListener('mouseleave', () => this.animation = true);
        setTimeout(() => this.autoNext(), 5000);


        container.addEventListener('click', event => {
            this.next();
        });
    }

    autoNext() {
        if (this.animation) this.next();
        setTimeout(() => requestAnimationFrame(this.autoNext.bind(this)), 5000);
    }

    createItem(item) {
        const itemContainer = document.createElement('div');
        itemContainer.className = `carousel_item`;
        itemContainer.innerHTML = `
            <picture>
                <source media="(max-width: 426px)" srcset="${item.img_mobile_src}">
                <img src="${item.img_desktop_src}" alt="project screenshot">
            </picture>
            <div class="item_details">
                <div>
                    <h3 class="title">${item.name}</h3>
                    <hr />
                    <div class="links">
                        <a href="${item.git_url}" class="btn btn-primary btn-sm" target="_blank">Github repo</a>
                        <a href="${item.live_url}" class="btn btn-primary btn-outline btn-sm" target="_blank">Live demo</a>
                    </div>
                </div>
            </div>
        `;
        return itemContainer;
    }

    updatePreview() {
        const items = document.querySelectorAll('.carousel_item');
        items.forEach(item => item.className = 'carousel_item');
        items[this.index].classList.add('active');
        items[(this.index == this.length - 1) ? 0 : this.index + 1].classList.add('next');
        items[(this.index == 0) ? this.length - 1: this.index - 1 ].classList.add('prev');
    }

    next() {
        this.index = (this.index == this.length - 1) ? 0 : this.index + 1;
        this.updatePreview();
    }
    prev() {}

    
}