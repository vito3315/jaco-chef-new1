import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MySelect, MyTextInput } from '../../stores/elements';

import axios from 'axios';
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

class SocialNetwork_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'socialnetwork',
      module_name: '',
      is_load: false,
      
      cityList: [],
      city_id: 0,

      dataInfo: null,
      file: null
    };
  }
  
  async componentDidMount(){
    let data = await this.getData('get_all');
    
    this.setState({
      module_name: data.module_info.name,
      cityList: data.cities,
      city_id: data.cities[0].id
    })
    
    document.title = data.module_info.name;

    setTimeout( () => {
      this.updateData();
    }, 50 )
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
   
  changeCity(event){
    let data = event.target.value;
    
    this.setState({
      city_id: data,
      dataInfo: null,
      file: null
    })
    
    setTimeout( () => {
      this.updateData();
    }, 50 )
  }

  async updateData(){
    let data = {
      city_id: this.state.city_id
    };

    let res = await this.getData('get_data', data);

    this.setState({
      dataInfo: res,
      file: null
    })
  }

  changeData(type, event){
    let data = event.target.value;
    let info = this.state.dataInfo;
    
    info[ [type] ] = data;

    this.setState({
      dataInfo: info
    })
  }

  async saveData(){
    let data = {
      city_id: this.state.city_id,
      vk: this.state.dataInfo.vk,
      inst: this.state.dataInfo.inst,
      ok: this.state.dataInfo.ok,
      tg: this.state.dataInfo.tg,
      fb: this.state.dataInfo.fb,
      file1: this.state.file ? this.state.file.name : ''
    };

    let res = await this.getData('save_data', data);
    
    if( this.state.file ){
      setTimeout( () => {
        this.setState({
          is_load: true
        })
      }, 350 )
      
      
      
      const formData = new FormData(); 
    
      formData.append( 
        "file", 
        this.state.file, 
        this.state.file.name 
      ); 
    
      //console.log(this.state.file); 
    
      axios.post('https://jacochef.ru/api/files/v2/upload/upload.php', formData)
        .then( (response) => {
          console.log(response);
          this.setState({
            is_load: false,
            file: null
          })
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  handleFileInput(event){
    let data = event.target.files[0];

    console.log( data )

    this.setState({
      file: data
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
          
          <Grid item xs={6} sm={6}>
            <MySelect data={this.state.cityList} value={this.state.city_id} func={ this.changeCity.bind(this) } label='Город' />
          </Grid>
          
          {this.state.dataInfo == null ? null :
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <MyTextInput label="Вконтакте" value={this.state.dataInfo ? this.state.dataInfo.vk : ''} func={this.changeData.bind(this, 'vk')} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MyTextInput label="Инстаграм" value={this.state.dataInfo ? this.state.dataInfo.inst : ''} func={this.changeData.bind(this, 'inst')} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <MyTextInput label="Одноклассники" value={this.state.dataInfo ? this.state.dataInfo.ok : ''} func={this.changeData.bind(this, 'ok')} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MyTextInput label="Телеграм" value={this.state.dataInfo ? this.state.dataInfo.tg : ''} func={this.changeData.bind(this, 'tg')} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MyTextInput label="Facebook" value={this.state.dataInfo ? this.state.dataInfo.fb : ''} func={this.changeData.bind(this, 'fb')} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <MyTextInput type="file" label="" func={this.handleFileInput.bind(this)} />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" onClick={this.saveData.bind(this)}>Обновить данные</Button>
                </Grid>

              </Grid>
            </Grid>
          }
        
          
        </Grid>
      </>
    )
  }
}

export function SocialNetwork () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <SocialNetwork_ classes={classes} history={history} />
  );
}