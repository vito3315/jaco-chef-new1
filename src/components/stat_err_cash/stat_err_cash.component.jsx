import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CloseIcon from '@mui/icons-material/Close';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Typography from '@mui/material/Typography';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import { MySelect, MyDatePickerNew } from '../../stores/elements';

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

class StatErrCash_Modal extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);

    this.state = {
      item: null,
      fullScreen: false,

      confirmDialog: false,
      percent: 0,

      snackbar: false,
      error: '',
    };
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props.item);

    if (!this.props.item) {
      return;
    }

    if (this.props.item !== prevProps.item) {
      this.setState({
        item: this.props.item,
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

  openConfirm(percent) {
    this.setState({
      confirmDialog: true,
      percent,
    });
  }

  async clearItem() {
    const item = this.state.item;

    const type = this.state.percent;

    this.setState({
      confirmDialog: false,
    });

    if (this.props.mark === 'errOrder') {
      const data = {
        date: item.date_time_order,
        point_id: item.point_id,
        type,
        user_id: item.user_id,
        row_id: item.row_id,
        err_id: item.err_id,
      };

      const res = await this.props.getData('clear_order', data);

      if (res.st) {
        this.onClose();
        this.props.update();
      } else {
        this.setState({
          error: res.text,
          snackbar: true,
        });
      }
    }

    if (this.props.mark === 'errCam') {
      const data = {
        date: item.date,
        point_id: item.point_id,
        type,
        err_id: item.id,
      };

      const res = await this.props.getData('clear_cam', data);

      if (res.st) {
        this.onClose();
        this.props.update();
      } else {
        this.setState({
          error: res.text,
          snackbar: true,
        });
      }
    }
  }

  onClose() {
    this.setState({
      item: null,
      percent: 0,
      error: '',
    });

    this.props.onClose();
  }

  render() {
    return (
      <>
        <Snackbar
          open={this.state.snackbar}
          autoHideDuration={30000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={() => this.setState({ snackbar: false })}
        >
          <Alert
            onClose={() => this.setState({ snackbar: false })}
            severity={'error'}
            sx={{ width: '100%' }}
          >
            {this.state.error}
          </Alert>
        </Snackbar>

        <Dialog
          sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
          maxWidth="xs"
          open={this.state.confirmDialog}
          onClose={() => this.setState({ confirmDialog: false })}
        >
          <DialogTitle>Подтвердите действие</DialogTitle>
          <DialogContent align="center" sx={{ fontWeight: 'bold' }}>
            Уменьшить штраф на {this.state.percent}% ?
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => this.setState({ confirmDialog: false }) }>
              Отмена
            </Button>
            <Button onClick={this.clearItem.bind(this)}>Ok</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.props.open}
          onClose={this.onClose.bind(this)}
          fullScreen={this.state.fullScreen}
          fullWidth={true}
          maxWidth={'md'}
        >
          <DialogTitle className="button">
            {this.props.method} №{this.props.mark === 'errOrder' ? this.state.item ? this.state.item.order_id : 'Отсутствует' : this.state.item ? this.state.item.id : 'Отсутствует'}
            {this.state.fullScreen ? (
              <IconButton onClick={this.onClose.bind(this)} style={{ cursor: 'pointer' }}>
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>
          <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
            <Grid container spacing={3} justifyContent="center" mb={3}>

              <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center">
                <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Сотрудник</Typography>
                <Typography sx={{ fontWeight: 'normal', whiteSpace: 'nowrap' }}>
                  {this.props.mark === 'errOrder' ? this.state.item ? this.state.item.full_user_name : 'Не указан' : this.state.item ? this.state.item.user_name : 'Не указан'}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center">
                <Typography sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                  {this.props.mark === 'errOrder' ? 'Дата заказа' : 'Дата время ошибки'}
                </Typography>
                <Typography sx={{ fontWeight: 'normal', whiteSpace: 'nowrap' }}>
                  {this.props.mark === 'errOrder' ? this.state.item ? this.state.item.date_time_order : 'Не указана' : this.state.item ? `${this.state.item.date} 
                  ${this.state.item.time}` : 'Не указано'}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} display="flex" flexDirection="column" alignItems="center">
                <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                  {this.props.mark === 'errOrder' ? 'Ошибка заказа' : 'Ошибка'}
                </Typography>
                <Typography sx={{ fontWeight: 'normal', textAlign: 'center' }}>
                  {this.props.mark === 'errOrder' ? this.state.item ? this.state.item.order_desc : 'Не указана' : this.state.item ? this.state.item.fine_name : 'Не указан'}
                </Typography>
              </Grid>

              {this.props.mark !== 'errOrder' ? null : (
                <Grid item xs={12} sm={3} display="flex" flexDirection="column" alignItems="center">
                  <Typography sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Позиция</Typography>
                  <Typography sx={{ fontWeight: 'normal', textAlign: 'center' }}>
                    {this.state.item ? this.state.item.item_name : 'Не указана'}
                  </Typography>
                </Grid>
              )}

              {this.props.mark !== 'errOrder' ? null : (
                <Grid item xs={12} sm={3} display="flex" flexDirection="column" alignItems="center">
                  <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Этап</Typography>
                  <Typography sx={{ fontWeight: 'normal', textAlign: 'center' }}>
                    {this.state.item ? this.state.item.stage_name : 'Не указан'}
                  </Typography>
                </Grid>
              )}

              {this.props.mark !== 'errOrder' ? null : (
                <Grid item xs={12} sm={3} display="flex" flexDirection="column" alignItems="center">
                  <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Ошибка</Typography>
                  <Typography sx={{ fontWeight: 'normal', textAlign: 'center' }}>
                    {this.state.item ? this.state.item.pr_name : 'Не указана'}
                  </Typography>
                </Grid>
              )}

              {this.props.mark !== 'errOrder' ? null : (
                <Grid item xs={12} sm={3} display="flex" flexDirection="column" alignItems="center">
                  <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Сумма</Typography>
                  <Typography sx={{ fontWeight: 'normal', textAlign: 'center' }}>
                    {this.state.item ? this.state.item.my_price : 'Не указана'}
                  </Typography>
                </Grid>
              )}

              <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center">
                <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Фото ошибки</Typography>
                <Grid sx={{ fontWeight: 'normal', whiteSpace: 'nowrap' }}>
                  {this.props.mark === 'errOrder' ? this.state.item ? !this.state.item.imgs.length ? 'Фото отсутствует' : (
                        <img src={'https://jacochef.ru/src/img/err_orders/uploads/' + this.state.item.imgs[0]} style={{ maxWidth: 300, maxHeight: 400 }}/>
                      ) : 'Фото отсутствует'
                  : this.state.item ? !this.state.item.imgs.length ? 'Фото отсутствует' : (
                      <img src={'https://jacochef.ru/src/img/fine_err/uploads/' + this.state.item.imgs[0]} style={{ maxWidth: 300, maxHeight: 400 }}/>
                    ) : 'Фото отсутствует'}
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Grid mb={5}>
                  <Button variant="contained" onClick={this.openConfirm.bind(this, '50')}>Снять 50%</Button>
                </Grid>
                <Grid>
                  <Button variant="contained" onClick={this.openConfirm.bind(this, '100')}>Снять 100%</Button>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.onClose.bind(this)}>
              Закрыть
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

class StatErrCash_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'stat_err_cash',
      module_name: '',
      is_load: false,

      points: [],
      point: '0',

      date_start: '',
      date_end: '',

      stat_true: '',
      stat_false: '',

      svod: [],
      svod_new: [],

      all_data: [],
      all_data_new: [],

      all_data_new_stat: '',

      modalDialog: false,
      method: '',
      mark: '',
      item: null,
    };
  }

  async componentDidMount() {
    const data = await this.getData('get_all');

    this.setState({
      points: data.points,
      point: data.points[0].id,
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

  changePoint(event) {
    const point = event.target.value;

    this.setState({
      point,
      stat_true: '',
      stat_false: '',
      svod: [],
      svod_new: [],
      all_data: [],
      all_data_new: [],
      all_data_new_stat: '',
    });
  }

  changeDateRange(data, event) {
    this.setState({
      [data]: event ? formatDate(event) : '',
    });
  }

  openModal(mark, method, item) {
    if (mark === 'errOrder') {
      this.setState({
        modalDialog: true,
        method,
        mark,
        item,
      });
    }

    if (mark === 'errCam') {
      this.setState({
        modalDialog: true,
        method,
        mark,
        item,
      });
    }
  }

  async getItems() {
    const point_id = this.state.point;

    const date_start = this.state.date_start;

    const date_end = this.state.date_end;

    const data = {
      point_id,
      date_start,
      date_end,
    };

    const res = await this.getData('get_data', data);

    // console.log(res);

    this.setState({
      stat_true: res.stat_true_false.tru,
      stat_false: res.stat_true_false.fals,
      svod: res.svod,
      svod_new: res.svod_new,
      all_data: res.all_data,
      all_data_new: res.all_data_new,
      all_data_new_stat: res.all_data_new_stat,
    });
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <StatErrCash_Modal
          open={this.state.modalDialog}
          onClose={() => this.setState({ modalDialog: false })}
          method={this.state.method}
          mark={this.state.mark}
          item={this.state.item}
          getData={this.getData.bind(this)}
          update={this.getItems.bind(this)}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={3}>
            <MySelect
              data={this.state.points}
              value={this.state.point}
              func={this.changePoint.bind(this)}
              label="Точка"
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
            <Button onClick={this.getItems.bind(this)} variant="contained">
              Показать ошибки
            </Button>
          </Grid>
        </Grid>

        {/* клиенты */}
        {!this.state.stat_false && !this.state.stat_true ? null : (
          <Grid container spacing={3} justifyContent="center" mt={3} mb={3}>
            <Grid item xs={12} sm={4}>
              <TableContainer>
                <Typography sx={{ fontWeight: 'bold' }} align="center">Клиенты</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: '50%' }} align="center">Довольные</TableCell>
                      <TableCell style={{ width: '50%' }} align="center">Недовольные</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell align="center">{this.state.stat_true}</TableCell>
                      <TableCell align="center">{this.state.stat_false}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        )}

        {/* аккордионы */}
        {!this.state.svod.length && !this.state.svod_new.length ? null : (
          <Grid container spacing={3}>
            {!this.state.svod.length ? null : (
              <Grid item xs={12} sm={6} mb={1}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                    <Typography style={{ fontWeight: 'bold' }}>Общие данные (заказы)</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell style={{ width: '40%' }} align="center">Сотрудник</TableCell>
                            <TableCell style={{ width: '30%' }} align="center">Кол-во ошибок</TableCell>
                            <TableCell style={{ width: '30%' }} align="center">Сумма ошибок</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {this.state.svod.map((item, key) => (
                            <TableRow key={key} hover>
                              <TableCell align="center">{item.user_name}</TableCell>
                              <TableCell align="center">{item.count}</TableCell>
                              <TableCell align="center">{item.price}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            )}

            {!this.state.svod_new.length ? null : (
              <Grid item xs={12} sm={6} mb={1}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                    <Typography style={{ fontWeight: 'bold' }}>Общие данные (камеры)</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell style={{ width: '40%' }} align="center">Сотрудник</TableCell>
                            <TableCell style={{ width: '30%' }} align="center">Кол-во ошибок</TableCell>
                            <TableCell style={{ width: '30%' }} align="center">Сумма ошибок</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {this.state.svod_new.map((item, key) => (
                            <TableRow key={key} hover>
                              <TableCell align="center">{item.user_name}</TableCell>
                              <TableCell align="center">{item.count}</TableCell>
                              <TableCell align="center">{item.price}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            )}
          </Grid>
        )}

        {/* таблицы */}
        {!this.state.all_data.length && !this.state.all_data_new.length ? null : (
          <Grid container mt={3} spacing={3}>
            {!this.state.all_data.length ? null : (
              <Grid item xs={12} sm={6} sx={{ marginBottom: { sm: 10, xs: 5 } }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell colSpan={8} sx={{ fontWeight: 'bold' }}>Все данные (заказы)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ width: '20%' }} align="center">Сотрудник</TableCell>
                        <TableCell style={{ width: '5%' }} align="center">Номер заказа</TableCell>
                        <TableCell style={{ width: '30%' }} align="center">Дата заказа</TableCell>
                        <TableCell style={{ width: '10%' }} align="center">Позиция</TableCell>
                        <TableCell style={{ width: '20%' }} align="center">Ошибка</TableCell>
                        <TableCell style={{ width: '2%' }} align="center">Довоз</TableCell>
                        <TableCell style={{ width: '3%' }} align="center">Сумма ошибки</TableCell>
                        <TableCell style={{ width: '10%' }} align="center">Фото</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {this.state.all_data.map((item, key) => (
                        <TableRow key={key} hover style={{ cursor: 'pointer' }} onClick={this.openModal.bind(this, 'errOrder', 'Ошибка по заказу', item)}>
                          <TableCell align="center">{item.full_user_name}</TableCell>
                          <TableCell align="center">{item.order_id}</TableCell>
                          <TableCell align="center">{item.date_time_order}</TableCell>
                          <TableCell align="center">{item.item_name}</TableCell>
                          <TableCell align="center">{item.pr_name}</TableCell>
                          <TableCell align="center">{item.new_order_id === '0' ? null : <DirectionsCarIcon />}</TableCell>
                          <TableCell align="center">{item.my_price}</TableCell>
                          <TableCell align="center">
                            {!item.imgs.length ? null : (
                              <img src={'https://jacochef.ru/src/img/err_orders/uploads/' + item.imgs[0]} style={{ maxWidth: 100, maxHeight: 100 }}/>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )}

            {!this.state.all_data_new.length ? null : (
              <Grid item xs={12} sm={6} style={{ marginBottom: 100 }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell colSpan={6} sx={{ fontWeight: 'bold' }}>Все данные (камеры)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ width: '10%' }} align="center">Сотрудник</TableCell>
                        <TableCell style={{ width: '20%' }} align="center">Дата внесения ошибки</TableCell>
                        <TableCell style={{ width: '25%' }} align="center">Дата и время совершения ошибки</TableCell>
                        <TableCell style={{ width: '30%' }} align="center">Ошибка</TableCell>
                        <TableCell style={{ width: '5%' }} align="center">Сумма ошибки</TableCell>
                        <TableCell style={{ width: '10%' }} align="center">Фото</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={6} sx={{ fontWeight: 'bold' }}>Кол-во не обработанных ошибок: {this.state.all_data_new_stat}</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {this.state.all_data_new.map((item, key) => (
                        <TableRow key={key} hover style={{ cursor: 'pointer' }} onClick={this.openModal.bind(this, 'errCam', 'Ошибка', item)}>
                          <TableCell align="center">{item.user_name}</TableCell>
                          <TableCell align="center">{item.date_close}</TableCell>
                          <TableCell align="center">{item.date} {item.time}</TableCell>
                          <TableCell align="center">{item.fine_name}</TableCell>
                          <TableCell align="center">{item.price}</TableCell>
                          <TableCell align="center">
                            {!item.imgs.length ? null : (
                              <img src={'https://jacochef.ru/src/img/fine_err/uploads/' + item.imgs[0]} style={{ maxWidth: 100, maxHeight: 100 }}/>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )}
          </Grid>
        )}
      </>
    );
  }
}

export function StatErrCash() {
  return <StatErrCash_ />;
}
