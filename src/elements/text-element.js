import { Element } from './element';

export class TextElement extends Element {
    constructor(text) {
        super('i');
        this.setHTML(text);
    }

    setHTML(html) {
        this.getElement().innerHTML = html;
    }
}
