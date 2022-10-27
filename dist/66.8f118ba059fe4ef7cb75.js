"use strict";(self.webpackChunkpackage_json=self.webpackChunkpackage_json||[]).push([[66],{3066:(e,t,n)=>{n.r(t),n.d(t,{default:()=>x}),n(7887);var a=n(5861),r=n(5671),l=n(3144),c=n(7326),i=n(136),s=n(6215),o=n(1120),u=n(4942),m=n(4687),d=n.n(m),h=n(7294),f=n(30),p=n(1822),E=n(3150),Z=n(6140),v=n(3030),g=n(8561),y=n(8736),w=n(3406),k=n(3892),C=n(5705),_=n(6406);var S=n(7563),b=function(e){(0,i.Z)(D,e);var t,n,m,b,x=(m=D,b=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=(0,o.Z)(m);if(b){var n=(0,o.Z)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return(0,s.Z)(this,e)});function D(e){var t;return(0,r.Z)(this,D),t=x.call(this,e),(0,u.Z)((0,c.Z)(t),"getData",(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:S.stringify({method:e,module:t.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(n)})}).then((function(e){return e.json()})).then((function(e){if(!1!==e.st||"redir"!=e.type){if(!1!==e.st||"auth"!=e.type)return setTimeout((function(){t.setState({is_load:!1})}),300),e;window.location.pathname="/auth"}else window.location.pathname="/"})).catch((function(e){console.log(e),t.setState({is_load:!1})}))})),t.state={module:"tender",module_name:"",is_load:!1,cities:[],city:"",newCities:[],newCiti:"",vendors:[],vendor:[],cats:[],newCats:[],newCat:""},t}return(0,l.Z)(D,[{key:"componentDidMount",value:(n=(0,a.Z)(d().mark((function e(){var t;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData("get_all");case 2:t=e.sent,console.log(t),this.setState({module_name:t.module_info.name,cities:t.cities,city:t.cities[0].id,vendors:t.vendors,newCats:t.cats}),document.title=t.module_info.name;case 6:case"end":return e.stop()}}),e,this)}))),function(){return n.apply(this,arguments)})},{key:"changeCity",value:function(e){this.setState({city:e.target.value})}},{key:"changeVendor",value:function(e,t){this.setState({vendor:t,newCat:""})}},{key:"changeCat",value:function(e,t){this.setState({newCat:t,vendor:[]})}},{key:"getDataTable",value:(t=(0,a.Z)(d().mark((function e(){var t,n;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={city_id:this.state.city,vendors:this.state.vendor,cat:this.state.newCat},e.next=3,this.getData("get_data",t);case 3:n=e.sent,this.getDataTableCell(n);case 5:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"getDataTableCell",value:function(e){var t=this.state.vendors,n=e.vendor_items_price,a=t.map((function(e){return e.price=[],n.forEach((function(t){t.vendor_id===e.id&&e.price.push(t)})),e}));this.setState({cats:e.items,vendors:a,newCities:e.cities,newCiti:e.cities[0].id})}},{key:"changeSelect",value:function(e){this.setState({newCiti:e.target.value})}},{key:"render",value:function(){var e=this;return console.log("render"),h.createElement(h.Fragment,null,h.createElement(k.Z,{open:this.state.is_load},h.createElement(C.Z,{color:"inherit"})),h.createElement(f.ZP,{container:!0,spacing:3,mb:3},h.createElement(f.ZP,{item:!0,xs:12,sm:12},h.createElement("h1",null,this.state.module_name))),h.createElement(f.ZP,{container:!0,spacing:3,justifyContent:"center",mb:5},h.createElement(f.ZP,{item:!0,xs:12,sm:3},h.createElement(_.$S,{data:this.state.cities,value:this.state.city,func:this.changeCity.bind(this),label:"Город"})),h.createElement(f.ZP,{item:!0,xs:12,sm:6},h.createElement(_.e_,{label:"Поставщик",multiple:!0,data:this.state.vendors,value:this.state.vendor,func:this.changeVendor.bind(this)})),h.createElement(f.ZP,{item:!0,xs:12,sm:6},h.createElement(_.e_,{label:"Категория",multiple:!1,data:this.state.newCats,value:this.state.newCat,func:this.changeCat.bind(this)})),h.createElement(f.ZP,{item:!0,xs:12,sm:3},h.createElement(p.Z,{variant:"contained",style:{whiteSpace:"nowrap"},onClick:this.getDataTable.bind(this)},"Обновить данные"))),this.state.cats.length?h.createElement(f.ZP,{container:!0,spacing:3},h.createElement(f.ZP,{item:!0,xs:12,sm:12},h.createElement(w.Z,{sx:{maxHeight:{xs:"none",sm:650}}},h.createElement(E.Z,{stickyHeader:!0,"aria-label":"sticky table"},h.createElement(g.Z,null,h.createElement(y.Z,null,h.createElement(v.Z,null,"Категория"),h.createElement(v.Z,null,"Параметры"),h.createElement(v.Z,null,"Все"),h.createElement(v.Z,null,"Тольятти"),h.createElement(v.Z,null,"Самара"),this.state.vendors.map((function(e,t){return h.createElement(v.Z,{key:t,style:{whiteSpace:"nowrap",minWidth:300,textAlign:"center"},colSpan:2},e.name)})))),h.createElement(Z.Z,null,this.state.cats.map((function(t,n){return h.createElement(h.Fragment,{key:n},h.createElement(y.Z,null,h.createElement(v.Z,{colSpan:"".concat(5+2*e.state.vendors.length),sx:{backgroundColor:"#ADD8E6"}},t.name)),t.cats.map((function(t,n){return h.createElement(h.Fragment,{key:n},h.createElement(y.Z,{sx:{"& td":{backgroundColor:"#ADD8E6"}}},h.createElement(v.Z,null,t.name),h.createElement(v.Z,null),0===n?h.createElement(v.Z,{colSpan:3},"Зафиксированные цены"):h.createElement(h.Fragment,{key:n},h.createElement(v.Z,null),h.createElement(v.Z,null),h.createElement(v.Z,null)),e.state.vendors.map((function(e,t){return h.createElement(h.Fragment,{key:t},h.createElement(v.Z,{colSpan:2}))}))),t.items.map((function(t,n){return h.createElement(y.Z,{key:n,hover:!0},h.createElement(v.Z,{className:"td_color"},t.name),h.createElement(v.Z,null),h.createElement(v.Z,null),h.createElement(v.Z,null),h.createElement(v.Z,null),e.state.vendors.map((function(n,a){return h.createElement(h.Fragment,{key:a},n.price.find((function(e){return e.item_id===t.id}))?h.createElement(h.Fragment,null,h.createElement(v.Z,null,h.createElement(_.$S,{data:e.state.newCities,value:e.state.newCiti,func:e.changeSelect.bind(e),label:""})),h.createElement(v.Z,{style:{whiteSpace:"nowrap",textAlign:"center"}},n.price.find((function(e){return e.item_id===t.id})).price)):h.createElement(h.Fragment,null,h.createElement(v.Z,null),h.createElement(v.Z,null)))})))})))})))}))))))):null)}}]),D}(h.Component);function x(){return h.createElement(b,null)}},7887:(e,t,n)=>{var a=n(4783)(e.id,{locals:!1});e.hot.dispose(a),e.hot.accept(void 0,a)}}]);
//# sourceMappingURL=66.8f118ba059fe4ef7cb75.js.map