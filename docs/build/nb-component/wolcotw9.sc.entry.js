const t=window.NbComponent.h;let e=0;class i{constructor(){this.refreshHTML='<div class="onrefresh">刷新内容</div>',this.moreHTML='<div class="onmore">加载更多</div>',this.loadingHTML='<div class="loading">loading</div>',this.dampHeight=30,this.positionSave=!0,this.dampingLen=0,this.loading=!1}done(){this.$content.style.transform="translateY(0px)",this.dampingLen=0,this.loading=!1}get pullLength(){return this.movePageY-this.startPageY}getScrollTop(){return this.$wrapper.scrollTop}getWrapperScrollTop(){return this.$wrapper.scrollHeight-this.$wrapper.clientHeight}recordStartDampLen(){this.startDampLen||(0===this.getScrollTop()&&this.pullLength>0||this.getScrollTop()===this.getWrapperScrollTop()&&this.pullLength<0)&&(this.startDampLen=this.pullLength)}handleTouchStart(t){this.startPageY=t.touches[0].pageY}handleTouchMove(t){this.movePageY=t.touches[0].pageY,this.loading||(this.recordStartDampLen(),this.startDampLen>0&&"refresh"!==this.disable&&(this.pullLength>this.startDampLen?(this.dampingLen=this.pullLength-this.startDampLen,this.dampingLen>this.dampHeight&&(this.dampingLen=this.dampHeight)):this.pullLength+3<this.startDampLen&&(this.dampingLen=0)),this.startDampLen<0&&"more"!==this.disable&&(this.pullLength<this.startDampLen?(this.dampingLen=this.pullLength+this.startDampLen,this.dampingLen<-this.dampHeight&&(this.dampingLen=-this.dampHeight)):this.pullLength-3>this.startDampLen&&(this.dampingLen=0)),0!==this.startDampLen&&(this.$content.style.webkitTransition="transform 0.3s",this.$content.style.webkitTransform=`translateY(${this.dampingLen}px)`))}handleTouchEnd(){this.startDampLen=null,Math.abs(this.dampingLen)>3&&(this.loading=!0),this.dampingLen>3&&this.refresh.emit(),this.dampingLen<-3&&this.more.emit(),this.positionSave&&(e=this.getScrollTop())}bindTouchScroll(t=!0){if(t)try{this.$wrapper=this.el.querySelector(this.wrapperSelector),this.$content=this.el.querySelector(this.contentSelector),this.$wrapper.addEventListener("touchstart",this.handleTouchStart.bind(this),!1),this.$wrapper.addEventListener("touchmove",this.handleTouchMove.bind(this),!1),this.$wrapper.addEventListener("touchend",this.handleTouchEnd.bind(this),!1)}catch(t){throw new TypeError('"wrapperSelector" or "contentSelector" props maybe not a valid scroll dom selector.')}}componentDidLoad(){this.bindTouchScroll(),this.positionSave&&this.$wrapper.scrollTo(0,e)}render(){return t("div",{class:"pull-to-do"},t("div",{class:`${this.dampingLen>.8*this.dampHeight?"show":"hide"}`},t("div",{innerHTML:this.loading?this.loadingHTML:this.refreshHTML})),t("slot",null),t("div",{class:`bottom ${this.dampingLen<.8*-this.dampHeight?"show":"hide"}`},t("div",{innerHTML:this.loading?this.loadingHTML:this.moreHTML})))}static get is(){return"nb-pull-to-do"}static get encapsulation(){return"shadow"}static get properties(){return{contentSelector:{type:String,attr:"content-selector"},dampHeight:{type:Number,attr:"damp-height"},dampingLen:{state:!0},disable:{type:String,attr:"disable"},done:{method:!0},el:{elementRef:!0},loading:{state:!0},loadingHTML:{type:String,attr:"loading-h-t-m-l"},moreHTML:{type:String,attr:"more-h-t-m-l"},positionSave:{type:Boolean,attr:"position-save"},refreshHTML:{type:String,attr:"refresh-h-t-m-l"},wrapperSelector:{type:String,attr:"wrapper-selector"}}}static get events(){return[{name:"refresh",method:"refresh",bubbles:!0,cancelable:!0,composed:!0},{name:"more",method:"more",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".pull-to-do.sc-nb-pull-to-do{position:relative}.pull-to-do.sc-nb-pull-to-do   .hide.sc-nb-pull-to-do, .pull-to-do.sc-nb-pull-to-do   .show.sc-nb-pull-to-do{position:absolute;width:100%;top:0;opacity:1;z-index:2;-webkit-transition:opacity .3s;transition:opacity .3s}.pull-to-do.sc-nb-pull-to-do   .hide.sc-nb-pull-to-do{opacity:0;z-index:-1}.pull-to-do.sc-nb-pull-to-do   .bottom.sc-nb-pull-to-do{top:auto;bottom:0}.loading.sc-nb-pull-to-do, .onmore.sc-nb-pull-to-do, .onrefresh.sc-nb-pull-to-do{text-align:center;color:#ccc;background:#f5f5f5;height:.8rem;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}"}}export{i as NbPullToDo};