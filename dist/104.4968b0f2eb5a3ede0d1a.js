"use strict";(self.webpackChunkpackage_json=self.webpackChunkpackage_json||[]).push([[104],{6104:(t,e,a)=>{a.r(e),a.d(e,{default:()=>D}),a(7331);var n=a(5861),s=a(5671),o=a(3144),i=a(7326),l=a(136),r=a(6215),c=a(1120),m=a(4942),u=a(4687),h=a.n(u),d=a(7294),f=a(30),p=a(1822),Z=a(3150),_=a(6140),v=a(3030),g=a(8561),E=a(8736),y=a(3892),w=a(5705),x=a(6406);var P=a(7563);function k(t){var e=new Date(t),a=""+(e.getMonth()+1),n=""+e.getDate(),s=e.getFullYear();return a.length<2&&(a="0"+a),n.length<2&&(n="0"+n),[s,a,n].join("-")}var b=function(t){(0,l.Z)(S,t);var e,a,u,b,D=(u=S,b=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=(0,c.Z)(u);if(b){var a=(0,c.Z)(this).constructor;t=Reflect.construct(e,arguments,a)}else t=e.apply(this,arguments);return(0,r.Z)(this,t)});function S(t){var e;return(0,s.Z)(this,S),e=D.call(this,t),(0,m.Z)((0,i.Z)(e),"getData",(function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:P.stringify({method:t,module:e.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(a)})}).then((function(t){return t.json()})).then((function(t){if(!1!==t.st||"redir"!=t.type){if(!1!==t.st||"auth"!=t.type)return setTimeout((function(){e.setState({is_load:!1})}),300),t;window.location.pathname="/auth"}else window.location.pathname="/"})).catch((function(t){console.log(t),e.setState({is_load:!1})}))})),e.state={module:"promo_items_stat",module_name:"",is_load:!1,date_start:k(new Date),date_end:k(new Date),point_list:[],choosePoint:[],stats:[],chooseItem:null,items_list:[],promoName:""},e}return(0,o.Z)(S,[{key:"componentDidMount",value:(a=(0,n.Z)(h().mark((function t(){var e;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getData("get_all");case 2:e=t.sent,this.setState({module_name:e.module_info.name,point_list:e.points,stats:e.stats,items_list:e.items}),document.title=e.module_info.name;case 5:case"end":return t.stop()}}),t,this)}))),function(){return a.apply(this,arguments)})},{key:"getStat",value:(e=(0,n.Z)(h().mark((function t(){var e,a;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e={choosePoint:this.state.choosePoint,date_start:this.state.date_start,date_end:this.state.date_end,promoName:this.state.promoName,chooseItem:this.state.chooseItem},t.next=3,this.getData("get_all",e);case 3:a=t.sent,console.log(e),console.log(a),this.setState({stats:a.stats});case 7:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"choosePoint",value:function(t,e){this.setState({choosePoint:e})}},{key:"chooseData",value:function(t,e,a){this.setState((0,m.Z)({},t,"promoName"!=t&&"chooseItem"!=t?k(e):"chooseItem"==t?a:e))}},{key:"chooseDataNew",value:function(t,e,a){var n,s;"promoName"==t&&this.setState((n={},(0,m.Z)(n,t,e.target.value),(0,m.Z)(n,"chooseItem",e.target.value.length>0?null:this.state.chooseItem),n)),"chooseItem"==t&&this.setState((s={},(0,m.Z)(s,t,a),(0,m.Z)(s,"promoName",a?"":this.state.promoName),s))}},{key:"render",value:function(){return d.createElement(d.Fragment,null,d.createElement(y.Z,{open:this.state.is_load,style:{zIndex:99}},d.createElement(w.Z,{color:"inherit"})),d.createElement(f.ZP,{container:!0,spacing:3},d.createElement(f.ZP,{item:!0,xs:12,sm:12},d.createElement("h1",null,this.state.module_name)),d.createElement(f.ZP,{item:!0,xs:12,sm:2},d.createElement(x.e_,{data:this.state.point_list,value:this.state.choosePoint,func:this.choosePoint.bind(this),multiple:!0,label:"Точка"})),d.createElement(f.ZP,{item:!0,xs:12,sm:2},d.createElement(x.Qe,{label:"Дата от",value:this.state.date_start,func:this.chooseData.bind(this,"date_start")})),d.createElement(f.ZP,{item:!0,xs:12,sm:2},d.createElement(x.Qe,{label:"Дата до",value:this.state.date_end,func:this.chooseData.bind(this,"date_end")})),d.createElement(f.ZP,{item:!0,xs:12,sm:3},d.createElement(x.rZ,{value:this.state.promoName,func:this.chooseDataNew.bind(this,"promoName"),label:"Промокод"})),d.createElement(f.ZP,{item:!0,xs:12,sm:3},d.createElement(x.e_,{data:this.state.items_list,value:this.state.chooseItem,func:this.chooseDataNew.bind(this,"chooseItem"),multiple:!1,label:"Товар"})),d.createElement(f.ZP,{item:!0,xs:12,sm:3},d.createElement(p.Z,{variant:"contained",onClick:this.getStat.bind(this)},"Обновить")),d.createElement(f.ZP,{item:!0,xs:12,sm:6},d.createElement(Z.Z,{size:"small"},d.createElement(g.Z,null,d.createElement(E.Z,null,d.createElement(v.Z,null,"Название"),d.createElement(v.Z,null,"Кол-во"))),d.createElement(_.Z,null,this.state.stats?this.state.stats.map((function(t,e){return d.createElement(E.Z,{key:e},d.createElement(v.Z,{style:{textAlign:"left"}},t.name," "),d.createElement(v.Z,{style:{textAlign:"left"}},t.count," "))})):null)))))}}]),S}(d.Component);function D(){return d.createElement(b,null)}},7331:(t,e,a)=>{var n=a(4783)(t.id,{locals:!1});t.hot.dispose(n),t.hot.accept(void 0,n)}}]);
//# sourceMappingURL=104.4968b0f2eb5a3ede0d1a.js.map