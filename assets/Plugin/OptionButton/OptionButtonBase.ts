/**
 * OptionButton的控制基类
 * author:daxing
 * 点击按钮会抛出”OptionButtonClick“事件
 */

const { ccclass, property, executeInEditMode, requireComponent } = cc._decorator;
@ccclass
@executeInEditMode
@requireComponent(cc.Layout)
export default class OptionButtonBase extends cc.Component {

    //==================================================== 按钮的数量
    @property({ type: cc.Integer, tooltip: "" })
    _buttonCount = 2;
    @property({ type: cc.Integer, tooltip: '按钮的个数', min: 2 })
    set buttonCount(value) {
        if (value < 2) {
            cc.error("【OptionButton】最少需要两个按钮才可以切换，当前按钮的个数：", value)
        } else {
            this._buttonCount = value;
            this._generateButton();
        }
    }
    get buttonCount() {
        return this._buttonCount;
    }

    //==================================================== 按钮预支体
    @property({ type: cc.Node, tooltip: "按钮的节点" })
    _buttonItem: cc.Node = null;

    @property({ type: cc.Node, tooltip: "按钮的节点" })
    set buttonItem(value) {
        if (value) {
            this._buttonItem = value as cc.Node;
            this._removeAllButton();
            this._generateButton();
        }
    }
    get buttonItem() {
        return this._buttonItem;
    }

    //====================================================ClickEvents
    @property({ type: cc.Component.EventHandler, tooltip: '' })
    _eventHandler: cc.Component.EventHandler[] = [];

    @property({ type: cc.Component.EventHandler, displayName: "ClickEvents", tooltip: '按钮点击事件的列表', min: 0 })
    set eventHandler(value) {
        this._addClickEvents(this._eventHandler.length);
        this._eventHandler = value;
    }
    get eventHandler() {
        return this._eventHandler;
    }

    @property({ type: cc.Vec2, tooltip: '按钮节点的尺寸', visible: false })
    buttonItemContentSize = new cc.Vec2(100, 50);

    /**是否被选中 */
    public _btnSelect: string = "select";

    /**按钮的字体显示 */
    public _btnLbl: string = "lbl";

    /**当前OptionButton中的按钮的个数 */
    private _btnList: cc.Node[] = [];

    /**当前选中的按钮的index */
    private _buttonIndex: number = null;

    /**生成按钮 */
    _generateButton() {
        let btnCount = this.node.children;
        if (btnCount.length == this._buttonCount) {
            return;
        } else if (btnCount.length < this._buttonCount) {
            let leftCount = this._buttonCount - btnCount.length;
            for (let i = 0; i < leftCount; i++) {
                let tempNode: cc.Node = null;
                if (!this._buttonItem) {
                    tempNode = this.generateButtonNode(new cc.Node());
                } else {
                    tempNode = this._buttonItem;
                }
                cc.instantiate(tempNode).parent = this.node;
            }
        } else {
            for (let i = btnCount.length - 1; i >= this._buttonCount; i--) {
                let tempNode = this.node.children[i];
                tempNode.removeFromParent();
                tempNode.destroy();
            }
        }
        this._sortButton();
    }

    /*** 清空所有按钮*/
    _removeAllButton() {
        this.node.removeAllChildren();
    }

    /*** 对按钮进行排序*/
    _sortButton() {
        let layoutCom: cc.Layout = this.node.getComponent(cc.Layout);
        layoutCom.updateLayout();
    }

    /** * 绑定按钮点击事件*/
    private bindTouchEvent() {
        const buttonChildren = this._btnList;
        for (let index = 0; index < buttonChildren.length; index++) {
            this._bindTouchEventSingle(buttonChildren[index], index);
        }
    }

    /**绑定单个按钮事件 */
    private _bindTouchEventSingle(btnNode: cc.Node, btnIndex) {
        if (!btnNode) {
            return;
        }
        btnNode.on(cc.Node.EventType.TOUCH_END, event => {
            cc.Component.EventHandler.emitEvents([this._eventHandler[btnIndex]], event);
            cc.game.emit("OptionButtonClick", btnIndex);
        })
    }

    /**
     * 添加事件的回调函数
     * @param lastClickCount 原来的事件个数
     */
    _addClickEvents(lastClickCount: number) {
        if (this._eventHandler.length == lastClickCount) {
            return;
        }
        if (this._eventHandler.length < lastClickCount) {
            let differCount: number = lastClickCount - this._eventHandler.length;
            let eventList = this._generateClickEvent(differCount);
            this._eventHandler.concat(eventList);
        } else if (this._eventHandler.length > lastClickCount) {
            let differCount = this._eventHandler.length - lastClickCount;
            this._eventHandler.slice(this._eventHandler.length - differCount);
        }
    }

    /**
     * 生成事件
     * @param eventCount 
     * @returns 
     */
    private _generateClickEvent(eventCount: number) {
        if (eventCount <= 0) {
            return;
        }
        let eventList: cc.Component.EventHandler[] = [];
        for (let i = 0; i < eventCount; i++) {
            let tempEvent = new cc.Component.EventHandler();
            eventList.push(tempEvent);
        }
        return eventList;
    }


    /**
    * 切换按钮的选中状态
    * @param btnIndex 
    */
    _switchSelectButton(btnIndex: number) {
        if (this._buttonIndex == btnIndex) {
            return;
        }
        let selectBtnNode = this._btnList[btnIndex];
        this.refreshBtn(true, selectBtnNode, btnIndex);

        if (this._buttonIndex != null) {
            let lastSelectBtnNode = this._btnList[this._buttonIndex];
            this.refreshBtn(false, lastSelectBtnNode, this._buttonIndex);
        }
        this._buttonIndex = btnIndex;
    }


    //====================================================初始化

    /**
     * 在运行环境中初始化
     */
    _init() {
        cc.game.on("OptionButtonClick", (index) => {
            this._switchSelectButton(index);
        }, this);
        this._btnList = this.node.children;
        this.bindTouchEvent();
    }

    /**
     * 在IDE中的初始化
     */
    _initInIDE() {
        this._generateButton();
    }

    //====================================================声明周期函数

    protected onLoad(): void {
        this._init();
        this._initInIDE();
        //设置默认选中第一个按钮
        this.setDefaultSelect(0);
    }

    protected onDestroy(): void {
        cc.game.off("OptionButtonClick", (data) => {
            this._switchSelectButton(data.btnIndex);
        }, this);
    }

    //====================================================提供给外界的函数

    /**
    * 初始化按钮节点（派生类请重写此函数扩展button按钮节点的选中效果）
    */
    protected generateButtonNode(btnNode: cc.Node) {
        let btnSpr = btnNode.addComponent(cc.Sprite);
        btnNode.setContentSize(this.buttonItemContentSize.x, this.buttonItemContentSize.y);
        btnNode.name = "btnNode";
        return btnNode;
    }

    /**
     * 按钮切换样式（派生类请重写此函数以实现自定义样式）
     */
    protected refreshBtn(isSelect: boolean, btnNode: cc.Node, btnIndex?: number) {

    }


    /**
     * 公用方法：手动设置选中按钮（派生类可重写此方法）
     * @param btnIndex 
     */
    protected setDefaultSelect(btnIndex: number = 0) {
        cc.Component.EventHandler.emitEvents([this._eventHandler[btnIndex]], event);
        cc.game.emit("OptionButtonClick", btnIndex);
        this._switchSelectButton(btnIndex);
    }
}