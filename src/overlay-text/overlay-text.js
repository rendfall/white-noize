class OverlayText {
    constructor() {
        this.createDOM();
        this.setupListeners();
    }

    setText(val) {
        this.$text.innerText = val;
    }

    clearText() {
        this.$input.value = '';
        this.$text.innerText = '';
        this.refresh();
    }

    setFocus() {
        this.$input.focus();
    }

    badAnswer() {
        this.$overlay.style.boxShadow = 'inset 0px 0px 59px 10px rgba(255,0,0,0.75)';

        setTimeout(() => {
            this.$overlay.style.boxShadow = '';
            this.clearText();
        }, 1000);
    }

    goodAnswer() {
        this.$overlay.style.boxShadow = 'inset 0px 0px 59px 10px rgba(0,255,0,0.75)';

        setTimeout(() => {
            this.$overlay.style.boxShadow = '';
            this.clearText();
        }, 1000);
    }

    doKeyAction(keyCode) {
        switch (keyCode) {
            case 27: // Escape
                this.clearText();
                break;

            case 13: // Enter
                    // this.goodAnswer();
                    this.badAnswer();
                break;
            default:
                // No default action.
        }
    }

    setupListeners() {
        let $i = this.$input;

        $i.addEventListener('input', (event) => {
            this.setText(event.target.value);
            this.refresh();
        });
        $i.addEventListener('keyup', (event) => this.doKeyAction(event.keyCode));
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
