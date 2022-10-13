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

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import {
  MySelect,
  MyCheckBox,
  MyAutocomplite,
  MyTextInput,
} from '../../stores/elements';

const queryString = require('query-string');

class SkladItemsModule_Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
      itemEdit: null,

    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps)
    if(!nextProps.event) {
      return null;
    }

    if (nextProps.event !== prevState.event) {
      return ({ itemEdit: nextProps.event }) // <- this is setState equivalent
    }
    return null
  }

  changeItem(data, event){

    let vendor = this.state.itemEdit;
    vendor.item[data] = event.target.value;
    
    this.setState({ 
      itemEdit: vendor
    })
   
  }

  changeItemChecked(data, event){

    let vendor = this.state.itemEdit;
    vendor.item[data] = (event.target.checked === true ? 1 : 0);
    
    this.setState({ 
      itemEdit: vendor
    })
   
  }

  onClose() {
    this.setState({
      itemEdit: this.props.event ? this.props.event : null,
    });
    this.props.onClose();
  }

  render() {
    return (
      <Dialog
      open={this.props.open}
      fullWidth={true}
      maxWidth={'md'}
      onClose={this.onClose.bind(this)}
    >
      <DialogTitle>
        {this.props.method}
        {' '}
        {this.props.itemName ? this.props.itemName : ''}
      </DialogTitle>
      <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
        
        <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <MyTextInput 
                    label="Название товара" 
                    value={ this.state.itemEdit ? this.state.itemEdit.item.name : ''} 
                    func={ this.changeItem.bind(this, 'name') } />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MyAutocomplite label='Заготовка' 
                    multiple={false} 
                    data={this.state.itemEdit ? this.state.itemEdit.pf_list : []}
                    value={this.state.itemEdit ? (this.state.itemEdit.item.pf_id == '0' ? null : this.state.itemEdit.item.pf_id) : ''} 
                    func={ (event, value) => { 
                      let this_storages = this.state.itemEdit; 
                      this_storages.item.pf_id = value;
                      this.setState({ itemEdit: this_storages }) } } 
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MyTextInput label="Название товара для поставщика" 
                    value={ this.state.itemEdit ? this.state.itemEdit.item.name_for_vendor : ''} 
                    func={ this.changeItem.bind(this, 'name_for_vendor') } />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MyTextInput label="Код для 1с" 
                    value={ this.state.itemEdit ? this.state.itemEdit.item.art : ''} 
                    func={ this.changeItem.bind(this, 'art') } />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MyTextInput label="Максимальное количество заказов в месяц (0 - без ограничений)" 
                    value={ this.state.itemEdit ? this.state.itemEdit.item.max_count_in_m : ''}
                    func={ this.changeItem.bind(this, 'max_count_in_m') } />
                  </Grid>
                  <Grid item xs={12} sm={6}>

                  <MyAutocomplite label='Категория' 
                    multiple={false} 
                    data={this.state.itemEdit ? this.state.itemEdit.cats : []}
                    value={this.state.itemEdit ? (this.state.itemEdit.item.cat_id === '0' ? '' : this.state.itemEdit.item.cat_id) : ''} 
                    func={ (event, value) => { 
                      let this_storages = this.state.itemEdit; 
                      this_storages.item.cat_id = value;
                      this.setState({ itemEdit: this_storages }) } } 
                  />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={4}>
                <MyTextInput 
                label="Количество в упаковке" 
                value={ this.state.itemEdit ? this.state.itemEdit.item.pq : ''} 
                func={ this.changeItem.bind(this, 'pq') } />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MySelect 
                data={this.state.itemEdit ? this.state.itemEdit.ed_izmer : []} 
                value={this.state.itemEdit ? (this.state.itemEdit.item.ed_izmer_id === '0' ? '' : this.state.itemEdit.item.ed_izmer_id) : '' } 
                func={ this.changeItem.bind(this, 'ed_izmer_id') } label='Ед измер' />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MySelect 
                data={this.state.itemEdit ? this.state.itemEdit.apps : []} 
                value={this.state.itemEdit ? (this.state.itemEdit.item.app_id === '0' ? '' : this.state.itemEdit.item.app_id) : ''} 
                func={ this.changeItem.bind(this, 'app_id') } 
                label='Должность на кухне' />
              </Grid>

              <Grid item xs={12} sm={4}>
                <MyTextInput 
                label="Время приготовления ММ:SS (15:20)" 
                value={ this.state.itemEdit ? this.state.itemEdit.item.time_min : ''} 
                func={ this.changeItem.bind(this, 'time_min') } />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MyTextInput 
                label="Дополнительное время ММ:SS (15:20)" 
                value={ this.state.itemEdit ? this.state.itemEdit.item.time_dop_min : ''} 
                func={ this.changeItem.bind(this, 'time_dop_min') } />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MyTextInput 
                label="Время разгрузки ММ:SS.iiii (00:20.004)" 
                value={ this.state.itemEdit ? this.state.itemEdit.item.time_min_other : ''} 
                func={ this.changeItem.bind(this, 'time_min_other') } />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <MyTextInput 
                label="% потерь" 
                value={ this.state.itemEdit ? this.state.itemEdit.item.los_percent : '' } 
                func={ this.changeItem.bind(this, 'los_percent') } />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MyTextInput 
                label="% заявки" 
                value={ this.state.itemEdit ? this.state.itemEdit.item.percent : ''} 
                func={ this.changeItem.bind(this, 'percent') } />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MyTextInput 
                label="% повышения ценника" 
                value={ this.state.itemEdit ? this.state.itemEdit.item.vend_percent : ''} 
                func={ this.changeItem.bind(this, 'vend_percent') } />
              </Grid>

              <Grid item xs={12} sm={3}>
                <MyCheckBox 
                label="Вес заготовки" 
                value={ this.state.itemEdit ? (parseInt(this.state.itemEdit.item.w_pf) == 1 ? true : false) : false } 
                func={ this.changeItemChecked.bind(this, 'w_pf') } />
              </Grid>
              <Grid item xs={12} sm={3}>
                <MyCheckBox 
                label="Вес отхода" 
                value={ this.state.itemEdit ? (parseInt(this.state.itemEdit.item.w_trash) == 1 ? true : false) : false } 
                func={ this.changeItemChecked.bind(this, 'w_trash') } />
              </Grid>
              <Grid item xs={12} sm={3}>
                <MyCheckBox 
                label="Вес товара" 
                value={ this.state.itemEdit ? (parseInt(this.state.itemEdit.item.w_item) == 1 ? true : false) : false } 
                func={ this.changeItemChecked.bind(this, 'w_item') } />
              </Grid>
              <Grid item xs={12} sm={3}>
                <MyCheckBox 
                label="Два сотрудника" 
                value={ this.state.itemEdit ? (parseInt(this.state.itemEdit.item.two_user) == 1 ? true : false) : false }
                func={ this.changeItemChecked.bind(this, 'two_user') } />
              </Grid>
              
              <Grid item xs={12}>
                <MyAutocomplite 
                label='Места хранения' 
                multiple={true} 
                data={ this.state.itemEdit ? this.state.itemEdit.storages : []} 
                value={this.state.itemEdit ? this.state.itemEdit.this_storages : ''} 
                func={ (event, value) => { let this_storages = this.state.itemEdit; this_storages.this_storages = value; this.setState({ itemEdit: this_storages }) } } />
              </Grid>

              {this.props.method === 'Редактирование товара' ? <Grid item xs={12}>
                    <MyCheckBox label="Активность" value={ parseInt(this.state.itemEdit.item.is_show) == 1 ? true : false } func={ this.changeItemChecked.bind(this, 'is_show') } />
                  </Grid>
                  : null
              }

        </Grid>
          
      </DialogContent>
      <DialogActions>
        <Button onClick={
          this.props.method === 'Редактирование товара' ? 
          this.props.checkArt.bind(this, this.state.itemEdit) : 
          this.props.checkArtNew.bind(this, this.state.itemEdit)} 
          color="primary">Сохранить</Button>
      </DialogActions>
    </Dialog>
    );
  }
}

class SkladItemsModule_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'sklad_items_module',
      module_name: '',
      is_load: false,

      cats: [],
      allItems: [],
      vendor_items: [],

      modalDialog: false,
      method: null,
      itemEdit: null,
      itemName: '',

      checkArtDialog: false,
      checkArtList: [],

      freeItems: [],

      searchItem: '',

      show_in_rev: ''
    };
  }

  async componentDidMount() {
    let data = await this.getData('get_all');

    console.log(data)

    this.setState({
      module_name: data.module_info.name,
      cats: data.cats,
      freeItems: data.items_free,
    });

    document.title = data.module_info.name;
  }

  getData = (method, data = {}, is_load = true) => {
    if (is_load == true) {
      this.setState({
        is_load: true,
      });
    }

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
        setTimeout(() => {
          this.setState({
            is_load: false,
          });
        }, 300);
        console.log(err);
      });
  };

  async changeCity(event) {
    let data = {
      city: event.target.value,
    };

    let res = await this.getData('get_vendors', data);

    this.setState({
      vendors: res,
      city: event.target.value,
    });
  }

  changeSort(data, event) {
    this.state.vendor_items.map((item, key) => {
      if (parseInt(item.item_id) == parseInt(data)) {
        this.state.vendor_items[key]['sort'] = event.target.value;
      }
    });

    this.setState({
      vendor_items: this.state.vendor_items,
    });
  }

  async showEditItem(id, method) {

    let data = {
      item_id: id,
    };

    let res = await this.getData('get_one', data);
    res.item.pf_id = res.pf_list.find((item) => item.id === res.item.pf_id);
    res.item.cat_id = res.cats.find((item) => item.id === res.item.cat_id);

    this.setState({
      modalDialog: true,
      method,
      itemEdit: res,
      itemName: res.item.name,
    });
  }

  async saveEditItem(itemEdit, main_item_id = 0) {
    let pf_id = itemEdit.item.pf_id.id;
    let cat_id = itemEdit.item.cat_id.id;

    itemEdit.item.pf_id = pf_id;
    itemEdit.item.cat_id = cat_id;

    let data = {
      id: itemEdit.item.id,
      item: itemEdit.item,
      storages: itemEdit.this_storages,
      main_item_id:
        parseInt(main_item_id) == 0 ? itemEdit.item.id : parseInt(main_item_id),
    };

    let res = await this.getData('saveEditItem', data);

    if (res.st === false) {
      alert(res.text);
    } else {
      this.setState({
        modalDialog: false,
        itemEdit: null,
        checkArtDialog: false,
        checkArtList: [],
      });

      setTimeout(async () => {
        this.search();
      }, 300);
    }
  }

  async saveNewItem(itemEdit, main_item_id = 0) {
    let pf_id = itemEdit.item.pf_id.id;
    let cat_id = itemEdit.item.cat_id.id;

    itemEdit.item.pf_id = pf_id;
    itemEdit.item.cat_id = cat_id;

    let data = {
      id: itemEdit.item.id,
      item: itemEdit.item,
      storages: itemEdit.this_storages,
      main_item_id:
        parseInt(main_item_id) == 0 ? itemEdit.item.id : parseInt(main_item_id),
    };

    let res = await this.getData('saveNewItem', data);

    if (res.st === false) {
      alert(res.text);
    } else {
      this.setState({
        modalDialog: false,
        itemEdit: null,
        checkArtDialog: false,
        checkArtList: [],
      });

      setTimeout(async () => {
        this.search();
      }, 300);
    }
  }

  async checkArt(itemEdit) {
    let data = {
      id: itemEdit.item.id,
      art: itemEdit.item.art,
    };

    let res = await this.getData('checkArt', data);

    if (res.st === false) {
      this.setState({
        checkArtDialog: true,
        checkArtList: res.data,
        itemEdit: itemEdit,
      });
    } else {
      this.saveEditItem(itemEdit);
    }
  }

  async checkArtNew(itemEdit) {
    let data = {
      id: itemEdit.item.id,
      art: itemEdit.item.art,
    };

    let res = await this.getData('checkArt', data);

    if (res.st === false) {
      res.data.push({ id: -1, name: this.state.itemEdit.item.name });

      this.setState({
        checkArtDialog: true,
        checkArtList: res.data,
      });
    } else {
      this.saveNewItem(itemEdit);
    }
  }

  chooseArt(item_id) {
    if (this.state.modalItemNew === true) {
      this.saveNewItem(item_id);
    } else {
      this.saveEditItem(this.state.itemEdit, item_id);
    }
  }

  async openModalItemNew(method) {
    let res = await this.getData('get_all_for_new');

    this.setState({
      modalDialog: true,
      itemEdit: res,
      itemName: '',
      method,
    });
  }

  async saveItem(item_id, type, value) {
    let data = {
      item_id: item_id,
      type: type,
      value: value,
    };

    let res = await this.getData('saveItem', data, false);

    if (res.st === false) {
      alert(res.text);
    } else {
      this.setState({
        modalItemNew: false,
        modalItemEdit: false,
        itemEdit: null,
        checkArtDialog: false,
        checkArtList: [],
      });

      res = await this.getData('get_all');

      this.setState({
        cats: res.cats,
        freeItems: res.items_free,
      });
      // setTimeout( async () => {
      // }, 300 )
    }
  }

  changeTableItem(item_id, type, event) {

    if (parseInt(type) == 1) {
      let data = event.target.checked;

      let items = this.state.cats;

      items.forEach(item => {
        item.cats.forEach(cat => {
          cat.items.forEach(it => {
            if (parseInt(it.id) == parseInt(item_id)) {
              it['show_in_rev'] = data == true ? 1 : 0;
            }
          });
        });
      });

      this.setState({
        cats: items,
      });

      this.saveItem(item_id, 'show_in_rev', data == true ? 1 : 0);
    }

    if (parseInt(type) == 3) {
      let data = event.target.value;

      let items = this.state.cats;

      items.forEach((item, key) => {
        item.cats.forEach((cat, key_cat) => {
          cat.items.forEach((it, k) => {
            if (parseInt(it.id) == parseInt(item_id)) {
              it['handle_price'] = data;
            }
          });
        });
      });

      this.setState({
        cats: items,
      });

      this.saveItem(item_id, 'handle_price', data);
      // if( is_save === true ){
      // }
    }

    if (parseInt(type) == 2) {
      let data = event.target.value;

      let items = this.state.freeItems;

      items.map((item, key) => {
        if (parseInt(item.id) == parseInt(item_id)) {
          items[key]['show_in_rev'] = data == true ? 1 : 0;
        }
      });

      this.setState({
        freeItems: items,
      });

      this.saveItem(item_id, 'show_in_rev', data == true ? 1 : 0);
    }

    if (parseInt(type) == 4) {
      let data = event.target.value;

      let items = this.state.freeItems;

      items.map((item, key) => {
        if (parseInt(item.id) == parseInt(item_id)) {
          items[key]['handle_price'] = data;
        }
      });

      this.setState({
        freeItems: items,
      });

      this.saveItem(item_id, 'handle_price', data);
    }
  }

  async search() {
    let data = {
      item: this.state.searchItem,
    };

    let res = await this.getData('get_all_search', data);

    this.setState({
      cats: res.cats,
      freeItems: res.items_free,
    });
  }

  render() {
    console.log('render')
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Dialog
          onClose={() => {
            this.setState({ checkArtDialog: false, checkArtList: [] });
          }}
          open={this.state.checkArtDialog}
        >
          <DialogTitle>Такой код 1с уже задан у следующих позиций:</DialogTitle>
          <List sx={{ pt: 0 }}>
            {this.state.checkArtList.map((item, key) => (
              <ListItem button onClick={this.chooseArt.bind(this, item.id)} key={key}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Dialog>

        <SkladItemsModule_Modal
          open={this.state.modalDialog}
          onClose={() => {
            this.setState({ modalDialog: false });
          }}
          checkArtNew={this.checkArtNew.bind(this)}
          checkArt={this.checkArt.bind(this)}
          method={this.state.method}
          event={this.state.itemEdit}
          itemName={this.state.itemName}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Button onClick={this.openModalItemNew.bind(this, 'Новый товар')} variant="contained">
              Добавить товар
            </Button>
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyTextInput
              label="Поиск"
              value={this.state.searchItem}
              func={(event) => {
                this.setState({ searchItem: event.target.value });
              }}
              onBlur={this.search.bind(this)}
            />
          </Grid>

          <Grid item xs={12} style={{ paddingBottom: '10px' }}>
            {this.state.cats.map((item, key) => (
              <Accordion key={key}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{item.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {item.cats.map((category, key_cat) => (
                    <Accordion key={key_cat}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{category.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails style={{ width: '100%', overflow: 'scroll' }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell style={{ width: '2%' }}>id</TableCell>
                              <TableCell style={{ width: '2%' }}></TableCell>
                              <TableCell style={{ width: '3%' }}>Ревизия</TableCell>
                              <TableCell style={{ width: '15%' }}>Товар</TableCell>
                              <TableCell style={{ width: '10%' }}> % потерь</TableCell>
                              <TableCell style={{ width: '10%' }}>  % заявки</TableCell>
                              <TableCell style={{ width: '15%' }}>     Заготовка</TableCell>
                              <TableCell style={{ width: '5%' }}> Ед. измер</TableCell>
                              <TableCell style={{ width: '9%' }}>Место хранения</TableCell>
                              <TableCell style={{ width: '9%', minWidth: 150 }}>Моя цена</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {category.items.map((it, k) => (
                              <TableRow key={k}>
                                <TableCell>{it.id}</TableCell>
                                <TableCell>{parseInt(it.is_show) == 1 ? ( <VisibilityIcon /> ) : ( <VisibilityOffIcon />)}
                                </TableCell>
                                <TableCell>
                                  <MyCheckBox
                                    label=""
                                    value={parseInt(it.show_in_rev) == 1 ? true : false }
                                    func={this.changeTableItem.bind( this, it.id, 1)}
                                  />
                                </TableCell>
                                <TableCell
                                  style={{ cursor: 'pointer' }}
                                  onClick={this.showEditItem.bind(this, it.id, 'Редактирование товара')}
                                >
                                  {it.name}
                                </TableCell>
                                <TableCell>{it.los_percent} %</TableCell>
                                <TableCell>{it.percent} %</TableCell>
                                <TableCell>{it.pf_name}</TableCell>
                                <TableCell>{it.ei_name}</TableCell>
                                <TableCell>{it.storage_name}</TableCell>
                                <TableCell>
                                  <MyTextInput
                                    label=""
                                    value={it.handle_price}
                                    func={this.changeTableItem.bind(this, it.id, 3)}
                                    onBlur={ this.changeTableItem.bind(this, it.id, 3) }
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
            {this.state.freeItems.length == 0 ? null : (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Без категории</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ width: '100%', overflow: 'scroll' }}>
                  <AccordionDetails
                    style={{ width: '100%', overflow: 'scroll' }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ width: '2%' }}>id</TableCell>
                          <TableCell style={{ width: '2%' }}></TableCell>
                          <TableCell style={{ width: '3%' }}>Ревизия</TableCell>
                          <TableCell style={{ width: '15%' }}>Товар</TableCell>
                          <TableCell style={{ width: '10%' }}>% потерь</TableCell>
                          <TableCell style={{ width: '10%' }}>% заявки</TableCell>
                          <TableCell style={{ width: '15%' }}>Заготовка</TableCell>
                          <TableCell style={{ width: '5%' }}>Ед. измер</TableCell>
                          <TableCell style={{ width: '9%' }}>Место хранения</TableCell>
                          <TableCell style={{ width: '9%', minWidth: 150 }}>Моя цена</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {this.state.freeItems.map((cat, key) => (
                          <TableRow key={key}>
                            <TableCell>{cat.id}</TableCell>
                            <TableCell>{parseInt(cat.is_show) == 1 ? (<VisibilityIcon />) : (<VisibilityOffIcon />)}</TableCell>
                            <TableCell>
                              <MyCheckBox
                                label=""
                                value={ parseInt(cat.show_in_rev) == 1 ? true : false}
                                func={this.changeTableItem.bind(this, cat.id, 2)}
                              />
                            </TableCell>
                            <TableCell style={{ cursor: 'pointer' }} onClick={this.showEditItem.bind(this, cat.id, 'Редактирование товара')}>{cat.name}</TableCell>
                            <TableCell>{cat.los_percent} %</TableCell>
                            <TableCell>{cat.percent} %</TableCell>
                            <TableCell>{cat.pf_name}</TableCell>
                            <TableCell>{cat.ei_name}</TableCell>
                            <TableCell>{cat.storage_name}</TableCell>
                            <TableCell>
                              <MyTextInput label="" value={cat.handle_price} func={this.changeTableItem.bind(this, cat.id, 4)}
                                onBlur={ this.changeTableItem.bind(this, cat.id, 4) }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionDetails>
                </AccordionDetails>
              </Accordion>
            )}
          </Grid>
        </Grid>
      </>
    );
  }
}

export function SkladItemsModule() {
  return <SkladItemsModule_ />;
}
