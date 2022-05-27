import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import MenuIcon from '@mui/icons-material/Menu';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MySelect, MyAutocomplite } from '../../stores/elements';
import Typography from '@mui/material/Typography';

const queryString = require('query-string');

export class CategoryItems extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      module: 'category_items',
      module_name: '',
      is_load: false,
      
      modalDialog: false,
      modalDialog2: false,
      modalDialog3: false,
      
      newMainCatMy: 0,
      editMainCatMy: 0,
      newMainNameMy: '',
      editMainNameMy: '',
      
      editCat: null,
      
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
   
  createCat(){
    this.setState({
      modalDialog: true,
      newMainCatMy: 0,
      newMainNameMy: ''
    })
  }
  
  changeCatMain(event){
    let data = event.target.value;
    
    this.setState({
      newMainCatMy: data
    })
  }
  
  changeCatMainEdit(event){
    let data = event.target.value;
    
    this.setState({
      editMainCatMy: data
    })
  }
  
  changeNameMain(event){
    let data = event.target.value;
    
    this.setState({
      newMainNameMy: data
    })
  }
  
  changeNameMainEdit(event){
    let data = event.target.value;
    
    this.setState({
      editMainNameMy: data
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
  
  editCat(cat){
    this.setState({
      modalDialog3: true,
      editMainCatMy: cat.parent_id,
      editMainNameMy: cat.name,
      editCat: cat
    })
  }
  
  async saveEditCat(){
    let data = {
      name: this.state.editMainNameMy,
      cat_id: this.state.editMainCatMy,
      id: this.state.editCat.id
    };
    
    let res = await this.getData('edit_cat', data);
    
    if( res.st === false ){
      alert(res.text);
      return ;
    }
    
    this.setState({
      allCats: res.cats,
      modalDialog: false
    })
  }
  
  render(){
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Dialog
          open={this.state.modalDialog}
          onClose={ () => { this.setState({ modalDialog: false }) } }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Новая категория</DialogTitle>
          <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MySelect 
                  label="Главная категория" 
                  data={ this.state.allCats.filter( (item) => parseInt(item.parent_id) == -1 || !item.parent_id ) }
                  value={this.state.newMainCatMy} 
                  func={ this.changeCatMain.bind(this) } />
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
          <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MyAutocomplite 
                  label="Выбранные позиции" 
                  multiple={true}
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
        
        <Dialog
          open={this.state.modalDialog3}
          onClose={ () => { this.setState({ modalDialog3: false }) } }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Редактирование категории</DialogTitle>
          <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MySelect 
                  label="Главная категория" 
                  data={ this.state.allCats.filter( (item) => parseInt(item.parent_id) == -1 || !item.parent_id ) } 
                  value={this.state.editMainCatMy} 
                  func={ this.changeCatMainEdit.bind(this) } 
                />
              </Grid>  
              <Grid item xs={12} sm={12}>
                <TextField 
                  label="Название категории" 
                  size="small" 
                  variant="outlined" 
                  style={{ width: '100%' }} 
                  color="primary" 
                  value={this.state.editMainNameMy} 
                  onChange={ this.changeNameMainEdit.bind(this) }
                />
              </Grid>
            </Grid>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={ this.saveEditCat.bind(this) } color="primary">Сохранить</Button>
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
                    <MenuIcon style={{ marginRight: 10 }} onClick={ this.editCat.bind(this, main_cat) } />
                    <Typography>{main_cat.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    
                  { this.state.allCats.map( (parent_cat, parent_key) =>
                    parseInt(main_cat.id) != parseInt(parent_cat.parent_id) ? null :
                      <Accordion key={main_key+'_'+parent_key}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                        >
                          <MenuIcon style={{ marginRight: 10 }} onClick={ this.editCat.bind(this, parent_cat) } />
                          <Typography>{parent_cat.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          
                          { this.state.allItems.filter( (item) => parseInt(item.cat_id) == parseInt(parent_cat.id) ).map( (item, key) =>
                            <Accordion key={main_key+'_'+parent_key+'_'+key}>
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