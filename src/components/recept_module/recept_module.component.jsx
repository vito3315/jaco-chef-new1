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
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3} mb={2}>
            <Grid item xs={12} sm={6}>
              <MyTextInput
                label="Наименование рецепта"
                value={this.state.item.name}
                func={this.props.changeItem.bind(this, 'name')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MyTextInput
                label="Время приготовления 1кг (ММ:СС)"
                value={this.state.item.time_stagе}
                func={this.props.changeItem.bind(this, 'time_stagе')}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} mb={2}>
            <Grid item xs={12} sm={6}>
              <MyTextInput
                label="Срок хранения"
                value={this.state.item.term}
                func={this.props.changeItem.bind(this, 'term')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MyAutocomplite
                label="Должность на кухне"
                multiple={false}
                data={this.state.item.post}
                value={this.state.item.post.id}
                func={(event, value) => {
                  let this_storages = this.state.item;
                  this_storages.post.id = value;
                  this.setState({ item: this_storages });
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} mb={3}>
            <MyAutocomplite
              label="Места хранения"
              multiple={true}
              data={this.state.item.location}
              value={this.state.item.location.id}
              func={(event, value) => {
                let this_storages = this.state.item;
                this_storages.location.id = value;
                this.setState({ item: this_storages });
              }}
            />
          </Grid>

          {this.props.method === 'Редактирование рецепта' ? (
            <Grid item xs={12}>
              <MyCheckBox
                label="Активность"
                value={parseInt(this.state.item.is_show) == 1 ? true : false}
                func={this.props.changeItemChecked.bind(this, 'is_show')}
              />
            </Grid>
          ) : null}

          <Divider />

          <Grid container spacing={3} mt={1}>
            <Grid item xs={12} sm={6}>
              <MyTextInput
                label="Поиск"
                value={this.state.searchValue}
                func={this.searchPf.bind(this)}
              />
              <Table size="small" style={{ whiteSpace: 'nowrap' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Название</TableCell>
                    <TableCell>Кол-во</TableCell>
                    <TableCell>Ед измер</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.item.pf_list
                    .filter((value) => {
                      if (
                        this.state.searchValue === '' ||
                        this.state.searchValue.length < 2
                      ) {
                        return value;
                      } else {
                        return value.name
                          .toLowerCase()
                          .includes(this.state.searchValue.toLowerCase());
                      }
                    })
                    .map((item, key) => (
                      <TableRow key={key}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <MyTextInput
                            type="number"
                            defaultValue={''}
                            func={this.props.changeQuantity.bind(this)}
                          />
                        </TableCell>
                        <TableCell>{item.ed_izmer}</TableCell>
                        <TableCell>
                          <AddIcon
                            onClick={this.props.addIngredientsRecipe.bind(
                              this,
                              item
                            )}
                            style={{ cursor: 'pointer' }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Grid>

            <Grid item xs={12} sm={6} mt={5}>
              <Table size="small" style={{ whiteSpace: 'nowrap' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Название</TableCell>
                    <TableCell>Кол-во</TableCell>
                    <TableCell>%</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.item.recipe.map((item, key) => (
                    <TableRow key={key}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        {item.quantity} {item.ed_izmer}
                      </TableCell>
                      <TableCell>{`${item.percent} %`}</TableCell>
                      <TableCell>
                        <CloseIcon
                          onClick={this.props.deleteIngredientsRecipe.bind(
                            this,
                            item.id
                          )}
                          style={{ cursor: 'pointer' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ '& td': { border: 0 } }}>
                    <TableCell>Всего:</TableCell>
                    <TableCell>{`${this.props.total} гр`}</TableCell>
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
      recipe: vendor,
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
      recipe: newVendor,
      total
    });
  }

  changeTab(event, value) {
    this.setState({
      ItemTab: value,
    });
  }

  onClose() {
    this.setState({
      item: null,
      ItemTab: '2',
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
                    method={this.props.method}
                    event={this.state.item}
                    changeItem={this.changeItem.bind(this)}
                    changeItemChecked={this.changeItemChecked.bind(this)}
                    addIngredientsRecipe={this.addIngredientsRecipe.bind(this)}
                    changeQuantity={this.changeQuantity.bind(this)}
                    deleteIngredientsRecipe={this.deleteIngredientsRecipe.bind(
                      this
                    )}
                    total={this.state.total}
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
                  <ReceptModule_Modal_Container
                    method={this.props.method}
                    event={this.state.item}
                    changeItem={this.changeItem.bind(this)}
                    changeItemChecked={this.changeItemChecked.bind(this)}
                    addIngredientsRecipe={this.addIngredientsRecipe.bind(this)}
                    changeQuantity={this.changeQuantity.bind(this)}
                    deleteIngredientsRecipe={this.deleteIngredientsRecipe.bind(
                      this
                    )}
                    total={this.state.total}
                  />
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
          {this.props.recipes.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.id}</TableCell>
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
                onClick={this.props.openModalRecipes.bind(
                  this,
                  'Редактирование рецепта',
                  item.id
                )}
              >
                {item.name}
              </TableCell>
              <TableCell>{item.location[0]}</TableCell>
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

      item: {
        allRecipes: [
          {
            id: '1',
            is_show: 1,
            show_in_rev: 0,
            name: 'Паста вареная',
            location: ['Кухня Пицца'],
            time_stagе: '10:00',
            term: '72 часа',
            post: {
              id: '2',
              name: 'Повар',
            },
            recipe: [
              {
                id: '1',
                name: '7Up 0.6 л',
                ed_izmer: 'гр',
                quantity: 10,
              },
              {
                id: '2',
                name: 'Бахилы полиэтиленовые',
                ed_izmer: 'шт',
                quantity: 5,
              },
            ],
            pf_list: [
              {
                id: '1',
                name: '7Up 0.6 л',
                ed_izmer: 'гр',
              },
              {
                id: '2',
                name: 'Бахилы полиэтиленовые',
                ed_izmer: 'шт',
              },
              {
                id: '3',
                name: 'Васаби 5г.',
                ed_izmer: 'шт',
              },
              {
                id: '4',
                name: 'Вилка черная, одноразовая',
                ed_izmer: 'шт',
              },
              {
                id: '6',
                name: 'Aqua Minerale Не газ.',
                ed_izmer: 'кг',
              },
              {
                id: '7',
                name: 'Губка металлическая',
                ed_izmer: 'шт',
              },
              {
                id: '8',
                name: 'Губки для посуды',
                ed_izmer: 'шт',
              },
              {
                id: '9',
                name: 'Зиплок 10*100',
                ed_izmer: 'шт',
              },
              {
                id: '10',
                name: 'Икра масаго красная',
                ed_izmer: 'гр',
              },
              {
                id: '11',
                name: 'Имбирь 30 г.',
                ed_izmer: 'шт',
              },
            ],
          },
          {
            id: '3',
            is_show: 1,
            show_in_rev: 0,
            name: 'Кляр',
            location: ['Стеллаж'],
            time_stagе: '15:00',
            term: '30 часов',
            post: {
              id: '3',
              name: 'Кухонный работник',
            },
            recipe: [
              {
                iid: '7',
                name: 'Губка металлическая',
                ed_izmer: 'шт',
                quantity: 10,
              },
              {
                id: '2',
                name: 'Бахилы полиэтиленовые',
                ed_izmer: 'шт',
                quantity: 5,
              },
            ],
            pf_list: [
              {
                id: '1',
                name: '7Up 0.6 л',
                ed_izmer: 'гр',
              },
              {
                id: '2',
                name: 'Бахилы полиэтиленовые',
                ed_izmer: 'шт',
              },
              {
                id: '3',
                name: 'Васаби 5г.',
                ed_izmer: 'шт',
              },
              {
                id: '4',
                name: 'Вилка черная, одноразовая',
                ed_izmer: 'шт',
              },
              {
                id: '6',
                name: 'Aqua Minerale Не газ.',
                ed_izmer: 'кг',
              },
              {
                id: '7',
                name: 'Губка металлическая',
                ed_izmer: 'шт',
              },
              {
                id: '8',
                name: 'Губки для посуды',
                ed_izmer: 'шт',
              },
              {
                id: '9',
                name: 'Зиплок 10*100',
                ed_izmer: 'шт',
              },
              {
                id: '10',
                name: 'Икра масаго красная',
                ed_izmer: 'гр',
              },
              {
                id: '11',
                name: 'Имбирь 30 г.',
                ed_izmer: 'шт',
              },
            ],
          },
          {
            id: '4',
            is_show: 0,
            show_in_rev: 1,
            name: 'Лососевый замес',
            location: ['Холодильник'],
            time_stagе: '20:00',
            term: '15 часов',
            post: {
              id: '2',
              name: 'Повар',
            },
            recipe: [
              {
                id: '1',
                name: '7Up 0.6 л',
                ed_izmer: 'гр',
                quantity: 10,
              },
              {
                id: '4',
                name: 'Вилка черная, одноразовая',
                ed_izmer: 'шт',
                quantity: 5,
              },
            ],
            pf_list: [
              {
                id: '1',
                name: '7Up 0.6 л',
                ed_izmer: 'гр',
              },
              {
                id: '2',
                name: 'Бахилы полиэтиленовые',
                ed_izmer: 'шт',
              },
              {
                id: '3',
                name: 'Васаби 5г.',
                ed_izmer: 'шт',
              },
              {
                id: '4',
                name: 'Вилка черная, одноразовая',
                ed_izmer: 'шт',
              },
              {
                id: '6',
                name: 'Aqua Minerale Не газ.',
                ed_izmer: 'кг',
              },
              {
                id: '7',
                name: 'Губка металлическая',
                ed_izmer: 'шт',
              },
              {
                id: '8',
                name: 'Губки для посуды',
                ed_izmer: 'шт',
              },
              {
                id: '9',
                name: 'Зиплок 10*100',
                ed_izmer: 'шт',
              },
              {
                id: '10',
                name: 'Икра масаго красная',
                ed_izmer: 'гр',
              },
              {
                id: '11',
                name: 'Имбирь 30 г.',
                ed_izmer: 'шт',
              },
            ],
          },
          {
            id: '5',
            is_show: 1,
            show_in_rev: 0,
            name: 'Соус Спайси',
            location: ['Холодильник'],
            time_stagе: '11:00',
            term: '50 часов',
            post: {
              id: '3',
              name: 'Кухонный работник',
            },
            recipe: [
              {
                id: '1',
                name: '7Up 0.6 л',
                ed_izmer: 'гр',
                quantity: 10,
              },
              {
                id: '3',
                name: 'Васаби 5г.',
                ed_izmer: 'шт',
                quantity: 5,
              },
            ],
            pf_list: [
              {
                id: '1',
                name: '7Up 0.6 л',
                ed_izmer: 'гр',
              },
              {
                id: '2',
                name: 'Бахилы полиэтиленовые',
                ed_izmer: 'шт',
              },
              {
                id: '3',
                name: 'Васаби 5г.',
                ed_izmer: 'шт',
              },
              {
                id: '4',
                name: 'Вилка черная, одноразовая',
                ed_izmer: 'шт',
              },
              {
                id: '6',
                name: 'Aqua Minerale Не газ.',
                ed_izmer: 'кг',
              },
              {
                id: '7',
                name: 'Губка металлическая',
                ed_izmer: 'шт',
              },
              {
                id: '8',
                name: 'Губки для посуды',
                ed_izmer: 'шт',
              },
              {
                id: '9',
                name: 'Зиплок 10*100',
                ed_izmer: 'шт',
              },
              {
                id: '10',
                name: 'Икра масаго красная',
                ed_izmer: 'гр',
              },
              {
                id: '11',
                name: 'Имбирь 30 г.',
                ed_izmer: 'шт',
              },
            ],
          },
        ],
      },

      modalDialogNew: false,
      modalDialogEdit: false,
      method: null,

      itemNew: {
        name: '',
        time_stagе: '00:00',
        term: '',
        recipe: [],
        location: [
          {
            id: '1',
            name: 'Стеллаж',
          },
          {
            id: '2',
            name: 'Холодильник',
          },
          {
            id: '3',
            name: 'Кухня Роллы',
          },
        ],
        post: [
          {
            id: '1',
            name: 'Не требуется',
          },
          {
            id: '2',
            name: 'Повар',
          },
          {
            id: '3',
            name: 'Кухонный работник',
          },
        ],
        pf_list: [
          {
            id: '1',
            name: '7Up 0.6 л',
            ed_izmer: 'гр',
          },
          {
            id: '2',
            name: 'Бахилы полиэтиленовые',
            ed_izmer: 'шт',
          },
          {
            id: '3',
            name: 'Васаби 5г.',
            ed_izmer: 'шт',
          },
          {
            id: '4',
            name: 'Вилка черная, одноразовая',
            ed_izmer: 'шт',
          },
          {
            id: '6',
            name: 'Aqua Minerale Не газ.',
            ed_izmer: 'кг',
          },
          {
            id: '7',
            name: 'Губка металлическая',
            ed_izmer: 'шт',
          },
          {
            id: '8',
            name: 'Губки для посуды',
            ed_izmer: 'шт',
          },
          {
            id: '9',
            name: 'Зиплок 10*100',
            ed_izmer: 'шт',
          },
          {
            id: '10',
            name: 'Икра масаго красная',
            ed_izmer: 'гр',
          },
          {
            id: '11',
            name: 'Имбирь 30 г.',
            ed_izmer: 'шт',
          },
        ],
      },

      recipes: null,
    };
  }

  async componentDidMount() {
    let data = await this.getData('get_all');

    this.setState({
      // points: data.points,
      // point: data.points[0].id,
      module_name: data.module_info.name,
      // mounths: data.mounth,
      // mounth: data.this_m,
      // years: data.years,
      // year: data.this_y,
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

  openModalRecipes(method, id) {
    // const item = this.state.item.find(el => el.id === id)

    if (method === 'Новый рецепт') {
      // let res = await this.getData('get_all_for_new');

      // console.log(res)

      this.setState({
        modalDialogNew: true,
        method,
        // item:
      });
    } else {
      const data = this.state.item;

      const recipes = data.allRecipes.find((el) => el.id === id);

      this.setState({
        modalDialogEdit: true,
        method,
        recipes,
      });
    }
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

  async saveEditItem(editItem, recipe) {
    // console.log(editItem, recipe);

    // await this.getData('save_edit', data);

    this.setState({
      modalDialogEdit: false,
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
          open={this.state.modalDialogEdit}
          onClose={() => {
            this.setState({ modalDialogEdit: false });
          }}
          method={this.state.method}
          event={this.state.recipes}
          save={this.saveEditItem.bind(this)}
        />

        <Grid item xs={12}>
          <ReceptModule_Table
            recipes={this.state.item.allRecipes}
            openModalRecipes={this.openModalRecipes.bind(this)}
          />
        </Grid>
      </>
    );
  }
}

export function ReceptModule() {
  return <ReceptModule_ />;
}
