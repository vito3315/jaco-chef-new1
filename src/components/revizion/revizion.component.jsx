import React from 'react';
import { useHistory } from "react-router-dom";
import { NavLink as Link, Switch, Route, Redirect } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

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

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import SaveIcon from '@mui/icons-material/SaveAs';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { MySelect, MyCheckBox, MyTimePicker, MyTextInput, MyDaterange, MyAutocomplite, MyDatePicker } from '../../stores/elements';

const queryString = require('query-string');

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  
}));

// главная страница
class Revizion_ extends React.Component {
  
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'revizion',
      module_name: '',
      is_load: false,
      
      points: [],
      point: '0',
      
      revList: [],
      chooseRev: '',
      search: '',

      items: [],
      pf: [],
      rec: [],
      items_b: [],
      pf_b: [],
      rec_b: [],
      all_data: [],
        
      chooseTab: 0,
      
    };
    }

  // переменные для фильтра
  async componentDidMount(){
    
    let data = await this.getData('get_all');
    
    this.setState({
      points: data.point_list,
      point: data.point_list.length == 1 ? data.point_list[0].id : '0',
      module_name: data.module_info.name,
	  all_data: data.get_data_for_new_rev
    })
    
    document.title = data.module_info.name;
    
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
      console.log( err )
    });
  }

   // смена точки
  changePoint(event){
    let data = event.target.value;
    
    this.setState({
       point: data,
       search: ''
    })
    
    setTimeout( () => {
      this.getRevList();
    }, 50 )
    }

  // смена ревизии
  changeRev(event){
    let data = event.target.value;
    
    this.setState({
        chooseRev: data,
        search : ''
    })
    
    setTimeout( () => {
      this.getDataRev();
    }, 300 )
  }

   // поиск
   async search(event){
	    
		let data = {
			point_id: this.state.point,
			showReady: this.state.showReady === true ? 1 : 0
		};
    
        // дергаем товары, полуфабрикаты, рецпеты
        let res = this.state;
        let items, rec, pf, text;
        text = event.target.value.toLowerCase();

        // Фильтрация
        items = this.state.items_b.filter((item) => item.name.toLowerCase().includes(text));
        rec = this.state.rec_b.filter((item) => item.name.toLowerCase().includes(text));
        pf = this.state.pf_b.filter((item) => item.name.toLowerCase().includes(text));

        this.setState({
            items  : items,
            rec    : rec,
            pf     : pf,
            search : text
         })
	
  }

   // метод обновления данных
  async updateData(){
	  
    let data = {
      rev_id	: this.state.chooseRev,
      point_id	: this.state.point,
    };
	
	// to do переписать
    let res = await this.getData('get_data_rev', data);
          
	// отрисовка
	this.setState({
      items     : res.item,
      rec       : res.rec,
      pf        : res.pf,
      items_b   : res.item,
      rec_b     : res.rec,
      pf_b      : res.pf,
    })
  }

   // получение списка ревизий
  async getRevList(){
    let data = {
      point_id: this.state.point,
    };
    
    let res = await this.getData('get_rev_list', data);
    
    this.setState({
      revList: res,
      chooseRev: res.length > 0 ? res[0]['id'] : ''
    })
    
    if( res.length > 0 ){
      setTimeout( () => {
        this.getDataRev();
      }, 300 )
    }
  }

   // получение данных ревизии
  async getDataRev(){
    let data = {
      point_id: this.state.point,
      rev_id: this.state.chooseRev
    };
    
    let res = await this.getData('get_data_rev', data);
    
    this.setState({
        items: res.item,
        rec: res.rec,
        pf: res.pf,
        items_b: res.item,
        rec_b: res.rec,
        pf_b: res.pf,
    })
    }


   // рендер главная
  render(){
    return (
      <>
        <Backdrop className={this.state.classes.backdrop} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          <Grid item xs={12}>
            <Link to={"/revizion/new"}>Новая ревизия</Link>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <MySelect data={this.state.points} value={this.state.point} func={ this.changePoint.bind(this) } label='Точка' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MySelect data={this.state.revList} value={this.state.chooseRev} func={ this.changeRev.bind(this) } label='Ревизия' />
          </Grid>
		  <Grid item xs={12} sm={6}>
			<MyTextInput  classes={this.state.classes} func={ this.search.bind(this) } label='Поиск' value={this.state.search} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={this.updateData.bind(this)}>Обновить данные</Button>
          </Grid>
          
          <Grid item xs={12} sm={12} id="revTable">
            
            <Tabs value={this.state.chooseTab} onChange={ (item, key) => { this.setState({ chooseTab: key }) } } textColor="primary" indicatorColor="primary" centered>
              <Tab label="Товары" {...a11yProps(0)} />
              <Tab label="Заготовки" {...a11yProps(1)} />
            </Tabs>
            
            <TabPanel value={this.state.chooseTab} index={0}>
              
              <TableContainer component={Paper} >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Товар</TableCell>
                      <TableCell>Объем</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { this.state.items.map( (item, key) => (
                      <TableRow key={key}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.value} {item.ei_name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
            </TabPanel>
            <TabPanel value={this.state.chooseTab} index={1}>
              
              <TableContainer component={Paper} >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Заготовка</TableCell>
                      <TableCell>Объем</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { this.state.pf.map( (item, key) => (
                      <TableRow key={key}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.value} {item.ei_name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
            </TabPanel>
            
          </Grid>
        </Grid>
      </>
    )
  }
}

// Данные для страницы новая ревизия
class RevizionNewItem extends React.Component{
  constructor(props) {
      super(props);

      this.state = {
        item    : this.props.item,
        pf      : this.props.pf,
        change  : this.props.change,
        type    : this.props.type,
    };
   }

    // to do del
    componentWillMount() {
        //console.log('Will type=' + this.state.type);
    }
    componentDidMount() {
        //console.log('type=' + this.state.type);
    }

    shouldComponentUpdate(nextProps, nextState) {
    return (
        this.state.change !== nextState.change ||
        this.state.change !== nextProps.change
    );
    }
  
  render(){
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          //aria-controls="panel1a-content"
          //id="panel1a-header"
        >
          <Typography style={{ width: '60%' }}>{this.state.item.name} </Typography>
          <Typography style={{ width: '40%' }}>{this.state.item.value} {this.state.item.ei_name} </Typography>
        </AccordionSummary>

            {/* Товары */}
            {this.state.type != 'item'  ? null :
                <AccordionDetails>
                    {this.state.item.counts.map((it, k) =>
                        
                        <Grid container spacing={3} key={k} style={{ paddingTop: 10, paddingBottom: 10 }}>
                            <Grid item xs={12} sm={6}>
                                <MySelect data={this.state.item.size} value={it.need_pq} func={this.props.func.bind(this, 'item', this.props.itemKey, 'need_pq', k)} label='Объем упаковки' />
                            </Grid>
                            <Grid item xs={k == 0 ? 12 : 9} sm={5}>
                                <TextField value={it.value} onChange={this.props.func.bind(this, 'item', this.props.itemKey, 'value', k)} fullWidth variant="outlined" size="small" label="Количество" />
                            </Grid>
                            {k == 0 ? null :
                                <Grid item xs={3} sm={1}>
                                    <Button onClick={this.props.clear.bind(this, 'item', this.props.itemKey, k)} variant="contained"> <CloseIcon /> </Button>
                                </Grid>
                            }
                        </Grid>
                        
                    ) }
          
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" onClick={this.props.copy.bind(this, 'item', this.props.itemKey)}>Дублировать</Button>
                    </Grid>
                </AccordionDetails>
            }

            { /* Заготовки */}
            {this.state.type != 'pf' ? null :
                <AccordionDetails> 
                    <Grid item sm={5}> 
                        <TextField value={this.state.pf.value} onChange={ this.props.func.bind(this, 'pf', this.props.itemKey, 'value', 0) }  fullWidth variant="outlined" size="small" label="Количество" />
                    </Grid>
                </AccordionDetails>
            }

      </Accordion>
    )
  }
}

// Новая ревизия
class RevizionNew_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'revizion',
      module_name: '',
      is_load: false,
      
      points: [],
      point: '0',
      
      revList: [],
      chooseRev: '',
      
      storages: [],
      items: [],
      rec: [],
      pf: [],
      
      chooseTab: 0,
      modalDialog: false,
      open: false
    };
    }


  async componentDidMount(){
    
    let data = await this.getData('get_all');
    
    this.setState({
      points: data.point_list,
      point: data.point_list.length == 1 ? data.point_list[0].id : '0',
      module_name: data.module_info.name
    })
    
    document.title = data.module_info.name;
    
    setTimeout( () => {
      //this.updateData();
    }, 100 )
  }

    // измение точки подгрузка данных
  changePoint(event){
    let data = event.target.value;
    
    this.setState({
      point: data
    })
    
    setTimeout( () => {
      this.getDataRev();
    }, 300)

    }

  // метод получения данных
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
    });
  }

    // получаем данные
  async getDataRev(){
    let data = {
      point_id: this.state.point
    };
    
    let res = await this.getData('get_data_for_new_rev', data);
      
    this.setState({
      storages: res['storages'],
      items: res['items'],
      rec: res['rec'],
      pf: res['pf']
    })

  }

  // предварительное сохранение
  saveData(type, key_item, data, key_data, event){
      console.log('saveData');

    if( type == 'item' ){
      let items = this.state.items;
      
      items[key_item]['counts'][key_data][ [data] ] = event.target.value;
      
      let allVal = 0;
      
      items[key_item]['counts'].map( (item, key) => {
        allVal += parseFloat(item.need_pq) * parseFloat(item.value);
      } )
      
      items[key_item]['value'] = allVal;
      items[key_item]['change'] ++;
      
      this.setState({
        items: items
      })
      }

      if (type == 'pf') {

          let pf = this.state.pf;
         
          pf[key_item]['value'] = event.target.value;
          pf[key_item]['change']++;

          this.setState({
              pf: pf
          })
          console.log('pf', pf);
      }
    
  }

   // проверка полей, отображения модального окна
   checkData() {
       console.log('checkData');
       let items = this.state.items;
       let pf = this.state.pf;

       // проверка заполнения полей товаров, скрываем не заполненные
       items.map((item, key) =>  {
            if(item.value != 0){
                item.is_show = 0;
            }
           //console.log('item=', item, ' key ', key);
       })

       pf.map((item, key) => {
            if (item.value != 0) {
                item.is_show = 0;
            }
           //console.log('pf=', item, ' pf ', key);
       })

       this.setState({
           items: items,
           pf   : pf
       })

       this.setState({
           modalDialog: true,
           titleDialog: 'Ты уверен в правильности этих позиций ?'
       })
   }

  // копируем
  copyData(type, key_item){
    if( type == 'item' ){
      let items = this.state.items;
      
      items[key_item]['counts'].push({ need_pq: items[key_item]['counts'][0]['need_pq'], value: 0 })
      items[key_item]['change'] ++;
      
      this.setState({
        items: items
      })
    }
  }

  // очищаем
  clearData(type, key_item, key_data){
    
    if( type == 'item' ){
      let items = this.state.items;
      let new_counts = [];
      
      items[key_item]['counts'].map( (item, key) => {
        if( key != key_data ){
          new_counts.push( item )
        }
      } )
      
      items[key_item]['counts'] = new_counts;
      
      let allVal = 0;
      
      items[key_item]['counts'].map( (item, key) => {
        allVal += parseFloat(item.need_pq) * parseFloat(item.value);
      } )
      
      items[key_item]['value'] = allVal;
      items[key_item]['change'] ++;
      
      this.setState({
        items: items
      })
    }
    
  }

  // получение данных ревизии
  async saveRev() {
    let data = {
        point_id: this.state.point,
        item: this.state.item,
        rec: this.state.rec,
        pf: this.state.pf,
    };
    console.log('saveRev ', data);
  }

  render(){
    return (
      <>
        <Backdrop className={this.state.classes.backdrop} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>Новая ревизии</h1>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <MySelect data={this.state.points} value={this.state.point} func={ this.changePoint.bind(this) } label='Точка' />
          </Grid>

           <Grid item xs={12} sm={3}>
                <Button variant="contained" onClick={this.checkData.bind(this)} >Сохранить</Button>
           </Grid>

          <Grid item xs={12} sm={12} id="revTable">
            
            <Tabs value={this.state.chooseTab} onChange={ (item, key) => { this.setState({ chooseTab: key }) } } textColor="primary" indicatorColor="primary" centered>
              <Tab label="Товары" {...a11yProps(0)} />
              <Tab label="Заготовки" {...a11yProps(1)} />
            </Tabs>

            {/* Товары * to do меняем TabPanel на div и в стилях скрываем style: this.state.chooseTab == 1 ? {display: blovk} : {display: monr} */}
            <div style = { this.state.chooseTab == 0 ? {display: 'block'} : {display: 'none'} } >
              
              {this.state.items.map((item, key) => 
                parseInt(item.is_show) == 0 ? null :
                   <RevizionNewItem key={key} type="item" itemKey={key} item={item} change={item.change} func={this.saveData.bind(this)} copy={this.copyData.bind(this)} clear={this.clearData.bind(this)} />
              )} 
              
            </div>

            {/* Заготовки */}
            <div style={this.state.chooseTab == 1 ? { display: 'block' } : { display: 'none' }} >

                {this.state.pf.map((item, key) =>
                   parseInt(item.is_show) == 0 ? null :
                    <RevizionNewItem key={key} type="pf" itemKey={key} item={item} pf={item} change={item.change} func={this.saveData.bind(this)} copy={this.copyData.bind(this)} clear={this.clearData.bind(this) } />
                )}
              
            </div>
            
          </Grid>
        </Grid>
        
        <React.Fragment >
          <SwipeableDrawer
            anchor={'left'}
            open={ this.state.open }
            onClose={ () => { this.setState({ open: false }) } }
            onOpen={ () => { this.setState({ open: true }) } }
          >
            <List style={{ width: '100%' }}>
              { this.state.storages.map( (item, key) =>
                <ListItem button key={key}>
                  <ListItemText primary={ item.name } />
                </ListItem>
              ) }
            </List>
          </SwipeableDrawer>
        </React.Fragment>
        
        { this.state.storages.length == 0 ? null :
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
              showLabels
             
            >
              <BottomNavigationAction onClick={(event, newValue) => {
                            this.setState({ open: true })
                        }}  label="Recents" icon={<RestoreIcon />} />
                        <BottomNavigationAction onClick={this.checkData.bind(this)} label="Save" icon={<SaveIcon />} />
            </BottomNavigation>
          </Paper>
         }

        <Dialog
            open={this.state.modalDialog}
            onClose={() => { this.setState({ modalDialog: false }) }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{this.state.titleDialog}</DialogTitle>
                <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container spacing={3}>Не все поля заполнены </Grid>
                    </DialogContentText>

                    <Grid container spacing={3}>
                        <Grid item>Позиция </Grid>
                        <Grid item>Кол-во </Grid>
                        <Grid item>Ед. измер. </Grid>
                    </Grid>
                        
                    
                
            </DialogContent>
            <DialogActions>
                <Button color="primary">Хорошо</Button>
                <Button color="primary">Сохранить</Button>
            </DialogActions>
        </Dialog>
        
      </>
    )
  }
}

export function Revizion () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <Revizion_ classes={classes} history={history} />
  );
}

export function RevizionNew () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <RevizionNew_ classes={classes} history={history} />
  );
}