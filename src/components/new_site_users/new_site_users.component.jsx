import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Typography from '@mui/material/Typography';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { TextEditor22 } from '../../stores/elements';

import { MyAutocomplite, MyDatePickerNew, formatDate } from '../../stores/elements';

import dayjs from 'dayjs';
import queryString from 'query-string';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';

class CatWork_ extends React.Component {
  chartordersD = null;
  click = false;

  constructor(props) {
    super(props);
        
    this.myRef = React.createRef();

    this.state = {
      module: 'new_site_users',
      module_name: '',
      is_load: false,
      
      cats: [],
      modalDialog: false,

      nameCat: '',
      editText: '',

      nameCatNew: '',
      editTextNew: '',

      config: {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
      },

      showCat: null,

      date_start: formatDate(new Date()),
      date_end: formatDate(new Date()),
      points: [],
      point: [],
      svod: [],
      modalDialogNew: false,
      user_info: null,
      user_orders: [],
      openNumber: '',
      comments: [],
      textComment: ''
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
        window.location.pathname = '/';
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
   
  openCat(item){
    this.setState({
      modalDialog: true,
      showCat: item,
      nameCat: item.name,
      editText: item.text
    })
  }

  async save(){
    let data = {
      cat_id: this.state.showCat.id,
      name: this.state.nameCat,
      text: this.state.showCat.text
    };

    let res = await this.getData('save_edit', data);

    if( res.st === false ){
      alert(res.text)
    }else{
      this.setState({ 
        modalDialog: false, 
        showCat: null, 
        nameCat: '' 
      })

      //document.getElementById('EditorEdit').value = '';

      res = await this.getData('get_all');
    
      this.setState({
        cats: res.cats
      })
    }
  }

  async saveNew(){
    let data = {
      name: this.state.nameCatNew,
      text: document.getElementById('EditorNew').value
    };

    let res = await this.getData('save_new', data);

    if( res.st === false ){
      alert(res.text)
    }else{
      this.setState({ 
        modalDialogNew: false, 
        editTextNew: '', 
        nameCatNew: '' 
      })

      document.getElementById('EditorNew').value = '';

      res = await this.getData('get_all');
    
      this.setState({
        cats: res.cats
      })
    }
  }

  


  changeDate(type, val){
    this.setState({
      [type]: val
    })
  }

  changePoint(event, point){
    this.setState({
      point: point
    })
  }
  
  async show(){
    let data = {
      point_id: this.state.point,
      date_start: dayjs(this.state.date_start).format('YYYY-MM-DD'),
      date_end: dayjs(this.state.date_end).format('YYYY-MM-DD')  
    };

    let res = await this.getData('show', data);

    if( res.st === false ){
      alert(res.text)
    }else{
      this.setState({
        svod: res.svod
      });

      this.renderGraphOrdersD(res.svod);
    }
  }

  async get_user_info(number){
    let data = {
      number
    };

    let res = await this.getData('get_one', data);

    this.setState({
      modalDialogNew: true,
      user_info: res.info,
      user_orders: res.orders,
      comments: res.comments,
      openNumber: number
    })
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

    root.dateFormatter.setAll({
        dateFormat: "yyyy-MM-dd", 
        dateFields: ["valueX", "openValueX"] 
    });

    var chart = root.container.children.push( 
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: "zoomX",
        layout: root.verticalLayout,
        //maxTooltipDistance: 0
      }) 
    );

    var data_all = [];
    var data_pic = [];
    var data_dev = [];
    var data_hall = [];
 
    MyData.map( (item) => {
      let date = item.date.split('-');

      data_all.push({
        date: new Date(date[0], parseInt(date[1])-1, parseInt(date[2])).getTime(),
        value: parseInt(item.count)
      })
    })
     
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
        renderer: am5xy.AxisRendererX.new(root, {})
      })
    );

    xAxis.get("dateFormats")["day"] = "MM/dd";
    xAxis.get("periodChangeDateFormats")["day"] = "MM/dd";

    var yAxis2 = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, { inversed: true }),
        //tooltip: am5.Tooltip.new(root, {
        //    themeTags: ["axis"],
        //    animationDuration: 200
        //})
      })
    );


    // Create series правка 4 Заказы по дням
    function createSeries(name, field, data) {
     
      var series = chart.series.push( 
        am5xy.SmoothedXLineSeries.new(root, {
          name: name,
          xAxis: xAxis, 
          yAxis: yAxis, 
          valueYField: field,
          strokeWidth: 5,
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {}),
          maskBullets: false
        }) 
      );

      series.strokes.template.set("strokeWidth", 2);

      if (name == 'Всего') {
          series.strokes.template.set("strokeWidth", 8)
      }
       
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 2,
            fill: series.get("fill")
          })
        });
      });
      
      series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}")
      series.data.setAll(data);
    }

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

  changeText(data){
    this.setState({
      textComment: data
    })
  }

  async saveComment(){

    if(this.myRef.current) {
      //console.log(this.myRef.current.getContent());
    }else{
      alert('Комментарий пустой')
    }

    if( this.click === true ){
      return ;
    }else{
      this.click = true;
    }

    let data = {
      number: this.state.openNumber,
      text: this.myRef.current.getContent()
    };

    let res = await this.getData('save_comment', data);

    if( res.st === false ){
      alert(res.text)
    }else{
      this.myRef.current.setContent('');

      this.setState({
        comments: res.comments,
      })
    }

    setTimeout( () => {
      this.click = false;
    }, 500 )
  }

  render(){
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Dialog
          open={this.state.modalDialogNew}
          onClose={ () => { this.setState({ modalDialogNew: false }) } }
          fullWidth={true}
          maxWidth={'lg'}
        >
          <DialogTitle>Информация о клиенте</DialogTitle>
          <DialogContent style={{ paddingTop: 10 }}>
            
            <Grid container spacing={3}>
              
              <Grid item xs={12} sm={4}>

                <Grid container>
                  <Grid item xs={12} sm={12}>
                    <span>Имя: </span>
                    <span>{this.state.user_info?.name}</span>
                  </Grid>
                  <Grid item xs={12} sm={12} style={{ paddingTop: 12 }}>
                    <span>Регистрация: </span>
                    <span>{this.state.user_info?.date_reg}</span>
                  </Grid>
                  <Grid item xs={12} sm={12} style={{ paddingTop: 12 }}>
                    <span>День рождения: </span>
                    <span>{this.state.user_info?.date_bir}</span>
                  </Grid>
                  <Grid item xs={12} sm={12} style={{ paddingTop: 12 }}>
                    <span>Заказов: </span>
                    <span>{this.state.user_info?.all_count_order} / {this.state.user_info?.summ} р.</span>
                  </Grid>
                  <Grid item xs={12} sm={12} style={{ paddingTop: 12 }}>
                    <span>Доставок: </span>
                    <span>{this.state.user_info?.count_dev} / {this.state.user_info?.summ_dev} р.</span>
                  </Grid>
                  <Grid item xs={12} sm={12} style={{ paddingTop: 12 }}>
                    <span>Самовывозов: </span>
                    <span>{this.state.user_info?.count_pic} / {this.state.user_info?.summ_pic} р.</span>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Accordion style={{ width: '100%' }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography>Заказы</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ maxHeight: 300, overflow: 'scroll' }}>
                    <Table>
                      <TableBody>
                        { this.state.user_orders.map( (item, key) =>
                          <TableRow key={key}>
                            <TableCell>{item.point}</TableCell>
                            <TableCell>{item.new_type_order}</TableCell>
                            <TableCell>{item.date_time}</TableCell>
                            <TableCell>{item.order_id}</TableCell>
                            <TableCell>{item.summ}</TableCell>
                          </TableRow>
                        ) }
                      </TableBody>
                    </Table>
                  </AccordionDetails>
                </Accordion>
              </Grid>

              <Grid item xs={12} sm={12}>
                { this.state.comments.map( (item, key) => 
                  <Paper key={key} style={{ padding: 15, marginBottom: 15 }} elevation={3}>
                    <span dangerouslySetInnerHTML={{__html: item.comment}} />
                    <div style={{ textAlign: 'end' }}>
                      <span style={{ marginRight: 20 }}>{item.date_add}</span>
                      <span>{item.name}</span>
                    </div>
                  </Paper>
                  
                ) }
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextEditor22 id="EditorNew" value={''} refs_={this.myRef} />
              </Grid>
              
            </Grid>

          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.saveComment.bind(this)}>Добавить новый комментарий</Button>
          </DialogActions>
        </Dialog>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyAutocomplite
              label="Точки"
              multiple={true}
              data={this.state.points}
              value={this.state.point}
              func={this.changePoint.bind(this)}
            />
          
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyDatePickerNew label={'Дата от'} value={this.state.date_start} func={ this.changeDate.bind(this, 'date_start') } />
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyDatePickerNew label={'Дата до'} value={this.state.date_end} func={ this.changeDate.bind(this, 'date_end') } />
          </Grid>


          <Grid item xs={12} sm={3}>
            <Button variant="contained" color="primary" onClick={ this.show.bind(this) }>Показать</Button>
          </Grid>
          
          <Grid item xs={12}>
            <h2 style={{ textAlign: 'center' }}>Новые клиенты по дням</h2>
            <div id="chartordersD" style={{ width: "100%", height: "500px" }} />
          </Grid>

          <Grid item xs={12}>
            {this.state.svod.map( (item, key) =>
              <Accordion style={{ width: '100%' }} key={key}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>{item.date} ({item.count})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List style={{ width: '100%' }}>
                    { item.users.map( (it, k) =>
                      <ListItem button key={k} onClick={ this.get_user_info.bind(this, it.number) } style={{ backgroundColor: parseInt(it.count) == 1 ? '#ffba00' : '#90ee90' }}>
                        <ListItemText primary={ it.number + ' / заказов - ' + it.count } />
                      </ListItem>
                    ) }
                  </List>
                </AccordionDetails>
              </Accordion>
            )}
            
          </Grid>
        
        </Grid>
      </>
    )
  }
}

export function NewSiteUsers() {
  return (
    <CatWork_ />
  );
}