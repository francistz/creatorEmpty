// 这个类主要目的是给发送接收设置缓存队列 （附加功能 网络延迟的获取）
export class GameSocket extends cc.EventTarget {

    pUrl: string = null;
    pWebClient: WebSocket = null;
    pSendData: any[] = []; //发送缓冲
    pRecvData: any[] = [];
    pSendTime = 0;
    pPing = 0;

    constructor() {
        super();
        this.pUrl = null;
        this.pWebClient = null;
        this.pSendData = []; //发送缓冲
        this.pRecvData = [];

        // 开启定时器
        // cc.director.getScheduler().schedule(this.OnMissionUpdate, this, 0, cc.macro.REPEAT_FOREVER, 0, false);
    }

    getPing() {
        return this.pPing;
    }

    OnConnect(url: string) {
        if (this.pWebClient) {
            cc.warn("WebSocket is already create");
            return;
        }
        this.resetData();
        this.pSendTime = 0;
        this.pPing = 0;
        this.pUrl = url;
        this.pWebClient = new WebSocket(url);
        this.pWebClient.binaryType = "arraybuffer";
        cc.warn(cc.js.formatStr("WebSocket OnConnect  %s", url));

        var self = this;
        this.pWebClient.onopen = (ev: Event) => {
            cc.log(cc.js.formatStr("WebSocket onopen  %s", url));
            self.flushSend();
            self.pRecvData.push("webClientOnopen");
        };

        this.pWebClient.onmessage = (msg: MessageEvent) => {
            self.onRecv(msg);
        };

        this.pWebClient.onerror = (evt: Event) => {
            self.pWebClient = null;
            cc.log(cc.js.formatStr("WebSocket onerror  %s", url));
            self.pRecvData.push("webClientOnerror");
        };

        this.pWebClient.onclose = (evt: Event) => {
            self.pWebClient = null;
            cc.log(cc.js.formatStr("WebSocket onclose  %s", url));
            self.pRecvData.push("webClientOnclose");
        };
    }

    getConnect() {
        if (this.pWebClient != null &&
            this.pWebClient.readyState == WebSocket.OPEN) {
            return true;
        }
        return false;
    }

    sendMessage(msg: string) {
        this.pSendData.push(msg);
    };

    //接收数据
    onRecv(msg: MessageEvent) {
        this.pRecvData.push(msg.data);
        if (this.pSendTime != 0) {
            this.pPing = new Date().getTime() - this.pSendTime;
            this.pSendTime = 0;
        }
    }

    // 发送数据
    flushSend() {
        if (this.getConnect()) {
            let data = this.pSendData.shift();
            if (data) {
                this.pWebClient.send(data);
                this.pSendTime = new Date().getTime();
            }
        }
    }

    flushRecv() { }

    OnMissionUpdate() {
        this.flushSend();
        this.flushRecv();
    }

    resetData() {
        this.pSendData = [];
        this.pRecvData = [];
    }

    closeSocket() {
        cc.warn("client closeSocket");
        if (this.pWebClient) {
            this.pWebClient.close();
        }
    }

}
