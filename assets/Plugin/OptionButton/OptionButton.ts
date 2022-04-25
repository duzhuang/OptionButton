import OptionButtonBase from "./OptionButtonBase";

/**组件的一些功能是否启用 */
var showType = cc.Enum({
    "TurnOn": 1,
    "TurnOff": 0,
})

const { ccclass, property, menu,executeInEditMode } = cc._decorator;

/**
 * OptionButton的控制基类
 * author:daxing
 * 点击按钮会抛出”OptionButtonClick“事件 数据是当前按钮对应的index
 */
@ccclass
@menu("Plugin/OptionButton")
@executeInEditMode
export default class OptionButton extends OptionButtonBase {

    @property({ type: showType, tooltip: "是否启用字体的缩放" })
    usingFontScale = showType.TurnOff;

    @property({ type: cc.Integer, tooltip: '被选中的字体大小', visible() { return this.usingFontScale == showType.TurnOn && this.usingSprite == showType.TurnOff } })
    selectFontSize = 24;

    @property({ type: cc.Integer, tooltip: "未被选中字体大小", visible() { return this.usingFontScale == showType.TurnOn && this.usingSprite == showType.TurnOff } })
    normalFontSize = 22;

    @property({ type: showType, tooltip: "是否启用字体的颜色" })
    usingFontColor = showType.TurnOff;
    @property({ type: cc.Color, tooltip: '被选中字体的颜色', visible() { return this.usingFontColor == showType.TurnOn && this.usingSprite == showType.TurnOff } })
    selectFontColor: cc.Color = new cc.Color();

    @property({ type: cc.Color, tooltip: '未被选中字体颜色', visible() { return this.usingFontColor == showType.TurnOn && this.usingSprite == showType.TurnOff } })
    normalFontColor: cc.Color = new cc.Color();

    @property({ type: showType, tooltip: '是否启用图片为点击之后的状态' })
    _usingSprite = showType.TurnOff;

    @property({ type: showType, tooltip: '是否启用图片为点击之后的状态' })
    set usingSprite(value) {
        if (value == showType.TurnOn) {
            this.usingFontScale = showType.TurnOff;
            this.usingFontColor = showType.TurnOff;
        }
        this._usingSprite = value;
    }
    get usingSprite() {
        return this._usingSprite;
    }

    @property({ type: cc.SpriteFrame, tooltip: '按钮选中之后的图片', visible() { return this.usingSprite == showType.TurnOn } })
    selectSpriteFrameList: cc.SpriteFrame[] = [];

    /**
     * 按钮的具体节点展示
     * @param btnNode 
     * @returns 
     */
    protected generateButtonNode(btnNode) {
        super.generateButtonNode(btnNode);
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
        if (this.usingFontScale == showType.TurnOn) {
            if (isSelect) {
                btnNode.getChildByName(this._btnLbl).getComponent(cc.Label).fontSize = this.selectFontSize;
            } else {
                btnNode.getChildByName(this._btnLbl).getComponent(cc.Label).fontSize = this.normalFontSize;
            }
        }
        if (this.usingFontColor == showType.TurnOn) {
            if (isSelect) {
                btnNode.getChildByName(this._btnLbl).color = this.selectFontColor;
            } else {
                btnNode.getChildByName(this._btnLbl).color = this.normalFontColor;
            }
        }
        if (this._usingSprite == showType.TurnOn) {
            btnNode.getChildByName(this._btnSelect).getComponent(cc.Sprite).spriteFrame = this.selectSpriteFrameList[btnIndex];
        }
    }

    public setDefaultSelect(btnIndex?: number): void {
        super.setDefaultSelect(btnIndex);
    }

    
}
