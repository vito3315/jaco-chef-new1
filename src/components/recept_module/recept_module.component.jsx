import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import {
  MyCheckBox,
  MyTextInput,
  MyAutocomplite,
  MyDatePickerNew,
  MyAlert
} from '../../stores/elements';

const queryString = require('query-string');

class ReceptModule_Modal_Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      searchValue: '',
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

  searchPf(event) {
    this.setState({
      searchValue: event.target.value,
    });
  }

  render() {
    const { rec, allCount, storages, apps, pf_list, all_pf_list, changeItem, changeItemData, changeItemChecked, addIngredientsRecipe, dellIngredientsRecipe } = this.props;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3} mb={2}>
            <Grid item xs={12} sm={6}>
              <MyTextInput
                label="Наименование рецепта"
                value={rec.name}
                func={changeItem.bind(this, 'name')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MyTextInput
                label="Время приготовления 1кг (ММ:СС)"
                value={rec.time_min}
                func={changeItem.bind(this, 'time_min')}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} mb={2}>
            <Grid item xs={12} sm={6}>
              <MyTextInput
                label="Срок хранения"
                value={rec.shelf_life}
                func={changeItem.bind(this, 'shelf_life')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MyAutocomplite
                label="Должность на кухне"
                multiple={false}
                data={apps}
                value={rec.app_id}
                func={changeItemData.bind(this, 'app_id')}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} mb={3}>
            <MyAutocomplite
              label="Места хранения"
              multiple={true}
              data={storages}
              value={rec.storages}
              func={changeItemData.bind(this, 'storages')}
            />
          </Grid>

          <Grid item xs={12}>
            <MyCheckBox
              label="Активность"
              value={parseInt(rec.is_show) == 1 ? true : false}
              func={changeItemChecked.bind(this, 'is_show')}
            />
          </Grid>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Название</TableCell>
                    <TableCell>Кол-во</TableCell>
                    <TableCell colSpan={2}>Ед измер</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {all_pf_list.map((item, key) => (
                    <TableRow key={key}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <MyTextInput
                          type="number"
                          id={'item_for_add_'+item.id}
                          //defaultValue={''}
                          //func={changeQuantity.bind(this)}
                        />
                      </TableCell>
                      <TableCell>{item.ei_name}</TableCell>
                      <TableCell>
                        <AddIcon
                          onClick={addIngredientsRecipe.bind(this, item)}
                          style={{ cursor: 'pointer' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Название</TableCell>
                    <TableCell>Кол-во</TableCell>
                    <TableCell>%</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pf_list.map((item, key) => (
                    <TableRow key={key}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.count} {item.ei_name}</TableCell>
                      <TableCell>{item.percent} %</TableCell>
                      <TableCell>
                        <CloseIcon
                          onClick={dellIngredientsRecipe.bind(this, item)}
                          style={{ cursor: 'pointer' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ '& td': { border: 0 } }}>
                    <TableCell>Всего:</TableCell>
                    <TableCell>{allCount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

class ReceptModule_Modal_New extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,

      quantity: '',

      total: ''
    };

    console.log(this.state.item);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.event) {
      return null;
    }

    if (nextProps.event !== prevState.event) {
      return { item: nextProps.event }; // <- this is setState equivalent
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

  changeQuantity(event) {
    this.setState({
      quantity: event.target.value,
    });
  }

  addIngredientsRecipe(item) {
    const vendor = this.state.item;

    const id = vendor.recipe.find((el) => el.id === item.id);

    if (id || this.state.quantity < 1) {
      return;
    }

    item.quantity = this.state.quantity;

    vendor.recipe.push(item);

    const percent = vendor.recipe.reduce((acc, el) => acc + Number(el.quantity), 0) / 100;

    vendor.recipe.map(el => el.percent = (el.quantity / percent).toFixed(2));

    const total = vendor.recipe.reduce((acc, el) => acc + Number(el.quantity), 0)

    this.setState({
      item: vendor,
      quantity: '',
      total
    });
  }

  deleteIngredientsRecipe(id) {

    const vendor = this.state.item;

    const newVendor = vendor.recipe.filter((el) => el.id !== id);

    vendor.recipe = newVendor;

    const percent = vendor.recipe.reduce((acc, el) => acc + Number(el.quantity), 0) / 100;

    vendor.recipe.map(el => el.percent = (el.quantity / percent).toFixed(2));

    const total = vendor.recipe.reduce((acc, el) => acc + Number(el.quantity), 0)

    this.setState({
      item: newVendor,
      total
    });
  }

  onClose() {
    this.setState({
      item: null,
      quantity: '',
      total: ''
    });
    this.props.onClose();
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        fullWidth={true}
        maxWidth={'lg'}
        onClose={this.onClose.bind(this)}
      >
        <DialogTitle>{this.props.method}</DialogTitle>
        <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
          <ReceptModule_Modal_Container
            method={this.props.method}
            event={this.state.item}
            changeItem={this.changeItem.bind(this)}
            addIngredientsRecipe={this.addIngredientsRecipe.bind(this)}
            changeQuantity={this.changeQuantity.bind(this)}
            deleteIngredientsRecipe={this.deleteIngredientsRecipe.bind(this)}
            total={this.state.total}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.save.bind(
              this,
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

class ReceptModule_Modal_Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,

      ItemTab: '2',

      quantity: '',

      total: ''
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

  changeTab(event, value) {
    this.setState({
      ItemTab: value,
    });
  }

  render() {
    const { isOpen, onClose, changeItem, changeItemData, changeItemChecked, addIngredientsRecipe, dellIngredientsRecipe, rec, storages, apps, pf_list, all_pf_list, allCount } = this.props;

    return (
      <Dialog
        open={isOpen}
        fullWidth={true}
        maxWidth={'lg'}
        onClose={onClose.bind(this)}
      >
        <DialogTitle>Редактирование рецепта</DialogTitle>
        <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TabContext value={this.state.ItemTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={this.changeTab.bind(this)}
                    variant="fullWidth"
                  >
                    <Tab label="Дата обновления" value="1" />
                    <Tab label="Текущая" value="2" />
                    <Tab label="Добавить" value="3" />
                  </TabList>
                </Box>

                <TabPanel value="1">
                  <Grid container spacing={3} mb={2}>
                    <Grid item xs={12} sm={4}>
                      <MyDatePickerNew
                        label="Дата обновления"
                        // value={this.state.date_start}
                        // func={this.changeDateRange.bind(this, 'date_start')}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value="2">
                  <ReceptModule_Modal_Container
                    rec={rec}
                    allCount={allCount}
                    storages={storages}
                    apps={apps}
                    pf_list={pf_list}
                    all_pf_list={all_pf_list}
                    changeItem={changeItem.bind(this)}
                    changeItemData={changeItemData.bind(this)}
                    changeItemChecked={changeItemChecked.bind(this)}
                    addIngredientsRecipe={addIngredientsRecipe.bind(this)}
                    dellIngredientsRecipe={dellIngredientsRecipe.bind(this)}
                  />
                </TabPanel>

                <TabPanel value="3">
                  <Grid container spacing={3} mb={2}>
                    <Grid item xs={12} sm={4}>
                      <MyDatePickerNew
                        label="Дата обновления"
                        // value={this.state.date_start}
                        // func={this.changeDateRange.bind(this, 'date_start')}
                      />
                    </Grid>
                  </Grid>
                  
                </TabPanel>
              </TabContext>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.save.bind(
              this,
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

class ReceptModule_Table extends React.Component {
  shouldComponentUpdate(nextProps) {
    // console.log(nextProps.recipes);
    // console.log(this.props.recipes);

    // var array1 = nextProps.recipes;
    // var array2 = this.props.recipes;

    // var is_same = (array1.length == array2.length) && array1.every(function(element, index) {
    //   return element === array2[index];
    // });

    //console.log(is_same)

    // return is_same;
    return true;
  }

  render() {
    const { recipes, openModalEdit } = this.props;

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '2%' }}>#</TableCell>
            <TableCell style={{ width: '2%' }}></TableCell>
            <TableCell style={{ width: '3%' }}>Ревизия</TableCell>
            <TableCell style={{ width: '30%' }}>Название</TableCell>
            <TableCell style={{ width: '65%' }}>Место хранения</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {recipes.map((item, key) => (
            <TableRow key={key}>
              <TableCell>{key+1}</TableCell>
              <TableCell>
                {parseInt(item.is_show) == 1 ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </TableCell>
              <TableCell>
                <MyCheckBox
                  label=""
                  value={parseInt(item.show_in_rev) == 1 ? true : false}
                  //func={ this.props.changeTableItem.bind(this, it.id, this.props.type[0]) }
                />
              </TableCell>
              <TableCell
                style={{ cursor: 'pointer' }}
                onClick={openModalEdit.bind(this, item.id)}
              >
                {item.name}
              </TableCell>
              <TableCell>{item.storage_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

class ReceptModule_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'recept_module',
      module_name: '',
      is_load: false,

      rec: null,
      storages: [],
      apps: [],
      pf_list: [],
      all_pf_list: [],
      allCount: 0,

      modalDialogNew: false,
      modalDialogEdit: false,
      method: null,

      items: [],

      operAlert: false,
      err_status: false,
      err_text: '',

      type: ''
    };
  }

  async componentDidMount() {
    let res = await this.getData('get_all');

    this.setState({
      module_name: res.module_info.name,
      items: res.items
    });

    document.title = res.module_info.name;
  }

  async getItems(){
    let res = await this.getData('get_all');

    this.setState({
      items: res.items
    });
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

  openModalRecipes(method, id) {
    // const item = this.state.item.find(el => el.id === id)

    if (method === 'new') {
      // let res = await this.getData('get_all_for_new');

      // console.log(res)

      this.setState({
        modalDialogNew: true,
        method,
        // item:
      });
    } else {
      

      this.setState({
        modalDialogEdit: true,
        method,
      });
    }
  }

  async openModalNew(id){
    let data = {
      id: id
    };
  
    let res = await this.getData('get_one', data);

    console.log( res )

    let allCount = 0;

    res.pf_list.map( ( it ) => { 
      allCount += parseFloat(it.count) 
    } )

    this.setState({
      modalDialogEdit: true,
      rec: res.rec,
      apps: res.apps,
      pf_list: res.pf_list,
      all_pf_list: res.all_pf_list,
      storages: res.all_storages,
      allCount: allCount,
      type: 'edit'
    });
  }

  async openModalEdit(id){
    let data = {
      id: id
    };
  
    let res = await this.getData('get_one', data);

    console.log( res )

    let allCount = 0;

    res.pf_list.map( ( it ) => { 
      allCount += parseFloat(it.count) 
    } )

    this.setState({
      modalDialogEdit: true,
      rec: res.rec,
      apps: res.apps,
      pf_list: res.pf_list,
      all_pf_list: res.all_pf_list,
      storages: res.all_storages,
      allCount: allCount,
      type: 'edit'
    });
  }

  async saveNewItem(newItem, recipe) {
    // console.log(newItem)

    // console.log(recipe)

    // await this.getData('save_new_item', data);

    this.setState({
      modalDialogNew: false,
      // item
    });
  }

  async saveEditItem() {
    let data = {
      rec: this.state.rec,
      pf_list: this.state.pf_list
    };
  
    let res = await this.getData('save_edit', data);

    if (res['st'] == true) {
      this.setState({
        modalDialogEdit: false,

        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      });

      setTimeout(() => {
        this.getItems();
      }, 300);
    } else {
      this.setState({
        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      })
    }
  }

  changeItem(type, event){
    let rec = this.state.rec;
    rec[ type ] = event.target.value;

    this.setState({
      rec: rec
    })
  }

  changeItemData(type, event, data) {
    let rec = this.state.rec;
    rec[type] = data;

    this.setState({
      rec: rec,
    });
  }

  changeItemChecked(data, event) {
    let rec = this.state.rec;
    rec[data] = event.target.checked === true ? 1 : 0;

    this.setState({
      rec: rec,
    });
  }

  addIngredientsRecipe(item){
    let pf_list = [...this.state.pf_list];

    let check = pf_list.find((el) => el.id === item.id);

    let quantity = document.getElementById('item_for_add_'+item.id).value

    if( check || quantity < 1) {
      return;
    }

    pf_list.push({
      count: quantity,
      ei_name: item.ei_name,
      item_id: item.id,
      name: item.name,
      percent: 0,
      recipies_id: this.state.rec.id
    })

    let allCount = 0;

    pf_list.map( ( it ) => { 
      allCount += parseFloat(it.count) 
    } )

    pf_list.map(el => el.percent = ( 100 / ( allCount / parseFloat(el.count) ) ).toFixed(2));

    this.setState({
      pf_list: pf_list,
      allCount: allCount
    });
  }

  dellIngredientsRecipe(item){
    let pf_list = [...this.state.pf_list];

    pf_list = pf_list.filter((el) => el.id !== item.id);

    let allCount = 0;

    pf_list.map( ( it ) => { 
      allCount += parseFloat(it.count) 
    } )

    pf_list.map(el => el.percent = ( 100 / ( allCount / parseFloat(el.count) ) ).toFixed(2));

    this.setState({
      pf_list: pf_list,
      allCount: allCount
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
          onClose={() => { this.setState({ operAlert: false }); }} 
          status={this.state.err_status} 
          text={this.state.err_text} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={3} mb={3}>
            <Button
              onClick={this.openModalRecipes.bind(this, 'Новый рецепт')}
              variant="contained"
            >
              Добавить рецепт
            </Button>
          </Grid>
        </Grid>

        <ReceptModule_Modal_New
          open={this.state.modalDialogNew}
          onClose={() => {
            this.setState({ modalDialogNew: false });
          }}
          method={this.state.method}
          event={this.state.itemNew}
          save={this.saveNewItem.bind(this)}
        />

        <ReceptModule_Modal_Edit
          isOpen={this.state.modalDialogEdit}
          onClose={() => {
            this.setState({ modalDialogEdit: false });
          }}
          changeItem={this.changeItem.bind(this)}
          changeItemData={this.changeItemData.bind(this)}
          changeItemChecked={this.changeItemChecked.bind(this)}
          addIngredientsRecipe={this.addIngredientsRecipe.bind(this)}
          dellIngredientsRecipe={this.dellIngredientsRecipe.bind(this)}
          rec={this.state.rec}
          allCount={this.state.allCount}
          storages={this.state.storages}
          apps={this.state.apps}
          pf_list={this.state.pf_list}
          all_pf_list={this.state.all_pf_list}
          save={this.saveEditItem.bind(this)}
        />

        <Grid item xs={12}>
          <ReceptModule_Table
            recipes={this.state.items}
            isOpen={this.state.modalDialogEdit}
            onClose={ () => { this.setState({ modalDialogEdit: false }) } }
            openModalEdit={this.openModalEdit.bind(this)}
          />
        </Grid>
      </>
    );
  }
}

export function ReceptModule() {
  return <ReceptModule_ />;
}
