const h = window.NbComponent.h;

/**
 * 上滑交互框
 */
class List {
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
    static get style() { return ".space.s {\n  margin-top: 0.133333333333333rem;\n}\n.space.m {\n  margin-top: 0.266666666666667rem;\n}\n.space.l {\n  margin-top: 0.4rem;\n}\n.list {\n  background: #fff;\n}"; }
}

export { List as NbList };
