/**
 * 区块项目
 */
export class ListItem {
    constructor() {
        /**
         * 下边框, 0则不显示
         */
        this.border = 1;
        this.color = '#f5f5f5';
    }
    render() {
        return (h("div", { class: "item", style: {
                borderBottom: `${this.border > 0 ? `${this.border}px` : '0'} solid #f5f5f5`
            } },
            h("slot", null)));
    }
    static get is() { return "nb-list-item"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "border": {
            "type": Number,
            "attr": "border"
        },
        "color": {
            "type": String,
            "attr": "color"
        }
    }; }
    static get style() { return "/**style-placeholder:nb-list-item:**/"; }
}
