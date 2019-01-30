const h = window.NbComponent.h;

/**
 * 区块项目
 */
class ListItem {
    constructor() {
        /**
         * 下边框, 0则不显示
         */
        this.border = 1;
        this.color = '#f5f5f5';
    }
    render() {
        return (h("div", { class: "item", style: {
                borderBottomWeight: this.border > 0 ? `${this.border}px` : '0',
                borderColor: this.color
            } }));
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
    static get style() { return ".space.s {\n  margin-top: 0.133333333333333rem;\n}\n.space.m {\n  margin-top: 0.266666666666667rem;\n}\n.space.l {\n  margin-top: 0.4rem;\n}\n.list {\n  background: #fff;\n}\n.list .item {\n  height: 1.173333333333333rem;\n}"; }
}

export { ListItem as NbListItem };
