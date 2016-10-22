class OverlayText {
    constructor($input, $overlay) {
        this.$input = $input;
        this.$overlay = $overlay;

        this.attachEvents();
    }

    setText(val) {
        this.$overlay.innerText = val;
    }

    setFocus() {
        this.$input.focus();
    }

    attachEvents() {
        this.$input.addEventListener('input', (evt) => this.setText(evt.target.value));
        this.$input.addEventListener('blur', () => this.setFocus());
    }
}

export default OverlayText;
