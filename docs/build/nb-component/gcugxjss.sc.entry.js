const e=window.NbComponent.h;class t{constructor(){this.checked=!1,this.disabled=!1,this.color="#4C98FC",this.onChange=(()=>{this.disabled||(this.checked=!this.checked,this.change.emit({checked:this.checked}))})}render(){return e("div",{onClick:this.onChange,class:`switch ${this.checked?"checked":""} ${this.disabled?"disabled":""}`,style:{backgroundColor:this.checked?this.color:"#C7C7C7"}},e("div",{class:"roundball"}))}static get is(){return"nb-switch"}static get encapsulation(){return"shadow"}static get properties(){return{checked:{type:Boolean,attr:"checked",mutable:!0},color:{type:String,attr:"color"},disabled:{type:Boolean,attr:"disabled"}}}static get events(){return[{name:"change",method:"change",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".switch.sc-nb-switch{width:1.066666666666667rem;height:.64rem;border-radius:.32rem;position:relative;display:inline-block;vertical-align:middle}.switch.disabled.sc-nb-switch{opacity:.8}.switch.sc-nb-switch   .roundball.sc-nb-switch{height:.5333333333333333rem;width:.5333333333333333rem;background:#fff;border:1px solid #f5f5f5;border-radius:50%;position:absolute;left:.02666666666666667rem;top:.02666666666666667rem;-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.switch.checked.sc-nb-switch   .roundball.sc-nb-switch{-webkit-transform:translateX(.4266666666666667rem);transform:translateX(.4266666666666667rem)}"}}export{t as NbSwitch};