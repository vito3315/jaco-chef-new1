import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

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

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Link from '@mui/material/Link';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { MySelect, MyDatePickerNew, MyTextInput } from '../../stores/elements';

const queryString = require('query-string');

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

class CheckWorks_Confirm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };
  }

  changeText(data, event) {
    this.setState({
      [data]: event.target.value,
    });
  }

  delete() {
    const text = this.state.text;

    this.props.delete(text);

    this.onClose();
  }

  save() {
    this.props.save();

    this.onClose();
  }

  onClose() {
    this.setState({
      text: '',
    });

    this.props.onClose();
  }

  render() {
    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="sm"
        open={this.props.open}
        onClose={this.onClose.bind(this)}
      >
        <DialogTitle>Подтвердите действие</DialogTitle>
        <DialogContent align="center" style={{ fontWeight: 'bold', paddingBottom: 10, paddingTop: 10 }}>
          {this.props.mark === 'deleteWork' || this.props.mark === 'deletePf' ? (
            <MyTextInput
              label="Укажите причину удаления"
              value={this.state.text}
              func={this.changeText.bind(this, 'text')}
            />
          ) : (
            <Typography>
              {this.props.mark === 'saveWork' ? 'Подтвердить уборку ?' : this.props.mark === 'savePf' ? 'Подтвердить заготовку ?' : 'Снять с сотрудника эту уборку ?'}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onClose.bind(this)}>Отмена</Button>
          <Button
            disabled={this.props.mark === 'saveWork' || this.props.mark === 'savePf' || this.props.mark === 'clearWork' ? false : this.state.text.length < 3 ? true : false}
            onClick={this.props.mark === 'saveWork' || this.props.mark === 'savePf' || this.props.mark === 'clearWork' ? this.save.bind(this) : this.delete.bind(this)}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

class CheckWorks_Modal_New extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: [],
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

  save(work) {
    this.props.save(work);

    this.onClose();
  }

  onClose() {
    this.setState({
      item: [],
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
        <DialogTitle className="button">
          <Typography>{this.props.method}</Typography>
          <IconButton onClick={this.onClose.bind(this)} style={{ cursor: 'pointer' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
          <List sx={{ pt: 0 }}>
            {this.state.item.map((it, i) => 
              <ListItem key={i} autoFocus button onClick={this.save.bind(this, it)}>
                <ListItemAvatar>
                  <Avatar>
                    <AddCircleOutlineOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                {it.name}
              </ListItem>
            )}
          </List>
        </DialogContent>
      </Dialog>
    );
  }
}

class CheckWorks_Modal_Edit extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);

    this.state = {
      item: null,
      fullScreen: false,
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

  changeItem(data, event) {
    const item = this.state.item;

    item[data] = event.target.value;

    this.setState({
      item,
    });
  }

  save() {
    const item = this.state.item;

    this.props.save(item);

    this.onClose();
  }

  onClose() {
    this.setState({
      item: this.props.event ? this.props.event : null,
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
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="button">
          <Typography sx={{ fontWeight: 'bold' }}>
            {this.props.method}: {this.state.item ? this.state.item.name_work ? this.state.item.name_work : '' : ''}
          </Typography>
          {this.state.fullScreen ? (
            <IconButton onClick={this.onClose.bind(this)} style={{ cursor: 'pointer' }}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>

          <Grid container spacing={3} justifyContent="center" mb={3}>

            <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center" mb={2}>
              <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                Уборку начал
              </Typography>
              <Typography sx={{ fontWeight: 'normal', whiteSpace: 'nowrap' }}>
                {this.state.item ? this.state.item.user_name ? this.state.item.user_name : 'Не указано' : 'Не указано'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center" mb={2}>
              <Typography sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                Уборку подтвердил
              </Typography>
              <Typography sx={{ fontWeight: 'normal', whiteSpace: 'nowrap' }}>
                {this.state.item ? this.state.item.namager_name ? this.state.item.namager_name : 'Не указано' : 'Не указано'}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={12} display="flex" justifyContent="space-around" sx={{ flexDirection: {xs: 'column', sm: 'row'} }}>

            <Grid item xs={12} sm={3} sx={{ marginBottom: {xs: 3, sm: 0} }}>
              <MyTextInput
                label="Объем заготовки"
                value={this.state.item ? this.state.item.count_pf : ''}
                func={this.changeItem.bind(this, 'count_pf')}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <MyTextInput
                label="Объем отходов"
                value={this.state.item ? this.state.item.count_trash : ''}
                func={this.changeItem.bind(this, 'count_trash')}
              />
            </Grid>
            </Grid>

            {/* аккордион */}
            {this.state.item ? this.state.item.hist.length === 0 ? null : (
                <Grid item xs={12} sm={12}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>История изменений</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell style={{ width: '20%' }}>Сотрудник</TableCell>
                              <TableCell style={{ width: '20%' }}>Время обновления</TableCell>
                              <TableCell style={{ width: '15%' }}>Заготовки ДО</TableCell>
                              <TableCell style={{ width: '15%' }}>Отходов ДО</TableCell>
                              <TableCell style={{ width: '15%' }}>Заготовки ПОСЛЕ</TableCell>
                              <TableCell style={{ width: '15%' }}>Отходов ПОСЛЕ</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {this.state.item.hist.map((it, k) => (
                              <TableRow key={k}>
                                <TableCell>{it.user_name}</TableCell>
                                <TableCell>{it.date_time}</TableCell>
                                <TableCell>{it.old_count_pf}</TableCell>
                                <TableCell>{it.old_count_trash}</TableCell>
                                <TableCell>{it.new_count_pf}</TableCell>
                                <TableCell>{it.new_count_trash}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ) : null}
          </Grid>
        </DialogContent>

        <DialogActions className="button">
          <Button color="success" variant="contained" onClick={this.save.bind(this)}>Сохранить</Button>
          <Button onClick={this.onClose.bind(this)} variant="contained">Отмена</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

class Checkworks_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'check_works',
      module_name: '',
      is_load: false,

      points: [],
      point: '',

      date_start: '',
      date_end: '',

      all_work: [],
      work: [],
      pf_list: [],

      ItemTab: '1',

      filter: false,
      workCopy: [],

      confirmDialog: false,
      mark: '',
      item: null,

      modalDialogNew: false,
      works: [],
      method: '',

      modalDialogEdit: false,
      itemEdit: null,

      check_cook: null,
    };
  }

  async componentDidMount() {
    const data = await this.getData('get_all');

    // console.log(data);

    this.setState({
      points: data.points,
      point: data.points[0].id,
      check_cook: data.check_cook,
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

  changeDateRange(data, event) {
    this.setState({
      [data]: event ? formatDate(event) : '',
    });
  }

  async changePoint(event) {
    const date_start = this.state.date_start;
    const date_end = this.state.date_end;

    this.setState({
      point: event.target.value,
    });

    if (!date_start || !date_end) {
      return;
    }

    const data = {
      point_id: event.target.value,
      date_start,
      date_end,
    };

    const res = await this.getData('get_data', data);

    // console.log(res);

    this.setState({
      all_work: res.all_work,
      work: res.work,
      pf_list: res.pf_list,
      workCopy: res.work,
      filter: false,
      check_cook: res.check_cook,
    });
  }

  async getItems() {
    const date_start = this.state.date_start;
    const date_end = this.state.date_end;

    if (!date_start || !date_end) {
      return;
    }

    const data = {
      point_id: this.state.point,
      date_start,
      date_end,
    };

    const res = await this.getData('get_data', data);

    // console.log(res);

    this.setState({
      all_work: res.all_work,
      work: res.work,
      pf_list: res.pf_list,
      workCopy: res.work,
      filter: false,
      check_cook: res.check_cook,
    });
  }

  changeTab(event, value) {
    this.setState({
      ItemTab: value,
    });
  }

  filterButton() {
    this.setState({
      filter: !this.state.filter,
    });

    setTimeout(() => {
      this.filterItems();
    }, 10);
  }

  filterItems() {
    if (this.state.filter) {
      const work = this.state.work;

      const is_delete = work.filter((item) => item.is_delete === '1');

      this.setState({
        work: is_delete,
      });
    } else {
      const work = this.state.workCopy;

      this.setState({
        work,
      });
    }
  }

  openConfirm(item, mark) {
    this.setState({
      confirmDialog: true,
      item,
      mark,
    });
  }

  async deleteItem(text) {
    const item = this.state.item;

    const mark = this.state.mark;

    const data = {
      work_id: item.id,
      point_id: item.point_id,
      text,
    };

    // console.log(data);

    if (mark === 'deleteWork') {
      await this.getData('close_work', data);
    }

    if (mark === 'deletePf') {
      await this.getData('close_pf_work', data);
    }

    this.update();
  }

  async saveItem() {
    const item = this.state.item;

    const mark = this.state.mark;

    const data = {
      work_id: item.id,
      point_id: item.point_id,
    };

    // console.log(data);

    if (mark === 'saveWork') {
      await this.getData('check_work', data);
    }

    if (mark === 'savePf') {
      await this.getData('check_pf_work', data);
    }

    if (mark === 'clearWork') {
      await this.getData('clear_work', data);
    }

    this.update();
  }

  async saveWork(work) {
    const mark = this.state.mark;

    if (mark === 'newItem') {
      const point_id = this.state.point;

      const data = {
        point_id,
        work_id: work.id,
      };

      // console.log(data);

      await this.getData('add_new_work', data);
    }

    if (mark === 'editItem') {
      const data = {
        id: work.id,
        count_pf: work.count_pf,
        count_trash: work.count_trash,
      };

      // console.log(data);

      await this.getData('save_edit', data);
    }

    this.update();
  }

  async openModal(mark, method, itemEdit) {
    if (mark === 'newItem') {
      const point_id = this.state.point;

      const data = {
        point_id,
      };

      const works = await this.getData('get_add_work', data);

      this.setState({
        modalDialogNew: true,
        works,
        method,
        mark,
      });
    }

    if (mark === 'editItem') {
      this.setState({
        modalDialogEdit: true,
        itemEdit,
        method,
        mark,
      });
    }
  }

  async update() {
    const data = {
      point_id: this.state.point,
      date_start: this.state.date_start,
      date_end: this.state.date_end,
    };

    const res = await this.getData('get_data', data);

    this.setState({
      all_work: res.all_work,
      work: res.work,
      pf_list: res.pf_list,
      workCopy: res.work,
      filter: false,
      check_cook: res.check_cook,
    });
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <CheckWorks_Confirm
          open={this.state.confirmDialog}
          onClose={() => this.setState({ confirmDialog: false })}
          mark={this.state.mark}
          delete={this.deleteItem.bind(this)}
          save={this.saveItem.bind(this)}
        />

        <CheckWorks_Modal_New
          open={this.state.modalDialogNew}
          onClose={() => this.setState({ modalDialogNew: false })}
          method={this.state.method}
          event={this.state.works}
          save={this.saveWork.bind(this)}
        />

        <CheckWorks_Modal_Edit
          open={this.state.modalDialogEdit}
          onClose={() => this.setState({ modalDialogEdit: false })}
          method={this.state.method}
          event={this.state.itemEdit}
          save={this.saveWork.bind(this)}
        />

        {/* кнопки и выбор дат */}
        <Grid container spacing={3} mb={5}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          {this.state.check_cook ? null : (
            <Grid item xs={12} sm={12}>
              <Button onClick={this.openModal.bind(this, 'newItem', 'Добавление уборки')} variant="contained">
                Добавить уборку
              </Button>
            </Grid>
          )}

          <Grid item xs={12} sm={3}>
            <MySelect
              is_none={false}
              data={this.state.points}
              value={this.state.point}
              func={this.changePoint.bind(this)}
              label="Точка"
            />
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
            <Button onClick={this.getItems.bind(this)} variant="contained">
              Обновить
            </Button>
          </Grid>
        </Grid>

        {/* таблицы */}
        {this.state.point < 1 ? null : (
          <Grid item xs={12} sm={12}>
            <TabContext value={this.state.ItemTab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={this.changeTab.bind(this)} variant="fullWidth">
                  <Tab label="Уборки" value="1" />
                  <Tab label="Оставшиеся уборки" value="2" />
                  <Tab label="Заготовки" value="3" />
                </TabList>
              </Box>

              <TabPanel value="1">
                <Grid item xs={12} sm={12}>
                  <TableContainer>
                    <Grid mb={2} mt={2}>
                      <Button variant="contained" onClick={this.filterButton.bind(this)} style={{ backgroundColor: '#9e9e9e' }}>
                       Только удаленные / Все
                      </Button>
                    </Grid>
                    {!this.state.work.length ? null : (
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell style={{ width: '25%' }} >Уборка</TableCell>
                            <TableCell style={{ width: '10%' }} >Сотрудник</TableCell>
                            <TableCell style={{ width: '10%' }} >Дата уборки</TableCell>
                            <TableCell style={{ width: '15%' }} >Уборку начали</TableCell>
                            <TableCell style={{ width: '15%' }} >Уборку закончили</TableCell>
                            <TableCell style={{ width: '15%' }} >Подтвердили</TableCell>
                            <TableCell style={{ width: '10%', padding: 0 }} >Подтвердивший</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {this.state.work.map((item, key) => (
                            <TableRow key={key} hover sx={{ '& td': {backgroundColor: item.is_delete === '1' ? '#eb4d4b' : null, color: item.is_delete === '1' ? '#fff' : null, 
                            fontWeight: item.is_delete === '1' ? 700 : null} }}>
                              <TableCell >{item.name_work}</TableCell>
                              <TableCell >{item.user_name}</TableCell>
                              <TableCell >{item.date_start_work}</TableCell>
                              <TableCell >{item.date_time_start}</TableCell>
                              <TableCell >{item.date_time_end}</TableCell>
                              <TableCell >{item.manager_time}</TableCell>
                              <TableCell  style={{ padding: 0 }}>
                                {item.namager_name || item.is_delete === '1' || !this.state.check_cook ? item.namager_name ?? '' : (
                                  <Grid display="flex" sx={{ justifyContent: { sm: 'space-evenly', xs: 'space-around' } }}>
                                    {item.date_time_end ? (
                                      <Button onClick={this.openConfirm.bind(this, item, 'saveWork')} style={{ cursor: 'pointer' }} color="success" variant="contained">
                                        <CheckIcon />
                                      </Button>
                                    ) : (
                                      <Button onClick={this.openConfirm.bind(this, item, 'clearWork')} style={{ cursor: 'pointer', backgroundColor: 'yellow' }} variant="contained">
                                        <KeyboardBackspaceIcon />
                                      </Button>
                                    )}
                                    <Button onClick={this.openConfirm.bind(this, item, 'deleteWork')} style={{ cursor: 'pointer' }} color="error" variant="contained">
                                      <ClearIcon />
                                    </Button>
                                  </Grid>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </TableContainer>
                </Grid>
              </TabPanel>

              <TabPanel value="2">
                {!this.state.all_work.length ? null : (
                  <Grid item xs={12} sm={12}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell style={{ width: '15%' }} >Дата добавления</TableCell>
                            <TableCell style={{ width: '45%' }} >Уборки</TableCell>
                            <TableCell style={{ width: '30%' }} >Должность уборки</TableCell>
                            <TableCell style={{ width: '10%' }} ></TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {this.state.all_work.map((item, key) => (
                            <TableRow key={key} hover>
                              <TableCell >{item.date}</TableCell>
                              <TableCell >{item.name_work}</TableCell>
                              <TableCell >{item.app_name}</TableCell>
                              <TableCell >
                                {!this.state.check_cook ? null : (
                                  <Button onClick={this.openConfirm.bind(this, item, 'deleteWork')} style={{ cursor: 'pointer' }} color="error" variant="contained">
                                    <ClearIcon />
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                )}
              </TabPanel>

              <TabPanel value="3">
                {!this.state.pf_list.length ? null : (
                  <Grid item xs={12} sm={12}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell style={{ width: '20%' }} >Позиция</TableCell>
                            <TableCell style={{ width: '14%' }} >Время забития</TableCell>
                            <TableCell style={{ width: '11%' }} >Объем заготовки</TableCell>
                            <TableCell style={{ width: '11%' }} >Объем отходов</TableCell>
                            <TableCell style={{ width: '11%' }} >Ед измерения</TableCell>
                            <TableCell style={{ width: '11%' }} >Сотрудник</TableCell>
                            <TableCell style={{ width: '11%' }} >Подтвердили</TableCell>
                            <TableCell style={{ width: '11%', padding: 0 }} >Подтвердивший</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {this.state.pf_list.map((item, key) => (
                            <TableRow key={key} hover sx={{ '& td': {backgroundColor: item.is_delete === '1' ? '#eb4d4b' : null,  fontWeight: item.is_delete === '1' ? 700 : null, 
                            color: item.is_delete === '1' ? '#fff' : null } }}>
                              <TableCell  sx={{cursor: 'pointer' }} onClick={this.openModal.bind(this, 'editItem', 'Редактирование заготовки', item)}>
                                  <Link variant="button" underline='none' color={item.is_delete === '1' ? "inherit" : "primary"} style={{ fontWeight: 700 }}> {item.name_work}</Link>
                              </TableCell>
                              <TableCell >{item.date_time}</TableCell>
                              <TableCell >{item.count_pf}</TableCell>
                              <TableCell >{item.count_trash}</TableCell>
                              <TableCell >{item.ei_name}</TableCell>
                              <TableCell >{item.user_name}</TableCell>
                              <TableCell >{item.manager_time}</TableCell>
                              <TableCell  style={{ padding: 0 }}>
                                {item.namager_name || !this.state.check_cook ? item.namager_name ?? '' : (
                                  <Grid display="flex" justifyContent="space-evenly">
                                    <Button onClick={this.openConfirm.bind(this, item, 'savePf')} style={{cursor: 'pointer'}} color="success" variant="contained">
                                      <CheckIcon />
                                    </Button>
                                    <Button onClick={this.openConfirm.bind(this, item, 'deletePf')} style={{cursor: 'pointer'}} color="error" variant="contained">
                                      <ClearIcon />
                                    </Button>
                                  </Grid>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                )}
              </TabPanel>
            </TabContext>
          </Grid>
        )}
      </>
    );
  }
}

export function Checkworks() {
  return <Checkworks_ />;
}
