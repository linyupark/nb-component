const h = window.NbComponent.h;

/**
 * 专题/资讯
 */
class Subject {
    /**
     * 对应跳转地址
     */
    get link() {
        return `#/article-detail/${encodeURIComponent(this.detailId)}/article`;
    }
    render() {
        return [
            h("div", { class: "subject" },
                h("a", { href: this.link },
                    this.type === 'subject1' ? h("svg", { class: "icon", viewBox: "0 0 1024 1024" },
                        h("path", { d: "M174.327172 88.275862v847.448276h688.551725v-847.448276h-688.551725z m0-70.62069h688.551725a70.62069 70.62069 0 0 1 70.620689 70.62069v847.448276a70.62069 70.62069 0 0 1-70.620689 70.62069h-688.551725a70.62069 70.62069 0 0 1-70.620689-70.62069v-847.448276a70.62069 70.62069 0 0 1 70.620689-70.62069z" }),
                        h("path", { d: "M333.223724 335.448276a35.310345 35.310345 0 1 1 0-70.62069h391.662345a35.310345 35.310345 0 1 1 0 70.62069H333.223724zM333.223724 512a35.310345 35.310345 0 0 1 0-70.62069h391.662345a35.310345 35.310345 0 1 1 0 70.62069H333.223724z" })) :
                        h("svg", { class: "icon", viewBox: "0 0 1024 1024" },
                            h("path", { d: "M502.053 1024C227.056 1024 0.588 799.333 0.588 521.38S224.745 16.446 504.364 16.446c277.308 0 503.777 226.978 503.777 504.931S781.67 1024 502.053 1024z m2.311-938.09c-240.333 0-434.448 194.592-434.448 435.47 0 238.565 194.116 433.157 432.138 433.157 240.333 0 436.759-194.592 436.759-433.158S744.697 85.91 504.364 85.91z m288.862 187.625L622.22 625.607c-4.622 6.967-9.244 13.9-16.177 16.211L259.41 808.61c-4.623 2.312-9.244 4.623-13.867 4.623-9.243 0-18.486-2.31-25.419-9.278-11.555-9.244-13.866-25.454-6.933-39.354l168.696-354.383c2.31-6.967 9.243-13.899 16.176-16.244l348.945-164.448c13.866-6.931 30.043-4.62 39.285 6.968 11.556 11.588 13.867 27.797 6.934 37.041zM504.364 451.882c-39.285 0-69.328 30.11-69.328 69.497s30.043 69.498 69.328 69.498c36.974 0 69.327-30.11 69.327-69.498s-32.353-69.497-69.327-69.497z" })),
                    "\u00A0",
                    this.headTitle),
                h("p", { style: {
                        display: this.summary === '' ? 'inline-block' : 'block'
                    } },
                    this.summary,
                    "\u00A0\u00A0\u00A0",
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
        },
        "type": {
            "type": String,
            "attr": "type"
        }
    }; }
    static get style() { return ".subject {\n  display: inline-block;\n}\n.subject a {\n  color: #315ea1;\n  font-size: 0.426666666666667rem;\n  line-height: 0.64rem;\n  text-decoration: none;\n}\n.subject a .icon {\n  width: 1em;\n  height: 1em;\n  vertical-align: -0.15em;\n  fill: currentColor;\n  overflow: hidden;\n}\n.subject p {\n  font-size: 0.426666666666667rem;\n  line-height: 0.666666666666667rem;\n  color: #000;\n  margin: 0;\n}"; }
}

export { Subject as HtSubject };
