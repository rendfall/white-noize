
import axios from 'axios/index';

import { Riddle } from './riddle';

export class RiddleManager {

    static get HTTP_METHOD() { return 'POST'; };
    static get API_URL() { return 'http://whitenoize.pl/api/get_riddle/index.php'; }

    constructor($content) {
        this.$riddle = document.getElementById('riddle');
        this.$content = $content;

        this.riddles = new Map();
        this.currentRiddle = null;
    }

    setRiddle(name, data) {
        this.destroyCurrentRiddle()
            .then(() => {
                let riddle = new Riddle(this.$riddle, data);
                this.riddles.set(name, riddle);
                this.currentRiddle = riddle;
            });
    }

    destroyCurrentRiddle() {
        return (this.currentRiddle)
            ? this.currentRiddle.destroy()
            : Promise.resolve();
    }

    getRiddle(name) {
        return this.riddles.get(name);
    }

    fetchRiddle(params) {
        let data = Object.assign({
            name: 'zest_riddle'
        }, params || {});
        let url = RiddleManager.API_URL;
        let method = RiddleManager.HTTP_METHOD;

        return axios.request({ method, url, data });
    }

    validateAnswer(text) {
        return this.fetchRiddle({ password: text });
    }
}
