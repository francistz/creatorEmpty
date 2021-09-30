import BasePanel from "./BasePanel";
import TipView from "./TipView";


const { ccclass, property } = cc._decorator;

@ccclass
export default class LayerManager extends cc.Component {


    private panelLayer: cc.Node;
    private loadingLayer: cc.Node;
    private tipLayer: cc.Node;
    private updateLayer: cc.Node;
    private panelUI: cc.Node;

    private _uiMap: Map<string, cc.Node> = new Map();
    private _sceneMap = [];

    private static _instance: LayerManager;
    public static getIntance(): LayerManager {
        if (!this._instance)
            this._instance = new LayerManager();
        return this._instance;
    }

    public initUI(root: cc.Node) {
        console.log("注册场景");
        this.panelLayer = root.getChildByName('panelLayer');
        this.loadingLayer = root.getChildByName('loadingLayer');
        this.tipLayer = root.getChildByName('tipLayer');
        this.updateLayer = root.getChildByName('updateLayer');
        this.panelUI = cc.instantiate(this.panelLayer.getChildByName('panelUI'));
        this.loadingLayer.active = false;
        this.panelLayer.removeAllChildren();
    }

    /**
     * @param uipath 预制体路径
     * @param callback ui加载完成回调
     * @param showAni 是否显示弹出动画
     * @param mask 背景遮罩
     * */
    public addPanel(uipath: string, callback: Function = null, showAni: boolean = false, mask: boolean = true) {
        let ui = this._uiMap.get(uipath);
        let path = uipath.split('/');
        const uiName = path[path.length - 1];
        if (ui) {
            this.showUI(ui, uiName, showAni, mask);
        } else {
            cc.loader.loadRes(uipath,
                (err, prefab) => {
                    if (err == null && prefab) {
                        let uiNode: cc.Node = cc.instantiate(prefab);
                        if (uiNode.getComponents(BasePanel)) uiNode.getComponents(BasePanel)
                        this._uiMap.set(uipath, uiNode);
                        this.showUI(uiNode, uiName, showAni, mask);
                    } else {
                        cc.warn("加载Prefab：" + uipath + "错误");

                    }
                });
        }
    }
    /**
     * @param name 弹出name
     * @param ani 消失动画
     * **/
    public removePanel(name?: string, ani: boolean = true) {
        let node: cc.Node;
        if (name) {
            node = this.panelLayer.getChildByName(name);
        } else {
            let index = this.panelLayer.childrenCount;
            if (index > 0) {
                node = this.panelLayer.children[index - 1];
            }
        }
        if (ani && node) {
            cc.tween(node).to(0.1, { scaleX: 0, scaleY: 0 }).call(() => {
                this.panelLayer.removeChild(node);
            }).start()
        } else {
            node && this.panelLayer.removeChild(node);
        }
    }

    public removeAllPanel() {
        this.panelLayer.removeAllChildren();
    }

    private showUI(ui: cc.Node, uiName, showAni, mask) {

        if (showAni) {
            ui.scaleX = 0;
            ui.scaleY = 0;
        }

        this.panelLayer.addChild(ui);

        if (showAni) {
            cc.tween(ui).to(0.1, { scaleX: 1, scaleY: 1 }).start();
        } else
            ui.scaleX = ui.scaleY = 1;
    }


    public showLoading(msg?: string) {
        if (msg && this.loadingLayer.getChildByName('msg'))
            this.loadingLayer.getChildByName('msg').getComponent(cc.Label).string = msg;
        this.loadingLayer.active = true;
    }
    public hideLoading() {
        this.loadingLayer.active = false;
    }

    public showToast(str: string) {
        this.tipLayer.getComponent(TipView).showTip(str);
    }

    public loadScene(name: string) {
        let scene = this._sceneMap.indexOf(name);
        let self = this;
        if (scene != -1)
            cc.director.loadScene(name);
        else {
            this.showLoading('正在加载')
            cc.director.preloadScene(name, function () {
                self.hideLoading();
                cc.director.loadScene(name);
                self._sceneMap.push(name);
            });
        }
    }
}
