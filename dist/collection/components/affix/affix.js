export class Affix {
    constructor() {
        this.toTarget = () => document;
    }
    onCurrentPageChange(isFixed) {
        this.change.emit({
            isFixed
        });
    }
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
                this.toTarget().addEventListener('scroll', this.handleFix.bind(this), false);
            }, 100);
        }
        catch (e) {
            throw new TypeError('"toTarget" props maybe not a valid scroll dom.');
        }
    }
    async componentDidUnload() {
        this.toTarget().removeEventListener('scroll', this.handleFix.bind(this), false);
    }
    render() {
        return (h("div", { class: `${this.fixed ? 'fixed' : 'nofixed'}`, style: {
                top: this.fixed ? `${this.offset}px` : 'auto'
            } },
            h("slot", null)));
    }
    static get is() { return "nb-affix"; }
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
        "toTarget": {
            "type": "Any",
            "attr": "to-target"
        }
    }; }
    static get events() { return [{
            "name": "change",
            "method": "change",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:nb-affix:**/"; }
}
