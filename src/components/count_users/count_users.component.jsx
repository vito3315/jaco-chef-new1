import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import {
  MySelect,
  MyTimePicker,
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

class CountUsers_Modal extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);

    this.state = {
      item: [],
      date_start: formatDate(new Date()),
      fullScreen: false,
    };
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props);

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

  changeTimeStart(item, event) {
    // console.log(item)

    const eventItem = this.state.item;

    const editEvent = eventItem.map((el) => {
      if (el.id_table === item.id_table) {
        el.time_start = event.target.value;
      }
      return el;
    });

    this.setState({
      item: editEvent,
    });
  }

  changeTimeEnd(el, event) {
    const eventItem = this.state.item;

    const editEvent = eventItem.map((element) => {
      if (element.id_table === el.id_table) {
        element.time_end = event.target.value;
      }
      return element;
    });

    this.setState({
      item: editEvent,
    });
  }

  changeItem(el, item, event) {
    const eventItem = this.state.item;

    const editEvent = eventItem.map((ev) => {
      if (ev.id_table === item.id_table) {
        ev.data.map((obj) => {
          if (obj.post === el.post) {
            obj.quantity = Number(event.target.value);
          }
          return obj;
        });
      }
      return ev;
    });

    this.setState({
      item: editEvent,
    });
  }

  changeDateRange(data, val) {
    this.setState({
      [data]: formatDate(val),
    });
  }

  save() {
    this.props.save(this, this.state.item, this.state.date_start);

    this.setState({
      item: this.props.event ? this.props.event : [],
      date_start: formatDate(new Date()),
    });

    this.props.onClose();
  }

  addItem() {
    const item = this.state.item;

    if (item.length) {
      const newItem = {
        id: item[0].id,
        day: item[0].day,
        id_table: item.length + 1,
        time_start: '',
        time_end: '',
        data: [
          {
            post: 'Кассир',
            quantity: 0,
          },
          {
            post: 'Повар',
            quantity: 0,
          },
          {
            post: 'Кухонный работник',
            quantity: 0,
          },
          {
            post: 'Курьер',
            quantity: 0,
          },
        ],
      };

      item.push(newItem);
    } else {
      const newItem = {
        id: this.props.event[0].id,
        day: this.props.value,
        id_table: 1,
        time_start: '',
        time_end: '',
        data: [
          {
            post: 'Кассир',
            quantity: 0,
          },
          {
            post: 'Повар',
            quantity: 0,
          },
          {
            post: 'Кухонный работник',
            quantity: 0,
          },
          {
            post: 'Курьер',
            quantity: 0,
          },
        ],
      };

      item.push(newItem);
    }

    // console.log(item)

    this.setState({
      item,
    });
  }

  deleteItem(id) {
    const data = this.state.item;

    const item = data.filter((el) => el.id_table !== id);

    this.setState({
      item,
    });
  }

  onClose() {
    this.setState({
      item: this.props.event ? this.props.event : [],
      date_start: formatDate(new Date()),
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
        maxWidth={'md'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="button">
          <Typography style={{ fontWeight: 'normal' }}>
            {this.props.method}
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

        <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
          <Grid container spacing={3} mb={3}>
            <Grid item sm={6}>
              <MyDatePickerNew
                label="Дата"
                value={this.state.date_start}
                func={this.changeDateRange.bind(this, 'date_start')}
              />
            </Grid>
          </Grid>
          <TableContainer>
            <Table size="small" style={{ whiteSpace: 'nowrap' }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '30%' }}>Время</TableCell>
                  <TableCell style={{ width: '30%' }}>Должность</TableCell>
                  <TableCell style={{ width: '20%' }}>Кол-во</TableCell>
                  <TableCell style={{ width: '20%' }}></TableCell>
                </TableRow>
              </TableHead>
              {this.state.item.map((item, key) => (
                <React.Fragment key={key}>
                  <TableBody
                    key={key + 100}
                    sx={{
                      '& td': { border: 0 },
                      borderBottom: 1,
                      borderColor: 'divider',
                    }}
                  >
                    <TableRow>
                      <TableCell rowSpan="5">
                        <Grid item xs={6} sm={12} mb={2}>
                          <MyTimePicker
                            value={item.time_start}
                            func={this.changeTimeStart.bind(this, item)}
                            label="Время начала"
                          />
                        </Grid>
                        <Grid item xs={6} sm={12}>
                          <MyTimePicker
                            value={item.time_end}
                            func={this.changeTimeEnd.bind(this, item)}
                            label="Время окончания"
                          />
                        </Grid>
                      </TableCell>
                    </TableRow>
                    {item.data.map((el, i) => (
                      <TableRow key={i + 1000}>
                        <TableCell>{el.post}</TableCell>
                        <TableCell>
                          <MyTextInput
                            value={el.quantity}
                            type="number"
                            func={this.changeItem.bind(this, el, item)}
                          />
                        </TableCell>
                        {i !== 1 ? null : (
                          <TableCell colSpan="5" align="center">
                            <CloseIcon
                              fontSize="large"
                              onClick={this.deleteItem.bind(
                                this,
                                item.id_table
                              )}
                              style={{ cursor: 'pointer' }}
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </React.Fragment>
              ))}
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions className="button">
          <Button
            style={{ whiteSpace: 'nowrap' }}
            onClick={this.addItem.bind(this)}
          >
            Добавить
          </Button>
          <Button style={{ color: '#00a550' }} onClick={this.save.bind(this)}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

class CountUsers_TablePanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: [],
    };
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props);

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
    this.setState({
      item: this.props.event,
    });
  }

  changeTimeStart(item, event) {
    // console.log(item)

    const eventItem = this.state.item;

    const editEvent = eventItem.map((el) => {
      if (el.id_table === item.id_table) {
        el.time_start = event.target.value;
      }
      return el;
    });

    this.setState({
      item: editEvent,
    });
  }

  changeTimeEnd(el, event) {
    const eventItem = this.state.item;

    const editEvent = eventItem.map((element) => {
      if (element.id_table === el.id_table) {
        element.time_end = event.target.value;
      }
      return element;
    });

    this.setState({
      item: editEvent,
    });
  }

  changeItem(el, item, event) {
    const eventItem = this.state.item;

    const editEvent = eventItem.map((ev) => {
      if (ev.id_table === item.id_table) {
        ev.data.map((obj) => {
          if (obj.post === el.post) {
            obj.quantity = Number(event.target.value);
          }
          return obj;
        });
      }
      return ev;
    });

    this.setState({
      item: editEvent,
    });
  }

  addItem() {
    const item = this.state.item;

    if (item.length) {
      const newItem = {
        id: item[0].id,
        day: item[0].day,
        id_table: item.length + 1,
        time_start: '',
        time_end: '',
        data: [
          {
            post: 'Кассир',
            quantity: 0,
          },
          {
            post: 'Повар',
            quantity: 0,
          },
          {
            post: 'Кухонный работник',
            quantity: 0,
          },
          {
            post: 'Курьер',
            quantity: 0,
          },
        ],
      };

      item.push(newItem);
    } else {
      const newItem = {
        id: this.props.event[0].id,
        day: this.props.value,
        id_table: 1,
        time_start: '',
        time_end: '',
        data: [
          {
            post: 'Кассир',
            quantity: 0,
          },
          {
            post: 'Повар',
            quantity: 0,
          },
          {
            post: 'Кухонный работник',
            quantity: 0,
          },
          {
            post: 'Курьер',
            quantity: 0,
          },
        ],
      };

      item.push(newItem);
    }

    // console.log(item)

    this.setState({
      item,
    });
  }

  deleteItem(id) {
    const data = this.state.item;

    const item = data.filter((el) => el.id_table !== id);

    this.setState({
      item,
    });
  }

  render() {
    return (
      <>
        <TabPanel value={this.props.value} style={{ padding: '0' }}>
          <Grid container spacing={3}>
            {this.state.item.map((item, key) => (
              <React.Fragment key={key}>
                <Grid item xs={8} sm={3}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      height: '100%',
                      minHeight: 120,
                    }}
                  >
                    <MyTimePicker
                      value={item.time_start}
                      func={this.changeTimeStart.bind(this, item)}
                      label="Время начала"
                    />
                    <MyTimePicker
                      value={item.time_end}
                      func={this.changeTimeEnd.bind(this, item)}
                      label="Время окончания"
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sm={0}
                  sx={{
                    display: { xs: 'flex', sm: 'none' },
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CloseIcon
                    fontSize="large"
                    onClick={this.deleteItem.bind(this, item.id_table)}
                    style={{ cursor: 'pointer' }}
                  />
                </Grid>

                <Grid item sm={8}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                  >
                    {item.data.map((el, i) => (
                      <div
                        key={i + 10}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 10,
                        }}
                      >
                        <span style={{ minWidth: 200 }}>{el.post}</span>
                        <MyTextInput
                          value={el.quantity}
                          type="number"
                          func={this.changeItem.bind(this, el, item)}
                        />
                      </div>
                    ))}
                  </div>
                </Grid>

                <Grid
                  item
                  xs={4}
                  sm={1}
                  sx={{
                    display: { xs: 'none', sm: 'flex' },
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CloseIcon
                    fontSize="large"
                    onClick={this.deleteItem.bind(this, item.id_table)}
                    style={{ cursor: 'pointer' }}
                  />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </TabPanel>

        <Grid item sm={12} className="button">
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6}>
              <Button
                variant="contained"
                style={{ whiteSpace: 'nowrap' }}
                onClick={this.addItem.bind(this)}
              >
                Добавить
              </Button>
            </Grid>

            <Grid item xs={6} sm={6}>
              <Button
                variant="contained"
                onClick={this.props.save.bind(this, this.state.item)}
                style={{ backgroundColor: '#00a550', whiteSpace: 'nowrap' }}
              >
                Сохранить
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

class CountUsers_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'count_users',
      module_name: '',
      is_load: false,

      points: [
        {
          id: -1,
          name: 'Выберите точку',
        },
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

      point: -1,

      ItemTab: '1',

      item: [],

      event: [
        {
          id: '1',
          day: '1',
          id_table: 1,
          time_start: '',
          time_end: '',
          data: [
            {
              post: 'Кассир',
              quantity: 1,
            },
            {
              post: 'Повар',
              quantity: 1,
            },
            {
              post: 'Кухонный работник',
              quantity: 1,
            },
            {
              post: 'Курьер',
              quantity: 1,
            },
          ],
        },
        {
          id: '1',
          day: '2',
          id_table: 1,
          time_start: '',
          time_end: '',
          data: [
            {
              post: 'Кассир',
              quantity: 2,
            },
            {
              post: 'Повар',
              quantity: 2,
            },
            {
              post: 'Кухонный работник',
              quantity: 2,
            },
            {
              post: 'Курьер',
              quantity: 2,
            },
          ],
        },
        {
          id: '1',
          day: '3',
          id_table: 1,
          time_start: '',
          time_end: '',
          data: [
            {
              post: 'Кассир',
              quantity: 3,
            },
            {
              post: 'Повар',
              quantity: 3,
            },
            {
              post: 'Кухонный работник',
              quantity: 3,
            },
            {
              post: 'Курьер',
              quantity: 3,
            },
          ],
        },
      ],

      data: [
        {
          id: '1',
          data_table: '2022-10-05',
          time_start: '19:30',
          time_end: '20:30',
          data: [
            {
              post: 'Кассир',
              quantity: 1,
            },
            {
              post: 'Повар',
              quantity: 1,
            },
            {
              post: 'Кухонный работник',
              quantity: 1,
            },
            {
              post: 'Курьер',
              quantity: 1,
            },
          ],
        },
        {
          id: '1',
          data_table: '2022-10-06',
          time_start: '20:30',
          time_end: '21:30',
          data: [
            {
              post: 'Кассир',
              quantity: 2,
            },
            {
              post: 'Повар',
              quantity: 2,
            },
            {
              post: 'Кухонный работник',
              quantity: 2,
            },
            {
              post: 'Курьер',
              quantity: 2,
            },
          ],
        },
        {
          id: '1',
          data_table: '2022-10-07',
          time_start: '22:30',
          time_end: '23:30',
          data: [
            {
              post: 'Кассир',
              quantity: 3,
            },
            {
              post: 'Повар',
              quantity: 3,
            },
            {
              post: 'Кухонный работник',
              quantity: 3,
            },
            {
              post: 'Курьер',
              quantity: 3,
            },
          ],
        },
      ],

      dataPoint: [],

      modalDialog: false,
    };
  }

  async componentDidMount() {
    let data = await this.getData('get_all');

    // console.log(data);

    this.setState({
      // points: data.points,
      // point: data.points[0].id,
      module_name: data.module_info.name,
    });

    // document.title = data.module_info.name;

    // setTimeout( () => {
    //   this.updateData();
    // }, 50 )
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
    const data = event.target.value;

    const eventFilter = this.state.event;

    const dataFilter = this.state.data;

    // console.log(dataFilter);

    const item = eventFilter.filter(
      (el) => event.target.value === el.id && this.state.ItemTab === el.day
    );

    const dataPoint = dataFilter.filter((el) => event.target.value === el.id);

    if (!item.length) {
      const newItem = {
        id: data,
        day: '1',
        id_table: 1,
        time_start: '',
        time_end: '',
        data: [
          {
            post: 'Кассир',
            quantity: 0,
          },
          {
            post: 'Повар',
            quantity: 0,
          },
          {
            post: 'Кухонный работник',
            quantity: 0,
          },
          {
            post: 'Курьер',
            quantity: 0,
          },
        ],
      };

      item.push(newItem);
    }

    this.setState({
      point: data,
      dataPoint,
      item,
    });
  }

  changeTab(event, value) {
    const item = this.state.event.filter(
      (el) => value === el.day && this.state.point === el.id
    );

    if (!item.length) {
      const newItem = {
        id: this.state.point,
        day: value,
        id_table: 1,
        time_start: '',
        time_end: '',
        data: [
          {
            post: 'Кассир',
            quantity: 0,
          },
          {
            post: 'Повар',
            quantity: 0,
          },
          {
            post: 'Кухонный работник',
            quantity: 0,
          },
          {
            post: 'Курьер',
            quantity: 0,
          },
        ],
      };

      item.push(newItem);
    }

    this.setState({
      ItemTab: value,
      item,
    });
  }

  openModal(method, item, event) {
    if (method === 'Особый день') {
      const item = [];

      const newItem = {
        id: this.state.point,
        data_table: '',
        time_start: '',
        time_end: '',
        data: [
          {
            post: 'Кассир',
            quantity: 0,
          },
          {
            post: 'Повар',
            quantity: 0,
          },
          {
            post: 'Кухонный работник',
            quantity: 0,
          },
          {
            post: 'Курьер',
            quantity: 0,
          },
        ],
      };

      item.push(newItem);

      this.setState({
        modalDialog: true,
        method,
        item,
      });
    }

    if (method === 'Редактировать особый день') {
      event.stopPropagation();

      // console.log(item)
      this.setState({
        modalDialog: true,
        method,
        item: [item],
      });
    }
  }

  saveItem(item, data) {
    // console.log(item);
    // console.log(data);
  }

  deleteItem(item, event) {
    event.stopPropagation();
    // console.log(item)
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        {/* модалка */}
        <CountUsers_Modal
          open={this.state.modalDialog}
          onClose={() => {
            this.setState({ modalDialog: false });
          }}
          method={this.state.method}
          event={this.state.item}
          save={this.saveItem.bind(this)}
        />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          {/* выбор и кнопка */}

          <Grid item xs={12} sm={6}>
            <MySelect
              data={this.state.points}
              value={this.state.point}
              func={this.changePoint.bind(this)}
              label="Точка"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              disabled={this.state.point < 1 ? true : false}
              variant={this.state.point < 1 ? 'outlined' : 'contained'}
              style={{ whiteSpace: 'nowrap' }}
              onClick={this.openModal.bind(this, 'Особый день')}
            >
              Добавить особый день
            </Button>
          </Grid>

          {/* таблица */}

          {this.state.point < 1 ? null : (
            <Grid item xs={12} sm={8}>
              <TabContext value={this.state.ItemTab}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    marginBottom: 3,
                  }}
                >
                  <TabList
                    onChange={this.changeTab.bind(this)}
                    //variant="fullWidth"
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                  >
                    <Tab label="Понедельник" value="1" />
                    <Tab label="Вторник" value="2" />
                    <Tab label="Среда" value="3" />
                    <Tab label="Четверг" value="4" />
                    <Tab label="Пятница" value="5" />
                    <Tab label="Суббота" value="6" />
                    <Tab label="Воскресенье" value="7" />
                  </TabList>
                </Box>

                <CountUsers_TablePanel
                  value={this.state.ItemTab}
                  event={this.state.item}
                  save={this.saveItem.bind(this)}
                />
              </TabContext>
            </Grid>

          )}

            {/* аккордион */}
            {this.state.point < 1 || !this.state.dataPoint.length ? null : (
            <Grid item xs={12} sm={4}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                >
                  <Typography>Даты</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {this.state.dataPoint.map((item, i) => (
                    <Accordion key={i}>
                      <AccordionSummary
                        expandIcon={
                          <CloseIcon
                            onClick={this.deleteItem.bind(this, item)}
                          />
                        }
                      >
                        <Typography
                          onClick={this.openModal.bind(
                            this,
                            'Редактировать особый день',
                            item
                          )}
                        >
                          {item.data_table}
                        </Typography>
                      </AccordionSummary>
                    </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Grid>
          )}
        </Grid>
      </>
    );
  }
}

export function CountUsers() {
  return <CountUsers_ />;
}
