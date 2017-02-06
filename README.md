# dialog
插件说明
引入文件说明：
需引入dialog.js和dialog.css文件，并且文件是基于zepto写的，也需引入该文件或者引入jQuery文件。
功能说明：
该插件可用于手机端和PC端，使用flex布局，使弹出框始终位于中间部分。
可自定义弹框的宽高width和height默认为自动宽高，以及弹框上的提示信息message。
可自定义弹出框的类型type，包括"waiting","ok","warning"。
可自定义按钮信息，包括按钮类型type分别为"red","green"以及默认值黑色、按钮文本text、点击按钮后的回调函数callback（按钮默认点击可关闭）。
可自定义按钮延时关闭的时间delay以及延时关闭的回调函数delayCallback。
可自定义遮罩层的透明度maskOpacity以及点击遮罩层是否关闭maskClose。
同时为弹出框弹出设置了一个动画，可选择是否启用effect。
使用说明：
按如下格式进行参数设置即可。
        $.dialog({
            width: "auto",
            height: "auto",
            message: null,
            type: "waiting",
            buttons: [
              {
                 text:"1",
                 type:"red",
                 callback:function(){
                   }
              }
            ],
            delay: null,
            delayCallback: null,
            maskOpacity: null,
            maskClose: null,
            effect: null
        })
