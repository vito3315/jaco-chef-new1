"use strict";(self.webpackChunkpackage_json=self.webpackChunkpackage_json||[]).push([[443],{443:(t,e,a)=>{a.r(e),a.d(e,{default:()=>$}),a(1271);var n=a(5861),i=a(4942),s=a(5671),l=a(3144),r=a(7326),o=a(136),m=a(6215),c=a(1120),u=a(4687),d=a.n(u),h=a(7294),p=a(30),y=a(1822),v=a(130),f=a(3150),b=a(6140),E=a(3030),Z=a(8561),_=a(8736),g=a(214),q=a(5670),k=a(6568),w=a(3055),S=a(8727),P=a(808),C=a(231),T=a(3508),x=a(594),D=a(1733),I=a(9620),j=a(2962),R=a(4498),z=a(7745),B=a(3892),M=a(5705),F=a(6406),N=a(1647),W=a(8720);function O(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var a,n=(0,c.Z)(t);if(e){var i=(0,c.Z)(this).constructor;a=Reflect.construct(n,arguments,i)}else a=n.apply(this,arguments);return(0,m.Z)(this,a)}}var U=a(7563);function J(t){var e=new Date(t),a=""+(e.getMonth()+1),n=""+e.getDate(),i=e.getFullYear();return a.length<2&&(a="0"+a),n.length<2&&(n="0"+n),[i,a,n].join("-")}var L=function(t){(0,o.Z)(a,t);var e=O(a);function a(t){var n;return(0,s.Z)(this,a),(n=e.call(this,t)).handleResize=n.handleResize.bind((0,r.Z)(n)),n.state={item:[],date_start:J(new Date),fullScreen:!1},n}return(0,l.Z)(a,[{key:"componentDidUpdate",value:function(t){this.props.event&&this.props.event!==t.event&&this.setState({item:this.props.event})}},{key:"componentDidMount",value:function(){this.handleResize(),window.addEventListener("resize",this.handleResize)}},{key:"handleResize",value:function(){window.innerWidth<601?this.setState({fullScreen:!0}):this.setState({fullScreen:!1})}},{key:"changeTimeStart",value:function(t,e){var a=this.state.item.map((function(a){return a.id_table===t.id_table&&(a.time_start=e.target.value),a}));this.setState({item:a})}},{key:"changeTimeEnd",value:function(t,e){var a=this.state.item.map((function(a){return a.id_table===t.id_table&&(a.time_end=e.target.value),a}));this.setState({item:a})}},{key:"changeItem",value:function(t,e,a){var n=this.state.item.map((function(n){return n.id_table===e.id_table&&n.data.map((function(e){return e.post===t.post&&(e.quantity=Number(a.target.value)),e})),n}));this.setState({item:n})}},{key:"changeDateRange",value:function(t,e){this.setState((0,i.Z)({},t,J(e)))}},{key:"save",value:function(){this.props.save(this,this.state.item,this.state.date_start),this.setState({item:this.props.event?this.props.event:[],date_start:J(new Date)}),this.props.onClose()}},{key:"onClose",value:function(){this.setState({item:this.props.event?this.props.event:[],date_start:J(new Date)}),this.props.onClose()}},{key:"render",value:function(){var t=this;return h.createElement(I.Z,{open:this.props.open,onClose:this.onClose.bind(this),fullScreen:this.state.fullScreen,fullWidth:!0,maxWidth:"md","aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},h.createElement(z.Z,{disableTypography:!0,className:"button"},h.createElement("h4",{style:{fontWeight:"normal"}},this.props.method),this.state.fullScreen?h.createElement(v.Z,{onClick:this.onClose.bind(this),style:{cursor:"pointer"}},h.createElement(x.Z,null)):null),h.createElement(R.Z,{style:{paddingBottom:10,paddingTop:10}},h.createElement(p.ZP,{container:!0,spacing:3,mb:3},h.createElement(p.ZP,{item:!0,sm:6},h.createElement(F.Qe,{label:"Дата",value:this.state.date_start,func:this.changeDateRange.bind(this,"date_start")}))),h.createElement(f.Z,{size:"small",style:{whiteSpace:"nowrap"}},h.createElement(Z.Z,null,h.createElement(_.Z,null,h.createElement(E.Z,{style:{width:"30%"}},"Время"),h.createElement(E.Z,{style:{width:"30%"}},"Должность"),h.createElement(E.Z,{style:{width:"20%"}},"Кол-во"),h.createElement(E.Z,{style:{width:"20%"}}))),this.state.item.map((function(e,a){return h.createElement(h.Fragment,{key:a},h.createElement(b.Z,{key:a+100,sx:{"& td":{border:0},borderBottom:1,borderColor:"divider"}},h.createElement(_.Z,null,h.createElement(E.Z,{rowSpan:"5"},h.createElement(p.ZP,{item:!0,xs:6,sm:12,mb:2},h.createElement(F.w0,{value:e.time_start,func:t.changeTimeStart.bind(t,e),label:"Время начала"})),h.createElement(p.ZP,{item:!0,xs:6,sm:12},h.createElement(F.w0,{value:e.time_end,func:t.changeTimeEnd.bind(t,e),label:"Время окончания"})))),e.data.map((function(a,n){return h.createElement(_.Z,{key:n+1e3},h.createElement(E.Z,null,a.post),h.createElement(E.Z,null,h.createElement(F.rZ,{value:a.quantity,type:"number",func:t.changeItem.bind(t,a,e)})))}))))})))),h.createElement(j.Z,null,h.createElement(y.Z,{onClick:this.save.bind(this)},"Сохранить")))}}]),a}(h.Component),Q=function(t){(0,o.Z)(a,t);var e=O(a);function a(t){var n;return(0,s.Z)(this,a),(n=e.call(this,t)).state={item:[]},n}return(0,l.Z)(a,[{key:"componentDidUpdate",value:function(t){this.props.event&&this.props.event!==t.event&&this.setState({item:this.props.event})}},{key:"componentDidMount",value:function(){this.setState({item:this.props.event})}},{key:"changeTimeStart",value:function(t,e){var a=this.state.item.map((function(a){return a.id_table===t.id_table&&(a.time_start=e.target.value),a}));this.setState({item:a})}},{key:"changeTimeEnd",value:function(t,e){var a=this.state.item.map((function(a){return a.id_table===t.id_table&&(a.time_end=e.target.value),a}));this.setState({item:a})}},{key:"changeItem",value:function(t,e,a){var n=this.state.item.map((function(n){return n.id_table===e.id_table&&n.data.map((function(e){return e.post===t.post&&(e.quantity=Number(a.target.value)),e})),n}));this.setState({item:n})}},{key:"addItem",value:function(){var t=this.state.item;if(t.length){var e={id:t[0].id,day:t[0].day,id_table:t.length+1,time_start:"",time_end:"",data:[{post:"Кассир",quantity:0},{post:"Повар",quantity:0},{post:"Кухонный работник",quantity:0},{post:"Курьер",quantity:0}]};t.push(e)}else{var a={id:this.props.event[0].id,day:this.props.value,id_table:1,time_start:"",time_end:"",data:[{post:"Кассир",quantity:0},{post:"Повар",quantity:0},{post:"Кухонный работник",quantity:0},{post:"Курьер",quantity:0}]};t.push(a)}this.setState({item:t})}},{key:"deleteItem",value:function(t){var e=this.state.item.filter((function(e){return e.id_table!==t}));this.setState({item:e})}},{key:"render",value:function(){var t=this;return h.createElement(h.Fragment,null,h.createElement(w.Z,{value:this.props.value,style:{padding:"0"}},h.createElement(p.ZP,{item:!0,sm:12,mb:3},h.createElement(f.Z,{size:"small",style:{whiteSpace:"nowrap"}},h.createElement(Z.Z,null,h.createElement(_.Z,null,h.createElement(E.Z,{style:{width:"30%"}},"Время"),h.createElement(E.Z,{style:{width:"30%"}},"Должность"),h.createElement(E.Z,{style:{width:"20%"}},"Кол-во"),h.createElement(E.Z,{style:{width:"20%"}}))),this.state.item.map((function(e,a){return h.createElement(h.Fragment,{key:a},h.createElement(b.Z,{key:a+100,sx:{"& td":{border:0},borderBottom:1,borderColor:"divider"}},h.createElement(_.Z,null,h.createElement(E.Z,{rowSpan:"5"},h.createElement(p.ZP,{item:!0,xs:6,sm:12,mb:2},h.createElement(F.w0,{value:e.time_start,func:t.changeTimeStart.bind(t,e),label:"Время начала"})),h.createElement(p.ZP,{item:!0,xs:6,sm:12},h.createElement(F.w0,{value:e.time_end,func:t.changeTimeEnd.bind(t,e),label:"Время окончания"})))),e.data.map((function(a,n){return h.createElement(_.Z,{key:n+1e3},h.createElement(E.Z,null,a.post),h.createElement(E.Z,null,h.createElement(F.rZ,{value:a.quantity,type:"number",func:t.changeItem.bind(t,a,e)})),1!==n?null:h.createElement(E.Z,{colSpan:"5",align:"center"},h.createElement(D.Z,{fontSize:"large",onClick:t.deleteItem.bind(t,e.id_table),style:{cursor:"pointer"}})))}))))})))),h.createElement(p.ZP,{item:!0,sm:12,className:"button"},h.createElement(y.Z,{variant:"contained",style:{whiteSpace:"nowrap"},onClick:this.addItem.bind(this)},"Добавить период"),h.createElement(y.Z,{variant:"contained",onClick:this.props.save.bind(this,this.state.item),style:{backgroundColor:"#00a550",whiteSpace:"nowrap"}},"Сохранить изменения"))))}}]),a}(h.Component),Y=function(t){(0,o.Z)(m,t);var e,a=O(m);function m(t){var e;return(0,s.Z)(this,m),e=a.call(this,t),(0,i.Z)((0,r.Z)(e),"getData",(function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:U.stringify({method:t,module:e.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(a)})}).then((function(t){return t.json()})).then((function(t){if(!1!==t.st||"redir"!=t.type){if(!1!==t.st||"auth"!=t.type)return setTimeout((function(){e.setState({is_load:!1})}),300),t;window.location.pathname="/auth"}else window.location.pathname="/"})).catch((function(t){console.log(t)}))})),e.state={module:"count_users",module_name:"",is_load:!1,points:[{id:-1,name:"Выберите точку"},{base:"jaco_rolls_1",name:"Тольятти, Ленинградская 47",id:"1",city_id:"1"},{base:"jaco_rolls_2",name:"Тольятти, Ворошилова 12а",id:"2",city_id:"1"},{base:"jaco_rolls_3",name:"Тольятти, Матросова 32",id:"3",city_id:"1"},{base:"jaco_rolls_6",name:"Тольятти, Цветной 1",id:"6",city_id:"1"},{base:"jaco_rolls_4",name:"Самара, Куйбышева 113",id:"4",city_id:"2"},{base:"jaco_rolls_5",name:"Самара, Победы 10",id:"5",city_id:"2"},{base:"jaco_rolls_7",name:"Самара, Молодёжная 2",id:"7",city_id:"2"}],point:-1,ItemTab:"1",item:[],event:[{id:"1",day:"1",id_table:1,time_start:"",time_end:"",data:[{post:"Кассир",quantity:1},{post:"Повар",quantity:1},{post:"Кухонный работник",quantity:1},{post:"Курьер",quantity:1}]},{id:"1",day:"2",id_table:1,time_start:"",time_end:"",data:[{post:"Кассир",quantity:2},{post:"Повар",quantity:2},{post:"Кухонный работник",quantity:2},{post:"Курьер",quantity:2}]},{id:"1",day:"3",id_table:1,time_start:"",time_end:"",data:[{post:"Кассир",quantity:3},{post:"Повар",quantity:3},{post:"Кухонный работник",quantity:3},{post:"Курьер",quantity:3}]}],data:[{id:"1",data_table:"2022-10-05",time_start:"19:30",time_end:"20:30",data:[{post:"Кассир",quantity:1},{post:"Повар",quantity:1},{post:"Кухонный работник",quantity:1},{post:"Курьер",quantity:1}]},{id:"1",data_table:"2022-10-06",time_start:"20:30",time_end:"21:30",data:[{post:"Кассир",quantity:2},{post:"Повар",quantity:2},{post:"Кухонный работник",quantity:2},{post:"Курьер",quantity:2}]},{id:"1",data_table:"2022-10-07",time_start:"22:30",time_end:"23:30",data:[{post:"Кассир",quantity:3},{post:"Повар",quantity:3},{post:"Кухонный работник",quantity:3},{post:"Курьер",quantity:3}]}],dataPoint:[],modalDialog:!1},e}return(0,l.Z)(m,[{key:"componentDidMount",value:(e=(0,n.Z)(d().mark((function t(){var e;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getData("get_all");case 2:e=t.sent,this.setState({module_name:e.module_info.name});case 4:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"changePoint",value:function(t){var e=this,a=t.target.value,n=this.state.event,i=this.state.data,s=n.filter((function(a){return t.target.value===a.id&&e.state.ItemTab===a.day})),l=i.filter((function(e){return t.target.value===e.id}));if(!s.length){var r={id:a,day:"1",id_table:1,time_start:"",time_end:"",data:[{post:"Кассир",quantity:0},{post:"Повар",quantity:0},{post:"Кухонный работник",quantity:0},{post:"Курьер",quantity:0}]};s.push(r)}this.setState({point:a,dataPoint:l,item:s})}},{key:"changeTab",value:function(t,e){var a=this,n=this.state.event.filter((function(t){return e===t.day&&a.state.point===t.id}));if(!n.length){var i={id:this.state.point,day:e,id_table:1,time_start:"",time_end:"",data:[{post:"Кассир",quantity:0},{post:"Повар",quantity:0},{post:"Кухонный работник",quantity:0},{post:"Курьер",quantity:0}]};n.push(i)}this.setState({ItemTab:e,item:n})}},{key:"openModal",value:function(t,e,a){if("Особый день"===t){var n=[],i={id:this.state.point,data_table:"",time_start:"",time_end:"",data:[{post:"Кассир",quantity:0},{post:"Повар",quantity:0},{post:"Кухонный работник",quantity:0},{post:"Курьер",quantity:0}]};n.push(i),this.setState({modalDialog:!0,method:t,item:n})}"Редактировать особый день"===t&&(a.stopPropagation(),this.setState({modalDialog:!0,method:t,item:[e]}))}},{key:"saveItem",value:function(t,e,a){}},{key:"render",value:function(){var t=this;return h.createElement(h.Fragment,null,h.createElement(B.Z,{style:{zIndex:99},open:this.state.is_load},h.createElement(M.Z,{color:"inherit"})),h.createElement(L,{open:this.state.modalDialog,onClose:function(){t.setState({modalDialog:!1})},method:this.state.method,event:this.state.item,save:this.saveItem.bind(this)}),h.createElement(p.ZP,{container:!0,spacing:3,mb:3},h.createElement(p.ZP,{item:!0,xs:12,sm:12},h.createElement("h1",null,this.state.module_name))),h.createElement(p.ZP,{item:!0,xs:12,sm:!0,container:!0,spacing:3},h.createElement(p.ZP,{item:!0,xs:!0,container:!0,direction:"column",spacing:3,mb:4,sm:7},h.createElement(p.ZP,{container:!0,spacing:3,direction:"row",wrap:"nowrap",item:!0,xs:!0,mb:4},h.createElement(p.ZP,{item:!0,sm:6},h.createElement(F.$S,{data:this.state.points,value:this.state.point,func:this.changePoint.bind(this),label:"Точка"})),h.createElement(p.ZP,{item:!0,sm:2},h.createElement(y.Z,{disabled:this.state.point<1,variant:"contained",style:{whiteSpace:"nowrap"},onClick:this.openModal.bind(this,"Особый день")},"Добавить особый день"))),this.state.point<1?null:h.createElement(p.ZP,{container:!0,spacing:3,p:4},h.createElement(p.ZP,{item:!0,sm:12},h.createElement(q.ZP,{value:this.state.ItemTab},h.createElement(W.Z,{sx:{borderBottom:1,borderColor:"divider",marginBottom:3}},h.createElement(k.Z,{onChange:this.changeTab.bind(this),variant:"fullWidth"},h.createElement(g.Z,{label:"Понедельник",value:"1"}),h.createElement(g.Z,{label:"Вторник",value:"2"}),h.createElement(g.Z,{label:"Среда",value:"3"}),h.createElement(g.Z,{label:"Четверг",value:"4"}),h.createElement(g.Z,{label:"Пятница",value:"5"}),h.createElement(g.Z,{label:"Суббота",value:"6"}),h.createElement(g.Z,{label:"Воскресенье",value:"7"}))),h.createElement(Q,{value:this.state.ItemTab,event:this.state.item,save:this.saveItem.bind(this)}))))),this.state.point<1||!this.state.dataPoint.length?null:h.createElement(p.ZP,{item:!0,sm:5},h.createElement(S.Z,null,h.createElement(P.Z,{expandIcon:h.createElement(T.Z,null),"aria-controls":"panel1a-content"},h.createElement(N.Z,null,"Даты")),h.createElement(C.Z,null,this.state.dataPoint.map((function(e,a){return h.createElement(S.Z,{key:a},h.createElement(P.Z,null,h.createElement(N.Z,{onClick:t.openModal.bind(t,"Редактировать особый день",e)},e.data_table)))})))))))}}]),m}(h.Component);function $(){return h.createElement(Y,null)}},1271:(t,e,a)=>{var n=a(4783)(t.id,{locals:!1});t.hot.dispose(n),t.hot.accept(void 0,n)}}]);
//# sourceMappingURL=443.1dc329800d88bb560ef5.js.map