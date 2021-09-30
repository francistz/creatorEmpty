import LayerManager from "./BaseUI/LayerManager";
import AppConfig from "./config/AppConfig";
import { EventManager } from "./utils/EventManager";
import { MessageFlag } from "./utils/MessageFlag";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {



    onLoad() {

    }

    start() {
        cc.game.addPersistRootNode(this.node);
        LayerManager.getIntance().initUI(this.node);
        AppConfig.getInstance().init();



        // LayerManager.getIntance().addPanel('updateLayer', null, true);
        // LayerManager.getIntance().showLoading('hhhhhhhhhhhhhh');
        EventManager.getInstance().on(MessageFlag.LoginSuccess, this.test, this);
        EventManager.getInstance().emit(MessageFlag.LoginSuccess, { pwd: '123456' })


    }

    private test(data) {
        console.log(data);
    }

    onDestroy() {
        EventManager.getInstance().off(MessageFlag.LoginSuccess, this.test, this);
    }
    // update (dt) {}
}
