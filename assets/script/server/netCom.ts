
const {ccclass, property} = cc._decorator;

@ccclass
export default class NetCom extends cc.Component {
    
    onLoad() {
        cc.game.addPersistRootNode(this.node);
    }

    start() {
       
    }

    private socketOpen(v?: any): void {
      
    }

    private rMessage(v?: any): void {
       
    }

    update(dt: number) {
        
    }
}