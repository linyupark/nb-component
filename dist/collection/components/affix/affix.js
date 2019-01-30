/**
 * 固钉组件
 * @description 根据滑动来切换固定跟原始状态的组件
 */
export class Affix {
    constructor() {
        /**
         * 计算举例的参照dom
         */
        this.targetDom = () => document.body;
    }
    /**
     * 观察固定状态变化
     * @param isFixed
     */
    onCurrentPageChange(isFixed) {
        this.change.emit({
            isFixed
        });
    }
    /**
     * 根据设置来切换固定状态
     */
    handleFix() {
        if (this.offset >= 0) {
            const rectTop = this.el.getBoundingClientRect().top;
            this.fixed = rectTop <= this.offset;
        }
    }
    componentDidLoad() {
        try {
            this.handleFix();
            setTimeout(() => {
                this.targetDom().addEventListener('scroll', this.handleFix.bind(this), false);
            }, 10);
        }
        catch (e) {
            throw new TypeError(e);
        }
    }
    componentDidUnload() {
        this.targetDom().removeEventListener('scroll', this.handleFix.bind(this), false);
    }
    render() {
        return (h("div", { style: {
                position: this.fixed ? `fixed` : 'relative',
                top: this.fixed ? `${this.offset}px` : 'auto'
            } },
            h("slot", null)));
    }
    static get is() { return "nb-affix"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "fixed": {
            "state": true,
            "watchCallbacks": ["onCurrentPageChange"]
        },
        "offset": {
            "type": Number,
            "attr": "offset"
        },
        "targetDom": {
            "type": "Any",
            "attr": "target-dom"
        }
    }; }
    static get events() { return [{
            "name": "change",
            "method": "change",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}
