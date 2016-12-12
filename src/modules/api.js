import Request from './request';

const SERVER_URL = '//whitenoize.pl';
const GET_RIDDLE_SERVICE_URL = `${SERVER_URL}/api/get_riddle/`;

class API {
    constructor(riddleName) {
        this.name = riddleName;
        this.method = 'POST';
    }

    makeRequest(url, params) {
        let method = this.method;
        let data = Object.assign({
            name: this.name
        }, params);

        return new Request(url, { method, data });
    }

    getRiddle(password) {
        let data = { password };

        return this.makeRequest(GET_RIDDLE_SERVICE_URL, data);
    }
}

export default API;
