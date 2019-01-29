import Prism from 'prismjs';
export class CodeHighlight {
    constructor() {
        this.code = '';
        this.lang = 'html';
    }
    render() {
        return (h("pre", null,
            h("code", { class: "language-html", innerHTML: Prism.highlight(this.code, Prism.languages[this.lang], this.lang) })));
    }
    static get is() { return "nb-code-highlight"; }
    static get properties() { return {
        "code": {
            "type": String,
            "attr": "code"
        },
        "lang": {
            "type": String,
            "attr": "lang"
        }
    }; }
    static get style() { return "/**style-placeholder:nb-code-highlight:**/"; }
}
