import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//import * as am5 from "@amcharts/amcharts5";
//import * as am5xy from "@amcharts/amcharts5/xy";
//import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

//import * as am4core from "@amcharts/amcharts4/core";
//import * as am4charts from "@amcharts/amcharts4/charts";

import { MyTextInput, MySelect, MyAutocomplite, MyDaterange } from '../../stores/elements';

const queryString = require('query-string');

const theme = createTheme({
  palette: {
    primary: {
      main: '#c03',
    },
    def: {
      main: '#353b48',
      secondary: '#fff'
    },
  },
});

const useStyles = makeStyles({
  formControl: {
    //margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  tableCel: {
    textAlign: 'center',
    borderRight: '1px solid #e5e5e5',
    padding: 15,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: "#e5e5e5",
    },
  },
  tableCelHead: {
    textAlign: 'center',
    padding: 15
  },
  customCel: {
    backgroundColor: "#bababa",
    textAlign: 'center',
    borderRight: '1px solid #e5e5e5',
    padding: 15,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: "#e5e5e5",
    },
  },
  timePicker: {
    width: '100%'
  }
});


function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

class SiteStatMarc_ extends React.Component {
  chartnewusers = null;
  chartorders = null;
  chartavgsumm = null;
  chartcountpos = null;

  chartnewusersD = null;
  chartordersD = null;
  chartavgsummD = null;
  chartcountposD = null;

  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'site_stat_marc',
      module_name: '',
      is_load: false,
      
      choosePoint: [],
      points: [],
      rangeDate: [formatDate(new Date()), formatDate(new Date())],
      promoName: '',

      newUsersTable: [],
      countOrdersTable: [],
      avgSumm: [],
      countPos: [],

      typesShow: [
        {id: 1, name: 'Итоговый результат'},
        {id: 2, name: 'График по месяцам'},
        {id: 3, name: 'График по дням'},
      ],
      typeShow: 1
    };
  }
  
  async componentDidMount(){
    let data = await this.getData('get_all');
    
    this.setState({
      module_name: data.module_info.name,
      points: data.points
    })
    
    document.title = data.module_info.name;
  }
  
  getData = (method, data = {}) => {
    
    this.setState({
      is_load: true
    })
    
    return fetch('https://jacochef.ru/api/index_new.php', {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify({
        method: method, 
        module: this.state.module,
        version: 2,
        login: localStorage.getItem('token'),
        data: JSON.stringify( data )
      })
    }).then(res => res.json()).then(json => {
      
      if( json.st === false && json.type == 'redir' ){
        this.state.history.push("/");
        return;
      }
      
      if( json.st === false && json.type == 'auth' ){
        window.location.pathname = '/auth';
        return;
      }
      
      setTimeout( () => {
        this.setState({
          is_load: false
        })
      }, 300 )
      
      return json;
    })
    .catch(err => { 
      console.log( err )
      this.setState({
        is_load: false
      })
    });
  }
   
  async show(){
    let data = {
      points: this.state.choosePoint,
      dateStart: this.state.rangeDate[0],
      dateEnd: this.state.rangeDate[1],
      typeShow: this.state.typeShow,
      promoName: this.state.promoName
    };

    let res = await this.getData('show', data);

    console.log( res )

    if( parseInt( this.state.typeShow ) == 1 ){
      this.setState({
        newUsersTable: res.new_users,
        countOrdersTable: res.count_orders,
        avgSumm: res.avg_summ,
        countPos: res.count_pos
      })
    }

   
    

    /*if( parseInt( this.state.typeShow ) == 2 ){
      this.renderGraphNewUsers(res.new_users);
      this.renderGraphOrders(res.count_orders);
      this.renderGraphAvgSumm(res.avg_summ);
      this.renderCountPos(res.count_pos);
    }

    if( parseInt( this.state.typeShow ) == 3 ){
      this.renderGraphNewUsersD(res.new_users);
      this.renderGraphOrdersD(res.count_orders);
      this.renderGraphAvgSummD(res.avg_summ);
      this.renderCountPosD(res.count_pos);
    }*/
  }

  

  renderGraphNewUsers(MyData){
    if( this.chartnewusers ){
      this.chartnewusers.dispose();
    }

    var root = am5.Root.new("chartnewusers");
    this.chartnewusers = root;

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push( 
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: "zoomX",
        layout: root.verticalLayout,
        maxTooltipDistance: 0
      }) 
    );

    var data_site = [];
    var data_center = [];
    var data_all = [];

    MyData.site.map( (item) => {

      let date = item.date.split('-');

      data_site.push({
        date: new Date(date[0], parseInt(date[1])-1, 1).getTime(),
        value: parseInt(item.count)
      })
    } )

    MyData.center.map( (item) => {

      let date = item.date.split('-');

      data_center.push({
        date: new Date(date[0], parseInt(date[1])-1, 1).getTime(),
        value: parseInt(item.count)
      })
    } )

    MyData.all.map( (item) => {

      let date = item.date.split('-');

      data_all.push({
        date: new Date(date[0], parseInt(date[1])-1, 1).getTime(),
        value: parseInt(item.count)
      })
    } )

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "month", count: 1 },
        startLocation: 0.5,
        endLocation: 0.5,
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
        })
      })
    );

    xAxis.get("dateFormats")["day"] = "MM/dd";
    xAxis.get("periodChangeDateFormats")["day"] = "MM/dd";

    // Create series
    function createSeries(name, field, data) {
      var series = chart.series.push( 
        am5xy.LineSeries.new(root, { 
          name: name,
          xAxis: xAxis, 
          yAxis: yAxis, 
          valueYField: field, 
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {}),
          maskBullets: false
        }) 
      );
      
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill")
          })
        });
      });
      
      series.strokes.template.set("strokeWidth", 2);
      
      series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}")
      series.data.setAll(data);
    }

    createSeries("Сайт", "value", data_site);
    createSeries("Контакт-центр", "value", data_center);
    createSeries("Всего", "value", data_all);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomXY",
      xAxis: xAxis
    }));

    xAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));

    yAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));
  }

  renderGraphNewUsersD(MyData){
    if( this.chartnewusersD ){
      this.chartnewusersD.dispose();
    }

    var root = am5.Root.new("chartnewusersD");
    this.chartnewusersD = root;

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push( 
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: "zoomX",
        layout: root.verticalLayout,
        maxTooltipDistance: 0
      }) 
    );

    var data_site = [];
    var data_center = [];
    var data_all = [];

    MyData.site.map( (item) => {

      let date = item.date_new.split('-');

      data_site.push({
        date: new Date(date[0], parseInt(date[1])-1, parseInt(date[2])).getTime(),
        value: parseInt(item.count)
      })
    } )

    MyData.center.map( (item) => {

      let date = item.date_new.split('-');

      data_center.push({
        date: new Date(date[0], parseInt(date[1])-1, parseInt(date[2])).getTime(),
        value: parseInt(item.count)
      })
    } )

    MyData.all.map( (item) => {

      let date = item.date_new.split('-');

      data_all.push({
        date: new Date(date[0], parseInt(date[1])-1, parseInt(date[2])).getTime(),
        value: parseInt(item.count)
      })
    } )

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "day", count: 1 },
        startLocation: 0.5,
        endLocation: 0.5,
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
        })
      })
    );

    xAxis.get("dateFormats")["day"] = "MM/dd";
    xAxis.get("periodChangeDateFormats")["day"] = "MM/dd";

    // Create series
    function createSeries(name, field, data) {
      var series = chart.series.push( 
        am5xy.LineSeries.new(root, { 
          name: name,
          xAxis: xAxis, 
          yAxis: yAxis, 
          valueYField: field, 
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {}),
          maskBullets: false
        }) 
      );
      
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill")
          })
        });
      });
      
      series.strokes.template.set("strokeWidth", 2);
      
      series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}")
      series.data.setAll(data);
    }

    createSeries("Сайт", "value", data_site);
    createSeries("Контакт-центр", "value", data_center);
    createSeries("Всего", "value", data_all);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomXY",
      xAxis: xAxis
    }));

    xAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));

    yAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));
  }

  renderGraphOrders(MyData){
    if( this.chartorders ){
      this.chartorders.dispose();
    }

    var root = am5.Root.new("chartorders"); 

    this.chartorders = root;

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push( 
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: "zoomX",
        layout: root.verticalLayout,
        maxTooltipDistance: 0
      }) 
    );

    var data_all = [];
    var data_pic = [];
    var data_dev = [];
    var data_hall = [];

    MyData.all.map( (item) => {

      let date = item.date_new.split('-');

      data_all.push({
        date: new Date(date[0], parseInt(date[1])-1, 1).getTime(),
        value: parseInt(item.count)
      })
    } )

    MyData.pic.map( (item) => {

      let date = item.date_new.split('-');

      data_pic.push({
        date: new Date(date[0], parseInt(date[1])-1, 1).getTime(),
        value: parseInt(item.count)
      })
    } )

    MyData.dev.map( (item) => {

      let date = item.date_new.split('-');

      data_dev.push({
        date: new Date(date[0], parseInt(date[1])-1, 1).getTime(),
        value: parseInt(item.count)
      })
    } )

    MyData.hall.map( (item) => {

      let date = item.date_new.split('-');

      data_hall.push({
        date: new Date(date[0], parseInt(date[1])-1, 1).getTime(),
        value: parseInt(item.count)
      })
    } )

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "month", count: 1 },
        startLocation: 0.5,
        endLocation: 0.5,
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
        })
      })
    );

    xAxis.get("dateFormats")["day"] = "MM/dd";
    xAxis.get("periodChangeDateFormats")["day"] = "MM/dd";

    // Create series
    function createSeries(name, field, data) {
      var series = chart.series.push( 
        am5xy.LineSeries.new(root, { 
          name: name,
          xAxis: xAxis, 
          yAxis: yAxis, 
          valueYField: field, 
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {}),
          maskBullets: false
        }) 
      );
      
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill")
          })
        });
      });
      
      series.strokes.template.set("strokeWidth", 2);
      
      series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}")
      series.data.setAll(data);
    }

    createSeries("Всего", "value", data_all);
    createSeries("Самовывозов", "value", data_pic);
    createSeries("Доставок", "value", data_dev);
    createSeries("Зал", "value", data_hall);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomXY",
      xAxis: xAxis
    }));

    xAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));

    yAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));
  }

  renderGraphOrdersD(MyData){
    if( this.chartordersD ){
      this.chartordersD.dispose();
    }

    var root = am5.Root.new("chartordersD"); 

    this.chartordersD = root;

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push( 
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: "zoomX",
        layout: root.verticalLayout,
        maxTooltipDistance: 0
      }) 
    );

    var data_all = [];
    var data_pic = [];
    var data_dev = [];
    var data_hall = [];

    MyData.all.map( (item) => {

      let date = item.date_new.split('-');

      data_all.push({
        date: new Date(date[0], parseInt(date[1])-1, parseInt(date[2])).getTime(),
        value: parseInt(item.count)
      })
    } )

    MyData.pic.map( (item) => {

      let date = item.date_new.split('-');

      data_pic.push({
        date: new Date(date[0], parseInt(date[1])-1, parseInt(date[2])).getTime(),
        value: parseInt(item.count)
      })
    } )

    MyData.dev.map( (item) => {

      let date = item.date_new.split('-');

      data_dev.push({
        date: new Date(date[0], parseInt(date[1])-1, parseInt(date[2])).getTime(),
        value: parseInt(item.count)
      })
    } )

    MyData.hall.map( (item) => {

      let date = item.date_new.split('-');

      data_hall.push({
        date: new Date(date[0], parseInt(date[1])-1, parseInt(date[2])).getTime(),
        value: parseInt(item.count)
      })
    } )

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "day", count: 1 },
        startLocation: 0.5,
        endLocation: 0.5,
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
        })
      })
    );

    xAxis.get("dateFormats")["day"] = "MM/dd";
    xAxis.get("periodChangeDateFormats")["day"] = "MM/dd";

    // Create series
    function createSeries(name, field, data) {
      var series = chart.series.push( 
        am5xy.LineSeries.new(root, { 
          name: name,
          xAxis: xAxis, 
          yAxis: yAxis, 
          valueYField: field, 
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {}),
          maskBullets: false
        }) 
      );
      
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill")
          })
        });
      });
      
      series.strokes.template.set("strokeWidth", 2);
      
      series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}")
      series.data.setAll(data);
    }

    createSeries("Всего", "value", data_all);
    createSeries("Самовывозов", "value", data_pic);
    createSeries("Доставок", "value", data_dev);
    createSeries("Зал", "value", data_hall);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomXY",
      xAxis: xAxis
    }));

    xAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));

    yAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));
  }

  renderGraphAvgSumm(MyData){
    if( this.chartavgsumm ){
      this.chartavgsumm.dispose();
    }

    var root = am5.Root.new("chartavgsumm"); 

    this.chartavgsumm = root;

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push( 
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: "zoomX",
        layout: root.verticalLayout,
        maxTooltipDistance: 0
      }) 
    );

    var data_all = [];
    var data_pic = [];
    var data_dev = [];
    var data_hall = [];

    MyData.all.map( (item) => {

      let date = item.date_new.split('-');

      data_all.push({
        date: new Date(date[0], parseInt(date[1])-1, 1).getTime(),
        value: parseInt(item.count)
      })
    } )

    MyData.pic.map( (item) => {

      let date = item.date_new.split('-');

      data_pic.push({
        date: new Date(date[0], parseInt(date[1])-1, 1).getTime(),
        value: parseInt(item.count)
      })
    } )

    MyData.dev.map( (item) => {

      let date = item.date_new.split('-');

      data_dev.push({
        date: new Date(date[0], parseInt(date[1])-1, 1).getTime(),
        value: parseInt(item.count)
      })
    } )

    MyData.hall.map( (item) => {

      let date = item.date_new.split('-');

      data_hall.push({
        date: new Date(date[0], parseInt(date[1])-1, 1).getTime(),
        value: parseInt(item.count)
      })
    } )

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "month", count: 1 },
        startLocation: 0.5,
        endLocation: 0.5,
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
        })
      })
    );

    xAxis.get("dateFormats")["day"] = "MM/dd";
    xAxis.get("periodChangeDateFormats")["day"] = "MM/dd";

    // Create series
    function createSeries(name, field, data) {
      var series = chart.series.push( 
        am5xy.LineSeries.new(root, { 
          name: name,
          xAxis: xAxis, 
          yAxis: yAxis, 
          valueYField: field, 
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {}),
          maskBullets: false
        }) 
      );
      
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill")
          })
        });
      });
      
      series.strokes.template.set("strokeWidth", 2);
      
      series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}")
      series.data.setAll(data);
    }

    createSeries("Всего", "value", data_all);
    createSeries("Самовывозов", "value", data_pic);
    createSeries("Доставок", "value", data_dev);
    createSeries("Зал", "value", data_hall);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomXY",
      xAxis: xAxis
    }));

    xAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));

    yAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));
  }

  renderGraphAvgSummD(MyData){
    if( this.chartavgsummD ){
      this.chartavgsummD.dispose();
    }

    var root = am5.Root.new("chartavgsummD"); 

    this.chartavgsummD = root;

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push( 
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: "zoomX",
        layout: root.verticalLayout,
        maxTooltipDistance: 0
      }) 
    );

    var data_all = [];
    var data_pic = [];
    var data_dev = [];
    var data_hall = [];

    MyData.all.map( (item) => {

      let date = item.date_new.split('-');

      data_all.push({
        date: new Date(date[0], parseInt(date[1])-1, parseInt(date[2])).getTime(),
        value: parseInt(item.count)
      })
    } )

    MyData.pic.map( (item) => {

      let date = item.date_new.split('-');

      data_pic.push({
        date: new Date(date[0], parseInt(date[1])-1, parseInt(date[2])).getTime(),
        value: parseInt(item.count)
      })
    } )

    MyData.dev.map( (item) => {

      let date = item.date_new.split('-');

      data_dev.push({
        date: new Date(date[0], parseInt(date[1])-1, parseInt(date[2])).getTime(),
        value: parseInt(item.count)
      })
    } )

    MyData.hall.map( (item) => {

      let date = item.date_new.split('-');

      data_hall.push({
        date: new Date(date[0], parseInt(date[1])-1, parseInt(date[2])).getTime(),
        value: parseInt(item.count)
      })
    } )

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "day", count: 1 },
        startLocation: 0.5,
        endLocation: 0.5,
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
        })
      })
    );

    xAxis.get("dateFormats")["day"] = "MM/dd";
    xAxis.get("periodChangeDateFormats")["day"] = "MM/dd";

    // Create series
    function createSeries(name, field, data) {
      var series = chart.series.push( 
        am5xy.LineSeries.new(root, { 
          name: name,
          xAxis: xAxis, 
          yAxis: yAxis, 
          valueYField: field, 
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {}),
          maskBullets: false
        }) 
      );
      
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill")
          })
        });
      });
      
      series.strokes.template.set("strokeWidth", 2);
      
      series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}")
      series.data.setAll(data);
    }

    createSeries("Всего", "value", data_all);
    createSeries("Самовывозов", "value", data_pic);
    createSeries("Доставок", "value", data_dev);
    createSeries("Зал", "value", data_hall);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomXY",
      xAxis: xAxis
    }));

    xAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));

    yAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));
  }

  renderCountPos(MyData){
    if( this.chartcountpos ){
      this.chartcountpos.dispose();
    }

    var root = am5.Root.new("chartcountpos"); 

    this.chartcountpos = root;

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push( 
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: "zoomX",
        layout: root.verticalLayout,
        maxTooltipDistance: 0
      }) 
    );

    var data_pizza = [];
    var data_rolls = [];

    MyData.count_pizza.map( (item) => {

      let date = item.date_new.split('-');

      data_pizza.push({
        date: new Date(date[0], parseInt(date[1])-1, 1).getTime(),
        value: parseInt(item.count)
      })
    } )

    MyData.count_rolls.map( (item) => {

      let date = item.date_new.split('-');

      data_rolls.push({
        date: new Date(date[0], parseInt(date[1])-1, 1).getTime(),
        value: parseInt(item.count)
      })
    } )

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "month", count: 1 },
        startLocation: 0.5,
        endLocation: 0.5,
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
        })
      })
    );

    xAxis.get("dateFormats")["day"] = "MM/dd";
    xAxis.get("periodChangeDateFormats")["day"] = "MM/dd";

    // Create series
    function createSeries(name, field, data) {
      var series = chart.series.push( 
        am5xy.LineSeries.new(root, { 
          name: name,
          xAxis: xAxis, 
          yAxis: yAxis, 
          valueYField: field, 
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {}),
          maskBullets: false
        }) 
      );
      
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill")
          })
        });
      });
      
      series.strokes.template.set("strokeWidth", 2);
      
      series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}")
      series.data.setAll(data);
    }

    createSeries("Роллов", "value", data_rolls);
    createSeries("Пиццы", "value", data_pizza);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomXY",
      xAxis: xAxis
    }));

    xAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));

    yAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));
  }

  renderCountPosD(MyData){
    if( this.chartcountposD ){
      this.chartcountposD.dispose();
    }

    var root = am5.Root.new("chartcountposD"); 

    this.chartcountposD = root;

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push( 
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: "zoomX",
        layout: root.verticalLayout,
        maxTooltipDistance: 0
      }) 
    );

    var data_pizza = [];
    var data_rolls = [];

    MyData.count_pizza.map( (item) => {

      let date = item.date_new.split('-');

      data_pizza.push({
        date: new Date(date[0], parseInt(date[1])-1, parseInt(date[2])).getTime(),
        value: parseInt(item.count)
      })
    } )

    MyData.count_rolls.map( (item) => {

      let date = item.date_new.split('-');

      data_rolls.push({
        date: new Date(date[0], parseInt(date[1])-1, parseInt(date[2])).getTime(),
        value: parseInt(item.count)
      })
    } )

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "day", count: 1 },
        startLocation: 0.5,
        endLocation: 0.5,
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
        })
      })
    );

    xAxis.get("dateFormats")["day"] = "MM/dd";
    xAxis.get("periodChangeDateFormats")["day"] = "MM/dd";

    // Create series
    function createSeries(name, field, data) {
      var series = chart.series.push( 
        am5xy.LineSeries.new(root, { 
          name: name,
          xAxis: xAxis, 
          yAxis: yAxis, 
          valueYField: field, 
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {}),
          maskBullets: false
        }) 
      );
      
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill")
          })
        });
      });
      
      series.strokes.template.set("strokeWidth", 2);
      
      series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}")
      series.data.setAll(data);
    }

    createSeries("Роллов", "value", data_rolls);
    createSeries("Пиццы", "value", data_pizza);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomXY",
      xAxis: xAxis
    }));

    xAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));

    yAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));
  }

  changeDateRange(data){
    let dateStart = data[0] ? formatDate(data[0]) : '';
    let dateEnd = data[1] ? formatDate(data[1]) : '';
    
    this.setState({
      rangeDate: [dateStart, dateEnd]
    })
  }

  render(){
    return (
      <>
        <Backdrop className={this.state.classes.backdrop} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={6} className="MyDaterange">
            <MyDaterange startText="Дата от" endText="Дата до" value={this.state.rangeDate} func={ this.changeDateRange.bind(this) } />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MyAutocomplite classes={this.state.classes} data={this.state.points} value={this.state.choosePoint} func={ (event, data) => { this.setState({ choosePoint: data }) } } multiple={true} label='Точка' />
          </Grid>
          <Grid item xs={6} sm={3}>
            <MyTextInput value={this.state.promoName} func={ (event) => { this.setState({ promoName: event.target.value }) } } label='Промокод' />
          </Grid>
          <Grid item xs={6} sm={3}>
            <MySelect data={this.state.typesShow} value={this.state.typeShow} func={ (event) => { this.setState({ typeShow: event.target.value }) } } label='Как показать' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" onClick={this.show.bind(this)}>Обновить данные</Button>
          </Grid>
        

          { this.state.typeShow != 1 ? null :
            <Grid item xs={12}>
              <h2 style={{ textAlign: 'center' }}>Новые клиенты итог</h2>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ textAlign: 'center' }}>Всего</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>Контакт-центр</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>Сайт</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  
                    <TableRow>
                      <TableCell style={{ textAlign: 'center' }}>{this.state.newUsersTable.all ? this.state.newUsersTable.all : 0}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{this.state.newUsersTable.center ? this.state.newUsersTable.center : 0}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{this.state.newUsersTable.site ? this.state.newUsersTable.site : 0}</TableCell>
                    </TableRow>

                    
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          }

          { this.state.typeShow != 1 ? null :
            <Grid item xs={12}>
              <h2 style={{ textAlign: 'center' }}>Заказы итог</h2>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ textAlign: 'center' }}>Всего</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>Доставок</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>Зал</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>Самовывоз</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  
                    <TableRow>
                      <TableCell style={{ textAlign: 'center' }}>{this.state.countOrdersTable.all ? this.state.countOrdersTable.all : 0}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{this.state.countOrdersTable.dev ? this.state.countOrdersTable.dev : 0}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{this.state.countOrdersTable.hall ? this.state.countOrdersTable.hall : 0}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{this.state.countOrdersTable.pic ? this.state.countOrdersTable.pic : 0}</TableCell>
                    </TableRow>

                    
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          }

          { this.state.typeShow != 1 ? null :
            <Grid item xs={12}>
              <h2 style={{ textAlign: 'center' }}>Средний чек итог</h2>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ textAlign: 'center' }}>Всего</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>Доставка</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>Зал</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>Самовывоз</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  
                    <TableRow>
                      <TableCell style={{ textAlign: 'center' }}>{this.state.avgSumm.all ? this.state.avgSumm.all : 0}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{this.state.avgSumm.dev ? this.state.avgSumm.dev : 0}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{this.state.avgSumm.hall ? this.state.avgSumm.hall : 0}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{this.state.avgSumm.pic ? this.state.avgSumm.pic : 0}</TableCell>
                    </TableRow>

                    
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          }

          { this.state.typeShow != 1 ? null :
            <Grid item xs={12}>
              <h2 style={{ textAlign: 'center' }}>Позиций итог</h2>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ textAlign: 'center' }}>Роллов</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>Пиццы</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  
                    <TableRow>
                      <TableCell style={{ textAlign: 'center' }}>{this.state.countPos.count_rolls ? this.state.countPos.count_rolls : 0}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{this.state.countPos.count_pizza ? this.state.countPos.count_pizza : 0}</TableCell>
                    </TableRow>

                    
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          }

          { this.state.typeShow != 1 ? null :
            <Grid item xs={12}>
              <h2 style={{ textAlign: 'center' }}>Новые клиенты по месяцам</h2>
              <div id="chartnewusers" style={{ width: "100%", height: "500px" }} />
            </Grid>
          }

          { this.state.typeShow != 2 ? null :
            <Grid item xs={12}>
              <h2 style={{ textAlign: 'center' }}>Заказы по месяцам</h2>
              <div id="chartorders" style={{ width: "100%", height: "500px" }} />
            </Grid>
          }

          { this.state.typeShow != 2 ? null :
            <Grid item xs={12}>
              <h2 style={{ textAlign: 'center' }}>Средний чек по месяцам</h2>
              <div id="chartavgsumm" style={{ width: "100%", height: "500px" }} />
            </Grid>
          }

          { this.state.typeShow != 2 ? null :
            <Grid item xs={12}>
              <h2 style={{ textAlign: 'center' }}>Позиций по месяцам</h2>
              <div id="chartcountpos" style={{ width: "100%", height: "500px" }} />
            </Grid>
          }


          { this.state.typeShow != 3 ? null :
            <Grid item xs={12}>
              <h2 style={{ textAlign: 'center' }}>Новые клиенты по дням</h2>
              <div id="chartnewusersD" style={{ width: "100%", height: "500px" }} />
            </Grid>
          }

          { this.state.typeShow != 3 ? null :
            <Grid item xs={12}>
              <h2 style={{ textAlign: 'center' }}>Заказы по дням</h2>
              <div id="chartordersD" style={{ width: "100%", height: "500px" }} />
            </Grid>
          }

          { this.state.typeShow != 3 ? null :
            <Grid item xs={12}>
              <h2 style={{ textAlign: 'center' }}>Средний чек по дням</h2>
              <div id="chartavgsummD" style={{ width: "100%", height: "500px" }} />
            </Grid>
          }

          { this.state.typeShow != 3 ? null :
            <Grid item xs={12}>
              <h2 style={{ textAlign: 'center' }}>Позиций по дням</h2>
              <div id="chartcountposD" style={{ width: "100%", height: "500px" }} />
            </Grid>
          }


        </Grid>
      </>
    )
  }
}

export function SiteStatMarc () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <SiteStatMarc_ classes={classes} history={history} />
  );
}