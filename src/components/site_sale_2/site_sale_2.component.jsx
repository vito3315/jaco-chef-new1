import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

import { NavLink as Link, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';

import Divider from '@mui/material/Divider';

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

import { MySelect, MyCheckBox, MyTimePicker, MyTextInput, MyDaterange, MyAutocomplite, MyDatePicker } from '../../stores/elements';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';

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

function formatDateDot(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [day, month, year].join('.');
}

function formatDateName(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  //if (month.length < 2) 
  //    month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  let m = '';    
      
  switch(parseInt(month)){
		case 1:{
			m = 'Января';
			break;}
		case 2:{
			m = 'Февраля';
			break;}
		case 3:{
			m = 'Марта';
			break;}
		case 4:{
			m = 'Апреля';
			break;}
		case 5:{
			m = 'Мая';
			break;}
		case 6:{
			m = 'Июня';
			break;}	
		case 7:{
			m = 'Июля';
			break;}
		case 8:{
			m = 'Августа';
			break;}
		case 9:{
			m = 'Сентября';
			break;}
		case 10:{
			m = 'Октября';
			break;}
		case 11:{
			m = 'Ноября';
			break;}
		case 12:{
			m = 'Декабря';
			break;}	
	}    
      
  return [day, m].join(' ');
}

class SiteSale2_new_ extends React.Component {
  click = false;
  
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'site_sale_2',
      module_name: '',
      is_load: false,
      modalText: '',
      
      points: [],
      point: 0,
      cities: [],
      city: 0,
      
      modalDialog: false,
      modalLink: '',
      
      where_promo_list: [
        {id: 1, name: 'Создать'},
        {id: 2, name: 'Создать и показать'},
        {id: 3, name: 'Отправить на почту'},
        {id: 4, name: 'Отправить в смс'},
        {id: 5, name: 'Рассылка смс'},
        {id: 6, name: 'Отправить в ЛК (через 8)'},
        {id: 7, name: 'Создать сертификат(ы)'},
        {id: 8, name: 'Отправить через бота ВК'},
      ],
      promo_action_list: [],
      sale_list: [
        {id: 1, name: 'На товары'},
        {id: 2, name: 'На категории'},
        {id: 3, name: 'На все меню (кроме допов и закусок)'},
      ],
      promo_conditions_list: [
        {id: 1, name: 'В корзине есть определенные товар(ы)'},
        {id: 2, name: 'В корзине набрана определенная сумма'},
      ],
      promo_sale_list: [],
      type_sale_list: [
        {id: 1, name: 'В рублях'},
        {id: 2, name: 'В процентах'},
      ],
      date_promo_list: [
        {id: 1, name: 'В определенные даты'},
        {id: 2, name: '14 дней с 10:00 до 21:40'},
        {id: 3, name: '14 дней с 00:00 до 23:59'},
      ],
      type_order_list: [
        {id: 1, name: 'Все'},
        {id: 2, name: 'Доставка'},
        {id: 3, name: 'Самовывоз'},
        {id: 4, name: 'Зал'},
      ],
      where_order_list: [
        {id: 1, name: 'В городе'},
        {id: 2, name: 'На точке'}
      ],
      
      promo_prizw_vk: 
    		'Привет!\r\n'+
    		'Поздравляем 🎉\r\n'+
    		'Промокод --promo-- на --position--, действует до --endDate--. Активировать можно при заказе на доставку, самовывоз и в кафе.\r\n\r\n'+

    		'Обратите внимание, что за подарочную позицию надо будет заплатить 1 руб, это необходимое условие для получения приза. В промокод не входят соевый соус, имбирь и васаби.\r\n\r\n'+

    		'Заказы принимаем на сайте --site--\r\n\r\n'+

    		'Режим работы: с 10:00 до 21:30\r\n'+
    		'Адреса наших кафе:\r\n'+
    		'--addrCity--',
      
      spamNameSMS: '',
        
      auto_text: true,
      where_promo: 1,
      promo_name: '',
      generate_new: false,
      count_action: 1,
      promo_action: 1,
      type_sale: 3,
      promo_sale: 1,
      sale_type: 2,
      promo_conditions: 2,
      
      price_start: 0,
      price_end: 0,
      date_promo: 1,
      
      date_start: formatDate(new Date()),
      date_end: formatDate(new Date()),
      rangeDate: [formatDate(new Date()), formatDate(new Date())],
      time_start: '10:00',
      time_end: '21:30',
      
      promo_length: 5,
      promo_count: 1,
      
      day_1: true,
      day_2: true,
      day_3: true,
      day_4: true,
      day_5: true,
      day_6: true,
      day_7: true,
      
      type_order: 1,
      where_order: 1,
      
      numberList: '',
      promo_desc_true: '',
      promo_desc_false: '',
      textSMS: '',
      
      
      addItem: null,
      addItemCount: 1,
      addItemPrice: 1,
      addItemAllPrice: 0,
      
      itemsAdd: [],
      itemsAddPrice: [],
      items: [],
      cats: [],
      saleCat: [],
      saleItem: [],
      
      priceItem: null,
      
      conditionItems: [],
      
      testDate: []
    };
  }
  
  async componentDidMount(){
    
    let data = await this.getData('get_all_for_new');
    
    let date = new Date();
    let fullDate = '';
    
    let Y = date.getFullYear();
    let M = date.getMonth()+1;
    let D = date.getDate();
    
    fullDate = Y + '-' + ( parseInt(M) > 9 ? M : '0'+M ) + '-' + ( parseInt(D) > 9 ? D : '0'+D );
    
    this.setState({
      points: data.points,
      cities: data.cities,
      module_name: data.module_info.name,
      promo_action_list: data.promo_action_list,
      promo_sale_list: data.promo_sale_list,
      
      date_start: fullDate,
      date_end: fullDate,
      
      items: data.items,
      cats: data.cats
    })
    
    document.title = data.module_info.name;
    
    setTimeout( () => {
      this.generateTextDescFalse();     
      this.generateTextDescTrue(); 
    }, 300 )
  }
  
  async save(){
    
    if( !this.click ){
      this.click = true;  
      
      let count_promo = this.state.promo_sale_list.find( (item) => parseInt(item.id) == parseInt(this.state.promo_sale) )['name'];
      
      let conditionItems = [];
      
      this.state.conditionItems.map( (item) => {
        conditionItems.push(item.id)
      } )
      
      
      let promo_items = [];
      
      this.state.saleItem.map( (item) => {
        promo_items.push(item.id)
      } )
      
      
      let promo_cat = [];
      
      this.state.saleCat.map( (item) => {
        promo_cat.push(item.id)
      } )
      
      let dateList = [];
      
      this.state.testDate.map( (item) => {
        dateList.push( (new Date(item).toISOString()).split('T')[0] );
      } )
      
      dateList = dateList.join(',')
      
      let data = {
        spamNameSMS: this.state.spamNameSMS,
        promo_vk_prize: this.state.promo_vk_prize,
        cert_text: this.state.cert_text,
        addr: this.state.numberList,
        where_promo: this.state.where_promo,
        promo_count: this.state.promo_count,
        promo_len: this.state.promo_length,
        promo_name: this.state.promo_name,
        generate: this.state.generate_new ? 1 : 0,
        promo_in_count: this.state.count_action,
        promo_action: this.state.promo_action,
        promo_type_sale: this.state.type_sale,
        count_promo: count_promo,
        promo_type: this.state.sale_type,
        promo_conditions: this.state.promo_conditions,
        
        promo_summ: this.state.price_start,
        promo_summ_to: this.state.price_end,
        promo_when: this.state.date_promo,
        
        date_start: this.state.date_start,
        date_end: this.state.date_end,
        time_start: this.state.time_start,
        time_end: this.state.time_end,
        
        day_1: this.state.day_1 ? 1 : 0,
        day_2: this.state.day_2 ? 1 : 0,
        day_3: this.state.day_3 ? 1 : 0,
        day_4: this.state.day_4 ? 1 : 0,
        day_5: this.state.day_5 ? 1 : 0,
        day_6: this.state.day_6 ? 1 : 0,
        day_7: this.state.day_7 ? 1 : 0,
        
        promo_type_order: this.state.type_order,
        promo_where: this.state.where_order,
        
        numberList: this.state.numberList,
        
        promo_city: this.state.city,
        promo_point: this.state.point,
        
        about_promo_text: this.state.promo_desc_true,
        condition_promo_text: this.state.promo_desc_false,
        textSMS: this.state.textSMS,
        
        
        promo_items: JSON.stringify(promo_items),
        promo_cat: JSON.stringify(promo_cat),
        promo_items_add: JSON.stringify(this.state.itemsAdd),
        promo_items_sale: JSON.stringify(this.state.itemsAddPrice),
        promo_conditions_items: JSON.stringify(conditionItems),
        
        date_between: dateList
      };
      
      let res = await this.getData('save_new_promo', data);
      
      console.log( res )
      
      //создать
      if( parseInt(this.state.where_promo) == 1 || parseInt(this.state.where_promo) == 8 ){
        this.setState({
          modalDialog: true,
          modalText: 'Создано'
        })
      }
      
      //создать и показать
      if( parseInt(this.state.where_promo) == 2 ){
        this.setState({
          modalDialog: true,
          modalText: 'Промокоды: '+res.promo_text.join(', ')
        })
      }
      
      //почта
      if( parseInt(this.state.where_promo) == 3 ){
        this.setState({
          modalDialog: true,
          modalText: res.text
        })
      }
      
      //смс / смс рассылка / ЛК
      if( parseInt(this.state.where_promo) == 4 || parseInt(this.state.where_promo) == 5 || parseInt(this.state.where_promo) == 6 ){
        this.setState({
          modalDialog: true,
          modalText: res.text
        })
      }
      
      //сертификаты
      if( parseInt(this.state.where_promo) == 7 ){
        this.setState({
          modalDialog: true,
          modalText: res.text,
          modalLink: res.link
        })
      }
      
      setTimeout( () => {
        this.click = false;    
      }, 300 )
    }
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
      
      setTimeout( () => {
        this.setState({
          is_load: false
        })
        this.click = false;
      }, 300 )
    });
  }
  
  changeData(type, event){
    this.setState({
      [ type ]: event.target.value
    })
    
    if( type == 'date_promo' && (event.target.value == 2 || event.target.value == 3) ){
      let thisDay = new Date();
      let nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 14);
      
      this.setState({
        rangeDate: [formatDate(thisDay), formatDate(nextDay)],
        date_start: formatDate(thisDay),
        date_end: formatDate(nextDay),
        
        time_start: event.target.value == 2 ? '10:00' : '00:00',
        time_end: event.target.value == 2 ? '21:40' : '23:59',
      })
    }
    
    setTimeout( () => {
      this.generateTextDescFalse();   
      this.generateTextDescTrue();   
    }, 300 )
  }
  
  changeDataCheck(type, event){
    this.setState({
      [ type ]: event.target.checked
    })
    
    setTimeout( () => {
      this.generateTextDescFalse();    
      this.generateTextDescTrue();  
    }, 300 )
  }
  
  changeDateRange(data){
    let dateStart = data[0] ? formatDate(data[0]) : '';
    let dateEnd = data[1] ? formatDate(data[1]) : '';
    
    this.setState({
      rangeDate: [dateStart, dateEnd],
      date_start: dateStart,
      date_end: dateEnd,
    })
    
    setTimeout( () => {
      this.generateTextDescFalse();  
      this.generateTextDescTrue();    
    }, 300 )
  }
  
  changeDataData(type, data){
    this.setState({
      [ type ]: data
    });
    
    setTimeout( () => {
      this.generateTextDescFalse();  
      this.generateTextDescTrue();    
    }, 300 )
  }
  
  generateTextDescTrue(){
    
    if( !this.state.auto_text ){
      return ;
    }
    
    let promo_action = this.state.promo_action;
    let textTrue = '';
    
    if(parseInt(promo_action) == 1){//скидка
      var promo_type_sale = this.state.type_sale,
        count_promo = this.state.promo_sale_list.find( (item) => parseInt(item.id) == parseInt(this.state.promo_sale) )['name'],//размер скидки
        promo_type = this.state.sale_type; //1 - рубли 2 %

      if(parseInt(promo_type_sale) == 1){//товары
        var promo_items = this.state.saleItem,
          items = '';

        promo_items.map(function(item, key){
          items += item.name+', ';
        })

        items = items.substring(0, items.length - 2);

        textTrue = 'скидку на '+items+' в размере '+count_promo+(parseInt(promo_type) == 1 ? 'руб.' : '%');
      }	
      if(parseInt(promo_type_sale) == 2){//категории
        var promo_items = this.state.saleCat,
          items = '';

        promo_items.map(function(item, key){
          items += item.name+', ';
        })

        items = items.substring(0, items.length - 2);

        textTrue = 'скидку на '+items+' в размере '+count_promo+(parseInt(promo_type) == 1 ? 'руб.' : '%');
      }
      if(parseInt(promo_type_sale) == 3){//все
        textTrue = 'скидку на всё меню, кроме напитков, соусов, приправ и палочек, в размере '+count_promo+(parseInt(promo_type) == 1 ? 'руб.' : '%');
      }
    }
    
    if(parseInt(promo_action) == 2){//добавляет товар
      var itemText = '';

      this.state.itemsAdd.map( (item, key) => {
        if(parseInt(item['price']) == 0){
          itemText += 'бесплатную '+item['name']+' '+item['count']+'шт. '+'за '+item['price']+'руб., ';
        }else{
          itemText += item['name']+' '+item['count']+'шт. '+'за '+item['price']+'руб., ';
        }
      } )
      
      itemText = itemText.substring(0, itemText.length - 2);

      textTrue = this.state.itemsAdd.length == 1 ? 'позицию '+itemText : 'позиции '+itemText;
    }	
    
    if(parseInt(promo_action) == 3){//товар за цену
      var itemText = '';

      this.state.itemsAddPrice.map( (item, key) => {
        itemText += item['name']+' по '+item['price']+'руб., ';
      } )
      
      itemText = itemText.substring(0, itemText.length - 2);

      textTrue = this.state.itemsAddPrice.length-1 == 1 ? 'позицию '+itemText : 'позиции '+itemText;
    }
    
    let textSMS = 'Промокод --promo_name--, действует до '+formatDateName(this.state.date_end)+'. Заказывай на jacofood.ru!'
    
    this.setState({
      promo_desc_true: textTrue,
      textSMS: textSMS,
      cert_text: textTrue
    })
  }
  
  generateTextDescFalse(){
    
    if( !this.state.auto_text ){
      return ;
    }
    
    var dop_text = '';
    
    let text = '';
    
    console.log( this.state.testDate )
    
    if( this.state.testDate.length > 0 ){
      
      let dateList = [];
      
      this.state.testDate.map( (item) => {
        dateList.push( (new Date(item).toISOString()).split('T')[0] );
      } )
      
			text = '(кроме ';
			
			dateList.map(function(item){
				text += formatDateName(item) + ', ';
			});
			
			text = text.slice(0, -1);
			text = text.slice(0, -1);

      text += ')';
      
      console.log( 'text', text )
		}
    
		if( parseInt(this.state.where_order) == 1 ){
			//город
			if( parseInt(this.state.city) != 0 ){
        let city_name = this.state.cities.find( (item) => parseInt(item.id) == parseInt(this.state.city) )['name'];
        
				dop_text = ' в г. '+city_name;
			}
		}
		
		if( parseInt(this.state.where_order) == 2 ){
			//точка
			if( parseInt(this.state.point) != 0 ){
        let point_name = this.state.points.find( (item) => parseInt(item.id) == parseInt(this.state.point) )['name'];
        
				dop_text = ' в г. '+point_name;
			}
		}
    
    let dateStart = formatDateDot(this.state.date_start);
    let dateEnd = formatDateDot(this.state.date_end);
    
    let textFalse = 'Промокод действует c '+dateStart+' до '+dateEnd+' с '+this.state.time_start+' до '+this.state.time_end+' '+text+dop_text;
    
    this.setState({
      promo_desc_false: textFalse
    })
	}
  
  addItemAdd(){
    let thisItems = this.state.itemsAdd;
    
    let check = thisItems.find( (item) => parseInt(item.item_id) == parseInt(this.state.addItem.id) );
    
    if( !check ){
      let thisItem = this.state.items.find( (item) => parseInt(item.id) == parseInt(this.state.addItem.id) );
      
      thisItems.push({
        item_id: this.state.addItem.id,
        name: thisItem.name,
        count: this.state.addItemCount,
        price: this.state.addItemPrice,
      })
      
      let addItemAllPrice = 0;
      
      thisItems.map( (item) => {
        addItemAllPrice += parseInt(item.price)
      } )
      
      this.setState({
        itemsAdd: thisItems,
        addItemAllPrice: addItemAllPrice
      })
    }
    
    setTimeout( () => {
      this.generateTextDescFalse();  
      this.generateTextDescTrue();    
    }, 300 )
  }
  
  delItemAdd(item){
    let thisItems = this.state.itemsAdd;
    
    let newItems = thisItems.filter( (it) => parseInt(it.item_id) != parseInt(item.item_id) );
    
    let addItemAllPrice = 0;
      
    newItems.map( (item) => {
      addItemAllPrice += parseInt(item.price)
    } )
    
    this.setState({
      itemsAdd: newItems,
      addItemAllPrice: addItemAllPrice
    })
    
    setTimeout( () => {
      this.generateTextDescFalse();  
      this.generateTextDescTrue();    
    }, 300 )
  }
  
  priceItemAdd(){
    let thisItems = this.state.itemsAddPrice;
    
    let check = thisItems.find( (item) => parseInt(item.item_id) == parseInt(this.state.priceItem.id) );
    
    if( !check ){
      let thisItem = this.state.items.find( (item) => parseInt(item.id) == parseInt(this.state.priceItem.id) );
      
      thisItems.push({
        item_id: this.state.priceItem.id,
        name: thisItem.name,
        price: this.state.addItemPrice,
      })
      
      this.setState({
        itemsAddPrice: thisItems
      })
    }
    
    setTimeout( () => {
      this.generateTextDescFalse();  
      this.generateTextDescTrue();    
    }, 300 )
  }
  
  delItemPrice(item){
    let thisItems = this.state.itemsAddPrice;
    
    let newItems = thisItems.filter( (it) => parseInt(it.item_id) != parseInt(item.item_id) );
    
    let addItemAllPrice = 0;
      
    newItems.map( (item) => {
      addItemAllPrice += parseInt(item.price)
    } )
    
    this.setState({
      itemsAddPrice: newItems
    })
    
    setTimeout( () => {
      this.generateTextDescFalse();  
      this.generateTextDescTrue();    
    }, 300 )
  }
  
  render(){
    return (
      <>
        <Backdrop className={this.state.classes.backdrop} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Dialog
          open={this.state.modalDialog}
          onClose={ () => { this.setState({ modalDialog: false, modalLink: '' }) } }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Результат операции</DialogTitle>
          <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
            <Typography>{this.state.modalText}</Typography>
            <br />
            { this.state.modalLink == '' ? null :
              <a href={this.state.modalLink} style={{ color: 'red' }}>Скачать</a>
            }
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={ () => { this.setState({ modalDialog: false }) } }>Хорошо</Button>
          </DialogActions>
        </Dialog>
        
        <Grid container>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            
            { this.state.generate_new === true ? null :
              <Grid item xs={12} sm={3}>
                <MyTextInput classes={this.state.classes} value={this.state.promo_name} func={ this.changeData.bind(this, 'promo_name') } label='Название промокода' />
              </Grid>
            }
            { this.state.generate_new === false ? null :
              <Grid item xs={12} sm={3}>
                <MyTextInput classes={this.state.classes} value={this.state.promo_length} func={ this.changeData.bind(this, 'promo_length') } label='Длина промокода' />
              </Grid>
            }
            
            <Grid item xs={12} sm={3}>
              <MyCheckBox classes={this.state.classes} value={this.state.generate_new} func={ this.changeDataCheck.bind(this, 'generate_new') } label='Сгенерировать' />
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <MyTextInput classes={this.state.classes} value={this.state.count_action} func={ this.changeData.bind(this, 'count_action') } label='Количество активаций' />
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <MyTextInput classes={this.state.classes} value={this.state.promo_count} func={ this.changeData.bind(this, 'promo_count') } label='Количество промокодов' />
            </Grid>
            
          </Grid>
          
          <Divider style={{ width: '100%', marginTop: 20 }} />
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            
            <Grid item xs={12} sm={3}>
              <MySelect classes={this.state.classes} data={this.state.promo_action_list} value={this.state.promo_action} func={ this.changeData.bind(this, 'promo_action') } label='Промокод дает:' />
            </Grid>
            
          </Grid>
          
          { parseInt(this.state.promo_action) !== 1 ? null :
            <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
              
              <Grid item xs={12} sm={3}>
                <MySelect classes={this.state.classes} data={this.state.sale_list} value={this.state.type_sale} func={ this.changeData.bind(this, 'type_sale') } label='Скидка' />
              </Grid>
            
              { parseInt(this.state.type_sale) !== 1 ? null :
                <Grid item xs={12} sm={9}>
                  <MyAutocomplite classes={this.state.classes} data={this.state.items} value={this.state.saleItem} func={ (event, data) => { this.changeDataData('saleItem', data) } } multiple={true} label='Товары' />
                </Grid>
              }
              
              { parseInt(this.state.type_sale) !== 2 ? null :
                <Grid item xs={12} sm={9}>
                  <MyAutocomplite classes={this.state.classes} data={this.state.cats} value={this.state.saleCat} func={ (event, data) => { this.changeDataData('saleCat', data) } } multiple={true} label='Категории' />
                </Grid>
              }
            
              <Grid item xs={12} sm={3}>
                <MySelect classes={this.state.classes} data={this.state.promo_sale_list} value={this.state.promo_sale} func={ this.changeData.bind(this, 'promo_sale') } label='Размер скидки' />
              </Grid>
            
              <Grid item xs={12} sm={3}>
                <MySelect classes={this.state.classes} data={this.state.type_sale_list} value={this.state.sale_type} func={ this.changeData.bind(this, 'sale_type') } label='Какая скидка' />
              </Grid>
            
            </Grid>
          }
          
          { parseInt(this.state.promo_action) !== 2 ? null :
            <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
              
              <Grid item xs={12} sm={3}>
                <MyAutocomplite classes={this.state.classes} data={this.state.items} value={this.state.addItem} func={ (event, data) => { this.changeDataData('addItem', data) } } label='Позиция' />
              </Grid>
            
              <Grid item xs={12} sm={3}>
                <MyTextInput classes={this.state.classes} value={this.state.addItemCount} func={ this.changeData.bind(this, 'addItemCount') } label='Количество' />
              </Grid>
            
              <Grid item xs={12} sm={3}>
                <MyTextInput classes={this.state.classes} value={this.state.addItemPrice} func={ this.changeData.bind(this, 'addItemPrice') } label='Цена за все' />
              </Grid>
            
              <Grid item xs={12} sm={3}>
                <Button variant="contained" onClick={this.addItemAdd.bind(this)}>Добавить</Button>
              </Grid>
              
            </Grid>
          }
          
          { parseInt(this.state.promo_action) !== 2 ? null :
            <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
              <Grid item xs={12} sm={6}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Позиция</TableCell>
                      <TableCell>Количество</TableCell>
                      <TableCell>Цена за все</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                    { this.state.itemsAdd.map( (item, key) =>
                      <TableRow key={key}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.count}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell> <CloseIcon onClick={this.delItemAdd.bind(this, item)} style={{ cursor: 'pointer' }} /> </TableCell>
                      </TableRow>
                    ) }
                    
                    
                  </TableBody>
                  
                  <TableFooter>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>{this.state.addItemAllPrice}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableFooter>
                  
                  
                </Table>
              </Grid>  
            </Grid>
          }
          
          { parseInt(this.state.promo_action) !== 3 ? null :
            <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
              
              <Grid item xs={12} sm={3}>
                <MyAutocomplite classes={this.state.classes} data={this.state.items} value={this.state.priceItem} func={ (event, data) => { this.changeDataData('priceItem', data) } } label='Позиция' />
              </Grid>
            
              <Grid item xs={12} sm={3}>
                <MyTextInput classes={this.state.classes} value={this.state.addItemCount} func={ this.changeData.bind(this, 'addItemCount') } label='Цена за 1 ед' />
              </Grid>
            
              <Grid item xs={12} sm={3}>
                <Button variant="contained" onClick={this.priceItemAdd.bind(this)}>Добавить</Button>
              </Grid>
              
            </Grid>
          }
          
          { parseInt(this.state.promo_action) !== 3 ? null :
            <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
              <Grid item xs={12} sm={6}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Позиция</TableCell>
                      <TableCell>Цена за 1 ед</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                    { this.state.itemsAddPrice.map( (item, key) =>
                      <TableRow key={key}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell> <CloseIcon onClick={this.delItemPrice.bind(this, item)} style={{ cursor: 'pointer' }} /> </TableCell>
                      </TableRow>
                    ) }
                    
                  </TableBody>
                </Table>
              </Grid>  
            </Grid>
          }
          
          <Divider style={{ width: '100%', marginTop: 20 }} />
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            
            <Grid item xs={12} sm={4}>
              <MySelect classes={this.state.classes} data={this.state.promo_conditions_list} value={this.state.promo_conditions} func={ this.changeData.bind(this, 'promo_conditions') } label='Условие' />
            </Grid>
            
            { parseInt(this.state.promo_conditions) !== 1 ? null :
              <>
                <Grid item xs={12} sm={8}>
                  <MyAutocomplite classes={this.state.classes} data={this.state.items} value={this.state.conditionItems} func={ (event, data) => { this.changeDataData('conditionItems', data) } } multiple={true} label='Товары' />
                </Grid>
              </>
            }
            
            { parseInt(this.state.promo_conditions) !== 2 ? null :
              <>
                <Grid item xs={12} sm={4}>
                  <MyTextInput classes={this.state.classes} value={this.state.price_start} func={ this.changeData.bind(this, 'price_start') } label='Сумма от' />
                </Grid>
              
                <Grid item xs={12} sm={4}>
                  <MyTextInput classes={this.state.classes} value={this.state.price_end} func={ this.changeData.bind(this, 'price_end') } label='Сумма до' />
                </Grid>
              </>
            }
            
          </Grid>
          
          <Divider style={{ width: '100%', marginTop: 20 }} />
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            
            <Grid item xs={12} sm={3}>
              <MySelect classes={this.state.classes} data={this.state.date_promo_list} value={this.state.date_promo} func={ this.changeData.bind(this, 'date_promo') } label='Когда работает промокод' />
            </Grid>
            
          </Grid>
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            
            <Grid item xs={12} sm={6} className="MyDaterange">
              <MyDaterange startText="Дата от" endText="Дата до" value={this.state.rangeDate} func={ this.changeDateRange.bind(this) } />
            </Grid>
           
            <Grid item xs={12} sm={3}>
              <MyTimePicker classes={this.state.classes} label="Время от" value={this.state.time_start} func={ this.changeData.bind(this, 'time_start') } />
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <MyTimePicker classes={this.state.classes} label="Время до" value={this.state.time_end} func={ this.changeData.bind(this, 'time_end') } />
            </Grid>
              
            
          </Grid>
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            <Grid item xs={12} sm={12}>
              <MyDatePicker multiple={false} label={'Кроме дат'} value={this.state.testDate} func={ this.changeDataData.bind(this, 'testDate') } />
            </Grid>
          </Grid>
          
          <Grid container direction="row" justifyContent="center" style={{ marginTop: 20 }} spacing={3}>
            
            <MyCheckBox classes={this.state.classes} value={this.state.day_1} func={ this.changeDataCheck.bind(this, 'day_1') } label='Понедельник' />
          
            <MyCheckBox classes={this.state.classes} value={this.state.day_2} func={ this.changeDataCheck.bind(this, 'day_2') } label='Вторник' />
          
            <MyCheckBox classes={this.state.classes} value={this.state.day_3} func={ this.changeDataCheck.bind(this, 'day_3') } label='Среда' />
          
            <MyCheckBox classes={this.state.classes} value={this.state.day_4} func={ this.changeDataCheck.bind(this, 'day_4') } label='Четверг' />
          
            <MyCheckBox classes={this.state.classes} value={this.state.day_5} func={ this.changeDataCheck.bind(this, 'day_5') } label='Пятница' />
          
            <MyCheckBox classes={this.state.classes} value={this.state.day_6} func={ this.changeDataCheck.bind(this, 'day_6') } label='Суббота' />
          
            <MyCheckBox classes={this.state.classes} value={this.state.day_7} func={ this.changeDataCheck.bind(this, 'day_7') } label='Воскресенье' />
           
          </Grid>
          
          <Divider style={{ width: '100%', marginTop: 20 }} />
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            
            <Grid item xs={12} sm={4}>
              <MySelect classes={this.state.classes} data={this.state.type_order_list} value={this.state.type_order} func={ this.changeData.bind(this, 'type_order') } label='Тип заказа' />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MySelect classes={this.state.classes} data={this.state.where_order_list} value={this.state.where_order} func={ this.changeData.bind(this, 'where_order') } label='Где работает' />
            </Grid>
            { parseInt(this.state.where_order) !== 1 ? null :
              <Grid item xs={12} sm={4}>
                <MySelect classes={this.state.classes} data={this.state.cities} value={this.state.city} func={ this.changeData.bind(this, 'city') } label='Город' />
              </Grid>
            }
            { parseInt(this.state.where_order) !== 2 ? null :
              <Grid item xs={12} sm={4}>
                <MySelect classes={this.state.classes} data={this.state.points} value={this.state.point} func={ this.changeData.bind(this, 'point') } label='Точка' />
              </Grid>
            }
            
          </Grid>
          
          <Divider style={{ width: '100%', marginTop: 20 }} />
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            
            <Grid item xs={12} sm={4}>
              <MySelect classes={this.state.classes} data={this.state.where_promo_list} value={this.state.where_promo} func={ this.changeData.bind(this, 'where_promo') } label='Что сделать с промокодом' />
            </Grid>
            
            { parseInt(this.state.where_promo) == 1 || parseInt(this.state.where_promo) == 2 ? null :
              parseInt(this.state.where_promo) == 5 ?
              
                <Grid item xs={12} sm={4}>
                  <span>Список номеров для рассылки</span>
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder=""
                    minRows={3}
                    value={this.state.numberList}
                    onChange={ this.changeData.bind(this, 'numberList') }
                    label="Куда отправить"
                    style={{ width: '100%' }}
                  />
                </Grid>
                  :
                <Grid item xs={12} sm={4}>
                  <MyTextInput classes={this.state.classes} value={this.state.numberList} func={ this.changeData.bind(this, 'numberList') } label='Куда отправить' />
                </Grid>
            
            }
            
            
          </Grid>
          
          <Divider style={{ width: '100%', marginTop: 20 }} />
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            
            { parseInt(this.state.where_promo) !== 8 ? null :
              <Grid item xs={12} sm={12}>
                <span>Текст расссылки</span>
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder=""
                  minRows={3}
                  value={this.state.promo_prizw_vk}
                  onChange={ this.changeData.bind(this, 'promo_prizw_vk') }
                  style={{ width: '100%' }}
                />
              </Grid>
            }
            
            { parseInt(this.state.where_promo) == 5 ?
              <Grid item xs={12} sm={12}>
                <MyTextInput classes={this.state.classes} value={this.state.spamNameSMS} func={ this.changeData.bind(this, 'spamNameSMS') } label='Наименование рассылки' />
              </Grid>
                :
              null
            }
            
            { parseInt(this.state.where_promo) == 4 || parseInt(this.state.where_promo) == 5 ?
              <Grid item xs={12} sm={12}>
                <MyTextInput classes={this.state.classes} value={this.state.textSMS} func={ this.changeData.bind(this, 'textSMS') } label='Текст СМС ( --promo_name-- )' />
              </Grid>
                :
              null
            }
            
            { parseInt(this.state.where_promo) == 7 ?
              <Grid item xs={12} sm={12}>
                <MyTextInput classes={this.state.classes} value={this.state.cert_text} func={ this.changeData.bind(this, 'cert_text') } label='Текст для описания сертификата' />
              </Grid>
                :
              null
            }
            
            <Grid item xs={12} sm={12}>
              <MyCheckBox classes={this.state.classes} value={this.state.auto_text} func={ this.changeDataCheck.bind(this, 'auto_text') } label='Авто-текст' />
            </Grid>
            
            <Grid item xs={12} sm={12}>
              <MyTextInput classes={this.state.classes} value={this.state.promo_desc_true} func={ this.changeData.bind(this, 'promo_desc_true') } label='Описание промокода после активации (Промокод дает: )' />
            </Grid>
            
            <Grid item xs={12} sm={12}>
              <MyTextInput classes={this.state.classes} value={this.state.promo_desc_false} func={ this.changeData.bind(this, 'promo_desc_false') } label='Условие промокода, когда условия не соблюдены' />
            </Grid>
            
          </Grid>
          
          
          
          <Grid container direction="row" justifyContent="end" style={{ paddingTop: 50 }} spacing={3}>
            <Button variant="contained" onClick={this.save.bind(this)}>Сохранить</Button>
          </Grid>
          
        </Grid>
      </>
    )
  }
}

class SiteSale2_edit_ extends React.Component {
  click = false;
  
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'site_sale_2',
      module_name: '',
      is_load: false,
      modalText: '',
      
      points: [],
      point: 0,
      cities: [],
      city: 0,
      
      modalDialog: false,
      modalLink: '',
      
      where_promo_list: [
        {id: 1, name: 'Создать'},
        {id: 2, name: 'Создать и показать'},
        {id: 3, name: 'Отправить на почту'},
        {id: 4, name: 'Отправить в смс'},
        {id: 5, name: 'Рассылка смс'},
        {id: 6, name: 'Отправить в ЛК (через 8)'},
        {id: 7, name: 'Создать сертификат(ы)'},
      ],
      promo_action_list: [],
      sale_list: [
        {id: 1, name: 'На товары'},
        {id: 2, name: 'На категории'},
        {id: 3, name: 'На все меню (кроме допов и закусок)'},
      ],
      promo_conditions_list: [
        {id: 1, name: 'В корзине есть определенные товар(ы)'},
        {id: 2, name: 'В корзине набрана определенная сумма'},
      ],
      promo_sale_list: [],
      type_sale_list: [
        {id: 1, name: 'В рублях'},
        {id: 2, name: 'В процентах'},
      ],
      date_promo_list: [
        {id: 1, name: 'В определенные даты'},
        {id: 2, name: '14 дней с 10:00 до 21:40'},
        {id: 3, name: '14 дней с 00:00 до 23:59'},
      ],
      type_order_list: [
        {id: 1, name: 'Все'},
        {id: 2, name: 'Доставка'},
        {id: 3, name: 'Самовывоз'},
        {id: 4, name: 'Зал'},
      ],
      where_order_list: [
        {id: 1, name: 'В городе'},
        {id: 2, name: 'На точке'}
      ],
      
      auto_text: false,
      where_promo: 1,
      promo_name: '',
      generate_new: false,
      count_action: 1,
      promo_action: 1,
      type_sale: 3,
      promo_sale: 1,
      sale_type: 2,
      promo_conditions: 2,
      
      price_start: 0,
      price_end: 0,
      date_promo: 1,
      
      date_start: formatDate(new Date()),
      date_end: formatDate(new Date()),
      rangeDate: [formatDate(new Date()), formatDate(new Date())],
      time_start: '10:00',
      time_end: '21:30',
      
      promo_length: 5,
      promo_count: 1,
      
      day_1: true,
      day_2: true,
      day_3: true,
      day_4: true,
      day_5: true,
      day_6: true,
      day_7: true,
      
      type_order: 1,
      where_order: 1,
      
      numberList: '',
      promo_desc_true: '',
      promo_desc_false: '',
      textSMS: '',
      
      
      addItem: 1,
      addItemCount: 1,
      addItemPrice: 1,
      addItemAllPrice: 0,
      
      itemsAdd: [],
      itemsAddPrice: [],
      items: [],
      cats: [],
      saleCat: [],
      saleItem: [],
      
      priceItem: 1,
      
      conditionItems: [],
      
      testDate: []
    };
  }
  
  async componentDidMount(){
    
    let data = {
      promo_id: this.props.promoId
    }
    
    let res = await this.getData('get_all_for_edit', data);
    
    let items = [];
    
    if( res.promo.promo_conditions_items.length > 4 ){
      res.promo.promo_conditions_items = JSON.parse(res.promo.promo_conditions_items, true);
      
      res.promo.promo_conditions_items.map( (item) => {
        let findItem = res.items.find( (it) => parseInt(it.id) == parseInt(item) );
        
        items.push(findItem)
      } )
    }
    
    setTimeout( () => {
      
      console.log( 'conditionItems', items )
      console.log( 'items', res.items )
      
      let limDate = [];
      
      res.limit.map( (item) => {
        limDate.push( new Date(item.date) )
      } )
      
      this.setState({
        points: res.points,
        cities: res.cities,
        module_name: res.module_info.name,
        promo_action_list: res.promo_action_list,
        promo_sale_list: res.promo_sale_list,
        
        date_start: res.promo.date1,
        date_end: res.promo.date2,
        time_start: res.promo.time1,
        time_end: res.promo.time2,
        rangeDate: [res.promo.date1, res.promo.date2],
        
        items: res.items,
        cats: res.cats,
        
        day_1: parseInt(res.promo.d1) == 1 ? true : false,
        day_2: parseInt(res.promo.d2) == 1 ? true : false,
        day_3: parseInt(res.promo.d3) == 1 ? true : false,
        day_4: parseInt(res.promo.d4) == 1 ? true : false,
        day_5: parseInt(res.promo.d5) == 1 ? true : false,
        day_6: parseInt(res.promo.d6) == 1 ? true : false,
        day_7: parseInt(res.promo.d7) == 1 ? true : false,
        
        count_action: res.promo.count,
        promo_name: res.promo.name,
        
        price_start: res.promo.promo_summ,
        price_end: res.promo.promo_summ_to,
        
        conditionItems: items,
        promo_conditions: items.length > 0 ? 1 : 2,
        
        point: res.promo.point_id,
        city: res.promo.city_id,
        
        where_order: parseInt(res.promo.city_id) > 0 ? 1 : parseInt(res.promo.point_id) > 0 ? 2 : 1,
        
        type_order: res.promo.type_order,
        
        promo_desc_true: res.promo.coment,
        promo_desc_false: res.promo.condition_text,
        
        promo_id: res.promo.id,
        
        testDate: limDate
      })
    }, 300 )
    
    
    document.title = res.module_info.name;
    
    setTimeout( () => {
      this.generateTextDescFalse();     
      this.generateTextDescTrue(); 
    }, 300 )
  }
  
  async save(){
    
    if( !this.click ){
      this.click = true;  
      
      let conditionItems = [];
      
      this.state.conditionItems.map( (item) => {
        conditionItems.push(item.id)
      } )
      
      
      let promo_items = [];
      
      
      let promo_cat = [];
      let dateList = [];
      
      this.state.testDate.map( (item) => {
        dateList.push( (new Date(item).toISOString()).split('T')[0] );
      } )
      
      dateList = dateList.join(',')
      
      let data = {
        promo_id: this.state.promo_id,
        cert_text: this.state.cert_text,
        addr: this.state.numberList,
        where_promo: this.state.where_promo,
        promo_count: this.state.promo_count,
        promo_len: this.state.promo_length,
        promo_name: this.state.promo_name,
        generate: this.state.generate_new ? 1 : 0,
        promo_in_count: this.state.count_action,
        promo_action: this.state.promo_action,
        promo_type_sale: this.state.type_sale,
        promo_type: this.state.sale_type,
        promo_conditions: this.state.promo_conditions,
        
        promo_summ: this.state.price_start,
        promo_summ_to: this.state.price_end,
        promo_when: this.state.date_promo,
        
        date_start: this.state.date_start,
        date_end: this.state.date_end,
        time_start: this.state.time_start,
        time_end: this.state.time_end,
        
        day_1: this.state.day_1 ? 1 : 0,
        day_2: this.state.day_2 ? 1 : 0,
        day_3: this.state.day_3 ? 1 : 0,
        day_4: this.state.day_4 ? 1 : 0,
        day_5: this.state.day_5 ? 1 : 0,
        day_6: this.state.day_6 ? 1 : 0,
        day_7: this.state.day_7 ? 1 : 0,
        
        promo_type_order: this.state.type_order,
        promo_where: this.state.where_order,
        
        numberList: this.state.numberList,
        
        promo_city: this.state.city,
        promo_point: this.state.point,
        
        about_promo_text: this.state.promo_desc_true,
        condition_promo_text: this.state.promo_desc_false,
        textSMS: this.state.textSMS,
        
        
        promo_items: JSON.stringify(promo_items),
        promo_cat: JSON.stringify(promo_cat),
        promo_items_add: JSON.stringify(this.state.itemsAdd),
        promo_items_sale: JSON.stringify(this.state.itemsAddPrice),
        promo_conditions_items: JSON.stringify(conditionItems),
        
        date_between: dateList
      };
      
      let res = await this.getData('save_edit_promo', data);
      
      console.log( res )
      
      this.setState({
        modalDialog: true,
        modalText: res.text
      })
      
      setTimeout( () => {
        this.click = false;    
      }, 300 )
    }
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
      
      setTimeout( () => {
        this.setState({
          is_load: false
        })
        
        this.click = false;    
      }, 300 )
    });
  }
  
  changeData(type, event){
    this.setState({
      [ type ]: event.target.value
    })
    
    if( type == 'date_promo' && (event.target.value == 2 || event.target.value == 3) ){
      let thisDay = new Date();
      let nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 14);
      
      this.setState({
        rangeDate: [formatDate(thisDay), formatDate(nextDay)],
        date_start: formatDate(thisDay),
        date_end: formatDate(nextDay),
        
        time_start: event.target.value == 2 ? '10:00' : '00:00',
        time_end: event.target.value == 2 ? '21:40' : '23:59',
      })
    }
    
    setTimeout( () => {
      this.generateTextDescFalse();   
      this.generateTextDescTrue();   
    }, 300 )
  }
  
  changeDataCheck(type, event){
    this.setState({
      [ type ]: event.target.checked
    })
    
    setTimeout( () => {
      this.generateTextDescFalse();    
      this.generateTextDescTrue();  
    }, 300 )
  }
  
  changeDateRange(data){
    let dateStart = data[0] ? formatDate(data[0]) : '';
    let dateEnd = data[1] ? formatDate(data[1]) : '';
    
    this.setState({
      rangeDate: [dateStart, dateEnd],
      date_start: dateStart,
      date_end: dateEnd,
    })
    
    setTimeout( () => {
      this.generateTextDescFalse();  
      this.generateTextDescTrue();    
    }, 300 )
  }
  
  changeDataData(type, data){
    this.setState({
      [ type ]: data
    });
    
    setTimeout( () => {
      this.generateTextDescFalse();  
      this.generateTextDescTrue();    
    }, 300 )
  }
  
  generateTextDescTrue(){
    
    if( !this.state.auto_text ){
      return ;
    }
    
    let promo_action = this.state.promo_action;
    let textTrue = '';
    
    if(parseInt(promo_action) == 1){//скидка
      var promo_type_sale = this.state.type_sale,
        count_promo = this.state.promo_sale_list.find( (item) => parseInt(item.id) == parseInt(this.state.promo_sale) )['name'],//размер скидки
        promo_type = this.state.sale_type; //1 - рубли 2 %

      if(parseInt(promo_type_sale) == 1){//товары
        var promo_items = this.state.saleItem,
          items = '';

        promo_items.map(function(item, key){
          items += item.name+', ';
        })

        items = items.substring(0, items.length - 2);

        textTrue = 'скидку на '+items+' в размере '+count_promo+(parseInt(promo_type) == 1 ? 'руб.' : '%');
      }	
      if(parseInt(promo_type_sale) == 2){//категории
        var promo_items = this.state.saleCat,
          items = '';

        promo_items.map(function(item, key){
          items += item.name+', ';
        })

        items = items.substring(0, items.length - 2);

        textTrue = 'скидку на '+items+' в размере '+count_promo+(parseInt(promo_type) == 1 ? 'руб.' : '%');
      }
      if(parseInt(promo_type_sale) == 3){//все
        textTrue = 'скидку на всё меню, кроме напитков, соусов, приправ и палочек, в размере '+count_promo+(parseInt(promo_type) == 1 ? 'руб.' : '%');
      }
    }
    
    if(parseInt(promo_action) == 2){//добавляет товар
      var itemText = '';

      this.state.itemsAdd.map( (item, key) => {
        if(parseInt(item['price']) == 0){
          itemText += 'бесплатную '+item['name']+' '+item['count']+'шт. '+'за '+item['price']+'руб., ';
        }else{
          itemText += item['name']+' '+item['count']+'шт. '+'за '+item['price']+'руб., ';
        }
      } )
      
      itemText = itemText.substring(0, item.length - 2);

      textTrue = this.state.itemsAdd.length == 1 ? 'позицию '+itemText : 'позиции '+itemText;
    }	
    
    if(parseInt(promo_action) == 3){//товар за цену
      var itemText = '';

      this.state.promo_items_sale.map( (item, key) => {
        itemText += item['name']+' по '+item['price']+'руб., ';
      } )
      
      itemText = itemText.substring(0, itemText.length - 2);

      textTrue = this.state.promo_items_sale.length-1 == 1 ? 'позицию '+itemText : 'позиции '+itemText;
    }
    
    let textSMS = 'Промокод --promo_name--, действует до '+formatDateName(this.state.date_end)+'. Заказывай на jacofood.ru!'
    
    this.setState({
      promo_desc_true: textTrue,
      textSMS: textSMS,
      cert_text: textTrue
    })
  }
  
  generateTextDescFalse(){
    
    if( !this.state.auto_text ){
      return ;
    }
    
    var dop_text = '';
		
		if( parseInt(this.state.where_order) == 1 ){
			//город
			if( parseInt(this.state.city) != 0 ){
        let city_name = this.state.cities.find( (item) => parseInt(item.id) == parseInt(this.state.city) )['name'];
        
				dop_text = ' в г. '+city_name;
			}
		}
		
		if( parseInt(this.state.where_order) == 2 ){
			//точка
			if( parseInt(this.state.point) != 0 ){
        let point_name = this.state.points.find( (item) => parseInt(item.id) == parseInt(this.state.point) )['name'];
        
				dop_text = ' в г. '+point_name;
			}
		}
    
    let dateStart = formatDateDot(this.state.date_start);
    let dateEnd = formatDateDot(this.state.date_end);
    
    let textFalse = 'Промокод действует c '+dateStart+' до '+dateEnd+' с '+this.state.time_start+' до '+this.state.time_end+dop_text;
    
    this.setState({
      promo_desc_false: textFalse
    })
	}
  
  addItemAdd(){
    let thisItems = this.state.itemsAdd;
    
    let check = thisItems.find( (item) => parseInt(item.item_id) == parseInt(this.state.addItem) );
    
    if( !check ){
      let thisItem = this.state.items.find( (item) => parseInt(item.id) == parseInt(this.state.addItem) );
      
      thisItems.push({
        item_id: this.state.addItem,
        name: thisItem.name,
        count: this.state.addItemCount,
        price: this.state.addItemPrice,
      })
      
      let addItemAllPrice = 0;
      
      thisItems.map( (item) => {
        addItemAllPrice += parseInt(item.price)
      } )
      
      this.setState({
        itemsAdd: thisItems,
        addItemAllPrice: addItemAllPrice
      })
    }
  }
  
  priceItemAdd(){
    let thisItems = this.state.itemsAddPrice;
    
    let check = thisItems.find( (item) => parseInt(item.item_id) == parseInt(this.state.priceItem) );
    
    if( !check ){
      let thisItem = this.state.items.find( (item) => parseInt(item.id) == parseInt(this.state.priceItem) );
      
      thisItems.push({
        item_id: this.state.priceItem,
        name: thisItem.name,
        price: this.state.addItemPrice,
      })
      
      this.setState({
        itemsAddPrice: thisItems
      })
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
          onClose={ () => { this.setState({ modalDialog: false, modalLink: '' }) } }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Результат операции</DialogTitle>
          <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
            <Typography>{this.state.modalText}</Typography>
            <br />
            { this.state.modalLink == '' ? null :
              <a href={this.state.modalLink} style={{ color: 'red' }}>Скачать</a>
            }
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={ () => { this.setState({ modalDialog: false }) } }>Хорошо</Button>
          </DialogActions>
        </Dialog>
        
        <Grid container>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            
            <Grid item xs={12} sm={3}>
              <Typography>Промокод: {this.state.promo_name}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <MyTextInput classes={this.state.classes} value={this.state.count_action} func={ this.changeData.bind(this, 'count_action') } label='Количество активаций' />
            </Grid>
            
          </Grid>
          
          <Divider style={{ width: '100%', marginTop: 20 }} />
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            
            <Grid item xs={12} sm={4}>
              <MySelect classes={this.state.classes} data={this.state.promo_conditions_list} value={this.state.promo_conditions} func={ this.changeData.bind(this, 'promo_conditions') } label='Условие' />
            </Grid>
            
            { parseInt(this.state.promo_conditions) !== 1 ? null :
              <>
                <Grid item xs={12} sm={8}>
                  <MyAutocomplite classes={this.state.classes} data={this.state.items} value={this.state.conditionItems} func={ (event, data) => { this.changeDataData('conditionItems', data) } } multiple={true} label='Товары' />
                </Grid>
              </>
            }
            
            { parseInt(this.state.promo_conditions) !== 2 ? null :
              <>
                <Grid item xs={12} sm={4}>
                  <MyTextInput classes={this.state.classes} value={this.state.price_start} func={ this.changeData.bind(this, 'price_start') } label='Сумма от' />
                </Grid>
              
                <Grid item xs={12} sm={4}>
                  <MyTextInput classes={this.state.classes} value={this.state.price_end} func={ this.changeData.bind(this, 'price_end') } label='Сумма до' />
                </Grid>
              </>
            }
            
          </Grid>
          
          <Divider style={{ width: '100%', marginTop: 20 }} />
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            
            <Grid item xs={12} sm={3}>
              <MySelect classes={this.state.classes} data={this.state.date_promo_list} value={this.state.date_promo} func={ this.changeData.bind(this, 'date_promo') } label='Когда работает промокод' />
            </Grid>
            
          </Grid>
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            
            <Grid item xs={12} sm={6} className="MyDaterange">
              <MyDaterange startText="Дата от" endText="Дата до" value={this.state.rangeDate} func={ this.changeDateRange.bind(this) } />
            </Grid>
           
            <Grid item xs={12} sm={3}>
              <MyTimePicker classes={this.state.classes} label="Время от" value={this.state.time_start} func={ this.changeData.bind(this, 'time_start') } />
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <MyTimePicker classes={this.state.classes} label="Время до" value={this.state.time_end} func={ this.changeData.bind(this, 'time_end') } />
            </Grid>
              
          </Grid>
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            <Grid item xs={12} sm={12}>
              <MyDatePicker multiple={false} label={'Кроме дат'} value={this.state.testDate} func={ this.changeDataData.bind(this, 'testDate') } />
            </Grid>
          </Grid>
            
          <Grid container direction="row" justifyContent="center" style={{ marginTop: 20 }} spacing={3}>
            
            <MyCheckBox classes={this.state.classes} value={this.state.day_1} func={ this.changeDataCheck.bind(this, 'day_1') } label='Понедельник' />
          
            <MyCheckBox classes={this.state.classes} value={this.state.day_2} func={ this.changeDataCheck.bind(this, 'day_2') } label='Вторник' />
          
            <MyCheckBox classes={this.state.classes} value={this.state.day_3} func={ this.changeDataCheck.bind(this, 'day_3') } label='Среда' />
          
            <MyCheckBox classes={this.state.classes} value={this.state.day_4} func={ this.changeDataCheck.bind(this, 'day_4') } label='Четверг' />
          
            <MyCheckBox classes={this.state.classes} value={this.state.day_5} func={ this.changeDataCheck.bind(this, 'day_5') } label='Пятница' />
          
            <MyCheckBox classes={this.state.classes} value={this.state.day_6} func={ this.changeDataCheck.bind(this, 'day_6') } label='Суббота' />
          
            <MyCheckBox classes={this.state.classes} value={this.state.day_7} func={ this.changeDataCheck.bind(this, 'day_7') } label='Воскресенье' />
           
          </Grid>
          
          <Divider style={{ width: '100%', marginTop: 20 }} />
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            
            <Grid item xs={12} sm={4}>
              <MySelect classes={this.state.classes} data={this.state.type_order_list} value={this.state.type_order} func={ this.changeData.bind(this, 'type_order') } label='Тип заказа' />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MySelect classes={this.state.classes} data={this.state.where_order_list} value={this.state.where_order} func={ this.changeData.bind(this, 'where_order') } label='Где работает' />
            </Grid>
            { parseInt(this.state.where_order) !== 1 ? null :
              <Grid item xs={12} sm={4}>
                <MySelect classes={this.state.classes} data={this.state.cities} value={this.state.city} func={ this.changeData.bind(this, 'city') } label='Город' />
              </Grid>
            }
            { parseInt(this.state.where_order) !== 2 ? null :
              <Grid item xs={12} sm={4}>
                <MySelect classes={this.state.classes} data={this.state.points} value={this.state.point} func={ this.changeData.bind(this, 'point') } label='Точка' />
              </Grid>
            }
            
          </Grid>
          
          <Divider style={{ width: '100%', marginTop: 20 }} />
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            
            <Grid item xs={12} sm={12}>
              <MyTextInput classes={this.state.classes} value={this.state.promo_desc_true} func={ this.changeData.bind(this, 'promo_desc_true') } label='Описание промокода после активации (Промокод дает: )' />
            </Grid>
            
            <Grid item xs={12} sm={12}>
              <MyTextInput classes={this.state.classes} value={this.state.promo_desc_false} func={ this.changeData.bind(this, 'promo_desc_false') } label='Условие промокода, когда условия не соблюдены' />
            </Grid>
            
          </Grid>
          
          
          
          <Grid container direction="row" justifyContent="end" style={{ paddingTop: 50 }} spacing={3}>
            <Button variant="contained" onClick={this.save.bind(this)}>Сохранить</Button>
          </Grid>
          
        </Grid>
      </>
    )
  }
}


class SiteSale2_ extends React.Component {
  click = false;
  
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'site_sale_2',
      module_name: '',
      is_load: false,
      modalText: '',
      
      modalDialog: false,
      modalLink: '',
      
      city_list: [],
      city_id: 0,
      promoName: '',
      
      findPromoList: []
    };
  }
  
  async componentDidMount(){
    
    let data = await this.getData('get_all');
    
    console.log( data )
    
    this.setState({
      module_name: data.module_info.name,
      city_list: data.all_city_list
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
      
      setTimeout( () => {
        this.setState({
          is_load: false
        })
      }, 300 )
    });
  }
  
  async showPromoList(){
    let data = {
      city_id: this.state.city_id,
      promo_name: this.state.promoName
    };
    
    let res = await this.getData('search_promo', data);
    
    console.log( res )
    
    this.setState({
      findPromoList: res
    })
  }
  
  async delPromo(promo_id){
    let check = confirm("Удалить промокод ?");
    
    if( check ){
      let data = {
        promo_id: promo_id
      };
      
      let res = await this.getData('remove_promo', data);
      
      setTimeout( () => {
        this.showPromoList();
      }, 300 )
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
          onClose={ () => { this.setState({ modalDialog: false, modalLink: '' }) } }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Результат операции</DialogTitle>
          <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
            <Typography>{this.state.modalText}</Typography>
            <br />
            { this.state.modalLink == '' ? null :
              <a href={this.state.modalLink} style={{ color: 'red' }}>Скачать</a>
            }
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={ () => { this.setState({ modalDialog: false }) } }>Хорошо</Button>
          </DialogActions>
        </Dialog>
        
        <Grid container>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            
            <Grid item xs={12}>
              
              <Link to={"/site_sale_2/new"} style={{ zIndex: 10 }}>
                <Button variant="contained">Новый промокод</Button>
              </Link>
              
              <Link to={"/site_sale_2/stat"} style={{ zIndex: 10, marginLeft: 20 }}>
                <Button variant="contained">Статистика</Button>
              </Link>
              
            </Grid>
            
            
            
            <Grid item xs={12} sm={4}>
              <MySelect classes={this.state.classes} data={this.state.city_list} value={this.state.city_id} func={ (event) => { this.setState({city_id: event.target.value}) } } label='Город' />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <MyTextInput classes={this.state.classes} value={this.state.promoName} func={ (event) => { this.setState({promoName: event.target.value}) } } label='Промокод' />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Button variant="contained" onClick={this.showPromoList.bind(this)}>Найти</Button>
            </Grid>
            
          </Grid>  
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            <Grid item xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Промокод</TableCell>
                    <TableCell>Город</TableCell>
                    <TableCell>Было кол-во</TableCell>
                    <TableCell>Ост. кол-во</TableCell>
                    <TableCell>Дата окончания</TableCell>
                    <TableCell>Описание</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                  { this.state.findPromoList.map( (item, key) =>
                    <TableRow key={key}>
                      <TableCell>
                        <Link to={"/site_sale_2/edit/"+item.id} style={{ zIndex: 10 }}>
                          {item.name}    
                        </Link>
                      </TableCell>
                      <TableCell>{ parseInt(item.city_id) == 0 ? 'Все города' : item.city_name }</TableCell>
                      <TableCell>{item.def_count}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>{item.date2}</TableCell>
                      <TableCell>{item.coment}</TableCell>
                      <TableCell> <CloseIcon style={{ cursor: 'pointer' }} onClick={this.delPromo.bind(this, item.id)} /> </TableCell>
                    </TableRow>
                  ) }
                  
                </TableBody>
              </Table>
            </Grid>  
          </Grid>
          
          
        </Grid>
      </>
    )
  }
}

class SiteSale2_Stat_ extends React.Component {
  click = false;
  
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'site_sale_2',
      module_name: '',
      is_load: false,
      
      spam_list: [],
      spam_id: 0,
      findPromoList: [],
      
      spam_list_data: [],
      spam_list_data_stat: {
        true: 0,
        all: 0,
        percent: 0
      },
    };
  }
  
  async componentDidMount(){
    
    let data = await this.getData('get_spam_list');
    
    console.log( data )
    
    this.setState({
      module_name: data.module_info.name,
      spam_list: data.spam_list
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
      
      setTimeout( () => {
        this.setState({
          is_load: false
        })
      }, 300 )
    });
  }
  
  async show(){
    let data = {
      spam_id: this.state.spam_id
    }
    
    let res = await this.getData('get_spam_data', data);
    
    console.log( res )
    
    this.setState({
      spam_list_data: res.spam_list,
      spam_list_data_stat: res.stat
    })
  }
  
  changeSpam(event){
    this.setState({spam_id: event.target.value})
    
    setTimeout( () => {
      this.show()
    }, 300 )
  }
  
  render(){
    return (
      <>
        <Backdrop className={this.state.classes.backdrop} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Grid container>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          
          
          <Grid container direction="row" style={{ paddingTop: 20 }} spacing={3}>
            
            <Grid item xs={12} sm={4}>
              <MySelect classes={this.state.classes} data={this.state.spam_list} value={this.state.spam_id} func={ this.changeSpam.bind(this) } label='Рассылка' />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Button variant="contained" onClick={this.show.bind(this)}>Обновить</Button>
            </Grid>
            
          </Grid>  
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }} spacing={3}>
            
            <Grid item xs={6}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Всего</TableCell>
                    <TableCell>Использовали</TableCell>
                    <TableCell>%</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                  <TableRow>
                    <TableCell>{this.state.spam_list_data_stat.all}</TableCell>
                    <TableCell>{this.state.spam_list_data_stat.true}</TableCell>
                    <TableCell>{this.state.spam_list_data_stat.percent}</TableCell>
                  </TableRow>
                  
                </TableBody>
              </Table>
            </Grid>  
            
            <Grid item xs={6}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Номер</TableCell>
                    <TableCell>Ост активаций</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                  { this.state.spam_list_data.map( (item, key) =>
                    <TableRow key={key}>
                      <TableCell>{key+1}</TableCell>
                      <TableCell>{item.number}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      
                    </TableRow>
                  ) }
                  
                </TableBody>
              </Table>
            </Grid>  
          </Grid>
          
          
        </Grid>
      </>
    )
  }
}

export function SiteSale2_New () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <SiteSale2_new_ classes={classes} history={history} />
  );
}

export function SiteSale2_Edit () {
  const classes = useStyles();
  let history = useHistory();
  
  let { promoId } = useParams();
  
  return (
    <SiteSale2_edit_ promoId={promoId} classes={classes} history={history} />
  );
}

export function SiteSale2 () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <SiteSale2_ classes={classes} history={history} />
  );
}

export function SiteSale2_Stat () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <SiteSale2_Stat_ classes={classes} history={history} />
  );
}