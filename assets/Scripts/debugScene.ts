const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({type:cc.Label,tooltip:''})
    showLabel: cc.Label = null;

    protected onLoad(): void {        
        cc.game.on("OptionButtonClick",this.onOptionButtonClick,this);
    }

    start () {
        
    }

    onOptionButtonClick(btnIndex) {
        if (btnIndex == 0) {
            this.showLabel.string = "第一个";
        }
        if (btnIndex == 1) {
            this.showLabel.string = "第二个";
        }
        if (btnIndex == 2) {
            this.showLabel.string = "第三个";
        }
    }

    onClickOne(event, param) {
        console.log("手动绑定第一个", param);
    }

    onClickTwo(event, param) {
        console.log("手动绑定第二个", param);
    }

    onClickThr(event, param) {
        console.log("手动绑定第三个", param);
    }
    // update (dt) {}
}
