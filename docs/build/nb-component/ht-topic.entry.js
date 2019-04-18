const h = window.NbComponent.h;

/**
 * 话题
 */
class Topic {
    /**
     * 对应跳转地址
     */
    get link() {
        return `#/article-detail/${encodeURIComponent(this.detailId)}/topic`;
    }
    render() {
        return [
            h("div", { class: "topic" },
                h("a", { href: this.link },
                    "#",
                    this.headTitle,
                    "#"),
                "\u00A0")
        ];
    }
    static get is() { return "ht-topic"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "detailId": {
            "type": String,
            "attr": "detail-id"
        },
        "headTitle": {
            "type": String,
            "attr": "head-title"
        }
    }; }
    static get style() { return ".topic {\n  display: inline-block;\n}\n.topic a {\n  color: #315ea1;\n  font-size: 0.426666666666667rem;\n  line-height: 0.64rem;\n  text-decoration: none;\n}"; }
}

export { Topic as HtTopic };
