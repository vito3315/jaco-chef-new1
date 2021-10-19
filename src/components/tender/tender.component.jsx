import React from 'react';
import { useHistory } from "react-router-dom";

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MyAutocomplite } from '../../stores/elements';

import {AgGridColumn, AgGridReact} from 'ag-grid-react';

const queryString = require('query-string');

const dynamicCellStyle = params => {
  if( params.colDef.headerName == 'Цена' ){
    return { borderRight: '1px solid #bababa' };
  }
  return null;
};

class Tender_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'tender',
      module_name: '',
      is_load: false,
      
      modalDialog: false,
      
      testTable: [],
      vendors: [],
      myVendors: [],
      showVendors: [],
      
      params_api: null,
      params_columnApi: null
    };
  }
  
  async componentDidMount(){
    let data = await this.getData('get_all');
    
    let table = [];
    
    data.items.map( (main_cat, k1) => {
      
      table.push({
        section: 'big-title',
        item: main_cat.name
      })
      
      main_cat.cats.map( (cat, k2) => {
        table.push({
          section: 'big-title',
          item: cat.name
        })
        
        cat.items.map( (item, k3) => {
          let tableItem = {};
          
          data['vendors'].map( (it, k4) => {
            
            let item_price = data.vendor_price.find( (item_price) => parseInt(item_price.vendor_id) == parseInt(it['id']) && parseInt(item_price.item_id) == parseInt(item['id']) );
            
            
            if( item_price ){
              tableItem[ 'vend_price_'+it['id'] ] = item_price['price'];  
              tableItem[ 'vend_city_'+it['id'] ] = 'тлт';
            }else{
              tableItem[ 'vend_price_'+it['id'] ] = '';  
              tableItem[ 'vend_city_'+it['id'] ] = '';
            }
            
          } )
          tableItem.item = item.name;
          tableItem.section = 'last';
          
          let item_ras = data.ras.find( (item_ras) => parseInt(item_ras.item_id) == parseInt(item['id']) );
          
          if( item_ras ){
            tableItem.ras = item_ras.count_pf;
          }else{
            tableItem.ras = '';
          }
          
          table.push(tableItem)
        } )
      } )
    } )
    
    
    
    
    
    
    this.setState({
      module_name: data.module_info.name,
      testTable: table,
      vendors: data['vendors'],
      showVendors: data['vendors']
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
  
  onCellClicked(event){
    console.log( event.data );
    console.log( event.colDef.field );
  }
  
  onGridReady(params){
    this.setState({
      params_api: params.api,
      params_columnApi: params.columnApi
    });
  }
  
  async show(){
    let data = {
      vendors: this.state.myVendors
    };
    
    let res = await this.getData('get_data', data);
    
    let table = [];
    
    res.items.map( (main_cat, k1) => {
      
      table.push({
        section: 'big-title',
        item: main_cat.name
      })
      
      main_cat.cats.map( (cat, k2) => {
        table.push({
          section: 'big-title',
          item: cat.name
        })
        
        cat.items.map( (item, k3) => {
          let tableItem = {};
          
          res['vendors'].map( (it, k4) => {
            
            let item_price = res.vendor_price.find( (item_price) => parseInt(item_price.vendor_id) == parseInt(it['id']) && parseInt(item_price.item_id) == parseInt(item['id']) )
            
            if( item_price ){
              tableItem[ 'vend_price_'+it['id'] ] = item_price['price'];  
              tableItem[ 'vend_city_'+it['id'] ] = 'тлт';
            }else{
              tableItem[ 'vend_price_'+it['id'] ] = '';  
              tableItem[ 'vend_city_'+it['id'] ] = '';
            }
            
          } )
          tableItem.item = item.name;
          tableItem.section = 'last';
          
          let item_ras = res.ras.find( (item_ras) => parseInt(item_ras.item_id) == parseInt(item['id']) );
          
          if( item_ras ){
            tableItem.ras = item_ras.count_pf;
          }else{
            tableItem.ras = '';
          }
          
          table.push(tableItem)
        } )
      } )
    } )
    
    
    
    
    
    
    this.setState({
      testTable: table,
      showVendors: res['vendors']
    })
  }
  
  render(){
    return (
      <>
        <Backdrop open={this.state.is_load}>
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
            
            
            
          </DialogContent>
          <DialogActions>
            <Button  color="primary">Сохранить</Button>
          </DialogActions>
        </Dialog>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <MyAutocomplite data={this.state.vendors} multiple={true} value={this.state.myVendors} func={ (event, val) => { this.setState({ myVendors: val }) } } label='Поставщики' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" onClick={this.show.bind(this)}>Показать</Button>
          </Grid>
          
          <Grid item xs={12}>
            <div className="ag-theme-alpine" style={{height: 600, width: '100%'}}>
              <AgGridReact
                  onGridReady={this.onGridReady.bind(this)}
                  onCellClicked={this.onCellClicked}
                  rowData={ this.state.testTable }
                  
                  >
                  <AgGridColumn field="ras" width={120} pinned="left"></AgGridColumn>
                  <AgGridColumn field="item" width={300} pinned="left" cellClassRules={{'cell-span': "data.section==='big-title'"}}></AgGridColumn>
                  <AgGridColumn hide={true}></AgGridColumn>
                    
                  { this.state.showVendors.map( (item, key) => 
                    <AgGridColumn key={key} headerName={item.name} resizable={true} width={180}>
                      <AgGridColumn field={'vend_city_'+item.id} headerName={'Город'} resizable={true} width={90}></AgGridColumn>
                      <AgGridColumn field={'vend_price_'+item.id} headerName={'Цена'} resizable={true} width={90} cellStyle={dynamicCellStyle}></AgGridColumn>
                    </AgGridColumn>
                  ) }
                  
                  
              </AgGridReact>
            </div>
          </Grid>
          
          <Grid item xs={12} sm={12}>
          
          </Grid>    
        </Grid>
      </>
    )
  }
}

export function Tender () {
  let history = useHistory();
  
  return (
    <Tender_ history={history} />
  );
}