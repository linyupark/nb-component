!function(e,t,n,r,o,i,s,c,a,l,u,p,d,b){for(u=e.NbComponent=e.NbComponent||{},(p=t.createElement("style")).innerHTML=a+"{visibility:hidden}.hydrated{visibility:inherit}",p.setAttribute("data-styles",""),d=t.head.querySelector("meta[charset]"),t.head.insertBefore(p,d?d.nextSibling:t.head.firstChild),function(e,t,n){(e["s-apps"]=e["s-apps"]||[]).push("NbComponent"),n.componentOnReady||(n.componentOnReady=function(){var t=this;function n(n){if(t.nodeName.indexOf("-")>0){for(var r=e["s-apps"],o=0,i=0;i<r.length;i++)if(e[r[i]].componentOnReady){if(e[r[i]].componentOnReady(t,n))return;o++}if(o<r.length)return void(e["s-cr"]=e["s-cr"]||[]).push([t,n])}n(null)}return e.Promise?new e.Promise(n):{then:n}})}(e,0,l),o=o||u.resourcesUrl,p=(d=t.querySelectorAll("script")).length-1;p>=0&&!(b=d[p]).src&&!b.hasAttribute("data-resources-url");p--);d=b.getAttribute("data-resources-url"),!o&&d&&(o=d),!o&&b.src&&(o=(d=b.src.split("/").slice(0,-1)).join("/")+(d.length?"/":"")+"nb-component/"),p=t.createElement("script"),function(e,t,n,r){return!(t.search.indexOf("core=esm")>0)&&(!(!(t.search.indexOf("core=es5")>0||"file:"===t.protocol)&&e.customElements&&e.customElements.define&&e.fetch&&e.CSS&&e.CSS.supports&&e.CSS.supports("color","var(--c)")&&"noModule"in n)||function(e){try{return new Function('import("")'),!1}catch(e){}return!0}())}(e,e.location,p)?p.src=o+"nb-component.k2vm8ell.js":(p.src=o+"nb-component.qsg2tgok.js",p.setAttribute("type","module"),p.setAttribute("crossorigin",!0)),p.setAttribute("data-resources-url",o),p.setAttribute("data-namespace","nb-component"),t.head.appendChild(p)}(window,document,0,0,0,0,0,0,"nb-actionsheet,nb-affix,nb-badge,nb-canvas-radar,nb-code-highlight,nb-list,nb-list-item,nb-marquee,nb-pagination,nb-playground,nb-pull-to-do,nb-roll-picker,nb-svg-icon,nb-switch",HTMLElement.prototype);