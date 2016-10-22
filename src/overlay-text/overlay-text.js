let $root = null;
let $input = null;

function attachEvents() {
    $input.addEventListener('input', (evt) => {
        $root.innerText = evt.target.value;
    });

    $input.addEventListener('blur', (evt) => {
        evt.target.focus();
    });
}

export default {
    initialize($overlay, $source) {
        $root = $overlay;
        $input = $source;

        attachEvents();
    }
}
