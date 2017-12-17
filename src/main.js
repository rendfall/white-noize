import './assets/styles.scss';

import { RiddleManager, Typewriter } from './core';


class App {
    constructor() {
        this.$content = document.getElementById('content');
        this.riddleManager = new RiddleManager(this.$content);

        this.setupTypewriter();
        this.setupRiddle();
    }

    setupTypewriter() {
        let typewriter = new Typewriter();

        typewriter.onValueChange((value) => {
            this.riddleManager.validateAnswer(value)
                .then((response) => {
                    return (response.data)
                        ? this.riddleManager.setRiddle(value, response.data)
                        : this.badAnswerHandler();
                });
        });

        typewriter.render(this.$content);
    }

    setupRiddle() {
        let firstRiddleName = 'one';

        this.riddleManager.fetchRiddle({ password: firstRiddleName })
            .then((response) => {
                this.riddleManager.setRiddle(firstRiddleName, response.data);
            });
    }

    badAnswerHandler() {
        alert('Bad answer. Try again.');
    }
}

window.addEventListener('load', () => {
    new App();
});
