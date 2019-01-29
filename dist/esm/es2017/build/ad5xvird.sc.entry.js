import { h } from '../nb-component.core.js';

class Actionsheet {
    constructor() {
        this.scrollTop = 0;
        this.visible = false;
        this.headTitle = '标题';
        this.mask = true;
        this.onClose = () => {
            this.close();
        };
    }
    getScrollTop() {
        return document.body.scrollTop || document.documentElement.scrollTop;
    }
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
    close() {
        this.visible = false;
    }
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
    static get style() { return ".actionsheet{position:fixed;z-index:1;bottom:0;background:#fff;width:10rem;-webkit-transition:-webkit-transform .1s linear;transition:-webkit-transform .1s linear;transition:transform .1s linear;transition:transform .1s linear,-webkit-transform .1s linear;-webkit-transform:translateY(100%);transform:translateY(100%)}.actionsheet.visible{z-index:999;-webkit-transform:translateY(0);transform:translateY(0)}.actionsheet .container .header{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:1.173333333333333rem;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;position:relative;border-bottom:1px solid #ebebeb}.actionsheet .container .header .close{position:absolute;left:.4rem;top:.4rem;width:.37333333333333335rem;height:.37333333333333335rem}.actionsheet .container .header .title{font-size:.4266666666666667rem;color:#202020}.actionsheet .container .header .icon-close{width:.4266666666666667rem;height:.4266666666666667rem;position:absolute;right:.4rem;display:inline-block;stroke-width:0;stroke:currentColor;vertical-align:middle}.mask{position:fixed;top:0;width:10rem;height:100vh;background:rgba(0,0,0,.6);z-index:-1;opacity:0;-webkit-transition:opacity .1s linear;transition:opacity .1s linear}.mask.visible{z-index:1;opacity:1}"; }
}

export { Actionsheet as NbActionsheet };
