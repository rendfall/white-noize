class OverlayText {
    constructor() {
        this.createDOM();
        this.setupListeners();
    }

    setText(val) {
        this.$text.innerText = val;
    }

    setFocus() {
        this.$input.focus();
    }

    setupListeners() {
        let $i = this.$input;

        $i.addEventListener('input', (event) => {
            this.setText(event.target.value);
            this.refresh();
        });
        $i.addEventListener('blur', (event) => this.setFocus());
    }

    render($target) {
        $target.appendChild(this.$overlay);
    }

    refresh() {
        if (this.$input.value.length > 0) {
            this.$overlay.classList.add('dim');
        } else {
            this.$overlay.classList.remove('dim');
        }
    }

    createDOM() {
        let $o = this.$overlay = document.createElement('div');
        let $t = this.$text = document.createElement('i');
        let $i = this.$input = document.createElement('input');

        $o.id = 'overlay';
        $i.type = 'text';
        $i.autofocus = true;

        $o.appendChild($t);
        $o.appendChild($i);
    }
}

export default OverlayText;
