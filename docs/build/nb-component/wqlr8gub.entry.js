const t=window.NbComponent.h;class o{constructor(){this.maxCount=99,this.dot=!1,this.showZero=!1,this.bgColor="#FB5B4C",this.offset=0}get dotCountClassNames(){let t=[];return this.showZero&&t.push("visible"),this.dot&&t.push("dot"),this.dot||t.push("count"),this.showZero||0!==this.count||t.push("hidden"),0!==this.offset&&t.push(`offset-${this.offset}`),t.join(" ")}get displayCount(){return this.dot?"":this.showZero||this.count<=this.maxCount?this.count:this.count>this.maxCount?`${this.maxCount}+`:void 0}render(){return t("div",{class:"badge"},t("i",{class:this.dotCountClassNames,style:{backgroundColor:this.bgColor}},this.displayCount),t("slot",null))}static get is(){return"nb-badge"}static get encapsulation(){return"shadow"}static get properties(){return{bgColor:{type:String,attr:"bg-color"},count:{type:Number,attr:"count"},dot:{type:Boolean,attr:"dot"},maxCount:{type:Number,attr:"max-count"},offset:{type:Number,attr:"offset"},showZero:{type:Boolean,attr:"show-zero"}}}static get style(){return".badge{position:relative;display:inline-block}.badge .count,.badge .dot{position:absolute;border:1px solid #fff;font-style:normal;text-align:center;z-index:2}.badge .count.hidden,.badge .dot.hidden{display:none}.badge .count{font-size:.26666666666666666rem;color:#fff;height:.3466666666666667rem;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;padding:0 .09333333333333334rem;border-radius:.3466666666666667rem;top:-.17333333333333334rem;right:-.17333333333333334rem}.badge .count.offset-1{top:-.21333333333333335rem;right:-.21333333333333335rem}.badge .dot{width:.16rem;height:.16rem;border-radius:50%;top:-.08rem;right:-.08rem}.badge .dot.offset-1{top:-.12rem;right:-.12rem}"}}export{o as NbBadge};