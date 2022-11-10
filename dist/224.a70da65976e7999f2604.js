"use strict";(self.webpackChunkpackage_json=self.webpackChunkpackage_json||[]).push([[224],{6224:(e,t,n)=>{n.r(t),n.d(t,{default:()=>H}),n(7643);var a=n(5861),s=n(4942),i=n(5671),l=n(3144),r=n(7326),c=n(136),o=n(6215),m=n(1120),h=n(7462),u=n(4687),d=n.n(u),p=n(7294),f=n(30),Z=n(1822),_=n(1647),E=n(130),x=n(594),w=n(9620),g=n(2962),y=n(4498),v=n(7745),b=n(3150),S=n(6140),k=n(3030),W=n(8561),P=n(8736),D=n(3406),C=n(8727),I=n(808),R=n(231),j=n(3508),z=n(3892),M=n(5705),N=n(9633),O=n(5620),Q=n(6406);function T(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=(0,m.Z)(e);if(t){var s=(0,m.Z)(this).constructor;n=Reflect.construct(a,arguments,s)}else n=a.apply(this,arguments);return(0,o.Z)(this,n)}}var A=p.forwardRef((function(e,t){return p.createElement(O.Z,(0,h.Z)({elevation:6,ref:t,variant:"filled"},e))})),B=n(7563),U=function(e){(0,c.Z)(n,e);var t=T(n);function n(e){var a;return(0,i.Z)(this,n),(a=t.call(this,e)).handleResize=a.handleResize.bind((0,r.Z)(a)),a.state={item:{},fullScreen:!1},a}return(0,l.Z)(n,[{key:"componentDidUpdate",value:function(e){this.props.event&&this.props.event!==e.event&&this.setState({item:this.props.event})}},{key:"componentDidMount",value:function(){this.handleResize(),window.addEventListener("resize",this.handleResize)}},{key:"handleResize",value:function(){window.innerWidth<601?this.setState({fullScreen:!0}):this.setState({fullScreen:!1})}},{key:"onClose",value:function(){this.setState({item:this.props.event?this.props.event:[]}),this.props.onClose()}},{key:"render",value:function(){var e=this;return p.createElement(w.Z,{open:this.props.open,onClose:this.onClose.bind(this),fullScreen:this.state.fullScreen,fullWidth:!0,maxWidth:"lg","aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},p.createElement(v.Z,{className:"button"},p.createElement(_.Z,{style:{fontWeight:"bold"}},"Информация о клиенте"),this.state.fullScreen?p.createElement(E.Z,{onClick:this.onClose.bind(this),style:{cursor:"pointer"}},p.createElement(x.Z,null)):null),p.createElement(y.Z,{style:{paddingTop:10,paddingBottom:10}},p.createElement(f.ZP,{container:!0,spacing:3,justifyContent:"center",mb:3},p.createElement(f.ZP,{item:!0,xs:12,sm:3,display:"flex",flexDirection:"column",alignItems:"center"},p.createElement(_.Z,{sx:{fontWeight:"bold",whiteSpace:"nowrap"}},"Имя"),p.createElement(_.Z,{sx:{fontWeight:"normal",whiteSpace:"nowrap"}},this.state.item&&"0"!==this.state.item.name?this.state.item.name:"не указано")),p.createElement(f.ZP,{item:!0,xs:12,sm:3,display:"flex",flexDirection:"column",alignItems:"center"},p.createElement(_.Z,{sx:{whiteSpace:"nowrap",fontWeight:"bold"}},"Регистрация"),p.createElement(_.Z,{sx:{fontWeight:"normal",whiteSpace:"nowrap"}},this.state.item&&this.state.item.date_reg?this.state.item.date_reg:"не указано")),p.createElement(f.ZP,{item:!0,xs:12,sm:3,display:"flex",flexDirection:"column",alignItems:"center"},p.createElement(_.Z,{sx:{fontWeight:"bold",whiteSpace:"nowrap"}},"День рождения"),p.createElement(_.Z,{sx:{fontWeight:"normal",whiteSpace:"nowrap"}},this.state.item&&this.state.item.date_bir?this.state.item.date_bir:"не указано")),p.createElement(f.ZP,{item:!0,xs:12,sm:3,display:"flex",flexDirection:"column",alignItems:"center"},p.createElement(_.Z,{sx:{whiteSpace:"nowrap",fontWeight:"bold"}},"Согласие на рассылку"),p.createElement(_.Z,{sx:{fontWeight:"normal",whiteSpace:"nowrap"}},this.state.item?"0"===this.state.item.spam?"нет":"есть":"нет")),p.createElement(f.ZP,{item:!0,xs:12,sm:4,display:"flex",flexDirection:"column",alignItems:"center"},p.createElement(_.Z,{sx:{fontWeight:"bold",whiteSpace:"nowrap"}},"Общее количество заказов"),p.createElement(_.Z,{sx:{fontWeight:"normal",whiteSpace:"nowrap"}},this.state.item?this.state.item.all_count_order:"0")),p.createElement(f.ZP,{item:!0,xs:12,sm:4,display:"flex",flexDirection:"column",alignItems:"center"},p.createElement(_.Z,{sx:{fontWeight:"bold",whiteSpace:"nowrap"}},"Количество заказов на доставку"),p.createElement(_.Z,{sx:{fontWeight:"normal",whiteSpace:"nowrap"}},this.state.item?this.state.item.count_dev:"0")),p.createElement(f.ZP,{item:!0,xs:12,sm:4,display:"flex",flexDirection:"column",alignItems:"center"},p.createElement(_.Z,{sx:{fontWeight:"bold",whiteSpace:"nowrap"}},"Количество заказов на самовывоз"),p.createElement(_.Z,{sx:{fontWeight:"normal",whiteSpace:"nowrap"}},this.state.item?this.state.item.count_pic:"0")),p.createElement(f.ZP,{item:!0,xs:12,sm:4,display:"flex",flexDirection:"column",alignItems:"center"},p.createElement(_.Z,{sx:{fontWeight:"bold",whiteSpace:"nowrap"}},"Переодичность заказов"),p.createElement(_.Z,{sx:{fontWeight:"normal",whiteSpace:"nowrap"}},this.state.item?this.state.item.order_per_day:"0")),p.createElement(f.ZP,{item:!0,xs:12,sm:4,display:"flex",flexDirection:"column",alignItems:"center"},p.createElement(_.Z,{sx:{fontWeight:"bold",whiteSpace:"nowrap"}},"Первый промик после регистрации"),p.createElement(_.Z,{sx:{fontWeight:"normal",whiteSpace:"nowrap"}},this.state.item&&""!==this.state.item.promo_name?this.state.item.promo_name:"не было"))),this.state.item.orders?p.createElement(f.ZP,{item:!0,xs:12,sm:4,mb:3},p.createElement(C.Z,null,p.createElement(I.Z,{expandIcon:p.createElement(j.Z,null),"aria-controls":"panel1a-content"},p.createElement(_.Z,{style:{fontWeight:"bold"}},"Заказы")),p.createElement(R.Z,null,this.state.fullScreen?null:p.createElement(C.Z,{expanded:!0},p.createElement(I.Z,{expandIcon:p.createElement(j.Z,{sx:{opacity:0}}),"aria-controls":"panel1a-content"},p.createElement(f.ZP,{item:!0,xs:!0,display:"flex",flexDirection:"row"},p.createElement(_.Z,{style:{width:"15%"},noWrap:!0},"Номер"),p.createElement(_.Z,{style:{width:"25%"},noWrap:!0},"Дата/время"),p.createElement(_.Z,{style:{width:"15%"},noWrap:!0},"Точка"),p.createElement(_.Z,{style:{width:"15%"},noWrap:!0},"Сумма"),p.createElement(_.Z,{style:{width:"15%"},noWrap:!0},"Промик"),p.createElement(_.Z,{style:{width:"15%"},noWrap:!0},"Тип")))),this.state.item.orders.map((function(t,n){var a,s;return p.createElement(C.Z,{key:n},p.createElement(I.Z,{expandIcon:p.createElement(j.Z,null),"aria-controls":"panel1a-content"},p.createElement(f.ZP,{item:!0,xs:!0,display:"flex",sx:{flexDirection:{sm:"row",xs:"column"}}},p.createElement(_.Z,{style:{width:"15%"},sx:{noWrap:{sm:!0,xs:!1},whiteSpace:{xs:"nowrap"}}},e.state.fullScreen?"Номер: ".concat(t.order_id):t.order_id),p.createElement(_.Z,{style:{width:"25%"},sx:{noWrap:{sm:!0,xs:!1},whiteSpace:{xs:"nowrap"}}},e.state.fullScreen?"Дата: ".concat(t.date,"/").concat(t.time):"".concat(t.date,"/").concat(t.time)),p.createElement(_.Z,{style:{width:"15%"},sx:{noWrap:{sm:!0,xs:!1},whiteSpace:{xs:"nowrap"}}},e.state.fullScreen?"Точка: ".concat(t.addr):t.addr),p.createElement(_.Z,{style:{width:"15%"},sx:{noWrap:{sm:!0,xs:!1},whiteSpace:{xs:"nowrap"}}},e.state.fullScreen?"Сумма: ".concat(t.summ):t.summ),p.createElement(_.Z,{style:{width:"15%"},sx:{noWrap:{sm:!0,xs:!1},whiteSpace:{xs:"nowrap"}}},e.state.fullScreen?"Промик: ".concat(null!==(a=t.promo_name)&&void 0!==a?a:"Нет"):null!==(s=t.promo_name)&&void 0!==s?s:"Нет"),p.createElement(_.Z,{style:{width:"15%"},sx:{noWrap:{sm:!0,xs:!1},whiteSpace:{xs:"nowrap"}}},e.state.fullScreen?"Тип: ".concat(""===t.xy?"Самовывоз":"Доставка"):""===t.xy?"Самовывоз":"Доставка"))),p.createElement(R.Z,{style:{width:"100%",overflow:"scroll"}},p.createElement(b.Z,null,p.createElement(W.Z,null,p.createElement(P.Z,null,p.createElement(k.Z,null,"Наименование"),p.createElement(k.Z,null,"Количество"))),p.createElement(S.Z,null,t.items?t.items.map((function(e,t){return p.createElement(P.Z,{key:t},p.createElement(k.Z,null,e.name),p.createElement(k.Z,null,e.count))})):null))))}))))):null),p.createElement(g.Z,null,p.createElement(Z.Z,{style:{color:"#DC143C"},onClick:this.onClose.bind(this)},"Закрыть")))}}]),n}(p.Component),F=function(e){(0,c.Z)(h,e);var t,n,o,m=T(h);function h(e){var t;return(0,i.Z)(this,h),t=m.call(this,e),(0,s.Z)((0,r.Z)(t),"getData",(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:B.stringify({method:e,module:t.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(n)})}).then((function(e){return e.json()})).then((function(e){if(!1!==e.st||"redir"!=e.type){if(!1!==e.st||"auth"!=e.type)return setTimeout((function(){t.setState({is_load:!1})}),300),e;window.location.pathname="/auth"}else window.location.pathname="/"})).catch((function(e){console.log(e)}))})),t.state={module:"list_fake_users",module_name:"",is_load:!1,points:[],point:[],items:[],item:[],users:[],snackbar:!1,error:"",date_start_true:"",date_end_true:"",date_start_false:"",date_end_false:"",count_orders:0,max_summ:0,is_show_claim:0,is_show_claim_last:0,is_show_marketing:0,modalDialog:!1,user:null},t}return(0,l.Z)(h,[{key:"componentDidMount",value:(o=(0,a.Z)(d().mark((function e(){var t;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData("get_all");case 2:t=e.sent,this.setState({points:t.points,items:t.items,module_name:t.module_info.name}),document.title=t.module_info.name;case 5:case"end":return e.stop()}}),e,this)}))),function(){return o.apply(this,arguments)})},{key:"getUsers",value:(n=(0,a.Z)(d().mark((function e(){var t,n;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={point:this.state.point,date_start_true:this.state.date_start_true,date_end_true:this.state.date_end_true,date_start_false:this.state.date_start_false,date_end_false:this.state.date_end_false,count_orders:this.state.count_orders,max_summ:this.state.max_summ,items:this.state.item,is_show_claim:this.state.is_show_claim,is_show_claim_last:this.state.is_show_claim_last,is_show_marketing:this.state.is_show_marketing},e.next=3,this.getData("get_users",t);case 3:(n=e.sent).st?this.setState({users:n.users}):this.setState({error:n.text,snackbar:!0});case 5:case"end":return e.stop()}}),e,this)}))),function(){return n.apply(this,arguments)})},{key:"changeNumber",value:function(e,t){this.setState((0,s.Z)({},e,t.target.value))}},{key:"changeItem",value:function(e,t,n){this.setState((0,s.Z)({},e,n))}},{key:"changeDateRange",value:function(e,t){var n,a,i,l;this.setState((0,s.Z)({},e,t?(a=""+((n=new Date(t)).getMonth()+1),i=""+n.getDate(),l=n.getFullYear(),a.length<2&&(a="0"+a),i.length<2&&(i="0"+i),[l,a,i].join("-")):""))}},{key:"changeItemChecked",value:function(e,t){var n=!0===t.target.checked?1:0;this.setState((0,s.Z)({},e,n))}},{key:"openModal",value:(t=(0,a.Z)(d().mark((function e(t){var n,a,s,i,l;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.state.date_start_true,a=this.state.date_end_true,s=this.state.point,i={client_id:t.client_id,date_start_true:n,date_end_true:a,point:s},e.next=6,this.getData("get_one",i);case 6:(l=e.sent).st?this.setState({modalDialog:!0,user:l.user}):this.setState({error:l.text,snackbar:!0});case 8:case"end":return e.stop()}}),e,this)}))),function(e){return t.apply(this,arguments)})},{key:"render",value:function(){var e=this;return p.createElement(p.Fragment,null,p.createElement(z.Z,{style:{zIndex:99},open:this.state.is_load},p.createElement(M.Z,{color:"inherit"})),p.createElement(N.Z,{open:this.state.snackbar,autoHideDuration:3e4,anchorOrigin:{vertical:"top",horizontal:"center"},onClose:function(){e.setState({snackbar:!1})}},p.createElement(A,{onClose:function(){e.setState({snackbar:!1})},severity:"error",sx:{width:"100%"}},this.state.error)),p.createElement(U,{open:this.state.modalDialog,onClose:function(){e.setState({modalDialog:!1})},event:this.state.user}),p.createElement(f.ZP,{item:!0,xs:12,mb:3},p.createElement("h1",null,this.state.module_name)),p.createElement(f.ZP,{item:!0,container:!0,spacing:3,justifyContent:"center",mb:3,sx:{flexDirection:{sm:"row",xs:"column-reverse"}}},p.createElement(f.ZP,{item:!0,xs:12,sm:3,sx:{order:{sm:0,xs:1}}},p.createElement(Q.Qe,{label:"Делал заказ от",value:this.state.date_start_true,func:this.changeDateRange.bind(this,"date_start_true")})),p.createElement(f.ZP,{item:!0,xs:12,sm:3,sx:{order:{sm:1,xs:0}}},p.createElement(Q.Qe,{label:"Делал заказ до",value:this.state.date_end_true,func:this.changeDateRange.bind(this,"date_end_true")})),p.createElement(f.ZP,{item:!0,xs:12,sm:3,sx:{order:{sm:2,xs:2}}},p.createElement(Z.Z,{variant:"contained",style:{whiteSpace:"nowrap"},onClick:this.getUsers.bind(this)},"Получить список клиентов"))),p.createElement(f.ZP,{container:!0,spacing:3,justifyContent:"center",mb:3},p.createElement(f.ZP,{item:!0,xs:12,sm:3},p.createElement(Q.Qe,{label:"Не заказывал от",value:this.state.date_start_false,func:this.changeDateRange.bind(this,"date_start_false")})),p.createElement(f.ZP,{item:!0,xs:12,sm:3},p.createElement(Q.Qe,{label:"Не заказывал до",value:this.state.date_end_false,func:this.changeDateRange.bind(this,"date_end_false")})),p.createElement(f.ZP,{item:!0,xs:12,sm:3},p.createElement(Q.IA,{label:"Была оформлена ошибка на заказ",value:1==parseInt(this.state.is_show_claim),func:this.changeItemChecked.bind(this,"is_show_claim")}))),p.createElement(f.ZP,{container:!0,spacing:3,justifyContent:"center",mb:3},p.createElement(f.ZP,{item:!0,xs:12,sm:3},p.createElement(Q.rZ,{label:"Количество заказов",value:this.state.count_orders,type:"number",func:this.changeNumber.bind(this,"count_orders")})),p.createElement(f.ZP,{item:!0,xs:12,sm:3},p.createElement(Q.rZ,{label:"От суммы",value:this.state.max_summ,type:"number",func:this.changeNumber.bind(this,"max_summ")})),p.createElement(f.ZP,{item:!0,xs:12,sm:3},p.createElement(Q.IA,{label:"Была оформлена ошибка на последний заказ",value:1==parseInt(this.state.is_show_claim_last),func:this.changeItemChecked.bind(this,"is_show_claim_last")}))),p.createElement(f.ZP,{container:!0,spacing:3,justifyContent:"center",mb:3},p.createElement(f.ZP,{item:!0,xs:12,sm:3},p.createElement(Q.e_,{label:"Точки",multiple:!0,data:this.state.points,value:this.state.point,func:this.changeItem.bind(this,"point")})),p.createElement(f.ZP,{item:!0,xs:12,sm:3},p.createElement(Q.e_,{label:"Позиции в заказе",multiple:!0,data:this.state.items,value:this.state.item,func:this.changeItem.bind(this,"item")})),p.createElement(f.ZP,{item:!0,xs:12,sm:3},p.createElement(Q.IA,{label:"Подписка на рекламную рассылку",value:1==parseInt(this.state.is_show_marketing),func:this.changeItemChecked.bind(this,"is_show_marketing")}))),this.state.users.length?p.createElement(f.ZP,{container:!0,justifyContent:"center"},p.createElement(f.ZP,{item:!0,xs:12,sm:9},p.createElement(D.Z,null,p.createElement(b.Z,null,p.createElement(W.Z,null,p.createElement(P.Z,null,p.createElement(k.Z,{style:{width:"5%"}},"#"),p.createElement(k.Z,{style:{width:"35%"}},"Имя"),p.createElement(k.Z,{style:{width:"60%"}},"Телефон"))),p.createElement(S.Z,null,this.state.users.map((function(t,n){return p.createElement(P.Z,{key:n,onClick:e.openModal.bind(e,t),style:{cursor:"pointer"}},p.createElement(k.Z,null,n+1),p.createElement(k.Z,null,t.name),p.createElement(k.Z,null,t.login))}))))))):null)}}]),h}(p.Component);function H(){return p.createElement(F,null)}},7643:(e,t,n)=>{var a=n(4783)(e.id,{locals:!1});e.hot.dispose(a),e.hot.accept(void 0,a)}}]);
//# sourceMappingURL=224.a70da65976e7999f2604.js.map