import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

class ListFakeUsers_Modal extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);

    this.state = {
      item: {},
      fullScreen: false,
    };
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props.event);

    if (!this.props.event) {
      return;
    }

    if (this.props.event !== prevProps.event) {
      this.setState({
        item: this.props.event,
      });
    }
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
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

  onClose() {
    this.setState({
      item: this.props.event ? this.props.event : [],
    });

    this.props.onClose();
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.onClose.bind(this)}
        fullScreen={this.state.fullScreen}
        fullWidth={true}
        maxWidth={'lg'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="button">
          <Typography style={{ fontWeight: 'bold' }}>
            Информация о клиенте
          </Typography>
          {this.state.fullScreen ? (
            <IconButton
              onClick={this.onClose.bind(this)}
              style={{ cursor: 'pointer' }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>

        <DialogContent style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Grid container spacing={3} justifyContent="center" mb={3}>
            <Grid
              item
              xs={12}
              sm={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                }}
              >
                Имя
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {this.state.item ? this.state.item.name !== '0' ? this.state.item.name : 'не указано' : 'не указано'}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  fontWeight: 'bold',
                }}
              >
                Регистрация
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {this.state.item ? this.state.item.date_reg ? this.state.item.date_reg : 'не указано' : 'не указано'}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                }}
              >
                День рождения
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {this.state.item ? this.state.item.date_bir ? this.state.item.date_bir : 'не указано' : 'не указано'}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  fontWeight: 'bold',
                }}
              >
                Согласие на рассылку
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {this.state.item
                  ? this.state.item.spam === '0'
                    ? 'нет'
                    : 'есть'
                  : 'нет'}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                }}
              >
                Общее количество заказов
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {this.state.item ? this.state.item.all_count_order : '0'}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                }}
              >
                Количество заказов на доставку
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {this.state.item ? this.state.item.count_dev : '0'}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                }}
              >
                Количество заказов на самовывоз
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {this.state.item ? this.state.item.count_pic : '0'}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                }}
              >
                Переодичность заказов
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {this.state.item ? this.state.item.order_per_day : '0'}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                }}
              >
                Первый промик после регистрации
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {this.state.item
                  ? this.state.item.promo_name !== ''
                    ? this.state.item.promo_name
                    : 'не было'
                  : 'не было'}
              </Typography>
            </Grid>
          </Grid>

          {/* аккордион */}
          {!this.state.item.orders ? null : (
            <Grid item xs={12} sm={4} mb={3}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                >
                  <Typography style={{ fontWeight: 'bold' }}>Заказы</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {this.state.fullScreen ? null : (
                    <Accordion expanded={true}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ opacity: 0 }} />}
                        aria-controls="panel1a-content"
                      >
                        <Grid item xs display="flex" flexDirection="row">
                          <Typography style={{ width: '15%' }} noWrap>
                            Номер
                          </Typography>
                          <Typography style={{ width: '25%' }} noWrap>
                            Дата/время
                          </Typography>
                          <Typography style={{ width: '15%' }} noWrap>
                            Точка
                          </Typography>
                          <Typography style={{ width: '15%' }} noWrap>
                            Сумма
                          </Typography>
                          <Typography style={{ width: '15%' }} noWrap>
                            Промик
                          </Typography>
                          <Typography style={{ width: '15%' }} noWrap>
                            Тип
                          </Typography>
                        </Grid>
                      </AccordionSummary>
                    </Accordion>
                  )}
                  {this.state.item.orders.map((item, i) => (
                    <Accordion key={i}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                      >
                        <Grid
                          item
                          xs
                          display="flex"
                          sx={{ flexDirection: { sm: 'row', xs: 'column' } }}
                        >
                          <Typography
                            style={{ width: '15%' }}
                            sx={{
                              noWrap: { sm: true, xs: false },
                              whiteSpace: { xs: 'nowrap' },
                            }}
                          >
                            {this.state.fullScreen
                              ? `Номер: ${item.order_id}`
                              : item.order_id}
                          </Typography>
                          <Typography
                            style={{ width: '25%' }}
                            sx={{
                              noWrap: { sm: true, xs: false },
                              whiteSpace: { xs: 'nowrap' },
                            }}
                          >
                            {this.state.fullScreen
                              ? `Дата: ${item.date}/${item.time}`
                              : `${item.date}/${item.time}`}
                          </Typography>
                          <Typography
                            style={{ width: '15%' }}
                            sx={{
                              noWrap: { sm: true, xs: false },
                              whiteSpace: { xs: 'nowrap' },
                            }}
                          >
                            {this.state.fullScreen
                              ? `Точка: ${item.addr}`
                              : item.addr}
                          </Typography>
                          <Typography
                            style={{ width: '15%' }}
                            sx={{
                              noWrap: { sm: true, xs: false },
                              whiteSpace: { xs: 'nowrap' },
                            }}
                          >
                            {this.state.fullScreen
                              ? `Сумма: ${item.summ}`
                              : item.summ}
                          </Typography>
                          <Typography
                            style={{ width: '15%' }}
                            sx={{
                              noWrap: { sm: true, xs: false },
                              whiteSpace: { xs: 'nowrap' },
                            }}
                          >
                            {this.state.fullScreen
                              ? `Промик: ${item.promo_name ?? 'Нет'}`
                              : item.promo_name ?? 'Нет'}
                          </Typography>
                          <Typography
                            style={{ width: '15%' }}
                            sx={{
                              noWrap: { sm: true, xs: false },
                              whiteSpace: { xs: 'nowrap' },
                            }}
                          >
                            {this.state.fullScreen
                              ? `Тип: ${
                                  item.xy === '' ? 'Самовывоз' : 'Доставка'
                                }`
                              : item.xy === ''
                              ? 'Самовывоз'
                              : 'Доставка'}
                          </Typography>
                        </Grid>
                      </AccordionSummary>
                      <AccordionDetails
                        style={{ width: '100%', overflow: 'scroll' }}
                      >
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Наименование</TableCell>
                              <TableCell>Количество</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {!item.items
                              ? null
                              : item.items.map((it, key) => (
                                  <TableRow key={key}>
                                    <TableCell>{it.name}</TableCell>
                                    <TableCell>{it.count}</TableCell>
                                  </TableRow>
                                ))}
                          </TableBody>
                        </Table>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Grid>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            style={{ color: '#DC143C' }}
            onClick={this.onClose.bind(this)}
          >
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
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
      is_show_claim_last: 0,
      is_show_marketing: 0,

      modalDialog: false,
      user: null,
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
      is_show_claim_last: this.state.is_show_claim_last,
      is_show_marketing: this.state.is_show_marketing,
    };

    const res = await this.getData('get_users', data);

    // console.log(res);

    if (res.st) {
      this.setState({
        users: res.users,
      });
    } else {
      this.setState({
        users:  [],
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
   
    // делаем переключатель для галочек ошибка на заказ и на последний заказ
    if(data == 'is_show_claim_last' ){
      this.setState({
        'is_show_claim' : 0,
      });
    } else if(data == 'is_show_claim'){
      this.setState({
        'is_show_claim_last' : 0,
      });
    }

    // changeItemChecked
    this.setState({
      [data]: value,
    });
  }

  async openModal(item) {
    const date_start_true = this.state.date_start_true;

    const date_end_true = this.state.date_end_true;

    const point = this.state.point;

    const data = {
      client_id: item.client_id,
      date_start_true,
      date_end_true,
      point,
    };

    // console.log(data)

    const res = await this.getData('get_one', data);

    // console.log(res);

    if (res.st) {
      this.setState({
        modalDialog: true,
        user: res.user,
      });
    } else {
      this.setState({
        error: res.text,
        snackbar: true,
      });
    }

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
          }}
        >
          <Alert
            onClose={() => {
              this.setState({ snackbar: false });
            }}
            severity={'error'}
            sx={{ width: '100%' }}
          >
            {this.state.error}
          </Alert>
        </Snackbar>

        <ListFakeUsers_Modal
          open={this.state.modalDialog}
          onClose={() => {
            this.setState({ modalDialog: false });
          }}
          event={this.state.user}
        />

        <Grid item xs={12} mb={3}>
          <h1>{this.state.module_name}</h1>
        </Grid>

        <Grid
          item
          container
          spacing={3}
          justifyContent="center"
          mb={3}
          sx={{ flexDirection: { sm: 'row', xs: 'column-reverse' } }}
        >
          <Grid item xs={12} sm={3} sx={{ order: { sm: 0, xs: 1 } }}>
            <MyDatePickerNew
              label="Делал заказ от"
              value={this.state.date_start_true}
              func={this.changeDateRange.bind(this, 'date_start_true')}
            />
          </Grid>

          <Grid item xs={12} sm={3} sx={{ order: { sm: 1, xs: 0 } }}>
            <MyDatePickerNew
              label="Делал заказ до"
              value={this.state.date_end_true}
              func={this.changeDateRange.bind(this, 'date_end_true')}
            />
          </Grid>

          <Grid item xs={12} sm={3} sx={{ order: { sm: 2, xs: 2 } }}>
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
              label="Была оформлена ошибка на заказ"
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
              label="Была оформлена ошибка на последний заказ"
              value={
                parseInt(this.state.is_show_claim_last) == 1 ? true : false
              }
              func={this.changeItemChecked.bind(this, 'is_show_claim_last')}
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

          <Grid item xs={12} sm={3}>
            <MyCheckBox
              label="Подписка на рекламную рассылку"
              value={parseInt(this.state.is_show_marketing) == 1 ? true : false}
              func={this.changeItemChecked.bind(this, 'is_show_marketing')}
            />
          </Grid>
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
                      <TableRow
                        key={i}
                        onClick={this.openModal.bind(this, item)}
                        style={{ cursor: 'pointer' }}
                      >
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
