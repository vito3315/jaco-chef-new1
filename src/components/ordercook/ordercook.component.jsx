import * as React from "react"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CachedIcon from '@material-ui/icons/Cached';
import Grid from '@material-ui/core/Grid';

import {Helmet} from "react-helmet";

import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import itemsStore from '../../stores/items-store';
import config from '../../stores/config';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const queryString = require('query-string');

import { Header } from '../header';

const useStyles = makeStyles((theme) => ({
  root2: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    '& > svg, form': {
      borderRight: '0px!important'
    }
  },
  root3: {
    '& > *': {
      margin: theme.spacing(1),
      width: 50,
    },
    '& .MuiOutlinedInput-input': {
      padding: '5px 10px'
    }
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    flexGrow: 1,
    //margin: -8
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperCat: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
    justifyContent: 'space-between',
    height: 'calc(100% - 15px)',
    cursor: 'pointer'
  },
  paperCatInfo: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  
  size1: {
    fontSize: '0.8rem'
  },
  scrollTable: {
    maxHeight: 250,
    overflow: 'auto',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

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
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

class OrderCook extends React.Component {
  interval = null;
  
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      cityList: [],
      spiner: false,
      
      data: [],
      
      selectedPoint: 1,
      selectedDate: formatDate(new Date()),
      
      points: [],
      point: null,
      
      activeCat: 0,
      
      orders: [],
      orderCheck: false,
      
      showOrder: null,
      openDialog: false,
      
      delOrder: false,
      radiogroup_options: [
        {id: '0', label: 'Решили отредактировать заказ', value: 0 },
        {id: '1', label: 'Не устраивает время ожидания', value: 0 },
        {id: '2', label: 'Изминились планы', value: 0 },
        {id: '3', label: 'Недостаточно средств', value: 0 },
        {id: '4', label: 'Другое', value: 0 },
      ],
      textDel: '',
      typeDel: -1
    };
  }
    
  componentWillUnmount(){
    clearInterval(this.interval)
  }
  
  checkLogin(){
    fetch(config.urlApi, {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify({
        type: 'check_login_center', 
        token: itemsStore.getToken()
      })
    }).then(res => res.json()).then(json => {
      if( json === true ){
        
      }else{
        localStorage.removeItem('token');
        clearInterval(this.interval)
        setTimeout( () => {
          //window.location.reload();
          window.location.href = '/auth'
        }, 500 )
      }
    })
    .catch(err => { });
  }
  
  componentDidMount = () => {
    
    this.setState({
      spiner: true
    })
    
    this.interval = setInterval(() => this.checkLogin(), 1000*60*60);
    this.checkLogin();
    
    fetch(config.urlApi, {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify({
        type: 'get_cat_center', 
        city_id: 1
      })
    }).then(res => res.json()).then(json => {
      this.setState({
        cityList: json.city_list
      })
    })
    .catch(err => { });
    
    fetch(config.urlApi, {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify({
        type: 'get_points', 
        city_id: 1
      })
    }).then(res => res.json()).then(json => {
      
      console.log( json )
      
      this.setState({
        points: json,
        point: json[0]
      })
      
      setTimeout( () => {
        this.getCookOrders();
      }, 500 )
    })
    .catch(err => { });
  }
    
  changePoint(event){
    let point = event.target.value;
    
    this.setState({ selectedPoint: point });
    setTimeout( () => {
      this.getCookOrders();  
    },500 )
  }
  
  getCookOrders(){
    this.setState({
      spiner: true
    })
    
    fetch(config.urlApi, {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify({
        type: 'getCookOrders', 
        point_id: this.state.selectedPoint
      })
    }).then(res => res.json()).then(json => {
      
      console.log( json )
      
      this.setState({
        data: json,
        //spiner: false
        //point: json[0]
      })
      
      setTimeout( () => {
        this.setState({
          spiner: false
        })
      }, 500 )
    })
    .catch(err => { });
  }
  
  render() {
    return (
      <Grid container spacing={0}>
        
        <Helmet>
          <title>Заказы на кухне</title>
        </Helmet>
        
        <Backdrop open={this.state.spiner} style={{ zIndex: 99, color: '#fff' }}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Grid item xs={12}>
          { this.state.cityList.length > 0 ? <Header classes={this.state.classes} cityList={this.state.cityList} page="OrderCook" /> : null }
        </Grid>
        
        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FormControl className={this.state.classes.formControl}>
            <InputLabel>Точка</InputLabel>
            <Select
              value={this.state.selectedPoint}
              onChange={ this.changePoint.bind(this) }
            >
              { this.state.points.map( (item, key) =>
                <MenuItem key={key} value={item.id}>{item.addr}</MenuItem>
              ) }
            </Select>
          </FormControl>
          
          <Button variant="contained" color="primary" className="btnClear" style={{ padding: '2px 6px', minWidth: 30 }} onClick={ this.getCookOrders.bind(this) }>
            <CachedIcon />
          </Button>
        </Grid>
        
        <Grid item xs={12}>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Тип</TableCell>
                  <TableCell>Статус</TableCell>
                  
                  <TableCell>Время заказа / предзаказа</TableCell>
                  <TableCell>Время выхода на стол</TableCell>
                  <TableCell>Во сколько собрали</TableCell>
                  
                  <TableCell>Закрыли</TableCell>
                  <TableCell>Приготовили</TableCell>
                  <TableCell>Отдали</TableCell>
                  <TableCell>Обещали</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
                
              
                { this.state.data.ready ?
                   this.state.data.ready.map( (item, key) =>
                    <TableRow key={key} style={{ backgroundColor: 'green' }}>
                      <TableCell style={{ color: 'inherit' }}>{item.id}</TableCell>
                      <TableCell style={{ color: 'inherit' }}>{item.type_order}</TableCell>
                      <TableCell style={{ color: 'inherit' }}>{item.status}</TableCell>
                      
                      <TableCell style={{ color: 'inherit' }}>{ parseInt(item['preorder']) == 1 ? item.date_time_preorder_ : item.date_time_order }</TableCell>
                      <TableCell style={{ color: 'inherit' }}>{item.unix_start_stol_or}</TableCell>
                      <TableCell style={{ color: 'inherit' }}>{ item.give_data_time_ }</TableCell>
                      
                      <TableCell style={{ color: 'inherit' }}>{ item.close_date_time_order }</TableCell>
                      <TableCell style={{ color: 'inherit' }}>{item.time_}</TableCell>
                      <TableCell style={{ color: 'inherit' }}>{item.test_time}</TableCell>
                      <TableCell style={{ color: 'inherit' }}>{ parseInt(item['preorder']) == 0 ? item['unix_time_to_client'] : '' }</TableCell>
                    </TableRow>
                  )
                    :
                  null
                }
                
                { this.state.data.onstol ?
                 this.state.data.onstol.map( (item, key) =>
                  <TableRow key={key} style={{ backgroundColor: 'yellow' }}>
                    <TableCell style={{ color: 'inherit' }}>{item.id}</TableCell>
                    <TableCell style={{ color: 'inherit' }}>{item.type_order}</TableCell>
                    <TableCell style={{ color: 'inherit' }}>{item.status}</TableCell>
                    
                    <TableCell style={{ color: 'inherit' }}>{ parseInt(item['preorder']) == 1 ? item.date_time_preorder_ : item.date_time_order }</TableCell>
                    <TableCell style={{ color: 'inherit' }}>{item.unix_start_stol_or}</TableCell>
                    <TableCell style={{ color: 'inherit' }}>{ item.give_data_time_ }</TableCell>
                    
                    <TableCell style={{ color: 'inherit' }}>{ item.close_date_time_order }</TableCell>
                    <TableCell style={{ color: 'inherit' }}>{item.time_}</TableCell>
                    <TableCell style={{ color: 'inherit' }}>{item.test_time}</TableCell>
                    <TableCell style={{ color: 'inherit' }}>{ parseInt(item['preorder']) == 0 ? item['unix_time_to_client'] : '' }</TableCell>
                  </TableRow>
                )
                  :
                null
                }
                
                { this.state.data.prestol_new ?
                 this.state.data.prestol_new.map( (item, key) =>
                  <TableRow key={key}>
                    <TableCell style={{ color: 'inherit' }}>{item.id}</TableCell>
                    <TableCell style={{ color: 'inherit' }}>{item.type_order}</TableCell>
                    <TableCell style={{ color: 'inherit' }}>{item.status}</TableCell>
                    
                    <TableCell style={{ color: 'inherit' }}>{ parseInt(item['preorder']) == 1 ? item.date_time_preorder : item.date_time_order }</TableCell>
                    <TableCell style={{ color: 'inherit' }}>{item.time_start_order}</TableCell>
                    <TableCell style={{ color: 'inherit' }}>{ item.give_data_time_ }</TableCell>
                    
                    <TableCell style={{ color: 'inherit' }}>{ item.close_date_time_order }</TableCell>
                    <TableCell style={{ color: 'inherit' }}>{item.time_}</TableCell>
                    <TableCell style={{ color: 'inherit' }}>{item.test_time}</TableCell>
                    <TableCell style={{ color: 'inherit' }}>{ parseInt(item['preorder']) == 0 ? item['unix_time_to_client'] : '' }</TableCell>
                  </TableRow>
                )
                  :
                null
                }
                
                
              </TableBody>
            </Table>
          </TableContainer>
        
        </Grid>
        
        
        
      </Grid>
    )
  }
}

export function ordercook() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <OrderCook classes={classes} />
    </div>
  );
}