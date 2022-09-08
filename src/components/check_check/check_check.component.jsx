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

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import {
  MySelect,
  MyDatePickerNew,
  MyCheckBox,
  MyAutocomplite,
  MyTextInput,
} from '../../stores/elements';

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
              <TableCell>Тип заказа</TableCell>
              <TableCell>Номер кассы</TableCell>
              <TableCell>Сумма заказа</TableCell>
              <TableCell>Дата/Время заказа</TableCell>
              <TableCell>Найти заказ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.orders.map((item, key) => (
              <TableRow key={key}>
                <TableCell>{key + 1}</TableCell>
                <TableCell>
                <MyTextInput
                    value = {item.number_order}
                    // func={ this.changeItem.bind(this, 'name_for_vendor') }
                  /> 
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.order_box}</TableCell>
                <TableCell>{item.sum}</TableCell>
                <TableCell>{item.date_order}</TableCell>
                <TableCell>
                  <Button onClick={this.props.openOrder.bind(this, item.id)}>
                    <OpenInNewIcon className="icon" />
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
                <TableCell>{item.number}</TableCell>
                <TableCell>{item.date_order}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.sum}</TableCell>
                <TableCell>
                  <Button onClick={this.props.selectOrder.bind(this, item.id)}>
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

      select_list: [
        { id: '1', name: 'выгрузить из налоговой' },
        { id: '2', name: 'очистить для 1с' },
        { id: '3', name: 'выгрузить для 1с' },
        { id: '4', name: 'сверить сумму за месяц' },
        { id: '5', name: 'сверить сумму по дням' },
        { id: '6', name: 'есть у нас, но нету в налоговой' },
        { id: '7', name: 'не завершенные заказы' },
        { id: '8', name: 'очистить для 1с' },
        { id: '9', name: 'удалить все данные' },
      ],

      date_start: formatDate(new Date()),
      date_end: formatDate(new Date()),

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
      order: {},

      modalOrder: false,

      number_order: {},

      // cats: [],
      // allItems: [],- - выгрузить из налоговой

      // vendor_items: [],

      // modalItemEdit: false,
      // modalItemNew: false,

      // itemEdit: null,
      // itemName: '',

      // checkArtDialog: false,
      // checkArtList: [],

      // freeItems: [],

      // searchItem: ''
    };
  }

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

  async openOrder(id) {
    const res = this.state.allOrder.find((el) => el.id === id);

    // console.log(res)

    // let res = await this.getData('getUser', data);

    // хак для автокомплита
    // res.user.app_id = res.appointment.find((app) =>
    //     parseInt(app.id) == parseInt(res.user.app_id));

    this.setState({
      order: res,
      // chose_app: res.user.app_id,
      modalOrder: true,
    });

    // setTimeout(() => {
    //     this.sortPoint();

    //     this.myDropzone = new Dropzone("#for_img_edit", this.dropzoneOptions);
    // }, 300)
  }

  selectOrder(id) {
    const number_order = this.state.allOrder;

    const res = this.state.allOrder.find((el) => el.id === id);

    number_order.map((el) =>
      this.state.order.id === el.id ? (el.number_order = res.number) : null
    );

    console.log(number_order);

    this.setState({
      allOrder: number_order,
      // chose_app: res.user.app_id,
      modalOrder: false,
    });
  }

  render() {
    return (
      <>
        {/* <Backdrop 
        style={{ zIndex: 99 }} 
        open={this.state.is_load}
        >
          <CircularProgress color="inherit" />
        </Backdrop> */}

        {/* <Dialog onClose={ () => { this.setState({ checkArtDialog: false, checkArtList: [] }) } } open={this.state.checkArtDialog}>
          <DialogTitle>Такой код 1с уже задан у следующих позиций:</DialogTitle>
          <List sx={{ pt: 0 }}>
            {this.state.checkArtList.map((item, key) => (
              <ListItem button onClick={this.chooseArt.bind(this, item.id)} key={key}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Dialog> */}

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
              value={this.state.select_list.id}
              // func={ this.changeItem.bind(this, 'app_id') }
              label="Селект"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <Button
              // onClick={this.openNewUser.bind(this)}
              variant="contained"
            >
              Выполнить
            </Button>
          </Grid>

          <Grid item xs={12}>
            {this.state.allOrder.length > 0 ? (
              <CheckCheckTable
                orders={this.state.allOrder}
                openOrder={this.openOrder.bind(this)}
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
              {this.state.allOrder && this.state.modalOrder === true ? (
                <CheckModalTable
                  orders={this.state.allOrder}
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
