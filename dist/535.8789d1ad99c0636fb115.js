"use strict";(self.webpackChunkpackage_json=self.webpackChunkpackage_json||[]).push([[535],{3535:(e,t,n)=>{n.r(t),n.d(t,{default:()=>U}),n(4859);var s=n(5861),a=n(7326),i=n(4942),r=n(5671),l=n(3144),o=n(136),c=n(6215),u=n(1120),m=n(4687),h=n.n(m),p=n(7294),d=n(30),f=n(1822),Z=n(3150),E=n(6140),v=n(3030),y=n(3406),g=n(8561),_=n(8736),S=n(1647),w=n(8727),k=n(808),x=n(231),I=n(3508),b=n(9620),C=n(2962),P=n(4498),O=n(7745),D=n(3892),J=n(5705),N=n(6406);function T(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,s=(0,u.Z)(e);if(t){var a=(0,u.Z)(this).constructor;n=Reflect.construct(s,arguments,a)}else n=s.apply(this,arguments);return(0,c.Z)(this,n)}}var R=n(7563),j=function(e){(0,o.Z)(n,e);var t=T(n);function n(e){var s;return(0,r.Z)(this,n),(s=t.call(this,e)).state={points:[],point:[]},s}return(0,l.Z)(n,[{key:"componentDidUpdate",value:function(e){this.props.points&&this.props.points!==e.points&&this.setState({points:this.props.points})}},{key:"choosePoint",value:function(e,t){this.setState({point:t})}},{key:"save",value:function(){this.props.save(this.state.point),this.setState({points:this.props.points?this.props.points:[]}),this.props.onClose()}},{key:"onClose",value:function(){this.setState({points:this.props.points?this.props.points:[]}),this.props.onClose()}},{key:"render",value:function(){return p.createElement(b.Z,{open:this.props.open,onClose:this.onClose.bind(this),fullWidth:!0,maxWidth:"xs"},p.createElement(O.Z,null,"Где применить"),p.createElement(P.Z,{style:{paddingBottom:10,paddingTop:10}},p.createElement(d.ZP,{item:!0,xs:12,sm:4},p.createElement(N.e_,{label:"Точка",multiple:!0,data:this.state.points,value:this.state.point,func:this.choosePoint.bind(this)}))),p.createElement(C.Z,null,p.createElement(f.Z,{onClick:this.save.bind(this)},"Сохранить")))}}]),n}(p.Component),B=function(e){(0,o.Z)(n,e);var t=T(n);function n(){return(0,r.Z)(this,n),t.apply(this,arguments)}return(0,l.Z)(n,[{key:"shouldComponentUpdate",value:function(e){return e.it.item_id_rec!==this.props.it.item_id_rec||e.it.vendor_id_rec!==this.props.it.vendor_id_rec}},{key:"render",value:function(){var e,t,n=this.props.it;return p.createElement(_.Z,{sx:{"& td":{border:0}},hover:!0},p.createElement(v.Z,null,n.id),p.createElement(v.Z,null,n.name),p.createElement(v.Z,null,1===n.items.length?n.items[0].name:p.createElement(N.$S,{data:n.items,value:n.item_id_rec,func:this.props.changeSelect.bind(this,n.id,"item_id_rec",this.props.type)})),p.createElement(v.Z,null,null!==(e=n.items.find((function(e){return e.id===n.item_id_rec})).pq)&&void 0!==e?e:""," ",n.ei_name),p.createElement(v.Z,null,p.createElement(N.$S,{is_none:!1,data:null!==(t=n.items.find((function(e){return e.id===n.item_id_rec})).vendors)&&void 0!==t?t:[],value:n.vendor_id_rec,func:this.props.changeSelect.bind(this,n.id,"vendor_id_rec",this.props.type)})))}}]),n}(p.Component),M=function(e){(0,o.Z)(n,e);var t=T(n);function n(e){var s;return(0,r.Z)(this,n),(s=t.call(this,e)).state={items:[],cats:[],freeItems:[],search:""},s}return(0,l.Z)(n,[{key:"componentDidUpdate",value:function(e){this.props&&this.props!==e&&this.setState({cats:JSON.parse(JSON.stringify(this.props.cats)),freeItems:JSON.parse(JSON.stringify(this.props.freeItems)),items:this.props.items})}},{key:"search",value:function(e){var t,n,s;e.target.value?(t=null!==(n=e.target.value)&&void 0!==n?n:"",this.setState({search:t})):(t=null!==(s=e.target.innerText)&&void 0!==s?s:"",this.setState({search:t}));var a=this.state.cats,i=this.state.freeItems;if(""!==t||t.length>1){a.map((function(e){var n=[];e.cats.map((function(e){return e.items=e.items.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})),e.items.length||n.push(e),e})),e.cats.length===n.length&&(e.all=0)}));var r=i.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())}));this.setState({cats:a,freeItems:r})}else this.setState({cats:JSON.parse(JSON.stringify(this.props.cats)),freeItems:JSON.parse(JSON.stringify(this.props.freeItems))})}},{key:"render",value:function(){var e=this;return console.log("OrderPostRec_Table render"),p.createElement(p.Fragment,null,p.createElement(d.ZP,{item:!0,xs:12,sm:4},p.createElement(N.OU,{label:"Поиск",freeSolo:!0,multiple:!1,data:this.state.items,value:this.state.search,func:this.search.bind(this),onBlur:this.search.bind(this)})),p.createElement(d.ZP,{item:!0,xs:12,sm:4},p.createElement(f.Z,{variant:"contained",onClick:this.props.openModal.bind(this)},"Сохранить изменения")),p.createElement(d.ZP,{item:!0,xs:12,sm:12,mb:6},this.state.cats.filter((function(e){return 0!==e.all})).map((function(t,n){return p.createElement(w.Z,{key:n},p.createElement(k.Z,{expandIcon:p.createElement(I.Z,null)},p.createElement(S.Z,null,t.name)),p.createElement(x.Z,null,t.cats.filter((function(e){return 0!==e.items.length})).map((function(t,n){return p.createElement(w.Z,{key:n},p.createElement(k.Z,{expandIcon:p.createElement(I.Z,null)},p.createElement(S.Z,null,t.name)),p.createElement(x.Z,{style:{width:"100%",overflow:"scroll"}},p.createElement(y.Z,null,p.createElement(Z.Z,null,p.createElement(g.Z,null,p.createElement(_.Z,null,p.createElement(v.Z,{style:{width:"2%"}},"#"),p.createElement(v.Z,{style:{width:"30%"}},"Заготовка"),p.createElement(v.Z,{style:{width:"25%"}},"Товар"),p.createElement(v.Z,{style:{width:"13%"}},"Объем (упак.)"),p.createElement(v.Z,{style:{width:"30%"}},"Поставщик"))),p.createElement(E.Z,null,t.items.map((function(t,n){return p.createElement(B,{key:n,it:t,changeSelect:e.props.changeSelect,type:1})})))))))}))))})),0==this.state.freeItems.length?null:p.createElement(w.Z,null,p.createElement(k.Z,{expandIcon:p.createElement(I.Z,null)},p.createElement(S.Z,null,"Без категории")),p.createElement(x.Z,{style:{width:"100%",overflow:"scroll"}},p.createElement(y.Z,null,p.createElement(Z.Z,null,p.createElement(g.Z,null,p.createElement(_.Z,null,p.createElement(v.Z,{style:{width:"2%"}},"#"),p.createElement(v.Z,{style:{width:"30%"}},"Заготовка"),p.createElement(v.Z,{style:{width:"25%"}},"Товар"),p.createElement(v.Z,{style:{width:"13%"}},"Объем (упак.)"),p.createElement(v.Z,{style:{width:"30%"}},"Поставщик"))),p.createElement(E.Z,null,this.state.freeItems.map((function(t,n){return p.createElement(B,{key:n,it:t,changeSelect:e.props.changeSelect,type:2})})))))))))}}]),n}(p.Component),L=function(e){(0,o.Z)(f,e);var t,n,c,u,m=T(f);function f(e){var t;return(0,r.Z)(this,f),t=m.call(this,e),(0,i.Z)((0,a.Z)(t),"getData",(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:R.stringify({method:e,module:t.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(n)})}).then((function(e){return e.json()})).then((function(e){if(!1!==e.st||"redir"!=e.type){if(!1!==e.st||"auth"!=e.type)return setTimeout((function(){t.setState({is_load:!1})}),300),e;window.location.pathname="/auth"}else window.location.pathname="/"})).catch((function(e){console.log(e)}))})),t.state={module:"order_post_rec",module_name:"",is_load:!1,points:[],point:"0",items:[],cats:[],freeItems:[],hist:[],modalDialog:!1},t}return(0,l.Z)(f,[{key:"componentDidMount",value:(u=(0,s.Z)(h().mark((function e(){var t;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData("get_all");case 2:t=e.sent,console.log(t),this.setState({points:t.point_list,point:t.point_list[0].id,module_name:t.module_info.name,cats:t.cats,freeItems:t.items_free,hist:t.hist,items:t.items}),document.title=t.module_info.name;case 6:case"end":return e.stop()}}),e,this)}))),function(){return u.apply(this,arguments)})},{key:"changePoint",value:(c=(0,s.Z)(h().mark((function e(t){var n,s;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.target.value,e.next=3,this.getData("get_all",n);case 3:s=e.sent,this.setState({point:n,items:s.items,cats:s.cats,freeItems:s.items_free,hist:s.hist});case 5:case"end":return e.stop()}}),e,this)}))),function(e){return c.apply(this,arguments)})},{key:"openModal",value:function(){this.setState({modalDialog:!0})}},{key:"changeSelect",value:function(e,t,n,s){if(1===n){var a=this.state.cats;a.forEach((function(n){n.cats.forEach((function(n){n.items.forEach((function(n){n.id===e&&(n[t]=s.target.value)}))}))})),this.setState({cats:a})}if(2===n){var i=this.state.freeItems;i.forEach((function(n){n.id===e&&(n[t]=s.target.value)})),this.setState({freeItems:i})}}},{key:"save",value:(n=(0,s.Z)(h().mark((function e(t){var n,s=this;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={items:this.state.cats,items_free:this.state.freeItems,points:t},e.next=3,this.getData("save_edit",n);case 3:setTimeout((function(){s.update()}),300);case 4:case"end":return e.stop()}}),e,this)}))),function(e){return n.apply(this,arguments)})},{key:"update",value:(t=(0,s.Z)(h().mark((function e(){var t,n;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.state.point,e.next=3,this.getData("get_all",t);case 3:n=e.sent,this.setState({items:n.items,cats:n.cats,freeItems:n.items_free,hist:n.hist});case 5:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"render",value:function(){var e=this;return p.createElement(p.Fragment,null,p.createElement(D.Z,{style:{zIndex:99},open:this.state.is_load},p.createElement(J.Z,{color:"inherit"})),p.createElement(j,{open:this.state.modalDialog,onClose:function(){e.setState({modalDialog:!1})},points:this.state.points,save:this.save.bind(this)}),p.createElement(d.ZP,{container:!0,spacing:3},p.createElement(d.ZP,{item:!0,xs:12,sm:12},p.createElement("h1",null,this.state.module_name)),p.createElement(d.ZP,{item:!0,xs:12,sm:4},p.createElement(N.$S,{data:this.state.points,value:this.state.point,func:this.changePoint.bind(this),label:"Точка"})),p.createElement(M,{cats:this.state.cats,freeItems:this.state.freeItems,items:this.state.items,openModal:this.openModal.bind(this),changeSelect:this.changeSelect.bind(this)}),this.state.hist.length?p.createElement(d.ZP,{pb:1,container:!0,justifyContent:"center"},p.createElement(d.ZP,{item:!0,xs:10,sm:6},p.createElement(w.Z,null,p.createElement(k.Z,{expandIcon:p.createElement(I.Z,null),"aria-controls":"panel1a-content"},p.createElement(S.Z,null,"История изменений")),p.createElement(x.Z,null,this.state.hist.map((function(e,t){return p.createElement(w.Z,{key:t},p.createElement(k.Z,null,p.createElement(S.Z,{mr:8},e.date_time),p.createElement(S.Z,null,e.user_name)),p.createElement(x.Z,null,e.items.map((function(e,t){return p.createElement(y.Z,{key:t},p.createElement(Z.Z,null,p.createElement(E.Z,null,p.createElement(_.Z,{sx:{"& td":{border:0,paddingTop:0,paddingBottom:0}},hover:!0},p.createElement(v.Z,{style:{width:"30%"}},e.item_name),p.createElement(v.Z,{style:{width:"30%"}},e.pf_name),p.createElement(v.Z,{style:{width:"10%"}},e.pq),p.createElement(v.Z,{style:{width:"30%"}},e.vendor_name)))))}))))})))))):null))}}]),f}(p.Component);function U(){return p.createElement(L,null)}},4859:(e,t,n)=>{var s=n(4783)(e.id,{locals:!1});e.hot.dispose(s),e.hot.accept(void 0,s)}}]);
//# sourceMappingURL=535.8789d1ad99c0636fb115.js.map