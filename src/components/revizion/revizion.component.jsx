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

import { MySelect, MyTextInput, MyAutocomplite2 } from '../../stores/elements';

const queryString = require('query-string');

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
    let data = event.target.value;

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
    let data = event.target.value;

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
    let data = {
      point_id: this.state.point,
    };

    let res = await this.getData('get_rev_list', data);

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
    let data = {
      point_id: this.state.point,
      rev_id: this.state.chooseRev,
    };

    let res = await this.getData('get_data_rev', data);

    this.setState({
      items: res.item,
      pf: res.pf,
      itemsCopy: res.item,
      pfCopy: res.pf,
      all_items_list: res.all,
    });
  }

  // поиск
  search(event, value) {
    const search = event.target.value ? event.target.value : value ? value : '';

    const itemsCopy = JSON.parse(JSON.stringify(this.state.itemsCopy));

    const pfCopy = JSON.parse(JSON.stringify(this.state.pfCopy));

    const items = itemsCopy.filter((value) =>
      search ? value.name === search : value
    );

    const pf = pfCopy.filter((value) =>
      search ? value.name === search : value
    );

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
              data={this.state.all_items_list}
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

class RevizionNew_List_Item extends React.Component {
  shouldComponentUpdate(nextProps) {
    //console.log( nextProps.item, this.props.item )
    return JSON.stringify(nextProps.item) !== JSON.stringify(this.props.item);
  }

  render() {
    console.log( 'RevizionNew_List_Item render' )
    const { item, it, i, saveData, clearData } = this.props;

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
              value={it.value === 0 ? '' : it.value}
              func={(event) => saveData(event, 'item', item.id, 'value', i)}
              label="Количество"
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
        {item.counts[item.counts.length - 1] === it ? null : <Divider />}
      </React.Fragment>
    )
  }
}

class RevizionNew_List_accordion extends React.Component {
  shouldComponentUpdate(nextProps) {
    //console.log( nextProps.item, this.props.item )
    return JSON.stringify(nextProps.item) !== JSON.stringify(this.props.item) || nextProps.saveEdit !== this.props.saveEdit;
  }

  render() {
    console.log( 'RevizionNew_List_accordion1111 render' )
    const { saveEdit, item, saveData, clearData, copyData } = this.props;

    return (
      <Accordion>
        <AccordionSummary style={{ backgroundColor: saveEdit && !item.value ? '#ffc107' : null }} expandIcon={<ExpandMoreIcon />}>
          <Typography style={{ width: '60%' }}>{item.name}</Typography>
          <Typography style={{ width: '40%' }}>{!item.value ? '' : item.value} {!item.value ? '' : item.ei_name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {item.counts.map((it, i) => (
            <RevizionNew_List_Item key={i} item={item} it={it} saveData={saveData} clearData={clearData} i={i} />
          ))}

          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={() => copyData(item.id)}>
              Дублировать
            </Button>
          </Grid>
        </AccordionDetails>
      </Accordion>
    )
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
    console.log('RevizionNew_List render');

    return (
      <>
        {/* Товары */}
        <div style={ this.props.chooseTab == 0 ? { display: 'block', paddingBottom: 10, marginBottom: 75 } : { display: 'none' }}>
          {this.state.items.map((item, key) =>
            parseInt(item.is_show) === 0 ? null : (
              <RevizionNew_List_accordion key={key} item={item} saveEdit={this.props.saveEdit} saveData={this.props.saveData} clearData={this.props.clearData} copyData={this.props.copyData} />
            )
          )}
        </div>

        {/* Заготовки */}
        <div style={this.props.chooseTab == 1 ? { display: 'block', paddingBottom: 10, marginBottom: 75 } : { display: 'none' }}>
          {this.state.pf.map((item, key) =>
            parseInt(item.is_show) === 0 ? null : (
              <Accordion key={key}>
                <AccordionSummary style={{ backgroundColor: this.props.saveEdit && item.value == 0 ? '#ffc107' : null }} expandIcon={<ExpandMoreIcon />}>
                  <Typography style={{ width: '60%' }}>{item.name}</Typography>
                  <Typography style={{ width: '40%' }}>{item.value == 0 ? '' : item.value} {item.value == 0 ? '' : item.ei_name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid item sm={5}>
                    <MyTextInput
                      value={item.value == 0 ? '' : item.value}
                      func={(event) => this.props.saveData(event, 'pf', item.id, 'value', 0)}
                      label="Количество"
                    />
                  </Grid>
                </AccordionDetails>
              </Accordion>
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

      revList: [],
      chooseRev: '',

      storages: [],
      items: [],
      pf: [],

      chooseTab: 0,
      modalDialog: false,
      text: '',
      saveEdit: false,
      open: false,

      fullScreen: false,
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

    this.setState({
      point: data,
      saveEdit: false,
    });

    setTimeout(() => {
      this.getDataRev();
    }, 300);
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

    const data = {
      point_id: this.state.point,
    };

    const res = await this.getData('get_data_for_new_rev', data);

    this.setState({
      items: res.items,
      pf: res.pf,
      storages: res.storages,
      itemsCopy: res.items,
      pfCopy: res.pf,
    });
  }

  // предварительное сохранение
  saveData(event, type, id, data, index) {
    // console.log(type, id, data, index);

    if (type == 'item') {
      const items = this.state.items;

      items.forEach((item) => {
        if (item.id === id) {
          item.counts[index][data] = event.target.value;

          let allVal = 0;

          item.counts.forEach((it) => {
            allVal += parseFloat(it.need_pq) * parseFloat(it.value);
          });

          item.value = allVal;
        }
      });

      this.setState({
        items,
      });
    }

    if (type === 'pf') {
      const pf = this.state.pf;

      pf.forEach((pf) => {
        if (pf.id === id) {
          pf[data] = event.target.value;
        }
      });

      this.setState({
        pf,
      });
    }
  }

  // проверка полей, отображения модального окна
  checkData() {
    console.log('checkData');
    const items = this.state.items;
    const pf = this.state.pf;

    // проверка заполнения полей товаров, скрываем не заполненные
    items.forEach((item) => {
      if (item.value) {
        item.is_show = 0;
      }
    });

    pf.forEach((item) => {
      if (item.value != 0) {
        item.is_show = 0;
      }
    });

    this.setState({
      saveEdit: true,
      items,
      pf,
      modalDialog: true,
      text: 'Не заполненные позиции выделены цветом!',
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
          allVal += parseFloat(it.need_pq) * parseFloat(it.value);
        });

        item.value = allVal;
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
      cat = { item_id: cat.id, type: cat.type, value: cat.value };

      return (items = [...items, ...[cat]]);
    }, []);

    const data = {
      point_id,
      items,
    };
    
    // console.log('saveRev ', data);

    const res = await this.getData('save_new', data);

    if(res.st) {
      this.setState({
        openAlert: true,
        err_status: true,
        err_text: 'Ревизия успешно сохранена!',
      });

      setTimeout(() => {
        this.getDataRev();
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
          <DialogTitle align="center" sx={{ fontWeight: 'bold' }}>Не все данные заполнены!</DialogTitle>
          <DialogContent align="center" sx={{ fontWeight: 'bold' }}>{this.state.text}</DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => this.setState({ modalDialog: false })}>
              Отмена
            </Button>
            <Button onClick={this.saveRev.bind(this)}>Сохранить</Button>
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
