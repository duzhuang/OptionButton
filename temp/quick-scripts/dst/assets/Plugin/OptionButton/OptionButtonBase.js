
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
// Plugin/OptionButton/OptionButtonBase.ts

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
            //组件内进行通信
            cc.game.emit("OptionButtonClick" + _this.node.uuid, btnIndex);
            //组件外进行监听事件
            _this.node.emit("OptionButtonClick", btnIndex);
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
        cc.game.on("OptionButtonClick" + this.node.uuid, function (index) {
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
        cc.game.off("OptionButtonClick" + this.node.uuid, function (data) {
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
        cc.Component.EventHandler.emitEvents([this._eventHandler[btnIndex]], null);
        cc.game.emit("OptionButtonClick" + this.node.uuid, btnIndex);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9QbHVnaW4vT3B0aW9uQnV0dG9uL2Fzc2V0cy9QbHVnaW4vT3B0aW9uQnV0dG9uL09wdGlvbkJ1dHRvbkJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7R0FJRzs7QUFFRyxJQUFBLGtCQUEwRSxFQUF4RSxvQkFBTyxFQUFFLHNCQUFRLEVBQUUsd0NBQWlCLEVBQUUsc0NBQWtDLENBQUM7QUFJakY7SUFBOEMsb0NBQVk7SUFIMUQ7UUFBQSxxRUFtUEM7UUE5T0csNERBQTREO1FBRTVELGtCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBY2pCLDREQUE0RDtRQUU1RCxpQkFBVyxHQUFZLElBQUksQ0FBQztRQWM1QixpRUFBaUU7UUFFakUsbUJBQWEsR0FBZ0MsRUFBRSxDQUFDO1FBWWhELDJCQUFxQixHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFN0MsV0FBVztRQUNKLGdCQUFVLEdBQVcsUUFBUSxDQUFDO1FBRXJDLGFBQWE7UUFDTixhQUFPLEdBQVcsS0FBSyxDQUFDO1FBRS9CLDJCQUEyQjtRQUNuQixjQUFRLEdBQWMsRUFBRSxDQUFDO1FBRWpDLG1CQUFtQjtRQUNYLGtCQUFZLEdBQVcsSUFBSSxDQUFDOztJQW9MeEMsQ0FBQztJQTFPRyxzQkFBSSx5Q0FBVzthQVFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7YUFWRCxVQUFnQixLQUFLO1lBQ2pCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDWCxFQUFFLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxFQUFFLEtBQUssQ0FBQyxDQUFBO2FBQzFEO2lCQUFNO2dCQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7YUFDMUI7UUFDTCxDQUFDOzs7T0FBQTtJ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RUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUM7MkRBQ1g7SUFHaEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQzt3REFJdkc7SUFNRDtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO21FQUNuQjtJQWhENUIsZ0JBQWdCO1FBSHBDLE9BQU87UUFDUCxpQkFBaUI7UUFDakIsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUNQLGdCQUFnQixDQWdQcEM7SUFBRCx1QkFBQztDQWhQRCxBQWdQQyxDQWhQNkMsRUFBRSxDQUFDLFNBQVMsR0FnUHpEO2tCQWhQb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLi9hc3NldHMvUGx1Z2luL09wdGlvbkJ1dHRvbiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogT3B0aW9uQnV0dG9u55qE5o6n5Yi25Z+657G7XG4gKiBhdXRob3I6ZGF4aW5nXG4gKiDngrnlh7vmjInpkq7kvJrmipvlh7rigJ1PcHRpb25CdXR0b25DbGlja+KAnOS6i+S7tlxuICovXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIGV4ZWN1dGVJbkVkaXRNb2RlLCByZXF1aXJlQ29tcG9uZW50IH0gPSBjYy5fZGVjb3JhdG9yO1xuQGNjY2xhc3NcbkBleGVjdXRlSW5FZGl0TW9kZVxuQHJlcXVpcmVDb21wb25lbnQoY2MuTGF5b3V0KVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9uQnV0dG9uQmFzZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0g5oyJ6ZKu55qE5pWw6YePXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuSW50ZWdlciwgdG9vbHRpcDogXCJcIiB9KVxuICAgIF9idXR0b25Db3VudCA9IDI7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuSW50ZWdlciwgdG9vbHRpcDogJ+aMiemSrueahOS4quaVsCcsIG1pbjogMiB9KVxuICAgIHNldCBidXR0b25Db3VudCh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPCAyKSB7XG4gICAgICAgICAgICBjYy5lcnJvcihcIuOAkE9wdGlvbkJ1dHRvbuOAkeacgOWwkemcgOimgeS4pOS4quaMiemSruaJjeWPr+S7peWIh+aNou+8jOW9k+WJjeaMiemSrueahOS4quaVsO+8mlwiLCB2YWx1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2J1dHRvbkNvdW50ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZUJ1dHRvbigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBidXR0b25Db3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1dHRvbkNvdW50O1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSDmjInpkq7pooTmlK/kvZNcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCB0b29sdGlwOiBcIuaMiemSrueahOiKgueCuVwiIH0pXG4gICAgX2J1dHRvbkl0ZW06IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgdG9vbHRpcDogXCLmjInpkq7nmoToioLngrlcIiB9KVxuICAgIHNldCBidXR0b25JdGVtKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fYnV0dG9uSXRlbSA9IHZhbHVlIGFzIGNjLk5vZGU7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVBbGxCdXR0b24oKTtcbiAgICAgICAgICAgIHRoaXMuX2dlbmVyYXRlQnV0dG9uKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGJ1dHRvbkl0ZW0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9idXR0b25JdGVtO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PUNsaWNrRXZlbnRzXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciwgdG9vbHRpcDogJycgfSlcbiAgICBfZXZlbnRIYW5kbGVyOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsIGRpc3BsYXlOYW1lOiBcIkNsaWNrRXZlbnRzXCIsIHRvb2x0aXA6ICfmjInpkq7ngrnlh7vkuovku7bnmoTliJfooagnLCBtaW46IDAgfSlcbiAgICBzZXQgZXZlbnRIYW5kbGVyKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2FkZENsaWNrRXZlbnRzKHRoaXMuX2V2ZW50SGFuZGxlci5sZW5ndGgpO1xuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGV2ZW50SGFuZGxlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50SGFuZGxlcjtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5WZWMyLCB0b29sdGlwOiAn5oyJ6ZKu6IqC54K555qE5bC65a+4JywgdmlzaWJsZTogZmFsc2UgfSlcbiAgICBidXR0b25JdGVtQ29udGVudFNpemUgPSBuZXcgY2MuVmVjMigxMDAsIDUwKTtcblxuICAgIC8qKuaYr+WQpuiiq+mAieS4rSAqL1xuICAgIHB1YmxpYyBfYnRuU2VsZWN0OiBzdHJpbmcgPSBcInNlbGVjdFwiO1xuXG4gICAgLyoq5oyJ6ZKu55qE5a2X5L2T5pi+56S6ICovXG4gICAgcHVibGljIF9idG5MYmw6IHN0cmluZyA9IFwibGJsXCI7XG5cbiAgICAvKirlvZPliY1PcHRpb25CdXR0b27kuK3nmoTmjInpkq7nmoTkuKrmlbAgKi9cbiAgICBwcml2YXRlIF9idG5MaXN0OiBjYy5Ob2RlW10gPSBbXTtcblxuICAgIC8qKuW9k+WJjemAieS4reeahOaMiemSrueahGluZGV4ICovXG4gICAgcHJpdmF0ZSBfYnV0dG9uSW5kZXg6IG51bWJlciA9IG51bGw7XG5cbiAgICAvKirnlJ/miJDmjInpkq4gKi9cbiAgICBfZ2VuZXJhdGVCdXR0b24oKSB7XG4gICAgICAgIGxldCBidG5Db3VudCA9IHRoaXMubm9kZS5jaGlsZHJlbjtcbiAgICAgICAgaWYgKGJ0bkNvdW50Lmxlbmd0aCA9PSB0aGlzLl9idXR0b25Db3VudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKGJ0bkNvdW50Lmxlbmd0aCA8IHRoaXMuX2J1dHRvbkNvdW50KSB7XG4gICAgICAgICAgICBsZXQgbGVmdENvdW50ID0gdGhpcy5fYnV0dG9uQ291bnQgLSBidG5Db3VudC5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlZnRDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBOb2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2J1dHRvbkl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUgPSB0aGlzLmdlbmVyYXRlQnV0dG9uTm9kZShuZXcgY2MuTm9kZSgpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZSA9IHRoaXMuX2J1dHRvbkl0ZW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNjLmluc3RhbnRpYXRlKHRlbXBOb2RlKS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gYnRuQ291bnQubGVuZ3RoIC0gMTsgaSA+PSB0aGlzLl9idXR0b25Db3VudDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBOb2RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIHRlbXBOb2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc29ydEJ1dHRvbigpO1xuICAgIH1cblxuICAgIC8qKiog5riF56m65omA5pyJ5oyJ6ZKuKi9cbiAgICBfcmVtb3ZlQWxsQnV0dG9uKCkge1xuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICB9XG5cbiAgICAvKioqIOWvueaMiemSrui/m+ihjOaOkuW6jyovXG4gICAgX3NvcnRCdXR0b24oKSB7XG4gICAgICAgIGxldCBsYXlvdXRDb206IGNjLkxheW91dCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuTGF5b3V0KTtcbiAgICAgICAgbGF5b3V0Q29tLnVwZGF0ZUxheW91dCgpO1xuICAgIH1cblxuICAgIC8qKiAqIOe7keWumuaMiemSrueCueWHu+S6i+S7tiovXG4gICAgcHJpdmF0ZSBiaW5kVG91Y2hFdmVudCgpIHtcbiAgICAgICAgY29uc3QgYnV0dG9uQ2hpbGRyZW4gPSB0aGlzLl9idG5MaXN0O1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnV0dG9uQ2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICB0aGlzLl9iaW5kVG91Y2hFdmVudFNpbmdsZShidXR0b25DaGlsZHJlbltpbmRleF0sIGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKue7keWumuWNleS4quaMiemSruS6i+S7tiAqL1xuICAgIHByaXZhdGUgX2JpbmRUb3VjaEV2ZW50U2luZ2xlKGJ0bk5vZGU6IGNjLk5vZGUsIGJ0bkluZGV4KSB7XG4gICAgICAgIGlmICghYnRuTm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGJ0bk5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBldmVudCA9PiB7XG4gICAgICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHMoW3RoaXMuX2V2ZW50SGFuZGxlcltidG5JbmRleF1dLCBldmVudCk7XG4gICAgICAgICAgICAvL+e7hOS7tuWGhei/m+ihjOmAmuS/oVxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KFwiT3B0aW9uQnV0dG9uQ2xpY2tcIiArIHRoaXMubm9kZS51dWlkLCBidG5JbmRleCk7XG4gICAgICAgICAgICAvL+e7hOS7tuWklui/m+ihjOebkeWQrOS6i+S7tlxuICAgICAgICAgICAgdGhpcy5ub2RlLmVtaXQoXCJPcHRpb25CdXR0b25DbGlja1wiLCBidG5JbmRleCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5re75Yqg5LqL5Lu255qE5Zue6LCD5Ye95pWwXG4gICAgICogQHBhcmFtIGxhc3RDbGlja0NvdW50IOWOn+adpeeahOS6i+S7tuS4quaVsFxuICAgICAqL1xuICAgIF9hZGRDbGlja0V2ZW50cyhsYXN0Q2xpY2tDb3VudDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLl9ldmVudEhhbmRsZXIubGVuZ3RoID09IGxhc3RDbGlja0NvdW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2V2ZW50SGFuZGxlci5sZW5ndGggPCBsYXN0Q2xpY2tDb3VudCkge1xuICAgICAgICAgICAgbGV0IGRpZmZlckNvdW50OiBudW1iZXIgPSBsYXN0Q2xpY2tDb3VudCAtIHRoaXMuX2V2ZW50SGFuZGxlci5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgZXZlbnRMaXN0ID0gdGhpcy5fZ2VuZXJhdGVDbGlja0V2ZW50KGRpZmZlckNvdW50KTtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5jb25jYXQoZXZlbnRMaXN0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ldmVudEhhbmRsZXIubGVuZ3RoID4gbGFzdENsaWNrQ291bnQpIHtcbiAgICAgICAgICAgIGxldCBkaWZmZXJDb3VudCA9IHRoaXMuX2V2ZW50SGFuZGxlci5sZW5ndGggLSBsYXN0Q2xpY2tDb3VudDtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zbGljZSh0aGlzLl9ldmVudEhhbmRsZXIubGVuZ3RoIC0gZGlmZmVyQ291bnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55Sf5oiQ5LqL5Lu2XG4gICAgICogQHBhcmFtIGV2ZW50Q291bnQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZ2VuZXJhdGVDbGlja0V2ZW50KGV2ZW50Q291bnQ6IG51bWJlcikge1xuICAgICAgICBpZiAoZXZlbnRDb3VudCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGV2ZW50TGlzdDogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcltdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdGVtcEV2ZW50ID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcbiAgICAgICAgICAgIGV2ZW50TGlzdC5wdXNoKHRlbXBFdmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50TGlzdDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICog5YiH5o2i5oyJ6ZKu55qE6YCJ5Lit54q25oCBXG4gICAgKiBAcGFyYW0gYnRuSW5kZXggXG4gICAgKi9cbiAgICBfc3dpdGNoU2VsZWN0QnV0dG9uKGJ0bkluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX2J1dHRvbkluZGV4ID09IGJ0bkluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlbGVjdEJ0bk5vZGUgPSB0aGlzLl9idG5MaXN0W2J0bkluZGV4XTtcbiAgICAgICAgdGhpcy5yZWZyZXNoQnRuKHRydWUsIHNlbGVjdEJ0bk5vZGUsIGJ0bkluZGV4KTtcblxuICAgICAgICBpZiAodGhpcy5fYnV0dG9uSW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IGxhc3RTZWxlY3RCdG5Ob2RlID0gdGhpcy5fYnRuTGlzdFt0aGlzLl9idXR0b25JbmRleF07XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hCdG4oZmFsc2UsIGxhc3RTZWxlY3RCdG5Ob2RlLCB0aGlzLl9idXR0b25JbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYnV0dG9uSW5kZXggPSBidG5JbmRleDtcbiAgICB9XG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PeWIneWni+WMllxuXG4gICAgLyoqXG4gICAgICog5Zyo6L+Q6KGM546v5aKD5Lit5Yid5aeL5YyWXG4gICAgICovXG4gICAgX2luaXQoKSB7XG4gICAgICAgIGNjLmdhbWUub24oXCJPcHRpb25CdXR0b25DbGlja1wiICsgdGhpcy5ub2RlLnV1aWQsIChpbmRleCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fc3dpdGNoU2VsZWN0QnV0dG9uKGluZGV4KTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHRoaXMuX2J0bkxpc3QgPSB0aGlzLm5vZGUuY2hpbGRyZW47XG4gICAgICAgIHRoaXMuYmluZFRvdWNoRXZlbnQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlnKhJREXkuK3nmoTliJ3lp4vljJZcbiAgICAgKi9cbiAgICBfaW5pdEluSURFKCkge1xuICAgICAgICB0aGlzLl9nZW5lcmF0ZUJ1dHRvbigpO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PeWjsOaYjuWRqOacn+WHveaVsFxuXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgICAgICB0aGlzLl9pbml0SW5JREUoKTtcbiAgICAgICAgLy/orr7nva7pu5jorqTpgInkuK3nrKzkuIDkuKrmjInpkq5cbiAgICAgICAgdGhpcy5zZXREZWZhdWx0U2VsZWN0KDApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGNjLmdhbWUub2ZmKFwiT3B0aW9uQnV0dG9uQ2xpY2tcIiArIHRoaXMubm9kZS51dWlkLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fc3dpdGNoU2VsZWN0QnV0dG9uKGRhdGEuYnRuSW5kZXgpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3mj5Dkvpvnu5nlpJbnlYznmoTlh73mlbBcblxuICAgIC8qKlxuICAgICog5Yid5aeL5YyW5oyJ6ZKu6IqC54K577yI5rS+55Sf57G76K+36YeN5YaZ5q2k5Ye95pWw5omp5bGVYnV0dG9u5oyJ6ZKu6IqC54K555qE6YCJ5Lit5pWI5p6c77yJXG4gICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2VuZXJhdGVCdXR0b25Ob2RlKGJ0bk5vZGU6IGNjLk5vZGUpIHtcbiAgICAgICAgbGV0IGJ0blNwciA9IGJ0bk5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGJ0bk5vZGUuc2V0Q29udGVudFNpemUodGhpcy5idXR0b25JdGVtQ29udGVudFNpemUueCwgdGhpcy5idXR0b25JdGVtQ29udGVudFNpemUueSk7XG4gICAgICAgIGJ0bk5vZGUubmFtZSA9IFwiYnRuTm9kZVwiO1xuICAgICAgICByZXR1cm4gYnRuTm9kZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmjInpkq7liIfmjaLmoLflvI/vvIjmtL7nlJ/nsbvor7fph43lhpnmraTlh73mlbDku6Xlrp7njrDoh6rlrprkuYnmoLflvI/vvIlcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcmVmcmVzaEJ0bihpc1NlbGVjdDogYm9vbGVhbiwgYnRuTm9kZTogY2MuTm9kZSwgYnRuSW5kZXg/OiBudW1iZXIpIHtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5YWs55So5pa55rOV77ya5omL5Yqo6K6+572u6YCJ5Lit5oyJ6ZKu77yI5rS+55Sf57G75Y+v6YeN5YaZ5q2k5pa55rOV77yJXG4gICAgICogQHBhcmFtIGJ0bkluZGV4IFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzZXREZWZhdWx0U2VsZWN0KGJ0bkluZGV4OiBudW1iZXIgPSAwKSB7XG4gICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyhbdGhpcy5fZXZlbnRIYW5kbGVyW2J0bkluZGV4XV0sIG51bGwpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoXCJPcHRpb25CdXR0b25DbGlja1wiICsgdGhpcy5ub2RlLnV1aWQsIGJ0bkluZGV4KTtcbiAgICAgICAgdGhpcy5fc3dpdGNoU2VsZWN0QnV0dG9uKGJ0bkluZGV4KTtcbiAgICB9XG59Il19