(self.webpackChunkreact_ssr=self.webpackChunkreact_ssr||[]).push([[179],{5152:(e,t,n)=>{var a=n(7227).Home,r=n(1979).LiveOrders,s=n(8433).Auth,o=n(9546).Reg;e.exports=[{path:"/",exact:!0,component:a,title:"Главная",code:200},{path:"/live_orders",exact:!0,component:r,title:"Оформленные заказы",code:200},{path:"/auth",exact:!0,component:s,title:"Авторизация",code:200},{path:"/registration",exact:!0,component:o,title:"Регистрация",code:200}]},8433:(e,t,n)=>{"use strict";n.r(t),n.d(t,{Auth:()=>T});var a=n(5861),r=n(5671),s=n(3144),o=n(7326),i=n(136),l=n(2963),c=n(1120),u=n(4942),m=n(7757),p=n.n(m),d=n(7294),h=n(5977),f=n(3901),g=n(282),Z=n(8286),y=n(1749),E=n(9760),v=n(2663),w=n(6856),x=n(9525),_=n(7212),b=n(6083),k=n(2692),S=n(5477);var C=n(7563),R=(0,E.Z)((function(e){return{paper:{display:"flex",flexDirection:"column",alignItems:"center"},avatar:{borderRadius:0,width:"100%",height:150,margin:0,backgroundColor:"#fff"},avatar2:{borderRadius:0,width:"100%",height:130,margin:0,backgroundColor:"#fff"},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)},textLink:{color:"#c03"}}})),D=function(e){(0,i.Z)(D,e);var t,n,m,h,E,R=(h=D,E=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=(0,c.Z)(h);if(E){var n=(0,c.Z)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return(0,l.Z)(this,e)});function D(e){var t;return(0,r.Z)(this,D),t=R.call(this,e),(0,u.Z)((0,o.Z)(t),"getData",(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:C.stringify({method:e,module:t.state.module,version:2,login:"+79879340391",data:JSON.stringify(n)})}).then((function(e){return e.json()})).then((function(e){if(!1!==e.st||"redir"!=e.type){if(!1!==e.st||"auth"!=e.type)return setTimeout((function(){t.setState({is_load:!1})}),300),e;t.state.history.push("/auth")}else t.state.history.push("/")})).catch((function(e){console.log(e)}))})),t.state={classes:t.props.classes,history:t.props.history,module:"auth",module_name:"",is_load:!1,modalDialog:!1,dialogTitle:"",dialogText:""},t}return(0,s.Z)(D,[{key:"componentDidMount",value:(m=(0,a.Z)(p().mark((function e(){return p().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)}))),function(){return m.apply(this,arguments)})},{key:"updateData",value:(n=(0,a.Z)(p().mark((function e(){var t,n;return p().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={point_id:this.state.point,showReady:!0===this.state.showReady?1:0},e.next=3,this.getData("get_orders",t);case 3:n=e.sent,this.setState({read:n.read,onstol:n.onstol,ordersQueue:n.prestol_new});case 5:case"end":return e.stop()}}),e,this)}))),function(){return n.apply(this,arguments)})},{key:"auth",value:(t=(0,a.Z)(p().mark((function e(){var t,n,a=this;return p().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={login:document.getElementById("phone").value,pwd:document.getElementById("password").value},e.next=3,this.getData("auth",t);case 3:n=e.sent,console.log(n),!1===n.st?setTimeout((function(){a.setState({modalDialog:!0,dialogTitle:"Предупреждение",dialogText:n.text})}),500):(localStorage.setItem("token",n.token),setTimeout((function(){window.location.pathname="/"}),300));case 6:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"render",value:function(){var e=this;return d.createElement(d.Fragment,null,d.createElement(k.Z,{className:this.state.classes.backdrop,open:this.state.is_load},d.createElement(S.Z,{color:"inherit"})),d.createElement(v.Z,{open:this.state.modalDialog,onClose:function(){e.setState({modalDialog:!1})},"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},d.createElement(b.Z,{id:"alert-dialog-title"},this.state.dialogTitle),d.createElement(x.Z,null,d.createElement(_.Z,{id:"alert-dialog-description"},this.state.dialogText)),d.createElement(w.Z,null,d.createElement(g.Z,{onClick:function(){e.setState({modalDialog:!1})},color:"primary",autoFocus:!0},"Хорошо"))),d.createElement(y.Z,{container:!0,spacing:3,direction:"row",justifyContent:"center",alignItems:"center"},d.createElement(y.Z,{item:!0,xs:12,sm:6,md:6,lg:4,xl:3},d.createElement("div",{className:this.state.classes.paper},d.createElement(f.Z,{className:this.state.classes.avatar},d.createElement("img",{alt:"Жако доставка роллов и пиццы",src:"../assets/img_other/Favikon.png",style:{height:"100%"}})),d.createElement("form",{className:this.state.classes.form,noValidate:!0},d.createElement(Z.Z,{variant:"outlined",margin:"normal",size:"small",required:!0,fullWidth:!0,id:"phone",label:"Номер телефона",name:"phone",autoComplete:"phone",autoFocus:!0}),d.createElement(Z.Z,{variant:"outlined",margin:"normal",size:"small",required:!0,fullWidth:!0,name:"password",label:"Пароль",type:"password",id:"password",autoComplete:"current-password"}),d.createElement(g.Z,{fullWidth:!0,variant:"contained",color:"primary",className:this.state.classes.submit,onClick:this.auth.bind(this)},"Войти"),d.createElement(y.Z,{container:!0},d.createElement(y.Z,{item:!0,xs:!0},d.createElement("a",{href:"/registration",className:this.state.classes.textLink},"Восстановить пароль"))))))))}}]),D}(d.Component);function T(){var e=R(),t=(0,h.k6)();return d.createElement(D,{classes:e,history:t})}},7227:(e,t,n)=>{"use strict";n.r(t),n.d(t,{Home:()=>w});var a=n(5861),r=n(5671),s=n(3144),o=n(7326),i=n(136),l=n(2963),c=n(1120),u=n(4942),m=n(7757),p=n.n(m),d=n(7294),h=n(9760),f=n(1749),g=n(2692),Z=n(5477);var y=n(7563),E=(0,h.Z)((function(e){return{formControl:{width:"100%"},selectEmpty:{marginTop:e.spacing(2)},backdrop:{zIndex:e.zIndex.drawer+1,color:"#fff"}}})),v=function(e){(0,i.Z)(E,e);var t,n,m,h=(n=E,m=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=(0,c.Z)(n);if(m){var a=(0,c.Z)(this).constructor;e=Reflect.construct(t,arguments,a)}else e=t.apply(this,arguments);return(0,l.Z)(this,e)});function E(e){var t;return(0,r.Z)(this,E),t=h.call(this,e),(0,u.Z)((0,o.Z)(t),"getData",(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:y.stringify({method:e,module:t.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(n)})}).then((function(e){return e.json()})).then((function(e){return setTimeout((function(){t.setState({is_load:!1})}),300),e})).catch((function(e){console.log(e)}))})),t.state={classes:t.props.classes,module:"home",module_name:"",is_load:!1,points:[],point:"0",showReady:!1,read:[],onstol:[],ordersQueue:[]},t}return(0,s.Z)(E,[{key:"componentDidMount",value:(t=(0,a.Z)(p().mark((function e(){return p().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)}))),function(){return t.apply(this,arguments)})},{key:"render",value:function(){return d.createElement(d.Fragment,null,d.createElement(g.Z,{className:this.state.classes.backdrop,open:this.state.is_load},d.createElement(Z.Z,{color:"inherit"})),d.createElement(f.Z,{container:!0,spacing:3},d.createElement(f.Z,{item:!0,xs:12,sm:12},d.createElement("h1",null,this.state.module_name)),d.createElement(f.Z,{item:!0,xs:12,sm:12,style:{height:"100vh"}})))}}]),E}(d.Component);function w(){var e=E();return d.createElement(v,{classes:e})}},1979:(e,t,n)=>{"use strict";n.r(t),n.d(t,{LiveOrders:()=>L});var a=n(5861),r=n(5671),s=n(3144),o=n(7326),i=n(136),l=n(2963),c=n(1120),u=n(4942),m=n(7757),p=n.n(m),d=n(7294),h=n(9760),f=n(1749),g=n(282),Z=n(5977),y=n(2302),E=n(9613),v=n(8222),w=n(6847),x=n(3750),_=n(7394),b=n(9895),k=n(2692),S=n(5477),C=n(3700),R=n(5639),D=n(4436),T=n(3889),O=n(6562),I=n(553),N=n(6653);function P(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=(0,c.Z)(e);if(t){var r=(0,c.Z)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return(0,l.Z)(this,n)}}var B=function(e){(0,i.Z)(n,e);var t=P(n);function n(e){var a;return(0,r.Z)(this,n),(a=t.call(this,e)).state={classes:a.props.classes},a}return(0,s.Z)(n,[{key:"render",value:function(){return d.createElement(D.Z,{size:"small",variant:"outlined",className:this.state.classes.formControl},d.createElement(C.Z,{id:"demo-simple-select-outlined-label"},this.props.label),d.createElement(T.Z,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:this.props.value,onChange:this.props.func,label:this.props.label,size:"small"},d.createElement(R.Z,{value:""},d.createElement("em",null,"None")),this.props.data.map((function(e,t){return d.createElement(R.Z,{key:t,value:e.id},e.name)}))))}}]),n}(d.PureComponent),j=function(e){(0,i.Z)(n,e);var t=P(n);function n(e){var a;return(0,r.Z)(this,n),(a=t.call(this,e)).state={classes:a.props.classes},a}return(0,s.Z)(n,[{key:"render",value:function(){return d.createElement(O.Z,{row:!0},d.createElement(I.Z,{control:d.createElement(N.Z,{checked:this.props.value,onChange:this.props.func,color:"primary"}),label:this.props.label}))}}]),n}(d.PureComponent);var F=n(7563),W=(0,h.Z)((function(e){return{formControl:{width:"100%"},selectEmpty:{marginTop:e.spacing(2)}}})),z=function(e){(0,i.Z)(C,e);var t,n,m,h,Z=(m=C,h=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=(0,c.Z)(m);if(h){var n=(0,c.Z)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return(0,l.Z)(this,e)});function C(e){var t;return(0,r.Z)(this,C),t=Z.call(this,e),(0,u.Z)((0,o.Z)(t),"getData",(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:F.stringify({method:e,module:t.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(n)})}).then((function(e){return e.json()})).then((function(e){if(!1!==e.st||"redir"!=e.type){if(!1!==e.st||"auth"!=e.type)return setTimeout((function(){t.setState({is_load:!1})}),300),e;window.location.pathname="/auth"}else t.state.history.push("/")})).catch((function(e){console.log(e)}))})),t.state={classes:t.props.classes,history:t.props.history,module:"live_orders",module_name:"",is_load:!1,points:[],point:"0",showReady:!1,read:[],onstol:[],ordersQueue:[]},t}return(0,s.Z)(C,[{key:"componentDidMount",value:(n=(0,a.Z)(p().mark((function e(){var t,n=this;return p().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData("get_all");case 2:t=e.sent,this.setState({points:t.point_list,point:t.point_list[0].id,module_name:t.module_info.name}),document.title=t.module_info.name,setTimeout((function(){n.updateData()}),100);case 6:case"end":return e.stop()}}),e,this)}))),function(){return n.apply(this,arguments)})},{key:"changePoint",value:function(e){var t=this,n=e.target.value;this.setState({point:n}),setTimeout((function(){t.updateData()}),50)}},{key:"changeCheckOrders",value:function(e){var t=e.target.checked;this.setState({showReady:t})}},{key:"updateData",value:(t=(0,a.Z)(p().mark((function e(){var t,n;return p().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={point_id:this.state.point,showReady:!0===this.state.showReady?1:0},e.next=3,this.getData("get_orders",t);case 3:n=e.sent,this.setState({read:n.read,onstol:n.onstol,ordersQueue:n.prestol_new});case 5:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"render",value:function(){return d.createElement(d.Fragment,null,d.createElement(k.Z,{className:this.state.classes.backdrop,open:this.state.is_load},d.createElement(S.Z,{color:"inherit"})),d.createElement(f.Z,{container:!0,spacing:3},d.createElement(f.Z,{item:!0,xs:12,sm:12},d.createElement("h1",null,this.state.module_name)),this.state.points.length>0?d.createElement(d.Fragment,null,d.createElement(f.Z,{item:!0,xs:6,sm:6},d.createElement(B,{classes:this.state.classes,data:this.state.points,value:this.state.point,func:this.changePoint.bind(this),label:"Точка"})),d.createElement(f.Z,{item:!0,xs:6,sm:6},d.createElement(g.Z,{variant:"contained",onClick:this.updateData.bind(this)},"Обновить данные")),d.createElement(f.Z,{item:!0,xs:12,sm:12},d.createElement(j,{classes:this.state.classes,value:this.state.showReady,func:this.changeCheckOrders.bind(this),label:"Показывать готовые"}))):null,d.createElement(f.Z,{item:!0,xs:12,sm:12},d.createElement(w.Z,{component:b.Z},d.createElement(y.Z,{"aria-label":"a dense table"},d.createElement(x.Z,null,d.createElement(_.Z,null,d.createElement(v.Z,null,"#"),d.createElement(v.Z,null,"Тип"),d.createElement(v.Z,null,"Время заказа"),d.createElement(v.Z,null,"Время предзакза"),d.createElement(v.Z,null,"Время выхода на стол"),d.createElement(v.Z,null,"Во сколько собрали"),d.createElement(v.Z,null,"Закрыли"),d.createElement(v.Z,null,"Приготовили"),d.createElement(v.Z,null,"Отдали"),d.createElement(v.Z,null,"Обещали"),d.createElement(v.Z,null,"Статус"),d.createElement(v.Z,null,"Стол"))),d.createElement(E.Z,null,this.state.read.map((function(e,t){return d.createElement(_.Z,{key:t},d.createElement(v.Z,null,e.id),d.createElement(v.Z,null,e.type_order),d.createElement(v.Z,null,1==parseInt(e.preorder)?"":e.date_time_order),d.createElement(v.Z,null,1==parseInt(e.preorder)?e.date_time_preorder_:""),d.createElement(v.Z,null,e.unix_start_stol_or),d.createElement(v.Z,null,e.give_data_time_),d.createElement(v.Z,null,e.close_date_time_order),d.createElement(v.Z,{style:{backgroundColor:1==parseInt(e.type_)?"":e.color}},e.time_),d.createElement(v.Z,{style:{backgroundColor:1!=parseInt(e.type_)?"":e.color}},e.test_time),d.createElement(v.Z,null,0==parseInt(e.preorder)?e.unix_time_to_client:""),d.createElement(v.Z,null,e.status),d.createElement(v.Z,null,e.stol_sborki))})),this.state.onstol.map((function(e,t){return d.createElement(_.Z,{key:t,style:{backgroundColor:"yellow"}},d.createElement(v.Z,null,e.id),d.createElement(v.Z,null,e.type_order),d.createElement(v.Z,null,1==parseInt(e.preorder)?"":e.date_time_order),d.createElement(v.Z,null,1==parseInt(e.preorder)?e.date_time_preorder_:""),d.createElement(v.Z,null,e.unix_start_stol_or),d.createElement(v.Z,null),d.createElement(v.Z,null),d.createElement(v.Z,null),d.createElement(v.Z,null),d.createElement(v.Z,null,0==parseInt(e.preorder)?e.unix_time_to_client:""),d.createElement(v.Z,null,e.status),d.createElement(v.Z,null,e.stol_sborki))}))))),d.createElement(w.Z,{component:b.Z},d.createElement(y.Z,{"aria-label":"a dense table"},d.createElement(x.Z,null,d.createElement(_.Z,null,d.createElement(v.Z,null,"#"),d.createElement(v.Z,null,"Пред"),d.createElement(v.Z,null,"Время оформления"),d.createElement(v.Z,null,"Время выхода на стол"),d.createElement(v.Z,null,"Время закрытия"),d.createElement(v.Z,null,"Обещали"))),d.createElement(E.Z,null,this.state.ordersQueue.map((function(e,t){return d.createElement(_.Z,{key:t},d.createElement(v.Z,null,e.id),d.createElement(v.Z,null,1==parseInt(e.is_preorder)?e.date_time_preorder:""),d.createElement(v.Z,null,0==parseInt(e.is_preorder)?e.date_time_order:""),d.createElement(v.Z,null,e.time_start_order),d.createElement(v.Z,null,e.time_end_order),d.createElement(v.Z,null,0==parseInt(e.is_preorder)?e.unix_time_to_client:""))}))))))))}}]),C}(d.Component);function L(){var e=W(),t=(0,Z.k6)();return d.createElement(z,{classes:e,history:t})}},9546:(e,t,n)=>{"use strict";n.r(t),n.d(t,{Reg:()=>N});var a=n(5861),r=n(5671),s=n(3144),o=n(7326),i=n(136),l=n(2963),c=n(1120),u=n(4942),m=n(7757),p=n.n(m),d=n(7294),h=n(5977),f=n(3901),g=n(282),Z=n(8286),y=n(1749),E=n(9760),v=n(7661),w=n(1594),x=n(7257),_=n(2663),b=n(6856),k=n(9525),S=n(7212),C=n(6083),R=n(2692),D=n(5477);var T=n(7563),O=(0,E.Z)((function(e){return{paper:{display:"flex",flexDirection:"column",alignItems:"center"},avatar:{borderRadius:0,width:"100%",height:150,margin:0,backgroundColor:"#fff"},avatar2:{borderRadius:0,width:"100%",height:130,margin:0,backgroundColor:"#fff"},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)},backButton:{marginRight:e.spacing(1)},instructions:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},textLink:{color:"#c03"}}})),I=function(e){(0,i.Z)(I,e);var t,n,m,h,E,O=(h=I,E=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=(0,c.Z)(h);if(E){var n=(0,c.Z)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return(0,l.Z)(this,e)});function I(e){var t;return(0,r.Z)(this,I),t=O.call(this,e),(0,u.Z)((0,o.Z)(t),"getData",(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:T.stringify({method:e,module:t.state.module,version:2,login:"+79879340391",data:JSON.stringify(n)})}).then((function(e){return e.json()})).then((function(e){if(!1!==e.st||"redir"!=e.type){if(!1!==e.st||"auth"!=e.type)return setTimeout((function(){t.setState({is_load:!1})}),300),e;t.state.history.push("/auth")}else t.state.history.push("/")})).catch((function(e){console.log(e)}))})),t.state={classes:t.props.classes,history:t.props.history,module:"auth",module_name:"",is_load:!1,modalDialog:!1,dialogTitle:"",dialogText:"",activeStep:0,steps:["Телефон","Подтверждение","Новый пароль"],phone:"",code:"",pwd:""},t}return(0,s.Z)(I,[{key:"componentDidMount",value:(m=(0,a.Z)(p().mark((function e(){return p().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)}))),function(){return m.apply(this,arguments)})},{key:"updateData",value:(n=(0,a.Z)(p().mark((function e(){var t,n;return p().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={point_id:this.state.point,showReady:!0===this.state.showReady?1:0},e.next=3,this.getData("get_orders",t);case 3:n=e.sent,this.setState({read:n.read,onstol:n.onstol,ordersQueue:n.prestol_new});case 5:case"end":return e.stop()}}),e,this)}))),function(){return n.apply(this,arguments)})},{key:"nextStep",value:(t=(0,a.Z)(p().mark((function e(){var t,n,a,r,s,o,i=this;return p().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!=this.state.activeStep){e.next=8;break}return t={login:document.getElementById("phone").value},e.next=4,this.getData("check_phone",t);case 4:!1===(n=e.sent).st?setTimeout((function(){i.setState({modalDialog:!0,dialogTitle:"Предупреждение",dialogText:n.text})}),500):this.setState({activeStep:this.state.activeStep+1,phone:t.login}),e.next=22;break;case 8:if(1!=this.state.activeStep){e.next=16;break}return a={login:this.state.phone,code:document.getElementById("code").value},e.next=12,this.getData("check_code",a);case 12:!1===(r=e.sent).st?setTimeout((function(){i.setState({modalDialog:!0,dialogTitle:"Предупреждение",dialogText:r.text})}),500):this.setState({activeStep:this.state.activeStep+1,code:a.code}),e.next=22;break;case 16:if(2!=this.state.activeStep){e.next=22;break}return s={login:this.state.phone,code:this.state.code,pwd:document.getElementById("password").value},e.next=20,this.getData("save_new_pwd",s);case 20:!1===(o=e.sent).st?setTimeout((function(){i.setState({modalDialog:!0,dialogTitle:"Предупреждение",dialogText:o.text})}),500):(localStorage.setItem("token",o.token),setTimeout((function(){window.location.pathname="/"}),300));case 22:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"enterNextStep",value:function(e){13==e.charCode&&this.nextStep()}},{key:"render",value:function(){var e=this;return d.createElement(d.Fragment,null,d.createElement(R.Z,{className:this.state.classes.backdrop,open:this.state.is_load},d.createElement(D.Z,{color:"inherit"})),d.createElement(_.Z,{open:this.state.modalDialog,onClose:function(){e.setState({modalDialog:!1})},"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},d.createElement(C.Z,{id:"alert-dialog-title"},this.state.dialogTitle),d.createElement(k.Z,null,d.createElement(S.Z,{id:"alert-dialog-description"},this.state.dialogText)),d.createElement(b.Z,null,d.createElement(g.Z,{onClick:function(){e.setState({modalDialog:!1})},color:"primary",autoFocus:!0},"Хорошо"))),d.createElement(y.Z,{container:!0,spacing:3,direction:"row",justifyContent:"center",alignItems:"center"},d.createElement(y.Z,{item:!0,xs:12,sm:6,md:6,lg:4,xl:3},d.createElement("div",{className:this.state.classes.paper},d.createElement(f.Z,{className:this.state.classes.avatar},d.createElement("img",{alt:"Жако доставка роллов и пиццы",src:"../assets/img_other/Favikon.png",style:{height:"100%"}})),d.createElement(v.Z,{activeStep:this.state.activeStep,alternativeLabel:!0,style:{width:"100%"}},this.state.steps.map((function(e){return d.createElement(w.Z,{key:e},d.createElement(x.Z,null,e))}))),d.createElement("div",{className:this.state.classes.form,style:{width:"100%"}},0==this.state.activeStep?d.createElement(Z.Z,{variant:"outlined",margin:"normal",size:"small",required:!0,fullWidth:!0,id:"phone",label:"Номер телефона",name:"phone",autoComplete:"phone",autoFocus:!0,onKeyPress:this.enterNextStep.bind(this)}):null,1==this.state.activeStep?d.createElement(Z.Z,{variant:"outlined",margin:"normal",size:"small",required:!0,fullWidth:!0,id:"code",label:"Код из смс",name:"code",autoComplete:"code",autoFocus:!0,onKeyPress:this.enterNextStep.bind(this)}):null,2==this.state.activeStep?d.createElement(Z.Z,{variant:"outlined",margin:"normal",size:"small",required:!0,fullWidth:!0,name:"password",label:"Пароль",type:"password",id:"password",autoComplete:"current-password",onKeyPress:this.enterNextStep.bind(this)}):null,d.createElement(g.Z,{fullWidth:!0,variant:"contained",color:"primary",className:this.state.classes.submit,onClick:this.nextStep.bind(this)},"Дальше"),d.createElement(y.Z,{container:!0},d.createElement(y.Z,{item:!0,xs:!0},d.createElement("a",{href:"/auth",className:this.state.classes.textLink},"Вернуться к авторизации"))))))))}}]),I}(d.Component);function N(){var e=O(),t=(0,h.k6)();return d.createElement(I,{classes:e,history:t})}},5798:(e,t,n)=>{"use strict";var a=n(7294),r=n(3935),s=n(3727),o=n(7462),i=n(5861),l=n(5671),c=n(3144),u=n(7326),m=n(136),p=n(2963),d=n(1120),h=n(4942),f=n(7757),g=n.n(f),Z=n(6010),y=n(9760),E=n(5834),v=n(2112),w=n(9956),x=n(5258),_=n(8358),b=n(2822),k=n(2318),S=n(5517),C=n(7812),R=n(9009),D=n(3832),T=n(1749),O=n(9659),I=n(8884),N=n(9875),P=n(8825),B=n(998),j=n(5757),F=n(8135),W=n(743),z=n(1201),L=n(4566),q=n(7850),M=n(3457),Q=n(5977),A=n(8286),H=n(5007),J=n(5152),K=n.n(J);function G(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function V(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?G(Object(n),!0).forEach((function(t){(0,h.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):G(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Y=n(7563),X=(0,q.Z)({palette:{primary:{main:"#c03"},def:{main:"#353b48",secondary:"#fff"}}});function U(){return a.createElement(k.Z,{variant:"body2",color:"textSecondary",align:"center"},"Copyright © ",a.createElement(O.Z,{color:"inherit",href:"https://material-ui.com/"},"Your Website")," ",(new Date).getFullYear(),".")}var $=(0,y.Z)((function(e){return{root:{display:"flex"},toolbar:{paddingRight:24},toolbarIcon:V({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:300,width:"calc(100% - ".concat(300,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:300,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:(0,h.Z)({overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:e.spacing(7)},e.breakpoints.up("sm"),{width:e.spacing(9)}),appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,overflow:"auto"},container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4),width:"100%"},paper:{padding:e.spacing(2),display:"flex",overflow:"auto",flexDirection:"column"},fixedHeight:{height:240},heading:{fontSize:e.typography.pxToRem(15),fontWeight:e.typography.fontWeightRegular}}})),ee=function(e){(0,m.Z)(y,e);var t,n,r,f=(n=y,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=(0,d.Z)(n);if(r){var a=(0,d.Z)(this).constructor;e=Reflect.construct(t,arguments,a)}else e=t.apply(this,arguments);return(0,p.Z)(this,e)});function y(e){var t;return(0,l.Z)(this,y),t=f.call(this,e),(0,h.Z)((0,u.Z)(t),"getData",(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:Y.stringify({method:e,module:t.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(n)})}).then((function(e){return e.json()})).then((function(e){if(console.log(e),!1!==e.st||"redir"!=e.type){if(!1!==e.st||"auth"!=e.type)return e;window.location.pathname="/auth"}else t.state.history.push("/")})).catch((function(e){console.log(e)}))})),t.state={classes:t.props.classes,history:t.props.history,module:"header",open:!1,menu:[],full_menu:[]},t}return(0,c.Z)(y,[{key:"componentDidMount",value:(t=(0,i.Z)(g().mark((function e(){var t;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData("get_all");case 2:t=e.sent,this.setState({menu:t.info.left_menu,full_menu:t.info.full_menu});case 4:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"handleDrawerOpen",value:function(){this.setState({open:!0})}},{key:"handleDrawerClose",value:function(){this.setState({open:!1})}},{key:"render",value:function(){var e=this;return a.createElement(a.Fragment,null,a.createElement(x.Z,{className:(0,Z.Z)(this.state.classes.appBar,this.state.open&&this.state.classes.appBarShift)},a.createElement(_.Z,{className:this.state.classes.toolbar},a.createElement(C.Z,{edge:"start",color:"inherit","aria-label":"open drawer",onClick:this.handleDrawerOpen.bind(this),className:(0,Z.Z)(this.state.classes.menuButton,this.state.open&&this.state.classes.menuButtonHidden)},a.createElement(I.Z,null)),a.createElement(k.Z,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,className:this.state.classes.title},"Dashboard"),a.createElement(C.Z,{color:"inherit"},a.createElement(R.Z,{badgeContent:4,color:"secondary"},a.createElement(P.Z,null))))),a.createElement(v.ZP,{variant:"persistent",classes:{paper:(0,Z.Z)(this.state.classes.drawerPaper,!this.state.open&&this.state.classes.drawerPaperClose)},open:this.state.open},a.createElement("div",{className:this.state.classes.toolbarIcon},a.createElement(H.ZP,{size:"small",options:this.state.full_menu,getOptionLabel:function(e){return e.name},onChange:function(t,n){n&&e.state.history.push("/"+n.key_query+"/")},style:{width:300},renderInput:function(e){return a.createElement(A.Z,(0,o.Z)({},e,{label:"Поиск",variant:"outlined"}))}}),a.createElement(C.Z,{onClick:this.handleDrawerClose.bind(this)},a.createElement(N.Z,null))),a.createElement(S.Z,null),this.state.menu.map((function(t,n){return a.createElement(F.Z,{key:n},a.createElement(W.Z,{expandIcon:a.createElement(L.Z,null),"aria-controls":"panel1a-content",id:"panel1a-header"},a.createElement(k.Z,{className:e.state.classes.heading},t.parent.name)),a.createElement(z.Z,null,a.createElement(b.Z,{style:{width:"100%"}},t.chaild.map((function(e,t){return a.createElement(B.Z,{button:!0,key:t},a.createElement(s.OL,{to:"/"+e.key_query+"/"},a.createElement(j.Z,{primary:e.name})))})))))}))))}}]),y}(a.Component);function te(e){var t=e.code,n=e.children;return a.createElement(Q.AW,{render:function(e){var a=e.staticContext;return a&&(a.status=t),n}})}function ne(){var e=$(),t=(0,Q.k6)();console.log("history",t.location.pathname);var n=!0;return"/auth/"!=t.location.pathname&&"/auth"!=t.location.pathname&&"/registration/"!=t.location.pathname&&"/registration"!=t.location.pathname||(n=!1),a.createElement(M.Z,{theme:X},a.createElement("div",{className:e.root},n?a.createElement(a.Fragment,null,a.createElement(E.ZP,null),a.createElement(ee,{classes:e,history:t})):null,a.createElement("main",{className:e.content},a.createElement("div",{className:e.appBarSpacer}),a.createElement(D.Z,{maxWidth:!1,className:e.container},a.createElement(Q.rs,null,K().map((function(e,t){return a.createElement(Q.AW,{key:t,path:e.path,exact:e.exact,component:e.component})})),a.createElement(Q.AW,{component:function(){return a.createElement(te,{code:404},a.createElement(T.Z,{container:!0,className:"Contact mainContainer MuiGrid-spacing-xs-3",style:{marginTop:64}},a.createElement(T.Z,{item:!0,xs:12},a.createElement(k.Z,{variant:"h5",component:"h1"},"404 Страница не найдена"))))}})),n?a.createElement(w.Z,{pt:4},a.createElement(U,null)):null))))}r.render(a.createElement(s.VK,null,a.createElement(ne,null)),document.getElementById("app"))}},e=>{e.O(0,[216],(()=>(5798,e(e.s=5798)))),e.O()}]);
//# sourceMappingURL=main.a35614c92e86593d65fd.js.map