// import "../styles/main.css";

import Wavy from './_wavy.js';
import Carousel from './_carousel.js';
import Typewriter from './_typewriter.js';
import projects from './projects.json' assert { type: "json" };

document.addEventListener('DOMContentLoaded', () => {
    // project carousel
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

    // dropdown (header nav)
    document.querySelectorAll('.dropdown > .dropdown_trigger').forEach(trigger => {
        trigger.addEventListener('click', event => {
            event.preventDefault();
            event.target.closest('.dropdown').classList.toggle('active');
        });
    });

    // tabs (about)
    document.querySelectorAll('#aboutTab input[type=radio]').forEach(tab => {
        tab.addEventListener('change', event => {
            const target = event.target;
            const tabContainer = event.target.closest('.tab');
            const targetContent = tabContainer.querySelector(`p[data-tab-content-for=${target.id}]`);

            // remove all class on contents
            tabContainer.querySelectorAll('.tab_item').forEach(item => {
                item.classList.remove('show');
                setTimeout(() => item.classList.remove('active'), 300);
            });

            // show select content
            setTimeout(() => {
                targetContent.classList.add('active');
                setTimeout(() => targetContent.classList.add('show'), 300);
            }, 300);

        });
    });
    
});

