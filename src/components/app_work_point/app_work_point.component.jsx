import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

import { MyTextInput, MySelect } from '../../stores/elements';

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

class AppWorkPoint_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'app_work_point',
      module_name: '',
      is_load: false,
      
      points: [],
      point_id: 0,

      apps: [],
      app_id: 0,

      allList: [],
      allListRender: [],
      thisList: []
    };
  }
  
  async componentDidMount(){
    let data = await this.getData('get_all');
    
    this.setState({
      module_name: data.module_info.name,
      points: data.points,
      point_id: data.points[0].id,
      apps: data.apps,
      app_id: data.apps[0].id
    })
    
    document.title = data.module_info.name;

    setTimeout( () => {
      this.getWorks();
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
      this.setState({
        is_load: false
      })
    });
  }
   
  changeApp(event){
    this.setState({
      app_id: event.target.value
    });

    setTimeout( () => {
      this.getWorks();
    }, 300 )
  }

  async getWorks(){
    let data = {
      point_id: this.state.point_id,
      app_id: this.state.app_id
    };

    let res = await this.getData('get_works', data);

    console.log( res )

    this.setState({
      allList: res.all_work,
      thisList: res.this_work,
    })

    setTimeout( () => {
      this.checkList();
    }, 300 )
  }

  checkList(){
    let allList = this.state.allList;
    let thisList = this.state.thisList;

    thisList.map( (Titem) => {
      let newArr = [];

        allList.map( (Aitem) => {
          if( parseInt(Aitem.id) != parseInt(Titem.id) ){
            newArr.push(Aitem);
          }
        })

        allList = newArr;
    } )

    this.setState({
      allListRender: allList
    })
  }

  add(id, name){
    let check = false;

    let thisList = this.state.thisList;

		thisList.map(function(item, key){
			if( parseInt(item['id']) == parseInt(id) ){
				check = true;
			}
		})

		if( !check ){
			thisList.push({id: id, name: name, time_min: 0})
		}

		this.setState({
      thisList: thisList
    })

    setTimeout( () => {
      this.checkList();
    }, 300 )
  }

  del(id, name){
    let new_arr = [];
    let thisList = this.state.thisList;

		thisList.map(function(item, key){
			if( parseInt(item['id']) != parseInt(id) ){
				new_arr.push( item )
			}
		})

		this.setState({
      thisList: new_arr
    })

    setTimeout( () => {
      this.checkList();
    }, 300 )
	}

  async save(){
    let data = {
      point_id: this.state.point_id,
      app_id: this.state.app_id,
      items: this.state.thisList
    };

    let res = await this.getData('save', data);

    console.log( res )

    alert(res.text)
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

          <Grid item xs={12} sm={3}>
            <MySelect classes={this.state.classes} data={this.state.points} value={this.state.point_id} func={ (event) => { this.setState({ point_id: event.target.value }) } } label='Точка' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MySelect classes={this.state.classes} data={this.state.apps} value={this.state.app_id} func={ this.changeApp.bind(this) } label='Должность' />
          </Grid>

          <Grid item xs={12} sm={3}>
            <Button variant="contained" onClick={this.getWorks.bind(this)}>Обновить данные</Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <List style={{ width: '100%' }}>
              { this.state.allListRender.map( (item, key) =>
                <ListItem key={key} style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <ListItemText primary={ item.name } />
                  <SendIcon onClick={this.add.bind(this, item.id, item.name)} />
                </ListItem>
              ) }
            </List>
          </Grid>

          <Grid item xs={12} sm={6}>
            <List style={{ width: '100%' }}>
              { this.state.thisList.map( (item, key) =>
                <ListItem key={key} style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <ListItemText primary={ item.name } />
                  <CloseIcon onClick={this.del.bind(this, item.id, item.name)}/>
                </ListItem>
              ) }
            </List>
          </Grid>
        
          <Grid item xs={12} sm={3}>
            <Button variant="contained" onClick={this.save.bind(this)}>Сохранить</Button>
          </Grid>

        </Grid>
      </>
    )
  }
}

export function AppWorkPoint(){
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <AppWorkPoint_ classes={classes} history={history} />
  );
}