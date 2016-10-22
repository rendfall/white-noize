import OverlayText from './overlay-text/overlay-text';

window.addEventListener('load', () => {
    let $div = document.getElementById('div');
    let $input = document.getElementById('input');
    let overlayText = new OverlayText($input, $div);
});
