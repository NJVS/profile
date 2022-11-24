export default class Typewriter {
    constructor(element, words, duration) {
        this.element = element;
        this.words = JSON.parse(words);
        this.wordIndex = 0;
        this.textToDisplay = '';

        this.duration = parseInt(duration, 10);
        this.isDel = false;

        // typing effect
        this.element.style.borderRight = '2px solid var(--c-neutral-800)';

        this.type();
    }

    type() {
        // const fullTextCurrentIndex = this.wordIndex % this.words.length;
        const fullText = this.words[this.wordIndex % this.words.length];
        // console.log(fullText);

        // if isDel remove letter else add letter (from fullText)
        if (this.isDel) {
            this.textToDisplay = fullText.substring(0, this.textToDisplay.length - 1);
        } else {
            this.textToDisplay = fullText.substring(0, this.textToDisplay.length + 1);
        }

        // display text inside element
        this.element.innerHTML = this.textToDisplay;

        // 
        let speed = 50;
        if (this.isDel) speed /= 2;

        // if fullText is displayed
        if (!this.isDel && this.textToDisplay === fullText) {
            speed = this.duration   // pause before deleting displayed text
            this.isDel = true;      // delete displayed text
        } else if (this.isDel && this.textToDisplay === '') { // no text is displayed
            this.isDel = false;     //
            this.wordIndex++;       // next word
            speed = 500;            // pause before start typing again
        }



        setTimeout(() => this.type(), speed);
    }
}