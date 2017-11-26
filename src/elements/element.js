export class Element {
    constructor(nodeName) {
        this.$element = document.createElement(nodeName);
    }

    getElement() {
        return this.$element;
    }

    setAttributes(attrs) {
        let $el = this.getElement();

        for (let [name, value] of Object.entries(attrs)) {
            $el.setAttribute(name, value);
        }
    }

    setStyles(styles) {
        let $el = this.getElement();

        for (let [name, value] of Object.entries(styles)) {
            $el.style[name] = value;
        }
    }

    render($target) {
        $target.appendChild(this.getElement());
    }
}
