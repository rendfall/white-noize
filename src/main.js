import axios from 'axios';

import Typewriter from './modules/typewriter';
import { AudioElement, ImageElement, TextElement } from './elements/all';

(function () {
    let $content = document.getElementById('content');
    let $riddle = document.getElementById('riddle');

    function setupTypewriter() {
        let typewriter = new Typewriter();
        typewriter.render($content);

        typewriter.on('enter', (payload) => {
            validateAnswer(payload.value, (url) => {
                if (url) {
                    alert('Congratulation!');
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

    function validateAnswer(text, callback) {
        let method = 'post';
        let url = 'http://whitenoize.pl/zest_riddle/';
        let data = {
            riddle: 0,
            ts: Date.now(),
            answer: text
        };

        axios.request({ url, method, data })
            .then((response) => callback(response.url))
            .catch((error) => { console.log(error) });
    }

    function setupRiddle() {
        let url = 'http://whitenoize.pl/api/get_riddle/index.php';
        let method = 'post';
        let data = { name: 'zest_riddle', password: 'one' };

        axios.request({ method, url, data })
            .then((response) => loadRiddle(response.data))
            .catch((error) => { console.log(error) });
    }

    window.addEventListener('load', () => {
        setupTypewriter();
        setupRiddle();
    });
})();
