"use strict";
cc._RF.push(module, 'e1177/tmE1Ckr7NhUUrAxM7', 'debugScene');
// Scripts/debugScene.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showLabel = null;
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.onLoad = function () {
        cc.game.on("OptionButtonClick", this.onOptionButtonClick, this);
    };
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.onOptionButtonClick = function (btnIndex) {
        if (btnIndex == 0) {
            this.showLabel.string = "第一个";
        }
        if (btnIndex == 1) {
            this.showLabel.string = "第二个";
        }
        if (btnIndex == 2) {
            this.showLabel.string = "第三个";
        }
    };
    NewClass.prototype.onClickOne = function (event, param) {
        console.log("手动绑定第一个", param);
    };
    NewClass.prototype.onClickTwo = function (event, param) {
        console.log("手动绑定第二个", param);
    };
    NewClass.prototype.onClickThr = function (event, param) {
        console.log("手动绑定第三个", param);
    };
    __decorate([
        property({ type: cc.Label, tooltip: '' })
    ], NewClass.prototype, "showLabel", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();