import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import {
  MyDatePickerNew,
  MySelect,
  MyAutocomplite,
  MyTimePicker,
  MyCheckBox,
  MyTextInput,
  MyAlert
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

class Stat_buy_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'stat_buy',
      module_name: '',
      is_load: false,

      points: [],
      point: [],

      date_start: formatDate(new Date()),
      date_end: formatDate(new Date()),
    };
  }

  async componentDidMount() {
    const data = await this.getData('get_all');

    // console.log(data);

    this.setState({
      points: data.points,
      module_name: data.module_info.name,
    });

    document.title = data.module_info.name;
  }

  handleResize() {

    if (window.innerWidth < 601) {
          this.setState({
            fullScreen: true,
          });
        } else {
          this.setState({
            fullScreen: false,
          });
        }
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

  changePoint(data, event, value) {
    this.setState({
      [data]: value,
    });
  }

  changeDateRange(data, event) {
    this.setState({
      [data]: event ? formatDate(event) : '',
    });
  }

  async changePoint(event) {
    const data = {
      point_id: event.target.value,
      date_start: this.state.date_start,
      date_end: this.state.date_end,
    };

    const res = await this.getData('get_data', data);

    this.setState({
      point: event.target.value,
      all_list: res.all_list,
      ret_list: res.ret_list,
    });
  }


  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyAutocomplite
              label="Точки"
              multiple={true}
              data={this.state.points}
              value={this.state.point}
              func={this.changePoint.bind(this, 'point')}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyDatePickerNew
              label="Дата от"
              value={this.state.date_start}
              func={this.changeDateRange.bind(this, 'date_start')}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyDatePickerNew
              label="Дата до"
              value={this.state.date_end}
              func={this.changeDateRange.bind(this, 'date_end')}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <Button 
            // onClick={this.getItems.bind(this)} 
            variant="contained">
              Обновить
            </Button>
          </Grid>

          {/* <Grid item xs={12} sm={12}>
            <Fines_err_Table
              all_list={this.state.all_list}
              ret_list={this.state.ret_list}
              openModal={this.openModal.bind(this)}
            />
          </Grid> */}
        </Grid>
      </>
    );
  }
}

export function StatBuy() {
  return <Stat_buy_ />;
}
