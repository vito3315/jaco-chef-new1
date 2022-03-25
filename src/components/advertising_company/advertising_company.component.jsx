import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { MyTextInput, TextEditor } from '../../stores/elements';

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

class AdvertisingCompany_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'advertising_company',
      module_name: '',
      is_load: false,
      
      cats: [],
      modalDialog: false,
      modalDialogNew: false,

      nameCat: '',
      editText: '',

      nameCatNew: '',
      editTextNew: '',

      config: {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
      },

      showCat: null
    };
  }
  
  async componentDidMount(){
    let data = await this.getData('get_all');
    
    this.setState({
      module_name: data.module_info.name,
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
      text: document.getElementById('EditorEdit').value
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

      document.getElementById('EditorEdit').value = '';

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

  render(){
    return (
      <>
        <Backdrop className={this.state.classes.backdrop} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        { !this.state.showCat ? null :
          <Dialog
            open={this.state.modalDialog}
            onClose={ () => { this.setState({ modalDialog: false, showCat: null, editText: '', nameCat: '' }) } }
          >
            <DialogTitle>Категория уборки "{this.state.showCat.name}"</DialogTitle>
            <DialogContent style={{ paddingTop: 10 }}>
              
              <Grid container spacing={3}>
                
                <Grid item xs={12} sm={12}>
                  <MyTextInput classes={this.state.classes} value={ this.state.nameCat } func={ (event) => { this.setState({ nameCat: event.target.value }) } } label='Название категории' />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextEditor id="EditorEdit" text={this.state.showCat.text} />
                </Grid>
                
              </Grid>

            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.save.bind(this)}>Сохранить</Button>
            </DialogActions>
          </Dialog>
        }

        <Dialog
          open={this.state.modalDialogNew}
          onClose={ () => { this.setState({ modalDialogNew: false, editTextNew: '', nameCatNew: '' }) } }
        >
          <DialogTitle>Новая категория уборки</DialogTitle>
          <DialogContent style={{ paddingTop: 10 }}>
            
            <Grid container spacing={3}>
              
              <Grid item xs={12} sm={12}>
                <MyTextInput classes={this.state.classes} value={ this.state.nameCatNew } func={ (event) => { this.setState({ nameCatNew: event.target.value }) } } label='Название категории' />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextEditor id="EditorNew" text={''} />
              </Grid>
              
            </Grid>

          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.saveNew.bind(this)}>Сохранить</Button>
          </DialogActions>
        </Dialog>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button variant="contained" color="primary" onClick={ () => { this.setState({ modalDialogNew: true }) } }>Добавить категорию</Button>
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <List style={{ width: '100%' }}>
              { this.state.cats.map( (item, key) =>
                <ListItem button key={key} onClick={ this.openCat.bind(this, item) }>
                  <ListItemText primary={ item.name } />
                </ListItem>
              ) }
            </List>
          </Grid>
        
        </Grid>
      </>
    )
  }
}

export function AdvertisingCompany () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <AdvertisingCompany_ classes={classes} history={history} />
  );
}