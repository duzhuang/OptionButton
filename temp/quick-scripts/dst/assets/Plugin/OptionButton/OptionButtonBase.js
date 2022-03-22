
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Plugin/OptionButton/OptionButtonBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'df0feN6GKZGC6az+7caKng0', 'OptionButtonBase');
// Scripts/Plugin/OptionButton/OptionButtonBase.ts

/**
 * OptionButton的控制基类
 * author:daxing
 * 点击按钮会抛出”OptionButtonClick“事件
 */
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, requireComponent = _a.requireComponent;
var OptionButtonBase = /** @class */ (function (_super) {
    __extends(OptionButtonBase, _super);
    function OptionButtonBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //==================================================== 按钮的数量
        _this._buttonCount = 2;
        //==================================================== 按钮预支体
        _this._buttonItem = null;
        //====================================================ClickEvents
        _this._eventHandler = [];
        _this.buttonItemContentSize = new cc.Vec2(100, 50);
        /**是否被选中 */
        _this._btnSelect = "select";
        /**按钮的字体显示 */
        _this._btnLbl = "lbl";
        /**当前OptionButton中的按钮的个数 */
        _this._btnList = [];
        /**当前选中的按钮的index */
        _this._buttonIndex = null;
        return _this;
    }
    Object.defineProperty(OptionButtonBase.prototype, "buttonCount", {
        get: function () {
            return this._buttonCount;
        },
        set: function (value) {
            if (value < 2) {
                cc.error("【OptionButton】最少需要两个按钮才可以切换，当前按钮的个数：", value);
            }
            else {
                this._buttonCount = value;
                this._generateButton();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptionButtonBase.prototype, "buttonItem", {
        get: function () {
            return this._buttonItem;
        },
        set: function (value) {
            if (value) {
                this._buttonItem = value;
                this._removeAllButton();
                this._generateButton();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptionButtonBase.prototype, "eventHandler", {
        get: function () {
            return this._eventHandler;
        },
        set: function (value) {
            this._addClickEvents(this._eventHandler.length);
            this._eventHandler = value;
        },
        enumerable: true,
        configurable: true
    });
    /**生成按钮 */
    OptionButtonBase.prototype._generateButton = function () {
        var btnCount = this.node.children;
        if (btnCount.length == this._buttonCount) {
            return;
        }
        else if (btnCount.length < this._buttonCount) {
            var leftCount = this._buttonCount - btnCount.length;
            for (var i = 0; i < leftCount; i++) {
                var tempNode = null;
                if (!this._buttonItem) {
                    tempNode = this.generateButtonNode(new cc.Node());
                }
                else {
                    tempNode = this._buttonItem;
                }
                cc.instantiate(tempNode).parent = this.node;
            }
        }
        else {
            for (var i = btnCount.length - 1; i >= this._buttonCount; i--) {
                var tempNode = this.node.children[i];
                tempNode.removeFromParent();
                tempNode.destroy();
            }
        }
        this._sortButton();
    };
    /*** 清空所有按钮*/
    OptionButtonBase.prototype._removeAllButton = function () {
        this.node.removeAllChildren();
    };
    /*** 对按钮进行排序*/
    OptionButtonBase.prototype._sortButton = function () {
        var layoutCom = this.node.getComponent(cc.Layout);
        layoutCom.updateLayout();
    };
    /** * 绑定按钮点击事件*/
    OptionButtonBase.prototype.bindTouchEvent = function () {
        var buttonChildren = this._btnList;
        for (var index = 0; index < buttonChildren.length; index++) {
            this._bindTouchEventSingle(buttonChildren[index], index);
        }
    };
    /**绑定单个按钮事件 */
    OptionButtonBase.prototype._bindTouchEventSingle = function (btnNode, btnIndex) {
        var _this = this;
        if (!btnNode) {
            return;
        }
        btnNode.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.Component.EventHandler.emitEvents([_this._eventHandler[btnIndex]], event);
            cc.game.emit("OptionButtonClick", btnIndex);
        });
    };
    /**
     * 添加事件的回调函数
     * @param lastClickCount 原来的事件个数
     */
    OptionButtonBase.prototype._addClickEvents = function (lastClickCount) {
        if (this._eventHandler.length == lastClickCount) {
            return;
        }
        if (this._eventHandler.length < lastClickCount) {
            var differCount = lastClickCount - this._eventHandler.length;
            var eventList = this._generateClickEvent(differCount);
            this._eventHandler.concat(eventList);
        }
        else if (this._eventHandler.length > lastClickCount) {
            var differCount = this._eventHandler.length - lastClickCount;
            this._eventHandler.slice(this._eventHandler.length - differCount);
        }
    };
    /**
     * 生成事件
     * @param eventCount
     * @returns
     */
    OptionButtonBase.prototype._generateClickEvent = function (eventCount) {
        if (eventCount <= 0) {
            return;
        }
        var eventList = [];
        for (var i = 0; i < eventCount; i++) {
            var tempEvent = new cc.Component.EventHandler();
            eventList.push(tempEvent);
        }
        return eventList;
    };
    /**
    * 切换按钮的选中状态
    * @param btnIndex
    */
    OptionButtonBase.prototype._switchSelectButton = function (btnIndex) {
        if (this._buttonIndex == btnIndex) {
            return;
        }
        var selectBtnNode = this._btnList[btnIndex];
        this.refreshBtn(true, selectBtnNode, btnIndex);
        if (this._buttonIndex != null) {
            var lastSelectBtnNode = this._btnList[this._buttonIndex];
            this.refreshBtn(false, lastSelectBtnNode, this._buttonIndex);
        }
        this._buttonIndex = btnIndex;
    };
    //====================================================初始化
    /**
     * 在运行环境中初始化
     */
    OptionButtonBase.prototype._init = function () {
        var _this = this;
        cc.game.on("OptionButtonClick", function (index) {
            _this._switchSelectButton(index);
        }, this);
        this._btnList = this.node.children;
        this.bindTouchEvent();
    };
    /**
     * 在IDE中的初始化
     */
    OptionButtonBase.prototype._initInIDE = function () {
        this._generateButton();
    };
    //====================================================声明周期函数
    OptionButtonBase.prototype.onLoad = function () {
        this._init();
        this._initInIDE();
        //设置默认选中第一个按钮
        this.setDefaultSelect(0);
    };
    OptionButtonBase.prototype.onDestroy = function () {
        var _this = this;
        cc.game.off("OptionButtonClick", function (data) {
            _this._switchSelectButton(data.btnIndex);
        }, this);
    };
    //====================================================提供给外界的函数
    /**
    * 初始化按钮节点（派生类请重写此函数扩展button按钮节点的选中效果）
    */
    OptionButtonBase.prototype.generateButtonNode = function (btnNode) {
        var btnSpr = btnNode.addComponent(cc.Sprite);
        btnNode.setContentSize(this.buttonItemContentSize.x, this.buttonItemContentSize.y);
        btnNode.name = "btnNode";
        return btnNode;
    };
    /**
     * 按钮切换样式（派生类请重写此函数以实现自定义样式）
     */
    OptionButtonBase.prototype.refreshBtn = function (isSelect, btnNode, btnIndex) {
    };
    /**
     * 公用方法：手动设置选中按钮（派生类可重写此方法）
     * @param btnIndex
     */
    OptionButtonBase.prototype.setDefaultSelect = function (btnIndex) {
        if (btnIndex === void 0) { btnIndex = 0; }
        cc.Component.EventHandler.emitEvents([this._eventHandler[btnIndex]], event);
        cc.game.emit("OptionButtonClick", btnIndex);
        this._switchSelectButton(btnIndex);
    };
    __decorate([
        property({ type: cc.Integer, tooltip: "" })
    ], OptionButtonBase.prototype, "_buttonCount", void 0);
    __decorate([
        property({ type: cc.Integer, tooltip: '按钮的个数', min: 2 })
    ], OptionButtonBase.prototype, "buttonCount", null);
    __decorate([
        property({ type: cc.Node, tooltip: "按钮的节点" })
    ], OptionButtonBase.prototype, "_buttonItem", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "按钮的节点" })
    ], OptionButtonBase.prototype, "buttonItem", null);
    __decorate([
        property({ type: cc.Component.EventHandler, tooltip: '' })
    ], OptionButtonBase.prototype, "_eventHandler", void 0);
    __decorate([
        property({ type: cc.Component.EventHandler, displayName: "ClickEvents", tooltip: '按钮点击事件的列表', min: 0 })
    ], OptionButtonBase.prototype, "eventHandler", null);
    __decorate([
        property({ type: cc.Vec2, tooltip: '按钮节点的尺寸', visible: false })
    ], OptionButtonBase.prototype, "buttonItemContentSize", void 0);
    OptionButtonBase = __decorate([
        ccclass,
        executeInEditMode,
        requireComponent(cc.Layout)
    ], OptionButtonBase);
    return OptionButtonBase;
}(cc.Component));
exports.default = OptionButtonBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9TY3JpcHRzL1BsdWdpbi9PcHRpb25CdXR0b24vYXNzZXRzL1NjcmlwdHMvUGx1Z2luL09wdGlvbkJ1dHRvbi9PcHRpb25CdXR0b25CYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0dBSUc7O0FBRUcsSUFBQSxrQkFBMEUsRUFBeEUsb0JBQU8sRUFBRSxzQkFBUSxFQUFFLHdDQUFpQixFQUFFLHNDQUFrQyxDQUFDO0FBSWpGO0lBQThDLG9DQUFZO0lBSDFEO1FBQUEscUVBZ1BDO1FBM09HLDREQUE0RDtRQUU1RCxrQkFBWSxHQUFHLENBQUMsQ0FBQztRQWNqQiw0REFBNEQ7UUFFNUQsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFjNUIsaUVBQWlFO1FBRWpFLG1CQUFhLEdBQWdDLEVBQUUsQ0FBQztRQVloRCwyQkFBcUIsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTdDLFdBQVc7UUFDSixnQkFBVSxHQUFXLFFBQVEsQ0FBQztRQUVyQyxhQUFhO1FBQ04sYUFBTyxHQUFXLEtBQUssQ0FBQztRQUUvQiwyQkFBMkI7UUFDbkIsY0FBUSxHQUFjLEVBQUUsQ0FBQztRQUVqQyxtQkFBbUI7UUFDWCxrQkFBWSxHQUFXLElBQUksQ0FBQzs7SUFpTHhDLENBQUM7SUF2T0csc0JBQUkseUNBQVc7YUFRZjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDO2FBVkQsVUFBZ0IsS0FBSztZQUNqQixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsRUFBRSxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsRUFBRSxLQUFLLENBQUMsQ0FBQTthQUMxRDtpQkFBTTtnQkFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQzFC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QUMsRUFBRSxDQUFDO3dEQUl2RztJQU1EO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7bUVBQ25CO0lBaEQ1QixnQkFBZ0I7UUFIcEMsT0FBTztRQUNQLGlCQUFpQjtRQUNqQixnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ1AsZ0JBQWdCLENBNk9wQztJQUFELHVCQUFDO0NBN09ELEFBNk9DLENBN082QyxFQUFFLENBQUMsU0FBUyxHQTZPekQ7a0JBN09vQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9TY3JpcHRzL1BsdWdpbi9PcHRpb25CdXR0b24iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE9wdGlvbkJ1dHRvbueahOaOp+WItuWfuuexu1xuICogYXV0aG9yOmRheGluZ1xuICog54K55Ye75oyJ6ZKu5Lya5oqb5Ye64oCdT3B0aW9uQnV0dG9uQ2xpY2vigJzkuovku7ZcbiAqL1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBleGVjdXRlSW5FZGl0TW9kZSwgcmVxdWlyZUNvbXBvbmVudCB9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5AZXhlY3V0ZUluRWRpdE1vZGVcbkByZXF1aXJlQ29tcG9uZW50KGNjLkxheW91dClcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wdGlvbkJ1dHRvbkJhc2UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IOaMiemSrueahOaVsOmHj1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkludGVnZXIsIHRvb2x0aXA6IFwiXCIgfSlcbiAgICBfYnV0dG9uQ291bnQgPSAyO1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkludGVnZXIsIHRvb2x0aXA6ICfmjInpkq7nmoTkuKrmlbAnLCBtaW46IDIgfSlcbiAgICBzZXQgYnV0dG9uQ291bnQodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlIDwgMikge1xuICAgICAgICAgICAgY2MuZXJyb3IoXCLjgJBPcHRpb25CdXR0b27jgJHmnIDlsJHpnIDopoHkuKTkuKrmjInpkq7miY3lj6/ku6XliIfmjaLvvIzlvZPliY3mjInpkq7nmoTkuKrmlbDvvJpcIiwgdmFsdWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9idXR0b25Db3VudCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fZ2VuZXJhdGVCdXR0b24oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgYnV0dG9uQ291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9idXR0b25Db3VudDtcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0g5oyJ6ZKu6aKE5pSv5L2TXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgdG9vbHRpcDogXCLmjInpkq7nmoToioLngrlcIiB9KVxuICAgIF9idXR0b25JdGVtOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIHRvb2x0aXA6IFwi5oyJ6ZKu55qE6IqC54K5XCIgfSlcbiAgICBzZXQgYnV0dG9uSXRlbSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1dHRvbkl0ZW0gPSB2YWx1ZSBhcyBjYy5Ob2RlO1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQWxsQnV0dG9uKCk7XG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZUJ1dHRvbigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBidXR0b25JdGVtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYnV0dG9uSXRlbTtcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1DbGlja0V2ZW50c1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsIHRvb2x0aXA6ICcnIH0pXG4gICAgX2V2ZW50SGFuZGxlcjogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcltdID0gW107XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLCBkaXNwbGF5TmFtZTogXCJDbGlja0V2ZW50c1wiLCB0b29sdGlwOiAn5oyJ6ZKu54K55Ye75LqL5Lu255qE5YiX6KGoJywgbWluOiAwIH0pXG4gICAgc2V0IGV2ZW50SGFuZGxlcih2YWx1ZSkge1xuICAgICAgICB0aGlzLl9hZGRDbGlja0V2ZW50cyh0aGlzLl9ldmVudEhhbmRsZXIubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBldmVudEhhbmRsZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudEhhbmRsZXI7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuVmVjMiwgdG9vbHRpcDogJ+aMiemSruiKgueCueeahOWwuuWvuCcsIHZpc2libGU6IGZhbHNlIH0pXG4gICAgYnV0dG9uSXRlbUNvbnRlbnRTaXplID0gbmV3IGNjLlZlYzIoMTAwLCA1MCk7XG5cbiAgICAvKirmmK/lkKbooqvpgInkuK0gKi9cbiAgICBwdWJsaWMgX2J0blNlbGVjdDogc3RyaW5nID0gXCJzZWxlY3RcIjtcblxuICAgIC8qKuaMiemSrueahOWtl+S9k+aYvuekuiAqL1xuICAgIHB1YmxpYyBfYnRuTGJsOiBzdHJpbmcgPSBcImxibFwiO1xuXG4gICAgLyoq5b2T5YmNT3B0aW9uQnV0dG9u5Lit55qE5oyJ6ZKu55qE5Liq5pWwICovXG4gICAgcHJpdmF0ZSBfYnRuTGlzdDogY2MuTm9kZVtdID0gW107XG5cbiAgICAvKirlvZPliY3pgInkuK3nmoTmjInpkq7nmoRpbmRleCAqL1xuICAgIHByaXZhdGUgX2J1dHRvbkluZGV4OiBudW1iZXIgPSBudWxsO1xuXG4gICAgLyoq55Sf5oiQ5oyJ6ZKuICovXG4gICAgX2dlbmVyYXRlQnV0dG9uKCkge1xuICAgICAgICBsZXQgYnRuQ291bnQgPSB0aGlzLm5vZGUuY2hpbGRyZW47XG4gICAgICAgIGlmIChidG5Db3VudC5sZW5ndGggPT0gdGhpcy5fYnV0dG9uQ291bnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChidG5Db3VudC5sZW5ndGggPCB0aGlzLl9idXR0b25Db3VudCkge1xuICAgICAgICAgICAgbGV0IGxlZnRDb3VudCA9IHRoaXMuX2J1dHRvbkNvdW50IC0gYnRuQ291bnQubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWZ0Q291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wTm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9idXR0b25JdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlID0gdGhpcy5nZW5lcmF0ZUJ1dHRvbk5vZGUobmV3IGNjLk5vZGUoKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUgPSB0aGlzLl9idXR0b25JdGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYy5pbnN0YW50aWF0ZSh0ZW1wTm9kZSkucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGJ0bkNvdW50Lmxlbmd0aCAtIDE7IGkgPj0gdGhpcy5fYnV0dG9uQ291bnQ7IGktLSkge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wTm9kZSA9IHRoaXMubm9kZS5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgICAgICAgICAgdGVtcE5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NvcnRCdXR0b24oKTtcbiAgICB9XG5cbiAgICAvKioqIOa4heepuuaJgOacieaMiemSriovXG4gICAgX3JlbW92ZUFsbEJ1dHRvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgfVxuXG4gICAgLyoqKiDlr7nmjInpkq7ov5vooYzmjpLluo8qL1xuICAgIF9zb3J0QnV0dG9uKCkge1xuICAgICAgICBsZXQgbGF5b3V0Q29tOiBjYy5MYXlvdXQgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkxheW91dCk7XG4gICAgICAgIGxheW91dENvbS51cGRhdGVMYXlvdXQoKTtcbiAgICB9XG5cbiAgICAvKiogKiDnu5HlrprmjInpkq7ngrnlh7vkuovku7YqL1xuICAgIHByaXZhdGUgYmluZFRvdWNoRXZlbnQoKSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbkNoaWxkcmVuID0gdGhpcy5fYnRuTGlzdDtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ1dHRvbkNoaWxkcmVuLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgdGhpcy5fYmluZFRvdWNoRXZlbnRTaW5nbGUoYnV0dG9uQ2hpbGRyZW5baW5kZXhdLCBpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirnu5HlrprljZXkuKrmjInpkq7kuovku7YgKi9cbiAgICBwcml2YXRlIF9iaW5kVG91Y2hFdmVudFNpbmdsZShidG5Ob2RlOiBjYy5Ob2RlLCBidG5JbmRleCkge1xuICAgICAgICBpZiAoIWJ0bk5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBidG5Ob2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKFt0aGlzLl9ldmVudEhhbmRsZXJbYnRuSW5kZXhdXSwgZXZlbnQpO1xuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KFwiT3B0aW9uQnV0dG9uQ2xpY2tcIiwgYnRuSW5kZXgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa3u+WKoOS6i+S7tueahOWbnuiwg+WHveaVsFxuICAgICAqIEBwYXJhbSBsYXN0Q2xpY2tDb3VudCDljp/mnaXnmoTkuovku7bkuKrmlbBcbiAgICAgKi9cbiAgICBfYWRkQ2xpY2tFdmVudHMobGFzdENsaWNrQ291bnQ6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5fZXZlbnRIYW5kbGVyLmxlbmd0aCA9PSBsYXN0Q2xpY2tDb3VudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9ldmVudEhhbmRsZXIubGVuZ3RoIDwgbGFzdENsaWNrQ291bnQpIHtcbiAgICAgICAgICAgIGxldCBkaWZmZXJDb3VudDogbnVtYmVyID0gbGFzdENsaWNrQ291bnQgLSB0aGlzLl9ldmVudEhhbmRsZXIubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IGV2ZW50TGlzdCA9IHRoaXMuX2dlbmVyYXRlQ2xpY2tFdmVudChkaWZmZXJDb3VudCk7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuY29uY2F0KGV2ZW50TGlzdCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZXZlbnRIYW5kbGVyLmxlbmd0aCA+IGxhc3RDbGlja0NvdW50KSB7XG4gICAgICAgICAgICBsZXQgZGlmZmVyQ291bnQgPSB0aGlzLl9ldmVudEhhbmRsZXIubGVuZ3RoIC0gbGFzdENsaWNrQ291bnQ7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc2xpY2UodGhpcy5fZXZlbnRIYW5kbGVyLmxlbmd0aCAtIGRpZmZlckNvdW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOeUn+aIkOS6i+S7tlxuICAgICAqIEBwYXJhbSBldmVudENvdW50IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHByaXZhdGUgX2dlbmVyYXRlQ2xpY2tFdmVudChldmVudENvdW50OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGV2ZW50Q291bnQgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBldmVudExpc3Q6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50Q291bnQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IHRlbXBFdmVudCA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG4gICAgICAgICAgICBldmVudExpc3QucHVzaCh0ZW1wRXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBldmVudExpc3Q7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAqIOWIh+aNouaMiemSrueahOmAieS4reeKtuaAgVxuICAgICogQHBhcmFtIGJ0bkluZGV4IFxuICAgICovXG4gICAgX3N3aXRjaFNlbGVjdEJ1dHRvbihidG5JbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLl9idXR0b25JbmRleCA9PSBidG5JbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzZWxlY3RCdG5Ob2RlID0gdGhpcy5fYnRuTGlzdFtidG5JbmRleF07XG4gICAgICAgIHRoaXMucmVmcmVzaEJ0bih0cnVlLCBzZWxlY3RCdG5Ob2RlLCBidG5JbmRleCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2J1dHRvbkluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBsYXN0U2VsZWN0QnRuTm9kZSA9IHRoaXMuX2J0bkxpc3RbdGhpcy5fYnV0dG9uSW5kZXhdO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQnRuKGZhbHNlLCBsYXN0U2VsZWN0QnRuTm9kZSwgdGhpcy5fYnV0dG9uSW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2J1dHRvbkluZGV4ID0gYnRuSW5kZXg7XG4gICAgfVxuXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3liJ3lp4vljJZcblxuICAgIC8qKlxuICAgICAqIOWcqOi/kOihjOeOr+Wig+S4reWIneWni+WMllxuICAgICAqL1xuICAgIF9pbml0KCkge1xuICAgICAgICBjYy5nYW1lLm9uKFwiT3B0aW9uQnV0dG9uQ2xpY2tcIiwgKGluZGV4KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9zd2l0Y2hTZWxlY3RCdXR0b24oaW5kZXgpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgdGhpcy5fYnRuTGlzdCA9IHRoaXMubm9kZS5jaGlsZHJlbjtcbiAgICAgICAgdGhpcy5iaW5kVG91Y2hFdmVudCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWcqElEReS4reeahOWIneWni+WMllxuICAgICAqL1xuICAgIF9pbml0SW5JREUoKSB7XG4gICAgICAgIHRoaXMuX2dlbmVyYXRlQnV0dG9uKCk7XG4gICAgfVxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT095aOw5piO5ZGo5pyf5Ye95pWwXG5cbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgICAgIHRoaXMuX2luaXRJbklERSgpO1xuICAgICAgICAvL+iuvue9rum7mOiupOmAieS4reesrOS4gOS4quaMiemSrlxuICAgICAgICB0aGlzLnNldERlZmF1bHRTZWxlY3QoMCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgY2MuZ2FtZS5vZmYoXCJPcHRpb25CdXR0b25DbGlja1wiLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fc3dpdGNoU2VsZWN0QnV0dG9uKGRhdGEuYnRuSW5kZXgpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3mj5Dkvpvnu5nlpJbnlYznmoTlh73mlbBcblxuICAgIC8qKlxuICAgICog5Yid5aeL5YyW5oyJ6ZKu6IqC54K577yI5rS+55Sf57G76K+36YeN5YaZ5q2k5Ye95pWw5omp5bGVYnV0dG9u5oyJ6ZKu6IqC54K555qE6YCJ5Lit5pWI5p6c77yJXG4gICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2VuZXJhdGVCdXR0b25Ob2RlKGJ0bk5vZGU6IGNjLk5vZGUpIHtcbiAgICAgICAgbGV0IGJ0blNwciA9IGJ0bk5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGJ0bk5vZGUuc2V0Q29udGVudFNpemUodGhpcy5idXR0b25JdGVtQ29udGVudFNpemUueCwgdGhpcy5idXR0b25JdGVtQ29udGVudFNpemUueSk7XG4gICAgICAgIGJ0bk5vZGUubmFtZSA9IFwiYnRuTm9kZVwiO1xuICAgICAgICByZXR1cm4gYnRuTm9kZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmjInpkq7liIfmjaLmoLflvI/vvIjmtL7nlJ/nsbvor7fph43lhpnmraTlh73mlbDku6Xlrp7njrDoh6rlrprkuYnmoLflvI/vvIlcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcmVmcmVzaEJ0bihpc1NlbGVjdDogYm9vbGVhbiwgYnRuTm9kZTogY2MuTm9kZSwgYnRuSW5kZXg/OiBudW1iZXIpIHtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5YWs55So5pa55rOV77ya5omL5Yqo6K6+572u6YCJ5Lit5oyJ6ZKu77yI5rS+55Sf57G75Y+v6YeN5YaZ5q2k5pa55rOV77yJXG4gICAgICogQHBhcmFtIGJ0bkluZGV4IFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzZXREZWZhdWx0U2VsZWN0KGJ0bkluZGV4OiBudW1iZXIgPSAwKSB7XG4gICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyhbdGhpcy5fZXZlbnRIYW5kbGVyW2J0bkluZGV4XV0sIGV2ZW50KTtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KFwiT3B0aW9uQnV0dG9uQ2xpY2tcIiwgYnRuSW5kZXgpO1xuICAgICAgICB0aGlzLl9zd2l0Y2hTZWxlY3RCdXR0b24oYnRuSW5kZXgpO1xuICAgIH1cbn0iXX0=