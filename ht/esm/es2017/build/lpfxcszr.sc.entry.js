import { h } from '../nb-component.core.js';

class Subject {
    get link() {
        return `http://baidu.com?wd=${encodeURIComponent(this.detailId)}`;
    }
    render() {
        return [
            h("svg", { width: "0", height: "0", version: "1.1", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" },
                h("defs", null,
                    h("symbol", { id: "icon-zhuanlan", viewBox: "0 0 1024 1024" },
                        h("path", { d: "M174.327172 88.275862v847.448276h688.551725v-847.448276h-688.551725z m0-70.62069h688.551725a70.62069 70.62069 0 0 1 70.620689 70.62069v847.448276a70.62069 70.62069 0 0 1-70.620689 70.62069h-688.551725a70.62069 70.62069 0 0 1-70.620689-70.62069v-847.448276a70.62069 70.62069 0 0 1 70.620689-70.62069z" }),
                        h("path", { d: "M333.223724 335.448276a35.310345 35.310345 0 1 1 0-70.62069h391.662345a35.310345 35.310345 0 1 1 0 70.62069H333.223724zM333.223724 512a35.310345 35.310345 0 0 1 0-70.62069h391.662345a35.310345 35.310345 0 1 1 0 70.62069H333.223724z" })))),
            h("div", { class: "subject" },
                h("a", { href: this.link },
                    h("svg", { class: "icon", "aria-hidden": "true" },
                        h("use", { xlinkHref: "#icon-zhuanlan" })),
                    " ",
                    this.headTitle),
                h("p", { style: {
                        display: this.summary === '' ? 'inline-block' : 'block'
                    } },
                    this.summary,
                    h("a", { href: this.link }, "\u70B9\u51FB\u9605\u8BFB>>")))
        ];
    }
    static get is() { return "ht-subject"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "detailId": {
            "type": String,
            "attr": "detail-id"
        },
        "headTitle": {
            "type": String,
            "attr": "head-title"
        },
        "summary": {
            "type": String,
            "attr": "summary"
        }
    }; }
    static get style() { return ".subject.sc-ht-subject{display:inline-block}.subject.sc-ht-subject   a.sc-ht-subject{color:#315ea1;font-size:.4266666666666667rem;line-height:.64rem;text-decoration:none}.subject.sc-ht-subject   a.sc-ht-subject   .icon.sc-ht-subject{width:1em;height:1em;vertical-align:-.15em;fill:currentColor;overflow:hidden}.subject.sc-ht-subject   p.sc-ht-subject{font-size:.4266666666666667rem;line-height:.6666666666666666rem;color:#000;margin:0}"; }
}

export { Subject as HtSubject };
