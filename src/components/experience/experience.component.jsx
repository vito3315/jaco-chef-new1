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

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

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

      ItemTab: '1',
      listData: null,

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
        listData: structuredClone(this.props.listData),
      });
    }
  }

  changeTab(event, value) {
    this.setState({
      ItemTab: value,
    });
  }

  changeDateRange(data, type, val) {

    const value = val ? formatDate(val) : '';

    if(data === 'list') {
      const listData = this.state.listData;

      listData.forEach(item => item.type === type ? item.date = value : item);

      this.setState({
        listData,
      });
      
    } else {
      const item = this.state.item;

      item.date_registration = value;
  
      this.setState({
        item,
      });
    }

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

  saveHealthBook() {
    const listData = this.state.listData;

    const user = this.state.item;

    const data = {
      user_id: user.id,
    }

    listData.forEach(item => data[item.type] = item.date)

    this.props.saveHealthBook(data);

    this.onClose();

  }

  onClose() {
    this.setState({
      item: null,
      setEdit: false,
      data: '',

      ItemTab: '1',
      listData: null,

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
          <TabContext value={this.state.ItemTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={this.changeTab.bind(this)} variant="fullWidth">
                <Tab label="Информация" value="1" />
                <Tab label="Мед книжка" value="2" />
              </TabList>
            </Box>
            
            {/* Информация */}
            <TabPanel value={'1'} style={{ padding: '24px 0' }}>
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
                          value={this.state.item?.date_registration ?? ''}
                          func={this.changeDateRange.bind(this, 'registration', 0)}
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
            </TabPanel>
            
            {/* мед книжка */}
            <TabPanel value={'2'} style={{ padding: '24px 0' }}>
            <TableContainer>
              <Table size="small">
                <TableBody>
                {!this.state.listData ? null : (
                  this.state.listData.map((item, key) => (
                   <TableRow key={key}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <MyDatePickerNew
                        label="Дата"
                        value={item?.date ?? ''}
                        func={this.changeDateRange.bind(this, 'list', item.type)}
                      />
                    </TableCell>
                  </TableRow>
                )))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabContext>
        </DialogContent>

          <DialogActions>
            {this.state.ItemTab === '1' ?
              <Button color="error" onClick={this.onClose.bind(this)}>
                Закрыть
              </Button> :
              <Button color="success" onClick={this.saveHealthBook.bind(this)}>
                Coxранить
              </Button>
            }
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
      fullScreen: false,

      openAlert: false,
      err_status: true,
      err_text: '',

      listData: [
        {type: 'type_1', date: '', name: 'Гепатит А'},
        {type: 'type_2', date: '', name: 'Отоларинголог'},
        {type: 'type_3', date: '', name: 'Патогенный стафилококк'},
        {type: 'type_4', date: '', name: 'Стоматолог'},
        {type: 'type_5', date: '', name: 'Терапевт'},
        {type: 'type_6', date: '', name: 'Мед. осмотр'},
        {type: 'type_7', date: '', name: 'Флюорография'},
        {type: 'type_8', date: '', name: 'Бак. анализ'},
        {type: 'type_9', date: '', name: 'Яйц. глист'},
        {type: 'type_10', date: '', name: 'Санитарный минимум'},
      ]
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

    const points = data.filter((point) => event.target.value === -1 ? point : point.city_id === event.target.value);

    this.setState({
      city: event.target.value,
      point: [],
      points,
    });
  }

  changePoint(event, point) {

    const pointName = event.target.innerText;

    if(!point.length) {
      this.setState({ point });
      
      return;
    }

    if(pointName === 'Все точки') {
      const pointFilter = point.filter(value => value.id === -1);

      this.setState({ point: pointFilter });

      return;
    }

    if(pointName === 'Офис') {
      const pointFilter = point.filter(value => value.id === -2);

      this.setState({ point: pointFilter });

      return;
    }

    if(point[0].id === -1 || point[0].id === -2) {
      const pointFilter = point.filter(value => value.id === point[0].id);

      this.setState({ point: pointFilter });

      return;
    }

    this.setState({ point });
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

    let { st, text } = await this.getData('save_date_registration', data);

    if(st){
      this.setState({
        openAlert: true,
        err_status: true,
        err_text: 'Изменения сохранены!',
      });
    }else{
      this.setState({
        openAlert: true,
        err_status: false,
        err_text: text,
      });
    }

    setTimeout(() => {
      this.getInfo();
    }, 300);
  }

  async saveHealthBook (data) {

    let { st, text } = await this.getData('save_health_book', data);

    if(st){
      this.setState({
        openAlert: true,
        err_status: true,
        err_text: 'Изменения сохранены!',
      });
    }else{
      this.setState({
        openAlert: true,
        err_status: false,
        err_text: text,
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
          saveHealthBook={this.saveHealthBook.bind(this)}
          listData={this.state.listData}
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
              func={this.changePoint.bind(this)}
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
