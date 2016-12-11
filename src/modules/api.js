import Request from './request';

const SERVER_URL = '//whitenoize.pl';
const SERVICES_URL = {
    GET_RIDDLE: `${SERVER_URL}/api/get_riddle/`,
    VALIDATE: `${SERVER_URL}/api/validate/`
};

class API {
    constructor(riddleName) {
        this.riddleName = riddleName;
        this.method = 'POST';
    }

    makeRequest(url, params) {
        let method = this.method;
        let data = Object.assign({
            riddle: this.riddleName
        }, params);

        return new Request(url, { method, data });
    }

    getRiddle(name) {
        let data = { name };

        return this.makeRequest(SERVICES_URL.GET_RIDDLE, data);
    }

    validate(name, password) {
        let data = { name, password };

        return this.makeRequest(SERVICES_URL.VALIDATE, data);
    }
}

export default API;
