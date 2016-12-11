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

        typewriter.on('enter', (payload) => {
            validateAnswer(payload.value, (response) => {
                if (response) {
                    window.location.hash = response.next;
                    setupRiddle();
                } else {
                    alert('Bad answer. Try again.');
                }
            });
        });
    }

    function loadRiddle(data) {
        let { image, content, background, music, ambience } = data;

        setupImage(image);
        setupText(content);
        setupBackground(background);
        setupMusic(music);
        setupAmbience(ambience);
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

    function validateAnswer(password, callback) {
        let name = getNameFromHash() || 'one';
        let request = ZestRiddle.validate(name, password);

        request.on('success', (response) => callback(response));
        request.on('error', (error) => { console.log(error) });
        request.send();
    }

    function setupRiddle() {
        // TODO(rendfall): Create destroy riddle feature.
        $riddle.innerHTML = '';

        let name = (getNameFromHash() || 'one');
        let request = ZestRiddle.getRiddle(name);

        request.on('success', (response) => loadRiddle(response));
        request.on('error', (error) => { console.log(error) });
        request.send();
    }

    window.addEventListener('load', () => {
        setupTypewriter();
        setupRiddle();
    });
})();
