## 微信小程序 自定义组件

最近开始写小程序，记录并分享自己写的自定义组件

### 自定义键盘

keyboard

```markdown
用法

1. 将components文件夹放在项目根目录下

2. 在page的wxml文件中添加
<keyboard id='keyboard' bind:selectKeyEvent="keyboardSelectEvent"></keyboard>

3. 在page的json文件中添加
{
   "usingComponents": {
       "keyboard": "/components/keyboard/keyboard"
   }
}

4. 在page的js文件onready事件中添加
this.keyboard = this.selectComponent("#keyboard");//页面中定义的id
this.keyboard.init("english",true);

5. js中增加方法，获取点击的键值
keyboardSelectEvent: function(e) {
    console.log("trigger selectKeyEvent --> "+e.detail.value)
}

6. 显示和隐藏键盘
this.keyboard.showKeyboard();
this.keyboard.hideKeyboard();

```