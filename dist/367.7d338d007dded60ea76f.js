"use strict";(self.webpackChunkpackage_json=self.webpackChunkpackage_json||[]).push([[367],{4367:(e,t,n)=>{n.r(t),n.d(t,{default:()=>R}),n(1723);var a=n(5861),i=n(5671),s=n(3144),o=n(7326),l=n(136),c=n(6215),r=n(1120),m=n(4942),_=n(4687),u=n.n(_),d=n(7294),h=n(5725),p=n(2642),f=n(4567),v=n(9062),Z=n(4666),E=n(8979),g=n(7750),k=n(7645),y=n(9573),x=n(8732),b=n(6926),S=n(6011),w=n(3694),C=n(9941),P=n(7425),z=n(5092),T=n(2658),A=n(3508),D=n(6406);var B=n(7563),I=function(e){(0,l.Z)(O,e);var t,n,_,I,R,M,j,H,$=(j=O,H=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=(0,r.Z)(j);if(H){var n=(0,r.Z)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return(0,c.Z)(this,e)});function O(e){var t,n;(0,i.Z)(this,O),n=$.call(this,e),(0,m.Z)((0,o.Z)(n),"getData",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return n.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:B.stringify({method:e,module:n.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(t)})}).then((function(e){return e.json()})).then((function(e){if(!1!==e.st||"redir"!=e.type){if(!1!==e.st||"auth"!=e.type)return setTimeout((function(){n.setState({is_load:!1})}),300),e;window.location.pathname="/auth"}else window.location.pathname="/"})).catch((function(e){console.log(e),n.setState({is_load:!1})}))}));var a=new Date,s=a.getHours(),l=a.getMinutes();a.setHours(a.getHours()+2);var c=a.getHours();return s=s<10?"0"+s:s,c=c<10?"0"+c:s,n.state=(t={module:"cafe_upr_edit",module_name:"",modalStopReason:!1,modalStopZone:!1,modalAddTime:!1,showComment:!1,phone_upr:"",phone_man:"",summ_driver:"",id:0,is_active:0,points_list:[],zone_list:[],dop_time_list:[],actual_time_list:[],zones:[],zone_id:0,nal_zone_id:0,time_start:s+":"+l,time_end:c+":"+l,add_time_list:[],add_time_id:0,tables:[],count_tables:0,cafe_handle_close:"",cook_common_stol:0},(0,m.Z)(t,"summ_driver",""),(0,m.Z)(t,"is_сlosed_overload",0),(0,m.Z)(t,"is_сlosed_technic",0),(0,m.Z)(t,"comment",""),(0,m.Z)(t,"point_id",0),t),n}return(0,s.Z)(O,[{key:"componentDidMount",value:(M=(0,a.Z)(u().mark((function e(){var t;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData("get_stat",{point_id:this.state.point_id});case 2:t=e.sent,this.setState({module_name:t.module_info.name,points_list:t.points,tables:t.tables,zone_list:t.point_zone,id:t.point_info.id,is_active:t.point_info.is_active,phone_upr:t.point_info.phone_upr,phone_man:t.point_info.phone_man,count_tables:t.point_info.count_tables,cafe_handle_close:t.point_info.cafe_handle_close,cook_common_stol:t.point_info.cook_common_stol,summ_driver:t.point_info.summ_driver,add_time_list:t.add_time_list,dop_time_list:t.dop_time_list,actual_time_list:t.actual_time_list,nal_zone_id:t.nal_zone_id}),document.title=t.module_info.name;case 5:case"end":return e.stop()}}),e,this)}))),function(){return M.apply(this,arguments)})},{key:"save",value:(R=(0,a.Z)(u().mark((function e(){var t,n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={point_id:this.state.point_id,phone_upr:this.state.phone_upr,phone_man:this.state.phone_man,count_tables:this.state.count_tables,cafe_handle_close:this.state.cafe_handle_close,cook_common_stol:this.state.cook_common_stol,summ_driver:this.state.summ_driver,is_active:this.state.is_active},console.log("save=",t),e.next=4,this.getData("save_edit",t);case 4:!1===(n=e.sent).st?alert(n.text):(this.getPoint(),alert("Данные успешно сохранены!"));case 6:case"end":return e.stop()}}),e,this)}))),function(){return R.apply(this,arguments)})},{key:"addTimeDelivery",value:function(){this.setState({modalAddTime:!0}),console.log("addTimeDelivery")}},{key:"stopZone",value:function(){var e=this;this.getPoint(),setTimeout((function(){e.setState({modalStopZone:!0})}),300)}},{key:"changeChekBox",value:function(e,t){"is_active"==e&&0==t.target.checked&&this.opneCloseCafeModal(),this.setState((0,m.Z)({},e,t.target.checked)),"is_сlosed_technic"==e?this.setState({showComment:!!t.target.checked,is_сlosed_overload:!1}):"is_сlosed_overload"==e&&this.setState({showComment:!1,is_сlosed_technic:!1})}},{key:"changeChekBoxZone",value:function(e,t,n){var a=this.state.zone_list;a[t].is_active=1==n.target.checked?1:0,this.setState({zone_list:a})}},{key:"changePoint",value:function(e){var t=this;this.setState({point_id:e.target.value}),setTimeout((function(){t.getPoint()}),250)}},{key:"getPoint",value:(I=(0,a.Z)(u().mark((function e(){var t,n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={point_id:this.state.point_id},e.next=3,this.getData("get_stat",t);case 3:n=e.sent,this.setState({id:n.point_info.id,phone_upr:n.point_info.phone_upr,is_active:n.point_info.is_active,phone_man:n.point_info.phone_man,count_tables:n.point_info.count_tables,cafe_handle_close:n.point_info.cafe_handle_close,cook_common_stol:n.point_info.cook_common_stol,summ_driver:n.point_info.summ_driver,zone_list:n.point_zone,add_time_list:n.add_time_list,dop_time_list:n.dop_time_list,actual_time_list:n.actual_time_list,nal_zone_id:n.nal_zone_id});case 5:case"end":return e.stop()}}),e,this)}))),function(){return I.apply(this,arguments)})},{key:"changeZone",value:function(e){console.log("changeZone"),this.setState({zone_id:e.target.value})}},{key:"opneCloseCafeModal",value:function(){var e=this;console.log("opneCloseCafeModal"),this.getPoint(),setTimeout((function(){e.setState({modalStopReason:!0})}),300)}},{key:"saveZone",value:(_=(0,a.Z)(u().mark((function e(){var t,n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("saveZone"),!confirm("Вы действительное хотите сохранить данные?")){e.next=8;break}return t={zone_list:this.state.zone_list},console.log("data=",t),e.next=6,this.getData("stop_zone",t);case 6:!1===(n=e.sent).st?alert(n.text):(console.log("ok"),this.setState({modalStopZone:!1}));case 8:case"end":return e.stop()}}),e,this)}))),function(){return _.apply(this,arguments)})},{key:"closeModalCafe",value:function(){this.setState({modalStopReason:!1}),0==this.state.is_сlosed_overload&&0==this.state.is_сlosed_technic&&""==this.state.comment&&this.setState({is_active:!0}),this.setState({is_сlosed_overload:0,is_сlosed_technic:0,comment:"",showComment:!1})}},{key:"stopCafe",value:(n=(0,a.Z)(u().mark((function e(){var t,n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!confirm("Вы действительное хотите сохранить данные?")){e.next=6;break}return t={point_id:this.state.point_id,is_сlosed_overload:this.state.is_сlosed_overload?1:0,is_сlosed_technic:this.state.is_сlosed_technic?1:0,comment:this.state.comment},e.next=4,this.getData("stop_cafe",t);case 4:!1===(n=e.sent).st?alert(n.text):(this.setState({modalStopReason:!1}),alert("Данные успешно сохранены!"));case 6:case"end":return e.stop()}}),e,this)}))),function(){return n.apply(this,arguments)})},{key:"saveAddTime",value:(t=(0,a.Z)(u().mark((function e(){var t,n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!confirm("Вы действительное хотите сохранить данные?")){e.next=7;break}return t={nal_zone_id:this.state.nal_zone_id,add_time_id:this.state.add_time_id,time_start:this.state.time_start,time_end:this.state.time_end},console.log("saveAddTime ",t),e.next=5,this.getData("add_time",t);case 5:!1===(n=e.sent).st?alert(n.text):(this.closeAddTime(),this.getPoint(),alert("Данные успешно сохранены!"));case 7:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"closeAddTime",value:function(){this.setState({modalAddTime:!1,add_time_id:0})}},{key:"render",value:function(){var e=this;return d.createElement(d.Fragment,null,d.createElement(f.Z,{style:{zIndex:99},open:this.state.is_load},d.createElement(v.Z,{color:"inherit"})),d.createElement(Z.Z,{open:this.state.modalStopReason,onClose:this.closeModalCafe.bind(this)},d.createElement(k.Z,null,"Причина закрытия кафе"),d.createElement(g.Z,{style:{paddingTop:10}},d.createElement(h.ZP,{container:!0,spacing:3},d.createElement(h.ZP,{item:!0,xs:12,sm:6},d.createElement(D.IA,{label:"Закрыто из-за большого количества заказов",value:1==this.state.is_сlosed_overload,func:this.changeChekBox.bind(this,"is_сlosed_overload")})),d.createElement(h.ZP,{item:!0,xs:12,sm:6},d.createElement(D.IA,{label:"Закрыто по техническим причинам",value:1==this.state.is_сlosed_technic,func:this.changeChekBox.bind(this,"is_сlosed_technic")})),this.state.showComment?d.createElement(h.ZP,{item:!0,xs:12,sm:12},d.createElement(D.rZ,{value:this.state.comment,func:function(t){e.setState({comment:t.target.value})},label:"Другое"})):null)),d.createElement(E.Z,null,d.createElement(p.Z,{color:"primary",onClick:this.stopCafe.bind(this)},"Сохранить"))),d.createElement(Z.Z,{open:this.state.modalStopZone,onClose:function(){e.setState({modalStopZone:!1})}},d.createElement(k.Z,null,"Поставить зону на стоп"),d.createElement(g.Z,{style:{paddingTop:10}},d.createElement(h.ZP,{container:!0,spacing:3},d.createElement(h.ZP,{item:!0,xs:12,sm:6},this.state.zone_list.map((function(t,n){return d.createElement(D.IA,{key:n,label:t.name,value:1==parseInt(t.is_active),func:e.changeChekBoxZone.bind(e,"zone_id",n)})}))))),d.createElement(E.Z,null,d.createElement(p.Z,{color:"primary",onClick:this.saveZone.bind(this)},"Сохранить"))),d.createElement(Z.Z,{open:this.state.modalAddTime,onClose:this.closeAddTime.bind(this)},d.createElement(k.Z,null,"Доп время для курьера"),d.createElement(g.Z,{style:{paddingTop:10}},d.createElement(h.ZP,{container:!0,spacing:3},d.createElement(h.ZP,{item:!0,xs:12,sm:6},d.createElement(D.$S,{is_none:!1,data:this.state.zone_list,value:this.state.nal_zone_id,func:function(t){e.setState({nal_zone_id:t.target.value})},label:"Зона"})),d.createElement(h.ZP,{item:!0,xs:12,sm:6},d.createElement(D.$S,{is_none:!1,data:this.state.add_time_list,value:this.state.add_time_id,func:function(t){e.setState({add_time_id:t.target.value})},label:"Доп время, мин"})),d.createElement(h.ZP,{item:!0,xs:6,sm:6},d.createElement(D.w0,{label:"Время начала",value:this.state.time_start,func:function(t){e.setState({time_start:t.target.value})}})),d.createElement(h.ZP,{item:!0,xs:6,sm:6},d.createElement(D.w0,{label:"Время окончания",value:this.state.time_end,func:function(t){e.setState({time_end:t.target.value})}})))),d.createElement(E.Z,null,d.createElement(p.Z,{color:"primary",onClick:this.saveAddTime.bind(this)},"Поставить"))),d.createElement(h.ZP,{container:!0,spacing:3},d.createElement(h.ZP,{item:!0,xs:12,sm:12},d.createElement("h1",null,this.state.module_name)),d.createElement(h.ZP,{item:!0,xs:12,sm:6},d.createElement(D.$S,{data:this.state.points_list,value:this.state.point_id,func:this.changePoint.bind(this),label:"Точка"})),d.createElement(h.ZP,{item:!0,xs:12,sm:12},d.createElement(D.$S,{is_none:!1,data:this.state.tables,value:this.state.count_tables,func:function(t){e.setState({count_tables:t.target.value})},label:"Количество столов сборки"})),d.createElement(h.ZP,{item:!0,xs:12,sm:4},d.createElement(D.IA,{label:"Общий стол",value:1==this.state.cook_common_stol,func:this.changeChekBox.bind(this,"cook_common_stol")})),d.createElement(h.ZP,{item:!0,xs:12,sm:4},d.createElement(D.IA,{label:"Кафе работает",value:1==this.state.is_active,func:this.changeChekBox.bind(this,"is_active")})),d.createElement(h.ZP,{item:!0,xs:12,sm:4},d.createElement(p.Z,{color:"primary",onClick:this.stopZone.bind(this)},"Поставить зону на стоп")),d.createElement(h.ZP,{item:!0,xs:12,sm:6},d.createElement(D.rZ,{value:this.state.phone_upr,func:function(t){e.setState({phone_upr:t.target.value})},label:"Телефон управляющего"})),d.createElement(h.ZP,{item:!0,xs:12,sm:6},d.createElement(D.rZ,{value:this.state.phone_man,func:function(t){e.setState({phone_man:t.target.value})},label:"Телефон менеджера"})),d.createElement(h.ZP,{item:!0,xs:12,sm:6},d.createElement(D.rZ,{value:this.state.summ_driver,func:function(t){e.setState({summ_driver:t.target.value})},label:"Максимальная сумма нала для курьера"})),d.createElement(h.ZP,{item:!0,xs:12,sm:6},d.createElement(p.Z,{color:"primary",onClick:this.addTimeDelivery.bind(this)},"Добавить время на доставку")),d.createElement(h.ZP,{item:!0,xs:12,sm:6},d.createElement(p.Z,{color:"primary",variant:"contained",onClick:this.save.bind(this)},"Сохранить")),d.createElement(h.ZP,{item:!0,xs:12,style:{marginBottom:"50px"}},d.createElement(C.Z,null,d.createElement(P.Z,{expandIcon:d.createElement(A.Z,null)},d.createElement(T.Z,null,"Актуальное время")),d.createElement(z.Z,null,d.createElement("div",{style:{width:"100%",overflow:"scroll"}},d.createElement(y.Z,null,d.createElement(S.Z,null,d.createElement(w.Z,null,d.createElement(b.Z,{style:{width:"33%"}},"Зона"),d.createElement(b.Z,{style:{width:"33%"}},"Промежуток"),d.createElement(b.Z,{style:{width:"33%"}},"Время доставки"))),d.createElement(x.Z,null,this.state.actual_time_list.map((function(e,t){return d.createElement(w.Z,{key:t},d.createElement(b.Z,null,e.name),d.createElement(b.Z,null,e.time_start," - ",e.time_end),d.createElement(b.Z,null,e.time_dev," мин."))}))))))),this.state.dop_time_list.length>0?d.createElement(C.Z,null,d.createElement(P.Z,{expandIcon:d.createElement(A.Z,null)},d.createElement(T.Z,null,"Дополнительное время")),d.createElement(z.Z,null,d.createElement("div",{style:{width:"100%",overflow:"scroll"}},d.createElement(y.Z,null,d.createElement(S.Z,null,d.createElement(w.Z,null,d.createElement(b.Z,{style:{width:"33%"}},"Зона"),d.createElement(b.Z,{style:{width:"33%"}},"Промежуток"),d.createElement(b.Z,{style:{width:"33%"}},"Время доставки"))),d.createElement(x.Z,null,this.state.dop_time_list.map((function(e,t){return d.createElement(w.Z,{key:t},d.createElement(b.Z,null,e.name),d.createElement(b.Z,null,e.time_start," - ",e.time_end),d.createElement(b.Z,null,e.time_dev," мин."))}))))))):null)))}}]),O}(d.Component);function R(){return d.createElement(I,null)}},1723:(e,t,n)=>{var a=n(4783)(e.id,{locals:!1});e.hot.dispose(a),e.hot.accept(void 0,a)}}]);
//# sourceMappingURL=367.7d338d007dded60ea76f.js.map