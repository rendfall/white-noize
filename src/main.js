import Typewriter from './modules/typewriter';
import Request from './modules/request';

(function () {
    let $content = document.getElementById('content');
    let $riddle = document.getElementById('riddle');

    function setupTypewriter() {
        let typewriter = new Typewriter();
        typewriter.render($content);
    }

    function setupRiddle() {
        let $image = new Image();
        let $text = document.createElement('pre');
        let $music = new Audio();
        let $ambient = new Audio();

        let request = new Request('riddle.json');
        request.on('success', (response) => {
            $image.src = response.image;
            $content.style.backgroundImage = `url("${response.background}")`;

            $text.innerHTML = response.content;

            $music.type = 'audio/mpeg';
            $music.autoplay = true;
            $music.loop = true;
            $music.src = response.music;
            $ambient.type = 'audio/mpeg';

            $ambient.autoplay = true;
            $ambient.loop = true;
            $ambient.volume = 0.8;
            $ambient.src = response.ambient;

            $riddle.appendChild($image);
            $riddle.appendChild($text);
            $riddle.appendChild($music);
            $riddle.appendChild($ambient);
        });
        request.send();
    }

    window.addEventListener('load', () => {
        setupTypewriter();
        setupRiddle();
    });
})();
