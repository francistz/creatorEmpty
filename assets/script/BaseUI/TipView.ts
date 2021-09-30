const { ccclass, property } = cc._decorator;

@ccclass
export default class TipView extends cc.Component {

    @property(cc.Node)
    msgText: cc.Node = null;


    private _msg: Array<string> = [];

    private cloneMsg: cc.Node;

    onLoad() {
        this.cloneMsg = cc.instantiate(this.msgText);
        this.node.removeChild(this.msgText);
    }

    start() {

    }

    showTip(str: string) {

        let self = this;
        let tips = cc.instantiate(this.cloneMsg);
        tips.active = true;
        tips.y = 0;
        tips.getChildByName('msg').getComponent(cc.Label).string = str;
        tips.opacity = 0;
        this.node.addChild(tips);
        cc.tween(tips).to(0.1, { opacity: 255 }).to(2, { opacity: 0 }).call(() => {
            self.node.removeChild(tips);
        }).start();

        this.palyAni();
    }

    private palyAni() {
        if (this.node.childrenCount < 1) return;
        for (let i = 0; i < this.node.childrenCount - 1; i++) {
            let y = this.node.children[i].y - this.node.children[i].height - 10;
            cc.tween(this.node.children[i]).to(0.3, { y: y }).start();
        }
    }

    // update (dt) {}
}