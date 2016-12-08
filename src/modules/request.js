import EventEmitter from 'super-event-emitter';

const CONTENT_TYPES = {
    JSON: 'application/json',
    TEXT: 'application/x-www-form-urlencoded',
    PLAIN: 'text/plain',
    HTML: 'text/html',
    XML: 'text/xml'
};

class Request {
    constructor(url, params = {}) {
        this.url = url;
        this.params = params;
        this.xhr = new XMLHttpRequest();

        EventEmitter.mixin(this);
    }

    setContentType() {
        this.xhr.setRequestHeader('Content-Type', `${CONTENT_TYPES.JSON};charset=UTF-8`);
    }

    send() {
        let { xhr, url } = this;
        let { method, data } = this.params;

        xhr.open(method || 'GET', url, true);

        if (Request.isPOST(method)) {
            this.setContentType();
        }

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

    static isPOST(method) {
        return (/POST/i).test(method);
    }
}

export default Request;
