import { h } from '../nb-component.core.js';

class Topic {
    get link() {
        return `http://baidu.com?wd=${encodeURIComponent(this.detailId)}`;
    }
    render() {
        return [
            h("div", { class: "topic" },
                h("a", { href: this.link },
                    "#",
                    this.headTitle,
                    "#"))
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
    static get style() { return ".topic.sc-ht-topic{display:inline-block}.topic.sc-ht-topic   a.sc-ht-topic{color:#315ea1;font-size:.4266666666666667rem;line-height:.64rem;text-decoration:none}"; }
}

export { Topic as HtTopic };
