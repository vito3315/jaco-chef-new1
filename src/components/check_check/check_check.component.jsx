import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

import Paper from '@mui/material/Paper';

//import VisibilityIcon from '@mui/icons-material/Visibility';
//import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//import List from '@mui/material/List';
//import ListItem from '@mui/material/ListItem';
//import ListItemText from '@mui/material/ListItemText';

import Dialog from '@mui/material/Dialog';
//import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//import Accordion from '@mui/material/Accordion';
//import AccordionSummary from '@mui/material/AccordionSummary';
//import AccordionDetails from '@mui/material/AccordionDetails';
//import Typography from '@mui/material/Typography';
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//import Backdrop from '@mui/material/Backdrop';
//import CircularProgress from '@mui/material/CircularProgress';

//import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import {
  MySelect,
  MyDatePickerNew,
  MyCheckBox,
  MyAutocomplite,
  MyTextInput,
} from '../../stores/elements';
import { AlignHorizontalLeftRounded } from '@mui/icons-material';
//import { restore } from 'ignore-styles';

const queryString = require('query-string');

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

class CheckCheckTable extends React.Component {
  shouldComponentUpdate(nextProps) {
    // var array1 = nextProps.users;
    // var array2 = this.props.users;

    // var is_same = (array1.length == array2.length) && array1.every(function(element, index) {
    //     return element === array2[index];
    // });

    // console.log(this.props)

    return true;
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Номер заказа</TableCell>
              <TableCell>Точка</TableCell>
              <TableCell>Тип заказа</TableCell>
              <TableCell>Номер кассы</TableCell>
              <TableCell>Сумма заказа</TableCell>
              <TableCell>Дата/Время заказа</TableCell>
              <TableCell>Найти заказ</TableCell>
              <TableCell>Сохранить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.orders.map((item, key) => (
              <TableRow key={key}>
                <TableCell>{key + 1}</TableCell>
                <TableCell>
                <MyTextInput
                    value = {item.order_id}
                    // func={ this.changeItem.bind(this, 'name_for_vendor') }
                  /> 
                </TableCell>
                <TableCell>{item.addr}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.kassa}</TableCell>
                <TableCell>{item.sum}</TableCell>
                <TableCell>{item.date} {item.time}</TableCell>
                <TableCell>
                  <Button onClick={this.props.openModal.bind(this, item.sum, item.date, key, item.point_id  )}>
                    <OpenInNewIcon className="icon" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={this.props.saveOrder.bind(this, item.id, item.order_id, item.point_id  )}>
                    <SaveIcon className="icon" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

class CheckModalTable extends React.Component {
  shouldComponentUpdate(nextProps) {
    // var array1 = nextProps.users;
    // var array2 = this.props.users;

    // var is_same = (array1.length == array2.length) && array1.every(function(element, index) {
    //     return element === array2[index];
    // });
    console.log('orders_in', this.props.orders);
    return true;
  }

  

  render() {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Номер заказа</TableCell>
              <TableCell>Точка</TableCell>
              <TableCell>Дата/Время заказа</TableCell>
              <TableCell>Тип заказа</TableCell>
              <TableCell>Сумма заказа</TableCell>
              <TableCell>Выбрать</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.orders.map((item, key) => (
              <TableRow key={key}>
                <TableCell>{key + 1}</TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.addr}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.sum}</TableCell>
                <TableCell>
                  <Button style={{cursor: 'pointer'}} onClick={this.props.selectOrder.bind(this, item.id)} > 
                    <CheckCircleIcon className="icon" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

class CheckCheck_ extends React.Component {
  constructor(props) {
    super(props);

    //todo
    let date_start =  new Date();
    date_start.setDate(date_start.getDate() - 5);

    this.state = {
      module: 'check_check',
      module_name: 'Проверка чеков',
      is_load: false,

      point_list: [
        { id: -1, name: 'Все точки' },
        {
          base: 'jaco_rolls_1',
          name: 'Тольятти, Ленинградская 47',
          id: '1',
          city_id: '1',
        },
        {
          base: 'jaco_rolls_2',
          name: 'Тольятти, Ворошилова 12а',
          id: '2',
          city_id: '1',
        },
        {
          base: 'jaco_rolls_3',
          name: 'Тольятти, Матросова 32',
          id: '3',
          city_id: '1',
        },
        {
          base: 'jaco_rolls_6',
          name: 'Тольятти, Цветной 1',
          id: '6',
          city_id: '1',
        },
        {
          base: 'jaco_rolls_4',
          name: 'Самара, Куйбышева 113',
          id: '4',
          city_id: '2',
        },
        {
          base: 'jaco_rolls_5',
          name: 'Самара, Победы 10',
          id: '5',
          city_id: '2',
        },
        {
          base: 'jaco_rolls_7',
          name: 'Самара, Молодёжная 2',
          id: '7',
          city_id: '2',
        },
      ],
      point_id: 0,
      type : 0,
      select_list: [
        { id: '1', name: 'выгрузить из налоговой' },
        { id: '2', name: 'удалить все данные' },
        { id: '3', name: 'очистить для 1с' },
        { id: '4', name: 'выгрузить для 1с' },
        { id: '5', name: 'сверить сумму за месяц' },
        { id: '6', name: 'сверить сумму по дням' },
        { id: '7', name: 'есть у нас, но нету в налоговой' },
        { id: '8', name: 'не завершенные заказы' },
        { id: '9', name: 'очистить для 1с' },
      ],

      date_start: formatDate(date_start),
      date_end: formatDate(new Date()),

      /*
      allOrder: [
        {
          id: '1',
          number: '123456',
          date_order: '09.09.2022/15:24',
          type: 'Доставка',
          sum: '1000',
          order_box: '1',
        },
        {
          id: '2',
          number: '223456',
          date_order: '09.09.2022/10:57',
          type: 'Доставка',
          sum: '2000',
          order_box: '2',
        },
        {
          id: '3',
          number: '323456',
          date_order: '08.09.2022/17:13',
          type: 'В зале',
          sum: '3000',
          order_box: '1',
        },
        {
          id: '4',
          number: '423456',
          date_order: '07.09.2022/14:28',
          type: 'На вынос',
          sum: '1500',
          order_box: '2',
        },
        {
          id: '5',
          number: '523456',
          date_order: '06.09.2022/18:20',
          type: 'Доставка',
          sum: '5000',
          order_box: '2',
        },
      ],
      */
      allOrder: [],
      orders: [],
      order: {},

      modalOrder: false,

      number_order: {},
     
    };
  }

  getData = (method, data = {}, is_load = true) => {
    
    if( is_load == true ){
      this.setState({
        is_load: true
      })
    }
    
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
      setTimeout( () => {
        this.setState({
          is_load: false
        })
      }, 300 )
      console.log( err )
    });
  }

  async componentDidMount(){
    console.log('test');
  }

  // функция которая присваивает значение в модуле
  changeSort(type, event, data) {
    // автокомлит для должностей - нужен в этом модуле???
    if (type == 'app_id') {
      this.setState({
        app_id: data != null ? data.id : 0,
        app_filter: data,
      });
    } else {
      this.setState({
        [type]: event.target.value,
      });
    }

    // setTimeout(() => {
    //     this.getUsers();
    // }, 300)
  }

  changeDateRange(data, event) {
    this.setState({
      [data]: formatDate(event),
    });
  }

  // открыть todo
  async openOrder(id) {
    //const res = this.state.allOrder.find((el) => el.id === id);
    console.log('pointt_id',this.state.point_id);
    console.log('type',this.state.type);
    let data = {
      date_start  : this.state.date_start,
      date_end    : this.state.date_end,
      point_id    : this.state.point_id,
      type        : this.state.type
    };

    let res = await this.getData('show', data);
    if(!res.st){
      alert(res.text); 
      return false;
    }
    
    console.log('res_type',res.type);

    // отображаем соообщение при удалении
    if(res.to_del){
      alert(res.text);
    }
    /* */
    
    if(res.orders){
      this.setState({
        allOrder: res.orders,
        // chose_app: res.user.app_id,
        //modalOrder: true,
      });
    }
    
  }

  // выбор заказа в модалке (передача order_id)
  selectOrder(order_id) {
    /*
    const number_order = this.state.allOrder;

    const res = this.state.allOrder.find((el) => el.id === id);

    number_order.map((el) =>
      this.state.order.id === el.id ? (el.number_order = res.number) : null
    );
    */
    let allOrder = this.state.allOrder;
    let row_numb = this.state.row_numb;
  
    allOrder.map((el, i) => 
      row_numb === i ?  el.order_id = order_id : 0
    )

    this.setState({
      allOrder: allOrder,
      // chose_app: res.user.app_id,
      modalOrder: false,
    });
  }


  // модалка заказов
  async openModal(sum, date, row_numb, point_id) {
    
    let data = {
      sum         : sum,
      point_id    : point_id,
      date        : date,
      type        : this.state.type,
    };

    console.log('modal_data', data)
    console.log('row_numb', row_numb)
    let res = await this.getData('find_order', data);

    console.log('res', res)
    this.setState({
      modalOrder: true,
      orders    : res.orders,
      row_numb : row_numb,
    });
  }

 // сохранении order_id
 async saveOrder(id, order_id, point_id) {
    let data = {
      id         : id,
      order_id   : order_id,
      point_id   : point_id,
    };

    console.log('data', data); 
    let res = await this.getData('saveItem', data);

    if(res.st == true){
      console.log('save ok'); 
      this.openOrder();
      alert('Данные сохранены');
    } else{
      console.log('save err'); 
      alert(res.text);
    }
  
 }

  render() {
    return (
      <>
      
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyDatePickerNew
              label="Начало периода"
              value={this.state.date_start}
              func={this.changeDateRange.bind(this, 'date_start')}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyDatePickerNew
              label="Конец периода"
              value={this.state.date_end}
              func={this.changeDateRange.bind(this, 'date_end')}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <MySelect
              data={this.state.point_list}
              value={this.state.point_id.id}
              func={this.changeSort.bind(this, 'point_id')}
              label="Точка"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <MySelect
              data={this.state.select_list}
              value={this.state.type}
              func={ this.changeSort.bind(this, 'type') }
              label="Селект"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <Button
              onClick={this.openOrder.bind(this)}
              variant="contained"
            >
              Выполнить
            </Button>
          </Grid>

          <Grid item xs={12}>
            {this.state.allOrder.length > 0 ? (
              <CheckCheckTable
                orders={this.state.allOrder}
                openModal={this.openModal.bind(this)}
                saveOrder={this.saveOrder.bind(this)}
              />
            ) : null}
          </Grid>
        </Grid>

        <Dialog
          open={this.state.modalOrder}
          fullWidth={true}
          maxWidth={'md'}
          onClose={() => {
            this.setState({ modalOrder: false });
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>Заказы</DialogTitle>
          <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
            <Grid container spacing={3}>
              {this.state.orders && this.state.modalOrder === true ? (
                <CheckModalTable
                  orders={this.state.orders}
                  selectOrder={this.selectOrder.bind(this)}
                  
                />
              ) : null}
            </Grid>
          </DialogContent>
          {/* <DialogActions>
            <Button 
            // onClick={this.checkArt.bind(this)} 
            color="primary"
            >Выбрать</Button>
          </DialogActions> */}
        </Dialog>
      </>
    );
  }
}

export function CheckCheck() {
  return <CheckCheck_ />;
}
