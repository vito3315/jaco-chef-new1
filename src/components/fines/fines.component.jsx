import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MyTextInput, MyCheckBox } from '../../stores/elements';

const queryString = require('query-string');

class Fines_Table_Сameras extends React.Component {
  shouldComponentUpdate(nextProps) {
    var array1 = nextProps.cameras;
    var array2 = this.props.cameras;

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
        <Grid>Ошибки по камерам</Grid>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '50%' }}>Наименование</TableCell>
              <TableCell style={{ width: '15%' }}>
                Размер штрафа за первый раз
              </TableCell>
              <TableCell style={{ width: '15%' }}>
                Размер штрафа за второй раз
              </TableCell>
              <TableCell style={{ width: '15%' }}>
                Размер штрафа за третий и последующие
              </TableCell>
              <TableCell style={{ width: '5%' }}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {this.props.cameras.map((item, i) => (
              <TableRow key={i}>
                <TableCell
                  style={{ cursor: 'pointer' }}
                  onClick={this.props.openModal.bind(
                    this,
                    'Штраф по камерам',
                    item
                  )}
                >
                  {item.name}
                </TableCell>
                <TableCell>{`${item.first} руб`}</TableCell>
                <TableCell>{`${item.second} руб`}</TableCell>
                <TableCell>{`${item.third} руб`}</TableCell>
                <TableCell>
                  {parseInt(item.is_show) == 1 ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }
}

class Fines_Table_Reviews extends React.Component {
  shouldComponentUpdate(nextProps) {
    var array1 = nextProps.reviews;
    var array2 = this.props.reviews;

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
        <Grid mb={3}>Ошибки по камерам</Grid>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '50%' }}>Наименование</TableCell>
              <TableCell style={{ width: '15%' }}>
                Процент за первый раз
              </TableCell>
              <TableCell style={{ width: '15%' }}>
                Процент за второй раз
              </TableCell>
              <TableCell style={{ width: '15%' }}>
                Процент за третий и последующие
              </TableCell>
              <TableCell style={{ width: '5%' }}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {this.props.reviews.map((item, i) => (
              <React.Fragment key={item.id}>
                <TableRow>
                  <TableCell
                    style={{ cursor: 'pointer' }}
                    rowSpan="2"
                    onClick={this.props.openModal.bind(
                      this,
                      'Штраф по отзывам',
                      item
                    )}
                  >
                    {item.name}
                  </TableCell>
                  <TableCell>{`${item.first_percent} %`}</TableCell>
                  <TableCell>{`${item.second_percent} %`}</TableCell>
                  <TableCell>{`${item.third_percent} %`}</TableCell>
                  <TableCell rowSpan="2">
                    {parseInt(item.is_show) == 1 ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{`${item.first} руб`}</TableCell>
                  <TableCell>{`${item.second} руб`}</TableCell>
                  <TableCell>{`${item.third} руб`}</TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }
}

class Fines_Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.event) {
      return null;
    }

    if (nextProps.event !== prevState.event) {
      return { item: nextProps.event };
    }
    return null;
  }

  changeItem(data, event) {
    let vendor = this.state.item;
    vendor[data] = event.target.value;

    this.setState({
      item: vendor,
    });
  }

  changeItemChecked(data, event) {
    let vendor = this.state.item;
    vendor[data] = event.target.checked === true ? 1 : 0;

    this.setState({
      item: vendor,
    });
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
        fullWidth={true}
        maxWidth={'lg'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {this.props.method}
          {this.props.itemName ? `: ${this.props.itemName}` : ''}
        </DialogTitle>
        <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={8} mb={2}>
                  <MyTextInput
                    label="Наименование штрафа"
                    value={this.state.item.name}
                    func={this.changeItem.bind(this, 'name')}
                  />
                </Grid>
              </Grid>
              {this.props.method === 'Новый штраф по отзывам' ||
              this.props.method === 'Штраф по отзывам' ? (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4} mb={2}>
                    <MyTextInput
                      label="Процент за первый раз"
                      value={this.state.item.first_percent}
                      func={this.changeItem.bind(this, 'first_percent')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} mb={2}>
                    <MyTextInput
                      label="Процент за второй раз"
                      value={this.state.item.second_percent}
                      func={this.changeItem.bind(this, 'second_percent')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} mb={2}>
                    <MyTextInput
                      label="Процент за третий и последующие"
                      value={this.state.item.third_percent}
                      func={this.changeItem.bind(this, 'third_percent')}
                    />
                  </Grid>
                </Grid>
              ) : null}

              <Grid container spacing={3}>
                <Grid item xs={12} sm={4} mb={2}>
                  <MyTextInput
                    label="Размер штрафа за первый раз"
                    value={this.state.item.first}
                    func={this.changeItem.bind(this, 'first')}
                  />
                </Grid>
                <Grid item xs={12} sm={4} mb={2}>
                  <MyTextInput
                    label="Размер штрафа за второй раз"
                    value={this.state.item.second}
                    func={this.changeItem.bind(this, 'second')}
                  />
                </Grid>
                <Grid item xs={12} sm={4} mb={2}>
                  <MyTextInput
                    label="Размер штрафа за третий и последующие"
                    value={this.state.item.third}
                    func={this.changeItem.bind(this, 'third')}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                {this.props.method === 'Новый штраф по камерам' ||
                this.props.method === 'Штраф по камерам' ? (
               
                  <Grid item xs={12} sm={3}>
                    <MyCheckBox
                      label="Картинка"
                      value={
                        parseInt(this.state.item.is_show) == 1 ? true : false
                      }
                      func={this.changeItemChecked.bind(this, 'is_show')}
                    />
                  </Grid>
          
                ) : null}

                {this.props.method === 'Штраф по отзывам' ||
                this.props.method === 'Штраф по камерам' ? (

                  <Grid item xs={12} sm={3}>
                    <MyCheckBox
                      label="Активность"
                      value={parseInt(this.state.item.is) == 1 ? true : false}
                      func={this.changeItemChecked.bind(this, 'is')}
                    />
                  </Grid>

                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.save.bind(
              this,
              this.props.method,
              this.state.item
            )}
            color="primary"
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

class Fines_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'fines',
      module_name: '',
      is_load: false,

      modalDialog: false,
      itemName: '',

      cameras: [
        {
          id: '1',
          name: 'Немытые руки',
          first: '50',
          second: '100',
          third: '200',
          is_show: 1,
          is: 1,
        },
        {
          id: '2',
          name: 'Внешний вид',
          first: '50',
          second: '100',
          third: '200',
          is_show: 1,
          is: 1,
        },
        {
          id: '3',
          name: 'Употребление продуктов компании',
          first: '50',
          second: '100',
          third: '200',
          is_show: 1,
          is: 0,
        },
        {
          id: '4',
          name: 'Хищение продуктов',
          first: '50',
          second: '100',
          third: '200',
          is_show: 0,
          is: 0,
        },
        {
          id: '5',
          name: 'Ингредиенты разложены или порезаны не по стандартам',
          first: '50',
          second: '100',
          third: '200',
          is_show: 1,
          is: 1,
        },
      ],

      reviews: [
        {
          id: '1',
          name: 'Ошибка не выявлена',
          first_percent: 0,
          second_percent: 0,
          third_percent: 0,
          first: '50',
          second: '100',
          third: '200',
          is_show: 1,
          is: 0,
        },
        {
          id: '2',
          name: 'Извинение',
          first_percent: 100,
          second_percent: 100,
          third_percent: 100,
          first: '50',
          second: '100',
          third: '200',
          is_show: 1,
          is: 1,
        },
        {
          id: '3',
          name: 'Скидка 10%',
          first_percent: 0,
          second_percent: 0,
          third_percent: 0,
          first: '50',
          second: '100',
          third: '200',
          is_show: 1,
          is: 1,
        },
        {
          id: '4',
          name: 'Скидка 20%',
          first_percent: 10,
          second_percent: 10,
          third_percent: 10,
          first: '50',
          second: '100',
          third: '200',
          is_show: 1,
          is: 1,
        },
        {
          id: '5',
          name: 'Замена товара на аналогичный',
          first_percent: 50,
          second_percent: 50,
          third_percent: 50,
          first: '50',
          second: '100',
          third: '200',
          is_show: 1,
          is: 0,
        },
      ],

      event: {},

      newFine: {
        id: '',
        name: '',
        first_percent: '',
        second_percent: '',
        third_percent: '',
        first: '',
        second: '',
        third: '',
        is_show: 0,
      },
    };
  }

  async componentDidMount() {
    let data = await this.getData('get_all');

    // console.log(data);

    this.setState({
      //points: data.points,
      ///point: data.points[0].id,
      module_name: data.module_info.name,
      mounths: data.mounth,
      //mounth: data.this_m,
      // years: data.years,
      // year: data.this_y,
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

  openModal(method, event) {
    // console.log(method)

    if (method === 'Новый штраф по камерам') {
      this.setState({
        modalDialog: true,
        method,
        event: this.state.newFine,
      });
    }

    if (method === 'Новый штраф по отзывам') {
      this.setState({
        modalDialog: true,
        method,
        event: this.state.newFine,
      });
    }

    if (method === 'Штраф по камерам') {
      // const data = this.state.cameras;

      // const event = data.find(el => el.id === id)

      this.setState({
        modalDialog: true,
        method,
        event,
        itemName: event.name,
      });
    }

    if (method === 'Штраф по отзывам') {
      // const data = this.state.reviews;

      // const event = data.find(el => el.id === id)

      this.setState({
        modalDialog: true,
        method,
        event,
        itemName: event.name,
      });
    }
  }

  async saveItem(method, item) {
    console.log(method);
    console.log(item);

    // await this.getData('save_edit', data);

    this.setState({
      modalDialog: false,
      // item
    });
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              onClick={this.openModal.bind(this, 'Новый штраф по камерам')}
              variant="contained"
            >
              Добавить ошибку по камерам
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              onClick={this.openModal.bind(this, 'Новый штраф по отзывам')}
              variant="contained"
            >
              Добавить ошибку по отзывам
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Fines_Table_Сameras
              cameras={this.state.cameras}
              openModal={this.openModal.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Fines_Table_Reviews
              reviews={this.state.reviews}
              openModal={this.openModal.bind(this)}
            />
          </Grid>
        </Grid>

        <Fines_Modal
          open={this.state.modalDialog}
          onClose={() => {
            this.setState({ modalDialog: false });
          }}
          method={this.state.method}
          event={this.state.event}
          save={this.saveItem.bind(this)}
          itemName={this.state.itemName}
        />
      </>
    );
  }
}

export function Fines() {
  return <Fines_ />;
}
