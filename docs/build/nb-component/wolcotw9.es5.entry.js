NbComponent.loadBundle("wolcotw9",["exports"],function(t){var e=window.NbComponent.h,i=0,n=function(){function t(){this.refreshHTML='<div class="onrefresh">刷新内容</div>',this.moreHTML='<div class="onmore">加载更多</div>',this.loadingHTML='<div class="loading">loading</div>',this.dampHeight=30,this.positionSave=!0,this.dampingLen=0,this.loading=!1}return t.prototype.done=function(){this.$content.style.transform="translateY(0px)",this.dampingLen=0,this.loading=!1},Object.defineProperty(t.prototype,"pullLength",{get:function(){return this.movePageY-this.startPageY},enumerable:!0,configurable:!0}),t.prototype.getScrollTop=function(){return this.$wrapper.scrollTop},t.prototype.getWrapperScrollTop=function(){return this.$wrapper.scrollHeight-this.$wrapper.clientHeight},t.prototype.recordStartDampLen=function(){this.startDampLen||(0===this.getScrollTop()&&this.pullLength>0||this.getScrollTop()===this.getWrapperScrollTop()&&this.pullLength<0)&&(this.startDampLen=this.pullLength)},t.prototype.handleTouchStart=function(t){this.startPageY=t.touches[0].pageY},t.prototype.handleTouchMove=function(t){this.movePageY=t.touches[0].pageY,this.loading||(this.recordStartDampLen(),this.startDampLen>0&&"refresh"!==this.disable&&(this.pullLength>this.startDampLen?(this.dampingLen=this.pullLength-this.startDampLen,this.dampingLen>this.dampHeight&&(this.dampingLen=this.dampHeight)):this.pullLength+3<this.startDampLen&&(this.dampingLen=0)),this.startDampLen<0&&"more"!==this.disable&&(this.pullLength<this.startDampLen?(this.dampingLen=this.pullLength+this.startDampLen,this.dampingLen<-this.dampHeight&&(this.dampingLen=-this.dampHeight)):this.pullLength-3>this.startDampLen&&(this.dampingLen=0)),0!==this.startDampLen&&(this.$content.style.webkitTransition="transform 0.3s",this.$content.style.webkitTransform="translateY("+this.dampingLen+"px)"))},t.prototype.handleTouchEnd=function(){this.startDampLen=null,Math.abs(this.dampingLen)>3&&(this.loading=!0),this.dampingLen>3&&this.refresh.emit(),this.dampingLen<-3&&this.more.emit(),this.positionSave&&(i=this.getScrollTop())},t.prototype.bindTouchScroll=function(t){if(void 0===t&&(t=!0),t)try{this.$wrapper=this.el.querySelector(this.wrapperSelector),this.$content=this.el.querySelector(this.contentSelector),this.$wrapper.addEventListener("touchstart",this.handleTouchStart.bind(this),!1),this.$wrapper.addEventListener("touchmove",this.handleTouchMove.bind(this),!1),this.$wrapper.addEventListener("touchend",this.handleTouchEnd.bind(this),!1)}catch(t){throw new TypeError('"wrapperSelector" or "contentSelector" props maybe not a valid scroll dom selector.')}},t.prototype.componentDidLoad=function(){this.bindTouchScroll(),this.positionSave&&this.$wrapper.scrollTo(0,i)},t.prototype.render=function(){return e("div",{class:"pull-to-do"},e("div",{class:this.dampingLen>.8*this.dampHeight?"show":"hide"},e("div",{innerHTML:this.loading?this.loadingHTML:this.refreshHTML})),e("slot",null),e("div",{class:"bottom "+(this.dampingLen<.8*-this.dampHeight?"show":"hide")},e("div",{innerHTML:this.loading?this.loadingHTML:this.moreHTML})))},Object.defineProperty(t,"is",{get:function(){return"nb-pull-to-do"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{contentSelector:{type:String,attr:"content-selector"},dampHeight:{type:Number,attr:"damp-height"},dampingLen:{state:!0},disable:{type:String,attr:"disable"},done:{method:!0},el:{elementRef:!0},loading:{state:!0},loadingHTML:{type:String,attr:"loading-h-t-m-l"},moreHTML:{type:String,attr:"more-h-t-m-l"},positionSave:{type:Boolean,attr:"position-save"},refreshHTML:{type:String,attr:"refresh-h-t-m-l"},wrapperSelector:{type:String,attr:"wrapper-selector"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"refresh",method:"refresh",bubbles:!0,cancelable:!0,composed:!0},{name:"more",method:"more",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".pull-to-do{position:relative}.pull-to-do .hide,.pull-to-do .show{position:absolute;width:100%;top:0;opacity:1;z-index:2;-webkit-transition:opacity .3s;transition:opacity .3s}.pull-to-do .hide{opacity:0;z-index:-1}.pull-to-do .bottom{top:auto;bottom:0}.loading,.onmore,.onrefresh{text-align:center;color:#ccc;background:#f5f5f5;height:.8rem;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}"},enumerable:!0,configurable:!0}),t}();t.NbPullToDo=n,Object.defineProperty(t,"__esModule",{value:!0})});