const t=window.NbComponent.h;class e{get link(){return`#/article-detail/${encodeURIComponent(this.detailId)}/topic`}goLink(t){t.stopPropagation()}render(){return[t("div",{class:"topic"},t("a",{href:this.link,onClick:this.goLink},"#",this.headTitle,"#")," ")]}static get is(){return"ht-topic"}static get encapsulation(){return"shadow"}static get properties(){return{detailId:{type:String,attr:"detail-id"},goLink:{method:!0},headTitle:{type:String,attr:"head-title"}}}static get style(){return".topic.sc-ht-topic{display:inline-block}.topic.sc-ht-topic   a.sc-ht-topic{color:#315ea1;font-size:.4266666666666667rem;line-height:.64rem;text-decoration:none}"}}export{e as HtTopic};