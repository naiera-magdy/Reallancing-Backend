(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ac1e99fa"],{"1f09":function(t,e,a){},2909:function(t,e,a){"use strict";a.d(e,"a",(function(){return l}));var r=a("6b75");function n(t){if(Array.isArray(t))return Object(r["a"])(t)}a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0"),a("a630");function s(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}var i=a("06c5");function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(t){return n(t)||s(t)||Object(i["a"])(t)||o()}},"3a5e":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",["content"===t.type?a("v-row",{staticClass:"pa-10",attrs:{dense:"",justify:"center"}},[a("v-col",{attrs:{cols:"10"}},[a("v-skeleton-loader",{attrs:{type:"card-avatar,image"}})],1)],1):"list"===t.type?a("v-row",{staticClass:"pa-10",attrs:{dense:"",justify:"center"}},[a("v-col",{attrs:{cols:"10"}},[a("v-skeleton-loader",{attrs:{type:"list-item-avatar-two-line,list-item-avatar-two-line"}})],1)],1):a("v-container",{staticClass:"cover"},[a("v-progress-circular",{attrs:{size:300,color:"blue darken-3",indeterminate:""}})],1)],1)},n=[],s={props:{type:String}},i=s,o=(a("61b0"),a("2877")),l=a("6544"),c=a.n(l),d=a("62ad"),h=a("a523"),u=a("490a"),p=a("0fd9"),b=a("3835"),f=a("5530"),m=(a("ac1f"),a("1276"),a("d81d"),a("a630"),a("3ca3"),a("5319"),a("1f09"),a("c995")),g=a("24b2"),v=a("7560"),y=a("58df"),C=a("80d2"),x=Object(y["a"])(m["a"],g["a"],v["a"]).extend({name:"VSkeletonLoader",props:{boilerplate:Boolean,loading:Boolean,tile:Boolean,transition:String,type:String,types:{type:Object,default:function(){return{}}}},computed:{attrs:function(){return this.isLoading?this.boilerplate?{}:Object(f["a"])({"aria-busy":!0,"aria-live":"polite",role:"alert"},this.$attrs):this.$attrs},classes:function(){return Object(f["a"])(Object(f["a"])({"v-skeleton-loader--boilerplate":this.boilerplate,"v-skeleton-loader--is-loading":this.isLoading,"v-skeleton-loader--tile":this.tile},this.themeClasses),this.elevationClasses)},isLoading:function(){return!("default"in this.$scopedSlots)||this.loading},rootTypes:function(){return Object(f["a"])({actions:"button@2",article:"heading, paragraph",avatar:"avatar",button:"button",card:"image, card-heading","card-avatar":"image, list-item-avatar","card-heading":"heading",chip:"chip","date-picker":"list-item, card-heading, divider, date-picker-options, date-picker-days, actions","date-picker-options":"text, avatar@2","date-picker-days":"avatar@28",heading:"heading",image:"image","list-item":"text","list-item-avatar":"avatar, text","list-item-two-line":"sentences","list-item-avatar-two-line":"avatar, sentences","list-item-three-line":"paragraph","list-item-avatar-three-line":"avatar, paragraph",paragraph:"text@3",sentences:"text@2",table:"table-heading, table-thead, table-tbody, table-tfoot","table-heading":"heading, text","table-thead":"heading@6","table-tbody":"table-row-divider@6","table-row-divider":"table-row, divider","table-row":"table-cell@6","table-cell":"text","table-tfoot":"text@2, avatar@2",text:"text"},this.types)}},methods:{genBone:function(t,e){return this.$createElement("div",{staticClass:"v-skeleton-loader__".concat(t," v-skeleton-loader__bone")},e)},genBones:function(t){var e=this,a=t.split("@"),r=Object(b["a"])(a,2),n=r[0],s=r[1],i=function(){return e.genStructure(n)};return Array.from({length:s}).map(i)},genStructure:function(t){var e=[];t=t||this.type||"";var a=this.rootTypes[t]||"";if(t===a);else{if(t.indexOf(",")>-1)return this.mapBones(t);if(t.indexOf("@")>-1)return this.genBones(t);a.indexOf(",")>-1?e=this.mapBones(a):a.indexOf("@")>-1?e=this.genBones(a):a&&e.push(this.genStructure(a))}return[this.genBone(t,e)]},genSkeleton:function(){var t=[];return this.isLoading?t.push(this.genStructure()):t.push(Object(C["s"])(this)),this.transition?this.$createElement("transition",{props:{name:this.transition},on:{afterEnter:this.resetStyles,beforeEnter:this.onBeforeEnter,beforeLeave:this.onBeforeLeave,leaveCancelled:this.resetStyles}},t):t},mapBones:function(t){return t.replace(/\s/g,"").split(",").map(this.genStructure)},onBeforeEnter:function(t){this.resetStyles(t),this.isLoading&&(t._initialStyle={display:t.style.display,transition:t.style.transition},t.style.setProperty("transition","none","important"))},onBeforeLeave:function(t){t.style.setProperty("display","none","important")},resetStyles:function(t){t._initialStyle&&(t.style.display=t._initialStyle.display||"",t.style.transition=t._initialStyle.transition,delete t._initialStyle)}},render:function(t){return t("div",{staticClass:"v-skeleton-loader",attrs:this.attrs,on:this.$listeners,class:this.classes,style:this.isLoading?this.measurableStyles:void 0},[this.genSkeleton()])}}),w=Object(o["a"])(i,r,n,!1,null,"bfbf3166",null);e["a"]=w.exports;c()(w,{VCol:d["a"],VContainer:h["a"],VProgressCircular:u["a"],VRow:p["a"],VSkeletonLoader:x})},"5c3a":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{id:"dashboard",fluid:"",tag:"section"}},[t.loading?a("Loading"):a("v-row",[a("v-col",{attrs:{cols:"12",lg:"4"}},[a("base-material-chart-card",{attrs:{data:t.ProposalChart.data,options:t.ProposalChart.options,"responsive-options":t.ProposalChart.responsiveOptions,color:"info","hover-reveal":"",type:"Bar"}},[a("h4",{staticClass:"card-title font-weight-light mt-2 ml-2"},[t._v(" Proposals ")]),a("p",{staticClass:"d-inline-flex font-weight-light ml-2 mt-1"},[t._v(" Proposals in Months ")])])],1),a("v-col",{attrs:{cols:"12",lg:"4"}},[a("base-material-chart-card",{attrs:{data:t.UserChart.data,options:t.UserChart.options,"responsive-options":t.UserChart.responsiveOptions,color:"primary","hover-reveal":"",type:"Bar"}},[a("h4",{staticClass:"card-title font-weight-light mt-2 ml-2"},[t._v(" Users ")]),a("p",{staticClass:"d-inline-flex font-weight-light ml-2 mt-1"},[t._v(" User Registration in Months ")])])],1),a("v-col",{attrs:{cols:"12",lg:"4"}},[a("base-material-chart-card",{attrs:{data:t.JobChart.data,options:t.JobChart.options,"responsive-options":t.JobChart.responsiveOptions,color:"pink","hover-reveal":"",type:"Bar"}},[a("h4",{staticClass:"card-title font-weight-light mt-2 ml-2"},[t._v(" Jobs ")]),a("p",{staticClass:"d-inline-flex font-weight-light ml-2 mt-1"},[t._v(" Jobs Creation in Months ")])])],1),a("v-col",{attrs:{cols:"12",sm:"6",lg:"4"}},[a("base-material-stats-card",{attrs:{color:"info",icon:"mdi-account-cash",title:"Clients",value:t.numberOfClients,"sub-icon":"mdi-information-outline","sub-text":"Total Number of Clients"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",lg:"4"}},[a("base-material-stats-card",{attrs:{color:"primary",icon:"mdi-account-clock",title:"Freelancers",value:t.numberOfFreelancers,"sub-icon":"mdi-information-outline","sub-text":"Total Number of Freelancers"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",lg:"4"}},[a("base-material-stats-card",{attrs:{color:"pink",icon:"mdi-hammer-wrench",title:"Jobs",value:t.numberOfJobs,"sub-icon":"mdi-information-outline","sub-text":"Total Number of Jobs"}})],1)],1)],1)},n=[],s=a("2909"),i=a("1da1"),o=(a("96cf"),a("159b"),a("d81d"),a("8df3")),l=a("a46f"),c=a("3a5e"),d=a("365c"),h={name:"DashboardDashboard",components:{baseMaterialStatsCard:l["default"],baseMaterialChartCard:o["default"],Loading:c["a"]},data:function(){return{ProposalChart:{data:{labels:["Ja","Fe","Ma","Ap","Mai","Ju","Jul","Au","Se","Oc","No","De"],series:[[542,443,320,780,553,453,326,434,568,610,756,895]]},options:{axisX:{showGrid:!1},low:0,high:1e3,chartPadding:{top:0,right:5,bottom:0,left:0}},responsiveOptions:[["screen and (max-width: 640px)",{seriesBarDistance:5,axisX:{labelInterpolationFnc:function(t){return t[0]}}}]]},UserChart:{data:{labels:["Ja","Fe","Ma","Ap","Mai","Ju","Jul","Au","Se","Oc","No","De"],series:[[542,443,320,780,553,453,326,434,568,610,756,895]]},options:{axisX:{showGrid:!1},low:0,high:100,chartPadding:{top:0,right:5,bottom:0,left:0}},responsiveOptions:[["screen and (max-width: 640px)",{seriesBarDistance:5,axisX:{labelInterpolationFnc:function(t){return t[0]}}}]]},JobChart:{data:{labels:["Ja","Fe","Ma","Ap","Mai","Ju","Jul","Au","Se","Oc","No","De"],series:[[542,443,320,780,553,453,326,434,568,610,756,895]]},options:{axisX:{showGrid:!1},low:0,high:100,chartPadding:{top:0,right:5,bottom:0,left:0}},responsiveOptions:[["screen and (max-width: 640px)",{seriesBarDistance:5,axisX:{labelInterpolationFnc:function(t){return t[0]}}}]]},numberOfFreelancers:"0",numberOfClients:"0",numberOfJobs:"0",loading:!0}},methods:{complete:function(t){this.list[t]=!this.list[t]}},mounted:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,r,n,i,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d["a"].getUsersStats();case 2:return a=e.sent,e.next=5,d["a"].getJobsStats();case 5:return r=e.sent,e.next=8,d["a"].getProposalsMonthly();case 8:return n=e.sent,e.next=11,d["a"].getJobsMonthly();case 11:return i=e.sent,e.next=14,d["a"].getUsersMonthly();case 14:o=e.sent,a.data.stats.forEach((function(e){"client"===e._id?t.numberOfClients=String(e.numUsers):"freelancer"===e._id&&(t.numberOfFreelancers=String(e.numUsers))})),t.numberOfJobs=String(r.data.stats[0].numJobs),t.ProposalChart.data.series[0]=n.data.plan.map((function(t){return t.total})),t.ProposalChart.options.high=Math.max.apply(Math,Object(s["a"])(t.ProposalChart.data.series[0]))+5,t.UserChart.data.series[0]=i.data.plan.map((function(t){return t.total})),t.UserChart.options.high=Math.max.apply(Math,Object(s["a"])(t.UserChart.data.series[0]))+5,t.JobChart.data.series[0]=o.data.plan.map((function(t){return t.total})),t.JobChart.options.high=Math.max.apply(Math,Object(s["a"])(t.JobChart.data.series[0]))+5,t.loading=!1;case 24:case"end":return e.stop()}}),e)})))()}},u=h,p=a("2877"),b=a("6544"),f=a.n(b),m=a("62ad"),g=a("a523"),v=a("0fd9"),y=Object(p["a"])(u,r,n,!1,null,null,null);e["default"]=y.exports;f()(y,{VCol:m["a"],VContainer:g["a"],VRow:v["a"]})},"61b0":function(t,e,a){"use strict";a("c2a3")},c2a3:function(t,e,a){}}]);
//# sourceMappingURL=chunk-ac1e99fa.4f260131.js.map