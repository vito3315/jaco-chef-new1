import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Dropzone from 'dropzone';

import { MySelect, MyAutocomplite, MyAutocomplite2, MyDatePickerNew, formatDate, MyTextInput, MyCheckBox, MyAlert} from '../../stores/elements';

import queryString from 'query-string';
import ReactPanZoom from 'react-image-pan-zoom-rotate';
import dayjs from 'dayjs';

import { main, view, edit } from './data'; //  для тестов

class Billing_Modal extends React.Component {

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose.bind(this)}
        fullScreen={this.props.fullScreen}
        fullWidth={true}
        maxWidth='xl'
      >
        <DialogContent style={{ paddingBottom: 10, paddingTop: 20 }}>

          <DialogTitle style={{ padding: 0, marginBottom: 20 }}>
            <IconButton onClick={this.props.onClose.bind(this)} className='close_btn'>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <ReactPanZoom
            image={this.props.image}
            alt="Image bill"
          />

        </DialogContent>
      </Dialog>
    );
  }
}

// Аккродион с данными из накладной для страниц Новая / Просмотр / Редактирование накладной
class Billing_Accordion extends React.Component {
  shouldComponentUpdate(nextProps) {
    var array1 = nextProps.bill_list;
    var array2 = this.props.bill_list;

    var is_same = array1.length == array2.length && array1.every(function (element, index) { return element === array2[index] });

    return !is_same;
  }
  render() {
    const { bill_list, bill_items, type } = this.props;

    return (
      <Grid item xs={12} sm={12} mb={5}>
        <TableContainer component={Paper}>
          <Accordion expanded={true} style={{ minWidth: 'max-content'}}>
            <AccordionDetails>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ opacity: 0 }} />} aria-controls="panel1a-content">
                <Grid item xs display="flex" flexDirection="row">
                  <Typography style={{ width: '1%' }}></Typography>
                  <Typography style={{ width: '3%' }}></Typography>
                  <Typography style={{ width: '3%' }}></Typography>
                  <Typography style={{ width: '10%' }}>
                    Номер {type === 'edit' ? ' документа' : ' накладной'}
                  </Typography>
                  <Typography style={{ width: '10%' }}>
                    Дата в {type === 'edit' ? ' документе' : ' накладной'}
                  </Typography>
                  <Typography style={{ width: '14%', minWidth: '200px' }}>Создатель</Typography>
                  <Typography style={{ width: '10%' }}>Дата обновления</Typography>
                  <Typography style={{ width: '14%', minWidth: '200px' }}>Редактор</Typography>
                  <Typography style={{ width: '10%' }}>Время обновления</Typography>
                  <Typography style={{ width: '17%', minWidth: '250px' }}>
                    Тип {type === 'edit' ? ' документа' : ' накладной'}
                  </Typography>
                  <Typography style={{ width: '8%' }}>Сумма с НДС</Typography>
                </Grid>
              </AccordionSummary>

              {bill_list.map((item, i) => (
                <Accordion key={i}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" className="accordion_summary" style={{ paddingRight: '1%' }}>

                    <Grid item xs display="flex" flexDirection='row'>

                      <Typography component="div" style={{ width: '1%', backgroundColor: item.color, marginRight: '1%' }}></Typography>

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
                        <Typography component="div" style={{ width: '3%', display: 'flex', alignItems: 'center' }}>
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
                        <Typography component="div" style={{ width: '3%', display: 'flex', alignItems: 'center' }}>
                          <MyCheckBox
                            value={false}
                            //func={this.props.changeCheck.bind(this, key, 'is_not_del')}
                            label=""
                          />
                        </Typography>
                      </Tooltip>

                      <Typography style={{ width: '10%',  display: 'flex', alignItems: 'center' }}>
                        {item.number}
                      </Typography>

                      <Typography style={{ width: '10%',  display: 'flex', alignItems: 'center' }}>
                        {item.date}
                      </Typography>

                      <Typography style={{ width: '14%', minWidth: '200px', display: 'flex', alignItems: 'center' }}>
                        {item.creator_id}
                      </Typography>

                      <Typography style={{ width: '10%',  display: 'flex', alignItems: 'center' }}>
                        {item.date_update}
                      </Typography>

                      <Typography style={{ width: '14%', minWidth: '200px', display: 'flex', alignItems: 'center'}}>
                        {item.editor_id}
                      </Typography>

                      <Typography style={{ width: '10%',  display: 'flex', alignItems: 'center' }}>
                        {item.time_update}
                      </Typography>

                      <Typography style={{ width: '17%', minWidth: '250px',  display: 'flex', alignItems: 'center' }}>
                        {item.name}
                      </Typography>

                      <Typography style={{ width: '8%',  display: 'flex', alignItems: 'center' }}>
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
        </TableContainer>
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
      vendorsCopy: [],
      search_vendor: '',

      points: [],
      point: [],

      number: '',

      all_items: [],
      items: [],

      billings: [],
      bills: [],
    };
  }

  async componentDidMount() {
    const data = await this.getData('get_all');

    console.log('res', data)

    this.setState({
      //module_name: data.module_info.name,
      module_name: 'Накладные',
      bill_list: main.bill_list,
      status: main.bill_list[0].id,
      types: main.types,
      vendors: data.vendors,
      vendorsCopy: data.vendors,
      points: data.points,
      all_items: data.items,
      billings: main.billings,
      bills: main.bills,
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
      [data]: event ? event : null,
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

   // поиск/выбор поставщика
  search(event, value) {

    const search = event.target.value ? event.target.value : value ? value : '';

    const vendorsCopy = this.state.vendorsCopy;

    const vendors = vendorsCopy.filter((value) => search ? value.name.toLowerCase() === search.toLowerCase() : value);

    this.setState({
      search_vendor: search,
      vendors,
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

          <Grid item xs={12} sm={12}>
            <Button variant="contained">
              <Link style={{ color: '#fff' }} to="/billing/edit" onClick={this.getBill.bind(this, 'new')}>
                Новая накладная
              </Link>
            </Button>
          </Grid> 

          <Grid item xs={12} sm={4}>
            <MyDatePickerNew
              label="Дата от"
              value={this.state.date_start}
              func={this.changeDateRange.bind(this, 'date_start')}
              clearable={true}
              customActions={true}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MyDatePickerNew
              label="Дата до"
              value={this.state.date_end}
              func={this.changeDateRange.bind(this, 'date_end')}
              clearable={true}
              customActions={true}
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

          <Grid item xs={12} sm={4}>
            <MyAutocomplite2
              label="Поставщик"
              freeSolo={true}
              multiple={false}
              data={this.state.vendors}
              value={this.state.search_vendor}
              func={this.search.bind(this)}
              onBlur={this.search.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MySelect
              data={this.state.bill_list}
              value={this.state.status}
              multiple={false}
              is_none={false}
              func={this.changeSelect.bind(this, 'status')}
              label="Статус"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MyTextInput
              label="Номер накладной"
              value={this.state.number}
              func={this.changeInput.bind(this)}
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

          <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { sm: 'row', xs: 'column' } }}>
            <Button variant="contained" sx={{ marginBottom: { xs: 1 } }}
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

          <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: { sm: 20, xs: 3 }, flexDirection: { sm: 'row', xs: 'column' } }}>
            {this.state.billings.map((item, key) => (
              <Button sx={{ background: item.color, fontWeight: 400, whiteSpace: 'nowrap', padding: '6px 14px', marginBottom: { xs: 1, sm: 0 } }} key={key} variant="contained">
                {item.name}{` (${item.count})`}
              </Button>
            ))}
            <Button sx={{ background: 'aqua', fontWeight: 400, whiteSpace: { xs: 'wrap', sm: 'nowrap' }, padding: '6 14px' }} variant="contained">
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

      modalDialog: false,
      fullScreen: false,
      image: ''
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

  openImageBill (image) {
    this.handleResize();

    this.setState({ 
      modalDialog: true, 
      image
    })
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Billing_Modal
          open={this.state.modalDialog}
          onClose={() => this.setState({ modalDialog: false })}
          fullScreen={this.state.fullScreen}
          image={this.state.image}
        />

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
            {!this.state.imgs.length ? 'Фото отсутствует' : 
              <>
                {this.state.imgs.map((img, key) => (
                  <img 
                    key={key} 
                    src={'https://storage.yandexcloud.net/bill/' + img} 
                    alt="Image bill" 
                    className="img_modal"
                    onClick={this.openImageBill.bind(this, 'https://storage.yandexcloud.net/bill/' + img)}
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
                    <TableCell style={{ minWidth: '150px' }}>Товар</TableCell>
                    <TableCell style={{ minWidth: '130px' }}>В упак.</TableCell>
                    <TableCell>Упак</TableCell>
                    <TableCell style={{ minWidth: '130px' }}>Кол-во</TableCell>
                    <TableCell>НДС</TableCell>
                    <TableCell style={{ minWidth: '180px' }}>Сумма без НДС</TableCell>
                    <TableCell style={{ minWidth: '180px' }}>Сумма НДС</TableCell>
                    <TableCell style={{ minWidth: '150px' }}>Сумма с НДС</TableCell>
                    <TableCell style={{ minWidth: '150px' }}>За 1 ед с НДС</TableCell>
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

          <Grid item xs={12} sm={12} sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Typography component='span' style={{ fontWeight: 'bold', color: '#9e9e9e' }}>Сотрудники:&nbsp;</Typography>
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

      number_invoice: '',
      date_invoice: formatDate(new Date()),

      modalDialog: false,
      fullScreen: false,
      image: ''
    };
  }

  async componentDidMount() {
    //const data = await this.getData('get_all');

    const data = await this.getData('get_points')
   
    const type_bill = localStorage.getItem('type_bill');

    this.setState({
      type_bill,
    });

    if (type_bill === 'new') {
      this.setState({
        module_name: 'Новый документ',
        points: edit.points,
        //
        types: edit.sorts,
        kinds: edit.kinds,
        docs: edit.docs,
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

      const allPrice = (bill_items.reduce((all, item) => all + Number(item.price), 0)).toFixed(2);
      const allPrice_w_nds = (bill_items.reduce((all, item) => all + Number(item.price_w_nds), 0)).toFixed(2);

      if(data.points.length === 1) {

        const obj = {
          point_id: data.points[0].id
        }

        const res = await this.getData('get_vendors', obj)

        this.setState({
          vendors: res.vendors,
          vendorsCopy: res.vendors,
          point: data.points[0].id,
        })

      }

      this.setState({
        points: data.points,
        module_name: 'Редактирование документа',
        allPrice,
        allPrice_w_nds,
        //
        bill: view.bill,
        imgs: view.imgs,
        bill_items,
        bill_list: view.bill_list,
        number: view.bill?.number,
        date: dayjs(view.bill?.date),
        date_unload: dayjs(view.bill?.date),
        comment: 'Переделать фото',
        types: edit.sorts,
        kinds: edit.kinds,
        docs: edit.docs,
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
  async search(type, event, value) {

    if (type === 'search_vendor') {
      const search = event.target.value ? event.target.value : value ? value : '';

      const vendorsCopy = this.state.vendorsCopy;

      const vendors = vendorsCopy.filter((value) => search ? value.name.toLowerCase() === search.toLowerCase() : value);

      if (search && vendors.length) {

        const point_id = this.state.point;

        const data = {
          point_id,
          vendor_id: vendors[0].id
        }

        const res = await this.getData('get_vendor_items', data)

        this.setState({
          vendor_items: res.items,
          vendor_itemsCopy: res.items,
          users: res.users,
        });

      } else {

        if(this.state.type_bill === 'new') {
          this.setState({
            bill_items: [],
          });
        }

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
        });

      }

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

        this.setState({
          vendor_items,
          all_ed_izmer: search && vendor_items.length ? vendor_items[0].pq_item : [],
          pq: search && vendor_items.length ? vendor_items[0].pq_item[0].id : '',
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

  async changeSelect(data, event) {
    const value = event.target.value;

    if(data === 'point') {

      const type_bill = this.state.type_bill;

      if(type_bill === 'new') {
        this.setState({
          bill_items: [],
        });
      }

      const obj = {
        point_id: value
      }

      const res = await this.getData('get_vendors', obj)

      this.setState({
        vendors: res.vendors,
        vendorsCopy: res.vendors,
        search_vendor: '',
        search_item: '',
        vendor_items: [],
        vendor_itemsCopy: [],
        all_ed_izmer: [],
        pq: '',
        count: '',
        fact_unit: '',
        summ: '',
        sum_w_nds: '',
        users: []
      })

    }

    this.setState({
      [data]: value,
    });
  }

  changeInput(type, event) {
    if (type === 'number' || type === 'number_invoice') {
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

  check_nds_bill(value) {
   let nds = [];
   nds[0] = 'без НДС';
   nds[10] = '10 %';
   nds[20] = '20 %';
   nds[18] = '18 %';

   return nds[Number(value)] ? nds[Number(value)] : false;
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

    const nds = this.check_nds_bill((Number(sum_w_nds) - Number(summ)) / (Number(summ) / 100))

    if (!nds) {

      this.setState({
        operAlert: true,
        err_status: false,
        err_text: 'Суммы указаны неверно',
      });

      return;
    }

    vendor_items[0].summ_nds = (Number(sum_w_nds) - Number(summ)).toFixed(2);
    vendor_items[0].nds = nds;
    vendor_items[0].pq = pq;
    vendor_items[0].all_ed_izmer = all_ed_izmer;
    vendor_items[0].count = count;
    vendor_items[0].fact_unit = fact_unit;
    vendor_items[0].price = summ;
    vendor_items[0].price_w_nds = sum_w_nds;

    bill_items.push(vendor_items[0]);

    const allPrice = (bill_items.reduce((all, item) => all + Number(item.price), 0)).toFixed(2);
    const allPrice_w_nds = (bill_items.reduce((all, item) => all + Number(item.price_w_nds), 0)).toFixed(2);

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

    const allPrice = (bill_items.reduce((all, item) => all + Number(item.price), 0)).toFixed(2);
    const allPrice_w_nds = (bill_items.reduce((all, item) => all + Number(item.price_w_nds), 0)).toFixed(2);

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

    if(type === 'price' || type === 'price_w_nds') {

      bill_items = bill_items.map((item, index) => {
        if (item.id === id && key === index) {
          const nds = this.check_nds_bill((Number(item.price_w_nds) - Number(item.price)) / (Number(item.price) / 100))
  
          if (nds) {
            item.nds = nds;
            item.summ_nds = (Number(item.price_w_nds) - Number(item.price)).toFixed(2)
  
          } else {
            item.summ_nds = 0;
            item.nds = '';
          }
        }
        return item;
      });
    }

    if (type === 'price') {
      const allPrice = (bill_items.reduce((all, item) => all + Number(item.price), 0)).toFixed(2);

      this.setState({
        allPrice,
      });
    }

    if (type === 'price_w_nds') {
      const allPrice_w_nds = (bill_items.reduce((all, item) => all + Number(item.price_w_nds), 0)).toFixed(2);

      this.setState({
        allPrice_w_nds,
      });
    }

    this.setState({
      bill_items,
    });
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

  openImageBill (image) {
    this.handleResize();

    this.setState({ 
      modalDialog: true, 
      image
    })
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Billing_Modal
          open={this.state.modalDialog}
          onClose={() => this.setState({ modalDialog: false })}
          fullScreen={this.state.fullScreen}
          image={this.state.image}
        />

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

          {parseInt(this.state.type) === 2 || parseInt(this.state.type) === 3 ? (
            <>
              <Grid item xs={12} sm={4}>
                <MySelect
                  data={this.state.kinds}
                  value={this.state.kind}
                  multiple={false}
                  is_none={false}
                  func={this.changeSelect.bind(this, 'kind')}
                  label="Документ"
                />
              </Grid>
              {parseInt(this.state.type) === 2 ? 
                <Grid item xs={12} sm={4}></Grid>
                : null
              }
            </>
          ) : null}

          {parseInt(this.state.type) === 3 || parseInt(this.state.type) === 4 ? (
            <>
              <Grid item xs={12} sm={4}>
                <MyAutocomplite
                  data={this.state.docs}
                  multiple={false}
                  value={this.state.doc}
                  func={this.changeAutocomplite.bind(this, 'doc')}
                  label="Документ основание"
                />
              </Grid>
                {parseInt(this.state.type) === 4 ? 
                  <Grid item xs={12} sm={4}></Grid>
                  : null
                }
            </>
          ) : null}

          <Grid item xs={12} sm={6}>
            <MyTextInput
              label="Номер документа"
              value={this.state.number}
              func={this.changeInput.bind(this, 'number')}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MyDatePickerNew
              label="Дата документа"
              value={this.state.date}
              func={this.changeDateRange.bind(this, 'date')}
            />
          </Grid>

          {this.state.type_bill === 'new' ? null : (
            <Grid item xs={12} sm={12} display="flex" flexDirection="row" style={{ fontWeight: 'bold' }}>
              {!this.state.imgs.length ? 'Фото отсутствует' :
                <>
                  {this.state.imgs.map((img, key) => (
                    <img 
                      key={key} 
                      src={'https://storage.yandexcloud.net/bill/' + img} 
                      alt="Image bill" 
                      className="img_modal"
                      onClick={this.openImageBill.bind(this, 'https://storage.yandexcloud.net/bill/' + img)}
                    />
                  ))}
                </>
              }
            </Grid>
          )}

          <Grid item xs={12} sm={12}>
            <div
              className="dropzone"
              id="for_img_edit"
              style={{ width: '100%', minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span>Выбери документ для загрузки</span>
            </div>
          </Grid>

          {parseInt(this.state.type) === 2 ? (
            <>
              <Grid item xs={12} sm={6}>
                <MyTextInput
                 label="Номер счет-фактуры"
                 value={this.state.number_invoice}
                 func={this.changeInput.bind(this, 'number_invoice')}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <MyDatePickerNew
                 label="Дата счет-фактуры"
                 value={this.state.date_invoice}
                 func={this.changeDateRange.bind(this, 'date_invoice')}
                />
              </Grid>

              {this.state.type_bill === 'new' ? null : (
                <Grid item xs={12} sm={12} display="flex" flexDirection="row" style={{ fontWeight: 'bold' }}>
                  {!this.state.imgs.length ? 'Фото отсутствует' :
                    <>
                      {this.state.imgs.map((img, key) => (
                        <img 
                          key={key} 
                          src={'https://storage.yandexcloud.net/bill/' + img} 
                          alt="Image bill" 
                          className="img_modal"
                          onClick={this.openImageBill.bind(this, 'https://storage.yandexcloud.net/bill/' + img)}
                        />
                      ))}
                    </>
                  }
                </Grid>
              )}

              <Grid item xs={12} sm={12}>
                <div
                  className="dropzone"
                  id="for_img_edit"
                  style={{ width: '100%', minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <span>Выбери счет-фактуру для загрузки</span>
                </div>
              </Grid>
            </>
          ) : null}

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
            <h2>Товары в документе</h2>
            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)' }} />
          </Grid>

          <Grid item xs={12} style={{ marginBottom: 20 }} sm={12}>
            <TableContainer component={Paper}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                    <TableCell style={{ minWidth: '150px' }}>Товар</TableCell>
                    <TableCell style={{ minWidth: '130px' }}>В упак.</TableCell>
                    <TableCell style={{ minWidth: '130px' }}>Упак</TableCell>
                    <TableCell>Кол-во</TableCell>
                    <TableCell style={{ minWidth: '100px' }}>НДС</TableCell>
                    <TableCell style={{ minWidth: '130px' }}>Сумма без НДС</TableCell>
                    <TableCell>Сумма НДС</TableCell>
                    <TableCell style={{ minWidth: '130px' }}>Сумма с НДС</TableCell>
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
                      <TableCell>{item.nds}</TableCell>
                      <TableCell className="ceil_white">
                        <MyTextInput
                          type="number"
                          label=""
                          value={item.price}
                          func={this.changeDataTable.bind(this, 'price', item.id, key)}
                          onBlur={this.changeDataTable.bind(this, 'price', item.id, key)}
                        />
                      </TableCell>
                      <TableCell style={{ whiteSpace: 'nowrap' }}>{item.summ_nds} ₽</TableCell>
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
              <Grid item xs={12} sm={6} style={{ display: 'flex', marginBottom: 20 }}>
                <Typography style={{ fontWeight: 'bold', color: '#9e9e9e' }}>
                  Причина удаления:&nbsp;
                </Typography>
                <Typography></Typography>
              </Grid>

              <Grid item xs={12} sm={6} style={{ display: 'flex', marginBottom: 20 }}>
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
              Поставщик привезет новый документ
            </Typography>
          </Grid>

          {this.state.type_bill === 'new' ? null : (
            <Billing_Accordion
              bill_list={this.state.bill_list}
              bill_items={this.state.bill_items}
              type='edit'
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
