/**
 * 上滑交互框
 */
export class List {
    constructor() {
        /**
         * List之间的间距
         */
        this.topSpace = 'm';
    }
    render() {
        return [
            this.topSpace !== 'none' && h("div", { class: `space ${this.topSpace}` }),
            h("div", { class: "list" },
                h("slot", null))
        ];
    }
    static get is() { return "nb-list"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "topSpace": {
            "type": String,
            "attr": "top-space"
        }
    }; }
    static get style() { return "/**style-placeholder:nb-list:**/"; }
}
