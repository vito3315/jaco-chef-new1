"use strict";(self.webpackChunkpackage_json=self.webpackChunkpackage_json||[]).push([[535],{3535:(e,t,n)=>{n.r(t),n.d(t,{default:()=>M}),n(4859);var a=n(5861),l=n(7326),s=n(4942),r=n(5671),i=n(3144),c=n(136),o=n(6215),u=n(1120),m=n(4687),h=n.n(m),p=n(7294),d=n(30),f=n(1822),Z=n(3150),E=n(6140),v=n(3030),y=n(3406),g=n(8561),_=n(8736),w=n(1647),k=n(8727),x=n(808),S=n(231),C=n(3508),b=n(9620),I=n(2962),P=n(4498),D=n(7745),T=n(3892),j=n(5705),R=n(6406);function B(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=(0,u.Z)(e);if(t){var l=(0,u.Z)(this).constructor;n=Reflect.construct(a,arguments,l)}else n=a.apply(this,arguments);return(0,o.Z)(this,n)}}var L=n(7563),O=function(e){(0,c.Z)(n,e);var t=B(n);function n(e){var a;return(0,r.Z)(this,n),(a=t.call(this,e)).state={points:[],point:[]},a}return(0,i.Z)(n,[{key:"componentDidUpdate",value:function(e){this.props.points&&this.props.points!==e.points&&this.setState({points:this.props.points})}},{key:"changePoint",value:function(e){var t=e.target.value;this.setState({point:t})}},{key:"choosePoint",value:function(e,t){this.setState({point:t})}},{key:"onClose",value:function(){this.setState({points:this.props.points?this.props.points:[]}),this.props.onClose()}},{key:"render",value:function(){return p.createElement(b.Z,{open:this.props.open,onClose:this.onClose.bind(this),fullWidth:!0,maxWidth:"xs"},p.createElement(D.Z,null,"Где применить"),p.createElement(P.Z,{style:{paddingBottom:10,paddingTop:10}},p.createElement(d.ZP,{item:!0,xs:12,sm:4},p.createElement(R.e_,{label:"Точка",multiple:!0,data:this.state.points,value:this.state.point,func:this.choosePoint.bind(this)}))),p.createElement(I.Z,null,p.createElement(f.Z,{onClick:this.props.save.bind(this,this.state.point)},"Сохранить")))}}]),n}(p.Component),q=function(e){(0,c.Z)(b,e);var t,n,o,u,m=B(b);function b(e){var t;return(0,r.Z)(this,b),t=m.call(this,e),(0,s.Z)((0,l.Z)(t),"getData",(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:L.stringify({method:e,module:t.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(n)})}).then((function(e){return e.json()})).then((function(e){if(!1!==e.st||"redir"!=e.type){if(!1!==e.st||"auth"!=e.type)return setTimeout((function(){t.setState({is_load:!1})}),300),e;window.location.pathname="/auth"}else window.location.pathname="/"})).catch((function(e){console.log(e)}))})),t.state={module:"order_post_rec",module_name:"",is_load:!1,points:[],point:"0",items:[],cats:[],catsCopy:[],freeItems:[],freeItemsCopy:[],hist:[],modalDialog:!1},t}return(0,i.Z)(b,[{key:"componentDidMount",value:(u=(0,a.Z)(h().mark((function e(){var t;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData("get_all");case 2:t=e.sent,console.log(t),this.setState({points:t.point_list,point:t.point_list[0].id,module_name:t.module_info.name,cats:t.cats,catsCopy:t.cats,freeItems:t.items_free,freeItemsCopy:t.items_free,hist:t.hist,items:t.items}),document.title=t.module_info.name;case 6:case"end":return e.stop()}}),e,this)}))),function(){return u.apply(this,arguments)})},{key:"changePoint",value:(o=(0,a.Z)(h().mark((function e(t){var n,a;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.target.value,e.next=3,this.getData("get_all",n);case 3:a=e.sent,this.setState({point:n,items:a.items,cats:a.cats,freeItems:a.items_free});case 5:case"end":return e.stop()}}),e,this)}))),function(e){return o.apply(this,arguments)})},{key:"search",value:function(e){var t,n,a,l=this;t=e.target.value?null!==(n=e.target.value)&&void 0!==n?n:"":null!==(a=e.target.innerText)&&void 0!==a?a:"";var s=this.state.cats,r=this.state.freeItems;if(""!==t||t.length>1){s.map((function(e){var n=[];e.cats.map((function(e){return e.items=e.items.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})),e.items.length||n.push(e),e})),e.cats.length===n.length&&(e.all=0)}));var i=r.filter((function(e){return e.pf_name.toLowerCase().includes(t.toLowerCase())}));this.setState({cats:s,freeItems:i})}else setTimeout((function(){l.update()}),300)}},{key:"openModal",value:function(){this.setState({modalDialog:!0})}},{key:"save",value:(n=(0,a.Z)(h().mark((function e(t){var n,a=this;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={items:this.state.cats,points:t},e.next=3,this.getData("save_edit",n);case 3:e.sent,setTimeout((function(){a.update()}),300);case 5:case"end":return e.stop()}}),e,this)}))),function(e){return n.apply(this,arguments)})},{key:"update",value:(t=(0,a.Z)(h().mark((function e(){var t;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData("get_all");case 2:t=e.sent,this.setState({items:t.items,cats:t.cats,freeItems:t.items_free});case 4:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"changeSelect",value:function(e,t,n){var a=this.state.cats;a.map((function(a){a.cats.map((function(a){a.items.map((function(a){return a.id===e&&(a[t]=n.target.value),a}))}))})),this.setState({cats:a})}},{key:"render",value:function(){var e=this;return p.createElement(p.Fragment,null,p.createElement(T.Z,{style:{zIndex:99},open:this.state.is_load},p.createElement(j.Z,{color:"inherit"})),p.createElement(O,{open:this.state.modalDialog,onClose:function(){e.setState({modalDialog:!1})},points:this.state.points,save:this.save.bind(this)}),p.createElement(d.ZP,{container:!0,spacing:3},p.createElement(d.ZP,{item:!0,xs:12,sm:12},p.createElement("h1",null,this.state.module_name)),p.createElement(d.ZP,{item:!0,xs:12,sm:4},p.createElement(R.$S,{data:this.state.points,value:this.state.point,func:this.changePoint.bind(this),label:"Точка"})),p.createElement(d.ZP,{item:!0,xs:12,sm:4},p.createElement(R.OU,{label:"Поиск",freeSolo:!0,multiple:!1,data:this.state.items,value:"",func:this.search.bind(this)})),p.createElement(d.ZP,{item:!0,xs:12,sm:4},p.createElement(f.Z,{variant:"contained",onClick:this.openModal.bind(this)},"Сохранить изменения")),this.state.point<1?null:p.createElement(d.ZP,{item:!0,xs:12,sm:12,mb:6},this.state.cats.filter((function(e){return 0!==e.all})).map((function(t,n){return p.createElement(k.Z,{key:n},p.createElement(x.Z,{expandIcon:p.createElement(C.Z,null)},p.createElement(w.Z,null,t.name)),p.createElement(S.Z,null,t.cats.filter((function(e){return 0!==e.items.length})).map((function(t,n){return p.createElement(k.Z,{key:n},p.createElement(x.Z,{expandIcon:p.createElement(C.Z,null)},p.createElement(w.Z,null,t.name)),p.createElement(S.Z,{style:{width:"100%",overflow:"scroll"}},p.createElement(y.Z,null,p.createElement(Z.Z,null,p.createElement(g.Z,null,p.createElement(_.Z,null,p.createElement(v.Z,{style:{width:"2%"}},"#"),p.createElement(v.Z,{style:{width:"30%"}},"Заготовка"),p.createElement(v.Z,{style:{width:"25%"}},"Товар"),p.createElement(v.Z,{style:{width:"13%"}},"Объем (упак.)"),p.createElement(v.Z,{style:{width:"30%"}},"Поставщик"))),p.createElement(E.Z,null,t.items.map((function(t,n){return p.createElement(_.Z,{key:n,sx:{"& td":{border:0}},hover:!0},p.createElement(v.Z,null,t.id),p.createElement(v.Z,null,t.name),p.createElement(v.Z,null,1===t.items.length?t.items[0].name:p.createElement(R.$S,{data:t.items,value:t.item_id_rec,func:e.changeSelect.bind(e,t.id,"item_id_rec")})),p.createElement(v.Z,null,t.pq_rec," ",t.ei_name),p.createElement(v.Z,null,t.vendors?1===t.vendors.length?t.vendors[0].name:p.createElement(R.$S,{data:t.vendors,value:t.vendor_id_rec,func:e.changeSelect.bind(e,t.id,"vendor_id_rec")}):null))})))))))}))))})),0==this.state.freeItems.length?null:p.createElement(k.Z,null,p.createElement(x.Z,{expandIcon:p.createElement(C.Z,null)},p.createElement(w.Z,null,"Без категории")),p.createElement(S.Z,{style:{width:"100%",overflow:"scroll"}},p.createElement(y.Z,null,p.createElement(Z.Z,null,p.createElement(g.Z,null,p.createElement(_.Z,null,p.createElement(v.Z,{style:{width:"2%"}},"#"),p.createElement(v.Z,{style:{width:"30%"}},"Заготовка"),p.createElement(v.Z,{style:{width:"25%"}},"Товар"),p.createElement(v.Z,{style:{width:"13%"}},"Объем (упак.)"),p.createElement(v.Z,{style:{width:"30%"}},"Поставщик"))),p.createElement(E.Z,null,this.state.freeItems.map((function(e,t){return p.createElement(_.Z,{key:t,sx:{"& td":{border:0}},hover:!0},p.createElement(v.Z,null,e.id),p.createElement(v.Z,null,e.name),p.createElement(v.Z,null),p.createElement(v.Z,null,e.pq_rec," ",e.ei_name),p.createElement(v.Z,null))})))))))),this.state.point<1||!this.state.hist.length?null:p.createElement(d.ZP,{pb:1,container:!0,justifyContent:"center"},p.createElement(d.ZP,{item:!0,xs:10,sm:6},p.createElement(k.Z,null,p.createElement(x.Z,{expandIcon:p.createElement(C.Z,null),"aria-controls":"panel1a-content"},p.createElement(w.Z,null,"История изменений")),p.createElement(S.Z,null,this.state.hist.map((function(e,t){return p.createElement(k.Z,{key:t},p.createElement(x.Z,null,p.createElement(w.Z,{mr:8},e.date_time),p.createElement(w.Z,null,e.user_name)),p.createElement(S.Z,null,e.items.map((function(e,t){return p.createElement(y.Z,{key:t},p.createElement(Z.Z,null,p.createElement(E.Z,null,p.createElement(_.Z,{sx:{"& td":{border:0,paddingTop:0,paddingBottom:0}},hover:!0},p.createElement(v.Z,{style:{width:"30%"}},e.item_name),p.createElement(v.Z,{style:{width:"30%"}},e.pf_name),p.createElement(v.Z,{style:{width:"10%"}},e.pq),p.createElement(v.Z,{style:{width:"30%"}},e.vendor_name)))))}))))}))))))))}}]),b}(p.Component);function M(){return p.createElement(q,null)}},4859:(e,t,n)=>{var a=n(4783)(e.id,{locals:!1});e.hot.dispose(a),e.hot.accept(void 0,a)}}]);
//# sourceMappingURL=535.71ce5be3677eadf25b73.js.map