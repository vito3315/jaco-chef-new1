"use strict";(self.webpackChunkpackage_json=self.webpackChunkpackage_json||[]).push([[224],{6224:(e,t,n)=>{n.r(t),n.d(t,{default:()=>C}),n(7643);var a=n(5861),s=n(5671),i=n(3144),r=n(7326),l=n(136),c=n(6215),m=n(1120),u=n(4942),o=n(4687),h=n.n(o),d=n(7294),_=n(30),f=n(1822),p=n(3150),g=n(6140),Z=n(3030),E=n(8561),v=n(8736),x=n(3406),b=n(3892),y=n(5705),w=n(6406);var k=n(7563),P=function(e){(0,l.Z)(D,e);var t,n,o,P,C=(o=D,P=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=(0,m.Z)(o);if(P){var n=(0,m.Z)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return(0,c.Z)(this,e)});function D(e){var t;return(0,s.Z)(this,D),t=C.call(this,e),(0,u.Z)((0,r.Z)(t),"getData",(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:k.stringify({method:e,module:t.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(n)})}).then((function(e){return e.json()})).then((function(e){if(!1!==e.st||"redir"!=e.type){if(!1!==e.st||"auth"!=e.type)return setTimeout((function(){t.setState({is_load:!1})}),300),e;window.location.pathname="/auth"}else window.location.pathname="/"})).catch((function(e){console.log(e)}))})),t.state={module:"list_fake_users",module_name:"",is_load:!1,points:[],point:[],items:[],item:[],users:[],date_start_true:"",date_end_true:"",date_start_false:"",date_end_false:"",count_orders:0,max_summ:0,is_show_claim:0,is_show_marketing:0},t}return(0,i.Z)(D,[{key:"componentDidMount",value:(n=(0,a.Z)(h().mark((function e(){var t;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData("get_all");case 2:t=e.sent,this.setState({points:t.points,items:t.items,module_name:t.module_info.name}),document.title=t.module_info.name;case 5:case"end":return e.stop()}}),e,this)}))),function(){return n.apply(this,arguments)})},{key:"getUsers",value:(t=(0,a.Z)(h().mark((function e(){var t,n;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={point:this.state.point,date_start_true:this.state.date_start_true,date_end_true:this.state.date_end_true,date_start_false:this.state.date_start_false,date_end_false:this.state.date_end_false,count_orders:this.state.count_orders,max_summ:this.state.max_summ,items:this.state.items,is_show_claim:this.state.is_show_claim,is_show_marketing:this.state.is_show_marketing},e.next=3,this.getData("get_users",t);case 3:n=e.sent,this.setState({users:n});case 5:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"changeNumber",value:function(e,t){this.setState((0,u.Z)({},e,t.target.value))}},{key:"changeItem",value:function(e,t,n){this.setState((0,u.Z)({},e,n))}},{key:"changeDateRange",value:function(e,t){var n,a,s,i;this.setState((0,u.Z)({},e,(a=""+((n=new Date(t)).getMonth()+1),s=""+n.getDate(),i=n.getFullYear(),a.length<2&&(a="0"+a),s.length<2&&(s="0"+s),[i,a,s].join("-"))))}},{key:"changeItemChecked",value:function(e,t){var n=!0===t.target.checked?1:0;this.setState((0,u.Z)({},e,n))}},{key:"render",value:function(){return d.createElement(d.Fragment,null,d.createElement(b.Z,{style:{zIndex:99},open:this.state.is_load},d.createElement(y.Z,{color:"inherit"})),d.createElement(_.ZP,{item:!0,xs:12,mb:3},d.createElement("h1",null,this.state.module_name)),d.createElement(_.ZP,{item:!0,container:!0,spacing:3,justifyContent:"center",mb:3,sx:{flexDirection:{sm:"row",xs:"column-reverse"}}},d.createElement(_.ZP,{item:!0,xs:12,sm:3,sx:{order:{sm:0,xs:1}}},d.createElement(w.Qe,{label:"Заказы от",value:this.state.date_start_true,func:this.changeDateRange.bind(this,"date_start_true")})),d.createElement(_.ZP,{item:!0,xs:12,sm:3,sx:{order:{sm:1,xs:0}}},d.createElement(w.Qe,{label:"Заказы до",value:this.state.date_end_true,func:this.changeDateRange.bind(this,"date_end_true")})),d.createElement(_.ZP,{item:!0,xs:12,sm:3,sx:{order:{sm:2,xs:2}}},d.createElement(f.Z,{variant:"contained",style:{whiteSpace:"nowrap"},onClick:this.getUsers.bind(this)},"Получить список клиентов"))),d.createElement(_.ZP,{container:!0,spacing:3,justifyContent:"center",mb:3},d.createElement(_.ZP,{item:!0,xs:12,sm:3},d.createElement(w.Qe,{label:"Без заказов от",value:this.state.date_start_false,func:this.changeDateRange.bind(this,"date_start_false")})),d.createElement(_.ZP,{item:!0,xs:12,sm:3},d.createElement(w.Qe,{label:"Без заказов до",value:this.state.date_end_false,func:this.changeDateRange.bind(this,"date_end_false")})),d.createElement(_.ZP,{item:!0,xs:12,sm:3},d.createElement(w.IA,{label:"Жалоба",value:1==parseInt(this.state.is_show_claim),func:this.changeItemChecked.bind(this,"is_show_claim")}))),d.createElement(_.ZP,{container:!0,spacing:3,justifyContent:"center",mb:3},d.createElement(_.ZP,{item:!0,xs:12,sm:3},d.createElement(w.rZ,{label:"Количество заказов",value:this.state.count_orders,type:"number",func:this.changeNumber.bind(this,"count_orders")})),d.createElement(_.ZP,{item:!0,xs:12,sm:3},d.createElement(w.rZ,{label:"От суммы",value:this.state.max_summ,type:"number",func:this.changeNumber.bind(this,"max_summ")})),d.createElement(_.ZP,{item:!0,xs:12,sm:3},d.createElement(w.IA,{label:"Реклама",value:1==parseInt(this.state.is_show_marketing),func:this.changeItemChecked.bind(this,"is_show_marketing")}))),d.createElement(_.ZP,{container:!0,spacing:3,justifyContent:"center",mb:3},d.createElement(_.ZP,{item:!0,xs:12,sm:3},d.createElement(w.e_,{label:"Точка",multiple:!0,data:this.state.points,value:this.state.point,func:this.changeItem.bind(this,"point")})),d.createElement(_.ZP,{item:!0,xs:12,sm:3},d.createElement(w.e_,{label:"Позиции в заказе",multiple:!0,data:this.state.items,value:this.state.item,func:this.changeItem.bind(this,"item")})),d.createElement(_.ZP,{item:!0,xs:12,sm:3})),this.state.users.length?d.createElement(_.ZP,{container:!0,justifyContent:"center"},d.createElement(_.ZP,{item:!0,xs:12,sm:9},d.createElement(x.Z,null,d.createElement(p.Z,null,d.createElement(E.Z,null,d.createElement(v.Z,null,d.createElement(Z.Z,{style:{width:"5%"}},"#"),d.createElement(Z.Z,{style:{width:"35%"}},"Имя"),d.createElement(Z.Z,{style:{width:"60%"}},"Телефон"))),d.createElement(g.Z,null,this.state.users.map((function(e,t){return d.createElement(v.Z,{key:t},d.createElement(Z.Z,null,t+1),d.createElement(Z.Z,null),d.createElement(Z.Z,null,e.login))}))))))):null)}}]),D}(d.Component);function C(){return d.createElement(P,null)}},7643:(e,t,n)=>{var a=n(4783)(e.id,{locals:!1});e.hot.dispose(a),e.hot.accept(void 0,a)}}]);
//# sourceMappingURL=224.91df64b7ed362b75b999.js.map