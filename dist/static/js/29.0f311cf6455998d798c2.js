webpackJsonp([29],{376:function(e,t,a){var s=a(133)(a(681),a(797),null,null,null);e.exports=s.exports},382:function(e,t,a){"use strict";t.a={login:"/user/login",logout:"/user/logout",customer_info:"/customer/allinfo",customer_alarm:"/customer/balancealarm",update_pass:"/user/modifypwd",operate_list:"/operation/list",operate_addagent:"/operate/addagent",operate_getagent:"/operate/getagent",operate_upagent:"/operate/modifyagin",operate_pwdagent:"/operate/modifypwd",operate_expire_seat_list:"/operate/expireseat",operate_active_seat:"/seat/recharge",agent_list:"/operate/aginuserinfo",reset_operate_pass:"/operation/changePwd",create_operate:"/operation/add",get_operate_info:"/operation/modifyinfo",update_operate:"/operation/operationmodifyinfomessage",customer_list:"/agent/list",customer_list_all:"/customer/all",customer_list_by_operate:"/operate/list",customer_type_list:"/operate/usertype",customer_add:"/agent/add",customer_add_by_operate:"/operate/operateadduser",customer_modify:"/agent/modify",customer_detail:"/agent/agininfo",agent_my_info:"/agent/info",agent_modify_myinfo:"/agent/modifyself",customer_detail_by_operate:"/operate/agentinfo",customer_edit:"/agent/modifyinfo",customer_upself:"/customer/modify",customer_check:"/operate/examine",customer_renew_seat:"/customer/renewseatinfo",angent_list_all:"/operate/agent",add_seat:"/operate/seatmodify",recharge:"/operate/recharge",project_status:"/project/status",project_list:"/project/list",project_stop:"/project/pause",project_start:"/project/start",project_detail:"/project/detail",preject_audit:"/project/audit",project_recheck:"/project/againaudit",expense_project:"/operate/chargingproject",expense_project_user:"/operate/charginuser",expense_project_agent:"/operate/chargingagent",expense_seat:"/operate/chargingseat",expense_seat_count:"/operate/chargingseatcount",expense_seat_agent:"/operate/chargingagentseat",expense_balance_in:"/customer/recharge",expense_balance_out:"/customer/consume",customer_expense_project:"/customer/chargingproject",customer_seat:"/customer/chargingseat",customer_seat_count:"/customer/chargingseatcount",customer_my_seat_list:"/customer/seat",project_type_list:"/project/type",project_add:"/project/create",project_call_list:"/seat/outbound",project_call_nodial_list:"/seat/getClueDialNo",project_call_enddial_list:"/seat/getClueDialOk",project_call_modify:"/seat/modify",project_clue_info:"/seat/clueinfo",project_set_sms:"/project/start_gj_sms",project_get_nodial_clues:"/project/getNoDialClues",project_recovery_clues:"/project/recoverClues",seat_list:"/project/seatlist",seat_binding:"/project/binding",seat_status:"/seat/status",seat_tobind:"/project/bindingSeat",call_list:"/teltraffic/list",call_cate:"/teltraffic/category",call_head:"/teltraffic/heads",call_audio:"/teltraffic/proSeatList",call_phone_audio:"/teltraffic/proSeatPhoneList",call_audio_export:"/teltraffic/proSeatList_export",call_audio_phone_export:"/teltraffic/proSeatPhone_export",get_seat_sign:"/callCenter/getSignInData",save_call_uuid:"/callCenter/saveCallUuid",add_call_job:"/callCenter/addJob",doc_list:"/doc/list",doc_upload:"/doc/upload",doc_download:"/doc/download",get_myclient_balance:"/seat/balance",get_tel:"/seat/getseatphone",get_tel_prefix:"/callCenter/getPhonePrefix",filter_product_1:"/filtertag/products",filter_product_2:"/filtertag/product",filter_prefer_1:"/filtertag/preferences",filter_prefer_2:"/filtertag/preference",filter_area:"/filtertag/region",filter_customers:"/filtertag/selectnumber",filter_save:"/filtertag/save",get_login_status:"/user/status",change_price:"/operate/modifyprice",dial_pre:"/seat/changestatus",save_dial_history:"/callCenter/saveTelephoneRecord",no_sms_template_customer:"/sms/no_client_list",sms_record_list:"/sms/record_list",sms_record_export:"/sms/record_list_export",sms_template_list:"/sms/template_list",sms_template_add:"/sms/template_save",sms_template_detail:"/sms/template_find",sms_client_list:"/sms/client_select",sms_client_template_list:"/sms/template_select",sms_send:"/sms/record_save",seat_list_by_project:"/project/getSeatByProject",left_info_list:"/sms/capital_list",left_info_export:"/sms/capital_list_export",clue_attribution:"/clue/getAttribution",clue_get_result:"/clue/getDialResults",clue_get_sub_result:"/clue/getDialSubresults",clue_get_record:"/seat/getPhoneRecord",clue_get_next1:"/seat/getNextClueDialNo",clue_get_next2:"/seat/getNextClueDialOk"}},548:function(e,t,a){"use strict";a.d(t,"e",function(){return s}),a.d(t,"d",function(){return r}),a.d(t,"c",function(){return i}),a.d(t,"a",function(){return l}),a.d(t,"b",function(){return o});var s=function(e){var t=/^1(3[456789]{1}|47|5[012789]{1}|78|8[23478]{1})\d{8}$/,a=/^1(3[012]{1}|45|5[56]{1}|76|8[56]{1})\d{8}$/,s=/^1(33|53|77|8[019]{1})\d{8}$/,r=/^170\d{8}$/;return t.test(e)?1:a.test(e)?2:s.test(e)?3:!!r.test(e)&&4},r=function(e){return!!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[a-z0-9]*[a-z0-9]+\.){1,63}[a-z0-9]+$/.test(e)},i=function(e){try{return e.toString().replace(/\d+?(?=(?:\d{3})+$)/gim,"$&,")}catch(e){return NaN}},l=function(e){if(e instanceof Date){var t="",a="";return t=e.getMonth()<9?"0"+parseInt(e.getMonth()+1):parseInt(e.getMonth()+1),a=e.getDate()<=9?"0"+e.getDate():e.getDate(),e.getFullYear()+"-"+t+"-"+a}return""},o=function(e){switch(e){case-3:return"未通过";case-1:return"待审核";case 0:return"准备中";case 1:return"进行中";case 2:return"已暂停";case 3:return"已结束";default:return"暂无"}}},681:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(382),r=a(757),i=a.n(r);t.default={data:function(){return{detail:{id:"",company:"",created_at:"",balance:"",audit_status:"",balance_alarm:"",user:"",type:"",legal:"",scope:"",store_addr:"",licence:"",qualification:"",user_name:"",mail:"",tel:"",location:"",application_addr:""},userType:JSON.parse(localStorage.getItem("user")).type}},components:{editDialog:i.a},methods:{showEditDialog:function(){var e=this;this.$refs.editDialog.$emit("show",e.detail)}},created:function(){var e=this;this.$ajax({url:s.a.customer_info,success:function(t){200==t.code?e.detail=t.data:e.$toast(t.message)}})}}},683:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(548),r=a(382);t.default={data:function(){return{style:"none",id:"",username:"",email:"",tel:"",addr:"",selfaddr:"",username_error:"",email_error:"",tel_error:"",addr_error:"",self_addr_error:""}},methods:{close:function(){this.username_error="",this.email_error="",this.tel_error="",this.addr_error="",this.self_addr_error="",this.style="none",this.$store.commit("HIDE_LAYER")},sure:function(){var e=this,t=/^[\u4e00-\u9fa5]{2,6}$/;return this.username?t.test(this.username)?(this.username_error="",this.email?a.i(s.d)(this.email)?(this.email_error="",this.tel?a.i(s.e)(this.tel)?(this.tel_error="",this.addr?this.selfaddr?void this.$ajax({url:r.a.customer_upself,data:{id:this.id,user_name:this.username,mail:this.email,tel:this.tel,location:this.addr,application_addr:this.selfaddr},success:function(t){200==t.code?(e.close(),e.$toast("修改信息成功",function(){window.location.reload()})):e.self_addr_error=t.message}}):(this.self_addr_error="请填写所在位置",!1):(this.addr_error="请填写归属地",!1)):(this.tel_error="请填写真实的手机号",!1):(this.tel_error="请填写手机号",!1)):(this.email_error="邮箱格式不正确",!1):(this.email_error="请填写邮箱",!1)):(this.username_error="姓名由汉字组成2~6位",!1):(this.username_error="请填写姓名",!1)}},created:function(){this.$on("show",function(e){this.style="block",this.id=e.id,this.username=e.user_name,this.email=e.mail,this.tel=e.tel,this.addr=e.location,this.selfaddr=e.application_addr,this.$store.commit("SHOW_LAYER")})}}},757:function(e,t,a){var s=a(133)(a(683),a(783),null,null,null);e.exports=s.exports},783:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"dialog",style:{display:e.style,"margin-left":"-259px","margin-top":"-280px"}},[a("a",{staticClass:"icon dialog-close",attrs:{href:"javascript:void(0);",title:"关闭"},on:{click:e.close}}),e._v(" "),e._m(0),e._v(" "),a("div",{staticClass:"dialog-body"},[a("ul",{staticClass:"query-warp"},[a("li",[a("label",[e._v("姓名")]),e._v(" "),a("div",{staticClass:"input-warp"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],staticClass:"text",attrs:{type:"text",value:"alinea"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.username_error,expression:"username_error"}],staticClass:"error"},[e._v(e._s(e.username_error))])])]),e._v(" "),a("li",[a("label",[e._v("邮箱")]),e._v(" "),a("div",{staticClass:"input-warp"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"text",attrs:{type:"text"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}}),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.email_error,expression:"email_error"}],staticClass:"error"},[e._v(e._s(e.email_error))])])]),e._v(" "),a("li",[a("label",[e._v("手机号")]),e._v(" "),a("div",{staticClass:"input-warp"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.tel,expression:"tel"}],staticClass:"text",attrs:{type:"text"},domProps:{value:e.tel},on:{input:function(t){t.target.composing||(e.tel=t.target.value)}}}),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.tel_error,expression:"tel_error"}],staticClass:"error"},[e._v(e._s(e.tel_error))])])]),e._v(" "),a("li",[a("label",[e._v("归属地")]),e._v(" "),a("div",{staticClass:"input-warp"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.addr,expression:"addr"}],staticClass:"text",attrs:{type:"text"},domProps:{value:e.addr},on:{input:function(t){t.target.composing||(e.addr=t.target.value)}}}),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.addr_error,expression:"addr_error"}],staticClass:"error"},[e._v(e._s(e.addr_error))])])]),e._v(" "),a("li",[a("label",[e._v("所在位置")]),e._v(" "),a("div",{staticClass:"input-warp"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.selfaddr,expression:"selfaddr"}],staticClass:"text",attrs:{type:"text"},domProps:{value:e.selfaddr},on:{input:function(t){t.target.composing||(e.selfaddr=t.target.value)}}}),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.self_addr_error,expression:"self_addr_error"}],staticClass:"error"},[e._v(e._s(e.self_addr_error))])])])])]),e._v(" "),a("div",{staticClass:"dialog-footer"},[a("a",{staticClass:"btn blue",attrs:{href:"javascript:void(0);"},on:{click:e.sure}},[e._v("确定")]),e._v(" "),a("a",{staticClass:"btn",attrs:{href:"javascript:void(0);"},on:{click:e.close}},[e._v("取消")])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"dialog-header"},[a("h4",[e._v("修改联系信息")])])}]}},797:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"warp"},[a("div",{staticClass:"main"},[a("div",{staticClass:"title-warp"},[e._v("我的账号")]),e._v(" "),a("div",{staticClass:"data-detail card-warp"},[a("form",[a("ul",{staticClass:"data-text data-view"},[a("li",[a("label",{staticClass:"name"},[e._v("账号")]),e._v(" "),a("div",{staticClass:"input-warp"},[a("p",{staticClass:"text"},[e._v(e._s(e.detail.user))])])]),e._v(" "),a("li",[a("label",{staticClass:"name"},[e._v("客户类型")]),e._v(" "),a("div",{staticClass:"input-warp"},[a("p",{staticClass:"text"},[e._v(e._s(e.detail.type_name))])])]),e._v(" "),a("li",[a("label",{staticClass:"name"},[e._v("法人")]),e._v(" "),a("div",{staticClass:"input-warp"},[a("p",{staticClass:"text"},[e._v(e._s(e.detail.legal))])])]),e._v(" "),a("li",[a("label",{staticClass:"name"},[e._v("公司名称")]),e._v(" "),a("div",{staticClass:"input-warp"},[a("p",{staticClass:"text"},[e._v(e._s(e.detail.company))])])]),e._v(" "),a("li",[a("label",{staticClass:"name"},[e._v("经营范围")]),e._v(" "),a("div",{staticClass:"input-warp"},[a("p",{staticClass:"text"},[e._v(e._s(e.detail.scope))])])]),e._v(" "),a("li",[a("label",{staticClass:"name"},[e._v("办公地点")]),e._v(" "),a("div",{staticClass:"input-warp"},[a("p",{staticClass:"text"},[e._v(e._s(e.detail.store_addr))])])]),e._v(" "),e.detail.licence?a("li",[a("label",{staticClass:"name"},[e._v("营业执照")]),e._v(" "),a("div",{staticClass:"input-warp"},[a("p",{staticClass:"text"},[a("a",{attrs:{href:e.detail.licence,target:"_blank"}},[e._v("查看")])])])]):e._e(),e._v(" "),e.detail.qualification?a("li",[a("label",{staticClass:"name"},[e._v("其他资质")]),e._v(" "),a("div",{staticClass:"input-warp"},[a("p",{staticClass:"text"},[a("a",{attrs:{href:e.detail.qualification,target:"_blank"}},[e._v("查看")])])])]):e._e()])]),e._v(" "),a("div",{staticClass:"data-card"},[a("div",{staticClass:"title"},[e._v("联系人信息")]),e._v(" "),a("a",{staticClass:"btn blue",attrs:{href:"javascript:void(0);"},on:{click:e.showEditDialog}},[e._m(0)]),e._v(" "),a("dl",[a("dt",[e._v(e._s(e.detail.user_name))]),e._v(" "),a("dd",[e._m(1),e._v(" "),a("p",{staticClass:"text"},[e._v(e._s(e.detail.mail))])]),e._v(" "),a("dd",[e._m(2),e._v(" "),a("p",{staticClass:"text"},[e._v(e._s(e.detail.tel))])]),e._v(" "),e.detail.location?a("dd",[e._m(3),e._v(" "),a("p",{staticClass:"text"},[e._v(e._s(e.detail.location))])]):e._e(),e._v(" "),e.detail.application_addr?a("dd",[e._m(4),e._v(" "),a("p",{staticClass:"text"},[e._v(e._s(e.detail.application_addr))])]):e._e()])])])]),e._v(" "),a("editDialog",{ref:"editDialog"})],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[a("i",{staticClass:"icon edit"}),e._v("修改")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("label",{staticClass:"name"},[a("i",{staticClass:"icon card1"}),e._v("邮       箱")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("label",{staticClass:"name"},[a("i",{staticClass:"icon card2"}),e._v("手  机  号")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("label",{staticClass:"name"},[a("i",{staticClass:"icon card3"}),e._v("归  属  地")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("label",{staticClass:"name"},[a("i",{staticClass:"icon card4"}),e._v("所在位置")])}]}}});
//# sourceMappingURL=29.0f311cf6455998d798c2.js.map