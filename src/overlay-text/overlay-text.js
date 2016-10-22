let $root = null;
let $input = null;

function attachEvents() {
    $input.addEventListener('input', function (evt) {
        $root.innerText = this.value;
    });

    $input.addEventListener('blur', function (evt) {
        this.focus();
    });
}

export default {
    initialize($overlay, $source) {
        $root = $overlay;
        $input = $source;

        attachEvents();
    }
}
