import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MySelect, MyDatePickerNew, MyTextInput } from '../../stores/elements';
import Typography from '@mui/material/Typography';

import queryString from 'query-string';

import { useState } from 'react';

import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';

const winPrizeIndex = 1;

const TestApp = ({items}) => {



  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }




  const [start, setStart] = useState(false);

  //const prizeIndex = items.length * 4 + winPrizeIndex;
  //const prizeIndex = 150 + winPrizeIndex;

  const prizeIndex = getRandomInt(items.length);

  const handleStart = () => {
    setStart((prevState) => !prevState);
  };

  const handlePrizeDefined = () => {
    alert('🥳 Ты выйграл! 🥳\r\n'+ items[ prizeIndex ].name );
  };

  console.log( 'prizeList', items )

  return (
    <>
      <RoulettePro
        prizes={items}
        prizeIndex={prizeIndex}
        start={start}
        onPrizeDefined={handlePrizeDefined}
        spinningTime={3}
      />
      <button className='START' onClick={handleStart}>Играть</button>
    </>
  );
};

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
        <Box sx={{ p: 3 }}>{children}</Box>
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

class Test_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      module: 'test',
      module_name: '',
      is_load: false,
      
      items: []
    };
  }
  
  async componentDidMount(){
    let data = await this.getData('get_all');
    
    this.setState({
      module_name: data.module_info.name,
      //items: data.items
    })
    
    console.log( data.items )

    data.items.map( (item, key) => {
      data.items[ key ]['image'] = "https://cdnimg.jacofood.ru/"+item.img_app+"_138x138.jpg";
    } )

    document.title = data.module_info.name;

    const prizes = [
      {
        image: 'https://i.ibb.co/6Z6Xm9d/good-1.png',
        id: 1,
      },
      {
        image: 'https://i.ibb.co/T1M05LR/good-2.png',
        id: 2
      },
      {
        image: 'https://i.ibb.co/Qbm8cNL/good-3.png',
        id: 3
      },
      {
        image: 'https://i.ibb.co/5Tpfs6W/good-4.png',
        id: 4
      },
      {
        image: 'https://i.ibb.co/64k8D1c/good-5.png',
        id: 5
      },
    ];
    
    
    
    const reproductionArray = (array = [], length = 0) => [
      ...Array(length)
        .fill('_')
        .map(() => array[Math.floor(Math.random() * array.length)]),
    ];
    
    const reproducedPrizeList = [
      ...data.items,
      ...reproductionArray(data.items, data.items.length * 3),
      ...data.items,
      ...reproductionArray(data.items, data.items.length),
    ];
    
    const generateId = () =>
      `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;
    
    const prizeList = reproducedPrizeList.map((prize) => ({
      ...prize,
      id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : generateId(),
    }));

    this.setState({
      items: prizeList
    })

    setTimeout( () => {
      //this.getOrders();
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
        window.location.pathname = '/';
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
   
  async getOrders(){
    let data = {
      point_id: this.state.point_id,
      date: this.state.date
    };
    
    let res = await this.getData('get_orders', data);

    console.log( res )

    this.setState({
      orders: res.orders
    })

    setTimeout( () => {
      this.filterNumber();
    }, 300 )
  }

  btnGetOrders(){
    this.setState({
      number: '',
      addr: ''
    })

    this.getOrders();
  }

  

  

  render(){
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        

        
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          

          
          
          
          <Grid item xs={12} sm={3}>
            <Button variant="contained" onClick={this.btnGetOrders.bind(this)}>Обновить</Button>
          </Grid>
          
          <Grid item xs={12} className={'abv'}>
            <img className='fon' src='https://jacochef.ru/src/img/test/test.gif' />
            
            <div>
            { this.state.items.length == 0 ? false :
              <TestApp items={this.state.items} />
            }
            </div>
          </Grid>

          
          
        </Grid>
      </>
    )
  }
}

export function Test() {
  return (
    <Test_ />
  );
}