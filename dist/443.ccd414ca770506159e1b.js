"use strict";(self.webpackChunkpackage_json=self.webpackChunkpackage_json||[]).push([[443],{443:(e,t,n)=>{n.r(t),n.d(t,{default:()=>F}),n(1271);var a=n(5861),i=n(4942),s=n(5671),r=n(3144),o=n(7326),l=n(136),c=n(6215),p=n(1120),m=n(4687),u=n.n(m),d=n(7294),h=n(30),f=n(1822),v=n(130),_=n(1647),g=n(8720),y=n(214),E=n(5670),Z=n(6568),b=n(3055),x=n(8727),k=n(808),w=n(231),S=n(3508),C=n(9620),I=n(2962),D=n(4498),P=n(7745),T=n(594),N=n(3892),j=n(5705),O=n(4373),R=n(6406);function z(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=(0,p.Z)(e);if(t){var i=(0,p.Z)(this).constructor;n=Reflect.construct(a,arguments,i)}else n=a.apply(this,arguments);return(0,c.Z)(this,n)}}var B=n(7563),J=function(e){(0,l.Z)(n,e);var t=z(n);function n(e){var a;return(0,s.Z)(this,n),(a=t.call(this,e)).handleResize=a.handleResize.bind((0,o.Z)(a)),a.state={item:[],date_start:"",fullScreen:!1},a}return(0,r.Z)(n,[{key:"componentDidUpdate",value:function(e){this.props.event&&this.props.event!==e.event&&this.setState({item:JSON.parse(JSON.stringify(this.props.event)),date_start:JSON.parse(JSON.stringify(this.props.event[0].date))})}},{key:"componentDidMount",value:function(){this.handleResize(),window.addEventListener("resize",this.handleResize)}},{key:"handleResize",value:function(){window.innerWidth<601?this.setState({fullScreen:!0}):this.setState({fullScreen:!1})}},{key:"changeTimeStart",value:function(e,t){var n=this.state.item.map((function(n){return n.id===e.id&&(n.time_start=t.target.value),n}));this.setState({item:n})}},{key:"changeTimeEnd",value:function(e,t){var n=this.state.item.map((function(n){return n.id===e.id&&(n.time_end=t.target.value),n}));this.setState({item:n})}},{key:"changeItem",value:function(e,t,n){var a=this.state.item.map((function(a){return a.id===t.id&&a.apps.map((function(t){return t.app_id===e.app_id&&(t.count=Number(n.target.value)),t})),a}));this.setState({item:a})}},{key:"changeDateRange",value:function(e){var t=this.state.item;t.forEach((function(t){return t.date=(a=""+((n=new Date(e)).getMonth()+1),i=""+n.getDate(),s=n.getFullYear(),a.length<2&&(a="0"+a),i.length<2&&(i="0"+i),[s,a,i].join("-"));var n,a,i,s})),this.setState({item:t})}},{key:"save",value:function(){var e=this.state.item;this.props.save(e,this.props.method,this.state.date_start),this.setState({item:this.props.event?this.props.event:[]}),this.props.onClose()}},{key:"addItem",value:function(){var e=this.state.item;if(e.length){var t={id:e.length+1,time_start:"",time_end:"",apps:[{app_id:"6",count:"0",app_name:"Кассир"},{app_id:"5",count:"0",app_name:"Повар"},{app_id:"21",count:"0",app_name:"Кухонный работник"},{app_id:"8",count:"0",app_name:"Курьер"}]};e.push(t)}else e.push({id:1,time_start:"",time_end:"",apps:[{app_id:"6",count:"0",app_name:"Кассир"},{app_id:"5",count:"0",app_name:"Повар"},{app_id:"21",count:"0",app_name:"Кухонный работник"},{app_id:"8",count:"0",app_name:"Курьер"}]});this.setState({item:e})}},{key:"deleteItem",value:function(e){var t=this.state.item.filter((function(t){return t.id!==e}));this.setState({item:t})}},{key:"onClose",value:function(){this.setState({item:this.props.event?this.props.event:[]}),this.props.onClose()}},{key:"render",value:function(){var e=this;return d.createElement(C.Z,{open:this.props.open,onClose:this.onClose.bind(this),fullScreen:this.state.fullScreen,fullWidth:!0,maxWidth:"md","aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},d.createElement(P.Z,{className:"button"},d.createElement(_.Z,{style:{fontWeight:"normal"}},this.props.method),this.state.fullScreen?d.createElement(v.Z,{onClick:this.onClose.bind(this),style:{cursor:"pointer"}},d.createElement(T.Z,null)):null),d.createElement(D.Z,{style:{paddingTop:10,paddingBottom:10}},d.createElement(h.ZP,{container:!0,spacing:3,mb:3},d.createElement(h.ZP,{item:!0,xs:12,sm:6},d.createElement(R.Qe,{label:"Дата",value:this.state.item[0]?this.state.item[0].date:"",func:this.changeDateRange.bind(this)}))),this.state.item.map((function(t,n){return d.createElement(d.Fragment,{key:n},d.createElement(h.ZP,{container:!0,spacing:3},d.createElement(h.ZP,{item:!0,xs:8,sm:3,mt:2},d.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-around",height:"100%",minHeight:120}},d.createElement(R.w0,{value:t.time_start,func:e.changeTimeStart.bind(e,t),label:"Время начала"}),d.createElement(R.w0,{value:t.time_end,func:e.changeTimeEnd.bind(e,t),label:"Время окончания"}))),d.createElement(h.ZP,{item:!0,xs:4,sm:0,sx:{display:{xs:"flex",sm:"none"},justifyContent:"center",alignItems:"center"}},d.createElement(T.Z,{fontSize:"large",onClick:e.deleteItem.bind(e,t.id),style:{cursor:"pointer"}})),d.createElement(h.ZP,{item:!0,sm:8},d.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"100%"}},t.apps.map((function(n,a){return d.createElement("div",{key:a+10,style:{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:20,marginTop:0===a?20:0}},d.createElement("span",{style:{minWidth:200}},n.app_name),d.createElement(R.rZ,{value:n.count,type:"number",func:e.changeItem.bind(e,n,t)}))})))),d.createElement(h.ZP,{item:!0,xs:4,sm:1,sx:{display:{xs:"none",sm:"flex"},justifyContent:"center",alignItems:"center"}},d.createElement(T.Z,{fontSize:"large",onClick:e.deleteItem.bind(e,t.id),style:{cursor:"pointer"}}))),d.createElement(O.Z,null))}))),d.createElement(I.Z,{className:"button"},d.createElement(f.Z,{style:{whiteSpace:"nowrap"},onClick:this.addItem.bind(this)},"Добавить"),d.createElement(f.Z,{style:{color:"#00a550"},onClick:this.save.bind(this)},"Сохранить")))}}]),n}(d.Component),M=function(e){(0,l.Z)(n,e);var t=z(n);function n(e){var a;return(0,s.Z)(this,n),(a=t.call(this,e)).state={item:[]},a}return(0,r.Z)(n,[{key:"componentDidUpdate",value:function(e){this.props.event&&this.props.event!==e.event&&this.setState({item:JSON.parse(JSON.stringify(this.props.event))})}},{key:"componentDidMount",value:function(){this.setState({item:JSON.parse(JSON.stringify(this.props.event))})}},{key:"changeTimeStart",value:function(e,t){var n=this.state.item.map((function(n){return n.id===e.id&&(n.time_start=t.target.value),n}));this.setState({item:n})}},{key:"changeTimeEnd",value:function(e,t){var n=this.state.item.map((function(n){return n.id===e.id&&(n.time_end=t.target.value),n}));this.setState({item:n})}},{key:"changeItem",value:function(e,t,n){var a=this.state.item.map((function(a){return a.id===t.id&&a.apps.map((function(t){return t.app_id===e.app_id&&(t.count=Number(n.target.value)),t})),a}));this.setState({item:a})}},{key:"addItem",value:function(){var e=this.state.item;if(e.length){var t={id:e.length+1,time_start:"",time_end:"",apps:[{app_id:"6",count:"0",app_name:"Кассир"},{app_id:"5",count:"0",app_name:"Повар"},{app_id:"21",count:"0",app_name:"Кухонный работник"},{app_id:"8",count:"0",app_name:"Курьер"}]};e.push(t)}else e.push({id:1,time_start:"",time_end:"",apps:[{app_id:"6",count:"0",app_name:"Кассир"},{app_id:"5",count:"0",app_name:"Повар"},{app_id:"21",count:"0",app_name:"Кухонный работник"},{app_id:"8",count:"0",app_name:"Курьер"}]});this.setState({item:e})}},{key:"deleteItem",value:function(e){var t=this.state.item.filter((function(t){return t.id!==e}));this.setState({item:t})}},{key:"save",value:function(){var e=this.state.item;this.props.save(e,"Изменение данных таблицы"),this.setState({item:JSON.parse(JSON.stringify(this.props.event))})}},{key:"render",value:function(){var e=this;return d.createElement(d.Fragment,null,d.createElement(b.Z,{value:this.props.value},d.createElement(h.ZP,{container:!0,justifyContent:"center"},this.state.item.map((function(t,n){return d.createElement(h.ZP,{container:!0,spacing:3,key:n,sx:{borderBottom:1,borderColor:"divider"},item:!0,sm:8},d.createElement(h.ZP,{item:!0,xs:8,sm:3,mt:2},d.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-around",height:"100%",minHeight:120}},d.createElement(R.w0,{value:t.time_start,func:e.changeTimeStart.bind(e,t),label:"Время начала"}),d.createElement(R.w0,{value:t.time_end,func:e.changeTimeEnd.bind(e,t),label:"Время окончания"}))),d.createElement(h.ZP,{item:!0,xs:4,sm:0,sx:{display:{xs:"flex",sm:"none"},justifyContent:"center",alignItems:"center"}},d.createElement(T.Z,{fontSize:"large",onClick:e.deleteItem.bind(e,t.id),style:{cursor:"pointer"}})),d.createElement(h.ZP,{item:!0,sm:6},d.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"100%"}},t.apps.map((function(n,a){return d.createElement("div",{key:a+10,style:{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:20,marginTop:0===a?20:0}},d.createElement("span",{style:{minWidth:200}},n.app_name),d.createElement(R.rZ,{value:n.count,type:"number",func:e.changeItem.bind(e,n,t)}))})))),d.createElement(h.ZP,{item:!0,xs:4,sm:3,sx:{display:{xs:"none",sm:"flex"},justifyContent:"center",alignItems:"center"}},d.createElement(T.Z,{fontSize:"large",onClick:e.deleteItem.bind(e,t.id),style:{cursor:"pointer"}})))})),d.createElement(h.ZP,{item:!0,sm:8,container:!0,spacing:3,sx:{marginBottom:{xs:0,sm:3},marginTop:1}},d.createElement(h.ZP,{item:!0,xs:6,sm:9},d.createElement(f.Z,{variant:"contained",style:{whiteSpace:"nowrap"},onClick:this.addItem.bind(this)},"Добавить")),d.createElement(h.ZP,{item:!0,xs:6,sm:3},d.createElement(f.Z,{variant:"contained",onClick:this.save.bind(this),style:{backgroundColor:"#00a550",whiteSpace:"nowrap"}},"Сохранить"))))))}}]),n}(d.Component),W=function(e){(0,l.Z)(C,e);var t,n,c,p,m,v,b=z(C);function C(e){var t;return(0,s.Z)(this,C),t=b.call(this,e),(0,i.Z)((0,o.Z)(t),"getData",(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:B.stringify({method:e,module:t.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(n)})}).then((function(e){return e.json()})).then((function(e){if(!1!==e.st||"redir"!=e.type){if(!1!==e.st||"auth"!=e.type)return setTimeout((function(){t.setState({is_load:!1})}),300),e;window.location.pathname="/auth"}else window.location.pathname="/"})).catch((function(e){console.log(e)}))})),t.state={module:"count_users",module_name:"",is_load:!1,points:[],point:"",ItemTab:"1",item:[],data:[{id:1,date:"",time_start:"",time_end:"",apps:[{app_id:"6",count:"0",app_name:"Кассир"},{app_id:"5",count:"0",app_name:"Повар"},{app_id:"21",count:"0",app_name:"Кухонный работник"},{app_id:"8",count:"0",app_name:"Курьер"}]}],other_days:[],modalDialog:!1,dows:[],dow:[]},t}return(0,r.Z)(C,[{key:"componentDidMount",value:(v=(0,a.Z)(u().mark((function e(){var t,n,a,i,s,r;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.state.ItemTab,e.next=3,this.getData("get_all");case 3:return n=e.sent,a=this.state.data,i={point_id:n.point_list[0].id},e.next=8,this.getData("get_info",i);case 8:s=e.sent,(r=s.dows.find((function(e){return e.dow===Number(t)}))).times.map((function(e,t){return e.id=t+1})),this.setState({points:n.point_list,point:n.point_list[0].id,module_name:n.module_info.name,dows:s.dows,dow:r.times.length?r.times:a,other_days:s.other_days}),document.title=n.module_info.name;case 13:case"end":return e.stop()}}),e,this)}))),function(){return v.apply(this,arguments)})},{key:"changePoint",value:(m=(0,a.Z)(u().mark((function e(t){var n,a,i,s,r;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.state.ItemTab,a=this.state.data,i={point_id:t.target.value},e.next=5,this.getData("get_info",i);case 5:s=e.sent,(r=s.dows.find((function(e){return e.dow===Number(n)}))).times.map((function(e,t){return e.id=t+1})),this.setState({point:t.target.value,dows:s.dows,dow:r.times.length?r.times:a,other_days:s.other_days});case 9:case"end":return e.stop()}}),e,this)}))),function(e){return m.apply(this,arguments)})},{key:"changeTab",value:function(e,t){var n=this.state.dows,a=this.state.data,i=n.find((function(e){return e.dow===Number(t)}));i.times.map((function(e,t){return e.id=t+1})),this.setState({ItemTab:t,dow:i.times.length?i.times:a})}},{key:"openModal",value:(p=(0,a.Z)(u().mark((function e(t,n,a){var i,s,r,o;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Особый день"===t&&(i=[{id:1,date:"",time_start:"",time_end:"",apps:[{app_id:"6",count:"0",app_name:"Кассир"},{app_id:"5",count:"0",app_name:"Повар"},{app_id:"21",count:"0",app_name:"Кухонный работник"},{app_id:"8",count:"0",app_name:"Курьер"}]}],this.setState({modalDialog:!0,method:t,item:i})),"Редактировать особый день"!==t){e.next=10;break}return a.stopPropagation(),s=this.state.point,r={date:n.date,point_id:s},e.next=7,this.getData("get_day",r);case 7:(o=e.sent).forEach((function(e){e.id=1,e.apps=[],e.apps.push({app_id:"6",count:e.count_kassir,app_name:"Кассир"},{app_id:"5",count:e.count_povar,app_name:"Повар"},{app_id:"21",count:e.count_kux,app_name:"Кухонный работник"},{app_id:"8",count:e.count_driver,app_name:"Курьер"}),delete e.count_kassir,delete e.count_povar,delete e.count_kux,delete e.count_driver})),this.setState({modalDialog:!0,method:t,item:o});case 10:case"end":return e.stop()}}),e,this)}))),function(e,t,n){return p.apply(this,arguments)})},{key:"save",value:(c=(0,a.Z)(u().mark((function e(t,n,a){var i,s,r,o,l,c,p=this;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i=this.state.ItemTab,s=this.state.point,r=t[0].date,t.forEach((function(e){e.dow=Number(i),delete e.id,e.apps.forEach((function(t){"Кассир"===t.app_name&&(e.count_kassir=t.count),"Повар"===t.app_name&&(e.count_povar=t.count),"Кухонный работник"===t.app_name&&(e.count_kux=t.count),"Курьер"===t.app_name&&(e.count_driver=t.count)})),delete e.apps,e.date&&delete e.date})),"Изменение данных таблицы"!==n){e.next=10;break}return o={point_id:s,dow:i,data:t},e.next=8,this.getData("update",o);case 8:e.sent,setTimeout((function(){p.update()}),300);case 10:if("Особый день"!==n){e.next=16;break}return l={point_id:s,date:r,data:t},e.next=14,this.getData("save_new_day",l);case 14:e.sent,setTimeout((function(){p.update()}),300);case 16:if("Редактировать особый день"!==n){e.next=22;break}return c={point_id:s,date:r,old_day:a,data:t},e.next=20,this.getData("save_edit_day",c);case 20:e.sent,setTimeout((function(){p.update()}),300);case 22:case"end":return e.stop()}}),e,this)}))),function(e,t,n){return c.apply(this,arguments)})},{key:"deleteItem",value:(n=(0,a.Z)(u().mark((function e(t,n){var a,i=this;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.stopPropagation(),a={point_id:t.point_id,date:t.date},e.next=4,this.getData("del_day",a);case 4:setTimeout((function(){i.update()}),300);case 5:case"end":return e.stop()}}),e,this)}))),function(e,t){return n.apply(this,arguments)})},{key:"update",value:(t=(0,a.Z)(u().mark((function e(){var t,n,a,i,s,r;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.state.ItemTab,n=this.state.point,a=this.state.data,i={point_id:n},e.next=6,this.getData("get_info",i);case 6:s=e.sent,(r=s.dows.find((function(e){return e.dow===Number(t)}))).times.map((function(e,t){return e.id=t+1})),this.setState({dows:s.dows,dow:r.times.length?r.times:a,other_days:s.other_days});case 10:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"render",value:function(){var e=this;return d.createElement(d.Fragment,null,d.createElement(N.Z,{style:{zIndex:99},open:this.state.is_load},d.createElement(j.Z,{color:"inherit"})),d.createElement(J,{open:this.state.modalDialog,onClose:function(){e.setState({modalDialog:!1})},method:this.state.method,event:this.state.item,save:this.save.bind(this)}),d.createElement(h.ZP,{container:!0,spacing:3},d.createElement(h.ZP,{item:!0,xs:12},d.createElement("h1",null,this.state.module_name)),d.createElement(h.ZP,{item:!0,xs:12,sm:6},d.createElement(R.$S,{data:this.state.points,value:this.state.point,func:this.changePoint.bind(this),label:"Точка"})),d.createElement(h.ZP,{item:!0,xs:12,sm:6},d.createElement(f.Z,{variant:"contained",style:{whiteSpace:"nowrap"},onClick:this.openModal.bind(this,"Особый день")},"Добавить особый день")),this.state.point<1?null:d.createElement(h.ZP,{item:!0,xs:12,sm:8},d.createElement(E.ZP,{value:this.state.ItemTab},d.createElement(g.Z,{sx:{borderBottom:1,borderColor:"divider"}},d.createElement(Z.Z,{onChange:this.changeTab.bind(this),variant:"scrollable",scrollButtons:!0,allowScrollButtonsMobile:!0},d.createElement(y.Z,{label:"Понедельник",value:"1"}),d.createElement(y.Z,{label:"Вторник",value:"2"}),d.createElement(y.Z,{label:"Среда",value:"3"}),d.createElement(y.Z,{label:"Четверг",value:"4"}),d.createElement(y.Z,{label:"Пятница",value:"5"}),d.createElement(y.Z,{label:"Суббота",value:"6"}),d.createElement(y.Z,{label:"Воскресенье",value:"7"}))),d.createElement(M,{value:this.state.ItemTab,event:this.state.dow,save:this.save.bind(this)}))),this.state.other_days.length?d.createElement(h.ZP,{item:!0,xs:12,sm:4,mb:3},d.createElement(x.Z,null,d.createElement(k.Z,{expandIcon:d.createElement(S.Z,null),"aria-controls":"panel1a-content"},d.createElement(_.Z,null,"Даты")),d.createElement(w.Z,null,this.state.other_days.map((function(t,n){return d.createElement(x.Z,{key:n,expanded:!0,sx:{borderBottom:1,borderColor:"divider"}},d.createElement(k.Z,{expandIcon:d.createElement(T.Z,{onClick:e.deleteItem.bind(e,t)})},d.createElement(_.Z,{onClick:e.openModal.bind(e,"Редактировать особый день",t)},t.date)))}))))):null))}}]),C}(d.Component);function F(){return d.createElement(W,null)}},1271:(e,t,n)=>{var a=n(4783)(e.id,{locals:!1});e.hot.dispose(a),e.hot.accept(void 0,a)}}]);
//# sourceMappingURL=443.ccd414ca770506159e1b.js.map