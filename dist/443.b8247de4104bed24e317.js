"use strict";(self.webpackChunkpackage_json=self.webpackChunkpackage_json||[]).push([[443],{443:(e,t,n)=>{n.r(t),n.d(t,{default:()=>N}),n(1271);var a=n(5861),i=n(5671),s=n(3144),r=n(7326),l=n(136),o=n(6215),c=n(1120),u=n(4942),h=n(4687),m=n.n(h),d=n(7294),p=n(30),v=n(1822),y=n(3150),f=n(6140),E=n(3030),g=n(3406),Z=n(8561),k=n(8736),x=n(5722),_=n(8727),S=n(808),b=n(231),D=n(3508),P=n(594),w=n(8573),C=n(1388),T=n(1702),Y=n(9620),A=n(2962),I=n(4498),R=n(4439),j=n(7745),$=n(3892),H=n(5705),O=n(6406),B=n(1647);var M=n(7563),F=function(e){(0,l.Z)(G,e);var t,n,h,F,N,z,J,q=(z=G,J=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=(0,c.Z)(z);if(J){var n=(0,c.Z)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return(0,o.Z)(this,e)});function G(e){var t;return(0,i.Z)(this,G),t=q.call(this,e),(0,u.Z)((0,r.Z)(t),"getData",(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:M.stringify({method:e,module:t.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(n)})}).then((function(e){return e.json()})).then((function(e){if(!1!==e.st||"redir"!=e.type){if(!1!==e.st||"auth"!=e.type)return setTimeout((function(){t.setState({is_load:!1})}),300),e;window.location.pathname="/auth"}else window.location.pathname="/"})).catch((function(e){console.log(e)}))})),t.state={module:"count_users",module_name:"",is_load:!1,points:[],point:"0",mounth:"0",mounths:[],years:[],year:"0",calendar:[],modalDialog:!1,chooseDayHoly:"",events:[],chooseEvent:0,eventPoint1:0,everyYear1:!1,timeStart2:"10:00",timeEnd2:"21:30",expanded:"",dayEvents:[],events_hist:[]},t}return(0,s.Z)(G,[{key:"componentDidMount",value:(N=(0,a.Z)(m().mark((function e(){var t,n=this;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData("get_all");case 2:t=e.sent,console.log(t),this.setState({points:t.points,point:t.points[0].id,module_name:t.module_info.name,mounths:t.mounth,mounth:t.this_m,years:t.years,year:t.this_y}),document.title=t.module_info.name,setTimeout((function(){n.updateData()}),50);case 7:case"end":return e.stop()}}),e,this)}))),function(){return N.apply(this,arguments)})},{key:"changePoint",value:function(e){var t=this,n=e.target.value;this.setState({point:n}),setTimeout((function(){t.updateData()}),50)}},{key:"changeMounth",value:function(e){var t=e.target.value;this.setState({mounth:t}),setTimeout((function(){}),50)}},{key:"changeYear",value:function(e){var t=e.target.value;this.setState({year:t})}},{key:"changeCheckOrders",value:function(e){var t=e.target.checked;this.setState({showReady:t})}},{key:"updateData",value:(F=(0,a.Z)(m().mark((function e(){var t,n;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={m:this.state.mounth,y:this.state.year,point_id:this.state.point},e.next=3,this.getData("get_calendar",t);case 3:n=e.sent,console.log(n),this.setState({calendar:n.year});case 6:case"end":return e.stop()}}),e,this)}))),function(){return F.apply(this,arguments)})},{key:"chooseDay",value:(h=(0,a.Z)(m().mark((function e(t){var n,a;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.full_day){e.next=8;break}return this.setState({chooseDay:null,eventPoint1:this.state.point,chooseEvent:0,everyYear1:!1,timeStart2:"10:00",timeEnd2:"21:30",modalDialog:!1,events_hist:[]}),n={date:t.full_day,point_id:this.state.point},e.next=5,this.getData("get_calendar_day",n);case 5:a=e.sent,console.log("res",a),this.setState({chooseDay:t,chooseDayHoly:a.holy,events:a.events,events_hist:a.hist,dayEvents:a.this_events,modalDialog:!0});case 8:case"end":return e.stop()}}),e,this)}))),function(e){return h.apply(this,arguments)})},{key:"changeEvent",value:function(e){var t=e.target.value;this.setState({chooseEvent:t})}},{key:"changePoint1",value:function(e){var t=e.target.value;this.setState({eventPoint1:t})}},{key:"changeEveryYear1",value:function(e){var t=e.target.checked;this.setState({everyYear1:t})}},{key:"changeTimeStart2",value:function(e){var t=e.target.value;this.setState({timeStart2:t})}},{key:"changeTimeEnd2",value:function(e){var t=e.target.value;this.setState({timeEnd2:t})}},{key:"save",value:(n=(0,a.Z)(m().mark((function e(){var t,n,a=this;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={date:this.state.chooseDay.full_day,point_id:this.state.eventPoint1,event:this.state.chooseEvent,every_year:!0===this.state.everyYear1?1:0,time_start:this.state.timeStart2,time_end:this.state.timeEnd2},e.next=3,this.getData("save_event",t);case 3:n=e.sent,console.log(n),!1===n.st?alert(n.text):(this.setState({chooseDay:null,eventPoint1:this.state.point,chooseEvent:0,everyYear1:!1,timeStart2:"10:00",timeEnd2:"21:30",modalDialog:!1}),setTimeout((function(){a.updateData()}),300));case 6:case"end":return e.stop()}}),e,this)}))),function(){return n.apply(this,arguments)})},{key:"handleChange",value:function(e){this.setState({expanded:e})}},{key:"delEvent",value:(t=(0,a.Z)(m().mark((function e(t){var n,a=this;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("delEvent",t),!confirm('Удалить событие "'+t.title+" "+t.date+'" ?')){e.next=10;break}return n={del_id:t.id},e.next=5,this.getData("del_event",n);case 5:e.sent,this.setState({chooseDay:null,eventPoint1:this.state.point,chooseEvent:0,everyYear1:!1,timeStart2:"10:00",timeEnd2:"21:30",modalDialog:!1}),setTimeout((function(){a.updateData()}),300),e.next=10;break;case 10:case"end":return e.stop()}}),e,this)}))),function(e){return t.apply(this,arguments)})},{key:"render",value:function(){var e=this;return d.createElement(d.Fragment,null,d.createElement($.Z,{style:{zIndex:99},open:this.state.is_load},d.createElement(H.Z,{color:"inherit"})),d.createElement(Y.Z,{open:this.state.modalDialog,onClose:function(){e.setState({modalDialog:!1})},"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},d.createElement(j.Z,{id:"alert-dialog-title"},this.state.chooseDay?this.state.chooseDay.full_day:""),d.createElement(I.Z,{style:{paddingBottom:10,paddingTop:10}},d.createElement(R.Z,{id:"alert-dialog-description"},d.createElement(p.ZP,{container:!0,spacing:3},0==this.state.chooseDayHoly.length?null:d.createElement(p.ZP,{item:!0,xs:12,sm:12},d.createElement(B.Z,{component:"span"},this.state.chooseDayHoly)),d.createElement(p.ZP,{item:!0,xs:12,sm:12},d.createElement(O.$S,{data:this.state.events,value:this.state.chooseEvent,func:this.changeEvent.bind(this),label:"Событие"})),d.createElement(p.ZP,{item:!0,xs:12,sm:12},d.createElement(O.$S,{data:this.state.points,value:this.state.eventPoint1,func:this.changePoint1.bind(this),label:"Точка"})),2!==parseInt(this.state.chooseEvent)?null:d.createElement(d.Fragment,null,d.createElement(p.ZP,{item:!0,xs:6,sm:6},d.createElement(O.w0,{value:this.state.timeStart2,func:this.changeTimeStart2.bind(this),label:"Время начала работы"})),d.createElement(p.ZP,{item:!0,xs:6,sm:6},d.createElement(O.w0,{value:this.state.timeEnd2,func:this.changeTimeEnd2.bind(this),label:"Время окончания работы"}))),d.createElement(p.ZP,{item:!0,xs:12,sm:12},d.createElement(O.IA,{value:this.state.everyYear1,func:this.changeEveryYear1.bind(this),label:"Каждый год"}))),d.createElement(w.Z,{component:"nav"},this.state.dayEvents.map((function(t,n){return d.createElement(C.ZP,{key:n},d.createElement(T.Z,{primary:t.title}),4==parseInt(t.type)||6==parseInt(t.type)?null:d.createElement(P.Z,{color:"primary",onClick:e.delEvent.bind(e,t),style:{cursor:"pointer"}}))}))),d.createElement(_.Z,null,d.createElement(S.Z,{expandIcon:d.createElement(D.Z,null),"aria-controls":"panel1a-content",id:"panel1a-header"},d.createElement(B.Z,null,"История")),d.createElement(b.Z,null,d.createElement(w.Z,{component:"nav"},this.state.events_hist.map((function(e,t){return d.createElement(C.ZP,{key:t},d.createElement(T.Z,{primary:e.title}))}))))))),d.createElement(A.Z,null,d.createElement(v.Z,{onClick:this.save.bind(this),color:"primary"},"Сохранить"))),d.createElement(p.ZP,{container:!0,spacing:3},d.createElement(p.ZP,{item:!0,xs:12,sm:12},d.createElement("h1",null,this.state.module_name)),d.createElement(p.ZP,{item:!0,xs:12,sm:3},d.createElement(O.$S,{data:this.state.points,value:this.state.point,func:this.changePoint.bind(this),label:"Точка"})),d.createElement(p.ZP,{item:!0,xs:12,sm:3},d.createElement(O.$S,{data:this.state.mounths,value:this.state.mounth,func:this.changeMounth.bind(this),label:"Месяц"})),d.createElement(p.ZP,{item:!0,xs:12,sm:3},d.createElement(O.$S,{data:this.state.years,value:this.state.year,func:this.changeYear.bind(this),label:"Год"})),d.createElement(p.ZP,{item:!0,xs:12,sm:3},d.createElement(v.Z,{variant:"contained",onClick:this.updateData.bind(this)},"Обновить данные")),d.createElement(p.ZP,{container:!0,direction:"row",justifyContent:"center",style:{paddingTop:20,margin:"0 auto"}},this.state.calendar.map((function(t,n){return d.createElement(p.ZP,{item:!0,sm:6,key:n,style:{padding:20}},d.createElement("h1",{style:{textAlign:"center"}},t[0][0].mounth),d.createElement(g.Z,{component:x.Z},d.createElement(y.Z,{"aria-label":"a dense table",style:{overflow:"hidden"}},d.createElement(Z.Z,null,d.createElement(k.Z,null,d.createElement(E.Z,{style:{textAlign:"center",padding:15}},"Пн"),d.createElement(E.Z,{style:{textAlign:"center",padding:15}},"Вт"),d.createElement(E.Z,{style:{textAlign:"center",padding:15}},"Ср"),d.createElement(E.Z,{style:{textAlign:"center",padding:15}},"Чт"),d.createElement(E.Z,{style:{textAlign:"center",padding:15}},"Пт"),d.createElement(E.Z,{style:{textAlign:"center",padding:15}},"Сб"),d.createElement(E.Z,{style:{textAlign:"center",padding:15}},"Вс"))),d.createElement(f.Z,null,t.map((function(t,n){return d.createElement(k.Z,{key:n},t.map((function(t,n){return d.createElement(E.Z,{key:n,onClick:e.chooseDay.bind(e,t),style:{color:t.dir?"yellow":t.holy?"#c03":"#000",height:"6vw"},className:t.event?"customCel":"tableCel"},t.day)})))}))))))})))))}}]),G}(d.Component);function N(){return d.createElement(F,null)}},1271:(e,t,n)=>{var a=n(4783)(e.id,{locals:!1});e.hot.dispose(a),e.hot.accept(void 0,a)}}]);
//# sourceMappingURL=443.b8247de4104bed24e317.js.map