
export class AppUrlsService {
    public domain = `https://admin.gkdirect.co.uk`;
    //public domain = `http://localhost:55228/`;
    get oauth() {
        return `${this.domain}/oauth`;
    }

    get thingsManager() {
        return `${this.domain}/thingsmanager`;
    }

    get signOutRedirectUrl() {
        return `http://web.dev.infradatum.com:8080/onstak/sso-login`;
    }

    get authGuardRedirectUrl() {
        return `http://web.dev.infradatum.com:8080/onstak/sso-login`;
    }

    get scmRedirectUrl() {
        return `${this.domain}/iot-scm`;
    }

    get socketStreamsUrl() {
        return `http://streams.dev.infradatum.com`;

    }
}