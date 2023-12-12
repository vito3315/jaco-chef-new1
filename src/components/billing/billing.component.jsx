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

// модалка просмотра фото/картинок документов на страницах Новая / Просмотр / Редактирование накладной
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

      operAlert: false,
      err_status: true,
      err_text: '',
    };
  }

  async componentDidMount() {
    const data = await this.getData('get_all');

    //console.log('res', data)

    this.setState({
      //module_name: data.module_info.name,
      module_name: 'Накладные',
      vendors: data.vendors,
      vendorsCopy: data.vendors,
      points: data.points,
      all_items: data.items,
      //
      billings: main.billings,
      bill_list: main.bill_list,
      status: main.bill_list[0].id,
      types: main.types,
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

  // открытие документа
  getOneDoc(item) {
    const type = this.state.type;
    const typeDoc = parseInt(type) === 1 ? 'bill_ex' : 'bill';

    const url = `/billing/${typeDoc}/${item?.id}/${item?.point_id}`

    window.open(url, '_blank');
    
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

  // получение накладных по указанным фильтрам
  async getBillingList () {

    const { type, point } = this.state;

    if(type && point.length) {

      const { status, number, items, vendors, date_end, date_start } = this.state;
      
      const dateStart = date_start ? dayjs(date_start).format('YYYY-MM-DD') : '';
      const dateEnd = date_end ? dayjs(date_end).format('YYYY-MM-DD') : '';
      const vendor_id = vendors.length === 1 ? vendors[0].id : '';

      const point_id = point.reduce((points, point) => {
        point = { id: point.id };
        points = [...points,...[point]];
        return points
      }, [])

      const items_id = items.reduce((items, it) => {
        it = { id: it.id };
        items = [...items,...[it]];
        return items
      }, [])

      const data = {
        date_start: dateStart,
        date_end: dateEnd,
        items: items_id,
        vendor_id,
        point_id,
        number,
        status,
        type,
      }
  
      console.log('getBillingList', data)

      const res = await this.getData('get_billing_list', data);

      console.log('getBillingList', res)

      this.setState({
        bills: res.res,
      });

    } else {

      this.setState({
        operAlert: true,
        err_status: false,
        err_text: 'Необходимо выбрать Тип / Точку',
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
          isOpen={this.state.operAlert}
          onClose={() => this.setState({ operAlert: false })}
          status={this.state.err_status}
          text={this.state.err_text}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button variant="contained">
              <Link style={{ color: '#fff' }} to="/billing/new">
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
            <Button variant="contained" sx={{ marginBottom: { sm: 0, xs: 1 } }}
              //onClick={this.getItems.bind(this)}
            >
              Проставить бумажный носитель
            </Button>

            <Button variant="contained" onClick={this.getBillingList.bind(this)}>
              Показать
            </Button>
          </Grid>

          <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: { sm: 5, xs: 3 }, flexDirection: { sm: 'row', xs: 'column' }, flexWrap: 'wrap', gap: 2 }}>
            {this.state.billings.map((item, key) => (
              <Button sx={{ width: { sm: '18%', xs: '100%' }, background: item.color, fontWeight: 400, padding: '6px 14px' }} key={key} variant="contained">
                {item.name}{` (${item.count})`}
              </Button>
            ))}
            <Button sx={{ width: { sm: '38.5%', xs: '100%' }, background: 'aqua', fontWeight: 400, padding: '6px 14px' }} variant="contained">
              Данный документ храниться слишком долго
            </Button>
          </Grid>

          <Grid item xs={12} style={{ marginBottom: 20 }} sm={6}>
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

          <Grid item xs={12} style={{ marginBottom: 40 }} sm={12}>
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
                      <TableCell onClick={this.getOneDoc.bind(this, item)} style={{ cursor: 'pointer' }}>
                        {item.date}
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

// Страница Новый документ
class Billing_New_ extends React.Component {
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

      date: null,
      date_items: null,

      operAlert: false,
      err_status: true,
      err_text: '',

      points: [],
      point: '',
      point_name: '',

      users: [],
      user: [],

      vendors: [],
      vendorsCopy: [],

      vendor_items: [],
      vendor_itemsCopy: [],

      kinds: [],
      doc_base_id: '',

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
      bill_items_doc: [],

      allPrice: '',
      allPrice_w_nds: '',

      comment: '',

      bill_list: [],
      vendor: null,
      bill: null,
      imgs_bill: [],
      bill_list: [],

      number_factur: '',
      date_factur: null,
      imgs_factur: [],

      modalDialog: false,
      fullScreen: false,
      image: '',

      is_new_doc: 0,
    };
  }

  async componentDidMount() {
    const data = await this.getData('get_points')

    this.setState({
      module_name: 'Новый документ',
      points: data.points,
      //
      types: edit.sorts,
      kinds: edit.kinds,
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

  // поиск/выбор поставщика/товара поставщика/точки/документа для коррекции/возврата
  async search(type, event, value) {

    const search = event.target.value ? event.target.value : value ? value : '';

    if (type === 'search_vendor') {

      const vendorsCopy = this.state.vendorsCopy;

      const vendors = vendorsCopy.filter((value) => search ? value.name.toLowerCase() === search.toLowerCase() : value);

      if (search && vendors.length) {

        const point = this.state.point;

        const data = {
          point_id: point.id,
          vendor_id: vendors[0].id
        }

        const res = await this.getData('get_vendor_items', data);
        const docs = await this.getData('get_base_doc', data);

        this.setState({
          vendor_items: res.items,
          vendor_itemsCopy: res.items,
          users: res.users,
          docs: docs.billings,
        });

      } else {
      
        this.setState({
          bill_items: [],
          bill_items_doc: [],
          search_item: '',
          vendor_items: [],
          vendor_itemsCopy: [],
          all_ed_izmer: [],
          pq: '',
          count: '',
          fact_unit: '',
          summ: '',
          sum_w_nds: '',
          docs: [],
          doc: '',
        });

      }

      this.setState({
        search_vendor: search,
        vendors,
      });
    }

    if (type === 'search_item') {
      const vendor_itemsCopy = JSON.parse(JSON.stringify(this.state.vendor_itemsCopy))

      if (vendor_itemsCopy.length) {

        let vendor_items = vendor_itemsCopy.filter((value) => search ? value.name.toLowerCase() === search.toLowerCase() : value);

        vendor_items.map((item) => {
          item.pq_item = item.pq_item.map(it => {
            it = { name: `${it.name} ${item.ed_izmer_name}`, id: it.id };
            return it;
          });
          return item;
        });

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

    if(type === 'doc') {

      if(search) {
        
        const docs = this.state.docs;
        const vendor_id = this.state.vendors[0]?.id;
        const point = this.state.point;
        
        const billing_id = docs.find(doc => doc.name === search)?.id;
        
        const obj = {
          billing_id,
          vendor_id,
          point_id: point.id,
        }
        
        const res = await this.getData('get_base_doc_data', obj);
        
        this.setState({
          bill_items: [],
          bill_items_doc: [],
          search_item: '',
          vendor_items: res.items,
          vendor_itemsCopy: res.items,
          users: res.users,
          all_ed_izmer: [],
          pq: '',
          count: '',
          fact_unit: '',
          summ: '',
          sum_w_nds: '',
          bill_items_doc: res.billing_items,
        });
  
      } else {

        const point = this.state.point;
        const vendors = this.state.vendors;
        const docs = this.state.docs;

        if(point && vendors.length === 1 && docs.length) {
          
          const data = {
            point_id: point.id,
            vendor_id: vendors[0]?.id
          }
          
          const res = await this.getData('get_vendor_items', data);
          
          this.setState({
            bill_items: [],
            bill_items_doc: [],
            vendor_items: res.items,
            vendor_itemsCopy: res.items,
            users: res.users,
            search_item: '',
            all_ed_izmer: [],
            pq: '',
            count: '',
            fact_unit: '',
            summ: '',
            sum_w_nds: '',
          });
        }

      }

      this.setState({
        [type]: search,
      });

    }

    if (type === 'point_name') {
      
      const points = this.state.points;
      const point = points.find(item => item.name === search);
      
      this.setState({
        bill_items: [],
        bill_items_doc: [],
        point: point ?? '',
        [type]: point?.name ?? '',
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
        users: [],
        docs: [],
        doc: ''
      });

      if(point) {
    
          const obj = {
            point_id: point.id
          }
    
          const res = await this.getData('get_vendors', obj)
    
          this.setState({
            vendors: res.vendors,
            vendorsCopy: res.vendors,
          })

        } else {
          this.setState({
            vendors: [],
            vendorsCopy: [],
          })
        }
      }
  }

  async changeSelect(data, event) {
    this.handleResize();

    const value = event.target.value;
    
    if(data === 'type' && (parseInt(value) === 1 || parseInt(value) === 2)) {

      const point = this.state.point;
      const vendors = this.state.vendors;

        if(point && vendors.length === 1) {

          const data = {
            point_id: point.id,
            vendor_id: vendors[0]?.id
          }
          
          const res = await this.getData('get_vendor_items', data);
          
          this.setState({
            bill_items: [],
            bill_items_doc: [],
            vendor_items: res.items,
            vendor_itemsCopy: res.items,
            users: res.users,
            search_item: '',
            all_ed_izmer: [],
            pq: '',
            count: '',
            fact_unit: '',
            summ: '',
            sum_w_nds: '',
            doc: '',
          });
        }
    }

    this.setState({
      [data]: value,
    });
  }

  changeInput(type, event) {
    if (type === 'number' || type === 'number_factur') {
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

  async changeAutocomplite(type, event, data) {
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

  check_price_item(price, percent, summ, pq) {

    const res = Number(price) / 100 * Number(percent);

    const price_item = Number(summ) / Number(pq);

    if(price_item >= (Number(price) - res) && price_item <= (Number(price) + res)) {
      return true
    } else {
      return false
    }
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

    const range_price_item = this.check_price_item(vendor_items[0].price, vendor_items[0].vend_percent, summ, pq)

    if(range_price_item) {
      vendor_items[0].color = false;
    } else {
      vendor_items[0].color = true;
    }

    vendor_items[0].summ_nds = (Number(sum_w_nds) - Number(summ)).toFixed(2);
    vendor_items[0].nds = nds;
    vendor_items[0].pq = pq;
    vendor_items[0].all_ed_izmer = all_ed_izmer;
    vendor_items[0].count = count;
    vendor_items[0].fact_unit = (Number(fact_unit)).toFixed(2);
    vendor_items[0].price_item = summ;
    vendor_items[0].price_w_nds = sum_w_nds;

    const bill_items_doc = this.state.bill_items_doc;

    if(bill_items_doc.length) {
      const item = bill_items_doc.find(it => it.item_id === vendor_items[0].id);

      item.fact_unit = (Number(item.count) * Number(item.pq)).toFixed(2);
      item.summ_nds = (Number(item.price_w_nds) - Number(item.price)).toFixed(2);

      const nds = this.check_nds_bill((Number(item.price_w_nds) - Number(item.price)) / (Number(item.price) / 100))

      if(nds) {
        item.nds = nds;
      } else {
        item.nds = '';
      }

      vendor_items[0].data_bill = item;
    }

    bill_items.push(vendor_items[0]);

    const allPrice = (bill_items.reduce((all, item) => all + Number(item.price_item), 0)).toFixed(2);
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

    const allPrice = (bill_items.reduce((all, item) => all + Number(item.price_item), 0)).toFixed(2);
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

        if (type === 'pq') {
          item.fact_unit = (Number(item[type]) * Number(item.count)).toFixed(2);

          const range_price_item = this.check_price_item(item.price, item.vend_percent, item.price_item, item.pq)
  
          if(range_price_item) {
            item.color = false;
          } else {
            item.color = true;
          }

        } 

        if (value && value !== '0' && value[0] !== '0' && type === 'count') {

          item.fact_unit = (Number(item[type]) * Number(item.pq)).toFixed(2);
          const range_price_item = this.check_price_item(item.price, item.vend_percent, item.price_item, item.pq)

          if(range_price_item) {
            item.color = false;
          } else {
            item.color = true;
          }

        } else {

          if (type === 'count') {
            item.fact_unit = 0;
          }
    
          item.color = true;

        }


        if(type === 'price_item' || type === 'price_w_nds') {
          const nds = this.check_nds_bill((Number(item.price_w_nds) - Number(item.price_item)) / (Number(item.price_item) / 100))

          const range_price_item = this.check_price_item(item.price, item.vend_percent, item.price_item, item.pq)
  
          if (nds) {
            item.nds = nds;
            item.summ_nds = (Number(item.price_w_nds) - Number(item.price_item)).toFixed(2)
          } else {
            item.summ_nds = 0;
            item.nds = '';
          }

          if(nds && range_price_item) {
            item.color = false;
          } else {
            item.color = true;
          }
        } 

      }

      return item;
    });

    if (type === 'price_item') {
      const allPrice = (bill_items.reduce((all, item) => all + Number(item.price_item), 0)).toFixed(2);

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

  changeItemChecked(data, event) {
    const value = event.target.checked === true ? 1 : 0;

    this.setState({
      [data]: value,
    });
  }

  async saveNewBill () {
    const {number, point, vendors, date, number_factur, date_factur, type, doc, doc_base_id, date_items, user, comment, is_new_doc, bill_items} = this.state;

    const dateBill = date ? dayjs(date).format('YYYY-MM-DD') : '';
    const dateFactur = date_factur ? dayjs(date_factur).format('YYYY-MM-DD') : '';
    const dateItems = date_items ? dayjs(date_items).format('YYYY-MM-DD') : '';

    const items = bill_items.reduce((newItems, item) => {

      let it = {};

      it.pq = item.pq;
      it.count = item.count;
      it.item_id = item.id;
      it.summ = item.price_item;
      it.summ_w_nds = item.price_w_nds;

      const nds = item.nds.split(' %')[0];

      if(nds === 'без НДС') {
        it.nds = -1
      } else {
        it.nds = nds;
      }

      newItems = [...newItems,...[it]];

      return newItems;
    }, [])

    const data = {
      doc,
      type,
      items,
      number,
      comment,
      is_new_doc,
      users: user,
      doc_base_id,
      number_factur,
      date: dateBill,
      date_items: dateItems,
      date_factur: dateFactur,
      point_id: point?.id ?? '',
      vendor_id: vendors.length === 1 ? vendors[0]?.id : ''
    }

    console.log('saveNewBill data', data);

    //const res = await this.getData('save_new', data);
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
            <h1>{this.state.module_name}</h1>
            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)' }} />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <MyAutocomplite2
              data={this.state.points}
              value={this.state.point_name}
              multiple={false}
              func={this.search.bind(this, 'point_name')}
              onBlur={this.search.bind(this, 'point_name')}
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
                  value={this.state.doc_base_id}
                  multiple={false}
                  is_none={false}
                  func={this.changeSelect.bind(this, 'doc_base_id')}
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
                <MyAutocomplite2
                  data={this.state.docs}
                  multiple={false}
                  value={this.state.doc}
                  func={this.search.bind(this, 'doc')}
                  onBlur={this.search.bind(this, 'doc')}
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

          {parseInt(this.state.type) === 2 && !this.state.fullScreen ? 
            <Grid item xs={12} sm={6}>
              <MyTextInput
                label="Номер счет-фактуры"
                value={this.state.number_factur}
                func={this.changeInput.bind(this, 'number_factur')}
              />
            </Grid>
            : null
          }

          <Grid item xs={12} sm={6}>
            <MyDatePickerNew
              label="Дата документа"
              value={this.state.date}
              func={this.changeDateRange.bind(this, 'date')}
            />
          </Grid>

          {parseInt(this.state.type) === 2 && !this.state.fullScreen ? 
            <Grid item xs={12} sm={6}>
              <MyDatePickerNew
                label="Дата счет-фактуры"
                value={this.state.date_factur}
                func={this.changeDateRange.bind(this, 'date_factur')}
              />
            </Grid>
            : null
          }
          
          <Grid item xs={12} sm={parseInt(this.state.type) === 2 ? 6 : 12}>
            <TableContainer>
              <Grid display="flex" flexDirection="row" style={{ fontWeight: 'bold' }}>
                {!this.state.imgs_bill.length ? null :
                  <>
                    {this.state.imgs_bill.map((img, key) => (
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
            </TableContainer>
          </Grid>

          {parseInt(this.state.type) === 2 && !this.state.fullScreen ? (
            <Grid item xs={12} sm={6} display="flex" flexDirection="row" style={{ fontWeight: 'bold' }}>
              {!this.state.imgs_factur.length ? null :
                <>
                  {this.state.imgs_factur.map((img, key) => (
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
          ) : null}

          <Grid item xs={12} sm={parseInt(this.state.type) === 2 ? 6 : 12}>
            <div
              className="dropzone"
              id="for_img_edit"
              style={{ width: '100%', minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span>Выбери документ для загрузки</span>
            </div>
          </Grid>

          {parseInt(this.state.type) === 2 && !this.state.fullScreen ? (
            <Grid item xs={12} sm={6}>
              <div
                className="dropzone"
                id="for_img_edit"
                style={{ width: '100%', minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <span>Выбери счет-фактуру для загрузки</span>
              </div>
            </Grid>
          ) : null}

          {parseInt(this.state.type) === 2 && this.state.fullScreen ? 
            <>
              <Grid item xs={12}>
                <MyTextInput
                  label="Номер счет-фактуры"
                  value={this.state.number_factur}
                  func={this.changeInput.bind(this, 'number_factur')}
                />
              </Grid>

              <Grid item xs={12}>
                <MyDatePickerNew
                  label="Дата счет-фактуры"
                  value={this.state.date_factur}
                  func={this.changeDateRange.bind(this, 'date_factur')}
                />
              </Grid>

              <Grid item xs={12}>
                <TableContainer>
                  <Grid display="flex" flexDirection="row" style={{ fontWeight: 'bold' }}>
                    {!this.state.imgs_factur.length ? null :
                      <>
                        {this.state.imgs_factur.map((img, key) => (
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
                </TableContainer>
              </Grid>

              <Grid item xs={12}>
                <div
                  className="dropzone"
                  id="for_img_edit"
                  style={{ width: '100%', minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <span>Выбери счет-фактуру для загрузки</span>
                </div>
              </Grid>
            </>
           : null
          }

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
            <MyTextInput label="Кол-вo" disabled={true} value={this.state.fact_unit} className='disabled_input' />
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
                    {!this.state.bill_items_doc.length ? null : <TableCell style={{ minWidth: '130px' }}>Изменения</TableCell>}
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
                    <React.Fragment key={key}>
                       {!item?.data_bill ? null :
                        <TableRow style={{ backgroundColor: item?.color ? 'rgb(255, 204, 0)' : '#fff' }}>
                          <TableCell rowSpan={2}>{item?.name ?? item.item_name}</TableCell>
                          <TableCell>До</TableCell>
                          <TableCell>{item?.data_bill?.pq} {item.ed_izmer_name}</TableCell>
                          <TableCell>{item?.data_bill?.count}</TableCell>
                          <TableCell style={{ whiteSpace: 'nowrap' }}>{item?.data_bill?.fact_unit} {item.ed_izmer_name}</TableCell>
                          <TableCell>{item?.data_bill?.nds}</TableCell>
                          <TableCell>{item?.data_bill?.price} ₽</TableCell>
                          <TableCell style={{ whiteSpace: 'nowrap' }}>{item?.data_bill?.summ_nds} ₽</TableCell>
                          <TableCell>{item?.data_bill?.price_w_nds} ₽</TableCell>
                          <TableCell rowSpan={2}>
                            <Button onClick={this.deleteItem.bind(this, key)} style={{ cursor: 'pointer' }} color="error" variant="contained">
                              <ClearIcon />
                            </Button>
                          </TableCell>
                          <TableCell rowSpan={2}>
                            {Number(item.count) === 0 ? Number(item.count).toFixed(2) : (Number(item.price_w_nds) / Number(item.count)).toFixed(2)}
                          </TableCell>
                        </TableRow>
                        }
                      <TableRow hover style={{ backgroundColor: item?.color ? 'rgb(255, 204, 0)' : '#fff' }}>
                        {item?.data_bill ? null : <TableCell> {item?.name ?? item.item_name} </TableCell>}
                        {!item?.data_bill ? null : <TableCell>После</TableCell>}
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
                            value={item.price_item}
                            func={this.changeDataTable.bind(this, 'price_item', item.id, key)}
                            onBlur={this.changeDataTable.bind(this, 'price_item', item.id, key)}
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
                        {item?.data_bill ? null :
                          <>
                            <TableCell>
                              <Button onClick={this.deleteItem.bind(this, key)} style={{ cursor: 'pointer' }} color="error" variant="contained">
                                <ClearIcon />
                              </Button>
                            </TableCell>
                            <TableCell>
                              {Number(item.count) === 0 ? Number(item.count).toFixed(2) : (Number(item.price_w_nds) / Number(item.count)).toFixed(2)}
                            </TableCell>
                          </>
                        }
                      </TableRow>
                    </React.Fragment>
                  ))}
                  {!this.state.bill_items.length ? null : (
                    <TableRow sx={{ '& td': { fontWeight: 'bold' } }}>
                      <TableCell>Итого:</TableCell>
                      {!this.state.bill_items_doc.length ? null : <TableCell></TableCell>}
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

          {parseInt(this.state.type) === 1 ? null :
            <>
              <Grid item xs={12} sm={6}>
                <MyDatePickerNew
                  label="Дата разгрузки"
                  value={this.state.date_items}
                  func={this.changeDateRange.bind(this, 'date_items')}
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
            </>
          }

          <Grid item xs={12} sm={12}>
            <MyTextInput
              label="Комментарии"
              multiline={true}
              maxRows={3}
              value={this.state.comment}
              func={this.changeItem.bind(this, 'comment')}
            />
          </Grid>

          <Grid item xs={12} sm={12} display="flex" alignItems="center">
            <MyCheckBox
              value={parseInt(this.state.is_new_doc) === 1 ? true : false}
              func={this.changeItemChecked.bind(this, 'is_new_doc')}
              label=""
            />
            <Typography component="span" className="span_text">
              Поставщик привезет новый документ
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Button variant="contained" fullWidth color="success" style={{ height: '100%' }} onClick={this.saveNewBill.bind(this)}>
              Сохранить
            </Button>
          </Grid>
         
        </Grid>
      </>
    );
  }
}

// Страница Редактирование документа
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

      date: null,
      date_items: null,

      operAlert: false,
      err_status: true,
      err_text: '',

      points: [],
      point: '',
      point_name: '',

      users: [],
      user: [],

      vendors: [],
      vendorsCopy: [],

      vendor_items: [],
      vendor_itemsCopy: [],

      kinds: [],
      doc_base_id: '',

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
      bill_items_doc: [],

      allPrice: '',
      allPrice_w_nds: '',

      comment: '',

      bill_list: [],
      vendor: null,
      bill: null,
      imgs_bill: [],
      imgs_factur: [],
      bill_list: [],

      number_factur: '',
      date_factur: null,

      modalDialog: false,
      fullScreen: false,
      image: '',

      is_new_doc: 0,
    };
  }

  async componentDidMount() {
    const url = window.location.pathname.split('/');

    const obj = {
      type: url[2],
      id: url[3],
      point_id: url[4],
    }

    const res = await this.getData('get_one', obj);
    const data = await this.getData('get_points');

    console.log('componentDidMount res', res);

    this.getDataBill(res, data);

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

  // данные для отрисовки документа на странице
  async getDataBill(res, data) {

    this.setState({
      is_load: true,
    });

    const bill_items = res.bill_items.map((item) => {

      item.all_ed_izmer = item.pq_item.split('#').map((it) => {
        it = { name: `${it} ${item.ed_izmer_name}`, id: it };
        return it;
      });

      item.fact_unit = (Number(item.fact_unit)).toFixed(2);
      item.price_item = item.price;

      const nds = this.check_nds_bill((Number(item.price_w_nds) - Number(item.price_item)) / (Number(item.price_item) / 100));

      if (nds) {
        item.nds = nds;
        item.summ_nds = (Number(item.price_w_nds) - Number(item.price_item)).toFixed(2)
      } else {
        item.summ_nds = (0).toFixed(2);
        item.nds = '';
      }

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
      bill_list: res.bill_hist,
      imgs_bill: res.bill_imgs,
      points: data.points,
      allPrice,
      allPrice_w_nds,
      is_load: false,
      bill: res.bill,
      bill_items,
      number: res.bill?.number,
      date: res.bill?.date && res.bill?.date !== "0000-00-00" ? dayjs(res.bill?.date) : null,
      date_items: res.bill?.date_items ? dayjs(res.bill?.date_items) : null,
      comment: res.bill?.comment,
      users: res.users,
      user: res.bill_users,
      //
      types: edit.sorts,
      kinds: edit.kinds,
    });

  }

  // поиск/выбор поставщика/товара поставщика/точки/документа для коррекции/возврата
  async search(type, event, value) {

    const search = event.target.value ? event.target.value : value ? value : '';

    if (type === 'search_vendor') {

      const vendorsCopy = this.state.vendorsCopy;

      const vendors = vendorsCopy.filter((value) => search ? value.name.toLowerCase() === search.toLowerCase() : value);

      if (search && vendors.length) {

        const point = this.state.point;

        const data = {
          point_id: point.id,
          vendor_id: vendors[0].id
        }

        const res = await this.getData('get_vendor_items', data);
        const docs = await this.getData('get_base_doc', data);

        this.setState({
          vendor_items: res.items,
          vendor_itemsCopy: res.items,
          users: res.users,
          docs: docs.billings,
        });

      } else {
        
        this.setState({
          bill_items_doc: [],
          search_item: '',
          vendor_items: [],
          vendor_itemsCopy: [],
          all_ed_izmer: [],
          pq: '',
          count: '',
          fact_unit: '',
          summ: '',
          sum_w_nds: '',
          docs: [],
          doc: '',
        });

      }

      this.setState({
        search_vendor: search,
        vendors,
      });
    }

    if (type === 'search_item') {
      const vendor_itemsCopy = JSON.parse(JSON.stringify(this.state.vendor_itemsCopy))

      if (vendor_itemsCopy.length) {

        let vendor_items = vendor_itemsCopy.filter((value) => search ? value.name.toLowerCase() === search.toLowerCase() : value);

        vendor_items.map((item) => {
          item.pq_item = item.pq_item.map(it => {
            it = { name: `${it.name} ${item.ed_izmer_name}`, id: it.id };
            return it;
          });
          return item;
        });

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

    if(type === 'doc') {

      if(search) {
        
        const docs = this.state.docs;
        const vendor_id = this.state.vendors[0]?.id;
        const point = this.state.point;
        
        const billing_id = docs.find(doc => doc.name === search)?.id;
        
        const obj = {
          billing_id,
          vendor_id,
          point_id: point.id,
        }
        
        const res = await this.getData('get_base_doc_data', obj);
        
        this.setState({
          bill_items_doc: [],
          search_item: '',
          vendor_items: res.items,
          vendor_itemsCopy: res.items,
          users: res.users,
          all_ed_izmer: [],
          pq: '',
          count: '',
          fact_unit: '',
          summ: '',
          sum_w_nds: '',
          bill_items_doc: res.billing_items,
        });
  
      } else {

        const point = this.state.point;
        const vendors = this.state.vendors;
        const docs = this.state.docs;

        if(point && vendors.length === 1 && docs.length) {
          
          const data = {
            point_id: point.id,
            vendor_id: vendors[0]?.id
          }
          
          const res = await this.getData('get_vendor_items', data);
          
          this.setState({
            bill_items_doc: [],
            vendor_items: res.items,
            vendor_itemsCopy: res.items,
            users: res.users,
            search_item: '',
            all_ed_izmer: [],
            pq: '',
            count: '',
            fact_unit: '',
            summ: '',
            sum_w_nds: '',
          });
        }

      }

      this.setState({
        [type]: search,
      });

    }

    if (type === 'point_name') {
      
      const points = this.state.points;
      const point = points.find(item => item.name === search);
      
      this.setState({
        bill_items_doc: [],
        point: point ?? '',
        [type]: point?.name ?? '',
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
        users: [],
        docs: [],
        doc: ''
      });

      if(point) {
    
          const obj = {
            point_id: point.id
          }
    
          const res = await this.getData('get_vendors', obj)
    
          this.setState({
            vendors: res.vendors,
            vendorsCopy: res.vendors,
          })

        } else {
          this.setState({
            vendors: [],
            vendorsCopy: [],
          })
        }
      }
  }

  async changeSelect(data, event) {
    this.handleResize();

    const value = event.target.value;
    
    if(data === 'type' && (parseInt(value) === 1 || parseInt(value) === 2)) {

      const point = this.state.point;
      const vendors = this.state.vendors;

        if(point && vendors.length === 1) {
          
          const data = {
            point_id: point.id,
            vendor_id: vendors[0]?.id
          }
          
          const res = await this.getData('get_vendor_items', data);
          
          this.setState({
            bill_items_doc: [],
            vendor_items: res.items,
            vendor_itemsCopy: res.items,
            users: res.users,
            search_item: '',
            all_ed_izmer: [],
            pq: '',
            count: '',
            fact_unit: '',
            summ: '',
            sum_w_nds: '',
            doc: '',
          });
        }
    }

    this.setState({
      [data]: value,
    });
  }

  changeInput(type, event) {
    if (type === 'number' || type === 'number_factur') {
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

  async changeAutocomplite(type, event, data) {
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

  check_price_item(price, percent, summ, pq) {

    const res = Number(price) / 100 * Number(percent);

    const price_item = Number(summ) / Number(pq);

    if(price_item >= (Number(price) - res) && price_item <= (Number(price) + res)) {
      return true
    } else {
      return false
    }
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

    const range_price_item = this.check_price_item(vendor_items[0].price, vendor_items[0].vend_percent, summ, pq)

    if(range_price_item) {
      vendor_items[0].color = false;
    } else {
      vendor_items[0].color = true;
    }

    vendor_items[0].summ_nds = (Number(sum_w_nds) - Number(summ)).toFixed(2);
    vendor_items[0].nds = nds;
    vendor_items[0].pq = pq;
    vendor_items[0].all_ed_izmer = all_ed_izmer;
    vendor_items[0].count = count;
    vendor_items[0].fact_unit = (Number(fact_unit)).toFixed(2);
    vendor_items[0].price_item = summ;
    vendor_items[0].price_w_nds = sum_w_nds;

    const bill_items_doc = this.state.bill_items_doc;

    if(bill_items_doc.length) {
      const item = bill_items_doc.find(it => it.item_id === vendor_items[0].id);

      item.fact_unit = (Number(item.count) * Number(item.pq)).toFixed(2);
      item.summ_nds = (Number(item.price_w_nds) - Number(item.price)).toFixed(2);

      const nds = this.check_nds_bill((Number(item.price_w_nds) - Number(item.price)) / (Number(item.price) / 100))

      if(nds) {
        item.nds = nds;
      } else {
        item.nds = '';
      }

      vendor_items[0].data_bill = item;
    }

    bill_items.push(vendor_items[0]);

    const allPrice = (bill_items.reduce((all, item) => all + Number(item.price_item), 0)).toFixed(2);
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

    const allPrice = (bill_items.reduce((all, item) => all + Number(item.price_item), 0)).toFixed(2);
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

        if (type === 'pq') {
          item.fact_unit = (Number(item[type]) * Number(item.count)).toFixed(2);

          const range_price_item = this.check_price_item(item.price, item.vend_percent, item.price_item, item.pq)
  
          if(range_price_item) {
            item.color = false;
          } else {
            item.color = true;
          }

        } 

        if (value && value !== '0' && value[0] !== '0' && type === 'count') {

          item.fact_unit = (Number(item[type]) * Number(item.pq)).toFixed(2);
          const range_price_item = this.check_price_item(item.price, item.vend_percent, item.price_item, item.pq)

          if(range_price_item) {
            item.color = false;
          } else {
            item.color = true;
          }

        } else {

          if (type === 'count') {
            item.fact_unit = 0;
          }
    
          item.color = true;

        }

        if(type === 'price_item' || type === 'price_w_nds') {
          const nds = this.check_nds_bill((Number(item.price_w_nds) - Number(item.price_item)) / (Number(item.price_item) / 100))

          const range_price_item = this.check_price_item(item.price, item.vend_percent, item.price_item, item.pq)
  
          if (nds) {
            item.nds = nds;
            item.summ_nds = (Number(item.price_w_nds) - Number(item.price_item)).toFixed(2)
          } else {
            item.summ_nds = (0).toFixed(2);
            item.nds = '';
          }

          if(nds && range_price_item) {
            item.color = false;
          } else {
            item.color = true;
          }
        } 

      }

      return item;
    });

    if (type === 'price_item') {
      const allPrice = (bill_items.reduce((all, item) => all + Number(item.price_item), 0)).toFixed(2);

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

  changeItemChecked(data, event) {
    const value = event.target.checked === true ? 1 : 0;

    this.setState({
      [data]: value,
    });
  }

  async saveNewBill () {
    const {number, point, vendors, date, number_factur, date_factur, type, doc, doc_base_id, date_items, user, comment, is_new_doc, bill_items} = this.state;

    const dateBill = date ? dayjs(date).format('YYYY-MM-DD') : '';
    const dateFactur = date_factur ? dayjs(date_factur).format('YYYY-MM-DD') : '';
    const dateItems = date_items ? dayjs(date_items).format('YYYY-MM-DD') : '';

    const items = bill_items.reduce((newItems, item) => {

      let it = {};

      it.pq = item.pq;
      it.count = item.count;
      it.item_id = item.id;
      it.summ = item.price_item;
      it.summ_w_nds = item.price_w_nds;

      const nds = item.nds.split(' %')[0];

      if(nds === 'без НДС') {
        it.nds = -1
      } else {
        it.nds = nds;
      }

      newItems = [...newItems,...[it]];

      return newItems;
    }, [])

    const data = {
      doc,
      type,
      items,
      number,
      comment,
      is_new_doc,
      users: user,
      doc_base_id,
      number_factur,
      date: dateBill,
      date_items: dateItems,
      date_factur: dateFactur,
      point_id: point?.id ?? '',
      vendor_id: vendors.length === 1 ? vendors[0]?.id : ''
    }

    console.log('saveNewBill data', data);

    //const res = await this.getData('save_new', data);
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
            <h1>Редактирование документа:{' '}{this.state.number}</h1>
            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)' }} />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <MyAutocomplite2
              data={this.state.points}
              value={this.state.point_name}
              multiple={false}
              func={this.search.bind(this, 'point_name')}
              onBlur={this.search.bind(this, 'point_name')}
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
                  value={this.state.doc_base_id}
                  multiple={false}
                  is_none={false}
                  func={this.changeSelect.bind(this, 'doc_base_id')}
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
                <MyAutocomplite2
                  data={this.state.docs}
                  multiple={false}
                  value={this.state.doc}
                  func={this.search.bind(this, 'doc')}
                  onBlur={this.search.bind(this, 'doc')}
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

          {parseInt(this.state.type) === 2 && !this.state.fullScreen ? 
            <Grid item xs={12} sm={6}>
              <MyTextInput
                label="Номер счет-фактуры"
                value={this.state.number_factur}
                func={this.changeInput.bind(this, 'number_factur')}
              />
            </Grid>
            : null
          }

          <Grid item xs={12} sm={6}>
            <MyDatePickerNew
              label="Дата документа"
              value={this.state.date}
              func={this.changeDateRange.bind(this, 'date')}
            />
          </Grid>

          {parseInt(this.state.type) === 2 && !this.state.fullScreen ? 
            <Grid item xs={12} sm={6}>
              <MyDatePickerNew
                label="Дата счет-фактуры"
                value={this.state.date_factur}
                func={this.changeDateRange.bind(this, 'date_factur')}
              />
            </Grid>
            : null
          }

          <Grid item xs={12} sm={parseInt(this.state.type) === 2 ? 6 : 12}>
            <TableContainer>
              <Grid display="flex" flexDirection="row" style={{ fontWeight: 'bold' }}>
                {!this.state.imgs_bill.length ? 'Фото отсутствует' :
                  <>
                    {this.state.imgs_bill.map((img, key) => (
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
            </TableContainer>
          </Grid>

          {parseInt(this.state.type) === 2 && !this.state.fullScreen ? (
            <Grid item xs={12} sm={6} display="flex" flexDirection="row" style={{ fontWeight: 'bold' }}>
              {!this.state.imgs_factur.length ? 'Фото отсутствует' :
                <>
                  {this.state.imgs_factur.map((img, key) => (
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
          ) : null}

          <Grid item xs={12} sm={parseInt(this.state.type) === 2 ? 6 : 12}>
            <div
              className="dropzone"
              id="for_img_edit"
              style={{ width: '100%', minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span>Выбери документ для загрузки</span>
            </div>
          </Grid>

          {parseInt(this.state.type) === 2 && !this.state.fullScreen ? (
            <Grid item xs={12} sm={6}>
              <div
                className="dropzone"
                id="for_img_edit"
                style={{ width: '100%', minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <span>Выбери счет-фактуру для загрузки</span>
              </div>
            </Grid>
          ) : null}

          {parseInt(this.state.type) === 2 && this.state.fullScreen ? 
            <>
              <Grid item xs={12}>
                <MyTextInput
                  label="Номер счет-фактуры"
                  value={this.state.number_factur}
                  func={this.changeInput.bind(this, 'number_factur')}
                />
              </Grid>

              <Grid item xs={12}>
                <MyDatePickerNew
                  label="Дата счет-фактуры"
                  value={this.state.date_factur}
                  func={this.changeDateRange.bind(this, 'date_factur')}
                />
              </Grid>

              <Grid item xs={12}>
                <TableContainer>
                  <Grid display="flex" flexDirection="row" style={{ fontWeight: 'bold' }}>
                    {!this.state.imgs_factur.length ? 'Фото отсутствует' :
                      <>
                        {this.state.imgs_factur.map((img, key) => (
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
                </TableContainer>
              </Grid>

              <Grid item xs={12}>
                <div
                  className="dropzone"
                  id="for_img_edit"
                  style={{ width: '100%', minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <span>Выбери счет-фактуру для загрузки</span>
                </div>
              </Grid>
            </>
           : null
          }

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
            <MyTextInput label="Кол-вo" disabled={true} value={this.state.fact_unit} className='disabled_input' />
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
                    <TableCell style={{ minWidth: '130px' }}>Изменения</TableCell>
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
                    <React.Fragment key={key}>
                       {!item?.data_bill ? null :
                        <TableRow style={{ backgroundColor: item?.color ? 'rgb(255, 204, 0)' : '#fff' }}>
                          <TableCell rowSpan={2}>{item?.name ?? item.item_name}</TableCell>
                          <TableCell>До</TableCell>
                          <TableCell>{item?.data_bill?.pq} {item.ed_izmer_name}</TableCell>
                          <TableCell>{item?.data_bill?.count}</TableCell>
                          <TableCell style={{ whiteSpace: 'nowrap' }}>{item?.data_bill?.fact_unit} {item.ed_izmer_name}</TableCell>
                          <TableCell>{item?.data_bill?.nds}</TableCell>
                          <TableCell>{item?.data_bill?.price} ₽</TableCell>
                          <TableCell style={{ whiteSpace: 'nowrap' }}>{item?.data_bill?.summ_nds} ₽</TableCell>
                          <TableCell>{item?.data_bill?.price_w_nds} ₽</TableCell>
                          <TableCell rowSpan={2}>
                            <Button onClick={this.deleteItem.bind(this, key)} style={{ cursor: 'pointer' }} color="error" variant="contained">
                              <ClearIcon />
                            </Button>
                          </TableCell>
                          <TableCell rowSpan={2}>
                            {Number(item.count) === 0 ? Number(item.count).toFixed(2) : (Number(item.price_w_nds) / Number(item.count)).toFixed(2)}
                          </TableCell>
                        </TableRow>
                        }
                      <TableRow hover style={{ backgroundColor: item?.color ? 'rgb(255, 204, 0)' : '#fff' }}>
                        {item?.data_bill ? null : <TableCell>{item?.name ?? item.item_name}</TableCell>}
                        {item?.data_bill ? null : <TableCell></TableCell>}
                        {!item?.data_bill ? null : <TableCell>После</TableCell>}
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
                            value={item.price_item}
                            func={this.changeDataTable.bind(this, 'price_item', item.id, key)}
                            onBlur={this.changeDataTable.bind(this, 'price_item', item.id, key)}
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
                        {item?.data_bill ? null :
                          <>
                            <TableCell>
                              <Button onClick={this.deleteItem.bind(this, key)} style={{ cursor: 'pointer' }} color="error" variant="contained">
                                <ClearIcon />
                              </Button>
                            </TableCell>
                            <TableCell>
                              {Number(item.count) === 0 ? Number(item.count).toFixed(2) : (Number(item.price_w_nds) / Number(item.count)).toFixed(2)}
                            </TableCell>
                          </>
                        }
                      </TableRow>
                    </React.Fragment>
                  ))}
                  {!this.state.bill_items.length ? null : (
                    <TableRow sx={{ '& td': { fontWeight: 'bold' } }}>
                      <TableCell>Итого:</TableCell>
                      <TableCell></TableCell>
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

          {parseInt(this.state.type) === 1 ? null :
            <>
              <Grid item xs={12} sm={6}>
                <MyDatePickerNew
                  label="Дата разгрузки"
                  value={this.state.date_items}
                  func={this.changeDateRange.bind(this, 'date_items')}
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
            </>
          }

          <Grid item xs={12} sm={12}>
            <MyTextInput
              label="Комментарии"
              multiline={true}
              maxRows={3}
              value={this.state.comment}
              func={this.changeItem.bind(this, 'comment')}
            />
          </Grid>
         
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
          

          <Grid item xs={12} sm={12} display="flex" alignItems="center">
            <MyCheckBox
              value={parseInt(this.state.is_new_doc) === 1 ? true : false}
              func={this.changeItemChecked.bind(this, 'is_new_doc')}
              label=""
            />
            <Typography component="span" className="span_text">
              Поставщик привезет новый документ
            </Typography>
          </Grid>

          <Billing_Accordion
            bill_list={this.state.bill_list}
            bill_items={this.state.bill_items}
            type='edit'
          />

          <Grid item xs={12} sm={4}>
            <Button variant="contained" fullWidth color="success" style={{ height: '100%' }} onClick={this.saveNewBill.bind(this)}>
              Сохранить
            </Button>
          </Grid>
         
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

export function BillingNew() {
  return <Billing_New_ />;
}

export function BillingEdit() {
  return <Billing_Edit_ />;
}
