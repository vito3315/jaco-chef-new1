import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import {
  MySelect,
  MyCheckBox,
  MyTextInput,
  MyAutocomplite,
} from '../../stores/elements';

const queryString = require('query-string');

class PolufabricatModule_Modal_Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      is_show: '',
      show_in_rev: '',
      show_in_order: '',
    };
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props);

    if (!this.props) {
      return;
    }

    if (this.props !== prevProps) {
      this.setState({
        is_show: this.props.is_show,
        show_in_rev: this.props.show_in_rev,
        show_in_order: this.props.show_in_order,
      });
    }
  }

  changeItemChecked(data, event) {
    let vendor = this.state[data];
    vendor = event.target.checked === true ? 1 : 0;

    this.setState({
      [data]: vendor,
    });
  }

  save() {
    this.props.changeTableItem(this.props.id, this.props.type, this.state.is_show, this.state.show_in_rev, this.state.show_in_order);

    this.onClose();
  }

  onClose() {
    this.setState({
      is_show: '',
      show_in_rev: '',
      show_in_order: '',
    });

    this.props.onClose();
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.onClose.bind(this)}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogTitle>
          <Typography>{this.props.itemName} изменить:</Typography>
          <Typography>- Активность</Typography>
          <Typography>- Ревизию</Typography>
          <Typography>- Заявку</Typography>
        </DialogTitle>

        <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '35%' }}>Активность</TableCell>
                  <TableCell style={{ width: '35%' }}>Ревизия</TableCell>
                  <TableCell style={{ width: '30%' }}>Заявка</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ '& td': { border: 0 } }}>
                  <TableCell>
                    <MyCheckBox
                      label=""
                      value={parseInt(this.state.is_show) == 1 ? true : false}
                      func={this.changeItemChecked.bind(this, 'is_show')}
                    />
                  </TableCell>
                  <TableCell>
                    <MyCheckBox
                      label=""
                      value={parseInt(this.state.show_in_rev) == 1 ? true : false}
                      func={this.changeItemChecked.bind(this, 'show_in_rev')}
                    />
                  </TableCell>
                  <TableCell>
                    <MyCheckBox
                      label=""
                      value={parseInt(this.state.show_in_order) == 1 ? true : false}
                      func={this.changeItemChecked.bind(this, 'show_in_order')}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.save.bind(this)}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

class PolufabricatModule_Modal extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);

    this.state = {
      item: null,
    };
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props);

    if (!this.props.event) {
      return;
    }

    if (this.props.event !== prevProps.event) {
      this.setState({
        item: this.props.event,
      });
    }
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
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

  changeItemChecked(data, event) {
    const item = this.state.item;

    item.item[data] = event.target.checked === true ? 1 : 0;

    this.setState({
      item,
    });
  }

  changeItem(data, event) {
    const item = this.state.item;

    item.item[data] = event.target.value;

    this.setState({
      item,
    });
  }

  save() {
    const item = this.state.item;

    this.props.save(item.item, this.props.mark);

    this.onClose();
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
        fullScreen={this.state.fullScreen}
        fullWidth={true}
        maxWidth={'md'}
      >
        <DialogTitle className="button">
          <Typography>{this.props.method}{this.props.itemName ? ': ' + this.props.itemName : ''}
          </Typography>
          {this.state.fullScreen ? (
            <IconButton onClick={this.onClose.bind(this)} style={{ cursor: 'pointer' }}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <MyTextInput
                label="Название заготовки"
                value={this.state.item ? this.state.item.item.name : ''}
                func={this.changeItem.bind(this, 'name')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <MySelect
                label="Категория"
                data={this.state.item ? this.state.item.cat_pf : []}
                value={this.state.item ? this.state.item.item.cat_pf_id : ''}
                func={this.changeItem.bind(this, 'cat_pf_id')}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MySelect
                label="Ед измерения"
                data={this.state.item ? this.state.item.ed_izmer : []}
                value={this.state.item ? this.state.item.item.ed_izmer_id : ''}
                func={this.changeItem.bind(this, 'ed_izmer_id')}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MyTextInput
                label="Минимальный остаток"
                value={this.state.item ? this.state.item.item.min_count : ''}
                func={this.changeItem.bind(this, 'min_count')}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MyTextInput
                label="Срок годности"
                value={this.state.item ? this.state.item.item.shelf_life : ''}
                func={this.changeItem.bind(this, 'shelf_life')}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <MyAutocomplite
                label="Место хранения"
                multiple={true}
                data={this.state.item ? this.state.item.storages : []}
                value={this.state.item ? this.state.item.item.this_storages : []}
                func={(event, value) => {
                  let item = this.state.item;
                  item.item.this_storages = value;
                  this.setState({ item });
                }}
              />
            </Grid>

            {this.props.mark === 'itemEdit' ? (
              <Grid item xs={12}>
                <MyCheckBox
                  label="Активность"
                  value={this.state.item ? parseInt(this.state.item.item.is_show) == 1 ? true : false : false}
                  func={this.changeItemChecked.bind(this, 'is_show')}
                />
              </Grid>
            ) : null}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" style={{ whiteSpace: 'nowrap' }} onClick={this.save.bind(this)}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

class PolufabricatModule_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'polufabricat_module',
      module_name: '',
      is_load: false,

      cats: [],
      freeItems: [],

      modalDialog: false,
      modalDialogEdit: false,

      mark: '',
      method: '',

      item: null,
      itemName: '',

      snackbar: false,
      error: '',

      show_in_rev: '',
      show_in_order: '',
      is_show: '',
      id: '',
      type: 0,
    };
  }

  async componentDidMount() {
    const data = await this.getData('get_all');

    // console.log(data);

    this.setState({
      module_name: data.module_info.name,
      cats: data.items,
      freeItems: data.items_free,
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

  async openModal(mark, method, item_id) {
    if (mark === 'newItem') {
      const res = await this.getData('get_all_for_new');

      this.setState({
        modalDialog: true,
        item: res,
        mark,
        method,
      });
    }

    if (mark === 'itemEdit') {
      const data = {
        item_id,
      };

      const res = await this.getData('get_one', data);

      const itemName = res.item.name;

      this.setState({
        modalDialog: true,
        item: res,
        mark,
        method,
        itemName,
      });
    }
  }

  openModalItemEdit(id, type, name, is_show, show_in_rev, show_in_order) {
    this.setState({
      modalDialogEdit: true,
      show_in_rev,
      show_in_order,
      is_show,
      id,
      type,
      itemName: name,
    });
  }

  changeTableItem(item_id, type, is_show, show_in_rev, show_in_order) {

    if (parseInt(type) == 1) {
      if (this.state.is_show != is_show) {
        this.saveItem(item_id, 'active', is_show);
      }

      if (this.state.show_in_rev != show_in_rev) {
        this.saveItem(item_id, 'rev', show_in_rev);
      }

      if (this.state.show_in_order != show_in_order) {
        this.saveItem(item_id, 'order', show_in_order);
      }
    }

    if (parseInt(type) == 2) {
      if (this.state.is_show != is_show) {
        this.saveItem(item_id, 'active', is_show);
      }

      if (this.state.show_in_rev != show_in_rev) {
        this.saveItem(item_id, 'rev', show_in_rev);
      }

      if (this.state.show_in_order != show_in_order) {
        this.saveItem(item_id, 'order', show_in_order);
      }
    }
  }

  async saveItem(item_id, type, is_show) {
    const data = {
      item_id,
      type,
      is_show,
    };

    let res = await this.getData('update_order_rev', data);

    if (!res.st) {
      this.setState({
        error: res.text,
        snackbar: true,
      });
    } else {
      this.update();
    }
  }

  async save(item, mark) {
    const data = {
      item,
    };

    if (mark === 'newItem') {
      await this.getData('save_new', data);
    }

    if (mark === 'itemEdit') {
      await this.getData('update', data);
    }

    this.update();
  }

  async update() {
    const data = await this.getData('get_all');

    this.setState({
      cats: data.items,
      freeItems: data.items_free,
    });
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Snackbar
          open={this.state.snackbar}
          autoHideDuration={30000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={() => this.setState({ snackbar: false })}
        >
          <Alert
            onClose={() => this.setState({ snackbar: false })}
            severity={'error'}
            sx={{ width: '100%' }}
          >
            {this.state.error}
          </Alert>
        </Snackbar>

        <PolufabricatModule_Modal
          open={this.state.modalDialog}
          onClose={() => {
            this.setState({ modalDialog: false, itemName: '' });
          }}
          method={this.state.method}
          event={this.state.item}
          mark={this.state.mark}
          save={this.save.bind(this)}
          itemName={this.state.itemName}
        />

        <PolufabricatModule_Modal_Edit
          open={this.state.modalDialogEdit}
          onClose={() => {
            this.setState({ modalDialogEdit: false });
          }}
          id={this.state.id}
          type={this.state.type}
          itemName={this.state.itemName}
          show_in_rev={this.state.show_in_rev}
          is_show={this.state.is_show}
          show_in_order={this.state.show_in_order}
          changeTableItem={this.changeTableItem.bind(this)}
        />

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Button onClick={this.openModal.bind(this, 'newItem', 'Новая заготовка')} variant="contained">
              Добавить заготовку
            </Button>
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
                              <TableCell style={{ width: '5%' }}>id</TableCell>
                              <TableCell style={{ width: '10%' }}>Активность</TableCell>
                              <TableCell style={{ width: '10%' }}>Ревизия</TableCell>
                              <TableCell style={{ width: '10%' }}>Заявка</TableCell>
                              <TableCell style={{ width: '20%' }}>Название заготовки</TableCell>
                              <TableCell style={{ width: '10%' }}>Мин. ост.</TableCell>
                              <TableCell style={{ width: '10%' }}>Ед. измер</TableCell>
                              <TableCell style={{ width: '25%' }}>Место хранения</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {category.items.map((it, k) => (
                              <TableRow key={k}>
                                <TableCell>{it.id}</TableCell>
                                <TableCell onClick={this.openModalItemEdit.bind(this, it.id, 1, it.name, it.is_show, it.show_in_rev, it.show_in_order)}>
                                  <MyCheckBox
                                    label=""
                                    value={parseInt(it.is_show) == 1 ? true : false}
                                  />
                                </TableCell>
                                <TableCell onClick={this.openModalItemEdit.bind(this, it.id, 1, it.name, it.is_show, it.show_in_rev, it.show_in_order)}>
                                  <MyCheckBox
                                    label=""
                                    value={parseInt(it.show_in_rev) == 1 ? true : false}
                                  />
                                </TableCell>
                                <TableCell onClick={this.openModalItemEdit.bind(this, it.id, 1, it.name, it.is_show, it.show_in_rev, it.show_in_order)}>
                                  <MyCheckBox
                                    label=""
                                    value={parseInt(it.show_in_order) == 1 ? true : false}
                                  />
                                </TableCell>
                                <TableCell style={{ cursor: 'pointer' }} onClick={this.openModal.bind(this, 'itemEdit', 'Редактирование заготовки', it.id)}>
                                  {it.name}
                                </TableCell>
                                <TableCell>{it.min_count}</TableCell>
                                <TableCell>{it.ei_name}</TableCell>
                                <TableCell>{it.storage_name}</TableCell>
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
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width: '5%' }}>id</TableCell>
                        <TableCell style={{ width: '10%' }}>Активность</TableCell>
                        <TableCell style={{ width: '10%' }}>Ревизия</TableCell>
                        <TableCell style={{ width: '10%' }}>Заявка</TableCell>
                        <TableCell style={{ width: '20%' }}>Название заготовки</TableCell>
                        <TableCell style={{ width: '10%' }}>Мин. ост.</TableCell>
                        <TableCell style={{ width: '10%' }}>Ед. измер</TableCell>
                        <TableCell style={{ width: '25%' }}>Место хранения</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {this.state.freeItems.map((cat, key) => (
                        <TableRow key={key}>
                          <TableCell>{cat.id}</TableCell>
                          <TableCell onClick={this.openModalItemEdit.bind(this, cat.id, 2, cat.name, cat.is_show, cat.show_in_rev, cat.show_in_order)}>
                            <MyCheckBox
                              label=""
                              value={parseInt(cat.is_show) == 1 ? true : false}
                            />
                          </TableCell>
                          <TableCell onClick={this.openModalItemEdit.bind(this, cat.id, 2, cat.name, cat.is_show, cat.show_in_rev, cat.show_in_order)}>
                            <MyCheckBox
                              label=""
                              value={parseInt(cat.show_in_rev) == 1 ? true : false}
                            />
                          </TableCell>
                          <TableCell onClick={this.openModalItemEdit.bind(this, cat.id, 2, cat.name, cat.is_show, cat.show_in_rev, cat.show_in_order)}>
                            <MyCheckBox
                              label=""
                              value={parseInt(cat.show_in_order) == 1 ? true : false}
                            />
                          </TableCell>
                          <TableCell style={{ cursor: 'pointer' }} onClick={this.openModal.bind(this, 'itemEdit', 'Редактирование заготовки', cat.id)}>
                            {cat.name}
                          </TableCell>
                          <TableCell>{cat.min_count}</TableCell>
                          <TableCell>{cat.ei_name}</TableCell>
                          <TableCell>{cat.storage_name}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionDetails>
              </Accordion>
            )}
          </Grid>
        </Grid>
      </>
    );
  }
}

export function PolufabricatModule() {
  return <PolufabricatModule_ />;
}
