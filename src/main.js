import Typewriter from './modules/typewriter';

window.addEventListener('load', () => {
    let $content = document.getElementById('content');
    let typewriter = new Typewriter();

    typewriter.render($content);
});
