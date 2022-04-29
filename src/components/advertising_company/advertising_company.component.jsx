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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import ListItemIcon from '@mui/material/ListItemIcon';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { MyTextInput, MyDatePickerNew, MySelect, MyAutocomplite, MyCheckBox } from '../../stores/elements';

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
    
class AdvertisingCompany_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'advertising_company',
      module_name: '',
      description: '',
      is_load: false,
      
      cats: [],
      
      modalDialog: false,
      modalDialogNew: false,
      rangeDate: [formatDate(new Date()), formatDate(new Date())],
      date_start: formatDate(new Date()),
      date_end: formatDate(new Date()),

      point_id: 0,
      points: [],
      choosePoint: [],
      points_filter: [],

      is_active: 1,
      id: 0,

      nameCat: '',
      editText: '',

      name: '',
      editTextNew: '',

      showItem: null
    };
  }
  
  async componentDidMount(){
    let data = await this.getData('get_all');
    
    this.setState({
        module_name     : data.module_info.name,
        cats            : data.cats,
        points          : data.points,
        points_filter   : data.points
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
   
  openCat(item) {
    this.setState({
      modalDialog     : true,
      showItem        : true,
      name            : item.name,
      rangeDate       : [formatDate(item.date_start), formatDate(item.date_end)],
      is_active       : item.is_active,
      id              : item.id,
      description     : item.description,
      choosePoint     : item.choosePoint,
    })
    console.log('modalDialog2=' + this.state.modalDialog);
  }

  async save(){
     let data = {
        id          : this.state.id,
        points      : this.state.choosePoint,
        name        : this.state.name,
        //rangeDate   : this.state.rangeDate,
        date_start  : this.state.date_start,
        date_end    : this.state.date_end,
        is_active   : this.state.is_active,
        id          : this.state.id,
        description : this.state.description,
     };

     let res = await this.getData('save_edit', data);

      if (res.st === false) {
            console.log('res false');
            alert(res.text)
      } else {
            console.log('res true');
            this.setState({ 
                 modalDialog: false, 
                 // showItem: null, 
                 // nameCat: '' 
            })

          res = await this.getData('get_all');

           // оновляем список 
          this.setState({
            cats: res.cats
          })

      }   
  }

  async saveNew(){
      let data = {
          points        : this.state.choosePoint,
          name          : this.state.name,
          date_start    : this.state.date_start,
          date_end      : this.state.date_end,
          is_active     : this.state.is_active,
          description   : this.state.description
      };

    let res = await this.getData('save_new', data);

      if (res.st === false) {
          console.log('res false');
          alert(res.text)
      } else {
          console.log('res true');
          this.setState({ 
            modalDialogNew: false, 
           //editTextNew: '', 
            //nameCatNew: '' 
          })

          res = await this.getData('get_all');
    
          this.setState({
            cats: res.cats
          })
      }
    }

  changeChekBox(type, event) {
      this.setState({
          [type]: event.target.checked
      })
  }

  changeDateRange(data, val) {
    this.setState({
      [data]: formatDate(val)
    })
  }

  // смена точки
  changePoint(event) {
    this.setState({
        point_id: event.target.value
    })

    setTimeout(() => {
        this.getAdvList();
    }, 50)
  }

  // получение спиок рек. компаний по точки
  async getAdvList() {
      let data = {
          point_id: this.state.point_id,
      };

      let res = await this.getData('get_adv_point', data);

      this.setState({
          cats: res.cats,
      })
  }

  render(){
    return (
      <>
        <Backdrop className={this.state.classes.backdrop} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        { !this.state.showItem ? null :
          <Dialog
            open={this.state.modalDialog}
               onClose={() => { this.setState({ modalDialog: false, showItem: null, editText: '', name: '' }) } }
          >
            <DialogTitle>Компания "{this.state.name}"</DialogTitle>
            <DialogContent style={{ paddingTop: 10 }}>
              
              <Grid container spacing={3}>
                
                <Grid item xs={12} sm={12}>
                    <MyTextInput classes={this.state.classes} value={this.state.name} func={(event) => { this.setState({ name: event.target.value }) }} label='Название акции' />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <MyDatePickerNew label="Дата от" value={ this.state.date_start } func={ this.changeDateRange.bind(this, 'date_start') } />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MyDatePickerNew label="Дата от" value={ this.state.date_end } func={ this.changeDateRange.bind(this, 'date_end') } />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <MyAutocomplite classes={this.state.classes} data={this.state.points} value={this.state.choosePoint} func={(event, data) => { this.setState({ choosePoint: data }) }} multiple={true} label='Точка' />
                </Grid>

                <Grid item xs={12} sm={12}>
                     <MyTextInput classes={this.state.classes} value={this.state.description} func={(event) => { this.setState({ description: event.target.value }) }} label='Описание' />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <MyCheckBox label='Показать акцию' value={this.state.is_active == 1 ? true : false} func={this.changeChekBox.bind(this, 'is_active')} />
                </Grid>
                 
              </Grid>

            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.save.bind(this)}>Сохранить</Button>
            </DialogActions>
          </Dialog>
        }

        <Dialog
          open={this.state.modalDialogNew}
                onClose={() => { this.setState({ modalDialogNew: false, description: '', rangeDate: [formatDate(new Date()), formatDate(new Date())], choosePoint: [] }) } }
        >
          <DialogTitle>Новая акция</DialogTitle>
          <DialogContent style={{ paddingTop: 10 }}>
            
            <Grid container spacing={3}>
              
               <Grid item xs={12} sm={12}>
                  <MyTextInput classes={this.state.classes} value={this.state.name} func={(event) => { this.setState({ name: event.target.value }) } } label='Название компании' />
               </Grid>

                <Grid item xs={12} sm={6}>
                  <MyDatePickerNew label="Дата от" value={ this.state.date_start } func={ this.changeDateRange.bind(this, 'date_start') } />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MyDatePickerNew label="Дата от" value={ this.state.date_end } func={ this.changeDateRange.bind(this, 'date_end') } />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <MyAutocomplite classes={this.state.classes} data={this.state.points} value={this.state.choosePoint} func={(event, data) => { this.setState({ choosePoint: data }) }} multiple={true} label='Точка' />
                </Grid>
               
                <Grid item xs={12} sm={12}>
                     <MyTextInput classes={this.state.classes} value={this.state.description} func={(event) => { this.setState({ description: event.target.value }) }} label='Описание'  />
                 </Grid>

                <Grid item xs={12} sm={6}>
                     <MyCheckBox label='Показать акцию' value={this.state.is_active == 1 ? true : false} func={this.changeChekBox.bind(this, 'is_active')} />
                </Grid>
            </Grid>

          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.saveNew.bind(this)}>Сохранить</Button>
          </DialogActions>
        </Dialog>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button variant="contained" color="primary" onClick={ () => { this.setState({ modalDialogNew: true }) } }>Добавить акцию</Button>
          </Grid>

           <Grid item xs={12} sm={6}>
               <MySelect data={this.state.points_filter} value={this.state.point_id} func={this.changePoint.bind(this)} label='Точка' />
            </Grid>

          <Grid item xs={12} sm={12}>
            <List style={{ width: '100%' }}>
              {!this.state.cats  ? null : 
                this.state.cats.map((item, key) =>
                  <ListItem button key={key} onClick={this.openCat.bind(this, item)} style={{ marginLeft: 10 }} >
                    <ListItemIcon>
                      {item.is_active == '1' ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </ListItemIcon>
                    <ListItemText primary={ item.name } />
                  </ListItem>
              )}
                
            </List>
          </Grid>
        
        </Grid>
      </>
    )
  }
}

export function AdvertisingCompany () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <AdvertisingCompany_ classes={classes} history={history} />
  );
}