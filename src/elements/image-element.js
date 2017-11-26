import { Element } from './element';

export class ImageElement extends Element {
    constructor(src) {
        super('img');
        this.src = src;
        this.setup();
    }

    setup() {
        let display = 'block';
        let src = this.src;

        this.setStyles({ display });
        this.setAttributes({ src });
    }
}
