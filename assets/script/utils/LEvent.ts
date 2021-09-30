export default class LEvent extends cc.Event{

    public static SHOW:string = "show"
    public static CLOSE:string = "close";
    public static ITEM_CLICK:string = "ITEM_CLICK";
    public static KEY_BORD:string = "KEY_BORD";

    public static UP_DATE:string = "UP_DATE";

    public static CHANGED:string = "CHANGED";
    public static SELECT:string = "SELECT";

    public static POP:string = "POP";

    public static COMPLETE:string = "COMPLETE";
    public static CANCEL:string = "CANCEL";
    public static CONFIRM:string = "CONFIRM";
    /**
     * 提交
     */
    public static SUBMIT:string = "SUBMIT";        

    public static readonly ADD_ITEM:string = "ADD_ITEM";
    public static readonly REMOVE_ITEM:string = "REMOVE_ITEM";

    public static readonly RESIZE:string = "RESIZE";


    public static readonly SOFT_KEY_INPUT_COMPLETE:string = "RESIZE";
    
    public data:any;
    constructor(type: string,data?:any, bubbles?: boolean){
        super(type,bubbles);
        this.data = data;
    }
}