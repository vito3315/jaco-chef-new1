"use strict";(self.webpackChunkpackage_json=self.webpackChunkpackage_json||[]).push([[741],{7741:(e,t,n)=>{n.r(t),n.d(t,{default:()=>W}),n(7500);var a=n(5861),r=n(7326),i=n(4942),s=n(5671),l=n(3144),c=n(136),o=n(6215),m=n(1120),u=n(4687),h=n.n(u),p=n(7294),d=n(30),Z=n(1822),f=n(3150),v=n(6140),E=n(3030),g=n(8561),_=n(8736),w=n(3406),y=n(2961),b=n(2450),k=n(9620),x=n(2962),P=n(4498),C=n(7745),I=n(3892),D=n(5705),S=n(6406);function M(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=(0,m.Z)(e);if(t){var r=(0,m.Z)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return(0,o.Z)(this,n)}}var N=n(7563),F=function(e){(0,c.Z)(n,e);var t=M(n);function n(){return(0,s.Z)(this,n),t.apply(this,arguments)}return(0,l.Z)(n,[{key:"shouldComponentUpdate",value:function(e){var t=e.cameras,n=this.props.cameras;return!(t.length==n.length&&t.every((function(e,t){return e===n[t]})))}},{key:"render",value:function(){var e=this;return p.createElement(w.Z,null,p.createElement(d.ZP,{sx:{fontWeight:"bold"},mt:3,mb:3},"Ошибки по камерам"),p.createElement(f.Z,null,p.createElement(g.Z,null,p.createElement(_.Z,null,p.createElement(E.Z,{style:{width:"35%"}},"Наименование"),p.createElement(E.Z,{style:{width:"20%"}},"Размер штрафа за первый раз"),p.createElement(E.Z,{style:{width:"20%"}},"Размер штрафа за второй раз"),p.createElement(E.Z,{style:{width:"20%"}},"Размер штрафа за третий и последующие"),p.createElement(E.Z,{style:{width:"5%"}}))),p.createElement(v.Z,null,this.props.cameras.map((function(t,n){return p.createElement(_.Z,{key:n},p.createElement(E.Z,{style:{cursor:"pointer"},onClick:e.props.openModal.bind(e,"Штраф по камерам",t.id)},t.name),p.createElement(E.Z,null,t.price_one," руб"),p.createElement(E.Z,null,t.price_two," руб"),p.createElement(E.Z,null,t.price_tree," руб"),p.createElement(E.Z,null,1==parseInt(t.is_active)?p.createElement(y.Z,null):p.createElement(b.Z,null)))})))))}}]),n}(p.Component),R=function(e){(0,c.Z)(n,e);var t=M(n);function n(){return(0,s.Z)(this,n),t.apply(this,arguments)}return(0,l.Z)(n,[{key:"shouldComponentUpdate",value:function(e){var t=e.reviews,n=this.props.reviews;return!(t.length==n.length&&t.every((function(e,t){return e===n[t]})))}},{key:"render",value:function(){var e=this;return p.createElement(w.Z,null,p.createElement(d.ZP,{sx:{fontWeight:"bold"},mt:3,mb:3},"Ошибки по отзывам"),p.createElement(f.Z,null,p.createElement(g.Z,null,p.createElement(_.Z,null,p.createElement(E.Z,{style:{width:"35%"}},"Наименование"),p.createElement(E.Z,{style:{width:"20%"}},"Процент за первый раз"),p.createElement(E.Z,{style:{width:"20%"}},"Процент за второй раз"),p.createElement(E.Z,{style:{width:"20%"}},"Процент за третий и последующие"),p.createElement(E.Z,{style:{width:"5%"}}))),p.createElement(v.Z,null,this.props.reviews.map((function(t,n){return p.createElement(p.Fragment,{key:t.id},p.createElement(_.Z,null,p.createElement(E.Z,{style:{cursor:"pointer"},rowSpan:"2",onClick:e.props.openModal.bind(e,"Штраф по отзывам",t.id)},t.name),p.createElement(E.Z,null,t.percent_one," %"),p.createElement(E.Z,null,t.percent_two," %"),p.createElement(E.Z,null,t.percent_tree," %"),p.createElement(E.Z,{rowSpan:"2"},1==parseInt(t.is_active)?p.createElement(y.Z,null):p.createElement(b.Z,null))),p.createElement(_.Z,null,p.createElement(E.Z,null,t.price_one," руб"),p.createElement(E.Z,null,t.price_two," руб"),p.createElement(E.Z,null,t.price_tree," руб")))})))))}}]),n}(p.Component),j=function(e){(0,c.Z)(n,e);var t=M(n);function n(e){var a;return(0,s.Z)(this,n),(a=t.call(this,e)).state={item:null},a}return(0,l.Z)(n,[{key:"changeItem",value:function(e,t){var n=this.state.item;n[e]=t.target.value,this.setState({item:n})}},{key:"changeItemChecked",value:function(e,t){var n=this.state.item;n[e]=!0===t.target.checked?1:0,this.setState({item:n})}},{key:"onClose",value:function(){this.setState({item:null}),this.props.onClose()}},{key:"render",value:function(){return p.createElement(k.Z,{open:this.props.open,onClose:this.onClose.bind(this),fullWidth:!0,maxWidth:"lg"},p.createElement(C.Z,{id:"alert-dialog-title"},this.props.method,this.props.itemName?": ".concat(this.props.itemName):""),p.createElement(P.Z,{style:{paddingBottom:10,paddingTop:10}},p.createElement(d.ZP,{container:!0,spacing:3},p.createElement(d.ZP,{item:!0,xs:12},p.createElement(d.ZP,{container:!0,spacing:3},p.createElement(d.ZP,{item:!0,xs:12,sm:8,mb:2},p.createElement(S.rZ,{label:"Наименование штрафа",value:this.state.item.name,func:this.changeItem.bind(this,"name")}))),"Новый штраф по отзывам"===this.props.method||"Штраф по отзывам"===this.props.method?p.createElement(d.ZP,{container:!0,spacing:3},p.createElement(d.ZP,{item:!0,xs:12,sm:4,mb:2},p.createElement(S.rZ,{label:"Процент за первый раз",value:this.state.item.percent_one,func:this.changeItem.bind(this,"percent_one")})),p.createElement(d.ZP,{item:!0,xs:12,sm:4,mb:2},p.createElement(S.rZ,{label:"Процент за второй раз",value:this.state.item.percent_two,func:this.changeItem.bind(this,"percent_two")})),p.createElement(d.ZP,{item:!0,xs:12,sm:4,mb:2},p.createElement(S.rZ,{label:"Процент за третий и последующие",value:this.state.item.percent_tree,func:this.changeItem.bind(this,"percent_tree")}))):null,p.createElement(d.ZP,{container:!0,spacing:3},p.createElement(d.ZP,{item:!0,xs:12,sm:4,mb:2},p.createElement(S.rZ,{label:"Размер штрафа за первый раз",value:this.state.item.price_one,func:this.changeItem.bind(this,"price_one")})),p.createElement(d.ZP,{item:!0,xs:12,sm:4,mb:2},p.createElement(S.rZ,{label:"Размер штрафа за второй раз",value:this.state.item.price_two,func:this.changeItem.bind(this,"price_two")})),p.createElement(d.ZP,{item:!0,xs:12,sm:4,mb:2},p.createElement(S.rZ,{label:"Размер штрафа за третий и последующие",value:this.state.item.price_tree,func:this.changeItem.bind(this,"price_tree")}))),p.createElement(d.ZP,{container:!0,spacing:3},"Новый штраф по камерам"===this.props.method||"Штраф по камерам"===this.props.method?p.createElement(d.ZP,{item:!0,xs:12,sm:3},p.createElement(S.IA,{label:"Картинка",value:1==parseInt(this.state.item.img),func:this.changeItemChecked.bind(this,"img")})):null,"Штраф по отзывам"===this.props.method||"Штраф по камерам"===this.props.method?p.createElement(d.ZP,{item:!0,xs:12,sm:3},p.createElement(S.IA,{label:"Активность",value:1==parseInt(this.state.item.is_active),func:this.changeItemChecked.bind(this,"is_active")})):null)))),p.createElement(x.Z,null,p.createElement(Z.Z,{onClick:this.props.save.bind(this,this.props.method,this.state.item),color:"primary"},"Сохранить")))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.event&&e.event!==t.event?{item:e.event}:null}}]),n}(p.Component),T=function(e){(0,c.Z)(f,e);var t,n,o,m,u=M(f);function f(e){var t;return(0,s.Z)(this,f),t=u.call(this,e),(0,i.Z)((0,r.Z)(t),"getData",(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:N.stringify({method:e,module:t.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(n)})}).then((function(e){return e.json()})).then((function(e){if(!1!==e.st||"redir"!=e.type){if(!1!==e.st||"auth"!=e.type)return setTimeout((function(){t.setState({is_load:!1})}),300),e;window.location.pathname="/auth"}else window.location.pathname="/"})).catch((function(e){console.log(e)}))})),t.state={module:"fines",module_name:"",is_load:!1,modalDialog:!1,itemName:"",cameras:[],reviews:[],event:{},method:"",newFine:{name:"",percent_one:"",percent_two:"",percent_tree:"",price_one:"",price_two:"",price_tree:"",is_active:0,img:0}},t}return(0,l.Z)(f,[{key:"componentDidMount",value:(m=(0,a.Z)(h().mark((function e(){var t;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData("get_all");case 2:t=e.sent,this.setState({cameras:t.items,reviews:t.items_1,module_name:t.module_info.name}),document.title=t.module_info.name;case 5:case"end":return e.stop()}}),e,this)}))),function(){return m.apply(this,arguments)})},{key:"openModal",value:(o=(0,a.Z)(h().mark((function e(t,n){var a,r,i,s;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Новый штраф по камерам"===t&&this.setState({modalDialog:!0,method:t,event:this.state.newFine}),"Новый штраф по отзывам"===t&&this.setState({modalDialog:!0,method:t,event:this.state.newFine}),"Штраф по камерам"!==t){e.next=8;break}return a={id:n},e.next=6,this.getData("get_one_cam",a);case 6:r=e.sent,this.setState({modalDialog:!0,method:t,event:r.item,itemName:r.item.name});case 8:if("Штраф по отзывам"!==t){e.next=14;break}return i={id:n},e.next=12,this.getData("get_one_orders",i);case 12:s=e.sent,this.setState({modalDialog:!0,method:t,event:s.item,itemName:s.item.name});case 14:case"end":return e.stop()}}),e,this)}))),function(e,t){return o.apply(this,arguments)})},{key:"saveItem",value:(n=(0,a.Z)(h().mark((function e(t,n){return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.setState({modalDialog:!1,itemName:""}),"Новый штраф по камерам"!==t){e.next=4;break}return e.next=4,this.getData("save_new_cam",n);case 4:if("Новый штраф по отзывам"!==t){e.next=7;break}return e.next=7,this.getData("save_new_orders",n);case 7:if("Штраф по камерам"!==t){e.next=10;break}return e.next=10,this.getData("save_edit_cam",n);case 10:if("Штраф по отзывам"!==t){e.next=13;break}return e.next=13,this.getData("save_edit_orders",n);case 13:this.update();case 14:case"end":return e.stop()}}),e,this)}))),function(e,t){return n.apply(this,arguments)})},{key:"update",value:(t=(0,a.Z)(h().mark((function e(){var t;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData("get_all");case 2:t=e.sent,this.setState({cameras:t.items,reviews:t.items_1});case 4:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"render",value:function(){var e=this;return p.createElement(p.Fragment,null,p.createElement(I.Z,{style:{zIndex:99},open:this.state.is_load},p.createElement(D.Z,{color:"inherit"})),p.createElement(d.ZP,{container:!0,spacing:3},p.createElement(d.ZP,{item:!0,xs:12,sm:12},p.createElement("h1",null,this.state.module_name)),p.createElement(d.ZP,{item:!0,xs:12,sm:6},p.createElement(Z.Z,{onClick:this.openModal.bind(this,"Новый штраф по камерам"),variant:"contained"},"Добавить ошибку по камерам")),p.createElement(d.ZP,{item:!0,xs:12,sm:6},p.createElement(Z.Z,{onClick:this.openModal.bind(this,"Новый штраф по отзывам"),variant:"contained"},"Добавить ошибку по отзывам")),p.createElement(d.ZP,{item:!0,xs:12,sm:6},p.createElement(F,{cameras:this.state.cameras,openModal:this.openModal.bind(this)})),p.createElement(d.ZP,{item:!0,xs:12,sm:6},p.createElement(R,{reviews:this.state.reviews,openModal:this.openModal.bind(this)}))),p.createElement(j,{open:this.state.modalDialog,onClose:function(){e.setState({modalDialog:!1,itemName:""})},method:this.state.method,event:this.state.event,save:this.saveItem.bind(this),itemName:this.state.itemName}))}}]),f}(p.Component);function W(){return p.createElement(T,null)}},7500:(e,t,n)=>{var a=n(4783)(e.id,{locals:!1});e.hot.dispose(a),e.hot.accept(void 0,a)}}]);
//# sourceMappingURL=741.4c09bba649b1845d03b0.js.map