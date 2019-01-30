/**
 * 徽标数
 */
export class Badge {
    constructor() {
        /**
         * count的封顶数值超出则显示 maxCount+
         */
        this.maxCount = 99;
        /**
         * 不展示数字，显示点
         */
        this.dot = false;
        /**
         * 当count为0的时候也显示
         */
        this.showZero = false;
        /**
         * 徽标底色
         */
        this.bgColor = '#FB5B4C';
    }
    /**
     * 徽标 classList
     */
    get dotCountClassNames() {
        let classNames = [];
        // 无论count多少都显示
        if (this.showZero)
            classNames.push('visible');
        // 显示为 dot
        if (this.dot)
            classNames.push('dot');
        // 显示为数字
        if (!this.dot)
            classNames.push('count');
        // 数字为0不显示
        if (!this.showZero && this.count === 0)
            classNames.push('hidden');
        return classNames.join(' ');
    }
    /**
     * 实际展示的数字
     */
    get displayCount() {
        if (this.dot)
            return '';
        if (this.showZero || this.count <= this.maxCount)
            return this.count;
        if (this.count > this.maxCount)
            return `${this.maxCount}+`;
    }
    render() {
        return (h("div", { class: "badge" },
            h("i", { class: this.dotCountClassNames, style: {
                    backgroundColor: this.bgColor
                } }, this.displayCount),
            h("slot", null)));
    }
    static get is() { return "nb-badge"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "bgColor": {
            "type": String,
            "attr": "bg-color"
        },
        "count": {
            "type": Number,
            "attr": "count"
        },
        "dot": {
            "type": Boolean,
            "attr": "dot"
        },
        "maxCount": {
            "type": Number,
            "attr": "max-count"
        },
        "showZero": {
            "type": Boolean,
            "attr": "show-zero"
        }
    }; }
    static get style() { return "/**style-placeholder:nb-badge:**/"; }
}
