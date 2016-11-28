import EventEmitter from 'super-event-emitter';
import KEYCODES from './../common/keycodes';

const EVENTS = {
    ENTER: 'OverlayText:enter'
};

class OverlayText {
    constructor() {
        EventEmitter.mixin(this);

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

    doKeyAction(keyCode) {
        switch (keyCode) {
            case KEYCODES.ESCAPE:
                this.clearText();
                break;
            case KEYCODES.ENTER:
                alert('ok');
                break;
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

    hasValue() {
        let value = this.$input.value.trim();
        return (value.length > 0);
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
        let $i = this.$input = document.createElement('input');

        $o.id = 'overlay';
        $i.type = 'text';
        $i.autofocus = true;

        $o.appendChild($t);
        $o.appendChild($i);
    }
}

export default OverlayText;
