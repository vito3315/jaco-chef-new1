"use strict";(self.webpackChunkpackage_json=self.webpackChunkpackage_json||[]).push([[224],{6224:(e,t,n)=>{n.r(t),n.d(t,{default:()=>R}),n(7643);var a=n(5861),s=n(5671),r=n(3144),i=n(7326),l=n(136),c=n(6215),o=n(1120),m=n(4942),u=n(7462),h=n(4687),d=n.n(h),_=n(7294),f=n(30),p=n(1822),g=n(3150),Z=n(6140),E=n(3030),v=n(8561),b=n(8736),x=n(3406),y=n(3892),k=n(5705),w=n(9633),P=n(5620),C=n(6406);var S=_.forwardRef((function(e,t){return _.createElement(P.Z,(0,u.Z)({elevation:6,ref:t,variant:"filled"},e))})),D=n(7563),I=function(e){(0,l.Z)(I,e);var t,n,u,h,P=(u=I,h=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=(0,o.Z)(u);if(h){var n=(0,o.Z)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return(0,c.Z)(this,e)});function I(e){var t;return(0,s.Z)(this,I),t=P.call(this,e),(0,m.Z)((0,i.Z)(t),"getData",(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:D.stringify({method:e,module:t.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(n)})}).then((function(e){return e.json()})).then((function(e){if(!1!==e.st||"redir"!=e.type){if(!1!==e.st||"auth"!=e.type)return setTimeout((function(){t.setState({is_load:!1})}),300),e;window.location.pathname="/auth"}else window.location.pathname="/"})).catch((function(e){console.log(e)}))})),t.state={module:"list_fake_users",module_name:"",is_load:!1,points:[],point:[],items:[],item:[],users:[],snackbar:!1,error:"",date_start_true:"",date_end_true:"",date_start_false:"",date_end_false:"",count_orders:0,max_summ:0,is_show_claim:0,is_show_marketing:0},t}return(0,r.Z)(I,[{key:"componentDidMount",value:(n=(0,a.Z)(d().mark((function e(){var t;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData("get_all");case 2:t=e.sent,this.setState({points:t.points,items:t.items,module_name:t.module_info.name}),document.title=t.module_info.name;case 5:case"end":return e.stop()}}),e,this)}))),function(){return n.apply(this,arguments)})},{key:"getUsers",value:(t=(0,a.Z)(d().mark((function e(){var t,n;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={point:this.state.point,date_start_true:this.state.date_start_true,date_end_true:this.state.date_end_true,date_start_false:this.state.date_start_false,date_end_false:this.state.date_end_false,count_orders:this.state.count_orders,max_summ:this.state.max_summ,items:this.state.item,is_show_claim:this.state.is_show_claim,is_show_marketing:this.state.is_show_marketing},e.next=3,this.getData("get_users",t);case 3:(n=e.sent).st?this.setState({users:n.users}):this.setState({error:n.text,snackbar:!0});case 5:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"changeNumber",value:function(e,t){this.setState((0,m.Z)({},e,t.target.value))}},{key:"changeItem",value:function(e,t,n){this.setState((0,m.Z)({},e,n))}},{key:"changeDateRange",value:function(e,t){var n,a,s,r;this.setState((0,m.Z)({},e,(a=""+((n=new Date(t)).getMonth()+1),s=""+n.getDate(),r=n.getFullYear(),a.length<2&&(a="0"+a),s.length<2&&(s="0"+s),[r,a,s].join("-"))))}},{key:"changeItemChecked",value:function(e,t){var n=!0===t.target.checked?1:0;this.setState((0,m.Z)({},e,n))}},{key:"render",value:function(){var e=this;return _.createElement(_.Fragment,null,_.createElement(y.Z,{style:{zIndex:99},open:this.state.is_load},_.createElement(k.Z,{color:"inherit"})),_.createElement(w.Z,{open:this.state.snackbar,autoHideDuration:3e4,anchorOrigin:{vertical:"top",horizontal:"center"},onClose:function(){e.setState({snackbar:!1})}},_.createElement(S,{onClose:function(){e.setState({snackbar:!1})},severity:"error",sx:{width:"100%"}},this.state.error)),_.createElement(f.ZP,{item:!0,xs:12,mb:3},_.createElement("h1",null,this.state.module_name)),_.createElement(f.ZP,{item:!0,container:!0,spacing:3,justifyContent:"center",mb:3,sx:{flexDirection:{sm:"row",xs:"column-reverse"}}},_.createElement(f.ZP,{item:!0,xs:12,sm:3,sx:{order:{sm:0,xs:1}}},_.createElement(C.Qe,{label:"Делал заказ от",value:this.state.date_start_true,func:this.changeDateRange.bind(this,"date_start_true")})),_.createElement(f.ZP,{item:!0,xs:12,sm:3,sx:{order:{sm:1,xs:0}}},_.createElement(C.Qe,{label:"Делал заказ до",value:this.state.date_end_true,func:this.changeDateRange.bind(this,"date_end_true")})),_.createElement(f.ZP,{item:!0,xs:12,sm:3,sx:{order:{sm:2,xs:2}}},_.createElement(p.Z,{variant:"contained",style:{whiteSpace:"nowrap"},onClick:this.getUsers.bind(this)},"Получить список клиентов"))),_.createElement(f.ZP,{container:!0,spacing:3,justifyContent:"center",mb:3},_.createElement(f.ZP,{item:!0,xs:12,sm:3},_.createElement(C.Qe,{label:"Не заказывал от",value:this.state.date_start_false,func:this.changeDateRange.bind(this,"date_start_false")})),_.createElement(f.ZP,{item:!0,xs:12,sm:3},_.createElement(C.Qe,{label:"Не заказывал до",value:this.state.date_end_false,func:this.changeDateRange.bind(this,"date_end_false")})),_.createElement(f.ZP,{item:!0,xs:12,sm:3},_.createElement(C.IA,{label:"Жалоба",value:1==parseInt(this.state.is_show_claim),func:this.changeItemChecked.bind(this,"is_show_claim")}))),_.createElement(f.ZP,{container:!0,spacing:3,justifyContent:"center",mb:3},_.createElement(f.ZP,{item:!0,xs:12,sm:3},_.createElement(C.rZ,{label:"Количество заказов",value:this.state.count_orders,type:"number",func:this.changeNumber.bind(this,"count_orders")})),_.createElement(f.ZP,{item:!0,xs:12,sm:3},_.createElement(C.rZ,{label:"От суммы",value:this.state.max_summ,type:"number",func:this.changeNumber.bind(this,"max_summ")})),_.createElement(f.ZP,{item:!0,xs:12,sm:3},_.createElement(C.IA,{label:"Реклама",value:1==parseInt(this.state.is_show_marketing),func:this.changeItemChecked.bind(this,"is_show_marketing")}))),_.createElement(f.ZP,{container:!0,spacing:3,justifyContent:"center",mb:3},_.createElement(f.ZP,{item:!0,xs:12,sm:3},_.createElement(C.e_,{label:"Точки",multiple:!0,data:this.state.points,value:this.state.point,func:this.changeItem.bind(this,"point")})),_.createElement(f.ZP,{item:!0,xs:12,sm:3},_.createElement(C.e_,{label:"Позиции в заказе",multiple:!0,data:this.state.items,value:this.state.item,func:this.changeItem.bind(this,"item")})),_.createElement(f.ZP,{item:!0,xs:12,sm:3})),this.state.users.length?_.createElement(f.ZP,{container:!0,justifyContent:"center"},_.createElement(f.ZP,{item:!0,xs:12,sm:9},_.createElement(x.Z,null,_.createElement(g.Z,null,_.createElement(v.Z,null,_.createElement(b.Z,null,_.createElement(E.Z,{style:{width:"5%"}},"#"),_.createElement(E.Z,{style:{width:"35%"}},"Имя"),_.createElement(E.Z,{style:{width:"60%"}},"Телефон"))),_.createElement(Z.Z,null,this.state.users.map((function(e,t){return _.createElement(b.Z,{key:t},_.createElement(E.Z,null,t+1),_.createElement(E.Z,null,e.name),_.createElement(E.Z,null,e.login))}))))))):null)}}]),I}(_.Component);function R(){return _.createElement(I,null)}},7643:(e,t,n)=>{var a=n(4783)(e.id,{locals:!1});e.hot.dispose(a),e.hot.accept(void 0,a)}}]);
//# sourceMappingURL=224.8637044e8303fd80e172.js.map