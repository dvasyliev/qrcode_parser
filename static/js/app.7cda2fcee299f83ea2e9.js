webpackJsonp([1],{Coew:function(e,n){},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("7+uW"),i=t("czVC"),r=t.n(i),l=t("ucfa"),m={name:"App",data:function(){return{qrcode:""}},computed:{isCorrectChecksum:function(){return Object(l.b)(this.qrcode)},qrcodeTransformed:function(){return this.isCorrectChecksum?Object(l.a)(this.qrcode):null},qrcodeModel:function(){return this.isCorrectChecksum?r()({model:this.qrcodeTransformed}):""}}},c={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("div",{staticClass:"page"},[t("div",{staticClass:"page__inner"},[t("div",{staticClass:"page__content"},[t("p",[e._v("QR-code String:")]),e._v(" "),t("el-input",{attrs:{type:"textarea",placeholder:"Type your QR-code here...",resize:"none",rows:3},model:{value:e.qrcode,callback:function(n){e.qrcode=n},expression:"qrcode"}}),e._v(" "),t("p",[e._v("QR-code Model:")]),e._v(" "),e.qrcode.length&&e.isCorrectChecksum?t("div",{staticClass:"page__json",domProps:{innerHTML:e._s(e.qrcodeModel)}}):e._e(),e._v(" "),e.qrcode.length?e.isCorrectChecksum?e._e():t("el-alert",{attrs:{title:"Check sum not exist or not correct",type:"error","show-icon":"",closable:!1}}):t("el-alert",{attrs:{title:"Enter qrcode",type:"info","show-icon":"",closable:!1}})],1)])])])},staticRenderFns:[]};var o=t("VU/8")(m,c,!1,function(e){t("Coew")},null,null).exports,d=t("zL8q"),u=t.n(d);t("tvR6");a.default.use(u.a),a.default.config.productionTip=!1,new a.default({el:"#app",components:{App:o},template:"<App/>"})},QlUo:function(e,n){e.exports=[{id:"00",length:"02",name:"payload_format_indicator"},{id:"01",length:"02",default:{11:"Static",12:"Dynamic"},name:"point_of_initiation_method"},{id:{min:"02",max:"51"},length:{min:"00",max:"99"},name:"merchant_account_information"},{id:"52",length:"04",name:"merchant_category_code"},{id:"53",length:"03",name:"transaction_currency"},{id:"54",length:{min:"01",max:"13"},name:"transaction_amount"},{id:"55",length:"02",name:"tip_or_convenience_indicator"},{id:"56",length:{min:"01",max:"13"},name:"value_of_convenience_fee_fixed"},{id:"57",length:{min:"01",max:"05"},name:"value_of_convenience_fee_percentage"},{id:"58",length:"02",name:"country_code"},{id:"59",length:{min:"00",max:"75"},name:"merchant_name"},{id:"60",length:{min:"01",max:"15"},name:"merchant_city"},{id:"61",length:{min:"01",max:"10"},name:"postal_code"},{id:"62",length:{min:"01",max:"99"},name:"additional_data_field",children:[{id:"01",length:{min:"00",max:"25"},name:"bill_number"},{id:"02",length:{min:"00",max:"25"},name:"mobile_number"},{id:"03",length:{min:"00",max:"25"},name:"store_label"},{id:"04",length:{min:"00",max:"25"},name:"loyalty_number"},{id:"05",length:{min:"00",max:"25"},name:"reference_label"},{id:"06",length:{min:"00",max:"25"},name:"customer_label"},{id:"07",length:{min:"00",max:"25"},name:"terminal_label"},{id:"08",length:{min:"00",max:"25"},name:"purpose_of_transaction"},{id:"09",length:{min:"00",max:"03"},name:"additional_consumer_data_request"},{id:{min:"10",max:"49"},name:"rfu_for_emvco"},{id:{min:"50",max:"99"},name:"payment_system"}]},{id:"64",length:{min:"00",max:"99"},name:"merchant_information",children:[{id:"00",length:"02",name:"language_preference"},{id:"01",length:{min:"00",max:"75"},name:"merchant_name"}]},{id:"80",length:{min:"00",max:"99"},name:"qr_parameters_information",children:[{id:"00",length:{min:"01",max:"32"},name:"globally_unique_identifier"},{id:"01",length:"02",default:{"00":"P2P","01":"P2M"},name:"p2p_vs_p2m"},{id:"02",length:"08",name:"channel_id"},{id:"03",length:"20",name:"merchant_id"},{id:"04",length:{min:"00",max:"12"},name:"request_reference_number"},{id:"05",length:"02",default:{"00":"Amount is Changeable","01":"Amount is Fixed"},name:"amount_type"}]},{id:"81",length:{min:"00",max:"99"},name:"qr_parameters_lifetime",children:[{id:"00",length:{min:"01",max:"32"},name:"globally_unique_identifier"},{id:"01",length:"17",name:"start_date"},{id:"02",length:{min:"01",max:"10"},name:"code_lifetime"}]},{id:"63",length:"04",name:"cyclic_redundancy_check"}]},tvR6:function(e,n){},ucfa:function(e,n,t){"use strict";(function(e){t.d(n,"b",function(){return u}),t.d(n,"a",function(){return h});var a=t("Gu7T"),i=t.n(a),r=t("M4fF"),l=t.n(r),m=t("mbz9"),c=(t.n(m),t("QlUo")),o=t.n(c),d=function(e){return null!==e.match(/^\d{2}/)},u=function(n){var t=function(e){var n=e.slice(e.length-8,e.length),t=n.slice(0,2),a=n.slice(2,4),i=n.slice(4,8);return"63"===t&&"04"===a&&4===i.length?i:null}(n);return!!t&&t===function(n){var t=n.slice(0,-8),a=new m.CRC("CRC16",16,4135,65535).compute(e.from(t,"ascii")).toString(16).toUpperCase();return console.error("CRC should be equal: ",a),a}(n)},s=function(e){var n=e.slice(0,2),t=e.slice(2,4),a=e.slice(4,4+parseInt(t,10));return d(n)&&d(t)&&function(e,n){return e.length&&e.length===parseInt(n,10)}(a,t)?{id:n,length:t,value:a}:null},h=function(e){return function e(n,t){var a={};return n.forEach(function(n){var i=l.a.find(t,{id:n.id});if(!l.a.has(n,"name"))return console.error('Missed "name" attribute for definition with ID = '+n.id),!1;if(l.a.has(n,"children")){var r=l.a.has(i,"value")&&l.a.isArray(i.value)?i.value:[];a[n.name]=e(n.children,r)}else a[n.name]=l.a.has(i,"value")?i.value:null}),a}(o.a,function e(n,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=s(n);if(!r)return[];var l=s(r.value);if(l&&a<t){var m=r.value.slice(4+parseInt(l.length,10)),c=[l].concat(i()(e(m,t,++a))).map(function(e){return e.parent_id=r.id,e});r.value=c}var o=n.slice(4+parseInt(r.length,10));return[r].concat(i()(e(o,t,a)))}(e,2))}}).call(n,t("EuP9").Buffer)}},["NHnr"]);
//# sourceMappingURL=app.7cda2fcee299f83ea2e9.js.map