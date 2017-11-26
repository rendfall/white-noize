import axios from 'axios';
import 'howler';

import { Typewriter } from './core/typewriter';
import { ImageElement, TextElement } from './elements';

import './assets/styles.scss';

class App {
    constructor({ $content, $riddle }) {
        this.$content = $content;
        this.$riddle = $riddle;

        this.ambience = null;
        this.music = null;

        this.setupTypewriter();
        this.setupRiddle();
    }

    setupTypewriter() {
        let typewriter = new Typewriter();

        typewriter.onValueChange((value) => {
                if (!value) {
                    return;
                }

                this.validateAnswer(value, (response) => {
                    if (response.data) {
                        this.loadRiddle(response.data)
                    } else {
                        alert('Bad answer. Try again.');
                    }
                });
            });

        typewriter.render(this.$content);
    }

    loadRiddle(data) {
        let { image, content, background, music, ambience } = data;

        this.$riddle.innerHTML = '';
        this.music && this.music.unload();
        this.ambience && this.ambience.unload();

        this.setupImage(image);
        this.setupText(content);
        this.setupBackground(background);
        this.setupMusic(music);
        this.setupAmbience(ambience);
    }

    setupImage(src) {
        let $image = new ImageElement(src);
        $image.render(this.$riddle);
    }

    setupText(content) {
        let $text = new TextElement(content);
        $text.render(this.$riddle);
    }

    setupMusic(src) {
        this.music = new Howl({
            src: [src],
            autoplay: true,
            loop: true,
            volume: 1
        });
    }

    setupAmbience(src) {
        this.ambience = new Howl({
            src: [src],
            autoplay: true,
            loop: true,
            volume: 0.5,
        });
    }

    setupBackground(url) {
        this.$content.style.background = `#333 url("${url}") repeat 0 0`;
    }

    validateAnswer(text, callback) {
        let method = 'post';
        let url = 'http://whitenoize.pl/api/get_riddle/index.php';
        let data = {
            name: 'zest_riddle',
            password: text
        };

        axios.request({ url, method, data })
            .then((response) => callback(response))
            .catch((error) => { console.log(error) });
    }

    setupRiddle() {
        let url = 'http://whitenoize.pl/api/get_riddle/index.php';
        let method = 'post';
        let data = { name: 'zest_riddle' };

        axios.request({ method, url, data })
            .then((response) => this.loadRiddle(response.data))
            .catch((error) => { console.log(error) });
    }
}

window.addEventListener('load', () => {
    let $content = document.getElementById('content');
    let $riddle = document.getElementById('riddle');

    new App({ $content, $riddle });
});
