import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CloseIcon from '@mui/icons-material/Close';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MySelect, MyCheckBox, MyTimePicker } from '../../stores/elements';
import Typography from '@mui/material/Typography';

const queryString = require('query-string');

const theme = createTheme({
  palette: {
    primary: {
      main: '#c03',
    }
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

class Events_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'events',
      module_name: '',
      is_load: false,
      
      points: [],
      point: '0',
      mounth: '0',
      mounths: [],
      years: [],
      year: '0',
      
      calendar: [],
      modalDialog: false,
      
      chooseDayHoly: '',
      events: [],
      chooseEvent: 0,
      
      eventPoint1: 0,
      everyYear1: false,
      timeStart2: '10:00',
      timeEnd2: '21:30',
      
      expanded: '',
      dayEvents: [],
      events_hist: []
    };
  }
  
  async componentDidMount(){
    
    let data = await this.getData('get_all');
    
    console.log( data )
    
    this.setState({
      points: data.points,
      point: data.points[0].id,
      module_name: data.module_info.name,
      mounths: data.mounth,
      mounth: data.this_m,
      years: data.years,
      year: data.this_y,
    })
    
    document.title = data.module_info.name;
    
    setTimeout( () => {
      this.updateData();
    }, 50 )
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
    });
  }
   
  changePoint(event){
    let data = event.target.value;
    
    this.setState({
      point: data
    })
    
    setTimeout( () => {
      this.updateData();
    }, 50 )
  }
  
  changeMounth(event){
    let data = event.target.value;
    
    this.setState({
      mounth: data
    })
    
    setTimeout( () => {
      //this.updateData();
    }, 50 )
  }
  
  changeYear(event){
    let data = event.target.value;
    
    this.setState({
      year: data
    })
  }
  
  changeCheckOrders(event){
    let data = event.target.checked;
    
    this.setState({
      showReady: data
    })
  }
  
  async updateData(){
    let data = {
      m: this.state.mounth,
      y: this.state.year,
      point_id: this.state.point
    };
    
    let res = await this.getData('get_calendar', data);
    
    console.log( res )
    
    this.setState({
      calendar: res.year,
    })
  }
  
  async chooseDay(day){
    
    if( day.full_day ){
    
      this.setState({
        chooseDay: null,
        eventPoint1: this.state.point,
        chooseEvent: 0,
        everyYear1: false,
        timeStart2: '10:00',
        timeEnd2: '21:30',
        modalDialog: false,
        events_hist: []
      })
      
      let data = {
        date: day.full_day,
        point_id: this.state.point
      };
      
      let res = await this.getData('get_calendar_day', data);
      
      console.log( 'res', res )
      
      this.setState({
        chooseDay: day,
        chooseDayHoly: res.holy,
        events: res.events,
        events_hist: res.hist,
        dayEvents: res.this_events,
        modalDialog: true
      })
    }
  }
  
  changeEvent(event){
    let data = event.target.value;
    
    this.setState({
      chooseEvent: data
    })
  }
  
  changePoint1(event){
    let data = event.target.value;
    
    this.setState({
      eventPoint1: data
    })
  }
  
  changeEveryYear1(event){
    let data = event.target.checked;
    
    this.setState({
      everyYear1: data
    })
  }
  
  changeTimeStart2(event){
    let data = event.target.value;
    
    this.setState({
      timeStart2: data
    })
  }
  
  changeTimeEnd2(event){
    let data = event.target.value;
    
    this.setState({
      timeEnd2: data
    })
  }
  
  async save(){
    let data = {
      date: this.state.chooseDay.full_day,
      point_id: this.state.eventPoint1,
      event: this.state.chooseEvent,
      every_year: this.state.everyYear1 === true ? 1 : 0,
      
      time_start: this.state.timeStart2,
      time_end: this.state.timeEnd2,
    };
    
    let res = await this.getData('save_event', data);
    
    console.log( res )
    
    if( res.st === false ){
      alert(res.text)
    }else{
      this.setState({
        chooseDay: null,
        eventPoint1: this.state.point,
        chooseEvent: 0,
        everyYear1: false,
        timeStart2: '10:00',
        timeEnd2: '21:30',
        modalDialog: false
      })
      
      setTimeout( () => {
        this.updateData();
      }, 300 )
    }
  }
  
  handleChange(data){
    this.setState({
      expanded: data
    })
  }
  
  async delEvent(event){
    console.log( 'delEvent', event )
    
    if (confirm('Удалить событие "'+event.title+' '+event.date+'" ?')) {
      let data = {
        del_id: event.id
      };
      
      let res = await this.getData('del_event', data);
      
      this.setState({
        chooseDay: null,
        eventPoint1: this.state.point,
        chooseEvent: 0,
        everyYear1: false,
        timeStart2: '10:00',
        timeEnd2: '21:30',
        modalDialog: false
      })
      
      setTimeout( () => {
        this.updateData();
      }, 300 )
    } else {
      
    }
    

  }
  
  render(){
    return (
      <>
        <Backdrop className={this.state.classes.backdrop} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Dialog
          open={this.state.modalDialog}
          onClose={ () => { this.setState({ modalDialog: false }) } }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.state.chooseDay ? this.state.chooseDay.full_day : ''}</DialogTitle>
          <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
            <DialogContentText id="alert-dialog-description">
              
              <Grid container spacing={3}>
                
                {this.state.chooseDayHoly.length == 0 ? null :
                  <Grid item xs={12} sm={12}>
                    <Typography component="span">{this.state.chooseDayHoly}</Typography>
                  </Grid>
                }
                
                <Grid item xs={12} sm={12}>
                  <MySelect classes={this.state.classes} data={this.state.events} value={this.state.chooseEvent} func={ this.changeEvent.bind(this) } label='Событие' />
                </Grid>
                
                <Grid item xs={12} sm={12}>
                  <MySelect classes={this.state.classes} data={this.state.points} value={ this.state.eventPoint1 } func={ this.changePoint1.bind(this) } label='Точка' />
                </Grid>
                
                { parseInt(this.state.chooseEvent) !== 2 ? null :
                  <>
                    <Grid item xs={6} sm={6}>
                      <MyTimePicker classes={this.state.classes} value={ this.state.timeStart2 } func={ this.changeTimeStart2.bind(this) } label='Время начала работы' />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <MyTimePicker classes={this.state.classes} value={ this.state.timeEnd2 } func={ this.changeTimeEnd2.bind(this) } label='Время окончания работы' />
                    </Grid>
                  </>
                }
                
                <Grid item xs={12} sm={12}>
                  <MyCheckBox classes={this.state.classes} value={ this.state.everyYear1 } func={ this.changeEveryYear1.bind(this) } label='Каждый год' />
                </Grid>
                
              </Grid>
              
              <List component="nav">
                { this.state.dayEvents.map( (item, key) => 
                  <ListItem key={key}>
                    <ListItemText primary={item.title} />
                    { parseInt(item.type) == 4 ? null :
                      <CloseIcon color="primary" onClick={this.delEvent.bind(this, item)} style={{ cursor: 'pointer' }} />
                    }
                  </ListItem>
                )}
              </List>
              
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>История</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List component="nav">
                    { this.state.events_hist.map( (item, key) => 
                      <ListItem key={key}>
                        <ListItemText primary={item.title} />
                      </ListItem>
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>
              
              
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ this.save.bind(this) } color="primary">Сохранить</Button>
          </DialogActions>
        </Dialog>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <MySelect classes={this.state.classes} data={this.state.points} value={this.state.point} func={ this.changePoint.bind(this) } label='Точка' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MySelect classes={this.state.classes} data={this.state.mounths} value={this.state.mounth} func={ this.changeMounth.bind(this) } label='Месяц' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MySelect classes={this.state.classes} data={this.state.years} value={this.state.year} func={ this.changeYear.bind(this) } label='Год' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" onClick={this.updateData.bind(this)}>Обновить данные</Button>
          </Grid>
        
          
          
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }}>
            
            { this.state.calendar.map( (item, key) =>
            
              <Grid item xs={12} sm={4} key={key} style={{ padding: 20 }}>
                <h1 style={{ textAlign: 'center' }}>{ item[0][0].mounth }</h1>
                <TableContainer component={Paper}>
                  <Table aria-label="a dense table" style={{ overflow: 'hidden' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={this.state.classes.tableCelHead}>Пн</TableCell>
                        <TableCell className={this.state.classes.tableCelHead}>Вт</TableCell>
                        <TableCell className={this.state.classes.tableCelHead}>Ср</TableCell>
                        <TableCell className={this.state.classes.tableCelHead}>Чт</TableCell>
                        <TableCell className={this.state.classes.tableCelHead}>Пт</TableCell>
                        <TableCell className={this.state.classes.tableCelHead}>Сб</TableCell>
                        <TableCell className={this.state.classes.tableCelHead}>Вс</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      
                      { item.map( (mounth, m_key) =>
                        <TableRow key={m_key}>
                          { mounth.map( (day, k) =>
                            <TableCell 
                              key={k} 
                              onClick={ this.chooseDay.bind(this, day) } 
                              
                              style={{ color: day.dir ? 'yellow' : day.holy ? '#c03' : '#000' }}
                              
                              className={ day.event ? this.state.classes.customCel : this.state.classes.tableCel }
                            > { day.day } </TableCell>
                          ) }
                        </TableRow>
                      ) }
                      
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )}
            
          </Grid>
        </Grid>
      </>
    )
  }
}

export function Events () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <Events_ classes={classes} history={history} />
  );
}