import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import Dropzone from 'dropzone';

import {
  MyDatePickerNew,
  MySelect,
  MyAutocomplite,
  MyTimePicker,
  MyCheckBox,
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

class Fines_err_Modal_item extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);

    this.state = {
      item: null,
      fullScreen: false,
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

  onClose() {
    this.setState({
      item: null,
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
      >
        <DialogTitle className="button">
          {this.props.text}
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
          <Grid container spacing={3} justifyContent="center" mb={3}>
            <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center">
              <Typography
                sx={{
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                }}
              >
                Точка
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {this.state.item ? this.state.item.point_info.name : 'не указана'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center">
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  fontWeight: 'bold',
                }}
              >
                Дата ошибки
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {this.state.item ? this.state.item.err.date : 'не указана'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center">
              <Typography
                sx={{
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                }}
              >
                Время совершения ошибки
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {this.state.item ? this.state.item.err.time : 'не указано'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center">
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  fontWeight: 'bold',
                }}
              >
                Комментарии
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'normal',
                  textAlign: 'center',
                }}
              >
                {this.state.item ? this.state.item.err.comment : 'не указаны'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center">
              <Typography
                sx={{
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                }}
              >
                Ошибка
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'normal',
                  textAlign: 'center',
                }}
              >
                {this.state.item ? this.state.item.err.fine_name : 'не указана'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center">
              <Typography
                sx={{
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                }}
              >
                Фото ошибки
              </Typography>
              <Grid
                sx={{
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {this.state.item ? (
                  !this.state.item.imgs.length ? (
                    'Фото отсутствует'
                  ) : (
                    <img src={ 'https://jacochef.ru/src/img/fine_err/uploads/' + this.state.item.imgs[0] } style={{ maxWidth: 300, maxHeight: 400 }} />
                  )
                ) : (
                  'Фото отсутствует'
                )}
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center" >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                }}
              >
                Сотрудник
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {this.state.item ? this.state.item.user.name ?? 'ФИО не указано' : 'ФИО не указано'}
              </Typography>
              <Grid
                sx={{
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {this.state.item ? (
                  this.state.item.user.img ? (
                    <img src={ 'https://storage.yandexcloud.net/user-img/max-img/' + this.state.item.user.img } style={{ maxWidth: 300, maxHeight: 300 }} />
                  ) : (
                    'Фото отсутствует'
                  )
                ) : (
                  'Фото отсутствует'
                )}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
}

class Fines_err_Modal_NewItem extends React.Component {
  dropzoneOptions = {
    autoProcessQueue: false,
    autoQueue: true,
    maxFiles: 1,
    timeout: 0,
    parallelUploads: 10,
    acceptedFiles: 'image/jpeg,image/png',
    addRemoveLinks: true,
    url: 'https://jacochef.ru/src/img/users/upload.php',
  };
  myDropzone = null;
  isInit = false;

  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);

    this.state = {
      points: [],
      point: '',

      fines: [],
      fine: '',

      users: [],
      user: '',

      apps: [],
      app: '',

      date: '',
      time: '00:00',
      is_active: 0,
      comment: '',

      fullScreen: false,
      selected: '',

      snackbar: false,
      error: '',
    };
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props);

    if (!this.props.points) {
      return;
    }

    if (this.props.points !== prevProps.points) {
      this.setState({
        points: this.props.points,
        point: this.props.points[0].id,
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

  changeAutocomplite(data, event, value) {
    if (data === 'user') {
      this.setState({
        [data]: value,
        selected: value.id,
      });
    } else {
      this.setState({
        [data]: value,
      });
    }
  }

  changeItemChecked(data, event) {
    const value = event.target.checked === true ? 1 : 0;

    this.setState({
      [data]: value,
    });
  }

  changeItem(data, event) {
    this.setState({
      [data]: event.target.value,
    });
  }

  changePoint(data, event) {
    const date = this.state.date;

    if (event.target.value !== '' && date !== '') {
      this.setState({
        user: '',
      });

      const point_id = event.target.value;

      this.getUsers(point_id, date);
    }

    this.setState({
      [data]: event.target.value,
    });
  }

  changeDateRange(data, event) {
    const point_id = this.state.point;

    if (event !== '' && point_id !== '') {
      const date = formatDate(event);

      this.getUsers(point_id, date);
    }

    this.setState({
      [data]: event ? formatDate(event) : '',
    });
  }

  async getUsers(point_id, date) {
    const data = {
      point_id,
      date,
    };

    const res = await this.props.getData('get_users', data);

    this.setState({
      fines: res.fines,
      apps: res.apps,
      users: res.users,
    });

    setTimeout(() => {
      this.myDropzone = new Dropzone('#for_img_new', this.dropzoneOptions);

      this.click = false;
    }, 300);
  }

  changeClass(user, event) {
    if (event.target.classList.contains('choose_user')) {
      this.setState({
        user: '',
      });
    } else {
      this.setState({
        user,
      });
    }

    event.target.classList.toggle('choose_user');

    this.setState({
      selected: user.id,
    });
  }

  save() {

    if( !this.click ) {
      this.click = true;  

    const point_id = this.state.point;
    const fine = this.state.fine;
    const date = this.state.date;
    const user = this.state.user;
    const time = this.state.time;

    if(!point_id || !fine || !date || !user || !time || time === '00:00' || !user.id || !fine.id) {

      const text = "Для сохранения новой Ошибки, необходимо выбрать: Точку, Дату, Ошибку, Сотрудника и указать Время ошибки"

      this.setState({
        error: text,
        snackbar: true,
      });

      setTimeout(() => {
        this.click = false;
      }, 300);

      return;
    }

    let img = 0;

    if (this.myDropzone['files'].length > 0 && this.isInit === false) {

      img = 1;

      this.isInit = true;

      this.myDropzone.on("sending", (file, xhr, data) => {

          i++;
          let file_type = (file.name).split('.');
          file_type = file_type[file_type.length - 1];
          file_type = file_type.toLowerCase();

          // "file_1_point_id_1_id_2226.jpg"

          data.append("filetype", 'file_' + i + '_point_id_' + point + '_id_' + fines_err.global_new_id + '.' + file_type);

          this.getOrientation(file, function (orientation) {
              data.append("orientation", orientation);
          })
      });

      this.myDropzone.on("queuecomplete", (data) => {

          var check_img = false;

          this.myDropzone['files'].map(function (item, key) {
              if (item['status'] == "error") {
                  check_img = true;
              }
          })

          if (check_img) {

            this.setState({
              error: 'Ошибка при загрузке фотографии',
              snackbar: true,
            });
    
            return;
          }

          this.isInit = false;
      })
    }

    const data = {
      fine: fine.id,
      user: user.id,
      point_id,
      date,
      time,
      img,
    };

    this.props.save(data);

    this.onClose();

    setTimeout( () => {
      this.click = false;    
    }, 300 )
  }
  }

  onClose() {
    this.setState({
      points: [],
      point: '',

      fines: [],
      fine: '',

      users: [],
      user: '',

      apps: [],
      app: '',

      date: '',
      time: '00:00',
      is_active: 0,
      comment: '',

      selected: '',
    });

    this.props.onClose();
  }

  render() {
    return (
      <>
        <Snackbar
          open={this.state.snackbar}
          autoHideDuration={30000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          onClose={() => { this.setState({ snackbar: false }); }}
        >
          <Alert
            onClose={() => { this.setState({ snackbar: false }); }}
            severity={'error'}
            sx={{ width: '100%' }}
          >
            {this.state.error}
          </Alert>
        </Snackbar>

        <Dialog
          open={this.props.open}
          onClose={this.onClose.bind(this)}
          fullScreen={this.state.fullScreen}
          fullWidth={true}
          maxWidth={'lg'}
        >
          <DialogTitle className="button">
            {this.props.text}
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
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <MySelect
                  data={this.state.points}
                  value={this.state.point}
                  func={this.changePoint.bind(this, 'point')}
                  label="Точка"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <MyDatePickerNew
                  label="Дата"
                  value={this.state.date}
                  func={this.changeDateRange.bind(this, 'date')}
                />
              </Grid>

              {!this.state.fines.length ? null : (
                <>
                  <Grid item xs={12} sm={3}>
                    <MyAutocomplite
                      label="Ошибка"
                      multiple={false}
                      data={this.state.fines}
                      value={this.state.fine}
                      func={this.changeAutocomplite.bind(this, 'fine')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <MySelect
                      data={this.state.apps}
                      value={this.state.app}
                      func={this.changeItem.bind(this, 'app')}
                      label="Должность"
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <MyTimePicker
                      value={this.state.time}
                      func={this.changeItem.bind(this, 'time')}
                      label="Время ошибки"
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <MyCheckBox
                      label="Не могу определиться с виновником"
                      value={this.state.is_active == 1 ? true : false}
                      func={this.changeItemChecked.bind(this, 'is_active')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MyTextInput
                      label="Комментарии"
                      multiline={true}
                      maxRows={5}
                      value={this.state.comment}
                      func={this.changeItem.bind(this, 'comment')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MyAutocomplite
                      label="Сотрудник"
                      multiple={false}
                      data={this.state.users}
                      value={this.state.user}
                      func={this.changeAutocomplite.bind(this, 'user')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <div
                      className="dropzone"
                      id="for_img_new"
                      style={{ width: '100%', minHeight: 150 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    {this.state.users.map((user, key) => (
                      <React.Fragment key={key}>
                        {!user.img ? null : (
                          <img
                            src={
                              'https://storage.yandexcloud.net/user-img/max-img/' +
                              user.img
                            }
                            style={{ maxWidth: 300, maxHeight: 300 }}
                            onClick={this.changeClass.bind(this, user)}
                            className={
                              this.state.selected === user.id
                                ? 'choose_user'
                                : ''
                            }
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </Grid>
                </>
              )}
            </Grid>
          </DialogContent>

          <DialogActions className="button">
            <Button
              variant="contained"
              style={{ backgroundColor: '#00a550', whiteSpace: 'nowrap' }}
              onClick={this.save.bind(this)}
            >
              Сохранить
            </Button>
            <Button
              variant="contained"
              style={{ whiteSpace: 'nowrap' }}
              onClick={this.onClose.bind(this)}
            >
              Отмена
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

class Fines_err_Table extends React.Component {
  /*shouldComponentUpdate(nextProps) {
    var array1 = nextProps.list;
    var array2 = this.props.list;

    var is_same =
      array1.length == array2.length &&
      array1.every(function (element, index) {
        return element === array2[index];
      });

    return !is_same;
  }*/

  render() {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '10%' }}>Кто добавил</TableCell>
              <TableCell style={{ width: '10%' }}>Сотрудник</TableCell>
              <TableCell style={{ width: '10%' }}>Дата ошибки</TableCell>
              <TableCell style={{ width: '10%' }}>Дата закрытия</TableCell>
              <TableCell style={{ width: '30%' }}>Ошибка</TableCell>
              <TableCell style={{ width: '30%' }}>Фото</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {this.props.ret_list.map((item, i) => (
              <TableRow
                key={i}
                style={{ cursor: 'pointer' }}
                onClick={this.props.openModal.bind(this, 'item', 'Ошибка сотрудника', item.id)}
              >
                <TableCell>{item.find_user_name}</TableCell>
                <TableCell>{item.user_name}</TableCell>
                <TableCell>{item.date} {item.time}</TableCell>
                <TableCell>{item.date_close}</TableCell>
                <TableCell>{item.fine_name}</TableCell>
                <TableCell>
                  {item.imgs.length == 0 ? null : (
                    <img src={'https://jacochef.ru/src/img/fine_err/uploads/' + item.imgs[0]} style={{ maxWidth: 150, maxHeight: 150 }} />
                  )}
                </TableCell>
              </TableRow>
            ))}
            {this.props.all_list.map((item, i) => (
              <TableRow
                key={i}
                style={{ cursor: 'pointer', backgroundColor: item.user_name == null ? '#926eae' : '#6ab04c', color: '#fff', fontWeight: 300 }}
                onClick={this.props.openModal.bind(this, 'item', 'Ошибка сотрудника', item.id)}
              >
                <TableCell>{item.find_user_name}</TableCell>
                <TableCell>{item.user_name}</TableCell>
                <TableCell>{item.date} {item.time}</TableCell>
                <TableCell>{item.date_close}</TableCell>
                <TableCell>{item.fine_name}</TableCell>
                <TableCell>
                  {item.imgs.length == 0 ? null : (
                    <img src={'https://jacochef.ru/src/img/fine_err/uploads/' + item.imgs[0]} style={{ maxWidth: 150, maxHeight: 150 }} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

class Fines_err_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'fines_err',
      module_name: '',
      is_load: false,

      points: [],
      point: '',

      date_start: '',
      date_end: '',

      all_list: [],
      ret_list: [],

      modalDialogNew: false,
      modalDialog: false,

      pointsDialog: [],
      method: '',
      text: '',

      item: null,
    };
  }

  async componentDidMount() {
    let data = await this.getData('get_all');

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

  changeDateRange(data, event) {
    this.setState({
      [data]: event ? formatDate(event) : '',
    });
  }

  changePoint(event) {
    this.setState({
      point: event.target.value,
      all_list: [],
    });
  }

  async openModal(method, text, id) {
    if (method === 'newItem') {
      const res = await this.getData('get_all_for_new');

      this.setState({
        pointsDialog: res.points,
        modalDialogNew: true,
        method,
        text,
      });
    }

    if (method === 'item') {
      const data = {
        id,
      };

      const res = await this.getData('get_one', data);

      this.setState({
        item: res,
        modalDialog: true,
        method,
        text,
      });
    }
  }

  async getItems() {
    const data = {
      point_id: this.state.point,
      date_start: this.state.date_start,
      date_end: this.state.date_end,
    };

    const res = await this.getData('get_data', data);

    this.setState({
      all_list: res.all_list,
      ret_list: res.ret_list
    });
  }

  async saveNewItem(data) {
    console.log(data);

    // await this.getData('save_new', data);

  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Fines_err_Modal_NewItem
          open={this.state.modalDialogNew}
          onClose={() => { this.setState({ modalDialogNew: false }); }}
          method={this.state.method}
          points={this.state.pointsDialog}
          text={this.state.text}
          getData={this.getData.bind(this)}
          save={this.saveNewItem.bind(this)}
        />

        <Fines_err_Modal_item
          open={this.state.modalDialog}
          onClose={() => { this.setState({ modalDialog: false }); }}
          method={this.state.method}
          text={this.state.text}
          item={this.state.item}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button
              onClick={this.openModal.bind(this, 'newItem', 'Новая ошибка')}
              variant="contained"
            >
              Добавить ошибку
            </Button>
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

         
          <Grid item xs={12} sm={12}>
            <Fines_err_Table
              all_list={this.state.all_list}
              ret_list={this.state.ret_list}
              openModal={this.openModal.bind(this)}
            />
          </Grid>
    
        </Grid>
      </>
    );
  }
}

export function FinesErr() {
  return <Fines_err_ />;
}
