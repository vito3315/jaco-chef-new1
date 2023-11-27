import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

import Dropzone from 'dropzone';

import { MySelect, MyAutocomplite, MyAutocomplite2, MyDatePickerNew, formatDate, MyTextInput, MyCheckBox, MyAlert} from '../../stores/elements';
import Typography from '@mui/material/Typography';

import queryString from 'query-string';
import ModalImage from 'react-modal-image';
import dayjs from 'dayjs';

import { main, view, edit } from './data';

// Аккродион с данными из накладной для страниц Новая / Просмотр / Редактирование накладной
class Billing_Accordion extends React.Component {
  shouldComponentUpdate(nextProps) {
    var array1 = nextProps.bill_list;
    var array2 = this.props.bill_list;

    var is_same = array1.length == array2.length && array1.every(function (element, index) { return element === array2[index] });

    return !is_same;
  }
  render() {
    const { bill_list, bill_items } = this.props;

    return (
      <Grid item xs={12} sm={12} mb={5}>
        <Accordion expanded={true}>
          <AccordionDetails>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ opacity: 0 }} />} aria-controls="panel1a-content" style={{ paddingLeft: 0 }}>
              <Grid item xs display="flex" flexDirection="row">
                <Typography style={{ width: '3%' }} noWrap></Typography>
                <Typography style={{ width: '2%' }} noWrap></Typography>
                <Typography style={{ width: '2%' }} noWrap></Typography>
                <Typography style={{ width: '15%' }} noWrap>Номер накладной</Typography>
                <Typography style={{ width: '10%' }} noWrap>Дата в накладной</Typography>
                <Typography style={{ width: '13%' }} noWrap>Создатель</Typography>
                <Typography style={{ width: '10%' }} noWrap>Дата обновления</Typography>
                <Typography style={{ width: '10%' }} noWrap>Редактор</Typography>
                <Typography style={{ width: '10%' }} noWrap>Время обновления</Typography>
                <Typography style={{ width: '15%' }} noWrap>Тип накладной</Typography>
                <Typography style={{ width: '10%' }} noWrap>Сумма с НДС</Typography>
              </Grid>
            </AccordionSummary>

            {bill_list.map((item, i) => (
              <Accordion key={i}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" className="accordion_summary">
                  <Grid item xs display="flex" sx={{ flexDirection: { sm: 'row', xs: 'column' } }}>
                    <Typography style={{ width: '2%', backgroundColor: item.color, marginRight: '1%' }}></Typography>

                    <Tooltip title="Нету бумажного носителя" arrow placement="bottom-start"
                      componentsProps={{
                        tooltip: {
                          sx: { bgcolor: '#fff', color: '#000', border: '0.5px solid rgba(0, 0, 0, 0.87)',
                            '& .MuiTooltip-arrow': {
                              color: '#fff',
                              '&::before': {
                                backgroundColor: 'white',
                                border: '0.5px solid black',
                              },
                            },
                          },
                        },
                      }}
                    >
                      <Typography component="div" style={{ width: '2%', display: 'flex', alignItems: 'center' }}>
                        <MyCheckBox
                          value={false}
                          //func={this.props.changeCheck.bind(this, key, 'is_not_del')}
                          label=""
                        />
                      </Typography>
                    </Tooltip>

                    <Tooltip title="С бумажным носителем все хорошо" arrow placement="bottom-start"
                      componentsProps={{
                        tooltip: {
                          sx: { bgcolor: '#fff', color: '#000', border: '0.5px solid rgba(0, 0, 0, 0.87)',
                            '& .MuiTooltip-arrow': {
                              color: '#fff',
                              '&::before': {
                                backgroundColor: 'white',
                                border: '0.5px solid black',
                              },
                            },
                          },
                        },
                      }}
                    >
                      <Typography component="div" style={{ width: '2%', display: 'flex', alignItems: 'center' }}>
                        <MyCheckBox
                          value={false}
                          //func={this.props.changeCheck.bind(this, key, 'is_not_del')}
                          label=""
                        />
                      </Typography>
                    </Tooltip>

                    <Typography style={{ width: '15%', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }} noWrap>
                      {item.number}
                    </Typography>

                    <Typography style={{ width: '10%', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }} noWrap>
                      {item.date}
                    </Typography>

                    <Typography style={{ width: '13%', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }} noWrap>
                      {item.creator_id}
                    </Typography>

                    <Typography style={{ width: '10%', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }} noWrap>
                      {item.date_update}
                    </Typography>

                    <Typography style={{ width: '10%', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center'}} noWrap>
                      {item.editor_id}
                    </Typography>

                    <Typography style={{ width: '10%', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }} noWrap>
                      {item.time_update}
                    </Typography>

                    <Typography style={{ width: '15%', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }} noWrap>
                      {item.name}
                    </Typography>

                    <Typography style={{ width: '10%', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }} noWrap>
                      {item.sum_w_nds}
                    </Typography>
                  </Grid>
                </AccordionSummary>

                <AccordionDetails style={{ width: '100%' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                        <TableCell>Товар</TableCell>
                        <TableCell>Объем упак.</TableCell>
                        <TableCell>Кол-во упак.</TableCell>
                        <TableCell>Кол-во</TableCell>
                        <TableCell>Сумма с НДС</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {bill_items?.map((item, key) => (
                        <TableRow key={key} hover>
                          <TableCell> {item.item_name} </TableCell>
                          <TableCell>{item.pq} {item.ed_izmer_name}</TableCell>
                          <TableCell>{item.count}</TableCell>
                          <TableCell>{item.fact_unit} {item.ed_izmer_name}</TableCell>
                          <TableCell> {item.price_w_nds} ₽</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      </Grid>
    );
  }
}

// Главная страница
class Billing_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'billing',
      module_name: '',
      is_load: false,

      date_start: formatDate(new Date()),
      date_end: formatDate(new Date()),

      bill_list: [],
      status: '',

      types: [],
      type: '',

      vendors: [],
      vendor: '',

      points: [],
      point: [],

      carriers: [],
      carrier: '',

      number: '',

      all_items: [],
      items: [],

      billings: [],
      bills: [],
    };
  }

  async componentDidMount() {
    //const data = await this.getData('get_all');

    const data = main;

    this.setState({
      //module_name: data.module_info.name,
      module_name: 'Накладные',
      bill_list: data.bill_list,
      status: data.bill_list[0].id,
      types: data.types,
      type: data.types[0].id,
      vendors: data.vendors,
      vendor: data.vendors[0].id,
      points: data.points,
      carriers: data.carriers,
      carrier: data.carriers[0].id,
      all_items: data.all_items,
      billings: data.billings,
      bills: data.bills,
    });

    //document.title = data.module_info.name;
    document.title = 'Накладные';
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
        this.setState({
          is_load: false,
        });
      });
  };

  changeDateRange(data, event) {
    this.setState({
      [data]: event,
    });
  }

  changeSelect(data, event) {
    const data_2 = main;

    const value = event.target.value;

    if (value === '1') {
      this.setState({
        bills: data_2.bills_pay,
      });
    } else {
      this.setState({
        bills: data_2.bills,
      });
    }

    this.setState({
      [data]: value,
    });
  }

  changeAutocomplite(type, event, data) {
    this.setState({
      [type]: data,
    });
  }

  changeInput(event) {
    this.setState({
      number: event.target.value,
    });
  }

  getOneBill() {}

  getBill(type) {
    localStorage.setItem('type_bill', type);
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

          <Grid item xs={12} sm={12}>
            <Button variant="contained">
              <Link style={{ color: '#fff' }} to="/billing/edit" onClick={this.getBill.bind(this, 'new')}>
                Новая накладная
              </Link>
            </Button>
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
            <MySelect
              data={this.state.bill_list}
              value={this.state.status}
              multiple={false}
              is_none={false}
              func={this.changeSelect.bind(this, 'status')}
              label="Статус"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <MySelect
              data={this.state.types}
              value={this.state.type}
              multiple={false}
              is_none={false}
              func={this.changeSelect.bind(this, 'type')}
              label="Тип"
            />
          </Grid>

          <Grid item xs={7} sm={4}>
            <MyTextInput
              label="Номер накладной"
              value={this.state.number}
              func={this.changeInput.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MySelect
              data={this.state.vendors}
              value={this.state.vendor}
              multiple={false}
              is_none={false}
              func={this.changeSelect.bind(this, 'vendor')}
              label="Поставщик"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MySelect
              data={this.state.carriers}
              value={this.state.carrier}
              multiple={false}
              is_none={false}
              func={this.changeSelect.bind(this, 'carrier')}
              label="Бумажный носитель"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MyAutocomplite
              data={this.state.points}
              multiple={true}
              value={this.state.point}
              func={this.changeAutocomplite.bind(this, 'point')}
              label="Точка"
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <MyAutocomplite
              data={this.state.all_items}
              multiple={true}
              value={this.state.items}
              func={this.changeAutocomplite.bind(this, 'items')}
              label="Товары"
            />
          </Grid>

          <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained"
              //onClick={this.getItems.bind(this)}
            >
              Проставить бумажный носитель
            </Button>

            <Button variant="contained"
              //onClick={this.getItems.bind(this)}
            >
              Показать
            </Button>
          </Grid>

          <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            {this.state.billings.map((item, key) => (
              <Button style={{ background: item.color, fontWeight: 400, whiteSpace: 'nowrap', padding: '6px 14px' }} key={key} variant="contained">
                {item.name}{` (${item.count})`}
              </Button>
            ))}
            <Button style={{ background: 'aqua', fontWeight: 400, whiteSpace: 'nowrap', padding: '6px 14px' }} variant="contained">
              Данный документ храниться слишком долго
            </Button>
          </Grid>

          <Grid item xs={12} style={{ marginBottom: 20 }} sm={12}>
            <TableContainer component={Paper}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                    <TableCell>Тип</TableCell>
                    <TableCell>Количество</TableCell>
                    <TableCell>Сумма с НДС</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.billings.map((item, key) => (
                    <TableRow key={key} hover>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>{item.sum_w_nds}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} style={{ marginBottom: 20 }} sm={12}>
            <TableContainer component={Paper}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                    <TableCell>#</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Бумажный носитель</TableCell>
                    <TableCell>Тип</TableCell>
                    <TableCell>Номер</TableCell>
                    <TableCell>Дата накладной</TableCell>
                    <TableCell>Поставщик</TableCell>
                    <TableCell>Сумма с НДС</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.bills.map((item, key) => (
                    <TableRow key={key} hover>
                      <TableCell>{key + 1}</TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <Tooltip title="Есть в наличии" arrow placement="bottom-start"
                          componentsProps={{
                            tooltip: {
                              sx: { bgcolor: '#fff', color: '#000', border: '0.5px solid rgba(0, 0, 0, 0.87)',
                                '& .MuiTooltip-arrow': {
                                  color: '#fff',
                                  '&::before': {
                                    backgroundColor: 'white',
                                    border: '0.5px solid black',
                                  },
                                },
                              },
                            },
                          }}
                        >
                          <Typography component="div" className="ceil_tooltip">
                            <MyCheckBox
                              value={false}
                              //func={this.props.changeCheck.bind(this, key, 'is_not_del')}
                              label=""
                            />
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>Прих</TableCell>
                      <TableCell>
                        <Link to="/billing/view" onClick={this.getOneBill.bind(this)}>
                          {item.number}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to="/billing/edit" onClick={this.getBill.bind(this, 'edit')}>
                          {item.date}
                        </Link>
                      </TableCell>
                      <TableCell>{item.vendor_name}</TableCell>
                      <TableCell>{item.sum_w_nds}</TableCell>
                      <TableCell></TableCell>
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

// Страница просмотра одной Накладной
class Billing_View_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'billing',
      module_name: '',
      is_load: false,

      point: null,
      vendor: null,
      bill: null,
      imgs: [],
      bill_items: [],
      bill_list: [],
      users: [],
    };
  }

  async componentDidMount() {
    //const data = await this.getData('get_all');

    const data = view;

    this.setState({
      bill: data.bill,
      point: data.point,
      vendor: data.vendor,
      imgs: data.imgs,
      bill_items: data.bill_items,
      bill_list: data.bill_list,
      users: data.users,
    });

    //document.title = data.module_info.name;
    document.title = 'Накладные';
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
        this.setState({
          is_load: false,
        });
      });
  };

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>Просмотр накладной: {this.state.bill?.number}</h1>
            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)' }} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid style={{ display: 'flex' }}>
              <Typography style={{ fontWeight: 'bold' }}>Точка:&nbsp;</Typography>
              <Typography>{this.state.point?.name}</Typography>
            </Grid>
            <Grid style={{ display: 'flex' }}>
              <Typography style={{ fontWeight: 'bold' }}>Поставщик:&nbsp;</Typography>
              <Typography>{this.state.vendor?.name}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Grid style={{ display: 'flex' }}>
              <Typography style={{ fontWeight: 'bold' }}>Номер накладой:&nbsp;</Typography>
              <Typography>{this.state.bill?.number}</Typography>
            </Grid>
            <Grid style={{ display: 'flex' }}>
              <Typography style={{ fontWeight: 'bold' }}>Тип накладой:&nbsp;</Typography>
              <Typography>{this.state.bill?.type_bill === '1' ? 'Приходная' : 'Возвратная'}</Typography>
            </Grid>
            <Grid style={{ display: 'flex' }}>
              <Typography style={{ fontWeight: 'bold' }}>Форма оплаты:&nbsp;</Typography>
              <Typography>{this.state.bill?.type_pay === '1' ? 'Безналичная' : 'Наличная'}</Typography>
            </Grid>
            <Grid style={{ display: 'flex' }}>
              <Typography style={{ fontWeight: 'bold' }}>Дата накладой:&nbsp;</Typography>
              <Typography>{this.state.bill?.date}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} display="flex" flexDirection="row" style={{ fontWeight: 'bold' }}>
            {/* react-awesome-lightbox https://www.npmjs.com/package/react-awesome-lightbox */}
            {!this.state.imgs.length ? 'Фото отсутствует' : 
              <>
                {this.state.imgs.map((img, key) => (
                  <ModalImage
                    key={key}
                    className="img_modal"
                    small={'https://storage.yandexcloud.net/bill/' + img}
                    large={'https://storage.yandexcloud.net/bill/' + img}
                    hideDownload={true}
                    hideZoom={false}
                    showRotate={true}
                  />
                ))}
              </>
            }
          </Grid>

          <Grid item xs={12} sm={12}>
            <h2>Товары в накладной</h2>
            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)' }} />
          </Grid>

          <Grid item xs={12} style={{ marginBottom: 20 }} sm={12}>
            <TableContainer component={Paper}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                    <TableCell>Товар</TableCell>
                    <TableCell>В упак.</TableCell>
                    <TableCell>Упак</TableCell>
                    <TableCell>Кол-во</TableCell>
                    <TableCell>НДС</TableCell>
                    <TableCell>Сумма без НДС</TableCell>
                    <TableCell>Сумма НДС</TableCell>
                    <TableCell>Сумма с НДС</TableCell>
                    <TableCell>За 1 ед с НДС</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.bill_items?.map((item, key) => (
                    <TableRow key={key} hover>
                      <TableCell>{item.item_name}</TableCell>
                      <TableCell>{item.pq} {item.ed_izmer_name}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>{item.fact_unit} {item.ed_izmer_name}</TableCell>
                      <TableCell>{item.nds}%</TableCell>
                      <TableCell>{item.price} ₽</TableCell>
                      <TableCell>{Number(item.price_w_nds) - Number(item.price)} ₽</TableCell>
                      <TableCell>{item.price_w_nds} ₽</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} sm={12} style={{ display: 'flex' }}>
            <Typography style={{ fontWeight: 'bold', color: '#9e9e9e' }}>Дата разгрузки:&nbsp;</Typography>
            <Typography>{this.state.bill?.date}</Typography>
          </Grid>

          <Grid item xs={12} sm={12} style={{ display: 'flex' }}>
            <Typography style={{ fontWeight: 'bold', color: '#9e9e9e' }}>Сотрудники:&nbsp;</Typography>
            {this.state.users.map((user, key) => (
              <Typography key={key} component="span" mr={1}>
                {user.name}{this.state.users.length === 1 || this.state.users.at(-1) === user ? null : ', '}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={12} sm={12} style={{ display: 'flex' }}>
            <Typography style={{ fontWeight: 'bold', color: '#9e9e9e' }}>Комментарии:&nbsp;</Typography>
            <Typography></Typography>
          </Grid>

          <Grid item xs={12} sm={12} style={{ display: 'flex', marginBottom: 20 }}>
            <Typography style={{ fontWeight: 'bold', color: '#9e9e9e' }}>Причина удаления:&nbsp;</Typography>
            <Typography></Typography>
          </Grid>

          <Billing_Accordion
            bill_list={this.state.bill_list}
            bill_items={this.state.bill_items}
          />
        </Grid>
      </>
    );
  }
}

// Страница Новая / Редактирование Накладной
class Billing_Edit_ extends React.Component {
  dropzoneOptions = {
    autoProcessQueue: false,
    autoQueue: true,
    maxFiles: 1,
    timeout: 0,
    parallelUploads: 10,
    acceptedFiles: 'image/jpeg,image/png',
    addRemoveLinks: true,
    url: 'https://jacochef.ru/src/img/site_aktii/upload_img.php',
  };

  myDropzone = null;

  constructor(props) {
    super(props);

    this.state = {
      module: 'billing',
      module_name: '',
      is_load: false,

      date: formatDate(new Date()),
      date_unload: formatDate(new Date()),

      operAlert: false,
      err_status: true,
      err_text: '',

      points: [],
      point: '',

      users: [],
      user: [],

      vendors: [],
      vendorsCopy: [],

      vendor_items: [],
      vendor_itemsCopy: [],

      kinds: [],
      kind: '',

      types: [],
      type: '',

      sorts: [],
      sort: '',

      docs: [],
      doc: '',

      number: '',
      search_vendor: '',
      search_item: '',

      all_ed_izmer: [],
      pq: '',
      count: '',
      fact_unit: '',

      summ: '',
      sum_w_nds: '',

      bill_items: [],

      allPrice: '',
      allPrice_w_nds: '',

      comment: '',

      bill_list: [],
      vendor: null,
      bill: null,
      imgs: [],
      bill_list: [],

      type_bill: null,
    };
  }

  async componentDidMount() {
    //const data = await this.getData('get_all');

    const type_bill = localStorage.getItem('type_bill');

    this.setState({
      type_bill,
    });

    if (type_bill === 'new') {
      this.setState({
        module_name: 'Новая накладная',
        points: edit.points,
        users: edit.users,
        vendors: edit.vendors,
        vendorsCopy: edit.vendors,
        types: edit.types,
        type: edit.types[0].id,
        sorts: edit.sorts,
        kinds: edit.kinds,
        docs: edit.docs,
        users: edit.users,
      });
    }

    if (type_bill === 'edit') {
      const bill_items = view.bill_items.map((item) => {
        item.all_ed_izmer = item.pq_item.split('#').map((it) => {
          it = { name: `${it} ${item.ed_izmer_name}`, id: it };
          return it;
        });
        return item;
      });

      const allPrice = bill_items.reduce((all, item) => all + Number(item.price), 0);
      const allPrice_w_nds = bill_items.reduce((all, item) => all + Number(item.price_w_nds), 0);

      this.setState({
        module_name: 'Редактирование накладной',
        bill: view.bill,
        point: view.point,
        vendor: view.vendor,
        imgs: view.imgs,
        bill_items,
        bill_list: view.bill_list,
        users: view.users,
        user: view.users,
        number: view.bill?.number,
        date: dayjs(view.bill?.date),
        vendor_items: edit.vendor_items,
        vendor_itemsCopy: edit.vendor_items,
        date_unload: dayjs(view.bill?.date),
        comment: 'Переделать фото',
        allPrice,
        allPrice_w_nds,
      });
    }

    //document.title = data.module_info.name;
    document.title = 'Накладные';
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
        this.setState({
          is_load: false,
        });
      });
  };

  // поиск/выбор поставщика/товара поставщика
  search(type, event, value) {
    if (type === 'search_vendor') {
      const search = event.target.value ? event.target.value : value ? value : '';

      if (search) {
        const data = edit; // запрос или функция к серверу

        this.setState({
          vendor_items: data.vendor_items,
          vendor_itemsCopy: data.vendor_items,
        });

      } else {
        this.setState({
          search_item: '',
          vendor_items: [],
          vendor_itemsCopy: [],
          all_ed_izmer: [],
          pq: '',
          count: '',
          fact_unit: '',
          summ: '',
          sum_w_nds: '',
          bill_items: [],
        });
      }

      const vendorsCopy = this.state.vendorsCopy;

      const vendors = vendorsCopy.filter((value) => search ? value.name.toLowerCase() === search.toLowerCase() : value);

      this.setState({
        search_vendor: search,
        vendors,
      });
    }

    if (type === 'search_item') {
      const search = event.target.value ? event.target.value : value ? value : '';

      const vendor_itemsCopy = this.state.vendor_itemsCopy;

      if (vendor_itemsCopy.length) {
        const vendor_items = vendor_itemsCopy.filter((value) => search ? value.name.toLowerCase() === search.toLowerCase() : value);

        const all_ed_izmer = vendor_items[0].pq.split('#').map((item) => (item = { name: `${item} ${vendor_items[0].ed_izmer_name}`, id: item }));

        this.setState({
          vendor_items,
          all_ed_izmer: search ? all_ed_izmer : [],
          pq: search ? all_ed_izmer[0].id : '',
          count: '',
          fact_unit: '',
          summ: '',
          sum_w_nds: '',
        });
      }

      this.setState({
        search_item: search,
      });
    }
  }

  changeSelect(data, event) {
    const value = event.target.value;

    this.setState({
      [data]: value,
    });
  }

  changeInput(type, event) {
    if (type === 'number') {
      this.setState({
        [type]: event.target.value,
      });
    } else {
      if (!this.state.pq && !this.state.all_ed_izmer.lenght) {
        this.setState({
          operAlert: true,
          err_status: false,
          err_text: 'Необходимо выбрать Товар',
        });
        return;
      }

      if (type === 'count') {
        const count = event.target.value;

        const fact_unit = Number(this.state.pq) * Number(count);

        this.setState({
          count,
          fact_unit: fact_unit ? fact_unit : '',
        });
      } else {
        this.setState({
          [type]: event.target.value,
        });
      }
    }
  }

  changeDateRange(data, event) {
    this.setState({
      [data]: event,
    });
  }

  changeAutocomplite(type, event, data) {
    this.setState({
      [type]: data,
    });
  }

  changeItem(data, event) {
    this.setState({
      [data]: event.target.value,
    });
  }

  addItem() {
    const { count, fact_unit, summ, sum_w_nds, all_ed_izmer, pq, vendor_items } = this.state;

    let bill_items = JSON.parse(JSON.stringify(this.state.bill_items));

    if (!count || !fact_unit || !summ || !sum_w_nds) {
      this.setState({
        operAlert: true,
        err_status: false,
        err_text: 'Необходимо указать сумму / кол-во Товара',
      });
      return;
    }

    const res_w_nds = Number(summ) * (Number(vendor_items[0].nds) / 100) + Number(summ);

    if (res_w_nds !== Number(sum_w_nds)) {
      this.setState({
        operAlert: true,
        err_status: false,
        err_text: 'Сумма указаны неверно',
      });
      return;
    }

    vendor_items[0].pq = pq;
    vendor_items[0].all_ed_izmer = all_ed_izmer;
    vendor_items[0].count = count;
    vendor_items[0].fact_unit = fact_unit;
    vendor_items[0].price = summ;
    vendor_items[0].price_w_nds = sum_w_nds;

    bill_items.push(vendor_items[0]);

    const allPrice = bill_items.reduce((all, item) => all + Number(item.price), 0);
    const allPrice_w_nds = bill_items.reduce((all, item) => all + Number(item.price_w_nds), 0);

    this.setState({
      bill_items,
      allPrice,
      allPrice_w_nds,
      count: '',
      fact_unit: '',
      summ: '',
      sum_w_nds: '',
    });
  }

  deleteItem(index) {
    const bill_items = JSON.parse(JSON.stringify(this.state.bill_items));

    bill_items.splice(index, 1);

    const allPrice = bill_items.reduce((all, item) => all + Number(item.price), 0);
    const allPrice_w_nds = bill_items.reduce((all, item) => all + Number(item.price_w_nds), 0);

    this.setState({
      bill_items,
      allPrice,
      allPrice_w_nds,
    });
  }

  changeDataTable(type, id, key, event) {
    const value = event.target.value;

    let bill_items = JSON.parse(JSON.stringify(this.state.bill_items));

    bill_items = bill_items.map((item, index) => {
      if (item.id === id && key === index) {
        item[type] = value;

        if (value) {
          if (type === 'count') {
            item.fact_unit = Number(item[type]) * Number(item.pq);
          }

          if (type === 'pq') {
            item.fact_unit = Number(item[type]) * Number(item.count);
          }
        } else {
          if (type === 'count' || type === 'pq') {
            item.fact_unit = 0;
          }
        }
      }
      return item;
    });

    if (type === 'price') {
      const allPrice = bill_items.reduce((all, item) => all + Number(item.price), 0);

      this.setState({
        allPrice,
      });
    }

    if (type === 'price_w_nds') {
      const allPrice_w_nds = bill_items.reduce((all, item) => all + Number(item.price_w_nds), 0);

      this.setState({
        allPrice_w_nds,
      });
    }

    this.setState({
      bill_items,
    });
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <MyAlert
          isOpen={this.state.operAlert}
          onClose={() => this.setState({ operAlert: false })}
          status={this.state.err_status}
          text={this.state.err_text}
        />

        <Grid container spacing={3} mb={10}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}{this.state.type_bill === 'edit' ? `: ${this.state.bill?.number}` : null}</h1>
            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)' }} />
          </Grid>

          {this.state.type_bill === 'new' ? (
            <>
              <Grid item xs={12} sm={4}>
                <MyAutocomplite2
                  label="Поставщик"
                  freeSolo={true}
                  multiple={false}
                  data={this.state.vendors}
                  value={this.state.search_vendor}
                  func={this.search.bind(this, 'search_vendor')}
                  onBlur={this.search.bind(this, 'search_vendor')}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <MySelect
                  data={this.state.sorts}
                  value={this.state.sort}
                  multiple={false}
                  is_none={false}
                  func={this.changeSelect.bind(this, 'sort')}
                  label="Вид документа"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <MySelect
                  data={this.state.points}
                  value={this.state.point}
                  multiple={false}
                  is_none={false}
                  func={this.changeSelect.bind(this, 'point')}
                  label="Точка"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <MySelect
                  data={this.state.types}
                  value={this.state.type}
                  multiple={false}
                  is_none={false}
                  func={this.changeSelect.bind(this, 'type')}
                  label="Тип"
                />
              </Grid>
            </>
          ) : (
            <Grid item xs={12} sm={12}>
              <Grid style={{ display: 'flex' }}>
                <Typography style={{ fontWeight: 'bold' }}>Точка:&nbsp;</Typography>
                <Typography>{this.state.point?.name}</Typography>
              </Grid>
              <Grid style={{ display: 'flex' }}>
                <Typography style={{ fontWeight: 'bold' }}>Поставщик:&nbsp;</Typography>
                <Typography>{this.state.vendor?.name}</Typography>
              </Grid>
              <Grid style={{ display: 'flex' }}>
                <Typography style={{ fontWeight: 'bold' }}>Тип накладой:&nbsp;</Typography>
                <Typography>{this.state.bill?.type_bill === '1' ? 'Приходная' : 'Возвратная'}</Typography>
              </Grid>
              <Grid style={{ display: 'flex' }}>
                <Typography style={{ fontWeight: 'bold' }}>Вид документа:&nbsp;</Typography>
                <Typography>Коррекция</Typography>
              </Grid>
              <Grid style={{ display: 'flex' }}>
                <Typography style={{ fontWeight: 'bold' }}>УПД</Typography>
              </Grid>
              <Grid style={{ display: 'flex' }}>
                <Typography style={{ fontWeight: 'bold' }}>Документ основание:&nbsp;</Typography>
                <Typography>Основание_1</Typography>
              </Grid>
            </Grid>
          )}

          <Grid item xs={7} sm={4}>
            <MyTextInput
              label="Номер накладной"
              value={this.state.number}
              func={this.changeInput.bind(this, 'number')}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MyDatePickerNew
              label="Дата"
              value={this.state.date}
              func={this.changeDateRange.bind(this, 'date')}
            />
          </Grid>

          {this.state.type_bill === 'new' ? null : (
            <Grid item xs={12} sm={12} display="flex" flexDirection="row" style={{ fontWeight: 'bold' }}>
              {/* react-awesome-lightbox https://www.npmjs.com/package/react-awesome-lightbox */}
              {!this.state.imgs.length ? 'Фото отсутствует' :
                <>
                  {this.state.imgs.map((img, key) => (
                    <ModalImage
                      key={key}
                      className="img_modal"
                      small={'https://storage.yandexcloud.net/bill/' + img}
                      large={'https://storage.yandexcloud.net/bill/' + img}
                      hideDownload={true}
                      hideZoom={false}
                      showRotate={true}
                    />
                  ))}
                </>
              }
            </Grid>
          )}

          {this.state.type_bill === 'edit' ? null : (
            <>
              {parseInt(this.state.sort) === 2 || parseInt(this.state.sort) === 3 ? (
                <Grid item xs={12} sm={4}>
                  <MySelect
                    data={this.state.kinds}
                    value={this.state.kind}
                    multiple={false}
                    is_none={false}
                    func={this.changeSelect.bind(this, 'kind')}
                    label="Накладная / УПД"
                  />
                </Grid>
              ) : null}

              {parseInt(this.state.sort) === 3 || parseInt(this.state.sort) === 4 ? (
                <Grid item xs={12} sm={4}>
                  <MyAutocomplite
                    data={this.state.docs}
                    multiple={false}
                    value={this.state.doc}
                    func={this.changeAutocomplite.bind(this, 'doc')}
                    label="Документ основание"
                  />
                </Grid>
              ) : null}
            </>
          )}

          <Grid item xs={12} sm={12}>
            <div
              className="dropzone"
              id="for_img_edit"
              style={{ width: '100%', minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span>Выбери файлы для загрузки</span>
            </div>
          </Grid>

          <Grid item xs={12} sm={12}>
            <h2>Товары поставщика</h2>
            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)' }} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MyAutocomplite2
              label="Товар поставщика"
              freeSolo={true}
              multiple={false}
              data={this.state.vendor_items}
              value={this.state.search_item}
              func={this.search.bind(this, 'search_item')}
              onBlur={this.search.bind(this, 'search_item')}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <MySelect
              data={this.state.all_ed_izmer}
              value={this.state.pq}
              multiple={false}
              is_none={false}
              func={this.changeSelect.bind(this, 'pq')}
              label="Объем упаковки"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyTextInput
              type="number"
              label="Кол-во упаковок"
              value={this.state.count}
              func={this.changeInput.bind(this, 'count')}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <MyTextInput label="Кол-вo" value={this.state.fact_unit} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MyTextInput
              type="number"
              label="Сумма без НДС"
              value={this.state.summ}
              func={this.changeInput.bind(this, 'summ')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MyTextInput
              type="number"
              label="Сумма c НДС"
              value={this.state.sum_w_nds}
              func={this.changeInput.bind(this, 'sum_w_nds')}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Button variant="contained" fullWidth style={{ height: '100%' }} onClick={this.addItem.bind(this)}>
              <AddIcon />
            </Button>
          </Grid>

          <Grid item xs={12} sm={12}>
            <h2>Товары в накладной</h2>
            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)' }} />
          </Grid>

          <Grid item xs={12} style={{ marginBottom: 20 }} sm={12}>
            <TableContainer component={Paper}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                    <TableCell>Товар</TableCell>
                    <TableCell>В упак.</TableCell>
                    <TableCell>Упак</TableCell>
                    <TableCell>Кол-во</TableCell>
                    <TableCell>НДС</TableCell>
                    <TableCell>Сумма без НДС</TableCell>
                    <TableCell>Сумма НДС</TableCell>
                    <TableCell>Сумма с НДС</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.bill_items.map((item, key) => (
                    <TableRow key={key} hover style={{ backgroundColor: 'rgb(255, 204, 0)' }}>
                      <TableCell> {item?.name ?? item.item_name} </TableCell>
                      <TableCell className="ceil_white">
                        <MySelect
                          data={item.all_ed_izmer}
                          value={item.pq}
                          multiple={false}
                          is_none={false}
                          func={this.changeDataTable.bind(this, 'pq', item.id, key)}
                          label=""
                        />
                      </TableCell>
                      <TableCell className="ceil_white">
                        <MyTextInput
                          type="number"
                          label=""
                          value={item.count}
                          func={this.changeDataTable.bind(this, 'count', item.id, key)}
                          onBlur={this.changeDataTable.bind(this, 'count', item.id, key)}
                        />
                      </TableCell>
                      <TableCell style={{ whiteSpace: 'nowrap' }}>{item.fact_unit} {item.ed_izmer_name}</TableCell>
                      <TableCell>{item.nds}%</TableCell>
                      <TableCell className="ceil_white">
                        <MyTextInput
                          type="number"
                          label=""
                          value={item.price}
                          func={this.changeDataTable.bind(this, 'price', item.id, key)}
                          onBlur={this.changeDataTable.bind(this, 'price', item.id, key)}
                        />
                      </TableCell>
                      <TableCell style={{ whiteSpace: 'nowrap' }}>{Number(item.price_w_nds) - Number(item.price)} ₽</TableCell>
                      <TableCell className="ceil_white">
                        <MyTextInput
                          type="number"
                          label=""
                          value={item.price_w_nds}
                          func={this.changeDataTable.bind(this, 'price_w_nds', item.id, key)}
                          onBlur={this.changeDataTable.bind(this, 'price_w_nds', item.id, key)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button onClick={this.deleteItem.bind(this, key)} style={{ cursor: 'pointer' }} color="error" variant="contained">
                          <ClearIcon />
                        </Button>
                      </TableCell>
                      <TableCell>{(Number(item.price_w_nds) / Number(item.count)).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  {!this.state.bill_items.length ? null : (
                    <TableRow sx={{ '& td': { fontWeight: 'bold' } }}>
                      <TableCell>Итого:</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell align="center">{this.state.allPrice} ₽</TableCell>
                      <TableCell></TableCell>
                      <TableCell align="center">{this.state.allPrice_w_nds} ₽</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} sm={6}>
            <MyDatePickerNew
              label="Дата разгрузки"
              value={this.state.date_unload}
              func={this.changeDateRange.bind(this, 'date_unload')}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MyAutocomplite
              data={this.state.users}
              multiple={true}
              value={this.state.user}
              func={this.changeAutocomplite.bind(this, 'user')}
              label="Сотрудники"
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <MyTextInput
              label="Комментарии"
              multiline={true}
              maxRows={3}
              value={this.state.comment}
              func={this.changeItem.bind(this, 'comment')}
            />
          </Grid>

          {this.state.type_bill === 'new' ? null : (
            <>
              <Grid item xs={6} sm={6} style={{ display: 'flex', marginBottom: 20 }}>
                <Typography style={{ fontWeight: 'bold', color: '#9e9e9e' }}>
                  Причина удаления:&nbsp;
                </Typography>
                <Typography></Typography>
              </Grid>

              <Grid item xs={6} sm={6} style={{ display: 'flex', marginBottom: 20 }}>
                <Typography style={{ fontWeight: 'bold', color: '#9e9e9e' }}>Комментарий бухгалтера:&nbsp;</Typography>
                <Typography>Переделать фото</Typography>
              </Grid>
            </>
          )}

          <Grid item xs={12} sm={12} display="flex" alignItems="center">
            <MyCheckBox
              value={false}
              //func={this.props.changeCheck.bind(this, key, 'is_not_del')}
              label=""
            />
            <Typography component="span" className="span_text">
              Поставщик привезет новую накладную
            </Typography>
          </Grid>

          {this.state.type_bill === 'new' ? null : (
            <Billing_Accordion
              bill_list={this.state.bill_list}
              bill_items={this.state.bill_items}
            />
          )}

          <Grid item xs={12} sm={4}>
            <Button variant="contained" fullWidth color="success" style={{ height: '100%' }}
              //onClick={this.saveBill.bind(this)}
            >
              Сохранить
            </Button>
          </Grid>

          {this.state.type_bill === 'new' ? null : (
            <>
              <Grid item xs={12} sm={4}>
                <Button variant="contained" fullWidth style={{ height: '100%' }}
                  //onClick={this.saveBill.bind(this)}
                >
                  Удалить
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="contained" fullWidth color="info" style={{ height: '100%' }}
                  //onClick={this.saveBill.bind(this)}
                >
                  Сохранить и отправить
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </>
    );
  }
}

export function Billing() {
  return <Billing_ />;
}

export function BillingView() {
  return <Billing_View_ />;
}

export function BillingEdit() {
  return <Billing_Edit_ />;
}
