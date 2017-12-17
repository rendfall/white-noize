import { ImageElement, TextElement} from '../elements';

import 'howler';

export class Riddle {
    constructor($riddle, data) {
        this.$riddle = $riddle;

        this.setupImage(data.image);
        this.setupText(data.content);
        this.setupBackground(data.background);
        this.setupMusic(data.music);
        this.setupAmbience(data.ambience);
    }

    destroy() {
        return new Promise((resolve, reject) => {
            this.$riddle.innerHTML = '';
            this.$riddle.style.background = 'none';
            this.music && this.music.unload();
            this.ambience && this.ambience.unload();

            resolve();
        });
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
        this.$riddle.style.background = `#333 url("${url}") repeat 0 0`;
    }
}
