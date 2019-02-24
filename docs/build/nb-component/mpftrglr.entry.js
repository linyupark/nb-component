const t=window.NbComponent.h;let e=0;class s{constructor(){this.enable=!0,this.dampHeight=30,this.positionSave=!0,this.dampingLen=0,this.loading=!1}done(){this.$content.style.transform="translateY(0px)",this.dampingLen=0,this.loading=!1}get pullLength(){return this.movePageY-this.startPageY}getScrollTop(){return this.$wrapper.scrollTop}getWrapperScrollTop(){return this.$wrapper.scrollHeight-this.$wrapper.clientHeight}recordStartDampLen(){this.startDampLen||(0===this.getScrollTop()&&this.pullLength>0||this.getScrollTop()===this.getWrapperScrollTop()&&this.pullLength<0)&&(this.startDampLen=this.pullLength)}handleTouchStart(t){this.startPageY=t.touches[0].pageY}handleTouchMove(t){this.movePageY=t.touches[0].pageY,this.enable&&(this.loading||(this.recordStartDampLen(),this.startDampLen>0&&"refresh"!==this.disable&&(this.pullLength>this.startDampLen?(this.dampingLen=this.pullLength-this.startDampLen,this.dampingLen>this.dampHeight&&(this.dampingLen=this.dampHeight)):this.pullLength+3<this.startDampLen&&(this.dampingLen=0)),this.startDampLen<0&&"more"!==this.disable&&(this.pullLength<this.startDampLen?(this.dampingLen=this.pullLength+this.startDampLen,this.dampingLen<-this.dampHeight&&(this.dampingLen=-this.dampHeight)):this.pullLength-3>this.startDampLen&&(this.dampingLen=0)),0!==this.startDampLen&&(this.$content.style.webkitTransition="transform 0.3s",this.$content.style.webkitTransform=`translateY(${this.dampingLen}px)`)))}handleTouchEnd(){this.startDampLen=null,Math.abs(this.dampingLen)>3&&(this.loading=!0),this.dampingLen>3&&this.refresh.emit(),this.dampingLen<-3&&this.more.emit(),this.positionSave&&(e=this.getScrollTop())}bindTouchScroll(t=!0){if(t)try{this.$wrapper=document.querySelector(this.wrapperSelector),this.$content=document.querySelector(this.contentSelector),this.$wrapper.addEventListener("touchstart",this.handleTouchStart.bind(this),!1),this.$wrapper.addEventListener("touchmove",this.handleTouchMove.bind(this),!1),this.$wrapper.addEventListener("touchend",this.handleTouchEnd.bind(this),!1)}catch(t){throw console.log(t),new TypeError('"wrapperSelector" or "contentSelector" props maybe not a valid scroll dom selector.')}}componentDidLoad(){this.bindTouchScroll(),this.positionSave&&this.$wrapper.scrollTo(0,e)}render(){return t("div",{class:"pull-to-do"},t("div",{class:`${this.dampingLen>.8*this.dampHeight&&this.enable?"show":"hide"}`},t("div",{class:this.loading?"show":"hide"},t("slot",{name:"refresh-loading"})),t("div",{class:this.loading?"hide":"show"},t("slot",{name:"refresh"}))),t("slot",{name:"main"}),t("div",{class:`bottom ${this.dampingLen<.8*-this.dampHeight&&this.enable?"show":"hide"}`},t("div",{class:this.loading?"show":"hide"},t("slot",{name:"more-loading"})),t("div",{class:this.loading?"hide":"show"},t("slot",{name:"more"}))))}static get is(){return"nb-pull-to-do"}static get encapsulation(){return"shadow"}static get properties(){return{contentSelector:{type:String,attr:"content-selector"},dampHeight:{type:Number,attr:"damp-height"},dampingLen:{state:!0},disable:{type:String,attr:"disable"},done:{method:!0},el:{elementRef:!0},enable:{type:Boolean,attr:"enable"},loading:{state:!0},positionSave:{type:Boolean,attr:"position-save"},wrapperSelector:{type:String,attr:"wrapper-selector"}}}static get events(){return[{name:"refresh",method:"refresh",bubbles:!0,cancelable:!0,composed:!0},{name:"more",method:"more",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".pull-to-do{position:relative}.pull-to-do .hide,.pull-to-do .show{position:absolute;width:100%;top:0;opacity:1;z-index:2;-webkit-transition:opacity .3s;transition:opacity .3s}.pull-to-do .hide{opacity:0;z-index:-1}.pull-to-do .bottom{top:auto;bottom:0}"}}export{s as NbPullToDo};