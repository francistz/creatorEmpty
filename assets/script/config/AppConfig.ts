export default class AppConfig {


    public static tenantId: string = "AS";

    public static lobbyWs: string = "";
    public static lobbyHttp: string = "";
    public static gameWs: string = "";
    public static gameHttp: string = "";
    public static lobbyPort: string = "";
    public static gamePort: string = "";


    private static _instance: AppConfig;
    public static getInstance(): AppConfig {
        if (!this._instance)
            this._instance = new AppConfig();
        return this._instance;
    }

    init() {
        let config = window['getAppConfig'] && window['getAppConfig']();
        if (config) {
            AppConfig.lobbyHttp = config.lobbyHttp;
            AppConfig.lobbyPort = config.lobbyPort;
            AppConfig.lobbyWs = config.lobbyPort;
            AppConfig.gameWs = config.gameWs;
            AppConfig.gameHttp = config.gameHttp;
            AppConfig.gamePort = config.gamePort;
        }
    }

}