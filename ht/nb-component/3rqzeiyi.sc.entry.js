const t=window.NbComponent.h;class e{get link(){return`#/article-detail/${encodeURIComponent(this.detailId)}/article`}render(){return[t("svg",{width:"0",height:"0",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},t("defs",null,t("symbol",{id:"icon-zhuanlan",viewBox:"0 0 1024 1024"},t("path",{d:"M174.327172 88.275862v847.448276h688.551725v-847.448276h-688.551725z m0-70.62069h688.551725a70.62069 70.62069 0 0 1 70.620689 70.62069v847.448276a70.62069 70.62069 0 0 1-70.620689 70.62069h-688.551725a70.62069 70.62069 0 0 1-70.620689-70.62069v-847.448276a70.62069 70.62069 0 0 1 70.620689-70.62069z"}),t("path",{d:"M333.223724 335.448276a35.310345 35.310345 0 1 1 0-70.62069h391.662345a35.310345 35.310345 0 1 1 0 70.62069H333.223724zM333.223724 512a35.310345 35.310345 0 0 1 0-70.62069h391.662345a35.310345 35.310345 0 1 1 0 70.62069H333.223724z"})))),t("div",{class:"subject"},t("a",{href:this.link},t("svg",{class:"icon","aria-hidden":"true"},t("use",{xlinkHref:"#icon-zhuanlan"}))," ",this.headTitle),t("p",{style:{display:""===this.summary?"inline-block":"block"}},this.summary,t("a",{href:this.link},"点击阅读>>")))]}static get is(){return"ht-subject"}static get encapsulation(){return"shadow"}static get properties(){return{detailId:{type:String,attr:"detail-id"},headTitle:{type:String,attr:"head-title"},summary:{type:String,attr:"summary"}}}static get style(){return".subject.sc-ht-subject{display:inline-block}.subject.sc-ht-subject   a.sc-ht-subject{color:#315ea1;font-size:.4266666666666667rem;line-height:.64rem;text-decoration:none}.subject.sc-ht-subject   a.sc-ht-subject   .icon.sc-ht-subject{width:1em;height:1em;vertical-align:-.15em;fill:currentColor;overflow:hidden}.subject.sc-ht-subject   p.sc-ht-subject{font-size:.4266666666666667rem;line-height:.6666666666666666rem;color:#000;margin:0}"}}export{e as HtSubject};