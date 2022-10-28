import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import {
  MyCheckBox,
  MyAutocomplite,
  MyDatePickerNew,
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

class ListFakeUsers_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'list_fake_users',
      module_name: '',
      is_load: false,

      points: [],
      point: [],
      items: [],
      item: [],
      users: [],

      snackbar: false,
      error: '',

      date_start_true: '',
      date_end_true: '',
      date_start_false: '',
      date_end_false: '',
      count_orders: 0,
      max_summ: 0,
      is_show_claim: 0,
      is_show_marketing: 0,
    };
  }

  async componentDidMount() {
    let data = await this.getData('get_all');

    // console.log(data);

    this.setState({
      points: data.points,
      items: data.items,
      module_name: data.module_info.name,
    });

    document.title = data.module_info.name;
  }

  getData = (method, data = {}) => {
    this.setState({
      is_load: true,
    });

    return fetch('https://jacochef.ru/api/index_new.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify({
        method: method,
        module: this.state.module,
        version: 2,
        login: localStorage.getItem('token'),
        data: JSON.stringify(data),
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.st === false && json.type == 'redir') {
          window.location.pathname = '/';
          return;
        }

        if (json.st === false && json.type == 'auth') {
          window.location.pathname = '/auth';
          return;
        }

        setTimeout(() => {
          this.setState({
            is_load: false,
          });
        }, 300);

        return json;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async getUsers() {

    const data = {
      point: this.state.point,
      date_start_true: this.state.date_start_true,
      date_end_true: this.state.date_end_true,
      date_start_false: this.state.date_start_false,
      date_end_false: this.state.date_end_false,
      count_orders: this.state.count_orders,
      max_summ: this.state.max_summ,
      items: this.state.item,
      is_show_claim: this.state.is_show_claim,
      is_show_marketing: this.state.is_show_marketing,
    };

    const res = await this.getData('get_users', data);

    // console.log(res);

    if(res.st) {

      this.setState({
        users: res.users,
      });

    } else {

      this.setState({
        error: res.text,
        snackbar: true,
      });
      
    }

  }

  changeNumber(data, event) {
    this.setState({
      [data]: event.target.value,
    });
  }

  changeItem(data, event, value) {

    this.setState({
      [data]: value,
    });
  }

  changeDateRange(data, event) {

    this.setState({
      [data]: event ? formatDate(event) : '',
    });
  }

  changeItemChecked(data, event) {
    const value = event.target.checked === true ? 1 : 0;

    this.setState({
      [data]: value,
    });
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Snackbar 
          open={this.state.snackbar} 
          autoHideDuration={30000}
          anchorOrigin={{  
            vertical: 'top',
            horizontal: 'center', 
          }}
          onClose={() => {
            this.setState({ snackbar: false });
          }}>
          <Alert 
            onClose={() => {
            this.setState({ snackbar: false });
            }} 
            severity={ "error" } 
            sx={{ width: '100%' }}>
             {this.state.error}
          </Alert>
        </Snackbar>

          <Grid item xs={12} mb={3} >
            <h1>{this.state.module_name}</h1>
          </Grid>

        <Grid item container spacing={3} justifyContent="center" mb={3} sx={{ flexDirection: {sm: "row", xs: "column-reverse"}}}>

          <Grid item xs={12} sm={3} sx={{ order: { sm: 0, xs: 1 }}}>
            <MyDatePickerNew
              label="Делал заказ от"
              value={this.state.date_start_true}
              func={this.changeDateRange.bind(this, 'date_start_true')}
            />
          </Grid>

          <Grid item xs={12} sm={3} sx={{ order: { sm: 1, xs: 0 }}}>
            <MyDatePickerNew
              label="Делал заказ до"
              value={this.state.date_end_true}
              func={this.changeDateRange.bind(this, 'date_end_true')}
            />
          </Grid>

          <Grid item xs={12} sm={3} sx={{ order: { sm: 2, xs: 2 }}}>
            <Button
              variant="contained"
              style={{ whiteSpace: 'nowrap' }}
              onClick={this.getUsers.bind(this)}
            >
              Получить список клиентов
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3} justifyContent="center" mb={3}>
          <Grid item xs={12} sm={3}>
            <MyDatePickerNew
              label="Не заказывал от"
              value={this.state.date_start_false}
              func={this.changeDateRange.bind(this, 'date_start_false')}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyDatePickerNew
              label="Не заказывал до"
              value={this.state.date_end_false}
              func={this.changeDateRange.bind(this, 'date_end_false')}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyCheckBox
              label="Жалоба"
              value={parseInt(this.state.is_show_claim) == 1 ? true : false}
              func={this.changeItemChecked.bind(this, 'is_show_claim')}
            />
          </Grid>
          </Grid>

          <Grid container spacing={3} justifyContent="center" mb={3}>
          <Grid item xs={12} sm={3}>
            <MyTextInput
              label="Количество заказов"
              value={this.state.count_orders}
              type="number"
              func={this.changeNumber.bind(this, 'count_orders')}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyTextInput
              label="От суммы"
              value={this.state.max_summ}
              type="number"
              func={this.changeNumber.bind(this, 'max_summ')}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyCheckBox
              label="Реклама"
              value={parseInt(this.state.is_show_marketing) == 1 ? true : false}
              func={this.changeItemChecked.bind(this, 'is_show_marketing')}
            />
          </Grid>
          </Grid>

          <Grid container spacing={3} justifyContent="center" mb={3}>

          <Grid item xs={12} sm={3}>
            <MyAutocomplite
              label="Точки"
              multiple={true}
              data={this.state.points}
              value={this.state.point}
              func={this.changeItem.bind(this, 'point')}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyAutocomplite
              label="Позиции в заказе"
              multiple={true}
              data={this.state.items}
              value={this.state.item}
              func={this.changeItem.bind(this, 'item')}
            />
          </Grid>

          <Grid item xs={12} sm={3}></Grid>
        </Grid>

        {!this.state.users.length ? null : (
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={9}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: '5%' }}>#</TableCell>
                      <TableCell style={{ width: '35%' }}>Имя</TableCell>
                      <TableCell style={{ width: '60%' }}>Телефон</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {this.state.users.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.login}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        )}
      </>
    );
  }
}

export function ListFakeUsers() {
  return <ListFakeUsers_ />;
}
