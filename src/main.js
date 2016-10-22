import OverlayText from './overlay-text/overlay-text';

window.addEventListener('load', () => {
    let $overlay = document.getElementById('overlay');
    let $input = document.getElementById('input');
    let overlayText = new OverlayText($input, $overlay);
});
