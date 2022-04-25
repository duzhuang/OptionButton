
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Plugin/OptionButton/OptionButton.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9QbHVnaW4vT3B0aW9uQnV0dG9uL2Fzc2V0cy9QbHVnaW4vT3B0aW9uQnV0dG9uL09wdGlvbkJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQWtEO0FBRWxELGlCQUFpQjtBQUNqQixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQ25CLFFBQVEsRUFBRSxDQUFDO0lBQ1gsU0FBUyxFQUFFLENBQUM7Q0FDZixDQUFDLENBQUE7QUFFSSxJQUFBLGtCQUE2RCxFQUEzRCxvQkFBTyxFQUFFLHNCQUFRLEVBQUUsY0FBSSxFQUFDLHdDQUFtQyxDQUFDO0FBRXBFOzs7O0dBSUc7QUFJSDtJQUEwQyxnQ0FBZ0I7SUFIMUQ7UUFBQSxxRUE2RkM7UUF2Rkcsb0JBQWMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBR2xDLG9CQUFjLEdBQUcsRUFBRSxDQUFDO1FBR3BCLG9CQUFjLEdBQUcsRUFBRSxDQUFDO1FBR3BCLG9CQUFjLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUVsQyxxQkFBZSxHQUFhLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRzNDLHFCQUFlLEdBQWEsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFHM0Msa0JBQVksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBZWhDLDJCQUFxQixHQUFxQixFQUFFLENBQUM7O0lBdURqRCxDQUFDO0lBbkVHLHNCQUFJLHFDQUFXO2FBT2Y7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQzthQVRELFVBQWdCLEtBQUs7WUFDakIsSUFBSSxLQUFLLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FB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QU8sZ0JBQUssT0FBTyxJQUFJLENBQUMsY0FBYyxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUM7eURBQzVHO0lBRzNDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztzREFDeEI7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO21EQU92RDtJQU1EO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLGdCQUFLLE9BQU8sSUFBSSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUM7K0RBQ3RFO0lBbkM1QixZQUFZO1FBSGhDLE9BQU87UUFDUCxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDM0IsaUJBQWlCO09BQ0csWUFBWSxDQTBGaEM7SUFBRCxtQkFBQztDQTFGRCxBQTBGQyxDQTFGeUMsMEJBQWdCLEdBMEZ6RDtrQkExRm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9QbHVnaW4vT3B0aW9uQnV0dG9uIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9wdGlvbkJ1dHRvbkJhc2UgZnJvbSBcIi4vT3B0aW9uQnV0dG9uQmFzZVwiO1xuXG4vKirnu4Tku7bnmoTkuIDkupvlip/og73mmK/lkKblkK/nlKggKi9cbnZhciBzaG93VHlwZSA9IGNjLkVudW0oe1xuICAgIFwiVHVybk9uXCI6IDEsXG4gICAgXCJUdXJuT2ZmXCI6IDAsXG59KVxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51LGV4ZWN1dGVJbkVkaXRNb2RlIH0gPSBjYy5fZGVjb3JhdG9yO1xuXG4vKipcbiAqIE9wdGlvbkJ1dHRvbueahOaOp+WItuWfuuexu1xuICogYXV0aG9yOmRheGluZ1xuICog54K55Ye75oyJ6ZKu5Lya5oqb5Ye64oCdT3B0aW9uQnV0dG9uQ2xpY2vigJzkuovku7Yg5pWw5o2u5piv5b2T5YmN5oyJ6ZKu5a+55bqU55qEaW5kZXhcbiAqL1xuQGNjY2xhc3NcbkBtZW51KFwiUGx1Z2luL09wdGlvbkJ1dHRvblwiKVxuQGV4ZWN1dGVJbkVkaXRNb2RlXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25CdXR0b24gZXh0ZW5kcyBPcHRpb25CdXR0b25CYXNlIHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IHNob3dUeXBlLCB0b29sdGlwOiBcIuaYr+WQpuWQr+eUqOWtl+S9k+eahOe8qeaUvlwiIH0pXG4gICAgdXNpbmdGb250U2NhbGUgPSBzaG93VHlwZS5UdXJuT2ZmO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuSW50ZWdlciwgdG9vbHRpcDogJ+iiq+mAieS4reeahOWtl+S9k+Wkp+WwjycsIHZpc2libGUoKSB7IHJldHVybiB0aGlzLnVzaW5nRm9udFNjYWxlID09IHNob3dUeXBlLlR1cm5PbiAmJiB0aGlzLnVzaW5nU3ByaXRlID09IHNob3dUeXBlLlR1cm5PZmYgfSB9KVxuICAgIHNlbGVjdEZvbnRTaXplID0gMjQ7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5JbnRlZ2VyLCB0b29sdGlwOiBcIuacquiiq+mAieS4reWtl+S9k+Wkp+Wwj1wiLCB2aXNpYmxlKCkgeyByZXR1cm4gdGhpcy51c2luZ0ZvbnRTY2FsZSA9PSBzaG93VHlwZS5UdXJuT24gJiYgdGhpcy51c2luZ1Nwcml0ZSA9PSBzaG93VHlwZS5UdXJuT2ZmIH0gfSlcbiAgICBub3JtYWxGb250U2l6ZSA9IDIyO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogc2hvd1R5cGUsIHRvb2x0aXA6IFwi5piv5ZCm5ZCv55So5a2X5L2T55qE6aKc6ImyXCIgfSlcbiAgICB1c2luZ0ZvbnRDb2xvciA9IHNob3dUeXBlLlR1cm5PZmY7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuQ29sb3IsIHRvb2x0aXA6ICfooqvpgInkuK3lrZfkvZPnmoTpopzoibInLCB2aXNpYmxlKCkgeyByZXR1cm4gdGhpcy51c2luZ0ZvbnRDb2xvciA9PSBzaG93VHlwZS5UdXJuT24gJiYgdGhpcy51c2luZ1Nwcml0ZSA9PSBzaG93VHlwZS5UdXJuT2ZmIH0gfSlcbiAgICBzZWxlY3RGb250Q29sb3I6IGNjLkNvbG9yID0gbmV3IGNjLkNvbG9yKCk7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Db2xvciwgdG9vbHRpcDogJ+acquiiq+mAieS4reWtl+S9k+minOiJsicsIHZpc2libGUoKSB7IHJldHVybiB0aGlzLnVzaW5nRm9udENvbG9yID09IHNob3dUeXBlLlR1cm5PbiAmJiB0aGlzLnVzaW5nU3ByaXRlID09IHNob3dUeXBlLlR1cm5PZmYgfSB9KVxuICAgIG5vcm1hbEZvbnRDb2xvcjogY2MuQ29sb3IgPSBuZXcgY2MuQ29sb3IoKTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IHNob3dUeXBlLCB0b29sdGlwOiAn5piv5ZCm5ZCv55So5Zu+54mH5Li654K55Ye75LmL5ZCO55qE54q25oCBJyB9KVxuICAgIF91c2luZ1Nwcml0ZSA9IHNob3dUeXBlLlR1cm5PZmY7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBzaG93VHlwZSwgdG9vbHRpcDogJ+aYr+WQpuWQr+eUqOWbvueJh+S4uueCueWHu+S5i+WQjueahOeKtuaAgScgfSlcbiAgICBzZXQgdXNpbmdTcHJpdGUodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09IHNob3dUeXBlLlR1cm5Pbikge1xuICAgICAgICAgICAgdGhpcy51c2luZ0ZvbnRTY2FsZSA9IHNob3dUeXBlLlR1cm5PZmY7XG4gICAgICAgICAgICB0aGlzLnVzaW5nRm9udENvbG9yID0gc2hvd1R5cGUuVHVybk9mZjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91c2luZ1Nwcml0ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgdXNpbmdTcHJpdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2luZ1Nwcml0ZTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgdG9vbHRpcDogJ+aMiemSrumAieS4reS5i+WQjueahOWbvueJhycsIHZpc2libGUoKSB7IHJldHVybiB0aGlzLnVzaW5nU3ByaXRlID09IHNob3dUeXBlLlR1cm5PbiB9IH0pXG4gICAgc2VsZWN0U3ByaXRlRnJhbWVMaXN0OiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICAvKipcbiAgICAgKiDmjInpkq7nmoTlhbfkvZPoioLngrnlsZXnpLpcbiAgICAgKiBAcGFyYW0gYnRuTm9kZSBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2VuZXJhdGVCdXR0b25Ob2RlKGJ0bk5vZGUpIHtcbiAgICAgICAgc3VwZXIuZ2VuZXJhdGVCdXR0b25Ob2RlKGJ0bk5vZGUpO1xuICAgICAgICBsZXQgc2VsZWN0Tm9kZSA9IG5ldyBjYy5Ob2RlKCk7XG4gICAgICAgIHNlbGVjdE5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIHNlbGVjdE5vZGUubmFtZSA9IFwic2VsZWN0XCI7XG4gICAgICAgIHNlbGVjdE5vZGUucGFyZW50ID0gYnRuTm9kZTtcbiAgICAgICAgbGV0IGxibE5vZGUgPSBuZXcgY2MuTm9kZSgpO1xuICAgICAgICBsZXQgbGJsQ29tID0gbGJsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBsYmxDb20uc3RyaW5nID0gXCLmjInpkq5cIjtcbiAgICAgICAgbGJsQ29tLmZvbnRTaXplID0gdGhpcy5zZWxlY3RGb250U2l6ZTtcbiAgICAgICAgbGJsQ29tLmhvcml6b250YWxBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVI7XG4gICAgICAgIGxibENvbS52ZXJ0aWNhbEFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbi5DRU5URVI7XG4gICAgICAgIGxibENvbS5saW5lSGVpZ2h0ID0gdGhpcy5zZWxlY3RGb250U2l6ZSArIDI7XG4gICAgICAgIGxibE5vZGUubmFtZSA9IFwibGJsXCI7XG4gICAgICAgIGxibE5vZGUucGFyZW50ID0gYnRuTm9kZTtcbiAgICAgICAgcmV0dXJuIGJ0bk5vZGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICAqIOaMiemSruWIh+aNouagt+W8j++8iOmHjeWGmeatpOWHveaVsOS7peWunueOsOiHquWumuS5ieagt+W8j++8iVxuICAgICovXG4gICAgcHJvdGVjdGVkIHJlZnJlc2hCdG4oaXNTZWxlY3Q6IGJvb2xlYW4sIGJ0bk5vZGU6IGNjLk5vZGUsIGJ0bkluZGV4PzogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyLnJlZnJlc2hCdG4oaXNTZWxlY3QsIGJ0bk5vZGUsIGJ0bkluZGV4KTtcbiAgICAgICAgYnRuTm9kZS5nZXRDaGlsZEJ5TmFtZSh0aGlzLl9idG5TZWxlY3QpLmFjdGl2ZSA9IGlzU2VsZWN0O1xuICAgICAgICBpZiAodGhpcy51c2luZ0ZvbnRTY2FsZSA9PSBzaG93VHlwZS5UdXJuT24pIHtcbiAgICAgICAgICAgIGlmIChpc1NlbGVjdCkge1xuICAgICAgICAgICAgICAgIGJ0bk5vZGUuZ2V0Q2hpbGRCeU5hbWUodGhpcy5fYnRuTGJsKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmZvbnRTaXplID0gdGhpcy5zZWxlY3RGb250U2l6ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnRuTm9kZS5nZXRDaGlsZEJ5TmFtZSh0aGlzLl9idG5MYmwpLmdldENvbXBvbmVudChjYy5MYWJlbCkuZm9udFNpemUgPSB0aGlzLm5vcm1hbEZvbnRTaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnVzaW5nRm9udENvbG9yID09IHNob3dUeXBlLlR1cm5Pbikge1xuICAgICAgICAgICAgaWYgKGlzU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgYnRuTm9kZS5nZXRDaGlsZEJ5TmFtZSh0aGlzLl9idG5MYmwpLmNvbG9yID0gdGhpcy5zZWxlY3RGb250Q29sb3I7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ0bk5vZGUuZ2V0Q2hpbGRCeU5hbWUodGhpcy5fYnRuTGJsKS5jb2xvciA9IHRoaXMubm9ybWFsRm9udENvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl91c2luZ1Nwcml0ZSA9PSBzaG93VHlwZS5UdXJuT24pIHtcbiAgICAgICAgICAgIGJ0bk5vZGUuZ2V0Q2hpbGRCeU5hbWUodGhpcy5fYnRuU2VsZWN0KS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc2VsZWN0U3ByaXRlRnJhbWVMaXN0W2J0bkluZGV4XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXREZWZhdWx0U2VsZWN0KGJ0bkluZGV4PzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnNldERlZmF1bHRTZWxlY3QoYnRuSW5kZXgpO1xuICAgIH1cblxuICAgIFxufVxuIl19