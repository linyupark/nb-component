const h = window.NbComponent.h;

/**
 * 仿通讯录侧边垂直滑动定位条
 * @slot 用于定位的内容列表
 */
class VscrollNav {
    constructor() {
        /**
         * 可用于导航滑动的关键字数组
         */
        this.keywords = ['A', 'B'];
        /**
         * 定义滚动元素 id 的前置与选中的keyword 合并成完整的 id
         * eg：'vscroll-' + 'A' -> id='vscroll-A'
         */
        this.idPrefix = 'vscroll-';
        /**
         * 包裹可滚动的容器，不填写的话默认为window级别滚动
         */
        this.scroller = null;
    }
    /**
     * 滚动列表到指定id位置
     * @param id ID名称
     */
    async scrollToId(id) {
        const scrollToTarget = this.el.querySelector(`#${id}`);
        if (!scrollToTarget)
            return false;
        const offsetY = scrollToTarget.offsetTop;
        if (!this.scroller) {
            // 不设置滚动容器默认为 window滚动
            window.scrollTo(0, offsetY);
        }
        else {
            // 设置了滚动容器
            const scroller = document.querySelector(this.scroller);
            if (!scroller)
                return false;
            scroller.scrollTop = offsetY;
        }
        this.scrollTo.emit({
            y: offsetY
        });
        return offsetY;
    }
    /**
     * 处理点击
     * @param ev 点击对象
     */
    onNavClick(ev) {
        const key = ev.target.innerText;
        if (~this.keywords.indexOf(key)) {
            this.scrollToId(`${this.idPrefix}${key}`);
        }
    }
    /**
     * 处理滑动
     * @param ev 滑动对象
     */
    onNavMove(ev) {
        const pointLocation = ev.changedTouches[0];
        // 获取到真正下方元素
        const realTarget = this.el.shadowRoot.elementFromPoint(pointLocation.clientX, pointLocation.clientY);
        const key = realTarget ? realTarget.innerHTML : '';
        // 排除无效的关键字
        if (~this.keywords.indexOf(key)) {
            this.scrollToId(`${this.idPrefix}${key}`);
        }
    }
    render() {
        return (h("div", { class: "vscroll-nav" },
            h("div", { class: "list" },
                h("slot", null)),
            h("ul", { class: "nav", onClick: this.onNavClick.bind(this), onTouchMove: this.onNavMove.bind(this) }, this.keywords.map(key => {
                return (h("li", { key: key }, key));
            }))));
    }
    static get is() { return "nb-vscroll-nav"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "idPrefix": {
            "type": String,
            "attr": "id-prefix"
        },
        "keywords": {
            "type": "Any",
            "attr": "keywords"
        },
        "scroller": {
            "type": String,
            "attr": "scroller"
        },
        "scrollToId": {
            "method": true
        }
    }; }
    static get events() { return [{
            "name": "scrollTo",
            "method": "scrollTo",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ".vscroll-nav .nav {\n  list-style: none;\n  position: fixed;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  right: 0.24rem;\n  color: #8c8c8c;\n  font-size: 0.32rem;\n  line-height: 0.346666666666667rem;\n  z-index: 99;\n}"; }
}

export { VscrollNav as NbVscrollNav };
