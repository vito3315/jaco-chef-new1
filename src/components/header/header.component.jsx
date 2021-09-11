import * as React from "react"
import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import moment from "moment";
import Autocomplete from '@material-ui/lab/Autocomplete';

import { NavLink as Link, Switch, Route, Redirect } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import itemsStore from '../../stores/items-store';
import config from '../../stores/config';
import { autorun } from "mobx"

import CloseIcon from '@material-ui/icons/Close';
import InputMask from "react-input-mask";

const queryString = require('query-string');

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export class Header extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      classes: this.props.classes,
      cityList: this.props.cityList,
      city: itemsStore.getCity(),
      page: this.props.page,
      
      updateMyPromos: null,
      MyPromos: [],
      
      number: '',
      
      orderPromoText: '',
      promo_name: '',
      promoST: false,
      
      top: false,
      left: false,
      bottom: false,
      right: false,
      
      thisDateTimeDel: null
    };
  }
    
  componentDidMount = () => {
    this._isMounted = true;
    
    let defValue = '';
  
    if( localStorage.getItem('clientNumber') ){
      defValue = localStorage.getItem('clientNumber');
      itemsStore.clientNumber = defValue;
      
      this.setState({
        number: defValue,
      })
    }
    
    if( localStorage.getItem('promo_name') ){
      let promo = localStorage.getItem('promo_name');
      
      setTimeout( ()=>{
        this.setState({
          promo_name: promo
        })
        
        this.checkPromo( {target: {value: promo}} )
      }, 500 )
      
    }
    
    autorun(() => {
      
      //let test = itemsStore.cart_data;
      let thisCity = itemsStore.getCity();
      let cartData = itemsStore.getCartData();
      
      let dateTimeDel = itemsStore.dateTimeDel;
      
      setTimeout( () => {
        dateTimeDel = itemsStore.dateTimeDel;
        
        if( this.state.thisDateTimeDel != dateTimeDel ){
          this.setState({
            thisDateTimeDel: dateTimeDel
          })
          
          this.setState({
            number: '',
            promo_name: '',
            orderPromoText: '',
          })
          
          this.clear2();
        }
      }, 300 )
      
      
      
      if( this.state.promo_name && this.state.promo_name.length > 0 ){
        this.checkPromo( {target: {value: this.state.promo_name}} )
      }
      
      if( itemsStore.updateMyPromos != this.state.updateMyPromos ){
        
        let myPromos = itemsStore.getMyPromos();
        let myPromosNew = [];
        let checkDate = moment(new Date()).add(-7, 'days').format("YYYY-MM-DD");
        
        myPromos = myPromos.filter( (item) => item.date >= checkDate );
        
        localStorage.setItem('MyPromos', JSON.stringify(myPromos) );
        
        myPromos.forEach( element => {
          let check = myPromosNew.find( (item) => item.promo == element.promo )
          
          if( !check || check.length == 0 ){
            element.count = 1;
            
            myPromosNew.push( element )
          }else{
            myPromosNew.forEach( (item, key) => {
              if( item.promo == element.promo ){
                myPromosNew[key]['count'] ++;
              }
            } )
          }
        });
        
        myPromosNew = myPromosNew.filter( (item) => item.count > 1 );
        
        this.setState({
          updateMyPromos: itemsStore.updateMyPromos,
          MyPromos: myPromosNew
        })
      }
      
      if( itemsStore.clear === true ){
        this.clear();
        
        itemsStore.clear = false;
      }
    })
  }
    
  saveNumber(event){
    
    let number = event.target.value;
    let str = '';
    
    number = number+'';
    
    if( number.length > 0 ){
      
      number = number.split(' ').join('');
      number = number.split('(').join('');
      number = number.split(')').join('');
      number = number.split('-').join('');
      number = number.split('+').join('');
      
      if( number[0] == '7' || number[0] == 7 ){
        str = number.split("");
        str[0] = 8;
        number = str.join("");
      }
      
      if( number.length != 11 ){
        alert('Номер введен в не верном формате!')
        return;
      }
      
    }
    
    this.setState({
      number: number
    })
    
    itemsStore.clientNumber = number;
    localStorage.setItem('clientNumber', number)
    
    /*let number = event.target.value;
          
    if( number.length > 0 ){
      number = number.split(' ').join('');
      number = number.split('(').join('');
      number = number.split(')').join('');
      number = number.split('-').join('');
      
      number = number.slice(1);
      
      itemsStore.clientNumber = '8' + number;
      localStorage.setItem('clientNumber', '8' + number)
    }else{
      itemsStore.clientNumber = '';
      localStorage.setItem('clientNumber', '')
    }*/
  }
    
  checkPromo(event){
    
    let promo = event.target.value;
    //let promo = this.state.promo_name;
    
    console.log( 'promo', promo )
    console.log( 'promo 555', event.target.value )
    
    fetch(config.urlApi, {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify({
        type: 'get_promo', 
        city_id: itemsStore.getCity(),
        promo_name: promo
      })
    }).then(res => res.json()).then(json => {
      itemsStore.setPromo( JSON.stringify(json), promo );
      let check_promo = itemsStore.checkPromo();
        
      if( check_promo.st === false ){
        localStorage.removeItem('promo_name')
      }
      
      if( promo.length == 0 ){
        this.setState({
          orderPromoText: '',
          promo_name: '',
          promoST: false
        })
        localStorage.removeItem('promo_name')
      }else{
        this.setState({
          orderPromoText: check_promo.text,
          promoST: check_promo.st,
          promo_name: promo
        })
      }
    })
  }
    
  toggleDrawer2(anchor, open, event){
    this.setState({
      [anchor]: open
    })
  };
    
  clear(){
    
    return ;
    
    itemsStore.clientNumber = '';
    localStorage.removeItem('clientNumber')
    localStorage.removeItem('promo_name')
    
    itemsStore.setItems([]);
    
    let data = {
      orderType: '0',
      orderAddr: '',
      orderPic: 0,
      orderComment: '',
      
      orderTimes: 0,
      orderPredDay: '',
      orderPredTime: '',
      
      orderPay: '',
      orderSdacha: '',
      
      dateTime: new Date()
    };
    
    itemsStore.dateTimeDel = new Date();
    
    itemsStore.saveCartData(data);
    
    
    setTimeout( () => {
      itemsStore.setPromo(null, '');
      this.checkPromo({ target: {value: ''} })
    }, 300)
    
    
    this.setState({
      number: '',
      promo_name: '',
      orderPromoText: '',
    })
  }
  
  clear2(){
    
    return ;
    
    itemsStore.clientNumber = '';
    localStorage.removeItem('clientNumber')
    localStorage.removeItem('promo_name')
    
    itemsStore.setItems([]);
    
    let data = {
      orderType: '0',
      orderAddr: '',
      orderPic: 0,
      orderComment: '',
      
      orderTimes: 0,
      orderPredDay: '',
      orderPredTime: '',
      
      orderPay: '',
      orderSdacha: '',
      
      dateTime: new Date()
    };
    
    itemsStore.saveCartData(data);
    
    
    setTimeout( () => {
      itemsStore.setPromo(null, '');
      this.checkPromo({ target: {value: ''} })
    }, 300)
    
    
    this.setState({
      number: '',
      promo_name: '',
      orderPromoText: '',
    })
  }
    
  changeCity(event){
    let city = event.target.value;
    
    this.setState({ city: city });
    itemsStore.setCity(city)
    
    localStorage.setItem('cityID', city)
    
    let data = {
      orderType: '0',
      orderAddr: '',
      orderPic: 0,
      orderComment: '',
      
      orderTimes: 0,
      orderPredDay: '',
      orderPredTime: '',
      
      orderPay: '',
      orderSdacha: '',
    };
    
    itemsStore.saveCartData(data);
    
    setTimeout( () => {
      //location.reload();
    }, 500 )
  }
    
  logOut(){
    localStorage.removeItem('token');
    
    setTimeout( () => {
      window.location.reload();
    }, 500 )
  }
  
  render() {
    return (
      <div className={this.state.classes.root}>
        <AppBar position="static" style={{ backgroundColor: '#fff', color: '#000' }}>
          <Toolbar style={{ minHeight: 48, height: 48 }}>
            <IconButton edge="start" onClick={this.toggleDrawer2.bind(this, 'left', true)} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            { this.state.page == 'createOrder' ?
              <Grid container className='headerInput'>
                
                <Grid item xs={3}>
                  <FormControl className={this.state.classes.formControl}>
                    <InputLabel style={{ paddingBottom: 2 }}>Город</InputLabel>
                    <Select
                    
                      style={{ marginTop: 9 }}
                      value={this.state.city}
                      onChange={ this.changeCity.bind(this) }
                    >
                      { this.state.cityList.map( (item, key) =>
                        <MenuItem key={key} value={item.id}>{item.name}</MenuItem>
                      ) }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
                  
                  <Autocomplete
                    freeSolo
                    
                    label="Промокод"
                    variant="outlined"
                    size="small"
                    
                    style={{ minWidth: 200, marginRight: 8 }}
                    
                    value={ this.state.promo_name } 
                    onChange={ (event, val) => { console.log(val); this.setState({ promo_name: val }) } } 
                    onBlur={this.checkPromo.bind(this)} 
                    
                    options={this.state.MyPromos.map((option) => option.promo)}
                    renderInput={(params) => (
                        <TextField {...params} label="Промокод" margin="normal" variant="outlined" />
                    )}
                  />
                  
                  
                  <HtmlTooltip
                    placement="bottom"
                    title={
                      <React.Fragment>
                        <Typography color="inherit" className={this.state.classes.size1}>{this.state.orderPromoText}</Typography>
                      </React.Fragment>
                    }
                  >
                    <Button variant="contained" color="primary" style={{ padding: '2px 6px', marginTop: 8, minWidth: 30, marginRight: 8, backgroundColor: this.state.promoST === false && this.state.orderPromoText.length == 0 ? 'gray' : this.state.promoST === false && this.state.orderPromoText.length > 0 ? 'red' : 'green' }}>?</Button>
                  </HtmlTooltip>
                  
                  <Button variant="contained" color="primary" className="btnClear" style={{ padding: '2px 6px', minWidth: 30, marginTop: 8 }} onClick={ this.clear.bind(this) } >
                    <CloseIcon />
                  </Button>
                </Grid>
                <Grid item xs={3} style={{ paddingTop: 14 }}>
                  <TextField 
                    label="Телефон" 
                    
                    variant="outlined"
                    size="small"
                    
                    placeholder="8 (999) 999-99-99"
                    value={this.state.number}
                    onChange={ event => this.setState({ number: event.target.value }) } 
                    onBlur={this.saveNumber.bind(this)} 
                    style={{ marginRight: 4, marginLeft: 4, marginBottom: 6}} 
                  />
                  
                </Grid>
              
              </Grid>
                :
              null
            }
          </Toolbar>
        </AppBar>
        
        
          
        
        
        <Drawer anchor={'left'} open={this.state.left} onClose={this.toggleDrawer2.bind(this, 'left', false)}>
          <div
            className={clsx(this.state.classes.list)}
            role="presentation"
            //onClick={this.toggleDrawer2(this, 'left', false)}
            //onKeyDown={this.toggleDrawer(this, 'left', false)}
          >
            <Link
              to={ '/' }
              style={{ textDecoration: 'none' }}
            >
              <ListItem button style={{ color: '#000' }}>
                <Typography variant="body1">Оформить заказ</Typography>
              </ListItem>
            </Link>
            <Link
              to={ '/orders' }
              style={{ textDecoration: 'none' }}
            >
              <ListItem button style={{ color: '#000' }}>
                <Typography variant="body1">Список заказов</Typography>
              </ListItem>
            </Link>
            <Link
              to={ '/ordercook' }
              style={{ textDecoration: 'none' }}
            >
              <ListItem button style={{ color: '#000' }}>
                <Typography variant="body1">Заказы на кухне</Typography>
              </ListItem>
            </Link>
            <Divider />
            <List>
              <ListItem button onClick={this.logOut.bind(this)}>
                <ListItemText primary={'Выйти'} />
              </ListItem>
            </List>
          </div>
        </Drawer>      
      </div>
    )
  }
}