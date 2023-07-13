import React, { useState, useRef, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { MyTextInput, MySelect, MyAlert } from '../../stores/elements';

import queryString from 'query-string';

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function ListItemCat({ moveItem, it, index, openModal }) {
  const ref = useRef(null);

  if (it.parent_id !== '0') {
    const [_, drop] = useDrop({
      accept: 'items',
      drop(item) {
        moveItem(it, item.it);
      },
    });

    const [{ isDragging }, drag] = useDrag({
      type: 'items',
      item: () => {
        return { it };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    drag(drop(ref));

    return (
      <TableRow hover ref={ref} sx={{ cursor: 'pointer' }} key={index} onClick={() => openModal('editCat', it.id)}>
        <TableCell></TableCell>
        <TableCell sx={{ paddingLeft: 10, alignItems: 'center', minWidth: '300px' }}>
          <li>{it.name}</li>
        </TableCell>
        <TableCell sx={{ minWidth: '500px' }}>{it.shelf_life}</TableCell>
      </TableRow>
    );
  } else {
    const [_, drop] = useDrop({
      accept: 'items',
      drop(item) {
        moveItem(it, item.it);
      },
    });

    return (
      <TableRow hover ref={drop} key={index} sx={{ '& th': { border: 'none' } }} onClick={() => openModal('edit', it.id)}>
        <TableCell>{index + 1}</TableCell>
        <TableCell sx={{ fontWeight: 'bold', cursor: 'pointer', color: '#c03' }}>
          {it.name}
        </TableCell>
        <TableCell sx={{ minWidth: '500px' }}>{it.shelf_life}</TableCell>
      </TableRow>
    );
  }
}

function ListCat({ main, openModal, save }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(main);
  }, [main]);

  const moveItem = (dropItem, dragItem) => {
    const newList = list.map((item) => {
      if (item.id === dropItem.id || item.id === dropItem.parent_id) {
        list.map((item) => {
          if (item.id === dragItem.parent_id) {
            item.items = item.items.filter((it) => it.id !== dragItem.id);
          }
        });

        if(dropItem.parent_id !== dragItem.parent_id) {
          save(dragItem, item.id, 'edit');
        }

        if (item.items.length) {
          dragItem.parent_id = item.id;
          item.items = [...item.items, ...[dragItem]];
        } else {
          item.items = [];
          dragItem.parent_id = item.id;
          item.items = [...item.items, ...[dragItem]];
        }

        return item;
      }

      return item;
    });

    setList(newList);
  };

  const renderItem = (item, index) => (
    <ListItemCat
      key={index}
      moveItem={moveItem}
      it={item}
      index={index}
      openModal={openModal}
    />
  );

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
            <TableCell>#</TableCell>
            <TableCell sx={{ minWidth: '300px' }}>Название</TableCell>
            <TableCell sx={{ minWidth: '500px' }}>Время жизни</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item, key) =>
            item.items.length ? (
              <React.Fragment key={key}>
                {renderItem(item, key)}
                {item.items.map((it, key) => renderItem(it, key))}
              </React.Fragment>
            ) : (
              renderItem(item, key)
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

class SiteCategory_Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      listCat: null,
      parent_id: '',
    };
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props);

    if (!this.props.item) {
      return;
    }

    if (this.props.item !== prevProps.item) {
      this.setState({
        item: this.props.item,
        listCat: this.props.listCat,
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

  changeSelect(event) {
    const parent_id = event.target.value;

    this.setState({
      parent_id,
    });
  }

  save() {
    const item = this.state.item;

    const cat_id = this.state.parent_id;

    this.props.save(item, cat_id, null);

    this.onClose();
  }

  onClose() {
    this.setState({
      item: null,
      listCat: null,
      parent_id: '',
    });

    this.props.onClose();
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.onClose.bind(this)}
        fullScreen={this.props.fullScreen}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle className="button">
          {this.props.method}
          {this.props.itemName ? `: ${this.props.itemName}` : null}
        </DialogTitle>

        <IconButton onClick={this.onClose.bind(this)} style={{ cursor: 'pointer', position: 'absolute', top: 0, right: 0, padding: 20 }}>
          <CloseIcon />
        </IconButton>

        <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <MyTextInput
                label="Название категории"
                value={this.state.item ? this.state.item.name : ''}
                func={this.changeItem.bind(this, 'name')}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <MyTextInput
                label="Время жизни"
                value={this.state.item ? this.state.item.shelf_life : ''}
                func={this.changeItem.bind(this, 'shelf_life')}
              />
            </Grid>

            {this.props.mark === 'editCat' ? null : (
              <Grid item xs={12} sm={12}>
                <MySelect
                  label="Дочерняя категория"
                  data={this.state.listCat ? this.state.listCat : []}
                  value={this.state.parent_id}
                  func={this.changeSelect.bind(this)}
                />
              </Grid>
            )}

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={this.save.bind(this)}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

class SiteCategory_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'site_category',
      module_name: '',
      is_load: false,

      main: [],

      fullScreen: false,

      mark: null,
      modalDialog: false,
      listCat: null,
      item: null,

      itemNew: {
        name: '',
        shelf_life: '',
      },

      method: '',
      itemName: '',

      openAlert: false,
      err_status: true,
      err_text: '',
    };
  }

  async componentDidMount() {
    const data = await this.getData('get_all');

    this.setState({
      main: data.main,
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

  async openModal(mark, id) {
    this.handleResize();

    if (mark === 'add') {
      const res = await this.getData('get_all_for_new');

      this.setState({
        mark,
        item: JSON.parse(JSON.stringify(this.state.itemNew)),
        listCat: res.category,
        modalDialog: true,
        method: 'Новая категория',
      });
    }

    if (mark === 'edit' || mark === 'editCat') {
      const data = {
        id,
      };

      const res = await this.getData('get_one', data);

      this.setState({
        mark,
        item: res.item,
        itemName: res.item.name,
        listCat: res.category,
        modalDialog: true,
        method: 'Редактирование категории',
      });
    }
  }

  async save(item, cat_id, markEdit) {
    const mark = markEdit ?? this.state.mark;

    let res;

    if (mark === 'add') {
      const data = {
        name: item.name,
        shelf_life: item.shelf_life,
        cat_id,
      };

      res = await this.getData('save_new', data);
    }

    if (mark === 'edit' || mark === 'editCat') {
      const data = {
        id: item.id,
        name: item.name,
        shelf_life: item.shelf_life,
        cat_id: cat_id ? cat_id : item.parent_id,
      };

      res = await this.getData('save_edit', data);
    }

    if (!res.st) {
      this.setState({
        openAlert: true,
        err_status: res.st,
        err_text: res.text,
      });
    } else {
      setTimeout(() => {
        this.update();
      }, 300);
    }
  }

  async update() {
    const data = await this.getData('get_all');

    this.setState({
      main: data.main,
    });
  }

  render() {
    return (
      <>
        <DndProvider backend={HTML5Backend}>
          <Backdrop open={this.state.is_load} style={{ zIndex: 99 }}>
            <CircularProgress color="inherit" />
          </Backdrop>

          <MyAlert
            isOpen={this.state.openAlert}
            onClose={() => this.setState({ openAlert: false })}
            status={this.state.err_status}
            text={this.state.err_text}
          />

          <SiteCategory_Modal
            open={this.state.modalDialog}
            onClose={() => this.setState({ modalDialog: false, itemName: '', method: '' })}
            mark={this.state.mark}
            item={this.state.item}
            listCat={this.state.listCat}
            method={this.state.method}
            itemName={this.state.itemName}
            fullScreen={this.state.fullScreen}
            save={this.save.bind(this)}
          />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <h1>{this.state.module_name}</h1>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button variant="contained" color="primary" style={{ whiteSpace: 'nowrap' }} onClick={this.openModal.bind(this, 'add', null)}>
                Добавить
              </Button>
            </Grid>

            <Grid item xs={12} sm={12}>
              <ListCat main={this.state.main} openModal={this.openModal.bind(this)} save={this.save.bind(this)}/>
            </Grid>

          </Grid>
        </DndProvider>
      </>
    );
  }
}

export function SiteCategory() {
  return <SiteCategory_ />;
}
