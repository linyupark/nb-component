/**
 * 上滑交互框
 */
export class Actionsheet {
    constructor() {
        /**
         * 暂存滚动条位置用于恢复
         * @type {Number}
         */
        this.scrollTop = 0;
        /**
         * 展示开关
         */
        this.visible = false;
        /**
         * 展示标题内容 （不用title避免跟原生属性冲突）
         */
        this.headTitle = '标题';
        /**
         * 是否需要遮罩
         */
        this.mask = true;
        /**
         * 关闭显示
         */
        this.onClose = () => {
            this.close();
        };
    }
    /**
     * 获取当前滚动位置
     * @return {Number}
     */
    getScrollTop() {
        return document.body.scrollTop || document.documentElement.scrollTop;
    }
    /**
     * 观察显示状态来控制滚动条（显示时滑动屏幕不能让背景内容一起滚动）
     * @param  {String} visible 最新的显示状态值
     * @return {Void}
     */
    scrollHandler(visible) {
        if (visible) {
            this.scrollTop = this.getScrollTop();
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = -this.scrollTop + 'px';
        }
        else {
            document.body.style.position = 'inherit';
            document.body.style.width = 'inherit';
            document.body.scrollTop = document.documentElement.scrollTop = this.scrollTop || 0;
        }
    }
    get visibleClassName() {
        return this.visible ? 'actionsheet visible' : 'actionsheet';
    }
    /**
     * 关闭显示
     */
    close() {
        this.visible = false;
    }
    /**
     * 显示
     */
    show() {
        this.visible = true;
    }
    render() {
        return [
            h("div", { class: this.visibleClassName },
                h("div", { class: "container" },
                    this.headTitle && (h("div", { class: "header" },
                        h("div", { class: "title" }, this.headTitle),
                        h("svg", { onClick: this.onClose, class: "icon-close", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
                            h("path", { fill: "#333", d: "M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z" })))),
                    h("slot", { name: "container" }))),
            this.mask && h("div", { class: `mask ${this.visible ? 'visible' : ''}`, onClick: this.onClose })
        ];
    }
    static get is() { return "nb-actionsheet"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "close": {
            "method": true
        },
        "headTitle": {
            "type": String,
            "attr": "head-title"
        },
        "mask": {
            "type": Boolean,
            "attr": "mask"
        },
        "show": {
            "method": true
        },
        "visible": {
            "state": true,
            "watchCallbacks": ["scrollHandler"]
        }
    }; }
    static get style() { return "/**style-placeholder:nb-actionsheet:**/"; }
}
