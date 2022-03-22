
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
// Scripts/Plugin/OptionButton/OptionButton.ts

Object.defineProperty(exports, "__esModule", { value: true });
var OptionButtonBase_1 = require("./OptionButtonBase");
/**组件的一些功能是否启用 */
var showType = cc.Enum({
    "TurnOn": 1,
    "TurnOff": 0,
});
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, executeInEditMode = _a.executeInEditMode;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9TY3JpcHRzL1BsdWdpbi9PcHRpb25CdXR0b24vYXNzZXRzL1NjcmlwdHMvUGx1Z2luL09wdGlvbkJ1dHRvbi9PcHRpb25CdXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFrRDtBQUVsRCxpQkFBaUI7QUFDakIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztJQUNuQixRQUFRLEVBQUUsQ0FBQztJQUNYLFNBQVMsRUFBRSxDQUFDO0NBQ2YsQ0FBQyxDQUFBO0FBRUksSUFBQSxrQkFBNkQsRUFBM0Qsb0JBQU8sRUFBRSxzQkFBUSxFQUFFLGNBQUksRUFBQyx3Q0FBbUMsQ0FBQztBQUtwRTtJQUEwQyxnQ0FBZ0I7SUFIMUQ7UUFBQSxxRUE2RkM7UUF2Rkcsb0JBQWMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBR2xDLG9CQUFjLEdBQUcsRUFBRSxDQUFDO1FBR3BCLG9CQUFjLEdBQUcsRUFBRSxDQUFDO1FBR3BCLG9CQUFjLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUVsQyxxQkFBZSxHQUFhLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRzNDLHFCQUFlLEdBQWEsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFHM0Msa0JBQVksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBZWhDLDJCQUFxQixHQUFxQixFQUFFLENBQUM7O0lBdURqRCxDQUFDO0lBbkVHLHNCQUFJLHFDQUFXO2FBT2Y7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQzthQVRELFVBQWdCLEtBQUs7WUFDakIsSUFBSSxLQUFLLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLFFB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QUFFLE9BQU8sZ0JBQUssT0FBTyxJQUFJLENBQUMsY0FBYyxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUM7eURBQzVHO0lBRzNDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztzREFDeEI7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO21EQU92RDtJQU1EO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLGdCQUFLLE9BQU8sSUFBSSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUM7K0RBQ3RFO0lBbkM1QixZQUFZO1FBSGhDLE9BQU87UUFDUCxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDM0IsaUJBQWlCO09BQ0csWUFBWSxDQTBGaEM7SUFBRCxtQkFBQztDQTFGRCxBQTBGQyxDQTFGeUMsMEJBQWdCLEdBMEZ6RDtrQkExRm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9TY3JpcHRzL1BsdWdpbi9PcHRpb25CdXR0b24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT3B0aW9uQnV0dG9uQmFzZSBmcm9tIFwiLi9PcHRpb25CdXR0b25CYXNlXCI7XG5cbi8qKue7hOS7tueahOS4gOS6m+WKn+iDveaYr+WQpuWQr+eUqCAqL1xudmFyIHNob3dUeXBlID0gY2MuRW51bSh7XG4gICAgXCJUdXJuT25cIjogMSxcbiAgICBcIlR1cm5PZmZcIjogMCxcbn0pXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUsZXhlY3V0ZUluRWRpdE1vZGUgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AbWVudShcIlBsdWdpbi9PcHRpb25CdXR0b25cIilcbkBleGVjdXRlSW5FZGl0TW9kZVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9uQnV0dG9uIGV4dGVuZHMgT3B0aW9uQnV0dG9uQmFzZSB7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBzaG93VHlwZSwgdG9vbHRpcDogXCLmmK/lkKblkK/nlKjlrZfkvZPnmoTnvKnmlL5cIiB9KVxuICAgIHVzaW5nRm9udFNjYWxlID0gc2hvd1R5cGUuVHVybk9mZjtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkludGVnZXIsIHRvb2x0aXA6ICfooqvpgInkuK3nmoTlrZfkvZPlpKflsI8nLCB2aXNpYmxlKCkgeyByZXR1cm4gdGhpcy51c2luZ0ZvbnRTY2FsZSA9PSBzaG93VHlwZS5UdXJuT24gJiYgdGhpcy51c2luZ1Nwcml0ZSA9PSBzaG93VHlwZS5UdXJuT2ZmIH0gfSlcbiAgICBzZWxlY3RGb250U2l6ZSA9IDI0O1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuSW50ZWdlciwgdG9vbHRpcDogXCLmnKrooqvpgInkuK3lrZfkvZPlpKflsI9cIiwgdmlzaWJsZSgpIHsgcmV0dXJuIHRoaXMudXNpbmdGb250U2NhbGUgPT0gc2hvd1R5cGUuVHVybk9uICYmIHRoaXMudXNpbmdTcHJpdGUgPT0gc2hvd1R5cGUuVHVybk9mZiB9IH0pXG4gICAgbm9ybWFsRm9udFNpemUgPSAyMjtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IHNob3dUeXBlLCB0b29sdGlwOiBcIuaYr+WQpuWQr+eUqOWtl+S9k+eahOminOiJslwiIH0pXG4gICAgdXNpbmdGb250Q29sb3IgPSBzaG93VHlwZS5UdXJuT2ZmO1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkNvbG9yLCB0b29sdGlwOiAn6KKr6YCJ5Lit5a2X5L2T55qE6aKc6ImyJywgdmlzaWJsZSgpIHsgcmV0dXJuIHRoaXMudXNpbmdGb250Q29sb3IgPT0gc2hvd1R5cGUuVHVybk9uICYmIHRoaXMudXNpbmdTcHJpdGUgPT0gc2hvd1R5cGUuVHVybk9mZiB9IH0pXG4gICAgc2VsZWN0Rm9udENvbG9yOiBjYy5Db2xvciA9IG5ldyBjYy5Db2xvcigpO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuQ29sb3IsIHRvb2x0aXA6ICfmnKrooqvpgInkuK3lrZfkvZPpopzoibInLCB2aXNpYmxlKCkgeyByZXR1cm4gdGhpcy51c2luZ0ZvbnRDb2xvciA9PSBzaG93VHlwZS5UdXJuT24gJiYgdGhpcy51c2luZ1Nwcml0ZSA9PSBzaG93VHlwZS5UdXJuT2ZmIH0gfSlcbiAgICBub3JtYWxGb250Q29sb3I6IGNjLkNvbG9yID0gbmV3IGNjLkNvbG9yKCk7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBzaG93VHlwZSwgdG9vbHRpcDogJ+aYr+WQpuWQr+eUqOWbvueJh+S4uueCueWHu+S5i+WQjueahOeKtuaAgScgfSlcbiAgICBfdXNpbmdTcHJpdGUgPSBzaG93VHlwZS5UdXJuT2ZmO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogc2hvd1R5cGUsIHRvb2x0aXA6ICfmmK/lkKblkK/nlKjlm77niYfkuLrngrnlh7vkuYvlkI7nmoTnirbmgIEnIH0pXG4gICAgc2V0IHVzaW5nU3ByaXRlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBzaG93VHlwZS5UdXJuT24pIHtcbiAgICAgICAgICAgIHRoaXMudXNpbmdGb250U2NhbGUgPSBzaG93VHlwZS5UdXJuT2ZmO1xuICAgICAgICAgICAgdGhpcy51c2luZ0ZvbnRDb2xvciA9IHNob3dUeXBlLlR1cm5PZmY7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXNpbmdTcHJpdGUgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IHVzaW5nU3ByaXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNpbmdTcHJpdGU7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlRnJhbWUsIHRvb2x0aXA6ICfmjInpkq7pgInkuK3kuYvlkI7nmoTlm77niYcnLCB2aXNpYmxlKCkgeyByZXR1cm4gdGhpcy51c2luZ1Nwcml0ZSA9PSBzaG93VHlwZS5UdXJuT24gfSB9KVxuICAgIHNlbGVjdFNwcml0ZUZyYW1lTGlzdDogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICog5oyJ6ZKu55qE5YW35L2T6IqC54K55bGV56S6XG4gICAgICogQHBhcmFtIGJ0bk5vZGUgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdlbmVyYXRlQnV0dG9uTm9kZShidG5Ob2RlKSB7XG4gICAgICAgIHN1cGVyLmdlbmVyYXRlQnV0dG9uTm9kZShidG5Ob2RlKTtcbiAgICAgICAgbGV0IHNlbGVjdE5vZGUgPSBuZXcgY2MuTm9kZSgpO1xuICAgICAgICBzZWxlY3ROb2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBzZWxlY3ROb2RlLm5hbWUgPSBcInNlbGVjdFwiO1xuICAgICAgICBzZWxlY3ROb2RlLnBhcmVudCA9IGJ0bk5vZGU7XG4gICAgICAgIGxldCBsYmxOb2RlID0gbmV3IGNjLk5vZGUoKTtcbiAgICAgICAgbGV0IGxibENvbSA9IGxibE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGJsQ29tLnN0cmluZyA9IFwi5oyJ6ZKuXCI7XG4gICAgICAgIGxibENvbS5mb250U2l6ZSA9IHRoaXMuc2VsZWN0Rm9udFNpemU7XG4gICAgICAgIGxibENvbS5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSO1xuICAgICAgICBsYmxDb20udmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xuICAgICAgICBsYmxDb20ubGluZUhlaWdodCA9IHRoaXMuc2VsZWN0Rm9udFNpemUgKyAyO1xuICAgICAgICBsYmxOb2RlLm5hbWUgPSBcImxibFwiO1xuICAgICAgICBsYmxOb2RlLnBhcmVudCA9IGJ0bk5vZGU7XG4gICAgICAgIHJldHVybiBidG5Ob2RlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAgKiDmjInpkq7liIfmjaLmoLflvI/vvIjph43lhpnmraTlh73mlbDku6Xlrp7njrDoh6rlrprkuYnmoLflvI/vvIlcbiAgICAqL1xuICAgIHByb3RlY3RlZCByZWZyZXNoQnRuKGlzU2VsZWN0OiBib29sZWFuLCBidG5Ob2RlOiBjYy5Ob2RlLCBidG5JbmRleD86IG51bWJlcikge1xuICAgICAgICBzdXBlci5yZWZyZXNoQnRuKGlzU2VsZWN0LCBidG5Ob2RlLCBidG5JbmRleCk7XG4gICAgICAgIGJ0bk5vZGUuZ2V0Q2hpbGRCeU5hbWUodGhpcy5fYnRuU2VsZWN0KS5hY3RpdmUgPSBpc1NlbGVjdDtcbiAgICAgICAgaWYgKHRoaXMudXNpbmdGb250U2NhbGUgPT0gc2hvd1R5cGUuVHVybk9uKSB7XG4gICAgICAgICAgICBpZiAoaXNTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICBidG5Ob2RlLmdldENoaWxkQnlOYW1lKHRoaXMuX2J0bkxibCkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5mb250U2l6ZSA9IHRoaXMuc2VsZWN0Rm9udFNpemU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ0bk5vZGUuZ2V0Q2hpbGRCeU5hbWUodGhpcy5fYnRuTGJsKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmZvbnRTaXplID0gdGhpcy5ub3JtYWxGb250U2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy51c2luZ0ZvbnRDb2xvciA9PSBzaG93VHlwZS5UdXJuT24pIHtcbiAgICAgICAgICAgIGlmIChpc1NlbGVjdCkge1xuICAgICAgICAgICAgICAgIGJ0bk5vZGUuZ2V0Q2hpbGRCeU5hbWUodGhpcy5fYnRuTGJsKS5jb2xvciA9IHRoaXMuc2VsZWN0Rm9udENvbG9yO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBidG5Ob2RlLmdldENoaWxkQnlOYW1lKHRoaXMuX2J0bkxibCkuY29sb3IgPSB0aGlzLm5vcm1hbEZvbnRDb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdXNpbmdTcHJpdGUgPT0gc2hvd1R5cGUuVHVybk9uKSB7XG4gICAgICAgICAgICBidG5Ob2RlLmdldENoaWxkQnlOYW1lKHRoaXMuX2J0blNlbGVjdCkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNlbGVjdFNwcml0ZUZyYW1lTGlzdFtidG5JbmRleF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RGVmYXVsdFNlbGVjdChidG5JbmRleD86IG51bWJlcik6IHZvaWQge1xuICAgICAgICBzdXBlci5zZXREZWZhdWx0U2VsZWN0KGJ0bkluZGV4KTtcbiAgICB9XG5cbiAgICBcbn1cbiJdfQ==