export class EventManager {
    //事件管理者唯一实例
    private static _instance: EventManager = null;

    //存放事件管理者监听的事件item
    private _eventList: Map<number, Array<EventItem>> = null;
    /**事件管理者的构造函数 */
    constructor() {
        this._eventList = new Map<number, Array<EventItem>>();
    }

    /**将事件管理者设置为单例模式 
     * @returns {EventManager} 返回事件监听唯一实例
    */
    public static getInstance(): EventManager {
        if (!this._instance) {
            this._instance = new EventManager();
        }
        return this._instance;
    }

    /**
     * 事件管理者的事件监听
     * @param eventName 事件名称
     * @param callback 监听执行的回调
     * @param target 监听对象
     */
    public on(eventName: number, callback: Function, target: any) {
        let array: any = this._eventList.get(eventName);
        if (!array) {
            array = new Array<EventItem>();
        }
        else {
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                if (element.callback === callback && element.target === target) {
                    return;
                }
            }
        }
        const data = new EventItem();
        data.name = eventName;
        data.callback = callback;
        data.target = target;
        array.push(data);
        this._eventList.set(eventName, array);
    }

    /**
     * 事件管理者取消事件监听
     * @param eventName 事件名称
     * @param callback 
     * @param target 
     */
    public off(eventName: number, callback: Function, target: any) {
        let array: any = this._eventList.get(eventName);
        if (!array) {
            return;
        }
        else {
            for (let i = array.length - 1; i >= 0; i--) {
                const element = array[i];
                if (element.callback === callback && element.target === target) {
                    array.splice(i, 1);
                }
            }
        }
    }

    /**
     * 事件管理者的发送消息
     * @param eventName 事件名称
     * @param argArray 发送数据时带的数据
     */
    public emit(eventName: number, data: any) {
        let array: any = this._eventList.get(eventName);
        if (!array) {
            return;
        }
        else {
            for (let i = array.length - 1; i >= 0; i--) {
                const element = array[i];
                if (element.callback && element.target) {
                    element.callback.apply(element.target, [{ data: data, cmd: eventName }]);
                }
            }
        }
    }
}

export class EventItem {
    name: number = null;
    callback: Function = null;
    target: any = null;
}