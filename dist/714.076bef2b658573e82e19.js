"use strict";(self.webpackChunkpackage_json=self.webpackChunkpackage_json||[]).push([[714],{1714:(e,t,a)=>{a.r(t),a.d(t,{default:()=>b}),a(1702),a(8152);var n=a(5861),s=a(5671),r=a(3144),l=a(7326),o=a(136),i=a(6215),m=a(1120),u=a(4942),c=a(4687),h=a.n(c),p=a(7294),d=a(5725),y=a(2642),x=a(4567),v=a(9062),w=a(9573),g=a(8732),f=a(6926),A=a(7896),E=a(6011),Z=a(3694),_=a(6501),D=a(6406);var T=a(7563);function k(e){var t=new Date(e),a=""+(t.getMonth()+1),n=""+t.getDate(),s=t.getFullYear();return a.length<2&&(a="0"+a),n.length<2&&(n="0"+n),[s,a,n].join("-")}var S=function(e){(0,o.Z)(I,e);var t,a,c,S,b=(c=I,S=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=(0,m.Z)(c);if(S){var a=(0,m.Z)(this).constructor;e=Reflect.construct(t,arguments,a)}else e=t.apply(this,arguments);return(0,i.Z)(this,e)});function I(e){var t;return(0,s.Z)(this,I),t=b.call(this,e),(0,u.Z)((0,l.Z)(t),"chartnewusers",null),(0,u.Z)((0,l.Z)(t),"chartorders",null),(0,u.Z)((0,l.Z)(t),"chartavgsumm",null),(0,u.Z)((0,l.Z)(t),"chartcountpos",null),(0,u.Z)((0,l.Z)(t),"chartnewusersD",null),(0,u.Z)((0,l.Z)(t),"chartordersD",null),(0,u.Z)((0,l.Z)(t),"chartavgsummD",null),(0,u.Z)((0,l.Z)(t),"chartcountposD",null),(0,u.Z)((0,l.Z)(t),"getData",(function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.setState({is_load:!0}),fetch("https://jacochef.ru/api/index_new.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:T.stringify({method:e,module:t.state.module,version:2,login:localStorage.getItem("token"),data:JSON.stringify(a)})}).then((function(e){return e.json()})).then((function(e){if(!1!==e.st||"redir"!=e.type){if(!1!==e.st||"auth"!=e.type)return setTimeout((function(){t.setState({is_load:!1})}),300),e;window.location.pathname="/auth"}else window.location.pathname="/"})).catch((function(e){console.log(e),t.setState({is_load:!1})}))})),t.state={module:"site_stat_marc",module_name:"",is_load:!1,is_show_adv:!1,show_stat_roll:!1,show_stat_set:!1,show_stat_pizza:!1,choosePoint:[],points:[],rangeDate:[k(new Date),k(new Date)],date_start:k(new Date),date_end:k(new Date),promoName:"",newUsersTable:[],countOrdersTable:[],avgSumm:[],countPos:[],fakeUsers:[],roll_stat:[],set_stat:[],pizza_stat:[],typesShow:[{id:1,name:"Итоговый результат"},{id:2,name:"График по месяцам"},{id:3,name:"График по дням"}],typeShow:1,colors:[6788249,168986,6460442,16711680,4636102,16758465,6788249,168986,6460442,16711680,4636102,16758465]},t}return(0,r.Z)(I,[{key:"componentDidMount",value:(a=(0,n.Z)(h().mark((function e(){var t;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData("get_all");case 2:t=e.sent,this.setState({module_name:t.module_info.name,points:t.points}),document.title=t.module_info.name;case 5:case"end":return e.stop()}}),e,this)}))),function(){return a.apply(this,arguments)})},{key:"changeChekBox",value:function(e,t){this.setState((0,u.Z)({},e,t.target.checked))}},{key:"show",value:(t=(0,n.Z)(h().mark((function e(){var t,a;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={points:this.state.choosePoint,dateStart:this.state.date_start,dateEnd:this.state.date_end,typeShow:this.state.typeShow,promoName:this.state.promoName,advData:this.state.advData},e.next=3,this.getData("show",t);case 3:a=e.sent,console.log(a),1==parseInt(this.state.typeShow)&&this.setState({newUsersTable:a.new_users,countOrdersTable:a.count_orders,avgSumm:a.avg_summ,countPos:a.count_pos,fakeUsers:a.fake_users,roll_stat:a.roll_stat,set_stat:a.set_stat,pizza_stat:a.pizza_stat}),2==parseInt(this.state.typeShow)&&(this.renderGraphNewUsers(a.new_users),this.renderGraphOrders(a.count_orders),this.renderGraphAvgSumm(a.avg_summ),this.renderCountPos(a.count_pos)),3==parseInt(this.state.typeShow)&&(this.renderGraphNewUsersD(a.new_users),this.renderGraphOrdersD(a.count_orders),this.renderGraphAvgSummD(a.avg_summ),this.renderCountPosD(a.count_pos));case 8:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"renderGraphNewUsers",value:function(e){this.chartnewusers&&this.chartnewusers.dispose();var t=am5.Root.new("chartnewusers");this.chartnewusers=t,t.setThemes([am5themes_Animated.new(t)]);var a=t.container.children.push(am5xy.XYChart.new(t,{panY:!1,wheelY:"zoomX",layout:t.verticalLayout})),n=[],s=[],r=[];e.site.map((function(e){var t=e.date.split("-");n.push({date:new Date(t[0],parseInt(t[1])-1,1).getTime(),value:parseInt(e.count)})})),e.center.map((function(e){var t=e.date.split("-");s.push({date:new Date(t[0],parseInt(t[1])-1,1).getTime(),value:parseInt(e.count)})})),e.all.map((function(e){var t=e.date.split("-");r.push({date:new Date(t[0],parseInt(t[1])-1,1).getTime(),value:parseInt(e.count)})}));var l=a.yAxes.push(am5xy.ValueAxis.new(t,{extraTooltipPrecision:1,renderer:am5xy.AxisRendererY.new(t,{})})),o=a.xAxes.push(am5xy.DateAxis.new(t,{baseInterval:{timeUnit:"month",count:1},startLocation:.5,endLocation:.5,renderer:am5xy.AxisRendererX.new(t,{minGridDistance:30})}));function i(e,n,s){var r=a.series.push(am5xy.SmoothedXLineSeries.new(t,{name:e,xAxis:o,yAxis:l,valueYField:n,valueXField:"date",tooltip:am5.Tooltip.new(t,{}),maskBullets:!1}));r.bullets.push((function(){return am5.Bullet.new(t,{sprite:am5.Circle.new(t,{radius:2,fill:r.get("fill")})})})),r.strokes.template.set("strokeWidth",2),"Всего"==e&&r.strokes.template.set("strokeWidth",8),r.get("tooltip").label.set("text","[bold]{name}[/]\n{valueX.formatDate()}: {valueY}"),r.data.setAll(s)}o.get("dateFormats").day="MM/dd",o.get("periodChangeDateFormats").day="MM/dd",i("Сайт","value",n),i("Контакт-центр","value",s),i("Всего","value",r),a.set("cursor",am5xy.XYCursor.new(t,{behavior:"zoomXY",xAxis:o})),o.set("tooltip",am5.Tooltip.new(t,{themeTags:["axis"]})),l.set("tooltip",am5.Tooltip.new(t,{themeTags:["axis"]}))}},{key:"renderGraphNewUsersD",value:function(e){this.chartnewusersD&&this.chartnewusersD.dispose();var t=am5.Root.new("chartnewusersD");this.chartnewusersD=t,t.setThemes([am5themes_Animated.new(t)]);var a=t.container.children.push(am5xy.XYChart.new(t,{panY:!1,wheelY:"zoomX",layout:t.verticalLayout})),n=[],s=[],r=[];e.site.map((function(e){var t=e.date_new.split("-");n.push({date:new Date(t[0],parseInt(t[1])-1,parseInt(t[2])).getTime(),value:parseInt(e.count)})})),e.center.map((function(e){var t=e.date_new.split("-");s.push({date:new Date(t[0],parseInt(t[1])-1,parseInt(t[2])).getTime(),value:parseInt(e.count)})})),e.all.map((function(e){var t=e.date_new.split("-");r.push({date:new Date(t[0],parseInt(t[1])-1,parseInt(t[2])).getTime(),value:parseInt(e.count)})}));var l=a.yAxes.push(am5xy.ValueAxis.new(t,{extraTooltipPrecision:1,renderer:am5xy.AxisRendererY.new(t,{})})),o=a.xAxes.push(am5xy.DateAxis.new(t,{baseInterval:{timeUnit:"day",count:1},startLocation:.5,endLocation:.5,renderer:am5xy.AxisRendererX.new(t,{})}));function i(e,n,s){var r=a.series.push(am5xy.SmoothedXLineSeries.new(t,{name:e,xAxis:o,yAxis:l,valueYField:n,valueXField:"date",tooltip:am5.Tooltip.new(t,{}),maskBullets:!1}));r.bullets.push((function(){return am5.Bullet.new(t,{sprite:am5.Circle.new(t,{radius:2,fill:r.get("fill")})})})),r.strokes.template.set("strokeWidth",2),"Всего"==e&&r.strokes.template.set("strokeWidth",8),r.get("tooltip").label.set("text","[bold]{name}[/]\n{valueX.formatDate()}: {valueY}"),r.data.setAll(s)}o.get("dateFormats").day="MM/dd",o.get("periodChangeDateFormats").day="MM/dd",i("Сайт","value",n),i("Контакт-центр","value",s),i("Всего","value",r),a.set("cursor",am5xy.XYCursor.new(t,{behavior:"zoomXY",xAxis:o})),o.set("tooltip",am5.Tooltip.new(t,{themeTags:["axis"]})),l.set("tooltip",am5.Tooltip.new(t,{themeTags:["axis"]}))}},{key:"renderGraphOrders",value:function(e){this.chartorders&&this.chartorders.dispose();var t=am5.Root.new("chartorders");this.chartorders=t,t.setThemes([am5themes_Animated.new(t)]);var a=t.container.children.push(am5xy.XYChart.new(t,{panY:!1,wheelY:"zoomX",layout:t.verticalLayout})),n=[],s=[],r=[],l=[];e.all.map((function(e){var t=e.date_new.split("-");n.push({date:new Date(t[0],parseInt(t[1])-1,1).getTime(),value:parseInt(e.count)})})),e.pic.map((function(e){var t=e.date_new.split("-");s.push({date:new Date(t[0],parseInt(t[1])-1,1).getTime(),value:parseInt(e.count)})})),e.dev.map((function(e){var t=e.date_new.split("-");r.push({date:new Date(t[0],parseInt(t[1])-1,1).getTime(),value:parseInt(e.count)})})),e.hall.map((function(e){var t=e.date_new.split("-");l.push({date:new Date(t[0],parseInt(t[1])-1,1).getTime(),value:parseInt(e.count)})}));var o=a.yAxes.push(am5xy.ValueAxis.new(t,{extraTooltipPrecision:1,renderer:am5xy.AxisRendererY.new(t,{})})),i=a.xAxes.push(am5xy.DateAxis.new(t,{baseInterval:{timeUnit:"month",count:1},startLocation:.5,endLocation:.5,renderer:am5xy.AxisRendererX.new(t,{minGridDistance:30})}));function m(e,n,s){var r=a.series.push(am5xy.SmoothedXLineSeries.new(t,{name:e,xAxis:i,yAxis:o,valueYField:n,valueXField:"date",tooltip:am5.Tooltip.new(t,{}),maskBullets:!1}));r.bullets.push((function(){return am5.Bullet.new(t,{sprite:am5.Circle.new(t,{radius:2,fill:r.get("fill")})})})),r.strokes.template.set("strokeWidth",2),"Всего"==e&&r.strokes.template.set("strokeWidth",8),r.get("tooltip").label.set("text","[bold]{name}[/]\n{valueX.formatDate()}: {valueY}"),r.data.setAll(s)}i.get("dateFormats").day="MM/dd",i.get("periodChangeDateFormats").day="MM/dd",m("Всего","value",n),m("Самовывозов","value",s),m("Доставок","value",r),m("Зал","value",l),a.set("cursor",am5xy.XYCursor.new(t,{behavior:"zoomXY",xAxis:i})),i.set("tooltip",am5.Tooltip.new(t,{themeTags:["axis"]})),o.set("tooltip",am5.Tooltip.new(t,{themeTags:["axis"]}))}},{key:"renderGraphOrdersD",value:function(e){this.chartordersD&&this.chartordersD.dispose();var t=am5.Root.new("chartordersD");this.chartordersD=t,t.setThemes([am5themes_Animated.new(t)]),t.dateFormatter.setAll({dateFormat:"yyyy-MM-dd",dateFields:["valueX","openValueX"]});var a=t.container.children.push(am5xy.XYChart.new(t,{panY:!1,wheelY:"zoomX",layout:t.verticalLayout})),n=[],s=[],r=[],l=[];e.all.map((function(e){var t=e.date_new.split("-");n.push({date:new Date(t[0],parseInt(t[1])-1,parseInt(t[2])).getTime(),value:parseInt(e.count)})})),e.pic.map((function(e){var t=e.date_new.split("-");s.push({date:new Date(t[0],parseInt(t[1])-1,parseInt(t[2])).getTime(),value:parseInt(e.count)})})),e.dev.map((function(e){var t=e.date_new.split("-");r.push({date:new Date(t[0],parseInt(t[1])-1,parseInt(t[2])).getTime(),value:parseInt(e.count)})})),e.hall.map((function(e){var t=e.date_new.split("-");l.push({date:new Date(t[0],parseInt(t[1])-1,parseInt(t[2])).getTime(),value:parseInt(e.count)})}));var o=a.yAxes.push(am5xy.ValueAxis.new(t,{extraTooltipPrecision:1,renderer:am5xy.AxisRendererY.new(t,{})})),i=a.xAxes.push(am5xy.DateAxis.new(t,{baseInterval:{timeUnit:"day",count:1},startLocation:.5,endLocation:.5,renderer:am5xy.AxisRendererX.new(t,{})}));i.get("dateFormats").day="MM/dd",i.get("periodChangeDateFormats").day="MM/dd";var m=a.yAxes.push(am5xy.CategoryAxis.new(t,{categoryField:"category",extraTooltipPrecision:1,renderer:am5xy.AxisRendererY.new(t,{inversed:!0})}));function u(e,n,s){var r=a.series.push(am5xy.SmoothedXLineSeries.new(t,{name:e,xAxis:i,yAxis:o,valueYField:n,strokeWidth:5,valueXField:"date",tooltip:am5.Tooltip.new(t,{}),maskBullets:!1}));r.strokes.template.set("strokeWidth",2),"Всего"==e&&r.strokes.template.set("strokeWidth",8),r.bullets.push((function(){return am5.Bullet.new(t,{sprite:am5.Circle.new(t,{radius:2,fill:r.get("fill")})})})),r.get("tooltip").label.set("text","[bold]{name}[/]\n{valueX.formatDate()}: {valueY}"),r.data.setAll(s)}var c=this.state.colors;u("Всего","value",n),u("Самовывозов","value",s),u("Доставок","value",r),u("Зал","value",l),this.state.is_show_adv&&e.adv_data.length>"1"&&function(e,n,s){var r=[];s.map((function(e,t){s[t].name=e.category,s[t].promo=""!=e.promo||e.promo.length>0?"\nПромокод: "+e.promo:"",s[t].columnSettings.fill=am5.color(c[t]),r.push({category:e.category})})),m.data.setAll(r);var l=null,o={xAxis:i,yAxis:m,openValueXField:"fromDate",valueXField:"toDate",categoryYField:"category",sequencedInterpolation:!0};s.map((function(e,n){o.fill=am5.color(c[n]),(l=a.series.push(am5xy.ColumnSeries.new(t,o))).columns.template.setAll({templateField:"columnSettings",strokeOpacity:0,tooltipText:"[bold]{category}[/]\n{description}\n{openValueX.formatDate('yyyy-MM-dd')} - {valueX.formatDate('yyyy-MM-dd')}{promo}"}),l.bullets.push((function(){return am5.Bullet.new(t,{sprite:am5.Circle.new(t,{radius:2,fill:l.get("fill")})})}))})),l.columns.template.setAll({opacity:.5}),l.data.processor=am5.DataProcessor.new(t,{dateFields:["fromDate","toDate"],dateFormat:"yyyy-MM-dd HH:mm"}),l.data.setAll(s)}(0,0,e.adv_data),a.set("cursor",am5xy.XYCursor.new(t,{behavior:"zoomXY",xAxis:i})),i.set("tooltip",am5.Tooltip.new(t,{themeTags:["axis"]})),o.set("tooltip",am5.Tooltip.new(t,{themeTags:["axis"]}))}},{key:"renderGraphAvgSumm",value:function(e){this.chartavgsumm&&this.chartavgsumm.dispose();var t=am5.Root.new("chartavgsumm");this.chartavgsumm=t,t.setThemes([am5themes_Animated.new(t)]);var a=t.container.children.push(am5xy.XYChart.new(t,{panY:!1,wheelY:"zoomX",layout:t.verticalLayout})),n=[],s=[],r=[],l=[];e.all.map((function(e){var t=e.date_new.split("-");n.push({date:new Date(t[0],parseInt(t[1])-1,1).getTime(),value:parseInt(e.count)})})),e.pic.map((function(e){var t=e.date_new.split("-");s.push({date:new Date(t[0],parseInt(t[1])-1,1).getTime(),value:parseInt(e.count)})})),e.dev.map((function(e){var t=e.date_new.split("-");r.push({date:new Date(t[0],parseInt(t[1])-1,1).getTime(),value:parseInt(e.count)})})),e.hall.map((function(e){var t=e.date_new.split("-");l.push({date:new Date(t[0],parseInt(t[1])-1,1).getTime(),value:parseInt(e.count)})}));var o=a.yAxes.push(am5xy.ValueAxis.new(t,{extraTooltipPrecision:1,renderer:am5xy.AxisRendererY.new(t,{})})),i=a.xAxes.push(am5xy.DateAxis.new(t,{baseInterval:{timeUnit:"month",count:1},startLocation:.5,endLocation:.5,renderer:am5xy.AxisRendererX.new(t,{minGridDistance:30})}));function m(e,n,s){var r=a.series.push(am5xy.SmoothedXLineSeries.new(t,{name:e,xAxis:i,yAxis:o,valueYField:n,strokeWidth:5,valueXField:"date",tooltip:am5.Tooltip.new(t,{}),maskBullets:!1}));r.strokes.template.set("strokeWidth",2),"Всего"==e&&r.strokes.template.set("strokeWidth",8),r.bullets.push((function(){return am5.Bullet.new(t,{sprite:am5.Circle.new(t,{radius:2,fill:r.get("fill")})})})),r.get("tooltip").label.set("text","[bold]{name}[/]\n{valueX.formatDate()}: {valueY}"),r.data.setAll(s)}i.get("dateFormats").day="MM/dd",i.get("periodChangeDateFormats").day="MM/dd",m("Всего","value",n),m("Самовывозов","value",s),m("Доставок","value",r),m("Зал","value",l),a.set("cursor",am5xy.XYCursor.new(t,{behavior:"zoomXY",xAxis:i})),i.set("tooltip",am5.Tooltip.new(t,{themeTags:["axis"]})),o.set("tooltip",am5.Tooltip.new(t,{themeTags:["axis"]}))}},{key:"renderGraphAvgSummD",value:function(e){this.chartavgsummD&&this.chartavgsummD.dispose();var t=am5.Root.new("chartavgsummD");this.chartavgsummD=t,t.setThemes([am5themes_Animated.new(t)]),t.dateFormatter.setAll({dateFormat:"yyyy-MM-dd",dateFields:["valueX","openValueX"]});var a=t.container.children.push(am5xy.XYChart.new(t,{panY:!1,wheelY:"zoomX",layout:t.verticalLayout})),n=[],s=[],r=[],l=[];e.all.map((function(e){var t=e.date_new.split("-");n.push({date:new Date(t[0],parseInt(t[1])-1,parseInt(t[2])).getTime(),value:parseInt(e.count)})})),e.pic.map((function(e){var t=e.date_new.split("-");s.push({date:new Date(t[0],parseInt(t[1])-1,parseInt(t[2])).getTime(),value:parseInt(e.count)})})),e.dev.map((function(e){var t=e.date_new.split("-");r.push({date:new Date(t[0],parseInt(t[1])-1,parseInt(t[2])).getTime(),value:parseInt(e.count)})})),e.hall.map((function(e){var t=e.date_new.split("-");l.push({date:new Date(t[0],parseInt(t[1])-1,parseInt(t[2])).getTime(),value:parseInt(e.count)})}));var o=a.yAxes.push(am5xy.ValueAxis.new(t,{extraTooltipPrecision:1,renderer:am5xy.AxisRendererY.new(t,{})})),i=a.xAxes.push(am5xy.DateAxis.new(t,{baseInterval:{timeUnit:"day",count:1},startLocation:.5,endLocation:.5,renderer:am5xy.AxisRendererX.new(t,{})}));i.get("dateFormats").day="MM/dd",i.get("periodChangeDateFormats").day="MM/dd";var m=a.yAxes.push(am5xy.CategoryAxis.new(t,{categoryField:"category",extraTooltipPrecision:1,renderer:am5xy.AxisRendererY.new(t,{inversed:!0})}));function u(e,n,s){var r=a.series.push(am5xy.SmoothedXLineSeries.new(t,{name:e,xAxis:i,yAxis:o,valueYField:n,strokeWidth:5,valueXField:"date",tooltip:am5.Tooltip.new(t,{}),maskBullets:!1}));r.strokes.template.set("strokeWidth",2),"Всего"==e&&r.strokes.template.set("strokeWidth",8),r.bullets.push((function(){return am5.Bullet.new(t,{sprite:am5.Circle.new(t,{radius:2,fill:r.get("fill")})})})),r.get("tooltip").label.set("text","[bold]{name}[/]\n{valueX.formatDate()}: {valueY}"),r.data.setAll(s)}var c=this.state.colors;u("Всего","value",n),u("Самовывозов","value",s),u("Доставок","value",r),u("Зал","value",l),this.state.is_show_adv&&e.adv_data.length>"1"&&function(e,n,s){var r=[];s.map((function(e,t){s[t].name=e.category,s[t].promo=""!=e.promo||e.promo.length>0?"\nПромокод: "+e.promo:"",s[t].columnSettings.fill=am5.color(c[t]),r.push({category:e.category})})),m.data.setAll(r);var l=null,o={xAxis:i,yAxis:m,openValueXField:"fromDate",valueXField:"toDate",categoryYField:"category",sequencedInterpolation:!0};s.map((function(e,n){o.fill=am5.color(c[n]),(l=a.series.push(am5xy.ColumnSeries.new(t,o))).columns.template.setAll({templateField:"columnSettings",strokeOpacity:0,tooltipText:"[bold]{category}[/]\n{description}\n{openValueX.formatDate('yyyy-MM-dd')} - {valueX.formatDate('yyyy-MM-dd')}{promo}"}),l.bullets.push((function(){return am5.Bullet.new(t,{sprite:am5.Circle.new(t,{radius:2,fill:l.get("fill")})})}))})),l.columns.template.setAll({opacity:.5}),l.data.processor=am5.DataProcessor.new(t,{dateFields:["fromDate","toDate"],dateFormat:"yyyy-MM-dd HH:mm"}),l.data.setAll(s)}(0,0,e.adv_data),a.set("cursor",am5xy.XYCursor.new(t,{behavior:"zoomXY",xAxis:i})),i.set("tooltip",am5.Tooltip.new(t,{themeTags:["axis"]})),o.set("tooltip",am5.Tooltip.new(t,{themeTags:["axis"]}))}},{key:"renderCountPos",value:function(e){this.chartcountpos&&this.chartcountpos.dispose();var t=am5.Root.new("chartcountpos");this.chartcountpos=t,t.setThemes([am5themes_Animated.new(t)]);var a=t.container.children.push(am5xy.XYChart.new(t,{panY:!1,wheelY:"zoomX",layout:t.verticalLayout})),n=[],s=[];e.count_pizza.map((function(e){var t=e.date_new.split("-");n.push({date:new Date(t[0],parseInt(t[1])-1,1).getTime(),value:parseInt(e.count)})})),e.count_rolls.map((function(e){var t=e.date_new.split("-");s.push({date:new Date(t[0],parseInt(t[1])-1,1).getTime(),value:parseInt(e.count)})}));var r=a.yAxes.push(am5xy.ValueAxis.new(t,{extraTooltipPrecision:1,renderer:am5xy.AxisRendererY.new(t,{})})),l=a.xAxes.push(am5xy.DateAxis.new(t,{baseInterval:{timeUnit:"month",count:1},startLocation:.5,endLocation:.5,renderer:am5xy.AxisRendererX.new(t,{minGridDistance:30})}));function o(e,n,s){var o=a.series.push(am5xy.SmoothedXLineSeries.new(t,{name:e,xAxis:l,yAxis:r,valueYField:n,valueXField:"date",tooltip:am5.Tooltip.new(t,{}),maskBullets:!1}));o.bullets.push((function(){return am5.Bullet.new(t,{sprite:am5.Circle.new(t,{radius:2,fill:o.get("fill")})})})),o.strokes.template.set("strokeWidth",2),o.get("tooltip").label.set("text","[bold]{name}[/]\n{valueX.formatDate()}: {valueY}"),o.data.setAll(s)}l.get("dateFormats").day="MM/dd",l.get("periodChangeDateFormats").day="MM/dd",o("Роллов","value",s),o("Пиццы","value",n),a.set("cursor",am5xy.XYCursor.new(t,{behavior:"zoomXY",xAxis:l})),l.set("tooltip",am5.Tooltip.new(t,{themeTags:["axis"]})),r.set("tooltip",am5.Tooltip.new(t,{themeTags:["axis"]}))}},{key:"renderCountPosD",value:function(e){this.chartcountposD&&this.chartcountposD.dispose();var t=am5.Root.new("chartcountposD");this.chartcountposD=t,t.setThemes([am5themes_Animated.new(t)]),t.dateFormatter.setAll({dateFormat:"yyyy-MM-dd",dateFields:["valueX","openValueX"]});var a=t.container.children.push(am5xy.XYChart.new(t,{panY:!1,wheelY:"zoomX",layout:t.verticalLayout})),n=[],s=[];e.count_pizza.map((function(e){var t=e.date_new.split("-");n.push({date:new Date(t[0],parseInt(t[1])-1,parseInt(t[2])).getTime(),value:parseInt(e.count)})})),e.count_rolls.map((function(e){var t=e.date_new.split("-");s.push({date:new Date(t[0],parseInt(t[1])-1,parseInt(t[2])).getTime(),value:parseInt(e.count)})}));var r=a.yAxes.push(am5xy.ValueAxis.new(t,{extraTooltipPrecision:1,renderer:am5xy.AxisRendererY.new(t,{})})),l=a.xAxes.push(am5xy.DateAxis.new(t,{baseInterval:{timeUnit:"day",count:1},startLocation:.5,endLocation:.5,renderer:am5xy.AxisRendererX.new(t,{})}));l.get("dateFormats").day="MM/dd",l.get("periodChangeDateFormats").day="MM/dd";var o=a.yAxes.push(am5xy.CategoryAxis.new(t,{categoryField:"category",extraTooltipPrecision:1,renderer:am5xy.AxisRendererY.new(t,{inversed:!0})}));function i(e,n,s){var o=a.series.push(am5xy.SmoothedXLineSeries.new(t,{name:e,xAxis:l,yAxis:r,valueYField:n,strokeWidth:5,valueXField:"date",tooltip:am5.Tooltip.new(t,{}),maskBullets:!1}));o.strokes.template.set("strokeWidth",2),"Всего"==e&&o.strokes.template.set("strokeWidth",8),o.bullets.push((function(){return am5.Bullet.new(t,{sprite:am5.Circle.new(t,{radius:2,fill:o.get("fill")})})})),o.get("tooltip").label.set("text","[bold]{name}[/]\n{valueX.formatDate()}: {valueY}"),o.data.setAll(s)}var m=this.state.colors;i("Роллов","value",s),i("Пиццы","value",n),this.state.is_show_adv&&e.adv_data.length>"1"&&function(e,n,s){var r=[];s.map((function(e,t){s[t].name=e.category,s[t].promo=""!=e.promo||e.promo.length>0?"\nПромокод: "+e.promo:"",s[t].columnSettings.fill=am5.color(m[t]),r.push({category:e.category})})),o.data.setAll(r);var i=null,u={xAxis:l,yAxis:o,openValueXField:"fromDate",valueXField:"toDate",categoryYField:"category",sequencedInterpolation:!0};s.map((function(e,n){u.fill=am5.color(m[n]),(i=a.series.push(am5xy.ColumnSeries.new(t,u))).columns.template.setAll({templateField:"columnSettings",strokeOpacity:0,tooltipText:"[bold]{category}[/]\n{description}\n{openValueX.formatDate('yyyy-MM-dd')} - {valueX.formatDate('yyyy-MM-dd')}{promo}"}),i.bullets.push((function(){return am5.Bullet.new(t,{sprite:am5.Circle.new(t,{radius:2,fill:i.get("fill")})})}))})),i.columns.template.setAll({opacity:.5}),i.data.processor=am5.DataProcessor.new(t,{dateFields:["fromDate","toDate"],dateFormat:"yyyy-MM-dd HH:mm"}),i.data.setAll(s)}(0,0,e.adv_data),a.set("cursor",am5xy.XYCursor.new(t,{behavior:"zoomXY",xAxis:l})),l.set("tooltip",am5.Tooltip.new(t,{themeTags:["axis"]})),r.set("tooltip",am5.Tooltip.new(t,{themeTags:["axis"]}))}},{key:"changeDateRange",value:function(e,t){this.setState((0,u.Z)({},e,k(t)))}},{key:"showStat",value:function(e){var t;switch(e){case"roll":t=!this.state.show_stat_roll,this.setState({show_stat_roll:t});break;case"set":t=!this.state.show_stat_set,this.setState({show_stat_set:t});break;case"pizza":t=!this.state.show_stat_pizza,this.setState({show_stat_pizza:t})}}},{key:"render",value:function(){var e=this;return p.createElement(p.Fragment,null,p.createElement(x.Z,{style:{zIndex:99},open:this.state.is_load},p.createElement(v.Z,{color:"inherit"})),p.createElement(d.ZP,{container:!0,spacing:3},p.createElement(d.ZP,{item:!0,xs:12,sm:12},p.createElement("h1",null,this.state.module_name)),p.createElement(d.ZP,{item:!0,xs:12,sm:3},p.createElement(D.Qe,{label:"Дата от",value:this.state.date_start,func:this.changeDateRange.bind(this,"date_start")})),p.createElement(d.ZP,{item:!0,xs:12,sm:3},p.createElement(D.Qe,{label:"Дата от",value:this.state.date_end,func:this.changeDateRange.bind(this,"date_end")})),p.createElement(d.ZP,{item:!0,xs:12,sm:3},p.createElement(D.e_,{data:this.state.points,value:this.state.choosePoint,func:function(t,a){e.setState({choosePoint:a})},multiple:!0,label:"Точка"})),p.createElement(d.ZP,{item:!0,xs:6,sm:3},p.createElement(D.rZ,{value:this.state.promoName,func:function(t){e.setState({promoName:t.target.value})},label:"Промокод"})),p.createElement(d.ZP,{item:!0,xs:6,sm:3},p.createElement(D.$S,{data:this.state.typesShow,value:this.state.typeShow,func:function(t){e.setState({typeShow:t.target.value})},label:"Как показать"})),p.createElement(d.ZP,{item:!0,xs:12,sm:1},p.createElement(D.IA,{label:"Показать акции",value:this.state.is_show_adv,func:this.changeChekBox.bind(this,"is_show_adv")})),p.createElement(d.ZP,{item:!0,xs:12,sm:3},p.createElement(y.Z,{variant:"contained",onClick:this.show.bind(this)},"Обновить данные")),1!=this.state.typeShow?null:p.createElement(d.ZP,{item:!0,xs:12},p.createElement("h2",{style:{textAlign:"center"}},"Новые клиенты итог"),p.createElement(A.Z,{component:_.Z},p.createElement(w.Z,null,p.createElement(E.Z,null,p.createElement(Z.Z,null,p.createElement(f.Z,{style:{textAlign:"center"}},"Всего"),p.createElement(f.Z,{style:{textAlign:"center"}},"Контакт-центр"),p.createElement(f.Z,{style:{textAlign:"center"}},"Сайт"))),p.createElement(g.Z,null,p.createElement(Z.Z,null,p.createElement(f.Z,{style:{textAlign:"center"}},this.state.newUsersTable.all?this.state.newUsersTable.all:0),p.createElement(f.Z,{style:{textAlign:"center"}},this.state.newUsersTable.center?this.state.newUsersTable.center:0),p.createElement(f.Z,{style:{textAlign:"center"}},this.state.newUsersTable.site?this.state.newUsersTable.site:0)))))),1!=this.state.typeShow?null:p.createElement(d.ZP,{item:!0,xs:12},p.createElement("h2",{style:{textAlign:"center"}},"Заказы итог"),p.createElement(A.Z,{component:_.Z},p.createElement(w.Z,null,p.createElement(E.Z,null,p.createElement(Z.Z,null,p.createElement(f.Z,{style:{textAlign:"center"}},"Всего"),p.createElement(f.Z,{style:{textAlign:"center"}},"Доставок"),p.createElement(f.Z,{style:{textAlign:"center"}},"Зал"),p.createElement(f.Z,{style:{textAlign:"center"}},"Самовывоз"))),p.createElement(g.Z,null,p.createElement(Z.Z,null,p.createElement(f.Z,{style:{textAlign:"center"}},this.state.countOrdersTable.all?this.state.countOrdersTable.all:0),p.createElement(f.Z,{style:{textAlign:"center"}},this.state.countOrdersTable.dev?this.state.countOrdersTable.dev:0),p.createElement(f.Z,{style:{textAlign:"center"}},this.state.countOrdersTable.hall?this.state.countOrdersTable.hall:0),p.createElement(f.Z,{style:{textAlign:"center"}},this.state.countOrdersTable.pic?this.state.countOrdersTable.pic:0)))))),1!=this.state.typeShow?null:p.createElement(d.ZP,{item:!0,xs:12},p.createElement("h2",{style:{textAlign:"center"}},"Средний чек итог"),p.createElement(A.Z,{component:_.Z},p.createElement(w.Z,null,p.createElement(E.Z,null,p.createElement(Z.Z,null,p.createElement(f.Z,{style:{textAlign:"center"}},"Всего"),p.createElement(f.Z,{style:{textAlign:"center"}},"Доставка"),p.createElement(f.Z,{style:{textAlign:"center"}},"Зал"),p.createElement(f.Z,{style:{textAlign:"center"}},"Самовывоз"))),p.createElement(g.Z,null,p.createElement(Z.Z,null,p.createElement(f.Z,{style:{textAlign:"center"}},this.state.avgSumm.all?this.state.avgSumm.all:0),p.createElement(f.Z,{style:{textAlign:"center"}},this.state.avgSumm.dev?this.state.avgSumm.dev:0),p.createElement(f.Z,{style:{textAlign:"center"}},this.state.avgSumm.hall?this.state.avgSumm.hall:0),p.createElement(f.Z,{style:{textAlign:"center"}},this.state.avgSumm.pic?this.state.avgSumm.pic:0)))))),1!=this.state.typeShow?null:p.createElement(d.ZP,{item:!0,xs:12},p.createElement("h2",{style:{textAlign:"center"}},"Позиций итог"),p.createElement(A.Z,{component:_.Z},p.createElement(w.Z,null,p.createElement(E.Z,null,p.createElement(Z.Z,null,p.createElement(f.Z,{style:{textAlign:"center"}},"Роллов"),p.createElement(f.Z,{style:{textAlign:"center"}},"Пиццы"))),p.createElement(g.Z,null,p.createElement(Z.Z,null,p.createElement(f.Z,{style:{textAlign:"center"}},this.state.countPos.count_rolls?this.state.countPos.count_rolls:0),p.createElement(f.Z,{style:{textAlign:"center"}},this.state.countPos.count_pizza?this.state.countPos.count_pizza:0)))))),1!=this.state.typeShow?null:p.createElement(d.ZP,{item:!0,xs:12},p.createElement("h2",{style:{textAlign:"center"}},"Ушедшие клиенты"),p.createElement("h5",{style:{textAlign:"center"}},"ушли - заказывали за 90 дней до указанного периода и больше не заказывали"),p.createElement("h5",{style:{textAlign:"center"}},"вернулись - не заказывали 90 дней до указанного периода, сделали заказ в указанный период"),p.createElement(A.Z,{component:_.Z},p.createElement(w.Z,null,p.createElement(E.Z,null,p.createElement(Z.Z,null,p.createElement(f.Z,{style:{textAlign:"center"}},"Ушли"),p.createElement(f.Z,{style:{textAlign:"center"}},"Вернулись"))),p.createElement(g.Z,null,p.createElement(Z.Z,null,p.createElement(f.Z,{style:{textAlign:"center"}},this.state.fakeUsers.lost_users?this.state.fakeUsers.lost_users:0),p.createElement(f.Z,{style:{textAlign:"center"}},this.state.fakeUsers.ret_users?this.state.fakeUsers.ret_users:0))))),p.createElement(d.ZP,{container:!0,spacing:3},p.createElement(d.ZP,{style:{marginTop:20,marginBottom:200},item:!0,xs:12,sm:4},p.createElement("h2",{style:{textAlign:"center"}},"Рейтинг роллов "),p.createElement("h5",{style:{textAlign:"center",cursor:"pointer"},onClick:this.showStat.bind(this,"roll")},"Показать/Скрыть"),1!=this.state.show_stat_roll?null:p.createElement(A.Z,{style:{marginTop:20},component:_.Z},p.createElement(w.Z,null,p.createElement(g.Z,null,this.state.roll_stat.map((function(e,t){return p.createElement(Z.Z,{key:t},p.createElement(f.Z,null,e.name),p.createElement(f.Z,{style:{textAlign:"center"}},e.count))})))))),p.createElement(d.ZP,{style:{marginTop:20,marginBottom:200},item:!0,xs:12,sm:4},p.createElement("h2",{style:{textAlign:"center"}},"Рейтинг сетов"),p.createElement("h5",{style:{textAlign:"center",cursor:"pointer"},onClick:this.showStat.bind(this,"set")},"Показать/Скрыть"),1!=this.state.show_stat_set?null:p.createElement(A.Z,{style:{marginTop:20},component:_.Z},p.createElement(w.Z,null,p.createElement(g.Z,null,this.state.set_stat.map((function(e,t){return p.createElement(Z.Z,{key:t},p.createElement(f.Z,null,e.name),p.createElement(f.Z,{style:{textAlign:"center"}},e.count))})))))),p.createElement(d.ZP,{style:{marginTop:20,marginBottom:200},item:!0,xs:12,sm:4},p.createElement("h2",{style:{textAlign:"center"}},"Рейтинг Пиццы"),p.createElement("h5",{style:{textAlign:"center",cursor:"pointer"},onClick:this.showStat.bind(this,"pizza")},"Показать/Скрыть"),1!=this.state.show_stat_pizza?null:p.createElement(A.Z,{style:{marginTop:20},component:_.Z},p.createElement(w.Z,null,p.createElement(g.Z,null,this.state.pizza_stat.map((function(e,t){return p.createElement(Z.Z,{key:t},p.createElement(f.Z,null,e.name),p.createElement(f.Z,{style:{textAlign:"center"}},e.count))})))))))),2!=this.state.typeShow?null:p.createElement(d.ZP,{item:!0,xs:12},p.createElement("h2",{style:{textAlign:"center"}},"Новые клиенты по месяцам"),p.createElement("div",{id:"chartnewusers",style:{width:"100%",height:"500px"}})),2!=this.state.typeShow?null:p.createElement(d.ZP,{item:!0,xs:12},p.createElement("h2",{style:{textAlign:"center"}},"Заказы по месяцам"),p.createElement("div",{id:"chartorders",style:{width:"100%",height:"500px"}})),2!=this.state.typeShow?null:p.createElement(d.ZP,{item:!0,xs:12},p.createElement("h2",{style:{textAlign:"center"}},"Средний чек по месяцам"),p.createElement("div",{id:"chartavgsumm",style:{width:"100%",height:"500px"}})),2!=this.state.typeShow?null:p.createElement(d.ZP,{item:!0,xs:12},p.createElement("h2",{style:{textAlign:"center"}},"Позиций по месяцам"),p.createElement("div",{id:"chartcountpos",style:{width:"100%",height:"500px"}})),3!=this.state.typeShow?null:p.createElement(d.ZP,{item:!0,xs:12},p.createElement("h2",{style:{textAlign:"center"}},"Новые клиенты по дням"),p.createElement("div",{id:"chartnewusersD",style:{width:"100%",height:"500px"}})),3!=this.state.typeShow?null:p.createElement(d.ZP,{item:!0,xs:12},p.createElement("h2",{style:{textAlign:"center"}},"Заказы по дням"),p.createElement("div",{id:"chartordersD",style:{width:"100%",height:"500px"}})),3!=this.state.typeShow?null:p.createElement(d.ZP,{item:!0,xs:12},p.createElement("h2",{style:{textAlign:"center"}},"Средний чек по дням"),p.createElement("div",{id:"chartavgsummD",style:{width:"100%",height:"500px"}})),3!=this.state.typeShow?null:p.createElement(d.ZP,{item:!0,xs:12},p.createElement("h2",{style:{textAlign:"center"}},"Позиций по дням"),p.createElement("div",{id:"chartcountposD",style:{width:"100%",height:"500px"}}))))}}]),I}(p.Component);function b(){return p.createElement(S,null)}},1702:(e,t,a)=>{var n=a(4783)(e.id,{locals:!1});e.hot.dispose(n),e.hot.accept(void 0,n)}}]);
//# sourceMappingURL=714.076bef2b658573e82e19.js.map