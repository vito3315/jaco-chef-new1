"use strict";(self.webpackChunkpackage_json=self.webpackChunkpackage_json||[]).push([[31],{31:(t,e,i)=>{i.r(e),i.d(e,{default:()=>$}),i(9839);var a=i(5861),n=i(7326),s=i(4942),r=i(5671),m=i(3144),c=i(136),l=i(6215),h=i(1120),o=i(4687),u=i.n(o),d=i(7294),p=i(30),E=i(1822),f=i(3150),v=i(6140),_=i(3030),Z=i(8561),g=i(8736),I=i(2961),w=i(2450),k=i(8573),y=i(1388),b=i(1702),x=i(9620),S=i(2962),P=i(4498),A=i(7745),D=i(8727),C=i(808),N=i(231),T=i(1647),L=i(3508),O=i(3892),j=i(5705),B=i(6406);function z(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var i,a=(0,h.Z)(t);if(e){var n=(0,h.Z)(this).constructor;i=Reflect.construct(a,arguments,n)}else i=a.apply(this,arguments);return(0,l.Z)(this,i)}}var R=i(7563),M=function(t){(0,c.Z)(i,t);var e=z(i);function i(t){var a;return(0,r.Z)(this,i),(a=e.call(this,t)).state={itemEdit:null},a}return(0,m.Z)(i,[{key:"changeItem",value:function(t,e){var i=this.state.itemEdit;i.item[t]=e.target.value,this.setState({itemEdit:i})}},{key:"changeItemChecked",value:function(t,e){var i=this.state.itemEdit;i.item[t]=!0===e.target.checked?1:0,this.setState({itemEdit:i})}},{key:"onClose",value:function(){this.setState({itemEdit:this.props.event?this.props.event:null}),this.props.onClose()}},{key:"render",value:function(){var t=this;return d.createElement(x.Z,{open:this.props.open,fullWidth:!0,maxWidth:"md",onClose:this.onClose.bind(this)},d.createElement(A.Z,null,this.props.method," ",this.props.itemName?this.props.itemName:""),d.createElement(P.Z,{style:{paddingBottom:10,paddingTop:10}},d.createElement(p.ZP,{container:!0,spacing:3},d.createElement(p.ZP,{item:!0,xs:12},d.createElement(p.ZP,{container:!0,spacing:3},d.createElement(p.ZP,{item:!0,xs:12,sm:6},d.createElement(B.rZ,{label:"Название товара",value:this.state.itemEdit?this.state.itemEdit.item.name:"",func:this.changeItem.bind(this,"name")})),d.createElement(p.ZP,{item:!0,xs:12,sm:6},d.createElement(B.e_,{label:"Заготовка",multiple:!1,data:this.state.itemEdit?this.state.itemEdit.pf_list:[],value:this.state.itemEdit?"0"==this.state.itemEdit.item.pf_id?null:this.state.itemEdit.item.pf_id:"",func:function(e,i){var a=t.state.itemEdit;a.item.pf_id=i,t.setState({itemEdit:a})}})),d.createElement(p.ZP,{item:!0,xs:12,sm:6},d.createElement(B.rZ,{label:"Название товара для поставщика",value:this.state.itemEdit?this.state.itemEdit.item.name_for_vendor:"",func:this.changeItem.bind(this,"name_for_vendor")})),d.createElement(p.ZP,{item:!0,xs:12,sm:6},d.createElement(B.rZ,{label:"Код для 1с",value:this.state.itemEdit?this.state.itemEdit.item.art:"",func:this.changeItem.bind(this,"art")})),d.createElement(p.ZP,{item:!0,xs:12,sm:6},d.createElement(B.rZ,{label:"Максимальное количество заказов в месяц (0 - без ограничений)",value:this.state.itemEdit?this.state.itemEdit.item.max_count_in_m:"",func:this.changeItem.bind(this,"max_count_in_m")})),d.createElement(p.ZP,{item:!0,xs:12,sm:6},d.createElement(B.e_,{label:"Категория",multiple:!1,data:this.state.itemEdit?this.state.itemEdit.cats:[],value:this.state.itemEdit?"0"===this.state.itemEdit.item.cat_id?"":this.state.itemEdit.item.cat_id:"",func:function(e,i){var a=t.state.itemEdit;a.item.cat_id=i,t.setState({itemEdit:a})}})))),d.createElement(p.ZP,{item:!0,xs:12,sm:4},d.createElement(B.rZ,{label:"Количество в упаковке",value:this.state.itemEdit?this.state.itemEdit.item.pq:"",func:this.changeItem.bind(this,"pq")})),d.createElement(p.ZP,{item:!0,xs:12,sm:4},d.createElement(B.$S,{data:this.state.itemEdit?this.state.itemEdit.ed_izmer:[],value:this.state.itemEdit?"0"===this.state.itemEdit.item.ed_izmer_id?"":this.state.itemEdit.item.ed_izmer_id:"",func:this.changeItem.bind(this,"ed_izmer_id"),label:"Ед измер"})),d.createElement(p.ZP,{item:!0,xs:12,sm:4},d.createElement(B.$S,{data:this.state.itemEdit?this.state.itemEdit.apps:[],value:this.state.itemEdit?"0"===this.state.itemEdit.item.app_id?"":this.state.itemEdit.item.app_id:"",func:this.changeItem.bind(this,"app_id"),label:"Должность на кухне"})),d.createElement(p.ZP,{item:!0,xs:12,sm:4},d.createElement(B.rZ,{label:"Время приготовления ММ:SS (15:20)",value:this.state.itemEdit?this.state.itemEdit.item.time_min:"",func:this.changeItem.bind(this,"time_min")})),d.createElement(p.ZP,{item:!0,xs:12,sm:4},d.createElement(B.rZ,{label:"Дополнительное время ММ:SS (15:20)",value:this.state.itemEdit?this.state.itemEdit.item.time_dop_min:"",func:this.changeItem.bind(this,"time_dop_min")})),d.createElement(p.ZP,{item:!0,xs:12,sm:4},d.createElement(B.rZ,{label:"Время разгрузки ММ:SS.iiii (00:20.004)",value:this.state.itemEdit?this.state.itemEdit.item.time_min_other:"",func:this.changeItem.bind(this,"time_min_other")})),d.createElement(p.ZP,{item:!0,xs:12,sm:4},d.createElement(B.rZ,{label:"% потерь",value:this.state.itemEdit?this.state.itemEdit.item.los_percent:"",func:this.changeItem.bind(this,"los_percent")})),d.createElement(p.ZP,{item:!0,xs:12,sm:4},d.createElement(B.rZ,{label:"% заявки",value:this.state.itemEdit?this.state.itemEdit.item.percent:"",func:this.changeItem.bind(this,"percent")})),d.createElement(p.ZP,{item:!0,xs:12,sm:4},d.createElement(B.rZ,{label:"% повышения ценника",value:this.state.itemEdit?this.state.itemEdit.item.vend_percent:"",func:this.changeItem.bind(this,"vend_percent")})),d.createElement(p.ZP,{item:!0,xs:12,sm:3},d.createElement(B.IA,{label:"Вес заготовки",value:!!this.state.itemEdit&&1==parseInt(this.state.itemEdit.item.w_pf),func:this.changeItemChecked.bind(this,"w_pf")})),d.createElement(p.ZP,{item:!0,xs:12,sm:3},d.createElement(B.IA,{label:"Вес отхода",value:!!this.state.itemEdit&&1==parseInt(this.state.itemEdit.item.w_trash),func:this.changeItemChecked.bind(this,"w_trash")})),d.createElement(p.ZP,{item:!0,xs:12,sm:3},d.createElement(B.IA,{label:"Вес товара",value:!!this.state.itemEdit&&1==parseInt(this.state.itemEdit.item.w_item),func:this.changeItemChecked.bind(this,"w_item")})),d.createElement(p.ZP,{item:!0,xs:12,sm:3},d.createElement(B.IA,{label:"Два сотрудника",value:!!this.state.itemEdit&&1==parseInt(this.state.itemEdit.item.two_user),func:this.changeItemChecked.bind(this,"two_user")})),d.createElement(p.ZP,{item:!0,xs:12},d.createElement(B.e_,{label:"Места хранения",multiple:!0,data:this.state.itemEdit?this.state.itemEdit.storages:[],value:this.state.itemEdit?this.state.itemEdit.this_storages:"",func:function(e,i){var a=t.state.itemEdit;a.this_storages=i,t.setState({itemEdit:a})}})),"Редактирование товара"===this.props.method?d.createElement(p.ZP,{item:!0,xs:12},d.createElement(B.IA,{label:"Активность",value:1==parseInt(this.state.itemEdit.item.is_show),func:this.changeItemChecked.bind(this,"is_show")})):null)),d.createElement(S.Z,null,d.createElement(E.Z,{onClick:"Редактирование товара"===this.props.method?this.props.checkArt.bind(this,this.state.itemEdit):this.props.checkArtNew.bind(this,this.state.itemEdit),color:"primary"},"Сохранить")))}}],[{key:"getDerivedStateFromProps",value:function(t,e){return t.event&&t.event!==e.event?{itemEdit:t.event}:null}}]),i}(d.Component),W=function(t){(0,c.Z)(i,t);var e=z(i);function i(){return(0,r.Z)(this,i),e.apply(this,arguments)}return(0,m.Z)(i,[{key:"shouldComponentUpdate",value:function(t){return function(t,e){var i=Object.getOwnPropertyNames(t),a=Object.getOwnPropertyNames(e);if(i.length!==a.length)return!1;for(var n=0;n<i.length;n+=1){var s=i[n];if(t[s]!==e[s])return!1}return!0}(t.item,this.props.item)}},{key:"render",value:function(){var t=this.props.item;return console.log("render"),d.createElement(g.Z,null,d.createElement(_.Z,null,t.id),d.createElement(_.Z,null,1==parseInt(t.is_show)?d.createElement(I.Z,null):d.createElement(w.Z,null)),d.createElement(_.Z,null,d.createElement(B.IA,{label:"",value:1==parseInt(t.show_in_rev),func:this.props.changeTableItem.bind(this,t.id,this.props.type[0],!0)})),d.createElement(_.Z,{style:{cursor:"pointer"},onClick:this.props.showEditItem.bind(this,t.id,"Редактирование товара")},t.name),d.createElement(_.Z,null,t.los_percent," %"),d.createElement(_.Z,null,t.percent," %"),d.createElement(_.Z,null,t.pf_name),d.createElement(_.Z,null,t.ei_name),d.createElement(_.Z,null,t.storage_name),d.createElement(_.Z,null,d.createElement(B.rZ,{label:"",value:t.handle_price,func:this.props.changeTableItem.bind(this,t.id,this.props.type[1],!1),onBlur:this.props.changeTableItem.bind(this,t.id,this.props.type[1],!0)})))}}]),i}(d.Component),q=function(t){(0,c.Z)(i,t);var e=z(i);function i(){return(0,r.Z)(this,i),e.apply(this,arguments)}return(0,m.Z)(i,[{key:"render",value:function(){var t=this;return d.createElement(f.Z,null,d.createElement(Z.Z,null,d.createElement(g.Z,null,d.createElement(_.Z,{style:{width:"2%"}},"id"),d.createElement(_.Z,{style:{width:"2%"}}),d.createElement(_.Z,{style:{width:"3%"}},"Ревизия"),d.createElement(_.Z,{style:{width:"15%"}},"Товар"),d.createElement(_.Z,{style:{width:"10%"}},"% потерь"),d.createElement(_.Z,{style:{width:"10%"}},"% заявки"),d.createElement(_.Z,{style:{width:"15%"}},"Заготовка"),d.createElement(_.Z,{style:{width:"5%"}},"Ед. измер"),d.createElement(_.Z,{style:{width:"9%"}},"Место хранения"),d.createElement(_.Z,{style:{width:"9%",minWidth:150}},"Моя цена"))),d.createElement(v.Z,null,this.props.items.map((function(e,i){return d.createElement(W,{item:e,key:i,type:t.props.type,changeTableItem:t.props.changeTableItem.bind(t),showEditItem:t.props.showEditItem.bind(t)})}))))}}]),i}(d.Component),F=function(t){(0,c.Z)(w,t);var e,i,l,h,o,f,v,_,Z,g,I=z(w);function w(t){var e;return(0,r.Z)(this,w),e=I.call(this,t),(0,s.Z)((0,n.Z)(e),"getData",(function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return 1==a&&e.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:R.stringify({method:t,module:e.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(i)})}).then((function(t){return t.json()})).then((function(t){if(!1!==t.st||"redir"!=t.type){if(!1!==t.st||"auth"!=t.type)return setTimeout((function(){e.setState({is_load:!1})}),300),t;window.location.pathname="/auth"}else window.location.pathname="/"})).catch((function(t){setTimeout((function(){e.setState({is_load:!1})}),300),console.log(t)}))})),e.state={module:"sklad_items_module",module_name:"",is_load:!1,cats:[],allItems:[],vendor_items:[],modalDialog:!1,method:null,itemEdit:null,itemName:"",checkArtDialog:!1,checkArtList:[],freeItems:[],searchItem:""},e}return(0,m.Z)(w,[{key:"componentDidMount",value:(g=(0,a.Z)(u().mark((function t(){var e;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getData("get_all");case 2:e=t.sent,this.setState({module_name:e.module_info.name,cats:e.cats,freeItems:e.items_free}),document.title=e.module_info.name;case 5:case"end":return t.stop()}}),t,this)}))),function(){return g.apply(this,arguments)})},{key:"changeCity",value:(Z=(0,a.Z)(u().mark((function t(e){var i,a;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i={city:e.target.value},t.next=3,this.getData("get_vendors",i);case 3:a=t.sent,this.setState({vendors:a,city:e.target.value});case 5:case"end":return t.stop()}}),t,this)}))),function(t){return Z.apply(this,arguments)})},{key:"changeSort",value:function(t,e){var i=this;this.state.vendor_items.map((function(a,n){parseInt(a.item_id)==parseInt(t)&&(i.state.vendor_items[n].sort=e.target.value)})),this.setState({vendor_items:this.state.vendor_items})}},{key:"showEditItem",value:(_=(0,a.Z)(u().mark((function t(e,i){var a,n;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a={item_id:e},t.next=3,this.getData("get_one",a);case 3:(n=t.sent).item.pf_id=n.pf_list.find((function(t){return t.id===n.item.pf_id})),n.item.cat_id=n.cats.find((function(t){return t.id===n.item.cat_id})),this.setState({modalDialog:!0,method:i,itemEdit:n,itemName:n.item.name});case 7:case"end":return t.stop()}}),t,this)}))),function(t,e){return _.apply(this,arguments)})},{key:"saveEditItem",value:(v=(0,a.Z)(u().mark((function t(e){var i,n,s,r,m,c=this,l=arguments;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=l.length>1&&void 0!==l[1]?l[1]:0,n=e.item.pf_id.id,s=e.item.cat_id.id,e.item.pf_id=n,e.item.cat_id=s,r={id:e.item.id,item:e.item,storages:e.this_storages,main_item_id:0==parseInt(i)?e.item.id:parseInt(i)},t.next=8,this.getData("saveEditItem",r);case 8:!1===(m=t.sent).st?alert(m.text):(this.setState({modalDialog:!1,itemEdit:null,checkArtDialog:!1,checkArtList:[]}),setTimeout((0,a.Z)(u().mark((function t(){return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:c.search();case 1:case"end":return t.stop()}}),t)}))),300));case 10:case"end":return t.stop()}}),t,this)}))),function(t){return v.apply(this,arguments)})},{key:"saveNewItem",value:(f=(0,a.Z)(u().mark((function t(e){var i,n,s,r,m,c=this,l=arguments;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=l.length>1&&void 0!==l[1]?l[1]:0,n=e.item.pf_id.id,s=e.item.cat_id.id,e.item.pf_id=n,e.item.cat_id=s,r={id:e.item.id,item:e.item,storages:e.this_storages,main_item_id:0==parseInt(i)?e.item.id:parseInt(i)},t.next=8,this.getData("saveNewItem",r);case 8:!1===(m=t.sent).st?alert(m.text):(this.setState({modalDialog:!1,itemEdit:null,checkArtDialog:!1,checkArtList:[]}),setTimeout((0,a.Z)(u().mark((function t(){return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:c.search();case 1:case"end":return t.stop()}}),t)}))),300));case 10:case"end":return t.stop()}}),t,this)}))),function(t){return f.apply(this,arguments)})},{key:"checkArt",value:(o=(0,a.Z)(u().mark((function t(e){var i,a;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i={id:e.item.id,art:e.item.art},t.next=3,this.getData("checkArt",i);case 3:!1===(a=t.sent).st?this.setState({checkArtDialog:!0,checkArtList:a.data,itemEdit:e}):this.saveEditItem(e);case 5:case"end":return t.stop()}}),t,this)}))),function(t){return o.apply(this,arguments)})},{key:"checkArtNew",value:(h=(0,a.Z)(u().mark((function t(e){var i,a;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i={id:e.item.id,art:e.item.art},t.next=3,this.getData("checkArt",i);case 3:!1===(a=t.sent).st?(a.data.push({id:-1,name:this.state.itemEdit.item.name}),this.setState({checkArtDialog:!0,checkArtList:a.data})):this.saveNewItem(e);case 5:case"end":return t.stop()}}),t,this)}))),function(t){return h.apply(this,arguments)})},{key:"chooseArt",value:function(t){!0===this.state.modalItemNew?this.saveNewItem(t):this.saveEditItem(this.state.itemEdit,t)}},{key:"openModalItemNew",value:(l=(0,a.Z)(u().mark((function t(e){var i;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getData("get_all_for_new");case 2:i=t.sent,this.setState({modalDialog:!0,itemEdit:i,itemName:"",method:e});case 4:case"end":return t.stop()}}),t,this)}))),function(t){return l.apply(this,arguments)})},{key:"saveItem",value:(i=(0,a.Z)(u().mark((function t(e,i,n){var s,r,m=this;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s={item_id:e,type:i,value:n},t.next=3,this.getData("saveItem",s,!1);case 3:!1===(r=t.sent).st?alert(r.text):(this.setState({modalItemNew:!1,modalItemEdit:!1,itemEdit:null,checkArtDialog:!1,checkArtList:[]}),setTimeout((0,a.Z)(u().mark((function t(){return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m.getData("get_all");case 2:r=t.sent,m.setState({cats:r.cats,freeItems:r.items_free});case 4:case"end":return t.stop()}}),t)}))),300));case 5:case"end":return t.stop()}}),t,this)}))),function(t,e,a){return i.apply(this,arguments)})},{key:"changeTableItem",value:function(t,e){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],a=arguments.length>3?arguments[3]:void 0;if(1==parseInt(e)){var n=a.target.checked,s=this.state.cats;s.map((function(e,i){e.cats.map((function(e,a){e.items.map((function(e,r){parseInt(e.id)==parseInt(t)&&(s[i].cats[a].items[r].show_in_rev=1==n?1:0)}))}))})),this.setState({cats:s}),this.saveItem(t,"show_in_rev",1==n?1:0)}if(3==parseInt(e)){var r=a.target.value;console.log(r,t);var m=this.state.cats;m.map((function(e,i){e.cats.map((function(e,a){e.items.map((function(e,n){parseInt(e.id)==parseInt(t)&&(m[i].cats[a].items[n].handle_price=r)}))}))})),console.log(m),this.setState({cats:m}),!0===i&&this.saveItem(t,"handle_price",r)}if(2==parseInt(e)){var c=a.target.value,l=this.state.freeItems;l.map((function(e,i){parseInt(e.id)==parseInt(t)&&(l[i].show_in_rev=1==c?1:0)})),this.setState({freeItems:l}),this.saveItem(t,"show_in_rev",1==c?1:0)}if(4==parseInt(e)){var h=a.target.value,o=this.state.freeItems;o.map((function(e,i){parseInt(e.id)==parseInt(t)&&(o[i].handle_price=h)})),this.setState({freeItems:o}),this.saveItem(t,"handle_price",h)}}},{key:"search",value:(e=(0,a.Z)(u().mark((function t(){var e,i;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e={item:this.state.searchItem},t.next=3,this.getData("get_all_search",e);case 3:i=t.sent,this.setState({cats:i.cats,freeItems:i.items_free});case 5:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"render",value:function(){var t=this;return d.createElement(d.Fragment,null,d.createElement(O.Z,{style:{zIndex:99},open:this.state.is_load},d.createElement(j.Z,{color:"inherit"})),d.createElement(x.Z,{onClose:function(){t.setState({checkArtDialog:!1,checkArtList:[]})},open:this.state.checkArtDialog},d.createElement(A.Z,null,"Такой код 1с уже задан у следующих позиций:"),d.createElement(k.Z,{sx:{pt:0}},this.state.checkArtList.map((function(e,i){return d.createElement(y.ZP,{button:!0,onClick:t.chooseArt.bind(t,e.id),key:i},d.createElement(b.Z,{primary:e.name}))})))),d.createElement(M,{open:this.state.modalDialog,onClose:function(){t.setState({modalDialog:!1})},checkArtNew:this.checkArtNew.bind(this),checkArt:this.checkArt.bind(this),method:this.state.method,event:this.state.itemEdit,itemName:this.state.itemName}),d.createElement(p.ZP,{container:!0,spacing:3},d.createElement(p.ZP,{item:!0,xs:12,sm:12},d.createElement("h1",null,this.state.module_name)),d.createElement(p.ZP,{item:!0,xs:12,sm:3},d.createElement(E.Z,{onClick:this.openModalItemNew.bind(this,"Новый товар"),variant:"contained"},"Добавить товар")),d.createElement(p.ZP,{item:!0,xs:12,sm:3},d.createElement(B.rZ,{label:"Поиск",value:this.state.searchItem,func:function(e){t.setState({searchItem:e.target.value})},onBlur:this.search.bind(this)})),d.createElement(p.ZP,{item:!0,xs:12,style:{paddingBottom:"10px"}},this.state.cats.map((function(e,i){return d.createElement(D.Z,{key:i},d.createElement(C.Z,{expandIcon:d.createElement(L.Z,null)},d.createElement(T.Z,null,e.name)),d.createElement(N.Z,null,e.cats.map((function(e,i){return d.createElement(D.Z,{key:i},d.createElement(C.Z,{expandIcon:d.createElement(L.Z,null)},d.createElement(T.Z,null,e.name)),d.createElement(N.Z,{style:{width:"100%",overflow:"scroll"}},d.createElement(q,{items:e.items,changeTableItem:t.changeTableItem.bind(t),showEditItem:t.showEditItem.bind(t),type:[1,3]})))}))))})),0==this.state.freeItems.length?null:d.createElement(D.Z,null,d.createElement(C.Z,{expandIcon:d.createElement(L.Z,null)},d.createElement(T.Z,null,"Без категории")),d.createElement(N.Z,{style:{width:"100%",overflow:"scroll"}},d.createElement(q,{items:this.state.freeItems,changeTableItem:this.changeTableItem.bind(this),showEditItem:this.showEditItem.bind(this),type:[2,4]}))))))}}]),w}(d.Component);function $(){return d.createElement(F,null)}},9839:(t,e,i)=>{var a=i(4783)(t.id,{locals:!1});t.hot.dispose(a),t.hot.accept(void 0,a)}}]);
//# sourceMappingURL=31.1ec26b5afcf78dea5fc4.js.map