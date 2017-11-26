import Keyboard from 'keyboardjs';

class Typewriter {
    constructor() {
        this.$text = null;
        this.$overlay = null;

        this.createDOM();
        this.setupListeners();
    }

    setText(value) {
        this.$text.innerText += value;
        this.refresh();
    }

    getText() {
        return this.$text.innerText.trim();
    }

    clearText() {
        this.$text.innerText = '';
        this.refresh();
    }

    setupListeners() {
        Keyboard.on('', (keyEvent) => this.delegateKeyAction(keyEvent));
    }

    delegateKeyAction(keyEvent) {
        let key = keyEvent.key;

        switch (key) {
            case 'Enter':
                return this.handleEnterKey();

            case 'Escape':
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
        if (this.hasValue()) {
            this.addDimmer();
        } else {
            this.removeDimmer();
        }
    }

    createDOM() {
        let $o = this.$overlay = document.createElement('div');
        let $t = this.$text = document.createElement('i');

        $o.id = 'overlay';
        $o.appendChild($t);
    }
}

export default Typewriter;
