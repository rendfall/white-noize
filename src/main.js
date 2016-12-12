import Typewriter from './modules/typewriter';
import API from './modules/api';
import { AudioElement, ImageElement, TextElement } from './elements/all';

(function () {
    let $content = document.getElementById('content');
    let $riddle = document.getElementById('riddle');
    let ZestRiddle = new API('zest_riddle');

    function getNameFromHash() {
        let hash = window.location.hash;
        return (hash) ? hash.slice(1) : '';
    }

    function setupTypewriter() {
        let typewriter = new Typewriter();
        typewriter.render($content);

        typewriter.on('enter', (payload) => setupRiddle(payload.value));
    }

    function loadRiddle(data) {
        let { image, content, background, music, ambience } = data;

        setupImage(image);
        setupText(content);
        setupBackground(background);
        setupMusic(music);
        setupAmbience(ambience);
    }

    function setupHash(name) {
        window.location.hash = name;
    }

    function setupImage(src) {
        let image = new ImageElement(src);
        image.render($riddle);
    }

    function setupText(content) {
        let text = new TextElement(content);
        text.render($riddle);
    }

    function setupBackground(url) {
        $content.style.background = `#333 url("${url}") repeat 0 0`;
    }

    function setupMusic(src) {
        let music = new AudioElement(src);

        music.setVolume(1.0);
        music.play();
        music.render($riddle);
    }

    function setupAmbience(src) {
        let ambience = new AudioElement(src);

        ambience.setVolume(0.5);
        ambience.play();
        ambience.render($riddle);
    }

    function clearRiddle() {
        $riddle.innerHTML = '';
    }

    function setupRiddle(name) {
        let request = ZestRiddle.getRiddle(name);

        request.on('success', (response) => {
            if (response) {
                clearRiddle();
                setupHash(name);
                loadRiddle(response);
            } else {
                alert('Bad answer. Try again.');
            }
        });
        request.on('error', (error) => { console.log(error) });
        request.send();
    }

    window.addEventListener('load', () => {
        let name = (getNameFromHash() || 'one');

        setupTypewriter();
        setupRiddle(name);
    });
})();
