import { h } from '../nb-component.core.js';

class ListItem {
    constructor() {
        this.border = 1;
        this.color = '#f5f5f5';
        this.height = 88;
        this.sideSpace = 30;
    }
    px2rem(px) {
        return px == 0 ? 'auto' : (px / 75);
    }
    isShort(side) {
        return this.short === side || this.short === 'both';
    }
    render() {
        return (h("div", { class: `item`, style: {
                paddingLeft: `${this.isShort('left') === false ? `${this.px2rem(this.sideSpace)}rem` : '0'}`,
                paddingRight: `${this.isShort('right') === false ? `${this.px2rem(this.sideSpace)}rem` : '0'}`,
                height: `${this.px2rem(this.height)}rem`,
                borderBottom: `${this.border > 0 ? `${this.border}px` : '0'} solid ${this.color}`,
                marginLeft: `${this.isShort('left') ? this.px2rem(this.sideSpace) + 'rem' : '0'}`,
                marginRight: `${this.isShort('right') ? this.px2rem(this.sideSpace) + 'rem' : '0'}`,
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
        },
        "height": {
            "type": Number,
            "attr": "height"
        },
        "short": {
            "type": String,
            "attr": "short"
        },
        "sideSpace": {
            "type": Number,
            "attr": "side-space"
        }
    }; }
    static get style() { return ".item{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.item.left{padding-left:0}.item.right{padding-right:0}.item.both{margin:0 $sideSpace;padding:0}"; }
}

export { ListItem as NbListItem };
