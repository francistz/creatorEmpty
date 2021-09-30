
import LayerManager from "./LayerManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BasePanel extends cc.Component {


    @property(cc.Node)
    close_btn: cc.Node = null;

    onLoad() {
        this.close_btn && this.close_btn.on(cc.Node.EventType.TOUCH_START, this.closeUI, this);
    }
   
    start() {

    }
    private closeUI() {
        this.node.parent && this.node.parent.removeChild(this.node);
    }


    // update (dt) {}
}
