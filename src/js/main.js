import Wavy from './_wavy.js';
import Carousel from './_carousel.js';
import Typewriter from './_typewriter.js';
import projects from './projects.json' assert { type: "json" };

document.addEventListener('DOMContentLoaded', () => {
    // new Wavy(document.querySelector('#headWave'), 5, 0.005, 0.01);
    new Carousel(document.querySelector('#projectCarousel'), projects);

    // wavy (wave effect)
    document.querySelectorAll('svg[data-wavy]').forEach(wavy => {
        wavy.style.cssText = `
            position: absolute;
            ${(wavy.dataset.wavy === 'top') 
                ? 'bottom: 99%;' 
                : 'top: 99%; rotate: 180deg;'
            }
            width: 100%;
            background-color: transparent;
            fill: var(--c-neutral-100);
        `;

        new Wavy(wavy, 5, 0.005, 0.01);
    });

    // typewriter (on header only)
    const like = document.querySelector('#like');
    new Typewriter(like, like.dataset.text, like.dataset.duration);


    // carousel
    // let carouselIndex = 0;
    // document.querySelector('#projectCarousel').addEventListener('click', event => {
    //     const items = event.currentTarget.querySelectorAll('.carousel_item');
    //     items.forEach(item => item.classList.remove('active', 'next', 'prev'));
    //     carouselIndex = (carouselIndex == items.length - 1) ? 0 : carouselIndex + 1;

    //     items[carouselIndex].classList.add('active');
    //     items[(carouselIndex == 0) ? items.length - 1 : carouselIndex - 1].classList.add('prev');
    //     items[(carouselIndex == items.length - 1) ? 0 : carouselIndex + 1].classList.add('next');
    // });
});

