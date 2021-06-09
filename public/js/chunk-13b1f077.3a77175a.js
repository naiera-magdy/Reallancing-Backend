(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13b1f077"],{"401e":function(t,a,s){"use strict";s.r(a);var o=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[0==t.loading?s("Loading"):t._e(),1==t.loading?s("v-container",[s("v-row",{staticClass:"ma-2 pt-3 display-1"},[s("h1",{staticClass:"display-3 font-weight-medium"},[t._v("My Proposals")])]),s("v-row",[t.proposals.length?s("v-col",{attrs:{cols:"12",md:"12",sm:"12"}},t._l(t.proposals,(function(t){return s("proposal-card",{key:t._id,attrs:{proposal:t}})})),1):t._e()],1),t.proposals.length?t._e():s("div",{staticClass:"text-center"},[s("h1",{staticClass:"display-4 font-weight-medium my-10"},[t._v("No Proposals Found")])])],1):t._e()],1)},r=[],e=s("3a5e"),l=s("cecc"),i=s("365c"),c={data:function(){return{proposals:[],loading:!1}},components:{ProposalCard:l["a"],Loading:e["a"]},mounted:function(){this.loading=!1,this.fetchCurrentFreelancerProposals()},methods:{fetchCurrentFreelancerProposals:function(){var t=this;i["a"].fetchCurrentFreelancerProposals(this.$route.params.id).then((function(a){t.loading=!0,t.proposals=a.data}))}}},n=c,p=s("2877"),d=s("6544"),v=s.n(d),u=s("62ad"),m=s("a523"),h=s("0fd9"),C=Object(p["a"])(n,o,r,!1,null,null,null);a["default"]=C.exports;v()(C,{VCol:u["a"],VContainer:m["a"],VRow:h["a"]})},cecc:function(t,a,s){"use strict";var o=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("v-card",{attrs:{color:"secondbackground",to:"/proposals/"+t.proposal._id}},[s("v-row",[s("v-container",{attrs:{fluid:"","fill-height":""}},[s("v-col",{attrs:{cols:"12",md:"8",sm:"12"}},[s("v-row",[s("v-col",{attrs:{cols:"3",md:"2",sm:"2"}},[s("v-avatar",{attrs:{color:"primary",size:"62",alignjustify:"center",align:"center"}},[s("v-img",{attrs:{src:"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}})],1)],1),s("v-col",{attrs:{cols:"9",md:"10",sm:"10"}},[s("div",{staticClass:"my-2 mx-1"},[s("v-row",[s("p",{staticClass:"headline"},[t._v(" "+t._s(t.proposal.user.firstName)+" "+t._s(t.proposal.user.lastName)+" ")])]),s("v-row",{staticClass:"my-0"},[s("v-rating",{attrs:{hover:"",length:"5",size:"22",readonly:"",value:t.proposal.user.rating}})],1),s("v-row",{staticClass:"px-1 my-1"})],1)])],1)],1),s("v-spacer")],1)],1),s("v-divider"),s("v-row",{staticClass:"ma-0"},[s("v-col",{staticClass:"pa-0",attrs:{cols:"12",md:"3",sm:"5"}},[s("div",{staticClass:"pa-3"},[s("strong",{staticClass:"subtitle-1"},[t._v("Applicant")]),s("br"),s("span",{staticClass:"body-1 font-weight-light"},[t._v(" "+t._s(t.proposal.user.firstName)+" has applied to or been invited to your or your company's job "+t._s(t.proposal.job.headline)+" ")])]),s("v-divider"),s("div",{staticClass:"pa-3"},[s("h3",{staticClass:"display-2 font-weight-medium"},[t._v("How they match")]),s("div",{staticClass:"pt-1"},[s("v-icon",{staticClass:"mr-2",attrs:{color:"primary"}},[t._v("mdi-check-circle")]),s("span",{staticClass:"body-1 font-weight-light"},[t._v("Worked on jobs like yours")])],1)])],1),s("v-divider",{attrs:{vertical:""}}),s("v-col",{staticClass:"px-0",attrs:{cols:"12",md:"9",sm:"7"}},[s("div",{staticClass:"px-5"},[s("v-row",{staticClass:"pt-3 px-3"},["Pending"===t.proposal.status&&"freelancer"===t.type?s("v-row",[s("v-col",[s("p",{staticClass:"headline pt-1"},[t._v("Proposal Details")])]),s("v-col",[s("p",{staticClass:"subtitle-2 pt-1"},[t._v("Pending")])]),s("v-col",[s("v-icon",{attrs:{color:"orange"}},[t._v("mdi-circle")])],1)],1):t._e(),"Accepted"===t.proposal.status&&"freelancer"===t.type?s("v-row",[s("v-col",[s("p",{staticClass:"headline pt-1"},[t._v("Proposal Details")])]),s("v-col",[s("p",{staticClass:"subtitle-2 pt-1"},[t._v("Accepted")])]),s("v-col",[s("v-icon",{attrs:{color:"green"}},[t._v("mdi-circle")])],1)],1):t._e(),s("v-spacer"),s("p",{staticClass:"display-2 font-weight-medium pr-4"},[t._v("$"+t._s(t.proposal.proposedHourlyRate)+"/hr")])],1),s("p",{staticClass:"mt-n5 pr-4",attrs:{align:"end"}},[t._v("Proposed Hourly Rate")])],1),s("v-divider",{staticClass:"mx-0"}),s("div",{staticClass:"pa-3"},[s("h2",{staticClass:"display-2 font-weight-bold pa-3"},[t._v("Cover letter")]),s("p",{staticClass:"body-1 px-8 text-justify"},[t._v(" "+t._s(t._f("shorten")(t.proposal.coverLetter))+" ")])])],1)],1)],1)},r=[],e={data:function(){return{type:""}},props:{proposal:{}},mounted:function(){this.type=JSON.parse(localStorage.getItem("userData")).type}},l=e,i=s("2877"),c=s("6544"),n=s.n(c),p=s("8212"),d=s("b0af"),v=s("62ad"),u=s("a523"),m=s("ce7e"),h=s("132d"),C=s("adda"),_=s("1d4d"),f=s("0fd9"),g=s("2fa4"),y=Object(i["a"])(l,o,r,!1,null,null,null);a["a"]=y.exports;n()(y,{VAvatar:p["a"],VCard:d["a"],VCol:v["a"],VContainer:u["a"],VDivider:m["a"],VIcon:h["a"],VImg:C["a"],VRating:_["a"],VRow:f["a"],VSpacer:g["a"]})}}]);
//# sourceMappingURL=chunk-13b1f077.3a77175a.js.map