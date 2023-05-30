import React, {Fragment} from 'react';

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
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import {MyAlert, MySelect, MyTextInput, MyDatePickerNew, MyTimePicker, formatDate} from '../../stores/elements';

import queryString from 'query-string';

class Lamps_Modal_Add extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active_id: this.props.lampEdit?.id ?? '',
      number: this.props.lampEdit?.number ?? '',
      name: this.props.lampEdit?.name ?? '',
      resource: this.props.lampEdit?.resource ?? '',
      place: this.props.lampEdit?.place ?? '',
    };
  }

  changeItem(data, event) {
    this.setState({
      [data]: event.target.value,
    });
  }

  add() {
    const data = {
      id: this.state.active_id,
      number: this.state.number,
      name: this.state.name,
      resource: this.state.resource,
      place: this.state.place,
    };
    

    this.props.add(data);

    //this.onClose();
  }

  onClose() {
    this.setState({
      number: '',
      name: '',
      resource: '',
      place: '',
    });

    this.props.onClose();
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.onClose.bind(this)}
        fullScreen={this.props.fullScreen}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle className="button">
          <IconButton onClick={this.onClose.bind(this)} style={{ cursor: 'pointer' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
          <Grid container spacing={3}>
           
            <Grid item xs={12} sm={12}>
              <MyTextInput
                label="Порядковый номер"
                value={this.state.number}
                func={this.changeItem.bind(this, 'number')}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <MyTextInput
                label="Модель"
                value={this.state.name}
                func={this.changeItem.bind(this, 'name')}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <MyTextInput
                label="Ресурс (часов)"
                value={this.state.resource}
                type={'number'}
                func={this.changeItem.bind(this, 'resource')}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <MyTextInput
                label="Где размещена"
                value={this.state.place}
                func={this.changeItem.bind(this, 'place')}
              />
            </Grid>
              
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={this.add.bind(this)}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

class Lamps_Modal_Add_Active extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active_id: this.props.itemEdit?.id ?? '',
      lamp_id: this.props.itemEdit?.lamp_id ?? '',
      date: formatDate(this.props.itemEdit?.date ?? new Date()),
      time_start: this.props.itemEdit?.time_start ?? '',
      time_end: this.props.itemEdit?.time_end ?? '',
    };
  }

  changeItem(data, event) {
    this.setState({
      [data]: event.target.value,
    });
  }

  add() {
    const data = {
      id: this.state.active_id,
      lamp_id: this.state.lamp_id,
      date: this.state.date,
      time_start: this.state.time_start,
      time_end: this.state.time_end,
    };
    
    this.props.add(data);
  }

  onClose() {
    this.setState({
      number: '',
      name: '',
      resource: '',
      place: '',
    });

    this.props.onClose();
  }

  changeDateRange(data, event) {
    this.setState({
      [data]: event ? formatDate(event) : '',
    });
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.onClose.bind(this)}
        fullScreen={this.props.fullScreen}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle className="button">
          <IconButton onClick={this.onClose.bind(this)} style={{ cursor: 'pointer' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
          <Grid container spacing={3}>
           
            <Grid item xs={12} sm={12}>
              <MySelect
                is_none={false}
                disabled={ this.state.active_id == '' ? false : true }
                data={this.props.lampList}
                value={this.state.lamp_id}
                func={this.changeItem.bind(this, 'lamp_id')}
                label="Лампа"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <MyDatePickerNew
                label="Дата активации"
                disabled={ this.state.active_id == '' ? false : true }
                value={this.state.date}
                func={this.changeDateRange.bind(this, 'date')}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <MyTimePicker
                value={this.state.time_start}
                func={this.changeItem.bind(this, 'time_start')}
                label="Время начала работы"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <MyTimePicker
                value={this.state.time_end}
                func={this.changeItem.bind(this, 'time_end')}
                label="Время окончания работы"
              />
            </Grid>
              
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={this.add.bind(this)}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

class Journal_of_work_of_bactericidal_lamps_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'journal_of_work_of_bactericidal_lamps',
      module_name: '',
      is_load: false,

      points: [],
      point: '0',

      tabletsActive: [],
      tabletsNonActive: [],

      type: '',
      tablet: null,
      tablets: null,
      pointModal: '',
      modalDialog: false,
      fullScreen: false,

      openAlert: false,
      err_status: true,
      err_text: '',



      modalAddLamp: false,
      modalAddActiveLamp: false,
      lampList: [],
      lampListActive: [],
      itemEdit: null,
      lampEdit: null
    };
  }

  async componentDidMount() {
    const data = await this.getData('get_all');

    this.setState({
      points: data.point_list,
      point: data.point_list[0].id,
      module_name: data.module_info.name,
    });

    document.title = data.module_info.name;

    setTimeout(() => {
      this.getLamps();
    }, 100);
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
          window.location.pathname = '/auth';
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

  changePoint(event) {
    const data = event.target.value;

    this.setState({
      point: data,
    });

    setTimeout(() => {
      this.getTablets();
    }, 50);
  }

  async getLamps() {
    const point_id = this.state.point;

    const data = {
      point_id,
    };

    const res = await this.getData('get_lamps', data);

    this.setState({
      lampList: res.list,
      lampListActive: res.active_lamp,
    });
  }

  async openModal(type, table_id) {
    this.handleResize();

    const points = this.state.points;

    const point_id = this.state.point;

    const pointModal = points.find((it) => it.id === point_id).name;

    if (type === 'tablet') {
      const data = {
        point_id,
        table_id,
      };

      const res = await this.getData('get_tablet', data);

      this.setState({
        type,
        tablet: res,
        pointModal,
        modalDialog: true,
      });
    }

    if (type === 'addRepair') {
      const tablets = this.state.tabletsActive;

      const tabletsData = tablets.reduce((newTablets, item) => {
        newTablets.push({id: item.id, name: `${item.number} - ${item.model}`});
        return newTablets;
      }, []);

      this.setState({
        type,
        tablets: tabletsData,
        pointModal,
        modalDialog: true,
      });
    }

    if (type === 'addTablet') {
      this.setState({
        type,
        pointModal,
        modalDialog: true,
      });
    }
  }

  async add(data) {
    data.point_id = this.state.point;

    const res = await this.getData('add_lamp', data);
    
    if (res.st) {
      this.setState({
        openAlert: true,
        err_status: true,
        err_text: 'Успешно сохранено!',

        modalAddLamp: false
      });

      setTimeout(() => {
        this.getLamps();
      }, 300);
    } else {
      this.setState({
        openAlert: true,
        err_status: false,
        err_text: res.text,
      });
    }
  }

  async addActive(data) {
    data.point_id = this.state.point;

    const res = await this.getData('add_lamp_active', data);
    
    if (res.st) {
      this.setState({
        openAlert: true,
        err_status: true,
        err_text: 'Успешно сохранено!',

        modalAddActiveLamp: false
      });

      setTimeout(() => {
        this.getLamps();
      }, 300);
    } else {
      this.setState({
        openAlert: true,
        err_status: false,
        err_text: res.text,
      });
    }
  }

  openModalAddLamp(){
    this.setState({
      modalAddLamp: true
    })
  }

  openModalAddActiveLamp(){
    this.setState({
      modalAddActiveLamp: true
    })
  }

  editActiveLamp(item){
    this.setState({
      modalAddActiveLamp: true,
      itemEdit: item
    })
  }

  editLamp(item){
    this.setState({
      modalAddLamp: true,
      lampEdit: item
    })
  }

  render() {
    return (
      <>
        <Backdrop open={this.state.is_load} style={{ zIndex: 99 }}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <MyAlert
          isOpen={this.state.openAlert}
          onClose={() => this.setState({ openAlert: false })}
          status={this.state.err_status}
          text={this.state.err_text}
        />

        { this.state.modalAddLamp === false ? false :
          <Lamps_Modal_Add
            open={this.state.modalAddLamp}
            add={this.add.bind(this)}
            onClose={() => this.setState({ modalAddLamp: false, lampEdit: null })}
            fullScreen={this.state.fullScreen}
            lampEdit={this.state.lampEdit}
          />
        }

        { this.state.modalAddActiveLamp === false ? false :
          <Lamps_Modal_Add_Active
            open={this.state.modalAddActiveLamp}
            add={this.addActive.bind(this)}
            onClose={() => this.setState({ modalAddActiveLamp: false, itemEdit: null })}
            fullScreen={this.state.fullScreen}
            lampList={this.state.lampList}
            itemEdit={this.state.itemEdit}
          />
        }

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={6}>
            <MySelect
              is_none={false}
              data={this.state.points}
              value={this.state.point}
              func={this.changePoint.bind(this)}
              label="Точка"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={this.getLamps.bind(this)}>
              Обновить данные
            </Button>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="contained" onClick={this.openModalAddLamp.bind(this)}>
              Добавить лампу
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" onClick={this.openModalAddActiveLamp.bind(this)}>
              Добавить активацию
            </Button>
          </Grid>

          <Grid item xs={12} sm={12} mt={3} mb={5}>
            <TableContainer>
              <Table style={{whiteSpace: 'nowrap'}}>
                <TableHead>
                  <TableRow>
                    <TableCell rowSpan={5}>Дата проверки</TableCell>
                  </TableRow>
                  <TableRow>
                    {this.state.lampList.map( (item, key) =>
                      <TableCell key={key} colSpan={3} style={{ textAlign: 'center' }}>Размещение: {item.place}</TableCell>
                    )}
                  </TableRow>
                  <TableRow>
                    {this.state.lampList.map( (item, key) =>
                      <TableCell key={key} colSpan={3} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={this.editLamp.bind(this, item)}>Модель: {item.name}</TableCell>
                    )}

                    <TableCell rowSpan={5}>Подпись менеджера смены</TableCell>
                  </TableRow>
                  <TableRow>
                    {this.state.lampList.map( (item, key) =>
                      <TableCell key={key} colSpan={3} style={{ textAlign: 'center' }}>Ресурс лампы: {item.resource}</TableCell>
                    )}
                  </TableRow>
                  <TableRow>
                    {this.state.lampList.map( (item, key) =>
                      <Fragment key={key}>
                        <TableCell style={{ textAlign: 'center' }}>Включение</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>Выключение</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>Время работы</TableCell>
                      </Fragment>
                    )}
                  </TableRow>
                  
                </TableHead>
                <TableBody>
                  {this.state.lampListActive.map((item, key) => (
                    <TableRow key={key} style={{ cursor: 'pointer' }} hover>
                      <TableCell>{item.date}</TableCell>
                        
                        {item.lamps.map( (lamp, k) =>
                          <Fragment key={k}>
                            <TableCell style={{ textAlign: 'center' }} onClick={ lamp.id == '' ? () => {} : this.editActiveLamp.bind(this, lamp)}>{lamp.time_start}</TableCell>
                            <TableCell style={{ textAlign: 'center' }} onClick={ lamp.id == '' ? () => {} : this.editActiveLamp.bind(this, lamp)}>{lamp.time_end}</TableCell>
                            <TableCell style={{ textAlign: 'center' }} onClick={ lamp.id == '' ? () => {} : this.editActiveLamp.bind(this, lamp)}>{lamp.diff}</TableCell>
                          </Fragment>
                        ) }

                      <TableCell>{item.manager}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
            </TableContainer>
          </Grid>
        </Grid>
      </>
    );
  }
}

export function Journal_of_work_of_bactericidal_lamps() {
  return <Journal_of_work_of_bactericidal_lamps_ />;
}
