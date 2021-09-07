const { ccclass, property } = cc._decorator;
/**
 * tabView的控制基类
 * autor:daxing
 */
@ccclass
export default class tabViewBase extends cc.Component {

    @property({ type: cc.Vec2, tooltip: '按钮节点的尺寸' })
    buttonItemContentSize = new cc.Vec2(100,50);

    @property({ type: cc.Integer, tooltip: "" })
    _tabCount = 0;
    @property({ type: cc.Integer, tooltip: '按钮的个数' })
    set tabCount(value) {
        if (value < 2) {
            cc.error("【tabview】最少需要两个按钮才可以切换，当前按钮的个数：", value)
        } else {
            if(!this._buttonItem){
                this._buttonItem  = cc.instantiate(this.initButtonNode(new cc.Node()));
            }
            this._tabCount = value;
            this._addTabButton(value);
            this._addTabEvent(value);
        }
    }
    get tabCount() {
        return this._tabCount;
    }

    @property({ type: cc.Node, tooltip: "按钮的节点" })
    _buttonItem: cc.Node = null;

    @property({ type: cc.Node, tooltip: "按钮的节点" })
    set buttonItem(value) {
        if (value) {
            this._buttonItem = value as cc.Node;
        }
    }
    get buttonItem() {
        return this._buttonItem;
    }

    @property({ type: cc.Component.EventHandler, tooltip: '' })
    _eventHandler: cc.Component.EventHandler[] = [];

    @property({ type: cc.Component.EventHandler, tooltip: '按钮对应的的具体响应事件' })
    set eventHandler(value) {
        this._eventHandler = value;
    }
    get eventHandler() {
        return this._eventHandler;
    }

    /**是否被选中 */
    public _btnSelect: string = "select";

    /**按钮的字体显示 */
    public _btnLbl: string = "lbl";

    /**当前tabView中的按钮的个数 */
    private _btnList: cc.Node[] = [];

    /**默认选中的按钮 */
    private _index: number = null;


    /**
     * 添加按钮的数量
     * @param buttonCount 
     */
    _addTabButton(buttonCount: number) {
        let btnCount = this.node.children;
        if (btnCount.length == buttonCount) {
            return;
        } else if (btnCount.length < buttonCount) {
            let leftCount = buttonCount - btnCount.length;
            for (let i = 0; i < leftCount; i++) {
                let tempNode = cc.instantiate(this.buttonItem);
                this.node.addChild(tempNode);
            }
        } else {
            for (let i = btnCount.length - 1; i >= buttonCount; i--) {
                let tempNode = this.node.children[i];
                tempNode.removeFromParent();
                tempNode.destroy();
            }
        }
    }

    /**
     * 添加按钮对应的事件
     * @param buttonCount 
     */
    _addTabEvent(buttonCount: number) {
        if (this._eventHandler.length == buttonCount) {
            return;
        } else if (this._eventHandler.length < buttonCount) {
            let leftCount = buttonCount - this._eventHandler.length;
            for (let i = 0; i < leftCount; i++) {
                cc.log(this._eventHandler);
                let tempNode = new cc.Component.EventHandler();
                this._eventHandler.push(tempNode);
            }
        } else {
            for (let i = this._eventHandler.length - 1; i >= buttonCount; i--) {
                this._eventHandler.pop();
            }
        }
    }


    /**
     * 初始化对应的tabView，不要重写此函数
     * @defaultSelect 默认选中的按钮
     */
    initTabView(defaultSelect: number = 0) {
        this._btnList = this.node.children;
        this._initBtn();
        this._switchSelect(defaultSelect);
    }

    /**
     * 初始化按钮
     */
    _initBtn() {
        for (let i = 0; i < this._btnList.length; i++) {
            let tempBtn = this._btnList[i];
            this.refreshBtn(false, tempBtn);
            tempBtn.on(cc.Node.EventType.TOUCH_END, event => {
                cc.Component.EventHandler.emitEvents([this._eventHandler[i]],event);
                this._switchSelect(i);
                this.finishCallback(i);
            })
        }
    }


    /**
    * 切换按钮的选中状态
    * @param viewIndex 
    */
    _switchSelect(viewIndex: number) {
        if (this._index == viewIndex) {
            return;
        }
        let selectBtnNode = this._btnList[viewIndex];
        this.refreshBtn(true, selectBtnNode, viewIndex);

        if (this._index != null) {
            let lastSelectBtnNode = this._btnList[this._index];
            this.refreshBtn(false, lastSelectBtnNode, this._index);
        }

        this._index = viewIndex;
    }

    /**
    * 初始化按钮节点（重写此函数可以扩展button按钮节点）
    */
    protected initButtonNode(btnNode: cc.Node) {
        return btnNode;
    }

    /**
     * 按钮切换样式（派生类请重写此函数以实现自定义样式）
     */
    protected refreshBtn(isSelect: boolean, btnNode: cc.Node, btnIndex?: number) {

    }

    /**
     * 切换之后的回调（派生类请重写此函数以实现切换之后的回调）
     */
    protected finishCallback(btnIndex: number) {

    }

}