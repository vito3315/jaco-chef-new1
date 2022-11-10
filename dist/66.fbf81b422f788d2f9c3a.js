"use strict";(self.webpackChunkpackage_json=self.webpackChunkpackage_json||[]).push([[66],{3066:(e,t,n)=>{n.r(t),n.d(t,{default:()=>S}),n(7887);var a=n(5861),r=n(7326),c=n(4942),i=n(5671),s=n(3144),l=n(136),o=n(6215),u=n(1120),m=n(4687),h=n.n(m),d=n(7294),f=n(30),p=n(1822),v=n(3150),E=n(6140),Z=n(3030),g=n(8561),y=n(8736),k=n(3406),_=n(3892),w=n(5705),C=n(6406);function x(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=(0,u.Z)(e);if(t){var r=(0,u.Z)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return(0,o.Z)(this,n)}}var b=n(7563),P=function(e){(0,l.Z)(n,e);var t=x(n);function n(){return(0,i.Z)(this,n),t.apply(this,arguments)}return(0,s.Z)(n,[{key:"render",value:function(){var e=this.props,t=e.vendor,n=e.price,a=e.item,r="tdprice ";return"1"==n.checkTender&&(r+="chooseCell "),n.price==n.min_price&&(r+="minPriceCell "),n.price==n.max_price&&(r+="maxPriceCell "),d.createElement(Z.Z,{className:r,onClick:this.props.changePrice.bind(this,t.id,a.id,n.price)},n.price)}}]),n}(d.Component),D=function(e){(0,l.Z)(D,e);var t,n,o,u,m=x(D);function D(e){var t;return(0,i.Z)(this,D),t=m.call(this,e),(0,c.Z)((0,r.Z)(t),"getData",(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:b.stringify({method:e,module:t.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(n)})}).then((function(e){return e.json()})).then((function(e){if(!1!==e.st||"redir"!=e.type){if(!1!==e.st||"auth"!=e.type)return setTimeout((function(){t.setState({is_load:!1})}),300),e;window.location.pathname="/auth"}else window.location.pathname="/"})).catch((function(e){console.log(e),t.setState({is_load:!1})}))})),t.state={module:"tender",module_name:"",is_load:!1,cities:[],city:"",allVendors:[],vendors:[],vendor:[],cats:[],newCats:[],newCat:""},t}return(0,s.Z)(D,[{key:"componentDidMount",value:(u=(0,a.Z)(h().mark((function e(){var t;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData("get_all");case 2:t=e.sent,this.setState({module_name:t.module_info.name,cities:t.cities,city:t.cities[0].id,allVendors:t.vendors,newCats:t.cats}),document.title=t.module_info.name;case 5:case"end":return e.stop()}}),e,this)}))),function(){return u.apply(this,arguments)})},{key:"changeCity",value:(o=(0,a.Z)(h().mark((function e(t){var n,a;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={city_id:t.target.value},e.next=3,this.getData("get_vendors",n);case 3:a=e.sent,this.setState({city:t.target.value,allVendors:a});case 5:case"end":return e.stop()}}),e,this)}))),function(e){return o.apply(this,arguments)})},{key:"changeVendor",value:function(e,t){this.setState({vendor:t,newCat:""})}},{key:"changeCat",value:function(e,t){this.setState({newCat:t,vendor:[]})}},{key:"getDataTable",value:(n=(0,a.Z)(h().mark((function e(){var t,n;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={city_id:this.state.city,vendors:this.state.vendor,cat:this.state.newCat},e.next=3,this.getData("get_data",t);case 3:n=e.sent,console.log(n),this.getDataTableCell(n);case 6:case"end":return e.stop()}}),e,this)}))),function(){return n.apply(this,arguments)})},{key:"getDataTableCell",value:function(e){var t=e.vendors,n=e.vendor_items_price,a=t.map((function(e){return e.price=[],n.forEach((function(t){t.vendor_id===e.id&&e.price.push(t)})),e}));this.setState({cats:e.items,vendors:a})}},{key:"changePrice",value:function(e,t,n){var a=this.state.vendors,r=this.state.cats;r.forEach((function(a){a.cats.forEach((function(a){a.items.forEach((function(a){a.id===t&&(a.price=n,a.vendor_id=e)}))}))})),a.forEach((function(n){n.price.forEach((function(n){n.item_id===t&&n.vendor_id===e&&(n.checkTender="1"),n.item_id===t&&n.vendor_id!==e&&(n.checkTender="0")}))})),this.setState({vendors:a,cats:r})}},{key:"saveData",value:(t=(0,a.Z)(h().mark((function e(){var t,n,a,r;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.state.cats,n=[],t.forEach((function(e){e.cats.forEach((function(e){e.items.forEach((function(e){n.push(e)}))}))})),a={city_id:this.state.city,items:n},console.log(a),e.next=7,this.getData("save",a);case 7:r=e.sent,console.log(r);case 9:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"render",value:function(){var e=this;return d.createElement(d.Fragment,null,d.createElement(_.Z,{open:this.state.is_load},d.createElement(w.Z,{color:"inherit"})),d.createElement(f.ZP,{container:!0,spacing:3,mb:3},d.createElement(f.ZP,{item:!0,xs:12,sm:12},d.createElement("h1",null,this.state.module_name))),d.createElement(f.ZP,{container:!0,spacing:3,justifyContent:"center",mb:5},d.createElement(f.ZP,{item:!0,xs:12,sm:3},d.createElement(C.$S,{data:this.state.cities,value:this.state.city,func:this.changeCity.bind(this),label:"Город"})),d.createElement(f.ZP,{item:!0,xs:12,sm:6},d.createElement(C.e_,{label:"Поставщик",multiple:!0,data:this.state.allVendors,value:this.state.vendor,func:this.changeVendor.bind(this)})),d.createElement(f.ZP,{item:!0,xs:12,sm:6},d.createElement(C.e_,{label:"Категория",multiple:!1,data:this.state.newCats,value:this.state.newCat,func:this.changeCat.bind(this)})),d.createElement(f.ZP,{container:!0,spacing:3,item:!0,sm:3},d.createElement(f.ZP,{item:!0,xs:12,sm:6},d.createElement(p.Z,{variant:"contained",style:{whiteSpace:"nowrap"},onClick:this.getDataTable.bind(this)},"Обновить данные")),d.createElement(f.ZP,{item:!0,xs:12,sm:6},d.createElement(p.Z,{style:{whiteSpace:"nowrap",backgroundColor:"#00a550",color:"white"},onClick:this.saveData.bind(this)},"Сохранить изменения")))),this.state.cats.length?d.createElement(f.ZP,{container:!0,spacing:3},d.createElement(f.ZP,{item:!0,xs:12,sm:12},d.createElement(k.Z,{sx:{maxHeight:{xs:"none",sm:650}}},d.createElement(v.Z,{stickyHeader:!0,"aria-label":"sticky table"},d.createElement(g.Z,null,d.createElement(y.Z,null,d.createElement(Z.Z,null,"Категория"),d.createElement(Z.Z,null,"Параметры"),d.createElement(Z.Z,null,"Выбранный"),d.createElement(Z.Z,null,"Расход"),this.state.vendors.map((function(e,t){return d.createElement(Z.Z,{key:t,style:{maxWidth:100,textAlign:"center"}},e.name)})))),d.createElement(E.Z,null,this.state.cats.map((function(t,n){return d.createElement(d.Fragment,{key:n},d.createElement(y.Z,null,d.createElement(Z.Z,{colSpan:"".concat(3+2*e.state.vendors.length),sx:{backgroundColor:"#ADD8E6"}},t.name)),t.cats.map((function(t,n){return d.createElement(d.Fragment,{key:n},d.createElement(y.Z,{sx:{"& td":{backgroundColor:"#ADD8E6"}}},d.createElement(Z.Z,null,t.name),d.createElement(Z.Z,null),0===n?d.createElement(Z.Z,null,"Цена"):d.createElement(d.Fragment,{key:n},d.createElement(Z.Z,null)),d.createElement(Z.Z,null),e.state.vendors.map((function(e,t){return d.createElement(d.Fragment,{key:t},d.createElement(Z.Z,null))}))),t.items.map((function(t,n){return d.createElement(y.Z,{key:n,hover:!0},d.createElement(Z.Z,{className:"td_color"},t.name),d.createElement(Z.Z,null),d.createElement(Z.Z,null,t.price),d.createElement(Z.Z,null,t.ras),e.state.vendors.map((function(n,a){return d.createElement(d.Fragment,{key:a},n.price.find((function(e){return e.item_id===t.id}))?d.createElement(P,{vendor:n,item:t,price:n.price.find((function(e){return e.item_id===t.id})),changePrice:e.changePrice.bind(e)}):d.createElement(Z.Z,null))})))})))})))}))))))):null)}}]),D}(d.Component);function S(){return d.createElement(D,null)}},7887:(e,t,n)=>{var a=n(4783)(e.id,{locals:!1});e.hot.dispose(a),e.hot.accept(void 0,a)}}]);
//# sourceMappingURL=66.fbf81b422f788d2f9c3a.js.map