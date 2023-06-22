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

import { MySelect, MyAutocomplite, MyAlert, MyDatePickerNew, MyTextInput } from '../../stores/elements';

import moment from 'moment';
import queryString from 'query-string';

import dayjs from 'dayjs';

const formatter = new Intl.NumberFormat('ru', {
  style: 'unit',
  unit: 'year',
  unitDisplay: 'long',
});

class Experience_Modal_Cloth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      app: '',
      ItemTab: '1',
      listCloth: [],
      listClothApp: [],
    };
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props);

    if (!this.props.listCloth) {
      return;
    }

    if (this.props.listCloth !== prevProps.listCloth) {
      let listCloth = [...this.props.listCloth];

      listCloth = listCloth.filter((item) => item.name);

      listCloth.push({ id: '0', name: '' });

      this.setState({
        listCloth,
      });
    }
  }

  changeTab(event, value) {
    this.setState({
      ItemTab: value,
    });
  }

  async changeApp(val, event) {
    const data = {
      app_id: event.target.value,
    };

    const listClothApp = await this.props.getData('get_cloth_app', data);

    this.setState({
      listClothApp,
      [val]: event.target.value,
    });
  }

  changeName(index, event) {
    let listCloth = this.state.listCloth;

    listCloth[index].name = event.target.value;

    listCloth = listCloth.filter((item) => item.name);

    listCloth.push({ id: '0', name: '' });

    this.setState({
      listCloth,
    });
  }

  changeListClothApp(event, listClothApp) {
    this.setState({ listClothApp });
  }

  saveClothList() {
    let listCloth = this.state.listCloth;

    listCloth = listCloth.filter((item) => item.name);

    this.props.saveClothList(listCloth);
  }

  saveClothApp() {
    const listClothApp = this.state.listClothApp;

    const app_id = this.state.app;

    const items = listClothApp.reduce((newList, item) => {
      item = { id: item.id };

      return [...newList, ...[item]];
    }, []);

    const data = {
      app_id,
      items,
    };

    this.props.saveClothApp(data);

    this.onClose();
  }

  onClose() {
    this.setState({
      app: '',
      ItemTab: '1',
      listCloth: [],
      listClothApp: [],
    });

    this.props.onClose();
  }

  render() {
    return (
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
          <Typography style={{ fontWeight: 'bold' }}>Предметы одежды</Typography>
          <IconButton onClick={this.onClose.bind(this)} style={{ cursor: 'pointer' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent style={{ paddingTop: 10, paddingBottom: 10 }}>
          <TabContext value={this.state.ItemTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={this.changeTab.bind(this)} variant="fullWidth">
                <Tab label="Список" value="1" />
                <Tab label="По должности" value="2" />
              </TabList>
            </Box>

            {/* Список предметов одежды */}
            <TabPanel value={'1'} style={{ padding: '24px 0' }}>
              <Grid container spacing={3}>
                {!this.state.listCloth.length ? null :
                    this.state.listCloth.map((it, key) => (
                      <Grid item xs={12} sm={12} key={key}>
                        <MyTextInput
                          label="Наименование"
                          value={it.name}
                          func={this.changeName.bind(this, key)}
                        />
                      </Grid>
                    ))}
              </Grid>
            </TabPanel>

            {/* Предметы одежды по должности */}
            <TabPanel value={'2'} style={{ padding: '24px 0' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <MySelect
                    label="Должность"
                    data={this.props.listApp}
                    value={this.state.app}
                    func={this.changeApp.bind(this, 'app')}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MyAutocomplite
                    label="Предметы одежды"
                    multiple={true}
                    data={this.state.listCloth}
                    value={this.state.listClothApp}
                    func={this.changeListClothApp.bind(this)}
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        </DialogContent>

        <DialogActions>
          {this.state.ItemTab === '1' ? (
            <Button color="success" variant="contained" onClick={this.saveClothList.bind(this)}>
              Coxранить
            </Button>
          ) : (
            <Button color="success" variant="contained" onClick={this.saveClothApp.bind(this)}>
              Coxранить
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

class Experience_Modal_User extends React.Component {
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
    // console.log(this.props);

    if (!this.props.user) {
      return;
    }

    if (this.props.user !== prevProps.user) {
      const listData = [...this.props.listData];

      listData.forEach((item) => {
        const end = moment(item.end);

        if (!item.end) {
          item.change = 'daysOver';
        }

        if (end.diff(moment(), 'days') < -13) {
          item.change = 'daysOver';
        }

        if (end.diff(moment(), 'days') < 14 && end.diff(moment(), 'days') > -14) {
          item.change = 'endDays';
        }
      });

      this.setState({
        listData,
        item: this.props.user,
        data: this.props.user.date_registration,
        ItemTab: this.props.ItemTab ?? this.state.ItemTab,
      });
    }
  }

  changeTab(event, value) {
    this.setState({
      ItemTab: value,
    });
  }

  changeDateRange(data, type, val) {
    const value = val ? val : '';

    if (data === 'list') {
      const listData = this.state.listData;

      listData.forEach((item) =>
        item.type === type ? (item.start = dayjs(value).format('YYYY-MM-DD')) : item
      );

      this.setState({
        listData,
      });
    } else {
      const item = this.state.item;

      item.date_registration = dayjs(value).format('YYYY-MM-DD');

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
    let item = this.state.item;

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

    item.date_registration = dayjs(item.date_registration).format('YYYY-MM-DD');

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
    };

    const noDate = listData.find((item) => !item.start);

    if (noDate) {
      this.setState({
        openAlert: true,
        err_status: false,
        err_text: 'Необходимо заполнить все даты прохождения!',
      });

      return;
    }

    listData.forEach((item) => {
      if (item.start) {
        data[`${item.type}_start`] = item.start;
      }

      if (item.end || item.end === null) {
        data[`${item.type}_end`] = item.end;
      }
    });

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
                  {parseInt(this.state.item?.is_health_book) == 1 ? (
                    <Tab label="Мед книжка" value="2" />
                  ) : null}
                </TabList>
              </Box>

              {/* Информация */}
              <TabPanel value={'1'} style={{ padding: '24px 0' }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                    {this.state.item ? 
                      this.state.item.photo ? 
                        <img src={this.state.item.photo} style={{ width: '100%', height: 'auto' }}/>
                        : 'Фото отсутствует' : 'Фото отсутствует'}
                  </Grid>

                  <Grid item xs={12} sm={6} display="flex" flexDirection="column">
                    <Grid display="flex" flexDirection="row" mb={2}>
                      <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', marginRight: 2 }}>ФИО:</Typography>
                      <Typography sx={{ whiteSpace: 'nowrap' }}>{this.state.item?.name ?? 'Не указано'}</Typography>
                    </Grid>

                    <Grid display="flex" flexDirection="row" mb={2}>
                      <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', marginRight: 2 }}>Текущая должность:</Typography>
                      <Typography sx={{ whiteSpace: 'nowrap' }}>{this.state.item?.app_name ?? 'Не указана'}</Typography>
                    </Grid>

                    <Grid display="flex" flexDirection="row" mb={2}>
                      <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', marginRight: 2 }}>Общий стаж:</Typography>
                      <Typography sx={{ whiteSpace: 'nowrap' }}>{this.state.item?.exp ?? 'Не указано'}</Typography>
                    </Grid>

                    <Grid display="flex" flexDirection="row" mb={2}>
                      <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', marginRight: 2 }}>Текущая организация:</Typography>
                      <Typography sx={{ whiteSpace: 'nowrap' }}>{this.state.item?.point ?? 'Не указано'}</Typography>
                    </Grid>

                    <Grid display="flex" flexDirection="row" mb={2}>
                      <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', marginRight: 2 }}>Телефон:</Typography>
                      <Typography sx={{ whiteSpace: 'nowrap' }}>{this.state.item?.login ?? 'Не указано'}</Typography>
                    </Grid>

                    <Grid display="flex" flexDirection="row" mb={2}>
                      <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', marginRight: 2 }}>Трудоустроен:</Typography>
                      <Typography sx={{ whiteSpace: 'nowrap' }}>
                        {this.state.item ? this.state.item.acc_to_kas == 0 ? 'Неофициально' : 'Официально' : 'Не указано'}
                      </Typography>
                    </Grid>

                    <Grid display="flex" flexDirection={this.state.setEdit ? 'column' : 'row'} mb={2}>
                      <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', marginRight: 2, marginBottom: 2 }}>Дата трудоустройства:</Typography>
                      {this.state.setEdit ? (
                        <Grid display="flex" flexDirection="row">
                          <Grid mr={2}>
                            <MyDatePickerNew 
                              label="Изменить датy"
                              value={dayjs(this.state.item?.date_registration ?? '')}
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
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width: '33%' }}>Название</TableCell>
                        <TableCell style={{ width: '34%', minWidth: '150px' }}>Дата прохождения</TableCell>
                        <TableCell style={{ width: '33%' }}>Дата окончания</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {!this.state.listData ? null :
                          this.state.listData.map((item, key) => (
                            <TableRow key={key}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>
                                <MyDatePickerNew
                                  label="Дата"
                                  value={dayjs(item?.start ?? '')}
                                  func={this.changeDateRange.bind(this, 'list', item.type)}
                                />
                              </TableCell>
                              <TableCell 
                                style={{ backgroundColor: item.change ? item.change === 'daysOver' ? '#c03' : '#ffcc00' : null,
                                  color: item.change ? item.change === 'daysOver' ? '#fff' : null : null }}>
                                {item.end}
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </TabContext>
          </DialogContent>

          <DialogActions className={this.state.ItemTab === '2' ? 'button' : null}>
            {this.state.ItemTab === '1' ? (
              <Button variant="contained" onClick={this.onClose.bind(this)}>
                Закрыть
              </Button>
            ) : (
              <>
                <Button onClick={this.onClose.bind(this)} variant="contained">
                  Отмена
                </Button>
                <Button color="success" variant="contained" onClick={this.saveHealthBook.bind(this)}>
                  Coxранить
                </Button>
              </>
            )}
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
      city: '',

      points: [],
      pointsCopy: [],
      point: [],

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
        { type: 'type_2', name: 'Отоларинголог' },
        { type: 'type_3', name: 'Патогенный стафилококк' },
        { type: 'type_4', name: 'Стоматолог' },
        { type: 'type_5', name: 'Терапевт' },
        { type: 'type_6', name: 'Мед. осмотр' },
        { type: 'type_7', name: 'Флюорография' },
        { type: 'type_8', name: 'Бак. анализ' },
        { type: 'type_9', name: 'Яйц. глист' },
        { type: 'type_10', name: 'Санитарный минимум' },
      ],

      ItemTab: null,

      modalDialogCloth: false,
      listApp: null,
      listCloth: null,
    };
  }

  async componentDidMount() {
    const data = await this.getData('get_all');

    let city = this.state.city;

    let point = this.state.point;

    city = data.cities.length === 1 ? data.cities[0].id : data.cities.find((city) => city.id === -1).id ?? data.cities[0].id;

    point = data.cities.length === 1 ? [...point, ...data.points] : [...point, ...([data.points.find((point) => point.id === -1)] ?? [data.points[0]])];

    this.setState({
      city,
      point,
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

  changePoint(event, point) {
    const pointName = event.target.innerText;

    if (!point.length) {
      this.setState({ point });

      return;
    }

    if (pointName === 'Все точки') {
      const pointFilter = point.filter((value) => value.id === -1);

      this.setState({ point: pointFilter });

      return;
    }

    if (pointName === 'Офис') {
      const pointFilter = point.filter((value) => value.id === -2);

      this.setState({ point: pointFilter });

      return;
    }

    if (point[0].id === -1 || point[0].id === -2) {
      const pointFilter = point.filter((value) => value.id === point[0].id);

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

  async openModal(user_id, ItemTab) {
    this.handleResize();

    const listData = this.state.listData;

    const data = {
      user_id,
    };

    const res = await this.getData('get_user_info', data);

    listData.forEach((item) => {
      item.change = '';

      for (const key in res.health_book) {
        if (Number(key.split('_')[1]) === Number(item.type.split('_')[1])) {
          if (key.includes('start')) {
            item.start = res.health_book[key];
          }
          if (key.includes('end')) {
            item.end = res.health_book[key];
          }
        }
      }
    });

    this.setState({
      ItemTab,
      listData,
      modalDialog: true,
      user: res.user,
    });
  }

  async saveEdit(date_registration, user_id) {
    const data = {
      user_id,
      date_registration,
    };

    let { st, text } = await this.getData('save_date_registration', data);

    if (st) {
      this.setState({
        openAlert: true,
        err_status: true,
        err_text: 'Изменения сохранены!',
      });

      setTimeout(() => {
        this.getInfo();
      }, 300);
    } else {
      this.setState({
        openAlert: true,
        err_status: false,
        err_text: text,
      });
    }
  }

  async saveHealthBook(data) {
    let { st, text } = await this.getData('save_health_book', data);

    if (st) {
      setTimeout(() => {
        this.getInfo();
      }, 300);
    } else {
      this.setState({
        openAlert: true,
        err_status: false,
        err_text: text,
      });
    }
  }

  async getDataСloth() {
    this.handleResize();

    const res = await this.getData('get_cloth');

    this.setState({
      modalDialogCloth: true,
      listApp: res.app,
      listCloth: res.cloth,
    });
  }

  async saveClothList(items) {
    const data = {
      items,
    };

    const res = await this.getData('save_cloth_list', data);

    if (res.st) {
      this.getDataСloth();

      this.setState({
        openAlert: true,
        err_status: true,
        err_text: 'Список одежды сохранен',
      });
    } else {
      this.setState({
        openAlert: true,
        err_status: false,
        err_text: text,
      });
    }
  }

  async saveClothApp(data) {
    const res = await this.getData('save_cloth_app', data);

    if (res.st) {
      this.setState({
        openAlert: true,
        err_status: true,
        err_text: 'Список одежды для должности сохранен',
      });
    } else {
      this.setState({
        openAlert: true,
        err_status: false,
        err_text: text,
      });
    }
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

        <Experience_Modal_User
          open={this.state.modalDialog}
          onClose={() => this.setState({ modalDialog: false })}
          user={this.state.user}
          fullScreen={this.state.fullScreen}
          saveEdit={this.saveEdit.bind(this)}
          saveHealthBook={this.saveHealthBook.bind(this)}
          listData={this.state.listData}
          ItemTab={this.state.ItemTab}
        />

        <Experience_Modal_Cloth
          open={this.state.modalDialogCloth}
          onClose={() => this.setState({ modalDialogCloth: false })}
          fullScreen={this.state.fullScreen}
          listApp={this.state.listApp}
          listCloth={this.state.listCloth}
          saveClothList={this.saveClothList.bind(this)}
          saveClothApp={this.saveClothApp.bind(this)}
          getData={this.getData.bind(this)}
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

          <Grid item xs={12} sm={4}>
            <Button variant="contained" onClick={this.getInfo.bind(this)} sx={{ whiteSpace: 'nowrap' }}>
              Обновить данные
            </Button>
          </Grid>

          <Grid item xs={12} sm={12} style={{ display: 'none' }}>
            <Button variant="contained" onClick={this.getDataСloth.bind(this)} sx={{ whiteSpace: 'nowrap' }}>
              Предметы одежды
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
                          {stat.days === '0' ? 'Стаж менее года' : `${formatter.format(stat.days)} стажа`}{' '} - {stat.count} сотрудника(-ов)
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
                      <TableCell>
                        Официально: {this.state.stat_of.true_count}{' '}сотрудника(-ов) / {this.state.stat_of.true_perc} % от числа сотрудников
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        Неофициально: {this.state.stat_of.false_count}{' '}сотрудника(-ов) / {this.state.stat_of.false_perc} % от числа сотрудников
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}
        </Grid>

        {/* таблица */}
        {!this.state.users ? null : (
          <Grid container mb={10}>
            <Grid item xs={12} sm={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: '5%' }}>#</TableCell>
                      <TableCell style={{ width: '25%' }}>ФИО</TableCell>
                      <TableCell style={{ width: '20%' }}>Дата устройства на работу</TableCell>
                      <TableCell style={{ width: '20%' }}>Текущая организация</TableCell>
                      <TableCell style={{ width: '10%' }}>Общий стаж год/месяц</TableCell>
                      <TableCell style={{ width: '10%' }}>Должность</TableCell>
                      <TableCell style={{ width: '10%' }}>Статус мед. книжки</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {this.state.users.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell onClick={this.openModal.bind(this, item.id, null)} style={{ cursor: 'pointer', fontWeight: 700 }}>
                          {item.name}
                        </TableCell>
                        <TableCell>{item.date_registration}</TableCell>
                        <TableCell>{item.point}</TableCell>
                        <TableCell>{item.exp}</TableCell>
                        <TableCell>{item.app_name}</TableCell>
                        <TableCell
                          style={{ background: parseInt(item.type) == 0 ? '#fff' : parseInt(item.type) == 1 ? '#fff' : parseInt(item.type) == 2 ? '#ffcc00' : '#c03',
                            color: parseInt(item.type) == 1 ? '#000' : parseInt(item.type) == 2 ? '#000' : '#fff' }}>
                          {item?.status}
                        </TableCell>
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
