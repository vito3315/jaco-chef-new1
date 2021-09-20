import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CloseIcon from '@material-ui/icons/Close';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { MySelect, MyCheckBox, MyTimePicker, MyDatePicker, MyAutocomplite, MyDaterange } from '../../stores/elements';
import { Typography } from '@material-ui/core';

const queryString = require('query-string');

const useStyles = makeStyles((theme) => ({
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
}));

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

class RasByBill_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'ras_by_bill',
      module_name: '',
      is_load: false,
      
      modalDialog: false,
      
      points: [],
      point: [],
      date_start: formatDate(new Date()),
      date_end: formatDate(new Date()),
      rangeDate: [formatDate(new Date()), formatDate(new Date())],
      items: [],
      cats: [],
      
      myItems: [],
      
      calendar: []
    };
  }
  
  async componentDidMount(){
    let data = await this.getData('get_all');
    
    this.setState({
      module_name: data.module_info.name,
      points: data.points,
      
      items: data.items,
      cats: data.cats
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
    });
  }
   
  changePoint(event){
    let data = event.target.value;
    
    this.setState({
      point: data
    })
  }
  
  changeTimeStart(event){
    this.setState({
      date_start: formatDate(event)
    })
  }
  
  changeTimeEnd(event){
    this.setState({
      date_end: formatDate(event)
    })
  }
  
  changeItems(event, data){
    this.setState({
      myItems: data
    })
  }
  
  async getItems(){
    let data = {
      points: this.state.point,
      items: this.state.myItems,
      start_date: this.state.rangeDate[0],
      end_date: this.state.rangeDate[1],
    };
    
    console.log( data )
    
    let res = await this.getData('get_this_rev', data);
    
    console.log( res )
    
    this.setState({
      resItems: {
        items_ras: res.items_ras,
        pf_ras: res.pf_ras,
        rec_ras: res.rec_ras
      }
    })
  }
  
  async getCats(){
    
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
        
        <Dialog
          open={this.state.modalDialog}
          onClose={ () => { this.setState({ modalDialog: false }) } }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">  </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              
              
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => {} } color="primary">Сохранить</Button>
          </DialogActions>
        </Dialog>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <MySelect classes={this.state.classes} data={this.state.points} multiple={true} value={this.state.point} func={ this.changePoint.bind(this) } label='Точка' />
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <MyDaterange startText="Дата от" endText="Дата до" value={this.state.rangeDate} func={ this.changeDateRange.bind(this) } />
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <MyAutocomplite classes={this.state.classes} data={this.state.items} multiple={true} value={this.state.myItems} func={ this.changeItems.bind(this) } label='Заготовки' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" onClick={this.getItems.bind(this)}>Показать заготовки</Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" onClick={this.getCats.bind(this)}>Показать категории</Button>
          </Grid>
        
        
          { this.state.resItems && this.state.resItems.items_ras ?
              
              <>
                <Grid item xs={12}>
                  
                  <h1>Куплено по наклданым</h1>
                  <TableContainer component={Paper}>
                    <Table aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Наименование товара</TableCell>
                          <TableCell>Объем товра</TableCell>
                          <TableCell>Объем заготовки</TableCell>
                          <TableCell>Сумма</TableCell>
                          <TableCell>Кол-во наклданых</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        
                        { this.state.resItems.items_ras.map( (item, key) =>
                          <TableRow key={key}>
                            <TableCell> { item.name } </TableCell>
                            <TableCell> { item.count_item + ' ' + item.ei_name } </TableCell>
                            <TableCell> { item.count_pf + ' ' + item.ei_name_pf } </TableCell>
                            <TableCell> { item.sum } </TableCell>
                            <TableCell> { item.count_bill } </TableCell>
                          </TableRow>
                        ) }
                        
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                
                <Grid item xs={12}>
                  
                  <h1>Расход заготовок (включая рецепты)</h1>
                  <TableContainer component={Paper}>
                    <Table aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Наименование заготовки</TableCell>
                          <TableCell>Объем заготовок</TableCell>
                          <TableCell>Кол-во роллов</TableCell>
                          <TableCell>Сумма роллов (примерно)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        
                        { this.state.resItems.pf_ras.map( (item, key) =>
                          <TableRow key={key}>
                            <TableCell> { item.pf_name } </TableCell>
                            <TableCell> { item.count_pf + ' ' + item.ei_name } </TableCell>
                            <TableCell> { item.count_rolls } </TableCell>
                            <TableCell> { item.price_rolls } </TableCell>
                          </TableRow>
                        ) }
                        
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                
                <Grid item xs={12}>
                  
                  <h1>Расход рецептов</h1>
                  <TableContainer component={Paper}>
                    <Table aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Наименование заготовки</TableCell>
                          <TableCell>Объем заготовок</TableCell>
                          <TableCell>Кол-во роллов</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        
                        { this.state.resItems.rec_ras.map( (item, key) =>
                          <TableRow key={key}>
                            <TableCell> { item.pf_name } </TableCell>
                            <TableCell> { item.count_pf + ' ' + item.ei_name } </TableCell>
                            <TableCell> { item.count_rolls } </TableCell>
                          </TableRow>
                        ) }
                        
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </>
                :
              null              
            }
          
          
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

export function RasByBill () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <RasByBill_ classes={classes} history={history} />
  );
}