import Typewriter from './modules/typewriter';
import Request from './modules/request';

(function () {
    let $content = document.getElementById('content');
    let $riddle = document.getElementById('riddle');

    function setupTypewriter() {
        let typewriter = new Typewriter();
        typewriter.render($content);
    }

    function loadRiddle(data) {
        let $image = setupImage(data.image);
        let $text = setupText(data.content);
        let $background = setupBackground(data.background);
        let $music = setupMusic(data.music);
        let $ambience = setupAmbience(data.ambience);

        $riddle.appendChild($image);
        $riddle.appendChild($text);
        $riddle.appendChild($music);
        $riddle.appendChild($ambience);
    }

    function setupImage(src) {
        let $image = new Image();
        $image.src = src;

        return $image;
    }

    function setupText(content) {
        let $text = document.createElement('pre');
        $text.innerHTML = content;

        return $text;
    }

    function setupBackground(url) {
        $content.style.backgroundImage = `url("${url}")`;
    }

    function setupMusic(src) {
        let $music = new Audio();
        $music.type = 'audio/mpeg';
        $music.autoplay = true;
        $music.loop = true;
        $music.src = src;

        return $music;
    }

    function setupAmbience(src) {
        let $ambience = new Audio();
        $ambience.type = 'audio/mpeg';
        $ambience.autoplay = true;
        $ambience.loop = true;
        $ambience.volume = 0.8;
        $ambience.src = src;

        return $ambience;
    }

    function setupRiddle() {
        let request = new Request('riddle.json');
        request.on('success', (response) => loadRiddle(response));
        request.send();
    }

    window.addEventListener('load', () => {
        setupTypewriter();
        setupRiddle();
    });
})();
