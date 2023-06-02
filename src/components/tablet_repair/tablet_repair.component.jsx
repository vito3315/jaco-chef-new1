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
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import {MyAlert, MySelect, MyTextInput, MyDatePickerNew, formatDate} from '../../stores/elements';

import queryString from 'query-string';

import dayjs from 'dayjs';

class TabletRepair_Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: formatDate(new Date()),
      number: '',
      imei: '',
      name: '',
      tablet: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.tablets !== prevProps.tablets) {
      const { tablets } = this.props;

      //this.setState({ tablet: tablets ? tablets[0].id : '' });
    }
  }

  changeItem(data, event) {
    this.setState({
      [data]: event.target.value,
    });
  }

  changeDateRange(data, event) {
    this.setState({
      [data]: event ? (event) : '',
    });
  }

  add() {
    const type = this.props.type;

    let data;

    if (type === 'addTablet') {
      data = {
        number: this.state.number,
        imei: this.state.imei,
        model: this.state.name,
        buy_date: dayjs(this.state.date).format('YYYY-MM-DD'),
      };
    } else {
      data = {
        name_repair: this.state.name,
        price: this.state.number,
        date: dayjs(this.state.date).format('YYYY-MM-DD'),
        tablet_id: this.state.tablet,
      };
    }

    this.props.add(data);

    this.onClose();
  }

  onClose() {
    this.setState({
      number: '',
      imei: '',
      name: '',
      tablet: '',
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
          <div>
            <Typography>Точка:{' '}<span style={{ fontWeight: 'bold' }}>{this.props.pointModal}</span></Typography>
            {this.props.type === 'tablet' ? (
              <>
                <Typography mt={1}>Наименование планшета:{' '}<span style={{ fontWeight: 'bold' }}>{this.props.tablet.tablet.model}</span></Typography>
                <Typography mt={1}>Порядковый номер планшета:{' '}<span style={{ fontWeight: 'bold' }}>{this.props.tablet.tablet.number}</span></Typography>
              </>
            ) : null}
          </div>

          <IconButton onClick={this.onClose.bind(this)} style={{ cursor: 'pointer' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
          <Grid container spacing={3}>
            {this.props.type === 'addTablet' ? (
              <>
                <Grid item xs={12} sm={12}>
                  <MyTextInput
                    label="Порядковый номер планшета"
                    value={this.state.number}
                    func={this.changeItem.bind(this, 'number')}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MyTextInput
                    label="Название (модель)"
                    value={this.state.name}
                    func={this.changeItem.bind(this, 'name')}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MyTextInput
                    label="IMIE"
                    value={this.state.imei}
                    func={this.changeItem.bind(this, 'imei')}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MyDatePickerNew
                    label="Дата ввода в эксплуатацию"
                    value={this.state.date}
                    func={this.changeDateRange.bind(this, 'date')}
                  />
                </Grid>
              </>
            ) : this.props.type === 'addRepair' ? (
              <>
                <Grid item xs={12} sm={12}>
                  <MySelect
                    is_none={false}
                    data={this.props.tablets}
                    value={this.state.tablet}
                    func={this.changeItem.bind(this, 'tablet')}
                    label="Выбрать планшет"
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <MyTextInput
                    label="Наименование ремонта"
                    value={this.state.name}
                    func={this.changeItem.bind(this, 'name')}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MyTextInput
                    label="Стоимость"
                    type={'number'}
                    value={this.state.number}
                    func={this.changeItem.bind(this, 'number')}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MyDatePickerNew
                    label="Дата ремонта"
                    value={this.state.date}
                    func={this.changeDateRange.bind(this, 'date')}
                  />
                </Grid>
              </>
            ) : (
              <Grid item xs={12} sm={12} mb={5}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Наименование ремонта</TableCell>
                        <TableCell>Стоимость ремонта</TableCell>
                        <TableCell>Дата ремонта</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.props?.tablet?.repairs.map((item, key) => (
                        <TableRow key={key}>
                          <TableCell>{key + 1}</TableCell>
                          <TableCell>{item.name_repair}</TableCell>
                          <TableCell>{item.price}</TableCell>
                          <TableCell>{item.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          {this.props.type === 'tablet' ? null : (
            <Button variant="contained" onClick={this.add.bind(this)}>
              Добавить {this.props.type === 'addTablet' ? 'планшет' : 'ремонт'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

class TabletRepair_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'tablet_repair',
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
      this.getTablets();
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

  async getTablets() {
    const point_id = this.state.point;

    const data = {
      point_id,
    };

    const res = await this.getData('get_tablets', data);

    this.setState({
      tabletsActive: res.active,
      tabletsNonActive: res.non_active,
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
    let res;

    const type = this.state.type;

    data.point_id = this.state.point;

    if (type === 'addTablet') {
      res = await this.getData('add_tablet', data);
    } else {
      res = await this.getData('add_repair', data);
    }

    if (res.st) {
      this.setState({
        openAlert: true,
        err_status: true,
        err_text: 'Успешно добавлен!',
      });

      setTimeout(() => {
        this.getTablets();
      }, 300);
    } else {
      this.setState({
        openAlert: true,
        err_status: false,
        err_text: res.text,
      });
    }
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

        <TabletRepair_Modal
          type={this.state.type}
          open={this.state.modalDialog}
          tablets={this.state.tablets}
          pointModal={this.state.pointModal}
          tablet={this.state.tablet}
          add={this.add.bind(this)}
          onClose={() => this.setState({ modalDialog: false })}
          fullScreen={this.state.fullScreen}
        />

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
            <Button variant="contained" onClick={this.getTablets.bind(this)}>
              Обновить данные
            </Button>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="contained" style={{ whiteSpace: 'nowrap' }} onClick={this.openModal.bind(this, 'addTablet')}>
              Добавить планшет
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" onClick={this.openModal.bind(this, 'addRepair')}>
              Добавить ремонт
            </Button>
          </Grid>

          <Grid item xs={12} sm={12} mt={3} mb={5}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={5}>Планшеты в эксплуатации</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>№</TableCell>
                    <TableCell>Название</TableCell>
                    <TableCell>IMIE</TableCell>
                    <TableCell>Дата ввода в эксплуатацию</TableCell>
                    <TableCell>Сумма ремонта</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.tabletsActive.map((item, key) => (
                    <TableRow key={key} style={{ cursor: 'pointer' }} hover onClick={this.openModal.bind(this, 'tablet', item.id)}>
                      <TableCell>{item.number}</TableCell>
                      <TableCell>{item.model}</TableCell>
                      <TableCell>{item.imei}</TableCell>
                      <TableCell>{item.buy_date}</TableCell>
                      <TableCell>{item.repairs.summ ?? 0}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {!this.state.tabletsNonActive.length ? null : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={6} height={100} style={{ border: 'none' }}></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={6}> Планшеты выведенные из эксплуатации</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>№</TableCell>
                      <TableCell>Название</TableCell>
                      <TableCell>IMIE</TableCell>
                      <TableCell>Дата ввода в эксплуатацию</TableCell>
                      <TableCell>Дата вывода из эксплуатации</TableCell>
                      <TableCell>Сумма ремонта</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.tabletsNonActive.map((item, key) => (
                      <TableRow key={key} style={{ cursor: 'pointer' }} hover onClick={this.openModal.bind(this, 'tablet', item.id)}>
                        <TableCell>{item.number}</TableCell>
                        <TableCell>{item.model}</TableCell>
                        <TableCell>{item.imei}</TableCell>
                        <TableCell>{item.buy_date}</TableCell>
                        <TableCell>{item.close_date}</TableCell>
                        <TableCell>{item.repairs.summ ?? 0}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          </Grid>
        </Grid>
      </>
    );
  }
}

export function TabletRepair() {
  return <TabletRepair_ />;
}
