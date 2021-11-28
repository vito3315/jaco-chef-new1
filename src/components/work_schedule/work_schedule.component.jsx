import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';

import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';

import { MySelect, MyCheckBox, MyTimePicker } from '../../stores/elements';

const queryString = require('query-string');

const theme = createTheme({
  palette: {
    primary: {
      main: '#c03',
    }
  },
});

const useStyles = makeStyles({
  timePicker: {
    width: '100%'
  }
});

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <List sx={{ pt: 0 }}>
        
        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AccessTimeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Сменить часы на месяц" />
        </ListItem>
        
        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <SyncAltIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Сменить смену" />
        </ListItem>
        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <HomeWorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Сменить точку" />
        </ListItem>
        
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

class WorkSchedule_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'work_schedule',
      module_name: '',
      is_load: false,
      
      points: [],
      mounths: [],
      point: '0',
      mounth: '0',
      
      one: null,
      two: null,
      test_one: [],
      
      isOpenModalH: false,
      
      userInfo: null,
      
      hList: [],
      mList: [],
      
      newTimeStart: '10:00',
      newTimeEnd: '22:00',
      
      openNewTimeAdd: false,
      
      otherAppList: [],
      otherApp: '',
      
      testVal: '',
      testOpen: false,
      
      mainMenu: false,
      mainMenuH: false,
      
      chooseUser: null
    };
  }
  
  async componentDidMount(){
    let data = {
      
    };
    
    let res = await this.getData('get_all', data);
    
    let hList = [];
    let mList = [];
    
    for(let h = 0; h <= 23; h ++){
      hList.push({
        id: h,
        name: h
      })
    }
    
    for(let m = 0; m <= 50; m += 10){
      mList.push({
        id: m,
        name: m
      })
    }
    
    this.setState({
      points: res.point_list,
      point: res.point_list[0].id,
      
      mounths: res.mounths,
      mounth: res.mounths.find( (item) => parseInt( item.is_active ) == 1 )['id'],
      
      hList: hList,
      mList: mList,
      
      module_name: res.module_info.name
    })
    
    document.title = res.module_info.name;
    
    setTimeout( () => {
      //this.updateData();
    }, 100 )
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
      setTimeout( () => {
        this.setState({
          is_load: false
        })
      }, 300 )
      console.log( err )
    });
  }
   
  changeCheckOrders(event){
    let data = event.target.checked;
    
    this.setState({
      showReady: data
    })
  }
  
  async updateData(){
    let data = {
      point_id: this.state.point,
    };
    
    let res = await this.getData('get_graph', data);
    
    console.log( res )
    
    this.setState({
      one: res.date.one,
      two: res.date.two,
      
      test_one: res.one
    })
  }
  
  async openH(item, this_date){
    console.log( item )
    
    let data = {
      smena_id: item.smena_id,
      app_id: item.app_id,
      user_id: item.id,
      date: this_date,
      date_start: item.date
    };
    
    let res = await this.getData('get_user_day', data);
    
    console.log( res )
    
    this.setState({
      isOpenModalH: true,
      userInfo: res.h_info,
      otherAppList: res.other_app
    })
  }
  
  delTime(key_time){
    let userInfo = this.state.userInfo;
    
    userInfo.hours = userInfo.hours.filter( (item, key) => parseInt(key) != parseInt(key_time) );
    
    this.setState({
      userInfo: userInfo
    })
  }
  
  changeHourse(type, key, event){
    let userInfo = this.state.userInfo;
    
    userInfo.hours[ key ][ [type] ] = event.target.value;
    
    this.setState({
      userInfo: userInfo
    })
  }
  
  async saveDayHourse(){
    console.log( this.state.userInfo )
<<<<<<< Updated upstream
    
    let data = {
      date: this.state.userInfo.date,
      user_id: this.state.userInfo.user_id,
      smena_id: this.state.userInfo.smena_id,
      app_id: this.state.userInfo.app_id,
      hours: this.state.userInfo.hours,
      new_app: this.state.userInfo.new_app,
      mentor_id: this.state.userInfo.mentor_id
    }
    
    let res = await this.getData('save_user_day', data);
    
    console.log( res )
  }
  
  addTime(){
    let userInfo = this.state.userInfo;
    
    let check = userInfo.hours.find( (item) => item.time_start == this.state.newTimeStart && item.time_end == this.state.newTimeEnd );
    
    if( check ){
      this.setState({
        openNewTimeAdd: false
      })
      
      return ;
    }
    
    userInfo.hours.push({
      time_start: this.state.newTimeStart,
      time_end: this.state.newTimeEnd
    })
    
    this.setState({
      userInfo: userInfo,
      openNewTimeAdd: false
    })
  }
  
  async fastTime(type){
    let data = {
      type: type,
      user_id: this.state.chooseUser.id,
      app_id: this.state.chooseUser.app_id,
      smena_id: this.state.chooseUser.id,
      date: this.state.mounth
    }
    
    let res = await this.getData('save_fastTime', data);
    
    console.log( res );
=======
>>>>>>> Stashed changes
  }
  
  render(){
    return (
      <>
        <Backdrop open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Dialog onClose={ () => { this.setState({ mainMenu: false }) } } open={this.state.mainMenu}>
          
          { !this.state.chooseUser ? null :
            <DialogTitle>{this.state.chooseUser.full_app_name} {this.state.chooseUser.user_name} {this.state.mounth}</DialogTitle>
          }
          
          <List sx={{ pt: 0 }}>
            
            <ListItem button onClick={ () => { this.setState({ mainMenu: false, mainMenuH: true }) } }>
              <ListItemAvatar>
                <Avatar>
                  <AccessTimeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Сменить часы на месяц" />
            </ListItem>
            
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <SyncAltIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Сменить смену" />
            </ListItem>
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <HomeWorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Сменить точку" />
            </ListItem>
            
          </List>
        </Dialog>
        
        <Dialog onClose={ () => { this.setState({ mainMenuH: false }) } } open={this.state.mainMenuH}>
          
          { !this.state.chooseUser ? null :
            <DialogTitle>{this.state.chooseUser.user_name} {this.state.mounth} Часы</DialogTitle>
          }
          
          <List sx={{ pt: 0 }}>
            
            <ListItem button onClick={this.fastTime.bind(this, 1)}>
              <ListItemAvatar>
                <Avatar>
                  <LooksOneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="С 1 числа 2/2 с 10 до 22 на месяц" />
            </ListItem>
            
            <ListItem button onClick={this.fastTime.bind(this, 2)}>
              <ListItemAvatar>
                <Avatar>
                  <LooksTwoIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Со 2 числа 2/2 с 10 до 22 на месяц" />
            </ListItem>
            <ListItem button onClick={this.fastTime.bind(this, 3)}>
              <ListItemAvatar>
                <Avatar>
                  <Looks3Icon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="С 3 числа 2/2 с 10 до 22 на месяц" />
            </ListItem>
            <ListItem button onClick={this.fastTime.bind(this, 4)}>
              <ListItemAvatar>
                <Avatar>
                  <Looks3Icon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="С 4 числа 2/2 с 10 до 22 на месяц" />
            </ListItem>
            
          </List>
        </Dialog>
        
        
        { !this.state.userInfo ? null :
          <Dialog
            open={this.state.isOpenModalH}
            onClose={ () => { this.setState({ isOpenModalH: false }) } }
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">{this.state.userInfo.user.app_name + ' ' + this.state.userInfo.user.user_name + ' ' + this.state.userInfo.date}</DialogTitle>
            <DialogContent dividers={true}>
              
              <Typography>{'Моя нагрузка: ' + this.state.userInfo.user.my_load_h + ' / Средняя нагрузка: ' + this.state.userInfo.user.all_load_h}</Typography>
              <Typography style={{ marginBottom: 10 }}>{'Бонус: ' + this.state.userInfo.user.bonus}</Typography>
              
<<<<<<< Updated upstream
              { this.state.otherAppList.length == 0 ? null :
                <MySelect data={this.state.otherAppList} value={this.state.userInfo.new_app} func={ (event) => { let userInfo = this.state.userInfo; userInfo.new_app = event.target.value; this.setState({ userInfo: userInfo }) } } label='Кем работает' />
              }
              
              { this.state.userInfo.mentor_list.length == 0 ? null :
                <MySelect data={this.state.userInfo.mentor_list} value={this.state.userInfo.mentor_id} func={ (event) => { let userInfo = this.state.userInfo; userInfo.mentor_id = event.target.value; this.setState({ userInfo: userInfo }) } } label='Кем работает' />
              }
              
              <Accordion 
                style={{ marginTop: 10 }} 
                expanded={this.state.openNewTimeAdd} 
                onChange={ () => { this.setState({ openNewTimeAdd: !this.state.openNewTimeAdd }) } }>
                  
=======
              <Accordion style={{ marginTop: 10 }}>
>>>>>>> Stashed changes
                <AccordionSummary
                  expandIcon={<AddIcon />}
                >
                  <AccessTimeIcon style={{ marginRight: 10 }} />
                  <Typography>Добавить время</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ display: 'flex', flexDirection: 'row' }}>
                  
                  <MyTimePicker value={this.state.newTimeStart} func={ (event) => { this.setState({ newTimeStart: event.target.value }) } } classes={this.state.classes} label='Время начала работы' />
                  <MyTimePicker value={this.state.newTimeEnd} func={ (event) => { this.setState({ newTimeEnd: event.target.value }) } } classes={this.state.classes} label='Время окончания работы' />
                  
                  <AddIcon style={{ minWidth: 50, minHeight: 38, cursor: 'pointer' }} onClick={ this.addTime.bind(this) } />
                  
                </AccordionDetails>
              </Accordion>  
              
              { this.state.userInfo.hours.map( (item, key) =>
                <Accordion key={key}>
                  <AccordionSummary
                    expandIcon={<CloseIcon onClick={ this.delTime.bind(this, key) } />}
                  >
                    <AccessTimeIcon style={{ marginRight: 10 }} />
                    <Typography>{item.time_start + ' - ' + item.time_end}</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ display: 'flex', flexDirection: 'row' }}>
                    <MyTimePicker value={item.time_start} func={ this.changeHourse.bind(this, 'time_start', key) } classes={this.state.classes} label='Время начала работы' />
                    <MyTimePicker value={item.time_end} func={ this.changeHourse.bind(this, 'time_end', key) } classes={this.state.classes} label='Время окончания работы' />
                  </AccordionDetails>
                </Accordion>  
              ) }
              
              
              <Accordion style={{ marginTop: 50 }} disabled>
                <AccordionSummary>
                  <Typography>История</Typography>
                </AccordionSummary>
              </Accordion>  
              
              { this.state.userInfo.hist.map( (item, key) =>
                <Accordion key={key}>
                  <AccordionSummary>
                    <Typography>{item.date + ' - ' + item.user_name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
                    
                    { item.items.map( (it, k) =>
                      <Typography key={k}>{it.time_start + ' - ' + it.time_end} {it.app_name == '' ? '' : ' - ' + it.app_name} </Typography>
                    ) }
                    
                  </AccordionDetails>
                </Accordion>  
              ) }
              
            </DialogContent>
            <DialogActions style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button style={{ backgroundColor: 'green', color: '#fff' }} onClick={this.saveDayHourse.bind(this)}>Сохранить</Button>
              <Button style={{ backgroundColor: 'red', color: '#fff' }} onClick={() => { this.setState({ isOpenModalH: false }) }}>Отмена</Button>
            </DialogActions>
          </Dialog>
        }
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <MySelect data={this.state.points} value={this.state.point} func={ (event) => { this.setState({ point: event.target.value }) } } label='Точка' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MySelect data={this.state.mounths} value={this.state.mounth} func={ (event) => { this.setState({ mounth: event.target.value }) } } label='Месяц' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={this.updateData.bind(this)}>Обновить данные</Button>
          </Grid>
          
            
              
          
          
          
          <Grid item xs={12} sm={12}>
            
            { !this.state.one ? null :
              <TableContainer component={Paper}>
                <Table aria-label="a dense table" id="table_graph_one">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Число месяца</TableCell>
                      <TableCell></TableCell>
                      
                      {this.state.one.days.map( (item, key) => 
                        <TableCell className="min_block" style={{ backgroundColor: item.day == 'Пт' || item.day == 'Сб' || item.day == 'Вс' ? '#ffe9bd' : '#fff' }} key={key}>{item.date}</TableCell>
                      )}
                      
                    </TableRow>
                    <TableRow>
                      <TableCell>Сотрудник</TableCell>
                      <TableCell>Должность</TableCell>
                      <TableCell></TableCell>
                      
                      {this.state.one.days.map( (item, key) => 
                        <TableCell className="min_block" style={{ backgroundColor: item.day == 'Пт' || item.day == 'Сб' || item.day == 'Вс' ? '#ffe9bd' : '#fff' }} key={key}>{item.day}</TableCell>
                      )}
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                    { this.state.test_one.map( (item, key) =>
                      item.row == 'header' ?
                        <TableRow key={key} style={{ backgroundColor: '#e5e5e5' }}>
                          <TableCell style={{ textAlign: 'center' }} colSpan={ this.state.one.days.length + 3 }>{item.data}</TableCell>
                        </TableRow>
                          :
                        <TableRow key={key}>
                          <TableCell>{item.data.user_name}</TableCell>
                          <TableCell>{item.data.app_name}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}> <SyncAltIcon style={{ cursor: 'pointer' }} onClick={ () => { this.setState({ mainMenu: true, chooseUser: item.data }) } } /> </TableCell>
                          
                          { item.data.dates.map( (date, date_k) =>
                            <TableCell onClick={ this.openH.bind(this, item.data, date.date) } className="min_block" style={{ backgroundColor: date.info ? date.info.color : '#fff' }} key={date_k}>{date.info ? date.info.hours : ''}</TableCell>
                          ) }
                          
                        </TableRow>
                    ) }
                    
                    
                  </TableBody>
                  
                  <TableFooter>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      
                      {this.state.one.bonus.map( (item, key) => 
                        <TableCell className="min_block min_size" style={{ backgroundColor: item.type == 'cur' ? '#98e38d' : '#fff' }} key={key}>{item.res}</TableCell>
                      )}
                      
                    </TableRow>
                    
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Роллов</TableCell>
                      <TableCell></TableCell>
                      
                      {this.state.one.bonus.map( (item, key) => 
                        <TableCell className="min_block min_size" key={key}>{item.count_rolls}</TableCell>
                      )}
                      
                    </TableRow>
                    
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Пиццы</TableCell>
                      <TableCell></TableCell>
                      
                      {this.state.one.bonus.map( (item, key) => 
                        <TableCell className="min_block min_size" key={key}>{item.count_pizza}</TableCell>
                      )}
                      
                    </TableRow>
                    
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell className="min_size">Заказы готовились больше 40 минут</TableCell>
                      <TableCell></TableCell>
                      
                      {this.state.one.order_stat.map( (item, key) => 
                        <TableCell className="min_block min_size" key={key}>{item.count_false}</TableCell>
                      )}
                      
                    </TableRow>
                    
                  </TableFooter>
                  
                  
                </Table>
              </TableContainer>
            }
            
            
            
          </Grid>
        </Grid>
      </>
    )
  }
}

export function WorkSchedule () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <WorkSchedule_ classes={classes} history={history} />
  );
}