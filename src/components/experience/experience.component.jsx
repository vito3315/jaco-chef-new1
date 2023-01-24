import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
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

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import {
  MySelect,
  MyAutocomplite,
  MyAlert,
  MyDatePickerNew,
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

const formatter = new Intl.NumberFormat('ru', {
  style: 'unit',
  unit: 'year',
  unitDisplay: 'long',
});

class Experience_Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      setEdit: false,
      pressCount: 0,
      data: '',

      openAlert: false,
      err_status: true,
      err_text: '',
    };
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props.user);

    if (!this.props.user) {
      return;
    }

    if (this.props.user !== prevProps.user) {
      this.setState({
        item: this.props.user,
        data: this.props.user.date_registration,
      });
    }
  }

  changeDateRange(val) {
    const item = this.state.item;

    item.date_registration = val ? formatDate(val) : '';

    this.setState({
      item,
    });
  }

  onDoubleClick() {
    this.setState({ pressCount: this.state.pressCount + 1 });

    setTimeout(() => {
      if (this.state.pressCount == 2) {
        this.setState({ setEdit: true });
      }
      this.setState({ pressCount: 0 });
    }, 300);
  }

  closeEdit() {
    const item = this.state.item;

    item.date_registration = this.state.data;

    this.setState({
      item,
      setEdit: false,
    });
  }

  saveEdit() {
    const item = this.state.item;

    if (!item.date_registration) {
      this.setState({
        openAlert: true,
        err_status: false,
        err_text: 'Укажите дату!',
      });

      return;
    }

    if (item.date_registration === this.state.data) {
      this.setState({
        setEdit: false,
      });

      return;
    }

    this.props.saveEdit(item.date_registration, item.id);

    this.setState({
      setEdit: false,
    });
  }

  onClose() {
    this.setState({
      item: null,
      setEdit: false,
      data: '',

      openAlert: false,
      err_status: true,
      err_text: '',
    });

    this.props.onClose();
  }

  render() {
    return (
      <>
        <MyAlert
          isOpen={this.state.openAlert}
          onClose={() => this.setState({ openAlert: false })}
          status={this.state.err_status}
          text={this.state.err_text}
        />

        <Dialog
          open={this.props.open}
          onClose={this.onClose.bind(this)}
          fullScreen={this.props.fullScreen}
          fullWidth={true}
          maxWidth={'md'}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className="button">
            <Typography style={{ fontWeight: 'bold' }}>Информация о сотруднике</Typography>
            {this.props.fullScreen ? (
              <IconButton onClick={this.onClose.bind(this)} style={{ cursor: 'pointer' }}>
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>

          <DialogContent style={{ paddingTop: 10, paddingBottom: 10 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                {this.state.item ? this.state.item.photo ? (
                    <img src={this.state.item.photo} style={{ width: '100%', height: 'auto' }}/>
                  ) : 'Фото отсутствует' : 'Фото отсутствует'}
              </Grid>

              <Grid item xs={12} sm={6} display="flex" flexDirection="column">
                <Grid display="flex" flexDirection="row" mb={2}>
                  <Typography sx={{fontWeight: 'bold', whiteSpace: 'nowrap', marginRight: 2}}>ФИО:</Typography>
                  <Typography sx={{ whiteSpace: 'nowrap' }}>{this.state.item?.name ?? 'Не указано'}</Typography>
                </Grid>

                <Grid display="flex" flexDirection="row" mb={2}>
                  <Typography sx={{fontWeight: 'bold', whiteSpace: 'nowrap', marginRight: 2}}>Текущая должность:</Typography>
                  <Typography sx={{ whiteSpace: 'nowrap' }}>{this.state.item?.app_name ?? 'Не указана'}</Typography>
                </Grid>

                <Grid display="flex" flexDirection="row" mb={2}>
                  <Typography sx={{fontWeight: 'bold', whiteSpace: 'nowrap', marginRight: 2}}>Общий стаж:</Typography>
                  <Typography sx={{ whiteSpace: 'nowrap' }}>{this.state.item?.exp ?? 'Не указано'}</Typography>
                </Grid>

                <Grid display="flex" flexDirection="row" mb={2}>
                  <Typography sx={{fontWeight: 'bold', whiteSpace: 'nowrap', marginRight: 2}}>Текущая организация:</Typography>
                  <Typography sx={{ whiteSpace: 'nowrap' }}>{this.state.item?.point ?? 'Не указано'}</Typography>
                </Grid>

                <Grid display="flex" flexDirection="row" mb={2}>
                  <Typography sx={{fontWeight: 'bold', whiteSpace: 'nowrap', marginRight: 2}}>Телефон:</Typography>
                  <Typography sx={{ whiteSpace: 'nowrap' }}>{this.state.item?.login ?? 'Не указано'}</Typography>
                </Grid>

                <Grid display="flex" flexDirection="row" mb={2}>
                  <Typography sx={{fontWeight: 'bold', whiteSpace: 'nowrap', marginRight: 2}}>Трудоустроен:</Typography>
                  <Typography sx={{ whiteSpace: 'nowrap' }}>
                    {this.state.item ? this.state.item.acc_to_kas == 0 ? 'Неофициально' : 'Официально' : 'Не указано'}
                  </Typography>
                </Grid>

                <Grid display="flex" flexDirection={this.state.setEdit ? 'column' : 'row'} mb={2}>
                  <Typography sx={{fontWeight: 'bold', whiteSpace: 'nowrap', marginRight: 2, marginBottom: 2}}>Дата трудоустройства:</Typography>
                  {this.state.setEdit ? (
                    <Grid display="flex" flexDirection="row">
                      <Grid mr={2}>
                        <MyDatePickerNew
                          label="Изменить датy"
                          value={this.state.item?.date_registration ?? 'Не указана'}
                          func={this.changeDateRange.bind(this)}
                        />
                      </Grid>
                      <Grid mr={2}>
                        <Button onClick={this.saveEdit.bind(this)} style={{ cursor: 'pointer' }} color="success" variant="contained">
                          <CheckIcon />
                        </Button>
                      </Grid>
                      <Grid>
                        <Button onClick={this.closeEdit.bind(this)} style={{ cursor: 'pointer' }} color="error" variant="contained">
                          <ClearIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    <Typography sx={{ whiteSpace: 'nowrap', cursor: 'pointer' }} onClick={this.onDoubleClick.bind(this)}>
                      {this.state.item?.date_registration ?? 'Не указана'}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button style={{ color: '#DC143C' }} onClick={this.onClose.bind(this)}>
              Закрыть
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

class Experience_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'experience',
      module_name: '',
      is_load: false,

      cities: [],
      city: -1,

      points: [],
      pointsCopy: [],
      point: [{ id: -1, name: 'Все точки', city_id: -1 }],

      stat: null,
      users: null,
      stat_of: null,

      modalDialog: false,
      user: null,

      openAlert: false,
      err_status: true,
      err_text: '',
    };
  }

  async componentDidMount() {
    const data = await this.getData('get_all');

    this.setState({
      points: data.points,
      pointsCopy: data.points,
      cities: data.cities,
      module_name: data.module_info.name,
    });

    document.title = data.module_info.name;

    setTimeout(() => {
      this.getInfo();
    }, 300);
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

  changeCity(event) {
    const data = JSON.parse(JSON.stringify(this.state.pointsCopy));

    const points = data.filter((point) =>
      event.target.value === -1 ? point : point.city_id === event.target.value
    );

    this.setState({
      city: event.target.value,
      point: [],
      points,
    });
  }

  changePoint(data, event, value) {
    this.setState({
      [data]: value,
    });
  }

  async getInfo() {
    const point = this.state.point;

    if (!point.length) {
      this.setState({
        openAlert: true,
        err_status: false,
        err_text: 'Выберите точку!',
      });

      return;
    }

    const data = {
      point_id: point,
    };

    let { stat, users, stat_of } = await this.getData('get_info', data);

    users.sort((a, b) => new Date(a.date_registration) - new Date(b.date_registration));

    this.setState({ stat, users, stat_of });
  }

  async openModal(user_id) {
    this.handleResize();

    const data = {
      user_id,
    };

    let { user } = await this.getData('get_user_info', data);

    this.setState({ modalDialog: true, user });
  }

  async saveEdit(date_registration, user_id) {
    const data = {
      user_id,
      date_registration,
    };

    let { st } = await this.getData('save_date_registration', data);

    if (st) {
      this.setState({
        openAlert: true,
        err_status: true,
        err_text: 'Изменения сохранены!',
      });
    }

    setTimeout(() => {
      this.getInfo();
    }, 300);
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <MyAlert
          isOpen={this.state.openAlert}
          onClose={() => this.setState({ openAlert: false })}
          status={this.state.err_status}
          text={this.state.err_text}
        />

        <Experience_Modal
          open={this.state.modalDialog}
          onClose={() => this.setState({ modalDialog: false })}
          user={this.state.user}
          fullScreen={this.state.fullScreen}
          saveEdit={this.saveEdit.bind(this)}
        />

        <Grid item xs={12} mb={3}>
          <h1>{this.state.module_name}</h1>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <MySelect
              label="Город"
              is_none={false}
              data={this.state.cities}
              value={this.state.city}
              func={this.changeCity.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MyAutocomplite
              label="Точки"
              multiple={true}
              data={this.state.points}
              value={this.state.point}
              func={this.changePoint.bind(this, 'point')}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              onClick={this.getInfo.bind(this)}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Обновить данные
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={3} mb={5}>
          {/* статистика */}
          {!this.state.stat ? null : (
            <Grid item xs={12} sm={4}>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Статистические данные</TableCell>
                    </TableRow>
                    {this.state.stat.map((stat, key) => (
                      <TableRow key={key}>
                        <TableCell>
                          {stat.days === '0' ? 'Стаж менее года' : `${formatter.format(stat.days)} стажа`} - {stat.count} сотрудника(-ов)
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}

          {/* официально трудоустроенных */}
          {!this.state.stat_of ? null : (
            <Grid item xs={12} sm={4}>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Трудоустроено</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Официально: {this.state.stat_of.true_count} сотрудника(-ов) / {this.state.stat_of.true_perc} % от числа сотрудников</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Неофициально: {this.state.stat_of.false_count} сотрудника(-ов) / {this.state.stat_of.false_perc} % от числа сотрудников</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}
        </Grid>

        {/* таблица */}
        {!this.state.users ? null : (
          <Grid container>
            <Grid item xs={12} sm={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: '5%' }}>#</TableCell>
                      <TableCell style={{ width: '35%' }}>ФИО</TableCell>
                      <TableCell style={{ width: '20%' }}>Дата устройства на работу</TableCell>
                      <TableCell style={{ width: '20%' }}>Текущая организация</TableCell>
                      <TableCell style={{ width: '20%' }}>Общий стаж год/месяц</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {this.state.users.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell onClick={this.openModal.bind(this, item.id)} style={{ cursor: 'pointer', fontWeight: 700 }}>
                          {item.name}
                        </TableCell>
                        <TableCell>{item.date_registration}</TableCell>
                        <TableCell>{item.point}</TableCell>
                        <TableCell>{item.exp}</TableCell>
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

export function Experience() {
  return <Experience_ />;
}
