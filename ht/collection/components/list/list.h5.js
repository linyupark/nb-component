export class List {
    constructor() {
        this.topSpace = 20;
    }
    px2rem(px) {
        return (px / 75);
    }
    render() {
        return [
            this.topSpace !== 0 && h("div", { class: `space`, style: {
                    height: `${this.px2rem(this.topSpace)}rem`,
                } },
                h("slot", { name: "space" })),
            h("div", { class: "list" },
                h("slot", null))
        ];
    }
    static get is() { return "nb-list"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "topSpace": {
            "type": Number,
            "attr": "top-space"
        }
    }; }
    static get style() { return "/**style-placeholder:nb-list:**/"; }
}
