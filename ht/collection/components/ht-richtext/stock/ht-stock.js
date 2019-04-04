export class Stock {
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
    static get style() { return "/**style-placeholder:ht-stock:**/"; }
}
