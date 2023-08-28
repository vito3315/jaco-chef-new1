import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import {
  MyTextInput,
  TextEditor,
  MyAutocomplite,
} from '../../stores/elements';

import queryString from 'query-string';

class AppWorkTable extends React.Component {
  shouldComponentUpdate(nextProps) {

    var array1 = nextProps.items;
    var array2 = this.props.items;

    var is_same = array1.length == array2.length && array1.every(function (element, index) { return element === array2[index] });

    return !is_same;
  }

  render() {
    return (
      <Table>
        
        <TableBody>
          {this.props.items.map((item, key) => (
            <TableRow key={key}>
              <TableCell
                onClick={this.props.openWork.bind(this, item.id)}
                style={{ color: '#c03', cursor: 'pointer', fontWeight: 'bold', width: 50 }}
              >
                {key + 1}
              </TableCell>
              <TableCell>
                <a href={item.link} target="_blank" style={{ color: '#c03', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>
                  {item.name}    
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

class AppWorkTableNews extends React.Component {
  shouldComponentUpdate(nextProps) {

    var array1 = nextProps.news;
    var array2 = this.props.news;

    var is_same = array1.length == array2.length && array1.every(function (element, index) { return element === array2[index] });

    return !is_same;
  }

  render() {
    return (
      <Table>
        
        <TableBody>
          {this.props.news.map((item, key) => (
            <TableRow key={key}>
              <TableCell>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', height: 30 }}>
                    <span>{item.user}</span><span>{item.date_time}</span>
                  </div>
                  <div dangerouslySetInnerHTML={{__html: item.text}} />
                </div>
                    
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

class JobDescriptions_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'job_descriptions',
      module_name: '',
      is_load: false,

      items: [],
      news: [],
      modalDialog: false,
      modalDialogNew: false,
      modalDialogNews: false,

      itemsEdit: null,
      nameWork: '',

      itemsNew: null,
      chengeItem1: null,
      chengeItemNew1: null,
      newText: '',

      kind: 999
    };
  }

  async componentDidMount() {
    let data = await this.getData('get_all');

    this.setState({
      module_name: data.module_info.name,
      items: data.items,
      news: data.news,
      kind: data.user.kind
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
        this.setState({
          is_load: false,
        });
      });
  };

  openCat(item) {
    this.setState({
      modalDialog: true,
      showCat: item,
      nameCat: item.name,
      editText: item.text,
    });
  }

  async saveEdit() {

    let itemsEdit = this.state.itemsEdit

    let data = {
      work: itemsEdit.item,
    };

    let res = await this.getData('save_edit', data);

    if (res.st === false) {
      alert(res.text);
    } else {
      this.setState({
        modalDialog: false,
        itemsEdit: null,
        nameWork: '',
      });

      let data = await this.getData('get_all');

      this.setState({
        items: data.items,
        news: data.news,
      });
    }
  }

  async saveNew() {

    let itemsNew = this.state.itemsNew

    let data = {
      work: itemsNew.item
    };

    let res = await this.getData('save_new', data);

    if (res.st === false) {
      alert(res.text);
    } else {
      this.setState({
        modalDialogNew: false,
        itemsNew: null,
      });

      let data = await this.getData('get_all');

      this.setState({
        items: data.items,
        news: data.news,
      });
    }
  }

  async saveNewNews() {

    let data = {
      text: this.state.newText
    };

    let res = await this.getData('save_new_news', data);

    if (res.st === false) {
      alert(res.text);
    } else {
      this.setState({
        modalDialogNews: false,
        newText: '',
      });

      let data = await this.getData('get_all');

      this.setState({
        items: data.items,
        news: data.news,
      });
    }
  }

  async openWork(id) {
    let data = {
      id: id,
    };

    let res = await this.getData('get_one', data);
    
    this.setState({
      itemsEdit: res,
      modalDialog: true,
      nameWork: res.item.name,
    });
  }

  async openNewWork() {
    let res = await this.getData('get_all_for_new');

    this.setState({
      itemsNew: res,
      modalDialogNew: true,
    });
  }

  openNews(){
    this.setState({ 
      modalDialogNews: true,
      newText: ''
    });
  }

  chengeItem(type, event) {
    let data = event.target.value;
    let item = this.state.itemsEdit;

    item.item[[type]] = data;

    if (type == 'dow' && data == 12) {
      item.times_add = [{ time_action: '19:00' }];
      item.times_close = '23:00';
    }

    if (type == 'dow' && data == 13) {
      item.times_add = [];
    }

    this.setState({
      itemsEdit: item,
    });
  }

  chengeItem1(type, event, data) {
    let item = this.state.itemsEdit;

    item.item[[type]] = data.id;

    this.setState({
      itemsEdit: item,
      chengeItem1: data,
    });
  }

  chengeItemNew(type, event) {
    let data = event.target.value;
    let item = this.state.itemsNew;

    item.item[[type]] = data;

    if (type == 'dow' && data == 12) {
      item.times_add = [{ time_action: '19:00' }];
      item.times_close = '23:00';
    }

    if (type == 'dow' && data == 13) {
      item.times_add = [];
    }

    this.setState({
      itemsNew: item,
    });
  }

  chengeItemNew1(type, event, data) {
    let item = this.state.itemsNew;

    item.item[[type]] = data.id;

    this.setState({
      itemsNew: item,
      chengeItemNew1: data,
    });
  }

  chengeTime(key, event) {
    let data = event.target.value;
    let item = this.state.itemsEdit;

    item.times_add[key]['time_action'] = data;

    this.setState({
      itemsEdit: item,
    });
  }

  chengeTimeNew(key, event) {
    let data = event.target.value;
    let item = this.state.itemsNew;

    item.times_add[key]['time_action'] = data;

    this.setState({
      itemsNew: item,
    });
  }

  delTime(key) {
    let item = this.state.itemsEdit;

    let newArr = [];

    item.times_add.map((it, k) => {
      if (parseInt(k) != parseInt(key)) {
        newArr.push(it);
      }
    });

    item.times_add = newArr;

    this.setState({
      itemsEdit: item,
    });
  }

  delTimeNew(key) {
    let item = this.state.itemsNew;

    let newArr = [];

    item.times_add.map((it, k) => {
      if (parseInt(k) != parseInt(key)) {
        newArr.push(it);
      }
    });

    item.times_add = newArr;

    this.setState({
      itemsNew: item,
    });
  }

  addTime(event) {
    let data = document.getElementById('timePikerNew').value;
    let item = this.state.itemsEdit;

    if (data != '') {
      item.times_add.push({
        time_action: data,
      });

      this.setState({
        itemsEdit: item,
      });
    }
  }

  addTimeNew(event) {
    let data = document.getElementById('timePikerNew').value;
    let item = this.state.itemsNew;

    if (data != '') {
      item.times_add.push({
        time_action: data,
      });

      this.setState({
        itemsNew: item,
      });
    }
  }

  chengeTimeClose(event) {
    let data = event.target.value;
    let item = this.state.itemsEdit;

    item.times_close = data;

    this.setState({
      itemsEdit: item,
    });
  }

  chengeTimeCloseNew(event) {
    let data = event.target.value;
    let item = this.state.itemsNew;

    item.times_close = data;

    this.setState({
      itemsNew: item,
    });
  }

  async changeCheck(key, type, event) {
    let items = this.state.items;

    items[key][[type]] = event.target.checked ? 1 : 0;

    let data = {
      type: type,
      value: event.target.checked ? 1 : 0,
      id: items[key].id,
    };

    let res = await this.getData('save_check', data);

    this.setState({
      items: items,
    });
  }

  render() {
    return (
      <>
        <Backdrop open={this.state.is_load} style={{ zIndex: 99 }}>
          <CircularProgress color="inherit" />
        </Backdrop>

        {!this.state.itemsEdit ? null : (
          <Dialog
            open={this.state.modalDialog}
            maxWidth={'md'}
            onClose={() => {
              this.setState({
                modalDialog: false,
                itemsEdit: null,
                nameWork: '',
              });
            }}
          >
            <DialogTitle>{this.state.nameWork}</DialogTitle>
            <DialogContent style={{ paddingTop: 10 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <MyTextInput
                    value={this.state.itemsEdit.item.name}
                    func={this.chengeItem.bind(this, 'name')}
                    label="Название"
                  />
                </Grid>
        
                <Grid item xs={12} sm={6}>
                  <MyTextInput
                    value={this.state.itemsEdit.item.link}
                    func={this.chengeItem.bind(this, 'link')}
                    label="Ссылка"
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                   <MyAutocomplite 
                    label='Должности' 
                    multiple={true} 
                    data={this.state.itemsEdit.apps} 
                    value={this.state.itemsEdit.item.app_id} 
                    func={ (event, value) => { 
                      let this_storages = this.state.itemsEdit; 
                      this_storages.item.app_id = value;
                      this.setState({ itemsEdit: this_storages }) } } 
                    />
                </Grid>

              </Grid>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.saveEdit.bind(this)}>
                Сохранить
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {!this.state.itemsNew ? null : (
          <Dialog
            open={this.state.modalDialogNew}
            maxWidth={'md'}
            onClose={() => {
              this.setState({ modalDialogNew: false });
            }}
          >
            <DialogTitle>Новая инструкция</DialogTitle>
            <DialogContent style={{ paddingTop: 10 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <MyTextInput
                    value={this.state.itemsNew.item.name}
                    func={this.chengeItemNew.bind(this, 'name')}
                    label="Название"
                  />
                </Grid>
        
                <Grid item xs={12} sm={6}>
                  <MyTextInput
                    value={this.state.itemsNew.item.link}
                    func={this.chengeItemNew.bind(this, 'link')}
                    label="Ссылка"
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                   <MyAutocomplite 
                    label='Должности' 
                    multiple={true} 
                    data={this.state.itemsNew.apps} 
                    value={this.state.itemsNew.item.app_id} 
                    func={ (event, value) => { 
                      let this_storages = this.state.itemsNew; 
                      this_storages.item.app_id = value;
                      this.setState({ itemsNew: this_storages }) } } 
                    />
                </Grid>

                

                

                
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.saveNew.bind(this)}>
                Сохранить
              </Button>
            </DialogActions>
          </Dialog>
        )}

        <Dialog
          open={this.state.modalDialogNews}
          maxWidth={'md'}
          onClose={() => {
            this.setState({ modalDialogNews: false });
          }}
        >
          <DialogTitle>Новая новость</DialogTitle>
          <DialogContent style={{ paddingTop: 10 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextEditor 
                  value={this.state.newText}
                  func={ (text) => { this.setState({ newText: text }); } }
                
                />
              </Grid>
      
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.saveNewNews.bind(this)}>
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          { parseInt(this.state.kind) >= 3 ? null :
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.openNewWork.bind(this)}
              >
                Добавить инструкцию
              </Button>
            </Grid>
          }

          { parseInt(this.state.kind) >= 3 ? null :
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.openNews.bind(this)}
              >
                Добавить новость
              </Button>
            </Grid>
          }

          <Grid item xs={12} sm={6}>

            { this.state.items.length > 0 ?
              <AppWorkTable 
                items={this.state.items} 
                openWork={ parseInt(this.state.kind) >= 3 ? () => {} : this.openWork.bind(this)}
                kind={this.state.kind}
              /> : null
            }
          </Grid>

          <Grid item xs={12} sm={6}>

            { this.state.news.length > 0 ?
              <AppWorkTableNews 
                news={this.state.news}
              /> : null
            }
          </Grid>

        </Grid>
      </>
    );
  }
}

export function JobDescriptions() {
  return <JobDescriptions_ />;
}
