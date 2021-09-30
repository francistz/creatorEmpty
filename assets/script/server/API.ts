import HttpService from "./HttpServer";

export default class API {
    constructor() {

    }

    

    static login(callback) {
        HttpService.httpGet('', {}, callback);
    }
}