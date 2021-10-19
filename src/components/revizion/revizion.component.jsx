import React from 'react';
import { useHistory } from "react-router-dom";
import { NavLink as Link, Switch, Route, Redirect } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { MySelect } from '../../stores/elements';

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
      
      items: [],
      pf: [],
      
      chooseTab: 0,
      
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
   
  changePoint(event){
    let data = event.target.value;
    
    this.setState({
      point: data
    })
    
    setTimeout( () => {
      this.getRevList();
    }, 50 )
  }
  
  changeRev(event){
    let data = event.target.value;
    
    this.setState({
      chooseRev: data
    })
    
    setTimeout( () => {
      this.getDataRev();
    }, 300 )
  }
  
  async updateData(){
    let data = {
      point_id: this.state.point,
      showReady: this.state.showReady === true ? 1 : 0
    };
    
    let res = await this.getData('get_orders', data);
    
    this.setState({
      read: res.read,
      onstol: res.onstol,
      ordersQueue: res.prestol_new
    })
  }
  
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
  
  async getDataRev(){
    let data = {
      point_id: this.state.point,
      rev_id: this.state.chooseRev
    };
    
    let res = await this.getData('get_data_rev', data);
    
    this.setState({
      items: res['items'],
      pf: res['pf'],
    })
  }
  
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

class RevizionNewItem extends React.Component{
  constructor(props) {
    super(props);
        
    this.state = {
      item: this.props.item,
      change: this.props.change
    };
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
          <Typography style={{ width: '60%' }}>{this.state.item.name}</Typography>
          <Typography style={{ width: '40%' }}>{this.state.item.value} {this.state.item.ei_name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          
            { this.state.item.counts.map( (it, k) =>
              <Grid container spacing={3} key={k} style={{ paddingTop: 10, paddingBottom: 10 }}>
                <Grid item xs={12} sm={6}>
                  <MySelect data={ this.state.item.size } value={ it.need_pq } func={ this.props.func.bind(this, 'item', this.props.itemKey, 'need_pq', k) } label='Объем упаковки' />
                </Grid>
                <Grid item xs={ k == 0 ? 12 : 9 } sm={5}>
                  <TextField value={ it.value } onChange={ this.props.func.bind(this, 'item', this.props.itemKey, 'value', k) } fullWidth variant="outlined" size="small" label="Количество" />
                </Grid>
                { k == 0 ? null :
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
      </Accordion>
    )
  }
}

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
  
  changePoint(event){
    let data = event.target.value;
    
    this.setState({
      point: data
    })
    
    setTimeout( () => {
      this.getDataRev();
    }, 300 )
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
  
  saveData(type, key_item, data, key_data, event){
    
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
    
    
  }
  
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
          
          
          
          <Grid item xs={12} sm={6}>
            <MySelect data={this.state.points} value={this.state.point} func={ this.changePoint.bind(this) } label='Точка' />
          </Grid>
          
          <Grid item xs={12} sm={12} id="revTable">
            
            <Tabs value={this.state.chooseTab} onChange={ (item, key) => { this.setState({ chooseTab: key }) } } textColor="primary" indicatorColor="primary" centered>
              <Tab label="Товары" {...a11yProps(0)} />
              <Tab label="Заготовки" {...a11yProps(1)} />
            </Tabs>
            
            <TabPanel value={this.state.chooseTab} index={0}>
              
              { this.state.items.map( (item, key) =>
                <RevizionNewItem key={key} itemKey={key} item={item} change={item.change} func={ this.saveData.bind(this) } copy={ this.copyData.bind(this) } clear={ this.clearData.bind(this) } />
              ) }
              
              
            </TabPanel>
            <TabPanel value={this.state.chooseTab} index={1}>
              
              
              
            </TabPanel>
            
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
              onChange={(event, newValue) => {
                this.setState({ open: true })
              }}
            >
              <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            </BottomNavigation>
          </Paper>
        }
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