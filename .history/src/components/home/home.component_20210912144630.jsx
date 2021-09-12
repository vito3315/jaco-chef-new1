import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const queryString = require('query-string');

const useStyles = makeStyles((theme) => ({
  formControl: {
    //margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

class Home_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      module: 'home',
      module_name: '',
      is_load: false,
      
      points: [],
      point: '0',
      showReady: false,
      read: [],
      onstol: [],
      ordersQueue: []
    };
  }
  
  async componentDidMount(){
    
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
        login: '+79879340391',
        //login: localStorage.getItem('login'),
        data: JSON.stringify( data )
      })
    }).then(res => res.json()).then(json => {
      
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
          <Grid item xs={12} sm={12}>
            
          </Grid>
        </Grid>
      </>
    )
  }
}

export function Home () {
  const classes = useStyles();
  
  return (
    <Home_ classes={classes} />
  );
}