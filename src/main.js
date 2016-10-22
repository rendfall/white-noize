import overlayText from './overlay-text/overlay-text';

window.addEventListener('load', () => {
    let $div = document.getElementById('div');
    let $input = document.getElementById('input');

    overlayText.initialize($div, $input);
});
