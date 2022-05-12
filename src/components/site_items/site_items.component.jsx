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
import Paper from '@mui/material/Paper';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

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

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MySelect, MyCheckBox, MyAutocomplite, MyTextInput, MyDatePickerNew } from '../../stores/elements';

import Dropzone from "dropzone";

const queryString = require('query-string');

const theme = createTheme({
  palette: {
    primary: {
      main: '#c03',
    }
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
  },
  backdrop: {
    zIndex: 999
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

class SiteItems_ extends React.Component {
  dropzoneOptions = {
    autoProcessQueue: false,
    autoQueue: true,
    maxFiles: 1,
    timeout: 0,
    parallelUploads: 10,
    acceptedFiles: "image/jpeg,image/png",
    addRemoveLinks: true,
    url: "https://jacochef.ru/src/img/users/upload.php",
  };
  myDropzone = null;
  isInit = false;

  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'site_items',
      module_name: '',
      is_load: false,
      
      
      allItems: [],
      vendor_items: [],

      modalItemEdit: false,
      modalItemNew: false,

      itemEdit: null,
      itemName: '',

      checkArtDialog: false,
      checkArtList: [],

      freeItems: [],




      point_list: [],
      point_list_render: [],
      point_id: 0,

      app_list: [],
      app_id: -1,

      users: [],
      //editItem: null,
      modalUserEdit: false,
      modalUserNew: false,

      textDel: '',
      delModal: false,

      graphModal: false,
      graphType: 0,





      editItem: null,
      modalEdit: false,
      types: [
        { id: 1, name: 'Позиция (ролл)' },
        { id: 2, name: 'Набор (сет)' },
        { id: 3, name: 'Доп (палочки / соевый / ...)' },
        { id: 4, name: 'Напиток' },
      ],
      cats: [],
      cat_list: [],

      ItemTab: '1'
    };
  }
  
  async componentDidMount(){
    
    let data = await this.getData('get_all');
    
    this.setState({
      module_name: data.module_info.name,
      cats: data.cats,
      cat_list: data.cat_list
    })
    
    document.title = data.module_info.name;
  }
  
  getData = (method, data = {}, is_load = true) => {
    
    if( is_load == true ){
      this.setState({
        is_load: true
      })
    }
    
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
   
  changeSort(type, event){
    this.setState({
      [type]: event.target.value
    })

    setTimeout( () => {
      this.getUsers();
    }, 300 )
  }

  async getUsers(){
    let data = {
      point_id: this.state.point_id,
      app_id: this.state.app_id
    };

    let res = await this.getData('getUsers', data);

    this.setState({
      users: res
    })
  }

  async openeditItem(user_id){
    let data = {
      user_id: user_id
    };

    let res = await this.getData('getUser', data);

    console.log( res )

    this.setState({
      editItem: res,
      modalUserEdit: true
    })

    setTimeout( () => {
      this.sortPoint();

      this.myDropzone = new Dropzone("#for_img_edit", this.dropzoneOptions);
    }, 300 )
  }

  async openNewUser(){
    let res = await this.getData('getAllForNew');

    console.log( res )

    this.setState({
      editItem: res,
      modalUserNew: true
    })

    setTimeout( () => {
      this.sortPoint();

      this.myDropzone = new Dropzone("#for_img_new", this.dropzoneOptions);
    }, 300 )
  }

  

  sortPoint(){
    let city_id = this.state.editItem.user.city_id;
    let points = this.state.editItem.point_list;
    let points_render = [];

    if( parseInt(city_id) == -1 ){
      points_render = points;
    }else{
      points_render = points.filter( ( item ) => parseInt(item.city_id) == parseInt(city_id) || parseInt(item.city_id) == -1 );
    }

    this.setState({
      point_list_render: points_render
    })
  }

  async saveeditItem(){

    let is_graph = false;

    this.state.app_list.map( (item, key) => {
      if( parseInt(this.state.editItem.user.app_id) == parseInt(item.id) ){

        if( parseInt(item.is_graph) == 1 && parseInt(this.state.graphType) == 0 ){
          is_graph = true;
        }
      }
    } )

    if( is_graph === true ){
      this.setState({
        graphModal: true
      })

      return ;
    }

    if( parseInt(this.state.editItem.user.app_id) == 0 && this.state.textDel.length == 0 ){

      this.setState({
        delModal: true
      })

      return;
    }

    if( this.myDropzone['files'].length > 0 && this.isInit === false ){
      this.isInit = true;

      this.myDropzone.on("sending", (file, xhr, data) => {
        let user_id = this.state.editItem.user.id;

        let file_type = (file.name).split('.');
        file_type = file_type[file_type.length - 1];
        file_type = file_type.toLowerCase();
        
        console.log('user_id='+user_id)

        data.append("filetype", 'user_'+user_id+'.'+file_type);
        data.append("filename", 'user_'+user_id);
        
        this.getOrientation(file, function(orientation) {
          data.append("orientation", orientation);
        })
        console.log('sending');
      });

      this.myDropzone.on("queuecomplete", (data) => {

        var check_img = false;

        console.log('queuecomplete!')

        this.myDropzone['files'].map(function(item, key){
          if( item['status'] == "error" ){
            check_img = true;
          }
        })
        
        if( check_img ){
          alert('Ошибка при загрузке фотографии')
          return;
        }
        
        console.log( 'queuecomplete' )
        
        this.setState({ 
          modalUserEdit: false, 
          editItem: null
        })
  
        this.isInit = false;
        this.getUsers();
      })
    }

    let data = {
      user: this.state.editItem,
      textDel: this.state.textDel,
      graphType: this.state.graphType
    };

    let res = await this.getData('saveeditItem', data);

    console.log( res )

    if( res.st === false ){
      alert(res.text);
    }else{

      if( this.myDropzone['files'].length == 0 ){
        this.isInit = false;

        this.setState({ 
          modalUserEdit: false, 
          editItem: null
        })

        this.getUsers();
      }else{
        this.myDropzone.processQueue();
      }
    }
  }

  async saveNewUser(){
    let is_graph = false;
    let is_graph_ = false;

    console.log( this.state.app_list )

    this.state.app_list.map( (item, key) => {
      if( parseInt(this.state.editItem.user.app_id) == parseInt(item.id) ){

        if( parseInt(item.is_graph) == 1 ){
          is_graph_ = true;
        }

        if( parseInt(item.is_graph) == 1 && parseInt(this.state.graphType) == 0 ){
          is_graph = true;
        }
      }
    } )

    if( is_graph_ === true && this.myDropzone['files'].length == 0 ){
      alert('Необходимо фотография сотрудника');
      return ;
    }

    if( this.myDropzone['files'].length > 0 && this.isInit === false ){
      this.isInit = true;

      this.myDropzone.on("sending", (file, xhr, data) => {
        let user_id = this.state.editItem.user.id;

        let file_type = (file.name).split('.');
        file_type = file_type[file_type.length - 1];
        file_type = file_type.toLowerCase();
        
        console.log('user_id='+user_id)

        data.append("filetype", 'user_'+user_id+'.'+file_type);
        data.append("filename", 'user_'+user_id);
        
        this.getOrientation(file, function(orientation) {
          data.append("orientation", orientation);
        })
        console.log('sending');
      });

      this.myDropzone.on("queuecomplete", (data) => {

        var check_img = false;

        console.log('queuecomplete!')

        this.myDropzone['files'].map(function(item, key){
          if( item['status'] == "error" ){
            check_img = true;
          }
        })
        
        if( check_img ){
          alert('Ошибка при загрузке фотографии')
          return;
        }
        
        console.log( 'queuecomplete' )
        
        this.setState({ 
          modalUserNew: false, 
          editItem: null
        })
  
        this.isInit = false;
        this.getUsers();
      })
    }

    let data = {
      user: this.state.editItem,
      graphType: is_graph === true ? 1 : 0
    };

    let res = await this.getData('saveNewUser', data);

    console.log( res )

    if( res.st === false ){
      alert(res.text);
    }else{

      if( res.sms === false ){
        alert('Ошибка в отправке смс');
      }

      if( this.myDropzone['files'].length == 0 ){
        this.isInit = false;

        this.setState({ 
          modalUserEdit: false, 
          editItem: null
        })

        this.getUsers();
      }else{
        let user = this.state.editItem;
        user.user.id = res.user_id;

        this.setState({
          editItem: user
        })

        setTimeout( () => {
          this.myDropzone.processQueue();
        }, 300 )
      }
    }


  }

  getOrientation(file, callback) {
    var reader = new FileReader();
    
    reader.onload = function(event) {
        var view = new DataView(event.target.result);
    
        if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
    
        var length = view.byteLength,
          offset = 2;
    
        while (offset < length) {
        var marker = view.getUint16(offset, false);
        offset += 2;
    
        if (marker == 0xFFE1) {
          if (view.getUint32(offset += 2, false) != 0x45786966) {
            return callback(-1);
          }
            var little = view.getUint16(offset += 6, false) == 0x4949;
            offset += view.getUint32(offset + 4, little);
            var tags = view.getUint16(offset, little);
            offset += 2;
      
            for (var i = 0; i < tags; i++)
            if (view.getUint16(offset + (i * 12), little) == 0x0112)
                return callback(view.getUint16(offset + (i * 12) + 8, little));
        }else if ((marker & 0xFF00) != 0xFF00) break;
        else offset += view.getUint16(offset, false);
      }
        
        return callback(-1);
    };
    
    reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
  };



  async openItem(item){

    let data = {
      id: item.id,
    };

    let res = await this.getData('get_one', data);

    console.log(res)

    /*this.setState({
      editItem: item,
      modalEdit: true
    })*/
  }

  changeItem(data, event){
    let vendor = this.state.editItem;
    
    if( data == 'category_id' ){
      let val = event.target.value;
      let type = 1;
      let stol = vendor.stol;

      //сеты
      if( parseInt(val) == 4 ){
        type = 2;
        stol = -1;
      }

      //напитки
      if( parseInt(val) == 6 ){
        type = 4;
        stol = 0;
      }

      //соуса
      if( parseInt(val) == 7 ){
        type = 3;
        stol = 0;
      }

      vendor['type'] = type;
      vendor['stol'] = stol;
    }
    
    if( data == 'is_show' || data == 'show_site' || data == 'show_program' || data == 'is_new' || data == 'is_hit' ){
      vendor[data] = event.target.checked === true ? 1 : 0;
    }else{
      vendor[data] = event.target.value;
    }
    
    
    this.setState({ 
      editItem: vendor
    })
  }

  render(){
    return (
      <>
        <Backdrop className={this.state.classes.backdrop} open={this.state.is_load} style={{ zIndex: 999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Dialog open={this.state.delModal} onClose={() => { this.setState({ delModal: false, textDel: '' }) }}>
          <DialogTitle>Причина увольнения</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Увольнение происходит не сразу, а в полночь
            </DialogContentText>
            <Grid container spacing={3} style={{ paddingBottom: 10, paddingTop: 20 }}>
              <Grid item xs={12}>
                <MyTextInput label="Причина увольнения" value={ this.state.textDel } func={ (event) => { this.setState({ textDel: event.target.value }) } } />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" onClick={this.saveeditItem.bind(this)}>Уволить</Button>
            <Button onClick={ () => { this.setState({ delModal: false, textDel: '' }) } }>Отмена</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.graphModal} onClose={() => { this.setState({ graphModal: false, graphType: 0 }) }}>
          <DialogTitle>С какого периода применить изменения ?</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} style={{ paddingBottom: 10, paddingTop: 20 }}>

              <Grid item xs={12} sm={6}>
                <Button variant="contained" onClick={ () => { this.setState({ graphType: 1 }); this.saveeditItem() } } style={{ width: '100%' }}>С текущего периода</Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" onClick={ () => { this.setState({ graphType: 2 }); this.saveeditItem() } } style={{ width: '100%' }}>Со следующего периода</Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button variant="contained" onClick={ () => { this.setState({ graphType: -1 }); this.saveeditItem() } } style={{ width: '100%' }}>Без изменений</Button>
              </Grid>

            </Grid>
          </DialogContent>
        </Dialog>

       <Dialog
          open={this.state.modalEdit}
          fullWidth={true}
          maxWidth={'md'}
          onClose={ () => { this.setState({ modalEdit: false, editItem: null, ItemTab: '1' }) } }
        >
          <DialogTitle>Редактирвоание товара</DialogTitle>
          <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
            
            <Grid container spacing={3}>
              
            

              {this.state.editItem && this.state.modalEdit ?
                <>
                  <Grid item xs={12}>

                    <Grid container spacing={3}>

                      <Grid item xs={12}>
                        <TabContext value={this.state.ItemTab}>
                          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={ (event, value) => { this.setState({ ItemTab: value }) } } variant="fullWidth">
                              <Tab label="Основные" value="1" />
                              <Tab label="Рецепты" value="2" />
                              <Tab label="Заготовки" value="3" />
                              <Tab label="Позиции" value="4" />
                            </TabList>
                          </Box>
                          <TabPanel value="1">

                            <Grid container spacing={3}>

                              <Grid item xs={12}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} sm={4}>
                                    <MyTextInput label="Название" value={ this.state.editItem.name } func={ this.changeItem.bind(this, 'name') } />
                                  </Grid>
                                  <Grid item xs={12} sm={4}>
                                    <MyTextInput label="Короткое название (20 сим.)" value={ this.state.editItem.short_name } func={ this.changeItem.bind(this, 'short_name') } />
                                  </Grid>
                                  <Grid item xs={12} sm={4}>
                                    <MyTextInput label="Ссылка" value={ this.state.editItem.link } func={ this.changeItem.bind(this, 'link') } />
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item xs={12}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} sm={4}>
                                    <MySelect classes={this.state.classes} data={this.state.types} value={this.state.editItem.type} func={ this.changeItem.bind(this, 'type') } disabled={true} label='Тип' />
                                  </Grid>
                                  <Grid item xs={12} sm={4}>
                                    <MySelect classes={this.state.classes} data={this.state.cat_list} value={this.state.editItem.category_id} func={ this.changeItem.bind(this, 'category_id') } label='Категория' />
                                  </Grid>
                                  <Grid item xs={12} sm={4}>
                                    <MyTextInput label="Код из 1с" value={ this.state.editItem.art } func={ this.changeItem.bind(this, 'art') } />
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item xs={12}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} sm={4}>
                                    <MyTextInput label="Стол" value={ this.state.editItem.stol } func={ this.changeItem.bind(this, 'stol') } />
                                  </Grid>
                                  <Grid item xs={12} sm={4}>
                                    <MyTextInput label="Вес" value={ this.state.editItem.weight } func={ this.changeItem.bind(this, 'weight') } />
                                  </Grid>
                                  { parseInt(this.state.editItem.category_id) != 14 ?
                                    <Grid item xs={12} sm={4}>
                                      <MyTextInput label="Кол-во кусочков" value={ this.state.editItem.count_part } func={ this.changeItem.bind(this, 'count_part') } />
                                    </Grid>
                                      :
                                    <Grid item xs={12} sm={4}>
                                      <MyTextInput label="Размер пиццы" value={ this.state.editItem.size_pizza } func={ this.changeItem.bind(this, 'size_pizza') } />
                                    </Grid>
                                  }
                                </Grid>
                              </Grid>

                              

                              { parseInt( this.state.editItem.type ) != 2 ?
                                <Grid item xs={12}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={3}>
                                      <MyTextInput label="Белки" value={ this.state.editItem.protein } func={ this.changeItem.bind(this, 'protein') } />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                      <MyTextInput label="Жиры" value={ this.state.editItem.fat } func={ this.changeItem.bind(this, 'fat') } />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                      <MyTextInput label="Углеводы" value={ this.state.editItem.carbohydrates } func={ this.changeItem.bind(this, 'carbohydrates') } />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                      <MyTextInput label="Энергетическая ценность" value={ this.state.editItem.kkal } func={ this.changeItem.bind(this, 'kkal') } />
                                    </Grid>
                                  </Grid>
                                </Grid>
                                  :
                                null
                              }

                              { parseInt( this.state.editItem.type ) != 2 ?
                                <Grid item xs={12}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={4}>
                                      <MyTextInput label="Время на 1 этап (ММ:СС)" value={ this.state.editItem.time_stage_1 } func={ this.changeItem.bind(this, 'time_stage_1') } />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                      <MyTextInput label="Время на 2 этап (ММ:СС)" value={ this.state.editItem.time_stage_2 } func={ this.changeItem.bind(this, 'time_stage_2') } />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                      <MyTextInput label="Время на 3 этап (ММ:СС)" value={ this.state.editItem.time_stage_3 } func={ this.changeItem.bind(this, 'time_stage_3') } />
                                    </Grid>
                                  </Grid>
                                </Grid>
                                  :
                                null
                              }

                              <Grid item xs={12}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <Typography>Картинка соотношением сторон (3:2) (пример: 600х400) только JPG</Typography>
                                  </Grid>
                                

                                  <Grid item xs={12} sm={6}>
                                    <img src={'https://storage.yandexcloud.net/site-img/'+this.state.editItem.img_new+'600х400.jpg?'+this.state.editItem.img_new_update} style={{maxWidth: 300, maxHeight: 300}} />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <div className="dropzone" id="for_img_edit_old" style={{ width: '100%', minHeight: 150 }} />
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item xs={12}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <Typography>Картинка соотношением сторон (1:1) (пример: 600х600) только JPG</Typography>
                                  </Grid>
                                

                                  <Grid item xs={12} sm={6}>
                                    <img src={'https://storage.yandexcloud.net/site-img/'+this.state.editItem.img_new+'600х400.jpg?'+this.state.editItem.img_new_update} style={{maxWidth: 300, maxHeight: 300}} />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <div className="dropzone" id="for_img_edit_new" style={{ width: '100%', minHeight: 150 }} />
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item xs={12}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <MyTextInput label="Состав" value={ this.state.editItem.tmp_desc } func={ this.changeItem.bind(this, 'tmp_desc') } />
                                  </Grid>
                                  <Grid item xs={12}>
                                    <MyTextInput label="Маркейтинговое описание" value={ this.state.editItem.marc_desc } func={ this.changeItem.bind(this, 'marc_desc') } />
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item xs={12}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} sm={6}>
                                    <MyCheckBox label="Новинка" value={ parseInt(this.state.editItem.is_new) == 1 ? true : false } func={ this.changeItem.bind(this, 'is_new') } style={{ justifyContent: 'center' }} />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <MyCheckBox label="Хит" value={ parseInt(this.state.editItem.is_hit) == 1 ? true : false } func={ this.changeItem.bind(this, 'is_hit') } style={{ justifyContent: 'center' }} />
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item xs={12}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} sm={4}>
                                    <MyCheckBox label="Активность" value={ parseInt(this.state.editItem.is_show) == 1 ? true : false } func={ this.changeItem.bind(this, 'is_show') } style={{ justifyContent: 'center' }} />
                                  </Grid>
                                  <Grid item xs={12} sm={4}>
                                    <MyCheckBox label="На сайте" value={ parseInt(this.state.editItem.show_site) == 1 ? true : false } func={ this.changeItem.bind(this, 'show_site') } style={{ justifyContent: 'center' }} />
                                  </Grid>
                                  <Grid item xs={12} sm={4}>
                                    <MyCheckBox label="На складе" value={ parseInt(this.state.editItem.show_program) == 1 ? true : false } func={ this.changeItem.bind(this, 'show_program') } style={{ justifyContent: 'center' }} />
                                  </Grid>
                                </Grid>
                              </Grid>

                            </Grid>

                          </TabPanel>
                          <TabPanel value="2">Item Two</TabPanel>
                          <TabPanel value="3">Item Three</TabPanel>
                        </TabContext>
                      </Grid>

                    </Grid>

                  </Grid>
                  
                </>
                  :
                null
              }
            </Grid>
              
          </DialogContent>
          <DialogActions>
            <Button onClick={this.saveeditItem.bind(this)} color="primary">Сохранить</Button>
          </DialogActions>
        </Dialog>
        
        <Dialog
          open={this.state.modalUserNew}
          fullWidth={true}
          maxWidth={'md'}
          onClose={ () => { this.setState({ modalUserNew: false, editItem: null }) } }
        >
          <DialogTitle>Новый сотрудник</DialogTitle>
          <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
            
            <Grid container spacing={3}>
                
                {this.state.editItem && this.state.modalUserNew ?
                  <>
                    <Grid item xs={12}>

                      <Grid container spacing={3}>

                        <Grid item xs={12}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                              <MyTextInput label="Фамилия" value={ this.state.editItem.user.fam } func={ this.changeItem.bind(this, 'fam') } />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <MyTextInput label="Имя" value={ this.state.editItem.user.name } func={ this.changeItem.bind(this, 'name') } />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <MyTextInput label="Отчество" value={ this.state.editItem.user.otc } func={ this.changeItem.bind(this, 'otc') } />
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                              <MyTextInput label="Номер телефона" value={ this.state.editItem.user.login } func={ this.changeItem.bind(this, 'login') } />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <MyDatePickerNew label="Дата рождения" value={ this.state.editItem.user.birthday } func={ this.changeItem.bind(this, 'birthday') } />
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <img src={'https://storage.yandexcloud.net/user-img/max-img/'+this.state.editItem.user['img_name']+'?'+this.state.editItem.user['img_update']} style={{maxWidth: 300, maxHeight: 300}} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <div className="dropzone" id="for_img_new" style={{ width: '100%', minHeight: 150 }} />
                            </Grid>
                          </Grid>
                          
                        </Grid>
                        

                        <Grid item xs={12}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                              <MyTextInput label="Код авторизации (4 цифры)" value={ this.state.editItem.user.auth_code } func={ this.changeItem.bind(this, 'auth_code') } />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <MyTextInput label="ИНН" value={ this.state.editItem.user.inn } func={ this.changeItem.bind(this, 'inn') } />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <MyCheckBox label="Работает официально" value={ parseInt(this.state.editItem.user.acc_to_kas) == 1 ? true : false } func={ this.changeItem.bind(this, 'acc_to_kas') } />
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                              <MySelect classes={this.state.classes} data={this.state.editItem.appointment} value={this.state.editItem.user.app_id} func={ this.changeItem.bind(this, 'app_id') } label='Должность' />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <MySelect classes={this.state.classes} data={this.state.editItem.cities} value={this.state.editItem.user.city_id} func={ this.changeItem.bind(this, 'city_id') } label='Город' />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <MySelect classes={this.state.classes} data={this.state.point_list_render} value={this.state.editItem.user.point_id} func={ this.changeItem.bind(this, 'point_id') } label='Точка' />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                    </Grid>
                    
                  </>
                    :
                  null
                }
              </Grid>
              
          </DialogContent>
          <DialogActions>
            <Button onClick={this.saveNewUser.bind(this)} color="primary">Сохранить</Button>
          </DialogActions>
        </Dialog>
        
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          <Grid item xs={12}>
          
            { this.state.cats.length == 0 ? null :

              this.state.cats.map( (cat, key) =>
                <Accordion key={key}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography>{cat.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ width: '100%', overflow: 'scroll' }}>
                    
                    <Table>
                    
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ width: '2%' }}>#</TableCell>

                          <TableCell style={{ width: '38%' }}>Название</TableCell>
                          <TableCell style={{ width: '15%' }}>Сортировка</TableCell>

                          <TableCell style={{ width: '15%' }}>Активность</TableCell>
                          <TableCell style={{ width: '15%' }}>Сайт</TableCell>
                          <TableCell style={{ width: '15%' }}>Склад</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        
                        { cat.items.map( (it, k) =>
                          <TableRow key={k}>
                            <TableCell>{k+1}</TableCell>
                            <TableCell onClick={this.openItem.bind(this, it)}>{it.name}</TableCell>
                            <TableCell>
                              <MyTextInput label="" value={it.sort} func={ () => {} } />
                            </TableCell>

                            <TableCell> 
                              { parseInt(it.is_show) == 1 ? <VisibilityIcon /> : <VisibilityOffIcon /> } 
                            </TableCell>
                            <TableCell> 
                              { parseInt(it.is_show) == 1 ? <VisibilityIcon /> : <VisibilityOffIcon /> } 
                            </TableCell>
                            <TableCell> 
                              { parseInt(it.is_show) == 1 ? <VisibilityIcon /> : <VisibilityOffIcon /> } 
                            </TableCell>

                            
                          </TableRow>           
                        ) }
                      
                      </TableBody>
                    
                    </Table>

                  </AccordionDetails>
                </Accordion>
              )
              
            }

          </Grid>
          
          
        </Grid>
      </>
    )
  }
}

export function SiteItems () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <SiteItems_ classes={classes} history={history} />
  );
}