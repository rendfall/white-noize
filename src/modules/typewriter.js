import Keyboard from 'keyboardjs';

const INITIAL_FONT_SIZE = '22vw';
const LETTER_LIMIT = 80;

export class Typewriter {
    constructor() {
        this.$text = null;
        this.$overlay = null;

        this.createDOM();
        this.setupListeners();
    }

    setText(value) {
        if (this.$text.innerText.length > LETTER_LIMIT) {
            return;
        }

        this.$text.innerText += value;
        this.refresh();
    }

    getText() {
        return this.$text.innerText.trim();
    }

    clearText() {
        this.$text.innerText = '';
        this.$text.style.fontSize = INITIAL_FONT_SIZE;
        this.refresh();
    }

    setupListeners() {
        Keyboard.on('', (keyEvent) => this.delegateKeyAction(keyEvent));
    }

    delegateKeyAction(keyEvent) {
        let key = keyEvent.key.toLowerCase();

        switch (key) {
            case 'enter':
                return this.handleEnterKey();

            case 'escape':
                return this.handleEscapeKey();

            default:
                return this.handleAnyKey(key);
        }
    }

    handleEnterKey() {
        if (!this.hasValue()) {
            return;
        }

        this.clearText();
    }

    handleEscapeKey() {
        if (!this.hasValue()) {
            return;
        }

        this.clearText();
    }

    handleAnyKey(key) {
        let regex = new RegExp("^[a-zA-Z0-9]$");
        if (regex.test(key)) {
            this.setText(key);
        }
    }

    render($target) {
        $target.appendChild(this.$overlay);
    }

    hasValue() {
        return (this.getText().length > 0);
    }

    addDimmer() {
        this.$overlay.classList.add('dim');
    }

    removeDimmer() {
        this.$overlay.classList.remove('dim');
    }

    refresh() {
        this.resize();

        if (this.hasValue()) {
            this.addDimmer();
        } else {
            this.removeDimmer();
        }
    }

    resize() {
        let windowWidth = window.innerWidth;
        let textWidth = this.$text.clientWidth;

        if (textWidth > windowWidth) {
            let fontSize = parseInt(this.$text.style.fontSize);
            this.$text.style.fontSize = `${fontSize - 1}vw`;
            this.resize();
        }
    }

    createDOM() {
        let $o = this.$overlay = document.createElement('div');
        let $t = this.$text = document.createElement('i');

        $o.id = 'overlay';
        $t.style.fontSize = INITIAL_FONT_SIZE;

        $o.appendChild($t);
    }
}
