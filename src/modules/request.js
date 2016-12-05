import EventEmitter from 'super-event-emitter';

const CONTENT_TYPES = {
    JSON: 'application/json',
    TEXT: 'application/x-www-form-urlencoded',
    PLAIN: 'text/plain',
    HTML: 'text/html',
    XML: 'text/xml'
};

class Request {
    constructor(url, data = {}) {
        this.params = { url, data };

        EventEmitter.mixin(this);
    }

    send() {
        let { url, data } = this.params;
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.onloadend = () => {
            try {
                let response = JSON.parse(xhr.responseText);
                this.emit('success', response);
            } catch (error) {
                this.emit('error', error);
            }
        };
        xhr.send(JSON.stringify(data));
    }
}

export default Request;
