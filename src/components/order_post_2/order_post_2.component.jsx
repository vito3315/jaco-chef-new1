import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MySelect, MyAutocomplite2, MyTextInput } from '../../stores/elements';

const queryString = require('query-string');

// Таблица на главной странице
class OrderPost2_List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cats: [],
      search: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log(nextProps);

    if (!nextProps.cats) {
      return null;
    }

    if (nextProps.cats !== prevState.cats) {
      if (prevState.search) {
        const search = prevState.search;

        const catsCopy = JSON.parse(JSON.stringify(nextProps.cats));

        const cats = catsCopy.reduce((cats, cat) => {
          cat.items = cat.items.filter((item) => search ? item.rec_item_name === search : item);

          if (cat.items.length !== 0) {
            cats.push(cat);
          }
          return cats;

        }, []);

        return { cats };
      } else {
        return { cats: JSON.parse(JSON.stringify(nextProps.cats)) };
      }
    }

    return null;
  }

  search(event, value) {
    const search = event.target.value ? event.target.value : value ? value : '';

    const catsCopy = this.state.cats;

    const cats = catsCopy.reduce((cats, cat) => {
      cat.items = cat.items.filter((item) => search ? item.rec_item_name === search : item);

      if (cat.items.length !== 0) {
        cats.push(cat);
      }
      return cats;

    }, []);

    this.setState({
      cats,
      search,
    });
  }

  render() {
    console.log('OrderPost2_List render');

    return (
      <>
        <Grid item xs={12} sm={4}>
          <MyAutocomplite2
            label="Поиск"
            freeSolo={true}
            multiple={false}
            data={this.props.data}
            value={this.state.search}
            func={this.search.bind(this)}
            onBlur={this.search.bind(this)}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <Button variant="contained" 
            // onClick={this.save.bind(this)} 
            sx={{ whiteSpace: 'nowrap' }}>
            Сохранить заявку
          </Button>
        </Grid>

        <Grid item xs={12} sm={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '20%' }}>Товар</TableCell>
                  <TableCell style={{ width: '8%' }}>Остаток</TableCell>
                  <TableCell style={{ width: '14%' }}>Ср.расх. за 7 дней</TableCell>
                  <TableCell style={{ width: '10%' }}>Объем упаковки</TableCell>
                  <TableCell style={{ width: '18%' }}>Заявка</TableCell>
                  <TableCell style={{ width: '10%' }} align="center">Количество</TableCell>
                  <TableCell style={{ width: '20%' }}>Поставщик</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.cats.map((cat, key) => (
                  <React.Fragment key={key}>
                    <TableRow key={key}>
                      <TableCell colSpan={7} align="center" sx={{ fontWeight: 700 }}>{cat.name.toUpperCase()}</TableCell>
                    </TableRow>
                    {cat.items.map((item, key_item) => (
                      <TableRow key={key_item} hover>
                        <TableCell>
                          {item.items.length < 2 ? item.items[0].name : (
                            <MySelect
                              is_none={false}
                              data={item.items}
                              value={item.rec_item_id}
                              func={(event) => this.props.changeSelectItem(event, 'item', item.id, 0)}
                            />
                          )}
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>{item.rec_pq} {item.ei_name}</TableCell>
                        <TableCell>
                          <MyTextInput
                            // value={item.value == 0 ? '' : item.value}
                            value={''}
                            // func={this.saveData.bind(this, 'pf', item.id, 'value', 0)}
                          />
                        </TableCell>
                        <TableCell align="center">0</TableCell>
                        <TableCell>
                          {item.items.map((it, key_it) =>
                            it.id === item.rec_item_id ? it.vendors.length > 1 ? (
                                <React.Fragment key={key_it}>
                                  <MySelect
                                    is_none={false}
                                    data={it.vendors}
                                    value={item.rec_vendor_id}
                                    func={(event) => this.props.changeSelectItem(event, 'vendor', item.id, item.rec_item_id)}
                                  />
                                </React.Fragment>
                              ) : it.vendors[0].name : null
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </>
    );
  }
}

// главная страница
class OrderPost2_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'order_post_2',
      module_name: '',
      is_load: false,

      points: [],
      point: '',

      search: '',

      all_items: [],
      cats: [],
    };
  }

  async componentDidMount() {
    const data = await this.getData('get_all');

    this.setState({
      module_name: data.module_info.name,
    });

    document.title = data.module_info.name;

    setTimeout(() => {
      this.getPointList();
    }, 300);
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

  async getPointList() {
    let { points } = await this.getData('get_point_list');

    this.setState({
      points,
      point: points[0].id,
    });

    setTimeout(() => {
      this.getDataTable();
    }, 300);
  }

  changePoint(event) {
    this.setState({
      point: event.target.value,
      search: '',
    });

    setTimeout(() => {
      this.getDataTable();
    }, 300);
  }

  async getDataTable() {
    const point_id = this.state.point;

    const data = {
      point_id,
    };

    const res = await this.getData('get_handle', data);

    let all_items = [];

    res.cats.forEach((cat) => {
      cat.items.forEach((item) => {
        item.items.forEach((it) => {
          all_items.push({ name: it.name });
        });
      });
    });

    // console.log(res);

    this.setState({
      cats: res.cats,
      all_items,
    });
  }

  changeSelectItem(event, type, id, item_id) {
    const cats = this.state.cats;

    if (type === 'item') {
      cats.forEach((cat) => {
        cat.items.forEach((item) => {
          if (item.id === id) {
            const itemNew = item.items.find(
              (it) => it.id === event.target.value
            );
            item.rec_item_id = itemNew.id;
            item.rec_item_name = itemNew.name;
            item.rec_vendor_id = itemNew.vendors[0].id;
            item.rec_vendor_name = itemNew.vendors[0].name;
          }
        });
      });
    }

    if (type === 'vendor') {
      cats.forEach((cat) => {
        cat.items.forEach((item) => {
          if (item.id === id) {
            const itemNew = item.items
              .find((it) => it.id === item_id)
              .vendors.find((vendor) => vendor.id === event.target.value);
            item.rec_vendor_id = itemNew.id;
            item.rec_vendor_name = itemNew.name;
          }
        });
      });
    }

    this.setState({
      cats,
    });
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={4}>
            <h2>Ручная заявка поставщикам New</h2>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Button variant="contained" sx={{ whiteSpace: 'nowrap' }}>
              <Link style={{ color: '#fff' }} to="/order_post_2/new">
                Рекомендуемая заявка
              </Link>
            </Button>
          </Grid>

          <Grid item xs={12} sm={4}>
            <MySelect
              label="Точка"
              is_none={false}
              data={this.state.points}
              value={this.state.point}
              func={this.changePoint.bind(this)}
            />
          </Grid>

          <OrderPost2_List
            cats={this.state.cats}
            changeSelectItem={this.changeSelectItem.bind(this)}
            data={this.state.all_items}
          />
        </Grid>
      </>
    );
  }
}

// Рекомендуемая заявка
class OrderPost2New_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'order_post_2',
      module_name: '',
      is_load: false,
    };
  }

  async componentDidMount() {
    const data = await this.getData('get_all');

    this.setState({
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

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={12}>
            <h1>Рекомендуемая заявка поставщикам New</h1>
          </Grid>
        </Grid>
      </>
    );
  }
}

export function OrderPost2() {
  return <OrderPost2_ />;
}

export function OrderPost2New() {
  return <OrderPost2New_ />;
}
