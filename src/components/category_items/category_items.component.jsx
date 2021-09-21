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

import TextField from '@mui/material/TextField';

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

class CategoryItems_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'category_items',
      module_name: '',
      is_load: false,
      
      modalDialog: false,
      modalDialog2: false,
      
      newMainCatMy: 0,
      newMainNameMy: '',
      allCats: [],
      allItems: [],
      
      thisValItems: [],
      thisDataItems: [],
      thisCatId: 0,
    };
  }
  
  async componentDidMount(){
    let data = await this.getData('get_all');
    
    this.setState({
      module_name: data.module_info.name,
      allCats: data.cats,
      allItems: data.items,
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
   
  createCat(){
    this.setState({
      modalDialog: true
    })
  }
  
  changeCatMain(event){
    let data = event.target.value;
    
    this.setState({
      newMainCatMy: data
    })
  }
  
  changeNameMain(event){
    let data = event.target.value;
    
    this.setState({
      newMainNameMy: data
    })
  }
  
  async saveCat(){
    let data = {
      name: this.state.newMainNameMy,
      cat_id: this.state.newMainCatMy
    };
    
    let res = await this.getData('save_cat', data);
    
    if( res.st === false ){
      alert(res.text);
      return ;
    }
    
    this.setState({
      allCats: res.cats,
      modalDialog: false
    })
  }
  
  addItems(cat_id){
    
    let myVal = this.state.allItems.filter( (item) => parseInt(item.cat_id) == parseInt(cat_id) );
    let data = this.state.allItems.filter( (item) => parseInt(item.cat_id) == 0 );
    
    this.setState({
      modalDialog2: true,
      thisValItems: myVal,
      thisDataItems: data,
      thisCatId: cat_id
    })
  }
  
  async saveItems(){
    let data = {
      cat_id: this.state.thisCatId,
      items: this.state.thisValItems
    };
    
    let res = await this.getData('save_items_cat', data);
    
    this.setState({
      allCats: res.cats,
      allItems: res.items,
      modalDialog2: false,
      
      thisValItems: [],
      thisDataItems: [],
      thisCatId: 0
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
          <DialogTitle id="alert-dialog-title">Новая категория</DialogTitle>
          <DialogContent>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MySelect classes={this.state.classes} label="Главная категория" data={this.state.allCats} value={this.state.newMainCatMy} func={ this.changeCatMain.bind(this) } />
              </Grid>  
              <Grid item xs={12} sm={12}>
                <TextField label="Название категории" size="small" variant="outlined" style={{ width: '100%' }} color="primary" value={this.state.newMainNameMy} onChange={this.changeNameMain.bind(this)} />
              </Grid>
            </Grid>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={ this.saveCat.bind(this) } color="primary">Сохранить</Button>
          </DialogActions>
        </Dialog>
        
        <Dialog
          open={this.state.modalDialog2}
          onClose={ () => { this.setState({ modalDialog2: false }) } }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>Позиции категории</DialogTitle>
          <DialogContent>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MyAutocomplite 
                  label="Выбранные позиции" 
                  func={ (event, val) => { this.setState({ thisValItems: val }) } }
                  data={ this.state.thisDataItems } 
                  value={ this.state.thisValItems } />
              </Grid>
            </Grid>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={ this.saveItems.bind(this) } color="primary">Сохранить</Button>
          </DialogActions>
        </Dialog>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <Button onClick={this.createCat.bind(this)}>Создать категорию</Button>
          </Grid>
          
          <Grid item xs={12} sm={12}>
            { this.state.allCats.map( (main_cat, main_key) =>
              parseInt(main_cat.parent_id) != -1 ? null :
                <Accordion key={main_key}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                  >
                    <Typography>{main_cat.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    
                  { this.state.allCats.map( (parent_cat, parent_key) =>
                    parseInt(main_cat.id) != parseInt(parent_cat.parent_id) ? null :
                      <Accordion key={parent_key}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                        >
                          <Typography>{parent_cat.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          
                          { this.state.allItems.filter( (item) => parseInt(item.cat_id) == parseInt(parent_cat.id) ).map( (item, key) =>
                            <Accordion key={parent_key}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                              >
                                <Typography>{item.name}</Typography>
                              </AccordionSummary>
                            </Accordion>
                          ) }
                            
                          <Button onClick={this.addItems.bind(this, parseInt(parent_cat.id))}>Добавить</Button>
                            
                        </AccordionDetails>
                      </Accordion>
                  )}
                    
                  </AccordionDetails>
                </Accordion>
            ) }
          </Grid>
          
          
        
          
        </Grid>
      </>
    )
  }
}

export function CategoryItems () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <CategoryItems_ classes={classes} history={history} />
  );
}