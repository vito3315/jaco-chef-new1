import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import CloseIcon from '@mui/icons-material/Close';

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import SaveIcon from '@mui/icons-material/SaveAs';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { MySelect, MyTextInput, MyAutocomplite2, MyAlert } from '../../stores/elements';

import { evaluate } from 'mathjs';
import queryString from 'query-string';

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// главная страница
class Revizion_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'revizion',
      module_name: '',
      is_load: false,

      points: [],
      point: '0',

      revList: [],
      chooseRev: '',

      items: [],
      pf: [],
      all_items_list: [],
      all_for_search: [],

      itemsCopy: [],
      pfCopy: [],
      search: '',

      chooseTab: 0,
    };
  }

  // переменные для фильтра
  async componentDidMount() {
    const data = await this.getData('get_all');

    this.setState({
      points: data.point_list,
      point: data.point_list[0].id,
      module_name: data.module_info.name,
    });

    document.title = data.module_info.name;

    setTimeout(() => {
      this.getRevList();
    }, 10);
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

  // смена точки
  changePoint(event) {
    const data = event.target.value;

    this.setState({
      point: data,
      search: '',
    });

    setTimeout(() => {
      this.getRevList();
    }, 50);
  }

  // смена ревизии
  changeRev(event) {
    const data = event.target.value;

    this.setState({
      chooseRev: data,
      search: '',
    });

    setTimeout(() => {
      this.getDataRev();
    }, 300);
  }

  // получение списка ревизий
  async getRevList() {
    const data = {
      point_id: this.state.point,
    };

    const res = await this.getData('get_rev_list', data);

    res.length = 10;

    this.setState({
      revList: res,
      chooseRev: res.length > 0 ? res[0]['id'] : '',
    });

    if (res.length > 0) {
      setTimeout(() => {
        this.getDataRev();
      }, 300);
    }
  }

  // получение данных ревизии
  async getDataRev() {
    const data = {
      point_id: this.state.point,
      rev_id: this.state.chooseRev,
    };

    const res = await this.getData('get_data_rev', data);

    const pf = [...res.pf, ...res.rec];

    this.setState({
      pf,
      pfCopy: pf,
      items: res.item,
      itemsCopy: res.item,
      all_items_list: res.all,
      all_for_search: res.all_for_search
    });
  }

  // поиск
  search(event, value) {
    const search = event.target.value ? event.target.value : value ? value : '';

    const itemsCopy = structuredClone(this.state.itemsCopy);

    const pfCopy = structuredClone(this.state.pfCopy);

    const items = itemsCopy.filter((value) => search ? value.name.toLowerCase() === search.toLowerCase() : value);

    const pf = pfCopy.filter((value) => search ? value.name.toLowerCase() === search.toLowerCase() : value);

    this.setState({
      search,
      items,
      pf,
    });
  }

  // рендер главная
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

          <Grid item xs={12} sm={3}>
            <Button variant="contained">
              <Link style={{ color: '#fff' }} to="/revizion/new">
                Новая ревизия
              </Link>
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <MyAutocomplite2
              label="Поиск"
              freeSolo={true}
              multiple={false}
              data={this.state.all_for_search}
              value={this.state.search}
              func={this.search.bind(this)}
              onBlur={this.search.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MySelect
              is_none={false}
              data={this.state.points}
              value={this.state.point}
              func={this.changePoint.bind(this)}
              label="Точка"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MySelect
              is_none={false}
              data={this.state.revList}
              value={this.state.chooseRev}
              func={this.changeRev.bind(this)}
              label="Ревизия"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" onClick={this.getDataRev.bind(this)}>
              Обновить данные
            </Button>
          </Grid>

          <Grid item xs={12} sm={12} id="revTable">
            <Tabs
              value={this.state.chooseTab}
              onChange={(item, key) => this.setState({ chooseTab: key })}
              textColor="primary"
              indicatorColor="primary"
              centered
            >
              <Tab label="Товары" {...a11yProps(0)} />
              <Tab label="Заготовки" {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={this.state.chooseTab} index={0}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Товар</TableCell>
                      <TableCell>Объем</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.items.map((item, key) => (
                      <TableRow key={key}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.value} {item.ei_name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={this.state.chooseTab} index={1}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Заготовка</TableCell>
                      <TableCell>Объем</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.pf.map((item, key) => (
                      <TableRow key={key}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.value} {item.ei_name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </Grid>
        </Grid>
      </>
    );
  }
}

// строка аккордион из списка Заготовок
class RevizionNew_List_Pf_accordion extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      JSON.stringify(nextProps.item) !== JSON.stringify(this.props.item) ||
      nextProps.saveEdit !== this.props.saveEdit
    );
  }

  render() {
    // console.log( 'RevizionNew_List_Pf_accordion render' )
    const { saveEdit, item, saveData, math } = this.props;

    return (
      <Accordion>
        <AccordionSummary
          style={{ backgroundColor: saveEdit && !item.value && item.value !== 0 ? '#ffc107' : null }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography style={{ width: '60%' }}>{item.name}</Typography>
          <Typography style={{ width: '40%' }}>{item.value} {item.value === '' ? '' : item.ei_name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid item sm={5}>
            <MyTextInput
              value={item.value}
              func={(event) => saveData(event, 'pf', item.id, 'value', item.type)}
              label="Количество"
              enter={(event) => event.key === 'Enter' ? math(event, 'pf', item.id, 'value', item.type) : null}
            />
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
}

// строка из списка Товаров с объемом и количеством Товара
class RevizionNew_List_Item_Row extends React.Component {
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps.item) !== JSON.stringify(this.props.item);
  }

  render() {
    // console.log( 'RevizionNew_List_Item_Row render' )
    const { item, it, i, saveData, clearData, math } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={3} style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Grid item xs={12} sm={5}>
            <MySelect
              data={item.size}
              value={it.need_pq}
              func={(event) => saveData(event, 'item', item.id, 'need_pq', i)}
              label="Объем упаковки"
            />
          </Grid>
          <Grid item xs={i === 0 ? 12 : 9} sm={5}>
            <MyTextInput
              value={it.value}
              func={(event) => saveData(event, 'item', item.id, 'value', i)}
              label="Количество"
              enter={(event) => event.key === 'Enter' ? math(event, 'item', item.id, 'value', i) : null }
            />
          </Grid>
          {i === 0 ? null : (
            <Grid item xs={3} sm={1}>
              <Button variant="contained" onClick={() => clearData(item.id, i)}>
                <CloseIcon />
              </Button>
            </Grid>
          )}
        </Grid>
        {item.counts.at(-1) === it ? null : <Divider />}
      </React.Fragment>
    );
  }
}

// строка аккордион из списка Товаров
class RevizionNew_List_Item_accordion extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      JSON.stringify(nextProps.item) !== JSON.stringify(this.props.item) ||
      nextProps.saveEdit !== this.props.saveEdit
    );
  }

  render() {
    // console.log( 'RevizionNew_List_Item_accordion render' )
    const { saveEdit, item, saveData, clearData, copyData, math } = this.props;

    return (
      <Accordion>
        <AccordionSummary
          style={{ backgroundColor: saveEdit && !item.value && item.value !== 0 ? '#ffc107' : null }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography style={{ width: '60%' }}>{item.name}</Typography>
          <Typography style={{ width: '40%' }}>{item.value} {item.value === '' ? '' : item.ei_name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {item.counts.map((it, i) => (
            <RevizionNew_List_Item_Row
              key={i}
              item={item}
              it={it}
              saveData={saveData}
              clearData={clearData}
              i={i}
              math={math}
            />
          ))}

          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={() => copyData(item.id)}>
              Дублировать
            </Button>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
}

// Новая ревизия Список
class RevizionNew_List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      pf: [],
      id: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps);

    if (!nextProps.items || !nextProps.pf) {
      return null;
    }

    if (nextProps.items !== prevState.items || nextProps.pf !== prevState.pf) {
      if (prevState.id) {
        const id = prevState.id;

        const itemsCopy = JSON.parse(JSON.stringify(nextProps.items));

        const pfCopy = JSON.parse(JSON.stringify(nextProps.pf));

        const items = itemsCopy.filter((item) => item.storages.find((storages) => id ? storages.storage_id === id : storages));

        const pf = pfCopy.filter((item) => item.storages.find((storages) => id ? storages.storage_id === id : storages));

        return { items, pf };

      } else {
        return {
          items: JSON.parse(JSON.stringify(nextProps.items)),
          pf: JSON.parse(JSON.stringify(nextProps.pf)),
        };
      }
    }
    return null;
  }

  // сортировка по месту хранения
  sortItem(id) {
    const itemsCopy = this.state.items;

    const pfCopy = this.state.pf;

    const items = itemsCopy.filter((item) => item.storages.find((storages) => id ? storages.storage_id === id : storages));

    const pf = pfCopy.filter((item) => item.storages.find((storages) => id ? storages.storage_id === id : storages));

    this.setState({ items, pf, id });

    this.props.onClose();
  }

  render() {
    // console.log('RevizionNew_List render');

    return (
      <>
        {/* Товары */}
        <div style={this.props.chooseTab == 0 ? { display: 'block', paddingBottom: 10, marginBottom: 75 } : { display: 'none' }}>
          {this.state.items.map((item, key) =>
            parseInt(item.is_show) === 0 ? null : (
              <RevizionNew_List_Item_accordion
                key={key}
                item={item}
                saveEdit={this.props.saveEdit}
                saveData={this.props.saveData}
                clearData={this.props.clearData}
                copyData={this.props.copyData}
                math={this.props.math}
              />
            )
          )}
        </div>

        {/* Заготовки */}
        <div style={this.props.chooseTab == 1 ? { display: 'block', paddingBottom: 10, marginBottom: 75 } : { display: 'none' }}>
          {this.state.pf.map((item, key) =>
            parseInt(item.is_show) === 0 ? null : (
              <RevizionNew_List_Pf_accordion
                key={key}
                item={item}
                saveEdit={this.props.saveEdit}
                saveData={this.props.saveData}
                math={this.props.math}
              />
            )
          )}
        </div>

        {/* Боковая панель с выбором мест хранения */}
        <React.Fragment>
          <SwipeableDrawer
            anchor={'left'}
            open={this.props.open}
            onClose={() => this.props.onClose()}
            onOpen={() => this.props.onOpen()}
          >
            <List style={{ width: '100%' }}>
              {this.props.storages.map((item, key) => (
                <ListItemButton key={key} onClick={this.sortItem.bind(this, item.id)}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
            </List>
          </SwipeableDrawer>
        </React.Fragment>
      </>
    );
  }
}

// Новая ревизия
class RevizionNew_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'revizion',
      module_name: '',
      is_load: false,

      points: [],
      point: '0',

      revData: null,

      storages: [],
      items: [],
      pf: [],

      chooseTab: 0,
      modalDialog: false,
      title: '',
      content: '',
      saveEdit: false,
      open: false,

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
      point: data.point_list.length == 1 ? data.point_list[0].id : '0',
      module_name: data.module_info.name,
    });

    document.title = data.module_info.name;
  }

  // получение размера экрана
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

  // измение точки подгрузка данных
  changePoint(event) {
    const data = event.target.value;

    if (data) {
      this.setState({
        revData: null,
        point: data,
        saveEdit: false,
      });

      setTimeout(() => {
        this.getLocalStorage();
      }, 300);

    } else {
      this.setState({
        revData: null,
        point: data,
        storages: [],
        items: [],
        pf: [],
      });
    }
  }

  // метод получения данных
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

  // получаем данные
  async getDataRev() {
    this.handleResize();

    this.setState({
      modalDialog: false,
    });

    const point_id = this.state.point;

    const revData = this.state.revData;

    const data = {
      point_id,
    };

    const res = await this.getData('get_data_for_new_rev', data);

    console.log(res);

    if (revData) {
      res.items.forEach((item) => {
        revData.items.forEach((it) => {
          if (it.id === item.id && it.type === item.type) {
            item.value = it.value;
            item.counts = it.counts;
          }
        });
      });

      res.pf.forEach((item) => {
        revData.items.forEach((it) => {
          if (it.id === item.id && it.type === item.type) {
            item.value = it.value;
          }
        });
      });

      res.rec.forEach((item) => {
        revData.items.forEach((it) => {
          if (it.id === item.id && it.type === item.type) {
            item.value = it.value;
          }
        });
      });
    }

    const pf = [...res.pf, ...res.rec];

    this.setState({
      revData,
      pf,
      items: res.items,
      storages: res.storages,
      itemsCopy: res.items,
      pfCopy: res.pf,
    });
  }

  // получение общего количества данных из выражения в инпуте
  math(event, type, id, data, index) {
    const result = String(evaluate(event.target.value));

    this.saveData(result, type, id, data, index);
  }

  // предварительное сохранение
  saveData(event, type, id, data, index) {
    // console.log(type, id, data, index);

    if (type == 'item') {
      const items = this.state.items;

      items.forEach((item) => {
        if (item.id === id) {
          item.counts[index][data] = event.target?.value ?? event;

          let allVal = 0;

          item.counts.forEach((it) => {
            if (it.value.includes('=')) {
              it.value = evaluate(it.value.replaceAll('=', ''));
              allVal += Number(it.need_pq) * Number(it.value);
            } else {
              allVal += Number(it.need_pq) * Number(it.value);
            }
          });

          if (isNaN(allVal)) {
            item.value = 0;
          } else {
            item.value = allVal;
          }

          this.setLocalStorage(item.id, item.value, item.type, item.counts);
        }
      });

      this.setState({
        items,
      });
    }

    if (type === 'pf') {
      const pf = this.state.pf;

      pf.forEach((pf) => {
        if (pf.id === id && pf.type === index) {
          const value = event.target?.value ?? event;

          if (value.includes('=')) {
            pf[data] = evaluate(value.replaceAll('=', ''));
          } else {
            pf[data] = value;
          }

          this.setLocalStorage(pf.id, pf.value, pf.type);
        }
      });

      this.setState({
        pf,
      });
    }
  }

  // сохранить заполненные, но не сохраненные данные ревизии в localStorage
  setLocalStorage(id, value, type, counts) {
    const point = this.state.point;

    let data = this.state.revData;

    if (data) {

      data.items = data.items.map((item) => {
          if (item.id === id && item.type === type) {
            item.value = value;
            counts ? (item.counts = counts) : null;
          }
          return item;
        });

      data.items = data.items.find((item) => item.id === id && item.type === type) ? data.items : [...data.items,...[{type, id, value, counts}]]

    } else {
      data = {
        date: formatDate(new Date()),
        items: [],
      };

      data.items.push({ type, id, value, counts });

    }

    this.setState({
      revData: data,
    });

    localStorage.setItem(`revizionDataPoint-${point}`, JSON.stringify(data));

  }

  // получения данных по точке из localStorage
  getLocalStorage() {
    const point = this.state.point;

    const revData = JSON.parse(localStorage.getItem(`revizionDataPoint-${point}`));

    if (revData?.date === formatDate(new Date())) {
      this.setState({
        revData,
        modalDialog: true,
        title: 'В памяти есть данные по Ревизии!',
        content: 'Восстановить данные?',
        storages: [],
        items: [],
        pf: [],
      });

    } else {
      localStorage.removeItem(`revizionDataPoint-${point}`);

      setTimeout(() => {
        this.notRestoreData();
      }, 300);
    }
  }

  // не восстановливать данные Ревизии
  notRestoreData() {
    this.setState({
      revData: null,
    });

    setTimeout(() => {
      this.getDataRev();
    }, 300);
  }

  // проверка полей, отображения модального окна
  checkData() {
    const items = this.state.items;
    const pf = this.state.pf;

    // проверка заполнения полей товаров, скрываем не заполненные
    items.forEach((item) => {
      if (item.value || item.value === 0) {
        item.is_show = 0;
      }
    });

    pf.forEach((item) => {
      if (item.value || item.value === 0) {
        item.is_show = 0;
      }
    });

    this.setState({
      pf,
      items,
      saveEdit: true,
      modalDialog: true,
      title: 'Не все данные заполнены!',
      content: 'Не заполненные позиции выделены цветом!',
    });
  }

  // копируем
  copyData(id) {
    const items = this.state.items;

    items.forEach((item) => {
      if (item.id === id) {
        item.counts = [...item.counts, ...[{ need_pq: item.counts[0].need_pq, value: '' }]];
      }
    });

    this.setState({
      items,
    });
  }

  // очищаем
  clearData(id, index) {
    const items = this.state.items;

    items.forEach((item) => {
      if (item.id === id) {
        item.counts.splice(index, 1);

        let allVal = 0;

        item.counts.forEach((it) => {
          allVal += Number(it.need_pq) * Number(it.value);
        });

        item.value = allVal;

        this.setLocalStorage(item.id, item.value, item.type, item.counts);
      }
    });

    this.setState({
      items,
    });
  }

  // получение данных ревизии
  async saveRev() {
    this.setState({
      modalDialog: false,
    });

    const point_id = this.state.point;

    const items_rev = this.state.items;

    const pf = this.state.pf;

    const allItems = [...pf, ...items_rev];

    const items = allItems.reduce((items, cat) => {
      cat = {
        item_id: cat.id,
        type: cat.type,
        value: cat.value,
        counts: cat?.counts ?? 0,
      };

      return (items = [...items, ...[cat]]);
    }, []);

    const data = {
      point_id,
      items,
    };

    const res = await this.getData('save_new', data);

    if (res.st) {
      this.setState({
        openAlert: true,
        err_status: true,
        err_text: 'Ревизия успешно сохранена!',
      });

      setTimeout(() => {
        this.getLocalStorage();
      }, 300);
    } else {
      this.setState({
        openAlert: true,
        err_status: false,
        err_text: 'Данные ревизии не сохранены!',
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
          onClose={() => this.setState({ openAlert: false }) } 
          status={this.state.err_status} 
          text={this.state.err_text} />
           
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>Новая ревизия</h1>
          </Grid>
          

          <Grid item xs={12} sm={6}>
            <MySelect
              data={this.state.points}
              value={this.state.point}
              func={this.changePoint.bind(this)}
              label="Точка"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <Button variant="contained" onClick={this.checkData.bind(this)}>
              Сохранить
            </Button>
          </Grid>

          <Grid item xs={12} sm={12} id="revTable">
            <Tabs
              value={this.state.chooseTab}
              onChange={(item, key) => this.setState({ chooseTab: key })}
              textColor="primary"
              indicatorColor="primary"
              centered
            >
              <Tab label="Товары" {...a11yProps(0)} />
              <Tab label="Заготовки" {...a11yProps(1)} />
            </Tabs>

            <RevizionNew_List
              chooseTab={this.state.chooseTab}
              items={this.state.items}
              pf={this.state.pf}
              saveEdit={this.state.saveEdit}
              saveData={this.saveData.bind(this)}
              clearData={this.clearData.bind(this)}
              copyData={this.copyData.bind(this)}
              open={this.state.open}
              onClose={() => this.setState({ open: false })}
              onOpen={() => this.setState({ open: true })}
              storages={this.state.storages}
              math={this.math.bind(this)}
            />
          </Grid>
        </Grid>

        {this.state.storages.length == 0 ? null : this.state.fullScreen ? (
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation showLabels>
              <BottomNavigationAction
                onClick={() => this.setState({ open: true })}
                label="Места хранения"
                icon={<RestoreIcon />}
              />
              <BottomNavigationAction
                onClick={this.checkData.bind(this)}
                label="Сохранить"
                icon={<SaveIcon />}
              />
            </BottomNavigation>
          </Paper>
        ) : (
          <Box sx={{ position: 'fixed', bottom: 20, right: 90 }}>
            <SpeedDial ariaLabel="SpeedDial basic example" icon={<SpeedDialIcon />}>
              <SpeedDialAction
                onClick={() => this.setState({ open: true })}
                key={'Recents'}
                icon={<RestoreIcon />}
                tooltipTitle={'Места хранения'}
              />
              <SpeedDialAction
                onClick={this.checkData.bind(this)}
                key={'Save'}
                icon={<SaveIcon />}
                tooltipTitle={'Сохранить'}
              />
            </SpeedDial>
          </Box>
        )}

        <Dialog
          sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
          maxWidth="sm"
          open={this.state.modalDialog}
          onClose={() => this.setState({ modalDialog: false })}
        >
          <DialogTitle align="center" sx={{ fontWeight: 'bold' }}>
            {this.state.title}
          </DialogTitle>
          <DialogContent align="center" sx={{ fontWeight: 'bold' }}>
            {this.state.content}
          </DialogContent>
          <DialogActions>
            {this.state.saveEdit ? (
              <Button onClick={() => this.setState({ modalDialog: false })}>
                Закрыть
              </Button>
            ) : (
              <>
                <Button onClick={this.notRestoreData.bind(this)}>Нет</Button>
                <Button style={{ color: '#00a550' }} onClick={this.getDataRev.bind(this)}>
                  Восстановить
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export function Revizion() {
  return <Revizion_ />;
}

export function RevizionNew() {
  return <RevizionNew_ />;
}
