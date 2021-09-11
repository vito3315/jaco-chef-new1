import * as React from "react"
import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

import {Helmet} from "react-helmet";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import itemsStore from '../../stores/items-store';
import config from '../../stores/config';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Dialog from '@material-ui/core/Dialog';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';


import FormControlLabel from '@material-ui/core/FormControlLabel';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

//import 'date-fns';
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from '@date-io/date-fns';
//import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const queryString = require('query-string');

import { Header } from '../header';

const useStyles = makeStyles((theme) => ({
  root2: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    '& > svg, form': {
      borderRight: '0px!important'
    }
  },
  root3: {
    '& > *': {
      margin: theme.spacing(1),
      width: 50,
    },
    '& .MuiOutlinedInput-input': {
      padding: '5px 10px'
    }
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    flexGrow: 1,
    //margin: -8
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperCat: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
    justifyContent: 'space-between',
    height: 'calc(100% - 15px)',
    cursor: 'pointer'
  },
  paperCatInfo: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  
  size1: {
    fontSize: '0.8rem'
  },
  scrollTable: {
    maxHeight: 250,
    overflow: 'auto',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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

class OrdersStat extends React.Component {
  interval = null;
  
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      cityList: [],
      spiner: false,
      
      selectedCity: 1,
      selectedDate: formatDate(new Date()),
      
      points: [],
      point: null,
      
      activeCat: 0,
      
      orders: [],
      orderCheck: false,
      
      showOrder: null,
      openDialog: false,
      
      delOrder: false,
      radiogroup_options: [
        {id: '0', label: 'Решили отредактировать заказ', value: 0 },
        {id: '1', label: 'Не устраивает время ожидания', value: 0 },
        {id: '2', label: 'Изменились планы', value: 0 },
        {id: '3', label: 'Недостаточно средств', value: 0 },
        {id: '4', label: 'Другое', value: 0 },
      ],
      textDel: '',
      typeDel: -1,
      
      number: ''
    };
  }
    
  componentWillUnmount(){
    clearInterval(this.interval)
  }
  
  checkLogin(){
    fetch(config.urlApi, {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify({
        type: 'check_login_center', 
        token: itemsStore.getToken()
      })
    }).then(res => res.json()).then(json => {
      if( json === true ){
        
      }else{
        localStorage.removeItem('token');
        clearInterval(this.interval)
        setTimeout( () => {
          //window.location.reload();
          window.location.href = '/auth'
        }, 500 )
      }
    })
    .catch(err => { });
  }
  
  componentDidMount = () => {
    
    this.interval = setInterval(() => this.checkLogin(), 1000*60*60);
    this.checkLogin();
    
    fetch(config.urlApi, {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify({
        type: 'get_cat_center', 
        city_id: 1
      })
    }).then(res => res.json()).then(json => {
      this.setState({
        cityList: json.city_list,
      })
      
      itemsStore.setAllItems(json.all_items);
      
      this.getPoints();
    }).catch(err => { });
  }
    
  handleDateChange(date){
    this.setState({
      selectedDate: formatDate(date)
    })
    
    setTimeout( () => {
      this.getOrders();
    }, 500 )
  };
  
  changeCity(event){
    let city = event.target.value;
    
    this.setState({ selectedCity: city });
    setTimeout( () => {
      this.getPoints();  
    },500 )
  }
  
  getPoints(){
    fetch(config.urlApi, {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify({
        type: 'get_points', 
        city_id: this.state.selectedCity
      })
    }).then(res => res.json()).then(json => {
      this.setState({
        points: json,
        point: json[0]
      })
      
      setTimeout( () => {
        this.getOrders();
      }, 500 )
    })
    .catch(err => { });
  }
  
  changeCat = (event, newValue) => {
    let point = this.state.points.find( (item, key) => key == newValue );
    
    this.setState({
      activeCat: newValue,
      point: point
    })
    
    this.getOrders();
  }
  
  getOrders(){
    setTimeout( () => {
      fetch(config.urlApi, {
        method: 'POST',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded'},
        body: queryString.stringify({
          type: 'get_orders', 
          city_id: this.state.selectedCity,
          point_id: this.state.point.id,
          date: this.state.selectedDate
        })
      }).then(res => res.json()).then(json => {
        console.log( json )
        
        this.setState({
          orders: json.orders,
        })
        
        setTimeout( () => {
          this.changeNumber()
        }, 100 )
      })
      .catch(err => { });
    }, 500 )
  }
  
  getOrder(order_id){
    fetch(config.urlApi, {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify({
        type: 'get_order', 
        point_id: this.state.point.id,
        order_id: order_id
      })
    }).then(res => res.json()).then(json => {
      console.log( json )
      
      this.setState({ 
        showOrder: json,
        openDialog: true
    });
    })
    .catch(err => { });
  }
  
  closeDialog(){
    this.setState({
      //showOrder: null,
      openDialog: false
    })
  }
  
  closeOrder(order_id, point_id){
    this.setState({
      delOrder: true
    })
  }
  
  closeOrderTrue(){
    let deltype = this.state.radiogroup_options.find( (item) => item.id == this.state.typeDel );
        
    if( deltype.id == '4' ){
      deltype.label = this.state.textDel;
    }
    
    if (confirm("Отменить заказ #"+this.state.showOrder.order.order_id)) {
      fetch(config.urlApi, {
        method: 'POST',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded'},
        body: queryString.stringify({
          type: 'close_order_center', 
          typeCreate: 'center',
          user_id: itemsStore.getToken(),
          order_id: this.state.showOrder.order.order_id,
          point_id: this.state.showOrder.order.point_id,
          ans: deltype.label
        })
      }).then(res => res.json()).then(json => {
        
        console.log( json )
        
        setTimeout(() => {
          if( json['st'] ){
            this.setState({
              delOrder: false,
              openDialog: false,
            });
            
            this.getOrders();
          }else{
            
            alert( json['text'] );
            
          }
        }, 300);
      });
    }
  }
  
  changeAddr = (event) => {
    this.setState({
      typeDel: event.target.value,
    })
  }
  
  repeatOrder(){
    let my_cart = [];
    let all_items = itemsStore.getAllItems();
    let item_info = null;
    
    localStorage.setItem('cityID', this.state.selectedCity)
    
    this.state.showOrder.order_items.map( (item) => {
      item_info = all_items.find( (item_) => item_.id == item.item_id );
      
      if( item_info ){
        let price = parseInt(item_info.price),
            all_price = parseInt(item.count) * parseInt(item_info.price);
        
        my_cart.push({
          name: item.name,
          item_id: item.item_id,
          count: item.count,
          
          one_price: price,
          all_price: all_price
        })
      }
    } )
    
    let data = {
        orderType: parseInt(this.state.showOrder.order.type_order_) - 1,
        orderAddr: this.state.showOrder.street.name,
        orderPic: parseInt(this.state.showOrder.order.point_id),
        orderComment: '',
        
        orderTimes: '1',
        orderPredDay: '',
        orderPredTime: '',
        
        orderPay: parseInt(this.state.showOrder.order.type_order_) == 1 ? 'cash' : 'in',
        orderSdacha: '',
    };
    
    itemsStore.saveCartData(data);
    
    if( this.state.showOrder.order.promo_name && this.state.showOrder.order.promo_name != '' ){
      itemsStore.setPromo( this.state.showOrder.promo_info, this.state.showOrder.order.promo_name )
    }
    itemsStore.setItems(my_cart)
    
    setTimeout(()=>{
      window.location.pathname = '/';
    }, 500)
  }
  
  changeText(event){
    this.setState({ textDel: event.target.value })
  }
  
  changeNumber(){
    let orders = document.querySelectorAll('.order');
    
    var order = this.state.number;
		
		if( order.length == 0 ){
			orders.forEach( item => {
        item.classList.remove("dis_none");
			});
		}else{
      orders.forEach( item => {
        let number = item.getAttribute('datanumber');
        
				if( number.indexOf(order) >= 0 ){
          item.classList.remove("dis_none");
				}else{
          item.classList.add("dis_none");
        }
      });
    }
  }
  
  render() {
    return (
      <Grid container spacing={0}>
        
        <Helmet>
          <title>Оформленные заказы</title>
        </Helmet>
        
        <Backdrop open={this.state.spiner} style={{ zIndex: 99, color: '#fff' }}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Grid item xs={12}>
          { this.state.cityList.length > 0 ? <Header classes={this.state.classes} cityList={this.state.cityList} page="statOrder" /> : null }
        </Grid>
        <Grid item xs={4}>
          
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
            <Grid container justify="space-around" style={{ alignItems: 'baseline' }}>
              
              <FormControl className={this.state.classes.formControl}>
                <InputLabel>Город</InputLabel>
                <Select
                  value={this.state.selectedCity}
                  onChange={ this.changeCity.bind(this) }
                >
                  { this.state.cityList.map( (item, key) =>
                    <MenuItem key={key} value={item.id}>{item.name}</MenuItem>
                  ) }
                </Select>
              </FormControl>
              
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="normal"
                id="date-picker-inline"
                label="Дата"
                value={this.state.selectedDate}
                onChange={this.handleDateChange.bind(this)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        
        </Grid>
        
        <Grid item xs={3}>
          <TextField 
            label="Номер телефона" 
            //variant="inlined" 
            style={{ margin: '16px 8px 8px 8px', flex: 1 }}
            value={ this.state.number }
            onChange={ (event) => this.setState({ number: event.target.value }) }
            onBlur={this.changeNumber.bind(this)}
          />
        </Grid>
        
        <Grid item xs={12}>
          <AppBar position="static">
            <Tabs value={this.state.activeCat} onChange={this.changeCat} aria-label="simple tabs example">
              { this.state.points.map((item, key) =>
                <Tab label={item.addr} style={{ minWidth: 'auto' }} key={key} {...a11yProps(key)} />
              ) }
            </Tabs>
          </AppBar>
          
          { this.state.points.map((cat, key) =>
            <TabPanel value={this.state.activeCat} index={key} key={key}>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Оформил</TableCell>
                      <TableCell>Телефон</TableCell>
                      <TableCell>Адрес</TableCell>
                      <TableCell>Оформлен</TableCell>
                      <TableCell>Ко времени</TableCell>
                      <TableCell>Закрыт на кухне</TableCell>
                      <TableCell>Получен клиентом</TableCell>
                      <TableCell>Тип</TableCell>
                      <TableCell>Статус</TableCell>
                      <TableCell>Сумма</TableCell>
                      <TableCell>Оплата</TableCell>
                      <TableCell>Курьер</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                    { this.state.orders.map( (item, key) =>
                      <TableRow key={key} className="order" id={item.id} datanumber={item.number} style={ item.is_delete == 1 ? { backgroundColor: 'red', color: '#fff' } : {} }>
                        <TableCell style={{ color: 'inherit', cursor: 'pointer' }} onClick={ this.getOrder.bind(this, item.id) }>{item.id}</TableCell>
                        <TableCell style={{ color: 'inherit' }}>{item.type_user}</TableCell>
                        <TableCell style={{ color: 'inherit' }}>{item.number}</TableCell>
                        <TableCell style={{ color: 'inherit' }}>{item.street} {item.home}</TableCell>
                        <TableCell style={{ color: 'inherit' }}>{item.date_time_order}</TableCell>
                        <TableCell style={{ color: 'inherit' }}>{ item.date_time_preorder == '00:00:00' ? '' : item.date_time_preorder }</TableCell>
                        <TableCell style={{ color: 'inherit' }}>{ item.give_data_time == '00:00:00' ? '' : item.give_data_time }</TableCell>
                        <TableCell style={{ color: 'inherit' }}>{item.close_order}</TableCell>
                        <TableCell style={{ color: 'inherit' }}>{item.type_order}</TableCell>
                        <TableCell style={{ color: 'inherit' }}>{item.status}</TableCell>
                        <TableCell style={{ color: 'inherit' }}>{item.order_price}</TableCell>
                        <TableCell style={{ color: 'inherit' }}>{item.type_pay}</TableCell>
                        <TableCell style={{ color: 'inherit' }}>{item.driver}</TableCell>
                      </TableRow>
                    ) }
                    
                    
                  </TableBody>
                </Table>
              </TableContainer>
              
            </TabPanel>
          )}
          
        </Grid>
        
        { this.state.showOrder ?
          <Dialog 
              onClose={this.closeDialog.bind(this)} 
              aria-labelledby="customized-dialog-title" 
              className="showOrderDialog" 
              open={this.state.openDialog}
              fullWidth={true}
          >
              <MuiDialogTitle disableTypography style={{ margin: 0, padding: 8 }}>
                  <Typography variant="h6">Заказ {this.state.showOrder.order.order_id}</Typography>
                
                  <IconButton aria-label="close" style={{ position: 'absolute', top: 0, right: 0, color: '#000' }} onClick={this.closeDialog.bind(this)}>
                      <CloseIcon />
                  </IconButton>
              </MuiDialogTitle>
              
              <MuiDialogContent className="showOrderDialogContent">
                  <Typography variant="h6" component="span">{this.state.showOrder.order.type_order}: {this.state.showOrder.order.type_order_addr_new}</Typography>
                  <Typography variant="h6" component="span">{this.state.showOrder.order.time_order_name}: {this.state.showOrder.order.time_order}</Typography>
                  
                  <Grid container spacing={0}>
                    { this.state.showOrder.order.number.length > 1 ? 
                      <Grid item xs={12}>
                        <Typography variant="h6" component="b">Телефон: </Typography> 
                        <Typography variant="h6" component="span">{this.state.showOrder.order.number}</Typography> 
                      </Grid>
                        : 
                      null
                    }
                  </Grid>
                  
                  
                  { this.state.showOrder.order.delete_reason.length > 0 ? <Typography variant="h6" component="span" style={{ color: 'red' }}>Удален: {this.state.showOrder.order.date_time_delete}</Typography> : null}
                  { this.state.showOrder.order.delete_reason.length > 0 ? <Typography variant="h6" component="span" style={{ color: 'red' }}>{this.state.showOrder.order.delete_reason}</Typography> : null}
                  
                  { parseInt(this.state.showOrder.order.is_preorder) == 1 ? null :
                    <Typography variant="h6" component="span">{this.state.showOrder.order.text_time}{this.state.showOrder.order.time_to_client}</Typography>
                  }
                  
                  <Typography variant="h6" component="span">{this.state.showOrder.order.textTime}</Typography>
                  
                  <Grid container spacing={0}>
                    { this.state.showOrder.order.promo_name == null || this.state.showOrder.order.promo_name.length == 0 ? null :
                      <>
                        <Grid item xs={12}>
                          <Typography variant="h6" component="b">Промокод: </Typography>
                          <Typography variant="h6" component="span">{this.state.showOrder.order.promo_name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6" component="span" className="noSpace">{this.state.showOrder.order.promo_text}</Typography>
                        </Grid>
                      </>
                    }
                    
                    { this.state.showOrder.order.comment == null || this.state.showOrder.order.comment.length == 0 ? null :
                      <Grid item xs={12}>
                        <Typography variant="h6" component="b">Комментарий: </Typography>
                        <Typography variant="h6" component="span">{this.state.showOrder.order.comment}</Typography>
                      </Grid>
                    }
                    
                    { this.state.showOrder.order.sdacha == null || parseInt(this.state.showOrder.order.sdacha) == 0 ? null :
                      <Grid item xs={12}>
                        <Typography variant="h6" component="b">Сдача: </Typography>
                        <Typography variant="h6" component="span">{this.state.showOrder.order.sdacha}</Typography>
                      </Grid>
                    }
                  </Grid>
                  
                  <table className="tableOrderCheck">
                      <tbody>
                          {this.state.showOrder.order_items.map((item, key) => 
                              <tr key={key}>
                                  <td>
                                      <Typography variant="h5" component="span">{item.name}</Typography>
                                  </td>
                                  <td>
                                      <Typography variant="h5" component="span">{item.count}</Typography>
                                  </td>
                                  <td>
                                      <Typography variant="h5" component="span">{item.price} р</Typography>
                                  </td>
                              </tr>
                          )}
                          
                          { parseInt(this.state.showOrder.order.type_order_) == 1 ?
                            <tr>
                              <td>
                                  <Typography variant="h5" component="span">Доставка</Typography>
                              </td>
                              <td>
                                  <Typography variant="h5" component="span"></Typography>
                              </td>
                              <td>
                                  <Typography variant="h5" component="span">{this.state.showOrder.order.sum_div} р</Typography>
                              </td>
                            </tr>
                              :
                            null
                          }
                      </tbody>
                      <tfoot>
                        <tr>
                          <th style={{ textAlign: 'left' }}>
                            <Typography variant="h5" component="span">Сумма закза</Typography>
                          </th>
                          <td>
                            <Typography variant="h5" component="span"></Typography>
                          </td>
                          <th style={{ textAlign: 'left' }}>
                            <Typography variant="h5" component="span">{this.state.showOrder.order.sum_order} р</Typography>
                          </th>
                        </tr>
                      </tfoot>
                  </table>
                  
              </MuiDialogContent>
              
              { parseInt( this.state.showOrder.order.is_delete ) == 0 && parseInt( this.state.showOrder.order.status_order ) !== 6 ? 
                <MuiDialogActions style={{ justifyContent: 'flex-end', padding: '15px 0px' }}>
                  <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorderOther" style={{ marginRight: 24 }}>
                    <Button variant="contained" className="BtnCardMain CardInCardItem" onClick={ this.closeOrder.bind(this, this.state.showOrder.order.order_id, this.state.showOrder.order.point_id) }>Отменить заказ</Button>
                  </ButtonGroup>
                </MuiDialogActions>
                  :
                null
              }
              { parseInt( this.state.showOrder.order.is_delete ) == 1 || parseInt( this.state.showOrder.order.status_order ) == 6 ? 
                <MuiDialogActions style={{ justifyContent: 'flex-end', padding: '15px 0px' }}>
                  <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorderOther" style={{ marginRight: 24 }}>
                    <Button variant="contained" className="BtnCardMain CardInCardItem" onClick={ this.repeatOrder.bind(this, this.state.showOrder.order.order_id, this.state.showOrder.order.point_id) }>Повторить заказ</Button>
                  </ButtonGroup>
                </MuiDialogActions>
                  :
                null
              }
              
          </Dialog>
              :
          null
        }
        
        { this.state.showOrder ?
          <Dialog open={this.state.delOrder} onClose={() => { this.setState({delOrder: false}) }} aria-labelledby="form-dialog-title">
            <MuiDialogTitle disableTypography style={{ margin: 0, padding: 8 }}>
              <Typography variant="h6">Отмена заказа {this.state.showOrder.order.order_id}</Typography>
            
              <IconButton aria-label="close" style={{ position: 'absolute', top: 0, right: 0, color: '#000' }} onClick={() => { this.setState({delOrder: false}) }}>
                <CloseIcon />
              </IconButton>
            </MuiDialogTitle>
            
            <DialogContent>
              <FormControl component="fieldset">
                <RadioGroup name="typeDel" value={ this.state.typeDel } onChange={this.changeAddr} >
                  {this.state.radiogroup_options.map((item, key) => 
                    <FormControlLabel key={key} value={item.id} control={<Radio />} label={item.label} />
                  )}
                </RadioGroup>
              </FormControl>
            
              <TextField
                //autoFocus
                onFocus={ () => { this.setState({ typeDel: '4' }) } }
                value={ this.state.textDel }
                onChange={ this.changeText.bind(this) }
                margin="dense"
                id="name"
                label="Причина отмены"
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions style={{ paddingBottom: 24 }}>
              
              <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorderOther" style={{ marginRight: 24 }}>
                <Button variant="contained" className="BtnCardMain CardInCardItem" onClick={() => { this.setState({delOrder: false}) }}>К заказу</Button>
              </ButtonGroup>
              
              <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorderOther" style={{ marginRight: 24 }}>
                <Button variant="contained" className="BtnCardMain CardInCardItem" onClick={this.closeOrderTrue.bind(this)}>Отменить заказ</Button>
              </ButtonGroup>
              
            </DialogActions>
          </Dialog>
            :
          null
        }
        
      </Grid>
    )
  }
}

export function Orders() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <OrdersStat classes={classes} />
    </div>
  );
}