"use strict";
cc._RF.push(module, '8a28awLprVFt7Y2FV9suiCX', 'OptionButton');
// Plugin/OptionButton/OptionButton.ts

Object.defineProperty(exports, "__esModule", { value: true });
var OptionButtonBase_1 = require("./OptionButtonBase");
/**组件的一些功能是否启用 */
var showType = cc.Enum({
    "TurnOn": 1,
    "TurnOff": 0,
});
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, executeInEditMode = _a.executeInEditMode;
/**
 * OptionButton的控制基类
 * author:daxing
 * 点击按钮会抛出”OptionButtonClick“事件 数据是当前按钮对应的index
 */
var OptionButton = /** @class */ (function (_super) {
    __extends(OptionButton, _super);
    function OptionButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.usingFontScale = showType.TurnOff;
        _this.selectFontSize = 24;
        _this.normalFontSize = 22;
        _this.usingFontColor = showType.TurnOff;
        _this.selectFontColor = new cc.Color();
        _this.normalFontColor = new cc.Color();
        _this._usingSprite = showType.TurnOff;
        _this.selectSpriteFrameList = [];
        return _this;
    }
    Object.defineProperty(OptionButton.prototype, "usingSprite", {
        get: function () {
            return this._usingSprite;
        },
        set: function (value) {
            if (value == showType.TurnOn) {
                this.usingFontScale = showType.TurnOff;
                this.usingFontColor = showType.TurnOff;
            }
            this._usingSprite = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 按钮的具体节点展示
     * @param btnNode
     * @returns
     */
    OptionButton.prototype.generateButtonNode = function (btnNode) {
        _super.prototype.generateButtonNode.call(this, btnNode);
        var selectNode = new cc.Node();
        selectNode.addComponent(cc.Sprite);
        selectNode.name = "select";
        selectNode.parent = btnNode;
        var lblNode = new cc.Node();
        var lblCom = lblNode.addComponent(cc.Label);
        lblCom.string = "按钮";
        lblCom.fontSize = this.selectFontSize;
        lblCom.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        lblCom.verticalAlign = cc.Label.VerticalAlign.CENTER;
        lblCom.lineHeight = this.selectFontSize + 2;
        lblNode.name = "lbl";
        lblNode.parent = btnNode;
        return btnNode;
    };
    /**
      * 按钮切换样式（重写此函数以实现自定义样式）
    */
    OptionButton.prototype.refreshBtn = function (isSelect, btnNode, btnIndex) {
        _super.prototype.refreshBtn.call(this, isSelect, btnNode, btnIndex);
        btnNode.getChildByName(this._btnSelect).active = isSelect;
        if (this.usingFontScale == showType.TurnOn) {
            if (isSelect) {
                btnNode.getChildByName(this._btnLbl).getComponent(cc.Label).fontSize = this.selectFontSize;
            }
            else {
                btnNode.getChildByName(this._btnLbl).getComponent(cc.Label).fontSize = this.normalFontSize;
            }
        }
        if (this.usingFontColor == showType.TurnOn) {
            if (isSelect) {
                btnNode.getChildByName(this._btnLbl).color = this.selectFontColor;
            }
            else {
                btnNode.getChildByName(this._btnLbl).color = this.normalFontColor;
            }
        }
        if (this._usingSprite == showType.TurnOn) {
            btnNode.getChildByName(this._btnSelect).getComponent(cc.Sprite).spriteFrame = this.selectSpriteFrameList[btnIndex];
        }
    };
    OptionButton.prototype.setDefaultSelect = function (btnIndex) {
        _super.prototype.setDefaultSelect.call(this, btnIndex);
    };
    __decorate([
        property({ type: showType, tooltip: "是否启用字体的缩放" })
    ], OptionButton.prototype, "usingFontScale", void 0);
    __decorate([
        property({ type: cc.Integer, tooltip: '被选中的字体大小', visible: function () { return this.usingFontScale == showType.TurnOn && this.usingSprite == showType.TurnOff; } })
    ], OptionButton.prototype, "selectFontSize", void 0);
    __decorate([
        property({ type: cc.Integer, tooltip: "未被选中字体大小", visible: function () { return this.usingFontScale == showType.TurnOn && this.usingSprite == showType.TurnOff; } })
    ], OptionButton.prototype, "normalFontSize", void 0);
    __decorate([
        property({ type: showType, tooltip: "是否启用字体的颜色" })
    ], OptionButton.prototype, "usingFontColor", void 0);
    __decorate([
        property({ type: cc.Color, tooltip: '被选中字体的颜色', visible: function () { return this.usingFontColor == showType.TurnOn && this.usingSprite == showType.TurnOff; } })
    ], OptionButton.prototype, "selectFontColor", void 0);
    __decorate([
        property({ type: cc.Color, tooltip: '未被选中字体颜色', visible: function () { return this.usingFontColor == showType.TurnOn && this.usingSprite == showType.TurnOff; } })
    ], OptionButton.prototype, "normalFontColor", void 0);
    __decorate([
        property({ type: showType, tooltip: '是否启用图片为点击之后的状态' })
    ], OptionButton.prototype, "_usingSprite", void 0);
    __decorate([
        property({ type: showType, tooltip: '是否启用图片为点击之后的状态' })
    ], OptionButton.prototype, "usingSprite", null);
    __decorate([
        property({ type: cc.SpriteFrame, tooltip: '按钮选中之后的图片', visible: function () { return this.usingSprite == showType.TurnOn; } })
    ], OptionButton.prototype, "selectSpriteFrameList", void 0);
    OptionButton = __decorate([
        ccclass,
        menu("Plugin/OptionButton"),
        executeInEditMode
    ], OptionButton);
    return OptionButton;
}(OptionButtonBase_1.default));
exports.default = OptionButton;

cc._RF.pop();