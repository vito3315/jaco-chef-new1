"use strict";(self.webpackChunkpackage_json=self.webpackChunkpackage_json||[]).push([[690],{9690:(e,t,n)=>{n.r(t),n.d(t,{default:()=>I}),n(3325);var a=n(5861),i=n(5671),s=n(3144),l=n(7326),r=n(136),c=n(6215),o=n(1120),m=n(4942),d=n(4687),u=n.n(d),h=n(7294),p=n(30),_=n(1822),v=n(3892),Z=n(5705),g=n(9620),E=n(2962),f=n(4498),x=n(7745),y=n(3150),w=n(6140),P=n(3030),k=n(3406),D=n(8561),A=n(8736),b=n(5722),S=n(594),C=n(6406);var R=n(7563);function T(e){var t=new Date(e),n=""+(t.getMonth()+1),a=""+t.getDate(),i=t.getFullYear();return n.length<2&&(n="0"+n),a.length<2&&(a="0"+a),[i,n,a].join("-")}var N=function(e){(0,r.Z)(Q,e);var t,n,d,N,I,j,B,F=(j=Q,B=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=(0,o.Z)(j);if(B){var n=(0,o.Z)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return(0,c.Z)(this,e)});function Q(e){var t;return(0,i.Z)(this,Q),t=F.call(this,e),(0,m.Z)((0,l.Z)(t),"getData",(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:R.stringify({method:e,module:t.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(n)})}).then((function(e){return e.json()})).then((function(e){if(!1!==e.st||"redir"!=e.type){if(!1!==e.st||"auth"!=e.type)return setTimeout((function(){t.setState({is_load:!1})}),300),e;window.location.pathname="/auth"}else window.location.pathname="/"})).catch((function(e){console.log(e),t.setState({is_load:!1})}))})),t.state={module:"advertising_company",module_name:"",description:"",promo:"",is_load:!1,adv_actual:[],adv_old:[],modalDialog:!1,modalDialogNew:!1,rangeDate:[T(new Date),T(new Date)],date_start:T(new Date),date_end:T(new Date),point_id:0,points:[],choosePoint:[],points_filter:[],is_active:1,id:0,nameCat:"",editText:"",name:"",editTextNew:"",showItem:null},t}return(0,s.Z)(Q,[{key:"componentDidMount",value:(I=(0,a.Z)(u().mark((function e(){var t;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData("get_all");case 2:t=e.sent,this.setState({module_name:t.module_info.name,adv_actual:t.adv_actual,adv_old:t.adv_old,points:t.points,points_filter:t.points,point_id:t.points[0].id}),document.title=t.module_info.name;case 5:case"end":return e.stop()}}),e,this)}))),function(){return I.apply(this,arguments)})},{key:"openCat",value:function(e){this.setState({modalDialog:!0,showItem:!0,name:e.name,date_start:e.date_start,date_end:e.date_end,is_active:e.is_active,id:e.id,description:e.description,choosePoint:e.choosePoint,promo:e.promo})}},{key:"save",value:(N=(0,a.Z)(u().mark((function e(){var t,n,a;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={id:this.state.id,points:this.state.choosePoint,name:this.state.name,date_start:this.state.date_start,date_end:this.state.date_end,is_active:this.state.is_active},(0,m.Z)(t,"id",this.state.id),(0,m.Z)(t,"description",this.state.description),(0,m.Z)(t,"promo",this.state.promo),n=t,e.next=3,this.getData("save_edit",n);case 3:if(!1!==(a=e.sent).st){e.next=8;break}alert(a.text),e.next=13;break;case 8:return this.setState({modalDialog:!1,name:"",date_start:T(new Date),date_end:T(new Date)}),e.next=11,this.getData("get_adv_point",{point_id:this.state.point_id});case 11:a=e.sent,this.setState({adv_actual:a.adv_actual,adv_old:a.adv_old});case 13:case"end":return e.stop()}}),e,this)}))),function(){return N.apply(this,arguments)})},{key:"saveNew",value:(d=(0,a.Z)(u().mark((function e(){var t,n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={points:this.state.choosePoint,name:this.state.name,date_start:this.state.date_start,date_end:this.state.date_end,is_active:this.state.is_active,description:this.state.description,promo:this.state.promo},e.next=3,this.getData("save_new",t);case 3:if(!1!==(n=e.sent).st){e.next=8;break}alert(n.text),e.next=13;break;case 8:return this.setState({modalDialogNew:!1,name:"",date_start:T(new Date),date_end:T(new Date)}),e.next=11,this.getData("get_adv_point",{point_id:this.state.point_id});case 11:n=e.sent,this.setState({adv_actual:n.adv_actual,adv_old:n.adv_old});case 13:case"end":return e.stop()}}),e,this)}))),function(){return d.apply(this,arguments)})},{key:"changeChekBox",value:function(e,t){this.setState((0,m.Z)({},e,t.target.checked))}},{key:"changeDateRange",value:function(e,t){this.setState((0,m.Z)({},e,T(t)))}},{key:"changePoint",value:function(e){var t=this;this.setState({point_id:e.target.value}),setTimeout((function(){t.getAdvList()}),50)}},{key:"getAdvList",value:(n=(0,a.Z)(u().mark((function e(){var t,n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={point_id:this.state.point_id},e.next=3,this.getData("get_adv_point",t);case 3:n=e.sent,this.setState({adv_actual:n.adv_actual,adv_old:n.adv_old});case 5:case"end":return e.stop()}}),e,this)}))),function(){return n.apply(this,arguments)})},{key:"delAdv",value:(t=(0,a.Z)(u().mark((function e(t){var n,a;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n={point_id:this.state.point_id},!confirm("Вы действительно хотите удалить рекламную компанию?")){e.next=10;break}return e.next=4,this.getData("delete_adv",{id:t});case 4:return e.sent.st||alert("При удалении произошла ошибка"),e.next=8,this.getData("get_adv_point",n);case 8:a=e.sent,this.setState({adv_actual:a.adv_actual,adv_old:a.adv_old});case 10:case"end":return e.stop()}}),e,this)}))),function(e){return t.apply(this,arguments)})},{key:"render",value:function(){var e=this;return h.createElement(h.Fragment,null,h.createElement(v.Z,{style:{zIndex:99},open:this.state.is_load},h.createElement(Z.Z,{color:"inherit"})),this.state.showItem?h.createElement(g.Z,{open:this.state.modalDialog,onClose:function(){e.setState({modalDialog:!1,description:"",name:"",promo:"",choosePoint:[],date_start:T(new Date),date_end:T(new Date)})}},h.createElement(x.Z,null,'Компания "',this.state.name,'"'),h.createElement(f.Z,{style:{paddingTop:10}},h.createElement(p.ZP,{container:!0,spacing:3},h.createElement(p.ZP,{item:!0,xs:12,sm:12},h.createElement(C.rZ,{value:this.state.name,func:function(t){e.setState({name:t.target.value})},label:"Название акции"})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(C.Qe,{label:"Дата от",value:this.state.date_start,func:this.changeDateRange.bind(this,"date_start")})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(C.Qe,{label:"Дата от",value:this.state.date_end,func:this.changeDateRange.bind(this,"date_end")})),h.createElement(p.ZP,{item:!0,xs:12,sm:12},h.createElement(C.e_,{data:this.state.points,value:this.state.choosePoint,func:function(t,n){e.setState({choosePoint:n})},multiple:!0,label:"Точка"})),h.createElement(p.ZP,{item:!0,xs:12,sm:12},h.createElement(C.rZ,{value:this.state.description,func:function(t){e.setState({description:t.target.value})},label:"Описание"})),h.createElement(p.ZP,{item:!0,xs:12,sm:12},h.createElement(C.rZ,{value:this.state.promo,func:function(t){e.setState({promo:t.target.value})},label:"Промокод"})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(C.IA,{label:"Показать акцию",value:1==this.state.is_active,func:this.changeChekBox.bind(this,"is_active")})))),h.createElement(E.Z,null,h.createElement(_.Z,{color:"primary",onClick:this.save.bind(this)},"Сохранить"))):null,h.createElement(g.Z,{open:this.state.modalDialogNew,onClose:function(){e.setState({modalDialogNew:!1,description:"",name:"",promo:"",choosePoint:[],date_start:T(new Date),date_end:T(new Date)})}},h.createElement(x.Z,null,"Новая акция"),h.createElement(f.Z,{style:{paddingTop:10}},h.createElement(p.ZP,{container:!0,spacing:3},h.createElement(p.ZP,{item:!0,xs:12,sm:12},h.createElement(C.rZ,{value:this.state.name,func:function(t){e.setState({name:t.target.value})},label:"Название компании"})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(C.Qe,{label:"Дата от",value:this.state.date_start,func:this.changeDateRange.bind(this,"date_start")})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(C.Qe,{label:"Дата от",value:this.state.date_end,func:this.changeDateRange.bind(this,"date_end")})),h.createElement(p.ZP,{item:!0,xs:12,sm:12},h.createElement(C.e_,{data:this.state.points,value:this.state.choosePoint,func:function(t,n){e.setState({choosePoint:n})},multiple:!0,label:"Точка"})),h.createElement(p.ZP,{item:!0,xs:12,sm:12},h.createElement(C.rZ,{value:this.state.description,func:function(t){e.setState({description:t.target.value})},label:"Описание"})),h.createElement(p.ZP,{item:!0,xs:12,sm:12},h.createElement(C.rZ,{value:this.state.promo,func:function(t){e.setState({promo:t.target.value})},label:"Промокод"})),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(C.IA,{label:"Показать акцию",value:1==this.state.is_active,func:this.changeChekBox.bind(this,"is_active")})))),h.createElement(E.Z,null,h.createElement(_.Z,{color:"primary",onClick:this.saveNew.bind(this)},"Сохранить"))),h.createElement(p.ZP,{container:!0,spacing:3},h.createElement(p.ZP,{item:!0,xs:12,sm:12},h.createElement("h1",null,this.state.module_name)),h.createElement(p.ZP,{item:!0,xs:12,sm:12},h.createElement(_.Z,{variant:"contained",color:"primary",onClick:function(){e.setState({modalDialogNew:!0})}},"Добавить акцию")),h.createElement(p.ZP,{item:!0,xs:12,sm:6},h.createElement(C.$S,{data:this.state.points_filter,value:this.state.point_id,func:this.changePoint.bind(this),label:"Точка"})),h.createElement(p.ZP,{item:!0,xs:12,sm:12},h.createElement(p.ZP,{item:!0,xs:12,sm:12},h.createElement("h2",{style:{textAlign:"center"}},"Актвные")),h.createElement(k.Z,{component:b.Z,style:{marginTop:10}},h.createElement(y.Z,null,h.createElement(D.Z,null,h.createElement(A.Z,null,h.createElement(P.Z,{style:{textAlign:"center"}},"#"),h.createElement(P.Z,{style:{textAlign:"center"}},"Название"),h.createElement(P.Z,{style:{textAlign:"center"}},"Дата начало"),h.createElement(P.Z,{style:{textAlign:"center"}},"Дата окончания"),h.createElement(P.Z,{style:{textAlign:"center"}},"Точки"),h.createElement(P.Z,{style:{textAlign:"center"}},"Промокод"),h.createElement(P.Z,{style:{textAlign:"center"}}))),h.createElement(w.Z,null,this.state.adv_actual?this.state.adv_actual.map((function(t,n){return h.createElement(A.Z,{key:n},h.createElement(P.Z,{style:{textAlign:"center"}},n+1," "),h.createElement(P.Z,{style:{textAlign:"center",cursor:"pointer"},onClick:e.openCat.bind(e,t)},t.name," "),h.createElement(P.Z,{style:{textAlign:"center"}},t.date_start," "),h.createElement(P.Z,{style:{textAlign:"center"}},t.date_end," "),h.createElement(P.Z,{style:{textAlign:"center"}},t.choosePoint.map((function(e,t){return h.createElement(h.Fragment,{key:t}," ",e.name," ")}))),h.createElement(P.Z,{style:{textAlign:"center"}},t.promo," "),h.createElement(P.Z,{style:{textAlign:"center"}}," ",h.createElement(S.Z,{onClick:e.delAdv.bind(e,t.id)})," "))})):null)))),h.createElement(p.ZP,{item:!0,xs:12,sm:12},h.createElement(p.ZP,{container:!0},h.createElement(p.ZP,{item:!0,xs:12,sm:12},h.createElement("h2",{style:{textAlign:"center"}},"Не Актвные")),h.createElement(p.ZP,{item:!0,xs:12,sm:12},h.createElement(k.Z,{component:b.Z,style:{marginTop:10}},h.createElement(y.Z,null,h.createElement(D.Z,null,h.createElement(A.Z,null,h.createElement(P.Z,{style:{textAlign:"center"}}),h.createElement(P.Z,{style:{textAlign:"center"}},"Название"),h.createElement(P.Z,{style:{textAlign:"center"}},"Дата начало"),h.createElement(P.Z,{style:{textAlign:"center"}},"Дата окончания"),h.createElement(P.Z,{style:{textAlign:"center"}},"Точки"),h.createElement(P.Z,{style:{textAlign:"center"}},"Промокод"),h.createElement(P.Z,{style:{textAlign:"center"}}))),h.createElement(w.Z,null,this.state.adv_old?this.state.adv_old.map((function(t,n){return h.createElement(A.Z,{key:n},h.createElement(P.Z,{style:{textAlign:"center"}},n+1," "),h.createElement(P.Z,{style:{textAlign:"center",cursor:"pointer"},onClick:e.openCat.bind(e,t)},t.name," "),h.createElement(P.Z,{style:{textAlign:"center"}},t.date_start," "),h.createElement(P.Z,{style:{textAlign:"center"}},t.date_end," "),h.createElement(P.Z,{style:{textAlign:"center"}},t.choosePoint.map((function(e,t){return h.createElement(h.Fragment,{key:t}," ",e.name," ")}))),h.createElement(P.Z,{style:{textAlign:"center"}},t.promo," "),h.createElement(P.Z,{style:{textAlign:"center"}}," ",h.createElement(S.Z,{onClick:e.delAdv.bind(e,t.id)})," "))})):null))))))))}}]),Q}(h.Component);function I(){return h.createElement(N,null)}},3325:(e,t,n)=>{var a=n(4783)(e.id,{locals:!1});e.hot.dispose(a),e.hot.accept(void 0,a)}}]);
//# sourceMappingURL=690.ed7b72576779b4ae20f5.js.map