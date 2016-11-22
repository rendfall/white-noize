import OverlayText from './overlay-text/overlay-text';

window.addEventListener('load', () => {
    let $content = document.getElementById('content');
    let overlayText = new OverlayText();

    overlayText.render($content);
});
