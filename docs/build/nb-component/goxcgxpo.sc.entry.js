const t=window.NbComponent.h;class e{constructor(){this.visible=!1,this.position="center",this.duration=2e3,this.maxLength=480,this.theme="default",this.transition="",this.scrollTop=0,this.originStyles=""}async show(t=""){return""!==t&&(this.el.innerHTML=t),this.visible=!0,this.onShowToast(),this.close.bind(this)}onVisibleChange(t,e){t&&!1===e&&this.onShowToast(),t?(this.originStyles=document.body.getAttribute("style")||"",this.scrollTop=this.getScrollTop(),document.body.style.position="fixed",document.body.style.width="100%",document.body.style.top=-this.scrollTop+"px",document.body.style.bottom="0px"):(document.body.setAttribute("style",this.originStyles),document.body.scrollTop=document.documentElement.scrollTop=this.scrollTop||0)}close(){this.transition="leave",this.visible=!1}getScrollTop(){return document.body.scrollTop||document.documentElement.scrollTop}onShowToast(){this.timer&&clearTimeout(this.timer),this.transition="enter",0!==this.duration&&(this.timer=setTimeout(()=>{this.close()},this.duration))}get styleName(){return`${this.theme} ${this.position} ${this.transition}`}get maxWidth(){return`${this.maxLength/75}rem`}render(){return[t("div",{class:`toast ${this.styleName}`},t("div",{class:"wrapper"},t("div",{class:"message",style:{maxWidth:this.maxWidth}},t("slot",null))))]}static get is(){return"nb-toast"}static get encapsulation(){return"shadow"}static get properties(){return{duration:{type:Number,attr:"duration"},el:{elementRef:!0},maxLength:{type:Number,attr:"max-length"},position:{type:String,attr:"position"},show:{method:!0},theme:{type:String,attr:"theme"},transition:{state:!0},visible:{type:Boolean,attr:"visible",reflectToAttr:!0,mutable:!0,watchCallbacks:["onVisibleChange"]}}}static get style(){return".toast.sc-nb-toast{position:absolute;top:0;left:0;height:100vh;width:100vw;z-index:-1}.toast.sc-nb-toast   .wrapper.sc-nb-toast{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.toast.sc-nb-toast   .message.sc-nb-toast{min-width:2.666666666666667rem;background:rgba(0,0,0,.75);-webkit-box-shadow:0 0 .10666666666666667rem 0 rgba(0,0,0,.1);box-shadow:0 0 .10666666666666667rem 0 rgba(0,0,0,.1);color:hsla(0,0%,100%,.75);font-size:.4rem;border-radius:.10666666666666667rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:.26666666666666666rem .4rem;line-height:.64rem;word-break:break-all;opacity:0;-webkit-transition:all .5s;transition:all .5s}.toast.center.sc-nb-toast   .message.sc-nb-toast{text-align:center;position:fixed;top:49%;-webkit-transform:translateY(-50%);transform:translateY(-50%);margin:0 auto}.toast.enter.sc-nb-toast{z-index:999}.toast.enter.sc-nb-toast   .message.sc-nb-toast{top:50%;opacity:1}.toast.leave.sc-nb-toast{z-index:-1}.toast.leave.sc-nb-toast   .message.sc-nb-toast{top:49%;opacity:0}"}}export{e as NbToast};