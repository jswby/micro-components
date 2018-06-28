// components/keyboard/keyboard.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        keyboardType: {
            //键盘类型
            type: String,
            value: 'english',//english number
            observer: function (newVal, oldVal, changedPath) {
                // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
                // 通常 newVal 就是新设置的数据， oldVal 是旧数据

            }
        },
        selectedKeyValue: {
            type: String,
            value: '',
            observer: function (newVal, oldVal, changedPath) {
                // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
                // 通常 newVal 就是新设置的数据， oldVal 是旧数据

            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isShow: false,
        keyboardBtnWidth: '10vw',
        keyboardValues: [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["0", "del"]],
        animationData: {}
    },

    /**
     * 生命周期函数，可以为函数，或一个在methods段中定义的方法名
     */
    attached: function () {
        this.animation = wx.createAnimation({
            duration: 200,
            timingFunction: 'ease-in',
        })
    },
    moved: function () {
    },
    detached: function () {
    },

    /**
     * 组件的方法列表
     */
    methods: {
        init: function (ktype, show) {
            console.log(ktype)
            let that = this;
            let info = wx.getSystemInfoSync();
            // console.log(info);
            if (ktype == "english") {
                that.setData({
                    // keyboardValues: [["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"], ["a", "s", "d", "f", "g", "h", "j", "k", "l"], ["z", "x", "c", "v", "b", "n", "m"], ["🈳", "del", "⬇"]],
                    keyboardValues: [["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"], ["a", "s", "d", "f", "g", "h", "j", "k", "l"], ["z", "x", "c", "v", "b", "n", "m"]],
                    keyboardBtnWidth: '10vw',
                    keyboardType: ktype,
                    isShow: true,
                    longScreen: parseInt(info.screenHeight) > 800
                })
            } else if (ktype == "number") {
                that.setData({
                    keyboardValues: [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["0", "del", "⬇"]],
                    keyboardBtnWidth: '33vw',
                    keyboardType: ktype,
                    isShow: true,
                    longScreen: parseInt(info.screenHeight) > 800
                })
            }

            var query = wx.createSelectorQuery().in(this);
            //选择id
            query.select('#wx-keyboard').boundingClientRect(function (res) {
                //res就是 所有标签为mjltest的元素的信息 的数组
                console.log(res);
                that.setData({
                    keyboardHeight: res.height,
                    isShow: show ? true : false
                })
            }).exec()

        },
        //隐藏
        hideKeyboard() {
            this.animation.translateY(this.data.keyboardHeight).step({duration: 300})
            this.setData({
                animationData: this.animation.export(),
                isShow: true
            });
            setTimeout(function () {
                this.animation.translateY(0).step()
                this.setData({
                    animationData: this.animation.export(),
                    isShow: false
                })
            }.bind(this), 300)

        },
        //展示
        showKeyboard() {
            this.animation.translateY(this.data.keyboardHeight).step()
            this.setData({
                animationData: this.animation.export(),
                isShow: true
            })
            this.animation.translateY(0).step({duration: 300})
            this.setData({
                animationData: this.animation.export()
            })
        },
        _selectKeyEvent(e) {
            console.log('你点击了键 ' + JSON.stringify(e.detail));
            if (e.target.id == "⬇") {
                this.hideKeyboard();
            } else {
                this.selectedKeyValue = e.target.id;
                if (e.target.id == "🈳") {
                    this.selectedKeyValue = "space"
                }

                var myEventDetail = {value: this.selectedKeyValue}
                var myEventOption = {}
                this.triggerEvent('selectKeyEvent', myEventDetail, myEventOption)
            }
        }
    }
})
