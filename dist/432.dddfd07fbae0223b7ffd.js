"use strict";(self.webpackChunkpackage_json=self.webpackChunkpackage_json||[]).push([[432],{432:(e,t,n)=>{n.r(t),n.d(t,{default:()=>j}),n(5537);var a=n(5861),s=n(5671),i=n(3144),r=n(7326),l=n(136),o=n(6215),c=n(1120),m=n(4942),d=n(4687),u=n.n(d),h=n(7294),p=n(30),v=n(1822),f=n(3150),Z=n(6140),E=n(3030),b=n(3406),_=n(8561),g=n(8736),x=n(5722),y=n(2961),C=n(2450),V=n(4637),k=n(6540),I=n(594),P=n(9620),w=n(2962),S=n(4498),D=n(7745),A=n(3892),N=n(5705),M=n(6406),T=n(1647);var R=n(7563),W=function(e){(0,l.Z)(q,e);var t,n,d,W,j,B,F,O,$,z,J=($=q,z=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=(0,c.Z)($);if(z){var n=(0,c.Z)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return(0,o.Z)(this,e)});function q(e){var t;return(0,s.Z)(this,q),t=J.call(this,e),(0,m.Z)((0,r.Z)(t),"getData",(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:R.stringify({method:e,module:t.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(n)})}).then((function(e){return e.json()})).then((function(e){if(!1!==e.st||"redir"!=e.type){if(!1!==e.st||"auth"!=e.type)return setTimeout((function(){t.setState({is_load:!1})}),300),e;window.location.pathname="/auth"}else window.location.pathname="/"})).catch((function(e){setTimeout((function(){t.setState({is_load:!1})}),300),console.log(e)}))})),t.state={module:"vendor_module",module_name:"",is_load:!1,modalItems:!1,modalVendor:!1,modalVendorNew:!1,vendors:[],allItems:[],vendor_items:[],openVendor:null,customAdd:0,vendorCities:[],allCities:[],nds:[{id:-1,name:"Без НДС"},{id:10,name:"10% НДС"},{id:20,name:"20% НДС"}],nds_:[-1,10,20],cities:[],city:-1},t}return(0,i.Z)(q,[{key:"componentDidMount",value:(O=(0,a.Z)(u().mark((function e(){var t;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData("get_all");case 2:t=e.sent,this.setState({module_name:t.module_info.name,vendors:t.vendors,cities:t.cities}),document.title=t.module_info.name;case 5:case"end":return e.stop()}}),e,this)}))),function(){return O.apply(this,arguments)})},{key:"changeNDS",value:function(e,t){this.state.vendor_items.map((function(n,a){parseInt(n.item_id)==parseInt(e)&&(n.nds=t.target.value)})),this.setState({vendor_items:this.state.vendor_items})}},{key:"openModalItems",value:(F=(0,a.Z)(u().mark((function e(t){var n,a;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={vendor_id:t.id},e.next=3,this.getData("get_vendor_items",n);case 3:a=e.sent,this.setState({modalItems:!0,allItems:a.all_items,vendor_items:a.vendor_items,openVendor:t});case 5:case"end":return e.stop()}}),e,this)}))),function(e){return F.apply(this,arguments)})},{key:"openModalVendor",value:(B=(0,a.Z)(u().mark((function e(t){var n,a;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={vendor_id:t.id},e.next=3,this.getData("get_vendor_info",n);case 3:a=e.sent,this.setState({modalVendor:!0,openVendor:a.vendor,vendorCities:a.vendor_cities,allCities:a.all_cities});case 5:case"end":return e.stop()}}),e,this)}))),function(e){return B.apply(this,arguments)})},{key:"openModalVendorNew",value:(j=(0,a.Z)(u().mark((function e(){var t,n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={vendor_id:0},e.next=3,this.getData("get_vendor_info",t);case 3:n=e.sent,this.setState({modalVendorNew:!0,openVendor:{addr:"",bill_ex:"0",email:"",email_2:"",inn:"",min_price:"",name:"",need_img_bill_ex:"0",ogrn:"",phone:"",text:""},vendorCities:[],allCities:n.all_cities});case 5:case"end":return e.stop()}}),e,this)}))),function(){return j.apply(this,arguments)})},{key:"saveVendorItems",value:(W=(0,a.Z)(u().mark((function e(){var t,n=this;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!((t={vendor_id:this.state.openVendor.id,items:this.state.vendor_items}).items.filter((function(e,t){return!n.state.nds_.includes(parseInt(e.nds))})).length>0)){e.next=5;break}return alert("У одной или нескольких позиций не заполнен НДС"),e.abrupt("return");case 5:return e.next=7,this.getData("save_vendor_items",t);case 7:e.sent,this.setState({modalItems:!1,vendor_items:[],openVendor:null});case 9:case"end":return e.stop()}}),e,this)}))),function(){return W.apply(this,arguments)})},{key:"saveVendor",value:(d=(0,a.Z)(u().mark((function e(){var t,n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={vendor:this.state.openVendor,vendor_cities:this.state.vendorCities,city:this.state.city},e.next=3,this.getData("update_vendor",t);case 3:n=e.sent,this.setState({modalVendor:!1,openVendor:null,vendorCities:[],allCities:[],vendors:n.vendors});case 5:case"end":return e.stop()}}),e,this)}))),function(){return d.apply(this,arguments)})},{key:"addVendor",value:(n=(0,a.Z)(u().mark((function e(){var t,n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={vendor:this.state.openVendor,vendor_cities:this.state.vendorCities,city:this.state.city},e.next=3,this.getData("new_vendor",t);case 3:if(!1!==(n=e.sent).st){e.next=7;break}return alert(n.text),e.abrupt("return");case 7:this.setState({modalVendorNew:!1,openVendor:null,vendorCities:[],allCities:[],vendors:n.vendors});case 8:case"end":return e.stop()}}),e,this)}))),function(){return n.apply(this,arguments)})},{key:"delItem",value:function(e){var t=this.state.vendor_items;t=t.filter((function(t){return parseInt(t.item_id)!=parseInt(e)})),this.setState({vendor_items:t})}},{key:"addItem",value:function(e){var t=this.state.vendor_items;t.find((function(t){return parseInt(t.item_id)==parseInt(e.id)}))||t.push({item_id:e.id,item_name:e.name,nds:-2}),this.setState({vendor_items:t})}},{key:"addItemCustom",value:function(){var e=this,t=this.state.allItems.find((function(t){return parseInt(t.id)==parseInt(e.state.customAdd.id)}));this.addItem(t)}},{key:"testChange",value:function(e,t){var n=this.state.openVendor;n[e]="bill_ex"==e||"need_img_bill_ex"==e?!0===t.target.checked?1:0:t.target.value,this.setState({openVendor:n})}},{key:"changeCity",value:(t=(0,a.Z)(u().mark((function e(t){var n,a;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={city:t.target.value},e.next=3,this.getData("get_vendors",n);case 3:a=e.sent,this.setState({vendors:a,city:t.target.value});case 5:case"end":return e.stop()}}),e,this)}))),function(e){return t.apply(this,arguments)})},{key:"changeSort",value:function(e,t){var n=this;this.state.vendor_items.map((function(a,s){parseInt(a.item_id)==parseInt(e)&&(n.state.vendor_items[s].sort=t.target.value)})),this.setState({vendor_items:this.state.vendor_items})}},{key:"render",value:function(){var e=this;return h.createElement(h.Fragment,null,h.createElement(A.Z,{style:{zIndex:99},open:this.state.is_load},h.createElement(N.Z,{color:"inherit"})),h.createElement(P.Z,{open:this.state.modalItems,fullWidth:!0,maxWidth:"md",onClose:function(){e.setState({modalItems:!1,customAdd:0})},"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},h.createElement(D.Z,{id:"alert-dialog-title"},"Товары поставщика ",this.state.openVendor?this.state.openVendor.name:""),h.createElement(S.Z,{style:{paddingBottom:10,paddingTop:10}},h.createElement(p.ZP,{container:!0,style:{paddingTop:20}},h.createElement(p.ZP,{item:!0,xs:12,sm:5,style:{paddingRight:10}},h.createElement(f.Z,null,h.createElement(Z.Z,null,h.createElement(g.Z,{style:{height:75}},h.createElement(E.Z,null,h.createElement(M.e_,{multiple:!1,data:this.state.allItems,value:0===this.state.customAdd?null:this.state.customAdd,func:function(t,n){e.setState({customAdd:n})}})),h.createElement(E.Z,null,h.createElement(k.Z,{onClick:this.addItemCustom.bind(this),style:{cursor:"pointer"}}))),this.state.allItems.map((function(t,n){return h.createElement(g.Z,{key:n,style:{height:75}},h.createElement(E.Z,null,t.name),h.createElement(E.Z,null,h.createElement(k.Z,{onClick:e.addItem.bind(e,t),style:{cursor:"pointer"}})))}))))),h.createElement(p.ZP,{item:!0,xs:12,sm:7},h.createElement(f.Z,null,h.createElement(Z.Z,null,this.state.vendor_items.map((function(t,n){return h.createElement(g.Z,{key:n,style:{height:75}},h.createElement(E.Z,null,t.item_name),h.createElement(E.Z,null,h.createElement(M.rZ,{label:"",value:t.sort,func:e.changeSort.bind(e,t.item_id)})),h.createElement(E.Z,null,h.createElement(M.$S,{data:e.state.nds,value:t.nds,func:e.changeNDS.bind(e,t.item_id)})),h.createElement(E.Z,null,h.createElement(I.Z,{onClick:e.delItem.bind(e,t.item_id),style:{cursor:"pointer"}})))}))))))),h.createElement(w.Z,null,h.createElement(v.Z,{onClick:this.saveVendorItems.bind(this),color:"primary"},"Сохранить"))),h.createElement(P.Z,{open:this.state.modalVendor,fullWidth:!0,maxWidth:"md",onClose:function(){e.setState({modalVendor:!1})},"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},h.createElement(D.Z,{id:"alert-dialog-title"},"Поставщик ",this.state.openVendor?this.state.openVendor.name:""),h.createElement(S.Z,{style:{paddingBottom:10,paddingTop:10}},h.createElement(p.ZP,{container:!0,spacing:3},this.state.openVendor?h.createElement(h.Fragment,null,h.createElement(p.ZP,{item:!0,xs:12,sm:5},h.createElement(M.rZ,{label:"Наименование",value:this.state.openVendor.name,func:this.testChange.bind(this,"name")})),h.createElement(p.ZP,{item:!0,xs:12,sm:4},h.createElement(M.rZ,{label:"Описание",value:this.state.openVendor.text,func:this.testChange.bind(this,"text")})),h.createElement(p.ZP,{item:!0,xs:12,sm:3},h.createElement(M.rZ,{label:"Мин. сумма заявки",value:this.state.openVendor.min_price,func:this.testChange.bind(this,"min_price")})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(M.rZ,{label:"ИНН",value:this.state.openVendor.inn,func:this.testChange.bind(this,"inn"),disabled:!0})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(M.rZ,{label:"ОГРН",value:this.state.openVendor.ogrn,func:this.testChange.bind(this,"ogrn")})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(M.rZ,{label:"БИК",value:this.state.openVendor.bik,func:this.testChange.bind(this,"bik")})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(M.rZ,{label:"РС",value:this.state.openVendor.rc,func:this.testChange.bind(this,"rc")})),h.createElement(p.ZP,{item:!0,xs:12,sm:8},h.createElement(M.rZ,{label:"Адрес компании",value:this.state.openVendor.addr,func:this.testChange.bind(this,"addr")})),h.createElement(p.ZP,{item:!0,xs:12,sm:4},h.createElement(M.rZ,{label:"Контактное лицо",value:this.state.openVendor.user,func:this.testChange.bind(this,"user")})),h.createElement(p.ZP,{item:!0,xs:12,sm:4},h.createElement(M.rZ,{label:"Телефон",value:this.state.openVendor.phone,func:this.testChange.bind(this,"phone")})),h.createElement(p.ZP,{item:!0,xs:12,sm:4},h.createElement(M.rZ,{label:"Почта",value:this.state.openVendor.email,func:this.testChange.bind(this,"email")})),h.createElement(p.ZP,{item:!0,xs:12,sm:4},h.createElement(M.rZ,{label:"Доп почта",value:this.state.openVendor.email_2,func:this.testChange.bind(this,"email_2")})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(M.IA,{label:"Работа по счетам",value:1==parseInt(this.state.openVendor.bill_ex),func:this.testChange.bind(this,"bill_ex")})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(M.IA,{label:"Необходима картинка",value:1==parseInt(this.state.openVendor.need_img_bill_ex),func:this.testChange.bind(this,"need_img_bill_ex")})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(M.e_,{multiple:!0,label:"Города",data:this.state.allCities,value:this.state.vendorCities,func:function(t,n){console.log(n),e.setState({vendorCities:n})}}))):null)),h.createElement(w.Z,null,h.createElement(v.Z,{onClick:this.saveVendor.bind(this),color:"primary"},"Сохранить"))),h.createElement(P.Z,{open:this.state.modalVendorNew,fullWidth:!0,maxWidth:"md",onClose:function(){e.setState({modalVendorNew:!1})},"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},h.createElement(D.Z,{id:"alert-dialog-title"},"Новый поставщик"),h.createElement(S.Z,null,h.createElement(p.ZP,{container:!0,spacing:3},this.state.openVendor?h.createElement(h.Fragment,null,h.createElement(p.ZP,{item:!0,xs:12,sm:5},h.createElement(M.rZ,{label:"Наименование",value:this.state.openVendor.name,func:this.testChange.bind(this,"name")})),h.createElement(p.ZP,{item:!0,xs:12,sm:4},h.createElement(M.rZ,{label:"Описание",value:this.state.openVendor.text,func:this.testChange.bind(this,"text")})),h.createElement(p.ZP,{item:!0,xs:12,sm:3},h.createElement(M.rZ,{label:"Мин. сумма заявки",value:this.state.openVendor.min_price,func:this.testChange.bind(this,"min_price")})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(M.rZ,{label:"ИНН",value:this.state.openVendor.inn,func:this.testChange.bind(this,"inn")})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(M.rZ,{label:"ОГРН",value:this.state.openVendor.ogrn,func:this.testChange.bind(this,"ogrn")})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(M.rZ,{label:"БИК",value:this.state.openVendor.bik,func:this.testChange.bind(this,"bik")})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(M.rZ,{label:"РС",value:this.state.openVendor.rc,func:this.testChange.bind(this,"rc")})),h.createElement(p.ZP,{item:!0,xs:12,sm:8},h.createElement(M.rZ,{label:"Адрес компании",value:this.state.openVendor.addr,func:this.testChange.bind(this,"addr")})),h.createElement(p.ZP,{item:!0,xs:12,sm:4},h.createElement(M.rZ,{label:"Контактное лицо",value:this.state.openVendor.user,func:this.testChange.bind(this,"user")})),h.createElement(p.ZP,{item:!0,xs:12,sm:4},h.createElement(M.rZ,{label:"Телефон",value:this.state.openVendor.phone,func:this.testChange.bind(this,"phone")})),h.createElement(p.ZP,{item:!0,xs:12,sm:4},h.createElement(M.rZ,{label:"Почта",value:this.state.openVendor.email,func:this.testChange.bind(this,"email")})),h.createElement(p.ZP,{item:!0,xs:12,sm:4},h.createElement(M.rZ,{label:"Доп почта",value:this.state.openVendor.email_2,func:this.testChange.bind(this,"email_2")})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(M.IA,{label:"Работа по счетам",value:1==parseInt(this.state.openVendor.bill_ex),func:this.testChange.bind(this,"bill_ex")})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(M.IA,{label:"Необходима картинка",value:1==parseInt(this.state.openVendor.need_img_bill_ex),func:this.testChange.bind(this,"need_img_bill_ex")})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(M.e_,{label:"Города",data:this.state.allCities,value:this.state.vendorCities,func:function(t,n){e.setState({vendorCities:n})}}))):null)),h.createElement(w.Z,null,h.createElement(v.Z,{onClick:this.addVendor.bind(this),color:"primary"},"Сохранить"))),h.createElement(p.ZP,{container:!0,spacing:3},h.createElement(p.ZP,{item:!0,xs:12,sm:12},h.createElement("h1",null,this.state.module_name)),h.createElement(p.ZP,{item:!0,xs:12,sm:3},h.createElement(M.$S,{data:this.state.cities,value:this.state.city,func:this.changeCity.bind(this),label:"Город"})),h.createElement(p.ZP,{item:!0,xs:12,sm:3},h.createElement(v.Z,{onClick:this.openModalVendorNew.bind(this),variant:"contained"},"Добавить поставщика")),h.createElement(p.ZP,{item:!0,xs:12},h.createElement(b.Z,{component:x.Z},h.createElement(f.Z,null,h.createElement(_.Z,null,h.createElement(g.Z,null,h.createElement(E.Z,{component:"th"},"Название"),h.createElement(E.Z,{component:"th"},"Назначенные товары"),h.createElement(E.Z,{component:"th"},h.createElement(y.Z,null)))),h.createElement(Z.Z,null,this.state.vendors.map((function(t,n){return h.createElement(g.Z,{key:n},h.createElement(E.Z,null,h.createElement(T.Z,{onClick:e.openModalVendor.bind(e,t),style:{cursor:"pointer",width:"max-content"}},t.name)),h.createElement(E.Z,null,h.createElement(V.Z,{onClick:e.openModalItems.bind(e,t),style:{cursor:"pointer"}})),h.createElement(E.Z,null,1==parseInt(t.is_show)?h.createElement(y.Z,null):h.createElement(C.Z,null)))}))))))))}}]),q}(h.Component);function j(){return h.createElement(W,null)}},5537:(e,t,n)=>{var a=n(4783)(e.id,{locals:!1});e.hot.dispose(a),e.hot.accept(void 0,a)}}]);
//# sourceMappingURL=432.dddfd07fbae0223b7ffd.js.map