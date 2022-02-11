import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
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
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Typography from '@mui/material/Typography';

import { MyTextInput, MyCheckBox, MySelect, MyTimePicker, MyAutocomplite } from '../../stores/elements';

const queryString = require('query-string');

const theme = createTheme({
  palette: {
    primary: {
      main: '#c03',
    },
    def: {
      main: '#353b48',
      secondary: '#fff'
    },
  },
});

const useStyles = makeStyles({
  formControl: {
    //margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  tableCel: {
    textAlign: 'center',
    borderRight: '1px solid #e5e5e5',
    padding: 15,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: "#e5e5e5",
    },
  },
  tableCelHead: {
    textAlign: 'center',
    padding: 15
  },
  customCel: {
    backgroundColor: "#bababa",
    textAlign: 'center',
    borderRight: '1px solid #e5e5e5',
    padding: 15,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: "#e5e5e5",
    },
  },
  timePicker: {
    width: '100%'
  }
});

class AppWorkShow_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'app_work_show',
      module_name: '',
      is_load: false,
      
      items: [],
      items_min: [],
      modalDialog: false,
      modalDialogNew: false,

      dows: [
        {id: 1, name: 'Понедельник'},
        {id: 2, name: 'Вторник'},
        {id: 3, name: 'Среда'},
        {id: 4, name: 'Четверг'},
        {id: 5, name: 'Пятница'},
        {id: 6, name: 'Суббота'},
        {id: 7, name: 'Воскресенье'},

        {id: 10, name: 'Другое'},
	      {id: 11, name: 'Каждый день'},
	      {id: 12, name: 'Каждый день в конце смены'},
        {id: 13, name: 'Ручное добавление'},
        {id: 14, name: 'После выполнение уборки'},
      ],
      types: [
        {id: 0, name: 'Другое'},
        {id: 1, name: 'Только 1 активная'},
        {id: 2, name: 'Добавление без ограничений'},
      ],

      itemsEdit: null,
      nameWork: '',

      itemsNew: null,
      chengeItem1: null,
      chengeItemNew1: null
    };
  }
  
  async componentDidMount(){
    let data = await this.getData('get_all');
    
    data.items.map( (item, key) => {
      data.items[key]['dow_name'] = this.state.dows.find( (it) => parseInt(it.id) == parseInt(item.dow) )['name'];
    } )

    this.setState({
      module_name: data.module_info.name,
      items: data.items,
      items_min: data.items_min
    })
    
    document.title = data.module_info.name;
  }
  
  getData = (method, data = {}) => {
    
    this.setState({
      is_load: true
    })
    
    return fetch('https://jacochef.ru/api/index_new.php', {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify({
        method: method, 
        module: this.state.module,
        version: 2,
        login: localStorage.getItem('token'),
        data: JSON.stringify( data )
      })
    }).then(res => res.json()).then(json => {
      
      if( json.st === false && json.type == 'redir' ){
        this.state.history.push("/");
        return;
      }
      
      if( json.st === false && json.type == 'auth' ){
        window.location.pathname = '/auth';
        return;
      }
      
      setTimeout( () => {
        this.setState({
          is_load: false
        })
      }, 300 )
      
      return json;
    })
    .catch(err => { 
      console.log( err )
      this.setState({
        is_load: false
      })
    });
  }
   
  async openWork(id){
    let data = {
      id: id
    };

    let res = await this.getData('get_one', data);

    console.log( res )

    this.setState({
      itemsEdit: res,
      modalDialog: true,
    })
  }

  render(){
    return (
      <>
        <Backdrop className={this.state.classes.backdrop} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        { !this.state.itemsEdit ? null :
          <Dialog
            open={this.state.modalDialog}
            maxWidth={'md'}
            onClose={ () => { this.setState({ modalDialog: false, itemsEdit: null, nameWork: '' }) } }
          >
            <DialogTitle>Уборка "{this.state.itemsEdit.item.name}"</DialogTitle>
            <DialogContent>
              
              <Grid container spacing={0}>

                { this.state.itemsEdit.item.show_time == false ? null :
                  <Grid item xs={12}>
                    <Typography>Время за уборку: {this.state.itemsEdit.itemюtime_min} мин.</Typography>
                  </Grid>
                }

                <Grid item xs={12}>
                  <Typography>Описание процесса уборки: </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography dangerouslySetInnerHTML={{__html: this.state.itemsEdit.item.text_work}}></Typography>
                </Grid>
                
              </Grid>

            </DialogContent>
          </Dialog>
        }

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Работа</TableCell>
                  <TableCell>Должность</TableCell>
                  <TableCell>День недели</TableCell>
                  <TableCell>Время открытия</TableCell>
                  <TableCell>Время автоматического удаления</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                
                { this.state.items.map( (item, key) =>
                  <TableRow key={key}>
                    <TableCell onClick={ this.openWork.bind(this, item.id) } style={{ color: '#c03', cursor: 'pointer', fontWeight: 'bold' }}>{item.work_name}</TableCell>
                    <TableCell>{item.app_name}</TableCell>
                    <TableCell>{item.dow_name} {item.need_work_name}</TableCell>
                    <TableCell>{item.times_open}</TableCell>
                    <TableCell>{item.times_close}</TableCell>
                  </TableRow>
                ) }
              
              </TableBody>
            
            </Table>
          </Grid>
        
        </Grid>
      </>
    )
  }
}

export function AppWorkShow () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <AppWorkShow_ classes={classes} history={history} />
  );
}