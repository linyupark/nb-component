var __awaiter=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function l(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,l)}c((r=r.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}};NbComponent.loadBundle("8dgj69pb",["exports"],function(e){var t=window.NbComponent.h,n=function(){function e(){this.zIndex=2}return e.prototype.getStartFixedScrollTop=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,this.startFixedScrollTop]})})},e.prototype.onCurrentPageChange=function(e){e&&(this.startFixedScrollTop=this.target.scrollTop),this.change.emit({isFixed:e})},e.prototype.handleFix=function(){var e=this.el.getBoundingClientRect().top,t=this.target.getBoundingClientRect().top;this.offset>=0&&(this.fixed=this.fixed?this.target.scrollTop>this.startFixedScrollTop:e-t<=this.offset)},Object.defineProperty(e.prototype,"fixedTop",{get:function(){return this.target?this.target.getBoundingClientRect().top+this.offset:this.el.getBoundingClientRect().top},enumerable:!0,configurable:!0}),e.prototype.componentDidLoad=function(){var e=this;try{setTimeout(function(){e.target=e.relativeSelector?document.querySelector(e.relativeSelector):document.body,e.target.addEventListener("scroll",e.handleFix.bind(e),!1)},10)}catch(e){throw new TypeError(e)}},e.prototype.componentDidUnload=function(){this.target&&this.target.removeEventListener("scroll",this.handleFix.bind(this),!1)},e.prototype.render=function(){return t("div",{style:{position:this.fixed?"fixed":"relative",top:this.fixed?this.fixedTop+"px":"auto",zIndex:String(this.zIndex)}},t("slot",null))},Object.defineProperty(e,"is",{get:function(){return"nb-affix"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{el:{elementRef:!0},fixed:{state:!0,watchCallbacks:["onCurrentPageChange"]},getStartFixedScrollTop:{method:!0},offset:{type:Number,attr:"offset"},relativeSelector:{type:String,attr:"relative-selector"},zIndex:{type:Number,attr:"z-index"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"change",method:"change",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),e}();e.NbAffix=n,Object.defineProperty(e,"__esModule",{value:!0})});