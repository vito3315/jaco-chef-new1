import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinkIcon from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const queryString = require('query-string');

const useStyles = makeStyles((theme) => ({
  formControl: {
    //margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

class MySelect extends React.PureComponent {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
    };
  }
  
  render(){
    return (
      <FormControl size="small" variant="outlined" className={this.state.classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{this.props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.props.value}
          onChange={ this.props.func }
          label={this.props.label}
          size="small"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          { this.props.data.map( (item, key) =>
            <MenuItem key={key} value={item.id}>{item.name}</MenuItem>
          ) }
        </Select>
      </FormControl>
    )
  }
}

class MyCheckBox extends React.PureComponent {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
    };
  }
  
  render(){
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.props.value}
              onChange={this.props.func}
              color="primary"
            />
          }
          label={this.props.label}
        />
      </FormGroup>
    )
  }
}

class Live_Orders extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      module: 'live_orders',
      module_name: '',
      is_load: false,
      
      points: [],
      point: '0',
      showReady: false,
      read: [],
      onstol: [],
      ordersQueue: []
    };
  }
  
  async componentDidMount(){
    
    let data = await this.getData('get_all');
    
    this.setState({
      points: data.point_list,
      point: data.point_list[0].id,
      module_name: data.module_info.name
    })
    
    document.title = data.module_info.name;
    
    setTimeout( () => {
      this.updateData();
    }, 100 )
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
        login: '+79879340391',
        //login: localStorage.getItem('login'),
        data: JSON.stringify( data )
      })
    }).then(res => res.json()).then(json => {
      
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
  
  changeCheckOrders(event){
    let data = event.target.checked;
    
    this.setState({
      showReady: data
    })
  }
  
  async updateData(){
    let data = {
      point_id: this.state.point,
      showReady: this.state.showReady === true ? 1 : 0
    };
    
    let res = await this.getData('get_orders', data);
    
    this.setState({
      read: res.read,
      onstol: res.onstol,
      ordersQueue: res.prestol_new
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
          { this.state.points.length > 0 ?
            <>
              <Grid item xs={6} sm={6}>
                <MySelect classes={this.state.classes} data={this.state.points} value={this.state.point} func={ this.changePoint.bind(this) } label='Точка' />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Button variant="contained" onClick={this.updateData.bind(this)}>Обновить данные</Button>
              </Grid>
              <Grid item xs={12} sm={12}>
                <MyCheckBox classes={this.state.classes} value={this.state.showReady} func={ this.changeCheckOrders.bind(this) } label='Показывать готовые' />
              </Grid>
            </>
              :
            null
          }
          
          
          
          <Grid item xs={12} sm={12}>
            
            <TableContainer component={Paper}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Тип</TableCell>
                    <TableCell>Время заказа</TableCell>
                    <TableCell>Время предзакза</TableCell>
                    
                    <TableCell>Время выхода на стол</TableCell>
                    <TableCell>Во сколько собрали</TableCell>
                    <TableCell>Закрыли</TableCell>
                    
                    <TableCell>Приготовили</TableCell>
                    <TableCell>Отдали</TableCell>
                    <TableCell>Обещали</TableCell>
                    
                    <TableCell>Статус</TableCell>
                    <TableCell>Стол</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                  {this.state.read.map( (item, key) => (
                    <TableRow key={key}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.type_order}</TableCell>
                      <TableCell>{ parseInt(item.preorder) == 1 ? '' : item.date_time_order }</TableCell>
                      <TableCell>{ parseInt(item.preorder) == 1 ? item.date_time_preorder_ : '' }</TableCell>
                      
                      <TableCell>{item.unix_start_stol_or}</TableCell>
                      <TableCell>{item.give_data_time_}</TableCell>
                      <TableCell>{item.close_date_time_order}</TableCell>
                      
                      <TableCell style = {{backgroundColor: parseInt(item.type_) == 1 ? '' : item.color}}>{item.time_}</TableCell>
                      <TableCell style = {{backgroundColor: parseInt(item.type_) != 1 ? '' : item.color}}>{item.test_time}</TableCell>
                      <TableCell>{ parseInt(item.preorder) == 0 ? item.unix_time_to_client : '' }</TableCell>
                      
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.stol_sborki}</TableCell>
                    </TableRow>
                  ))}
                  
                  {this.state.onstol.map( (item, key) => (
                    <TableRow key={key} style = {{backgroundColor: 'yellow'}}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.type_order}</TableCell>
                      <TableCell>{ parseInt(item.preorder) == 1 ? '' : item.date_time_order }</TableCell>
                      <TableCell>{ parseInt(item.preorder) == 1 ? item.date_time_preorder_ : '' }</TableCell>
                      
                      <TableCell>{item.unix_start_stol_or}</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>{ parseInt(item.preorder) == 0 ? item.unix_time_to_client : '' }</TableCell>
                      
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.stol_sborki}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            <TableContainer component={Paper}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Пред</TableCell>
                    <TableCell>Время оформления</TableCell>
                    <TableCell>Время выхода на стол</TableCell>
                    <TableCell>Время закрытия</TableCell>
                    <TableCell>Обещали</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                  {this.state.ordersQueue.map( (item, key) => (
                    <TableRow key={key}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{ parseInt(item.is_preorder) == 1 ? item.date_time_preorder : '' }</TableCell>
                      <TableCell>{ parseInt(item.is_preorder) == 0 ? item.date_time_order : '' }</TableCell>
                      
                      <TableCell>{item.time_start_order}</TableCell>
                      <TableCell>{item.time_end_order}</TableCell>
                      
                      <TableCell>{ parseInt(item.is_preorder) == 0 ? item.unix_time_to_client : '' }</TableCell>
                    </TableRow>
                  ))}
                  
                </TableBody>
              </Table>
            </TableContainer>
            
          </Grid>
        </Grid>
      </>
    )
  }
}

export function LiveOrders () {
  const classes = useStyles();
  
  return (
    <Live_Orders classes={classes} />
  );
}