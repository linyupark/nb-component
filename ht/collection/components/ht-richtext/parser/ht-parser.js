export class RichtextParser {
    componentDidLoad() {
        this.parseReg(this.$el.innerHTML);
    }
    parseReg(str) {
        let tags = str.match(/\{\[([^\]])+\]\}/g);
        let outputHTML = str;
        this.debug && console.log(tags);
        (tags || []).map(tag => {
            let params = tag.match(/{\[([^\]]+)\]}/)[1].split('|');
            if (params[0] === 'emoji') {
                outputHTML = outputHTML.replace(tag, `<ht-emoji group="${params[1]}" type="${params[2]}"></ht-emoji>`);
            }
            if (params[0] === 'subject') {
                outputHTML = outputHTML.replace(tag, `<ht-subject detail-id="${params[1]}" head-title="${params[2]}" summary="${params[3] || ''}"></ht-subject>`);
            }
            if (params[0] === 'topic') {
                outputHTML = outputHTML.replace(tag, `<ht-topic detail-id="${params[1]}" head-title="${params[2]}"></ht-topic>`);
            }
            if (params[0] === 'stock') {
                outputHTML = outputHTML.replace(tag, `<ht-stock detail-id="${params[1]}" head-title="${params[2]}"></ht-stock>`);
            }
        });
        this.$el.innerHTML = outputHTML;
        this.debug && console.log(outputHTML);
    }
    render() {
        return (h("div", { class: "richtext-parser" },
            h("slot", null)));
    }
    static get is() { return "ht-richtext-parser"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "$el": {
            "elementRef": true
        },
        "debug": {
            "type": Boolean,
            "attr": "debug"
        }
    }; }
}
