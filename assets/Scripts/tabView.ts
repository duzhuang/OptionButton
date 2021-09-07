import tabViewBase from "./tabViewBase";
/**组件的一些功能是否启用 */
var showType = cc.Enum({
    "turnOn": 1,
    "turnOff": 0,
})

const { ccclass, property } = cc._decorator;

@ccclass
export default class tabView extends tabViewBase {

    @property({ type: showType, tooltip: "是否启用字体的缩放" })
    usingFontScale = showType.turnOff;

    @property({ type: cc.Integer, tooltip: '被选中的字体大小', visible() { return this.usingFontScale == showType.turnOn && this.usingSprite == showType.turnOff } })
    selectFontSize = 24;

    @property({ type: cc.Integer, tooltip: "未被选中字体大小", visible() { return this.usingFontScale == showType.turnOn && this.usingSprite == showType.turnOff } })
    normalFontSize = 22;

    @property({ type: showType, tooltip: "是否启用字体的颜色" })
    usingFontColor = showType.turnOff;
    @property({ type: cc.Color, tooltip: '被选中字体的颜色', visible() { return this.usingFontColor == showType.turnOn && this.usingSprite == showType.turnOff } })
    selectFontColor: cc.Color = null;

    @property({ type: cc.Color, tooltip: '未被选中字体颜色', visible() { return this.usingFontColor == showType.turnOn && this.usingSprite == showType.turnOff } })
    normalFontColor: cc.Color = null;

    @property({ type: showType, tooltip: '是否启用图片为点击之后的状态' })
    _usingSprite = showType.turnOff;

    @property({ type: showType, tooltip: '是否启用图片为点击之后的状态' })
    set usingSprite(value) {
        if (value == showType.turnOn) {
            this.usingFontScale = showType.turnOff;
            this.usingFontColor = showType.turnOff;
        }
        this._usingSprite = value;
    }
    get usingSprite() {
        return this._usingSprite;
    }

    @property({ type: cc.SpriteFrame, tooltip: '按钮选中之后的图片', visible() { return this.usingSprite == showType.turnOn } })
    selectSpriteFrameList: cc.SpriteFrame[] = [];

    /**
     * 按钮的具体节点展示
     * @param btnNode 
     * @returns 
     */
    protected initButtonNode(btnNode) {
        super.initButtonNode(btnNode);
        let btnSpr = btnNode.addComponent(cc.Sprite);
        btnNode.setContentSize(this.buttonItemContentSize.x, this.buttonItemContentSize.y);
        btnNode.name = "btnNode";
        let selectNode = new cc.Node();
        selectNode.addComponent(cc.Sprite);
        selectNode.name = "select";
        selectNode.parent = btnNode;
        let lblNode = new cc.Node();
        let lblCom = lblNode.addComponent(cc.Label);
        lblCom.string = "按钮";
        lblCom.fontSize = this.selectFontSize;
        lblCom.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        lblCom.verticalAlign = cc.Label.VerticalAlign.CENTER;
        lblCom.lineHeight = this.selectFontSize + 2;
        lblNode.name = "lbl";
        lblNode.parent = btnNode;
        return btnNode;
    }

    /**
      * 按钮切换样式（重写此函数以实现自定义样式）
    */
    protected refreshBtn(isSelect: boolean, btnNode: cc.Node, btnIndex?: number) {
        super.refreshBtn(isSelect, btnNode, btnIndex);
        btnNode.getChildByName(this._btnSelect).active = isSelect;
        if (this.usingFontScale == showType.turnOn) {
            if (isSelect) {
                btnNode.getChildByName(this._btnLbl).getComponent(cc.Label).fontSize = this.selectFontSize;
            } else {
                btnNode.getChildByName(this._btnLbl).getComponent(cc.Label).fontSize = this.normalFontSize;
            }
        }
        if (this.usingFontColor == showType.turnOn) {
            if (isSelect) {
                btnNode.getChildByName(this._btnLbl).color = this.selectFontColor;
            } else {
                btnNode.getChildByName(this._btnLbl).color = this.normalFontColor;
            }
        }
        if (this._usingSprite == showType.turnOn) {
            btnNode.getChildByName(this._btnSelect).getComponent(cc.Sprite).spriteFrame = this.selectSpriteFrameList[btnIndex];
        }
    }


    initTabView(defaultSelect: number = 0){
        super.initTabView(defaultSelect);
    }

    // update (dt) {}
}
