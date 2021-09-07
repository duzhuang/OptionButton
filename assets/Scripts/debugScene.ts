import tabView from "./tabView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({type:cc.Label,tooltip:''})
    showLabel: cc.Label = null;
    
    @property({type:tabView,tooltip:''})
    tabViewNode: tabView = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.tabViewNode.initTabView(1);
    }

    onClickOne(event,param){
        console.log("点击第一个");
        this.showLabel.string = param;
    }

    onClickTwo(event,param){
        console.log("点击第二个");
        this.showLabel.string = param;
    }

    onClickThr(event,param){
        console.log("点击第三个");
        this.showLabel.string = param;
    }
    // update (dt) {}
}
