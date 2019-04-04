import { h } from '../nb-component.core.js';

class Stock {
    get link() {
        return `http://baidu.com?wd=${encodeURIComponent(this.detailId)}`;
    }
    render() {
        return [
            h("div", { class: "stock" },
                h("a", { href: this.link },
                    "$",
                    this.headTitle))
        ];
    }
    static get is() { return "ht-stock"; }
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
    static get style() { return ".stock.sc-ht-stock{display:inline-block}.stock.sc-ht-stock   a.sc-ht-stock{color:#315ea1;font-size:.4266666666666667rem;line-height:.64rem;text-decoration:none}"; }
}

export { Stock as HtStock };
