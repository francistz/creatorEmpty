import AppConfig from "../config/AppConfig";

export default class HttpService {


    public static httpGet(url, param, callback: Function) {

        let xhr = cc.loader.getXMLHttpRequest();
        param = (param) ? param : {};
        var params = [];
        for (var key in param) {
            params.push(key + '=' + param[key]);
        }
        var dataStr = params.join('&');
        if (params.length > 0)
            url += "?" + dataStr;


        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status == 200) {
                let respone: any = xhr.responseText;
                if (respone) {
                    try {
                        respone = JSON.parse(respone);
                    } catch {
                        respone = respone;
                    }
                }
                callback && callback(respone)
            } else if (xhr.readyState === 4 && xhr.status == 400) {
                let respone = JSON.parse(xhr.responseText);
            } else if (xhr.readyState == 4 && xhr.status == 401) {
                this.checkErro();
            }
        }.bind(this);


        xhr.withCredentials = true;
        xhr.open('GET', url, true);

        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type,authorization');
        xhr.setRequestHeader("Content-Type", " text/html");
        // if (this.token) xhr.setRequestHeader('Authorization', this.token);
        xhr.setRequestHeader('tenantId', AppConfig.tenantId);

        xhr.timeout = 8000;// 8 seconds for timeout
        xhr.send();
    }


    static httpPost(url, params, callback: Function) {

        return new Promise((resolve, reject) => {
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.onreadystatechange = function () {

                if (xhr.readyState === 4 && xhr.status == 200) {
                    let respone = xhr.responseText;
                    if (callback) {
                        try {
                            respone = JSON.parse(respone)
                        } catch {
                            respone = respone;
                        }
                        callback(respone);
                    }
                } else if (xhr.readyState === 4 && xhr.status == 400) {
                    let respone = JSON.parse(xhr.responseText);

                } else if (xhr.readyState == 4 && xhr.status == 401) {


                }
            }.bind(this);

            xhr.open("POST", url, true);

            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
            xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
            xhr.setRequestHeader("Content-Type", "application/json");


            // if (this.token) xhr.setRequestHeader('Authorization', this.token);

            xhr.setRequestHeader('tenantId', AppConfig.tenantId);
            xhr.timeout = 8000;// 5 seconds for timeout
            if (params == null) {
                xhr.send();
                return;
            }
            xhr.send(JSON.stringify(params));
        })
    }


}