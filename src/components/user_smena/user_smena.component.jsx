import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MySelect, MyTextInput } from '../../stores/elements';

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

class UserSmena_Modal extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);

    this.state = {
      item: [],

      point: -1,

      newSmena: [],

      smena: [],

      name: '',

      smenaName: '',

      history: [],

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
        name: this.props.event.name ? this.props.event.name : '',
        newSmena:
          this.props.method === 'Создание смены' ? [] : [this.props.event],
        smena:
          this.props.method === 'Создание смены'
            ? []
            : this.props.editSmena[0].data,
        smenaName:
          this.props.method === 'Редактирование смены'
            ? this.props.smenaName
            : '',
        history:
          this.props.method === 'Редактирование смены'
            ? this.props.event.history
            : [],
      });
    }
  }

  changeItem(event) {
    this.setState({
      name: event.target.value,
    });
  }

  changePoint(event) {
    const data = this.state.item;

    const smena = data.filter((el) => el.id === event.target.value);

    this.setState({
      point: event.target.value,
      smena: smena[0].data,
    });
  }

  addEmployeeSmena(employee) {
    const vendor = this.state.newSmena;

    const data = this.state.smena;

    const smena = data.filter((el) => el.fullName !== employee.fullName);

    if (!this.state.name) {
      alert('Заполните наименование смены');
      return;
    }

    if (!vendor.length) {
      const obj = {
        id: this.state.point,
        name: this.state.name,
        history: [],
        data: [employee],
      };

      vendor.push(obj);
    } else {
      // vendor[0].name = this.state.name;
      vendor[0].data.push(employee);
    }

    this.setState({
      newSmena: vendor,
      smena,
    });
  }

  deleteEmployeeSmena(employee) {
    const newSmena = this.state.newSmena;

    const smena = this.state.smena;

    const vendor = newSmena[0].data.filter(
      (el) => el.fullName !== employee.fullName
    );

    newSmena[0].data = vendor;
    // newSmena[0].name = this.state.name;

    smena.push(employee);

    this.setState({
      smena,
      newSmena,
    });
  }

  save() {
    this.props.save(
      this,
      this.props.method,
      this.state.newSmena,
      this.state.smena,
      this.state.name
    );

    this.setState({
      item: [],
      point: -1,
      newSmena: [],
      smena: [],
      name: '',
      smenaName: '',
    });
  }

  delete() {
    const isDelete = confirm('Вы действительно хотите удалить данную смену?');

    if (isDelete) {
      this.props.delete(this.props.event);

      this.setState({
        item: [],
        point: -1,
        newSmena: [],
        smena: [],
        name: '',
        smenaName: '',
      });
    }
  }

  onClose() {
    this.setState({
      item: this.props.event ? this.props.event : [],
      point: -1,
      newSmena:
        this.props.method === 'Создание смены' ? [] : [this.props.event],
      smena:
        this.props.method === 'Создание смены'
          ? []
          : this.props.editSmena[0].data,
      name: this.props.event ? this.props.event.name : '',
      smenaName:
        this.props.method === 'Редактирование смены'
          ? this.props.smenaName
          : '',
      history:
        this.props.method === 'Редактирование смены'
          ? this.props.event.history
          : [],
    });

    this.props.onClose();
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

  render() {
    return (
      <Dialog
        fullScreen={this.state.fullScreen}
        open={this.props.open}
        onClose={this.onClose.bind(this)}
        fullWidth={true}
        maxWidth={'lg'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle disableTypography className="dialogTitle">
          <h4 style={{ fontWeight: 'normal' }}>
            {this.props.method} {this.state.smenaName}
          </h4>
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
          {this.props.method === 'Создание смены' ? (
            <Grid container spacing={3} className="OpenModalM">
              <Grid item xs={6} sm={6}>
                <MySelect
                  data={this.props.points}
                  value={this.state.point}
                  func={this.changePoint.bind(this)}
                  label="Точка"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <MyTextInput
                  label="Наименование смены"
                  value={this.state.name}
                  func={this.changeItem.bind(this)}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={3} className="OpenModalM">
              <Grid item xs={6} sm={6}>
                <MyTextInput
                  label="Наименование смены"
                  value={this.state.name}
                  func={this.changeItem.bind(this)}
                />
              </Grid>
            </Grid>
          )}

          <Grid container spacing={3} mb={3} className="OpenModalM">
            <Grid item xs={6} sm={6}>
              <Grid mt={3}>
                Оставшиеся сотрудники
              </Grid>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: '5%' }}>#</TableCell>
                    <TableCell style={{ width: '40%' }}>Ф.И.О.</TableCell>
                    <TableCell style={{ width: '50%' }}>Должность</TableCell>
                    <TableCell style={{ width: '5%' }}></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {this.state.smena.map((item, i) => (
                    <TableRow key={i} sx={{ '& td': { border: 0 } }}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{item.fullName}</TableCell>
                      <TableCell>{item.post}</TableCell>
                      <TableCell>
                        <AddIcon
                          onClick={this.addEmployeeSmena.bind(this, item)}
                          style={{ cursor: 'pointer' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Divider />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Grid mt={3}>
                Сотрудники в смене
              </Grid>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: '5%' }}>#</TableCell>
                    <TableCell style={{ width: '40%' }}>Ф.И.О.</TableCell>
                    <TableCell style={{ width: '50%' }}>Должность</TableCell>
                    <TableCell style={{ width: '5%' }}></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {this.state.newSmena.map((item) =>
                    item.data.map((item, i) => (
                      <TableRow key={i} sx={{ '& td': { border: 0 } }}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{item.fullName}</TableCell>
                        <TableCell>{item.post}</TableCell>
                        <TableCell>
                          <CloseIcon
                            onClick={this.deleteEmployeeSmena.bind(this, item)}
                            style={{ cursor: 'pointer' }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <Divider />
            </Grid>
          </Grid>

          {/* {this.props.method === 'Редактирование смены' ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography>История изменений</Typography>
              </AccordionSummary>

              <Table>
                <TableBody>
                  <TableRow sx={{ '& td': { border: 0 } }}>
                    <TableCell>Дата обновления</TableCell>
                    <TableCell>Кто обновил</TableCell>
                    <TableCell>Название смена</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <AccordionDetails>
                {this.state.history.map((item, i) => (
                  <Accordion key={i}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                    >
                      <Table>
                        <TableBody>
                          <TableRow key={i} sx={{ '& td': { border: 0 } }}>
                            <TableCell>{item.time}</TableCell>
                            <TableCell>{item.fullName}</TableCell>
                            <TableCell>{this.state.name}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Ф.И.О.</TableCell>
                            <TableCell>Должность</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {item.data.map((item, i) => (
                            <TableRow key={i} sx={{ '& td': { border: 0 } }}>
                              <TableCell>{i + 1}</TableCell>
                              <TableCell>{item.fullName}</TableCell>
                              <TableCell>{item.post}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </AccordionDetails>
            </Accordion>
          ) : null} */}
        </DialogContent>

        <DialogActions className={this.props.method === 'Редактирование смены' ? "dialogTitle" : null}>
          {this.props.method === 'Редактирование смены' ? (
            <Button onClick={this.delete.bind(this)} color="primary">
              Удалить смену
            </Button>
          ) : null}
          <Button onClick={this.save.bind(this)} style={{ color: '#00a550'}}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

class UserSmena_Table extends React.Component {
  shouldComponentUpdate(nextProps) {
    var array1 = nextProps.event;
    var array2 = this.props.event;

    var is_same =
      array1.length == array2.length &&
      array1.every(function (element, index) {
        return element === array2[index];
      });

    return !is_same;
  }

  render() {
    return (
      <>
        {this.props.event.map((item, i) => (
          <React.Fragment key={i}>
            <Grid
              style={{ cursor: 'pointer' }}
              mt={3}
              onClick={this.props.openModal.bind(
                this,
                'Редактирование смены',
                item
              )}
            >
              {item.name}
            </Grid>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Ф.И.О.</TableCell>
                  <TableCell>Должность</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {item.data.map((item, i) => (
                  <TableRow key={i} sx={{ '& td': { border: 0 } }}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{item.fullName}</TableCell>
                    <TableCell>{item.post}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Divider />
          </React.Fragment>
        ))}
      </>
    );
  }
}

class UserSmena_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'user_smena',
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

      point: '0',

      date_update: formatDate(new Date()),

      shifts: [
        {
          id: '1',
          name: '1 смена',
          history: [
            {
              time: '2019-09-30 14:20:59',
              fullName: 'Волина И.В.',
              post: 'Директор кафе',
              data: [
                {
                  fullName: 'Папулова И.А.',
                  post: 'Менеджер',
                },
                {
                  fullName: 'Заверюха Д.А.',
                  post: '	Кассир',
                },
                {
                  fullName: 'Усилова А.А.',
                  post: 'Кассир',
                },
              ],
            },
            {
              time: '2019-09-30 14:20:59',
              fullName: 'Волина И.В.',
              post: 'Директор кафе',
              data: [
                {
                  fullName: 'Папулова И.А.',
                  post: 'Менеджер',
                },
                {
                  fullName: 'Заверюха Д.А.',
                  post: '	Кассир',
                },
                {
                  fullName: 'Усилова А.А.',
                  post: 'Кассир',
                },
              ],
            },
          ],
          data: [
            {
              fullName: 'Волина И.В.',
              post: 'Директор кафе',
            },
            {
              fullName: 'Мазалова Г.М.',
              post: 'Менеджер',
            },
            {
              fullName: 'Пасканная Я.А.',
              post: 'Кассир',
            },
            {
              fullName: 'Заверюшка Д.А.',
              post: 'Повар универсал',
            },
            {
              fullName: 'Иконников Н.С.',
              post: 'Повар универсал',
            },
          ],
        },
        {
          id: '1',
          name: '2 смена',
          history: [
            {
              time: '2019-09-30 14:20:59',
              fullName: 'Волина И.В.',
              post: 'Директор кафе',
              data: [
                {
                  fullName: 'Папулова И.А.',
                  post: 'Менеджер',
                },
                {
                  fullName: 'Заверюха Д.А.',
                  post: '	Кассир',
                },
                {
                  fullName: 'Усилова А.А.',
                  post: 'Кассир',
                },
              ],
            },
          ],
          data: [
            {
              fullName: 'Папулова И.А.',
              post: 'Менеджер',
            },
            {
              fullName: 'Заверюха Д.А.',
              post: '	Кассир',
            },
            {
              fullName: 'Усилова А.А.',
              post: 'Кассир',
            },
            {
              fullName: 'Чихирев А.В.',
              post: 'Повар универсал',
            },
            {
              fullName: 'Зяблицкая М.Ю.',
              post: 'Повар универсал',
            },
          ],
        },
        {
          id: '2',
          name: '1 смена',
          history: [
            {
              time: '2019-10-18 15:11:00',
              fullName: 'Крючков А.В.',
              post: 'Директор кафе',
              data: [
                {
                  fullName: 'Савельева С.О.',
                  post: 'Кассир',
                },
                {
                  fullName: 'Коркин Г.А.',
                  post: 'Повар универсал',
                },
                {
                  fullName: 'Иванов Д.И.',
                  post: 'Повар универсал',
                },
              ],
            },
          ],
          data: [
            {
              fullName: 'Крючков А.В.',
              post: 'Директор кафе',
            },
            {
              fullName: 'Лапотников Л.В.',
              post: 'Менеджер',
            },
            {
              fullName: 'Савельева С.О.',
              post: 'Кассир',
            },
            {
              fullName: 'Коркин Г.А.',
              post: 'Повар универсал',
            },
            {
              fullName: 'Иванов Д.И.',
              post: 'Повар универсал',
            },
          ],
        },
        {
          id: '2',
          name: '2 смена',
          history: [
            {
              time: '2019-10-18 15:11:00',
              fullName: 'Крючков А.В.',
              post: 'Директор кафе',
              data: [
                {
                  fullName: 'Савельева С.О.',
                  post: 'Кассир',
                },
                {
                  fullName: 'Коркин Г.А.',
                  post: 'Повар универсал',
                },
                {
                  fullName: 'Иванов Д.И.',
                  post: 'Повар универсал',
                },
              ],
            },
          ],
          data: [
            {
              fullName: 'Кожемякина А.В.',
              post: 'Менеджер',
            },
            {
              fullName: 'Абрамова С.Д.',
              post: '	Кассир',
            },
            {
              fullName: 'Тумаева А.С.',
              post: 'Кассир',
            },
            {
              fullName: 'Джафарова С.В.',
              post: 'Повар универсал',
            },
            {
              fullName: '	Илларионова Е.А.',
              post: 'Повар универсал',
            },
          ],
        },
      ],

      remaining: [
        {
          id: '1',
          data: [
            {
              fullName: 'Трифонов А.А.',
              post: 'Курьер',
            },
            {
              fullName: 'Покарев А.Д.',
              post: 'Курьер',
            },
            {
              fullName: 'Воробьев Д.А.',
              post: 'Повар стажер',
            },
            {
              fullName: 'Заверюшка Д.А.',
              post: 'Повар стажер',
            },
            {
              fullName: 'Умерова Э.М.',
              post: 'Кухонный работник стажер',
            },
          ],
        },
        {
          id: '2',
          data: [
            {
              fullName: 'Шекуров М.Ю.',
              post: 'Менеджер',
            },
            {
              fullName: 'Козлова А.С.',
              post: 'Кассир стажер',
            },
            {
              fullName: 'Савенкова А.С.',
              post: 'Кассир стажер',
            },
            {
              fullName: 'Чихирев А.В.',
              post: 'Повар стажер',
            },
          ],
        },
      ],

      event: [],
      modalDialog: false,
      smena: [],
      editSmena: [],
      smenaName: '',
    };
  }

  async componentDidMount() {
    let data = await this.getData('get_all');

    // console.log(data);

    this.setState({
      // points: data.points,
      point: this.state.points[0].id,
      module_name: data.module_info.name,
    });

    document.title = data.module_info.name;

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
    const data = this.state.shifts;

    const smena = data.filter((el) => el.id === event.target.value);

    this.setState({
      point: event.target.value,
      smena,
    });
  }

  openModal(method, event) {
    if (method === 'Создание смены') {
      this.setState({
        modalDialog: true,
        method,
        event: this.state.remaining,
      });
    }

    if (method === 'Редактирование смены') {
      // console.log(event);

      const data = this.state.remaining;

      const editSmena = data.filter((el) => el.id === event.id);

      this.setState({
        modalDialog: true,
        method,
        smenaName: event.name,
        editSmena,
        event,
      });
    }
  }

  saveItem(event, method, newSmena, smena, name) {
    // console.log(method);
    // console.log(newSmena);
    // console.log(smena);

    // if (method === 'Создание смены') {
    const remaining = this.state.remaining;

    const shifts = this.state.shifts;

    const newRemaining = remaining.map((el) => {
      if (el.id === newSmena[0].id) {
        el.data = smena;
      }
      return el;
    });

    // const newShifts = shifts.filter(el => el.id === newSmena[0].id && el.name === newSmena[0].name);

    // console.log(newShifts);

    // if(newShifts.length) {

    //   alert('Смена с таким названием в данной точке есть');

    //   // return;

    //   this.setState({
    //     modalDialog: false,
    //     // remaining: newRemaining,
    //     // shifts,
    //     // point: -1,
    //     // smena:[]
    //   });

    //   return;
    // }

    // console.log(newShifts);

    newSmena[0].name = name;

    shifts.push(newSmena[0]);

    // console.log(shifts);

    this.setState({
      modalDialog: false,
      remaining: newRemaining,
      shifts,
      point: -1,
      smena: [],
    });
    // }
  }

  deleteItem(smena) {
    // console.log(smena);

    const remaining = this.state.remaining;

    const shifts = this.state.shifts;

    const newRemaining = remaining.map((el) => {
      if (el.id === smena.id) {
        el.data = [...el.data, ...smena.data];
      }
      return el;
    });

    const newShifts = shifts.filter(
      (el) => el.id !== smena.id || el.name !== smena.name
    );

    // console.log(newShifts);

    this.setState({
      modalDialog: false,
      remaining: newRemaining,
      shifts: newShifts,
      point: -1,
      smena: [],
    });
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Grid container spacing={3} mb={2}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
        </Grid>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={6} sm={4}>
            <MySelect
              data={this.state.points}
              value={this.state.point}
              func={this.changePoint.bind(this)}
              label="Точка"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <Button
              variant="contained"
              style={{ whiteSpace: 'nowrap' }}
              onClick={this.openModal.bind(this, 'Создание смены')}
            >
              Добавить смену
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <UserSmena_Table
              event={this.state.smena}
              openModal={this.openModal.bind(this)}
            />
          </Grid>
        </Grid>

        <UserSmena_Modal
          open={this.state.modalDialog}
          onClose={() => {
            this.setState({ modalDialog: false });
          }}
          method={this.state.method}
          event={this.state.event}
          points={this.state.points}
          delete={this.deleteItem.bind(this)}
          save={this.saveItem.bind(this)}
          editSmena={this.state.editSmena}
          smenaName={this.state.smenaName}
        />
      </>
    );
  }
}

export function UserSmena() {
  return <UserSmena_ />;
}
