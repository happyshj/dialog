;(function($){
    var Dialog = function(config){
        var _this_ = this;
        this.config = {
            width: "auto",
            height: "auto",
            message: null,
            type: "waiting",
            buttons: null,
            delay: null,
            delayCallback: null,
            maskOpacity: null,
            maskClose: null,
            effect: null
        };
        if(config && $.isPlainObject(config)){
            $.extend(this.config,config);
        }else{
            this.isConfig = true;
        }

        this.body = $('body');
        this.mask = $('<div class="g-dialog-container">');
        this.win = $('<div class="dialog-window">');
        this.winHeader = $('<div class="dialog-header">');
        this.winContent = $('<div class="dialog-content">');
        this.winFooter = $('<div class="dialog-footer">');

        this.create();
    };
    Dialog.zIndex = 10000;
    Dialog.prototype = {
        animate: function () {
            var _this_ = this;
            this.win.css("-webkit-transform","scale(0,0)");
            this.win.css("-moz-transform","scale(0,0)");
            this.win.css("-ms-transform","scale(0,0)");
            this.win.css("-o-transform","scale(0,0)");
            this.win.css("transform","scale(0,0)");
            window.setTimeout(function () {
                _this_.win.css("-webkit-transform","scale(1,1)");
                _this_.win.css("-moz-transform","scale(1,1)");
                _this_.win.css("-ms-transform","scale(1,1)");
                _this_.win.css("-o-transform","scale(1,1)");
                _this_.win.css("transform","scale(1,1)");
            },100);

        },
        create: function(){
            var _this_ = this,
                config = this.config,
                mask = this.mask,
                win = this.win,
                header = this.winHeader,
                content = this.winContent,
                footer = this.winFooter,
                body = this.body;

            Dialog.zIndex++;
            this.mask.css("zIndex",Dialog.zIndex);

            if(this.isConfig){
                win.append(header.addClass("waiting"));

                if(config.effect){
                    this.animate();
                }

                mask.append(win);
                body.append(mask);
            }else{
                header.addClass(config.type);
                win.append(header);
                if(config.message){
                    win.append(content.html(config.message));
                }
                if(config.buttons){
                    this.createButtons(footer,config.buttons);
                    win.append(footer);
                }
                mask.append(win);
                body.append(mask);

                if(config.width != "auto"){
                    win.width(config.width);
                }
                if(config.height != "auto"){
                    win.height(config.height);
                }
                if(config.maskOpacity){
                    mask.css("backgroundColor","rgba(0,0,0,"+config.maskOpacity+")");
                }
                if(config.delay && config.delay != 0){
                    window.setTimeout(function(){
                        _this_.close();
                        config.delayCallback && config.delayCallback();
                    },config.delay);
                }

                if(config.effect){
                    this.animate();
                }
                if(config.maskClose){
                    mask.click(function () {
                        _this_.close();
                    });
                }
            }
        },
        createButtons:function(footer,buttons){
            var _this_ = this;
            $(buttons).each(function(i){
                var type = this.type ? 'class="'+this.type+'"' : "";
                var btnText = this.text ? this.text : "按钮"+(++i);
                var callback = this.callback ? this.callback : null;
                var button = $('<button '+type+'>'+btnText+'</button>');

                if(callback){
                    button.click(function(e){
                        var isClose = callback();
                        e.stopPropagation();

                        if(isClose != false){
                            _this_.close();
                        }
                    });
                }else{
                    button.click(function (e) {
                        e.stopPropagation();
                        _this_.close();
                    });
                }
                footer.append(button);
            });
        },
        close: function(){
            this.mask.remove();
        }

    };
    window.Dialog = Dialog;
    $.dialog = function (config) {
        return new Dialog(config);
    }
})(Zepto);
