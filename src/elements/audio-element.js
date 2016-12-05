import Element from './element';

class AudioElement extends Element {
    constructor(src, type = 'audio/mpeg') {
        super('audio');

        this.src = src;
        this.type = type;

        this.setup();
    }

    setup() {
        let src = this.src;
        let type = this.type;
        let loop = true;

        this.setAttributes({ src, type, loop });
    }

    setVolume(value) {
        this.getElement().volume = value;
    }

    play() {
        this.getElement().play();
    }

    pause() {
        this.getElement().pause();
    }
}

export default AudioElement;
