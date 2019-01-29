import { h } from '../nb-component.core.js';

class Badge {
    constructor() {
        this.maxCount = 99;
        this.dot = false;
        this.showZero = false;
        this.bgColor = '#FB5B4C';
    }
    get dotCountClassNames() {
        let classNames = [];
        if (this.showZero)
            classNames.push('visible');
        if (this.dot)
            classNames.push('dot');
        if (!this.dot)
            classNames.push('count');
        if (!this.showZero && this.count === 0)
            classNames.push('hidden');
        return classNames.join(' ');
    }
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
    static get style() { return ".badge{position:relative;display:inline-block}.badge .count,.badge .dot{position:absolute;border:1px solid #fff;font-style:normal;text-align:center}.badge .count.hidden,.badge .dot.hidden{display:none}.badge .count{font-size:.26666666666666666rem;color:#fff;height:.3466666666666667rem;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;padding:0 .09333333333333334rem;border-radius:.3466666666666667rem;top:-.17333333333333334rem;right:-.17333333333333334rem}.badge .dot{width:.16rem;height:.16rem;border-radius:50%;top:-.08rem;right:-.08rem}"; }
}

export { Badge as NbBadge };
