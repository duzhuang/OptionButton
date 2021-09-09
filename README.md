### tabView的作用
> tabView 是一个用于切换多个按钮选中的组件
### 如何使用tabView

**第一步**
将tabView组件拷贝到自己的项目下

**第二步**
在项目中新建一个空白节点，拖拽tabView组件到节点上

**第三步** *设置tabView的属性面板*

**buttonItemContentSize**:按钮的尺寸

**tabCount**:按钮的具体个数。tips：输入个数之后，在tabView的根节点上会自动生成按钮

**buttonItem**:按钮节点，tips：1、可以在输入tabCount之后将自动生成的按钮节点拖拽到此属性上。2、可以自己构建自己的预制体拖拽到此属性上，但是自己构建的预支的结构必须包含 
```javascript
tabViewNode{
    btnNode{
        select //选中节点  
        lbl //按钮字体显示节点 
    }
}
```


**eventHandler**:点击按钮对应的回调函数

**usingFontScale**：是否使用字体缩放

**usingFontColor**：是否使用颜色变化

**usingSprite**：是否使用图片选中，如果勾选此属性usingFontScale和usingFontColor将会失效。点击对应按钮替换对应的图片
