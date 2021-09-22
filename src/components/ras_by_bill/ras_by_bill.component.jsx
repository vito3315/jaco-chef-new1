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

import CloseIcon from '@material-ui/icons/Close';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
      items_cat: [],
      item_cat: 0,
      
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
      cats: data.cats,
      items_cat: data.items_cat
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
   
  changePoint(event){
    let data = event.target.value;
    
    this.setState({
      point: data
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
      item_cat: this.state.item_cat,
      start_date: this.state.rangeDate[0],
      end_date: this.state.rangeDate[1],
    };
    
    let res = await this.getData('get_this_rev', data);
    
    this.setState({
      resItems: {
        items_ras: res.items_ras,
        pf_ras: res.pf_ras,
        rec_ras: res.rec_ras
      },
      catItems: null
    })
  }
  
  async getCats(){
    let data = {
      points: this.state.point,
      items: this.state.myItems,
      start_date: this.state.rangeDate[0],
      end_date: this.state.rangeDate[1],
    };
    
    let res = await this.getData('get_this_rev_cat', data);
    
    
    let summ = 0;
    
    res.rec_ras.map( (item, key) => {
      summ += parseFloat(item.this_price);
    } )
    
    console.log( summ )
    
    this.setState({
      catItems: {
        count_pos: res.count_pos,
        items_ras: res.items_ras,
        rec_ras: res.rec_ras,
        full_sum: summ
      },
      resItems: null
    })
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
          
          <Grid item xs={12} sm={4}>
            <MySelect classes={this.state.classes} data={this.state.items_cat} multiple={false} value={this.state.item_cat} func={ (event) => {this.setState({ item_cat: event.target.value })} } label='Категория товара' />
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
          
          { this.state.catItems && this.state.catItems.rec_ras ?
            <Grid item xs={12}>
              
              <Accordion disabled>
                <AccordionSummary>
                  <Typography style={{ width: '50%' }}>Роллов: {this.state.catItems.count_pos.count_rolls}</Typography>
                  <Typography style={{ width: '50%' }}>Пиццы: {this.state.catItems.count_pos.count_pizza}</Typography>
                </AccordionSummary>
              </Accordion>
              
              { this.state.catItems.rec_ras.map( (item, key) =>
                <Accordion key={key}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                  >
                    <Typography style={{ width: '60%' }}>{item.name}</Typography>
                    <Typography style={{ width: '20%' }}>{item.this_price}</Typography>
                    <Typography style={{ width: '20%' }}>{item.price_by_items}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    
                    { item.parent_cat.map( (it, k) =>
                      <Accordion key={k}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                        >
                          <Typography style={{ width: '60%', paddingLeft: 20 }}>{it.name}</Typography>
                          <Typography style={{ width: '20%', paddingLeft: 20 }}>{it.this_price}</Typography>
                          <Typography style={{ width: '20%', paddingLeft: 20 }}>{it.price_by_items}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          
                          <Accordion disabled={true}>
                            <AccordionSummary>
                              <Typography style={{ width: '20%', paddingLeft: 40 }}>Товар</Typography>
                              <Typography style={{ width: '20%', paddingLeft: 40 }}>Товара</Typography>
                              <Typography style={{ width: '20%', paddingLeft: 40 }}>Заготовок</Typography>
                              <Typography style={{ width: '20%', paddingLeft: 40 }}>Накладных</Typography>
                              <Typography style={{ width: '20%', paddingLeft: 40 }}>Сумма</Typography>
                            </AccordionSummary>
                          </Accordion>
                          
                          { it.items.map( (parent_items, parent_key) =>
                            <Accordion key={parent_key} disabled={true}>
                              <AccordionSummary>
                                <Typography style={{ width: '20%', paddingLeft: 40 }}>{parent_items.name}</Typography>
                                <Typography style={{ width: '20%', paddingLeft: 40 }}>{parent_items.count_item} {parent_items.ei_name}</Typography>
                                <Typography style={{ width: '20%', paddingLeft: 40 }}>{parent_items.count_pf} {parent_items.ei_name}</Typography>
                                <Typography style={{ width: '20%', paddingLeft: 40 }}>{parent_items.count_bill}</Typography>
                                <Typography style={{ width: '20%', paddingLeft: 40 }}>{parent_items.sum}</Typography>
                              </AccordionSummary>
                            </Accordion>
                          ) }
                          
                        </AccordionDetails>
                      </Accordion>
                    ) }
                    
                    
                  </AccordionDetails>
                </Accordion>
              ) }
              
              <Accordion disabled>
                <AccordionSummary>
                  <Typography style={{ width: '60%', marginRight: -15 }}>Всего:</Typography>
                  <Typography style={{ width: '40%' }}>{ this.state.catItems.full_sum }</Typography>
                </AccordionSummary>
              </Accordion>
              
            </Grid>
              :
            null              
          }
          
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