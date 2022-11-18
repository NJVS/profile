
export default class Wavy {
    constructor (svg, anchors, minSpeed, maxSpeed) {
        // svg
        this.svg = svg;
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.svg.appendChild(this.path);

        // waves
        this.anchors = anchors;

        // viewbox 
        this.width = this.svg.getAttribute('viewBox').split(' ')[2];
        this.height = this.svg.getAttribute('viewBox').split(' ')[3] / 2;
        
        // points
        this.points = [];
        for (let i = 0; i <= this.anchors; i++) {
            this.points.push(new Point(
                Math.floor(this.width * i / this.anchors),
                this.height,
                minSpeed,
                maxSpeed
            ));
        }

        // prefers reduced motion
        const prm = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!prm.matches) { // animate
            this.animate();
            console.log('Animation: ON');
        } else { // draw once
            this.draw();
            console.log('Animation: OFF');
        }
    }

    draw() {
        // start
        let path_d = `M ${this.points[0].x}, ${this.points[0].y} `;

        // curve
        for (let i = 0; i < this.points.length - 1; i++) {
            const x_mid = (this.points[i].x + this.points[i + 1].x) / 2;
            const y_mid = (this.points[i].y + this.points[i + 1].y) / 2;
            const cp_x1 = (x_mid + this.points[i].x) / 2;
            const cp_x2 = (x_mid + this.points[i + 1].x) / 2;

            path_d += `Q ${cp_x1}, ${this.points[i].y} ${x_mid}, ${y_mid} `;
            path_d += `Q ${cp_x2}, ${this.points[i + 1].y} ${this.points[i + 1].x}, ${this.points[i + 1].y} `;
        }

        // close
        path_d += `L ${this.width}, ${this.height * 2} L ${0}, ${this.height * 2} Z`;

        this.path.setAttribute('d', path_d);

        // update
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].update(); // 
        }
    }

    animate() {
        this.draw();
        window.requestAnimationFrame(this.animate.bind(this));
    }
}

class Point {
    constructor(x, max, minSpeed, maxSpeed) {
        this.height = this.random(max / 2, max);
        this.min = this.random(0, max / 2);
        this.speed = this.random(minSpeed, maxSpeed);
        this.rad = this.random(0, Math.PI);
        
        this.x = x;
        this.y = Math.sin(this.rad) * (this.height - this.min) + this.min + this.height;
    }

    update() {
        this.rad += this.speed;
        this.y = Math.cos(this.rad) * (this.height - this.min) + this.min + this.height;
    }

    random(min, max) {
        return Math.random() * (max - min) + min;
    }
}