"use strict";(self.webpackChunkpackage_json=self.webpackChunkpackage_json||[]).push([[500],{1500:(t,e,n)=>{n.r(e),n.d(e,{default:()=>C}),n(1819);var i=n(5861),a=n(5671),s=n(3144),r=n(7326),l=n(136),o=n(6215),c=n(1120),u=n(4942),p=n(4687),m=n.n(p),h=n(7294),d=n(30),f=n(1822),v=n(3892),Z=n(5705),_=n(8573),k=n(1388),E=n(1702),g=n(6307),y=n(594),L=n(3150),w=n(6140),x=n(3030),S=n(8561),b=n(8736),I=n(6406);var P=n(7563),T=function(t){(0,l.Z)(D,t);var e,n,p,T,C,R=(T=D,C=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=(0,c.Z)(T);if(C){var n=(0,c.Z)(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return(0,o.Z)(this,t)});function D(t){var e;return(0,a.Z)(this,D),e=R.call(this,t),(0,u.Z)((0,r.Z)(e),"getData",(function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:P.stringify({method:t,module:e.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(n)})}).then((function(t){return t.json()})).then((function(t){if(!1!==t.st||"redir"!=t.type){if(!1!==t.st||"auth"!=t.type)return setTimeout((function(){e.setState({is_load:!1})}),300),t;window.location.pathname="/auth"}else window.location.pathname="/"})).catch((function(t){console.log(t),e.setState({is_load:!1})}))})),e.state={module:"app_work_point",module_name:"",is_load:!1,points:[],point_id:0,apps:[],app_id:0,allList:[],allListRender:[],thisList:[]},e}return(0,s.Z)(D,[{key:"componentDidMount",value:(p=(0,i.Z)(m().mark((function t(){var e,n=this;return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getData("get_all");case 2:e=t.sent,this.setState({module_name:e.module_info.name,points:e.points,point_id:e.points[0].id,apps:e.apps,app_id:e.apps[0].id}),document.title=e.module_info.name,setTimeout((function(){n.getWorks()}),300);case 6:case"end":return t.stop()}}),t,this)}))),function(){return p.apply(this,arguments)})},{key:"changeApp",value:function(t){var e=this;this.setState({app_id:t.target.value}),setTimeout((function(){e.getWorks()}),300)}},{key:"getWorks",value:(n=(0,i.Z)(m().mark((function t(){var e,n,i=this;return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e={point_id:this.state.point_id,app_id:this.state.app_id},t.next=3,this.getData("get_works",e);case 3:n=t.sent,console.log(n),this.setState({allList:n.all_work,thisList:n.this_work}),setTimeout((function(){i.checkList()}),300);case 7:case"end":return t.stop()}}),t,this)}))),function(){return n.apply(this,arguments)})},{key:"checkList",value:function(){var t=this.state.allList;this.state.thisList.map((function(e){var n=[];t.map((function(t){parseInt(t.id)!=parseInt(e.id)&&n.push(t)})),t=n})),this.setState({allListRender:t})}},{key:"add",value:function(t,e){var n=this,i=this.state.thisList,a=this.state.allList,s=i.find((function(e,n){return parseInt(e.id)==parseInt(t)})),r=a.find((function(e,n){return parseInt(e.id)==parseInt(t)}));s||i.push((0,u.Z)({id:t,name:e,time_min:0,dop_time:0},"time_min",r.time_min)),this.setState({thisList:i}),setTimeout((function(){n.checkList()}),300)}},{key:"del",value:function(t,e){var n=this,i=[];this.state.thisList.map((function(e,n){parseInt(e.id)!=parseInt(t)&&i.push(e)})),this.setState({thisList:i}),setTimeout((function(){n.checkList()}),300)}},{key:"save",value:(e=(0,i.Z)(m().mark((function t(){var e,n,i;return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e={point_id:this.state.point_id,app_id:this.state.app_id,items:this.state.thisList},n=null,this.state.thisList.map((function(t,e){0==t.dop_time.length&&(n=t)})),console.log(n),!n){t.next=7;break}return alert('У позиции "'+n.name+'" не указано доп время'),t.abrupt("return");case 7:return t.next=9,this.getData("save",e);case 9:i=t.sent,console.log(i),alert(i.text);case 12:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"changeDopTime",value:function(t,e){var n=e.target.value,i=this.state.thisList;isNaN(n)&&""!=n||(i[t].dop_time=""==n?"":parseInt(n),this.setState({thisList:i}))}},{key:"render",value:function(){var t=this;return h.createElement(h.Fragment,null,h.createElement(v.Z,{style:{zIndex:99},open:this.state.is_load},h.createElement(Z.Z,{color:"inherit"})),h.createElement(d.ZP,{container:!0,spacing:3},h.createElement(d.ZP,{item:!0,xs:12,sm:12},h.createElement("h1",null,this.state.module_name)),h.createElement(d.ZP,{item:!0,xs:12,sm:3},h.createElement(I.$S,{data:this.state.points,value:this.state.point_id,func:function(e){t.setState({point_id:e.target.value})},label:"Точка"})),h.createElement(d.ZP,{item:!0,xs:12,sm:3},h.createElement(I.$S,{data:this.state.apps,value:this.state.app_id,func:this.changeApp.bind(this),label:"Должность"})),h.createElement(d.ZP,{item:!0,xs:12,sm:3},h.createElement(f.Z,{variant:"contained",onClick:this.getWorks.bind(this)},"Обновить данные")),h.createElement(d.ZP,{item:!0,xs:12,sm:6},h.createElement(_.Z,{style:{width:"100%"}},this.state.allListRender.map((function(e,n){return h.createElement(k.ZP,{key:n,style:{borderBottom:"1px solid #e5e5e5"}},h.createElement(E.Z,{primary:e.name}),h.createElement(g.Z,{onClick:t.add.bind(t,e.id,e.name)}))})))),h.createElement(d.ZP,{item:!0,xs:12,sm:6},h.createElement(L.Z,{size:"small"},h.createElement(S.Z,null,h.createElement(b.Z,null,h.createElement(x.Z,null,"Наименование"),h.createElement(x.Z,null,"Основное время"),h.createElement(x.Z,null,"Доп время (в минутах)"),h.createElement(x.Z,null,h.createElement(y.Z,null)))),h.createElement(w.Z,null,this.state.thisList.map((function(e,n){return h.createElement(b.Z,{key:n},h.createElement(x.Z,null,e.name),h.createElement(x.Z,null,e.time_min," мин."),h.createElement(x.Z,null,h.createElement(I.rZ,{value:e.dop_time,func:t.changeDopTime.bind(t,n),label:""})),h.createElement(x.Z,null,h.createElement(y.Z,{onClick:t.del.bind(t,e.id,e.name),style:{cursor:"pointer"}})))}))))),h.createElement(d.ZP,{item:!0,xs:12,sm:3},h.createElement(f.Z,{variant:"contained",onClick:this.save.bind(this)},"Сохранить"))))}}]),D}(h.Component);function C(){return h.createElement(T,null)}},1819:(t,e,n)=>{var i=n(4783)(t.id,{locals:!1});t.hot.dispose(i),t.hot.accept(void 0,i)}}]);
//# sourceMappingURL=500.e2933c5a7ad6e955d489.js.map