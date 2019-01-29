export class Actionsheet {
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
    static get style() { return "/**style-placeholder:nb-actionsheet:**/"; }
}
