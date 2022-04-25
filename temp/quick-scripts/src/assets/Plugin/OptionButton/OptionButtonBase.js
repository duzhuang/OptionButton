"use strict";
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
            //组件内进行通信，加入uuid主要是为了区分多个OptionButton分别响应自己的消息
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