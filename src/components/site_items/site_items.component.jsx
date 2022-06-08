import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DehazeIcon from '@mui/icons-material/Dehaze';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MySelect, MyCheckBox, MyTextInput } from '../../stores/elements';

import Dropzone from "dropzone";

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

const queryString = require('query-string');

class TableStages extends React.Component{
  render (){
    return (
      <Table size='small' style={{ marginBottom: 50 }}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={5} style={{ textAlign: 'center' }}>{this.props.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Количество</TableCell>
            <TableCell></TableCell>
            <TableCell>Сортировка</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { this.props.data.map( (item, key) =>
            <TableRow key={key}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <MyTextInput label="" value={item.count} func={ this.props.changeData.bind(this, this.props.type, this.props.arr, 'count', key) } />
              </TableCell>
              <TableCell>{item.ei_name}</TableCell>
              <TableCell style={{ maxWidth: 100 }}>
                <MyTextInput label="" value={item.sort} func={ this.props.changeData.bind(this, this.props.type, this.props.arr, 'sort', key) } />
              </TableCell>
              <TableCell>
                <CloseIcon onClick={this.props.delItem.bind(this, this.props.type, this.props.arr, key) } style={{ cursor: 'pointer' }} />
              </TableCell>
            </TableRow>
          ) }
        </TableBody>
      </Table>
    )
  }
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
    url: "https://jacochef.ru/src/img/site_img/upload_img_new.php",
  };
  myDropzoneOld = null;
  myDropzoneNew = null;

  constructor(props) {
    super(props);
        
    this.state = {
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
      item_rec: null,
      item_pf: null,
      item_items_all: [],
      modalEdit: false,
      modalNew: false,
      types: [
        { id: 1, name: 'Позиция (ролл)' },
        { id: 2, name: 'Набор (сет)' },
        { id: 3, name: 'Доп (палочки / соевый / ...)' },
        { id: 4, name: 'Напиток' },
      ],
      cats: [],
      cat_list: [],

      ItemTab: '1',
      anchorEl: null,
      openMenu: false,
      openMenuType: null,
      openMenuitem: null,

      rec_stage_1: [],
      rec_stage_2: [],
      rec_stage_3: [],

      pf_stage_1: [],
      pf_stage_2: [],
      pf_stage_3: [],

      item_items: [],

      myDropzoneOld: null,
      myDropzoneNew: null,

      is_snack: false,
      textSnack: '',

      searchPf: '',
      item_pf_render: [],

      searchItems: '',
      item_items_render: [],
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
  
  async getItems(){
    let data = await this.getData('get_all');
    
    this.setState({
      cats: data.cats,
      cat_list: data.cat_list
    })
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
      setTimeout( () => {
        this.setState({
          is_load: false
        })
      }, 300 )
      console.log( err )
    });
  }  

  async openItem(item){
    let data = {
      id: item.id,
    };

    let res = await this.getData('get_one', data);

    var items_pf_stages_1 = [],
			items_pf_stages_2 = [],
			items_pf_stages_3 = [],
			
			items_rec_stages_1 = [],
			items_rec_stages_2 = [],
			items_rec_stages_3 = [],

      items_items = [];

    if(res.item_rec.stage_1){
      res.item_rec.stage_1.map(function(item){
        items_rec_stages_1.push({item_id: item['rec_id'], name: item['name'], count: item['count'], sort: item['sort'], ei_name: item['ei_name']});
      })
    }
    if(res.item_rec.stage_2){
      res.item_rec.stage_2.map(function(item){
        items_rec_stages_2.push({item_id: item['rec_id'], name: item['name'], count: item['count'], sort: item['sort'], ei_name: item['ei_name']});
      })
    }
    if(res.item_rec.stage_3){
      res.item_rec.stage_3.map(function(item){
        items_rec_stages_3.push({item_id: item['rec_id'], name: item['name'], count: item['count'], sort: item['sort'], ei_name: item['ei_name']});
      })
    }


    if(res.item_pf.stage_1){
			res.item_pf.stage_1.map(function(item){
				items_pf_stages_1.push({item_id: item['pf_id'], name: item['name'], count: item['count'], sort: item['sort'], ei_name: item['ei_name']});
			})
		}
		if(res.item_pf.stage_2){
			res.item_pf.stage_2.map(function(item){
				items_pf_stages_2.push({item_id: item['pf_id'], name: item['name'], count: item['count'], sort: item['sort'], ei_name: item['ei_name']});
			})
		}
		if(res.item_pf.stage_3){
			res.item_pf.stage_3.map(function(item){
				items_pf_stages_3.push({item_id: item['pf_id'], name: item['name'], count: item['count'], sort: item['sort'], ei_name: item['ei_name']});
			})
		}

    
		
		if(res.item_items.this_items){
			res.item_items.this_items.map(function(item){
				items_items.push({item_id: item['item_id'], name: item['name'], count: item['count'], is_add: parseInt(item['is_add']) });
			})
		}
		

		this.setState({
      editItem: res.item,
      item_rec: res.item_rec,
      item_pf: res.item_pf,
      item_pf_render: res.item_pf.all,
      item_items_all: res.item_items.all_items,
      item_items_render: res.item_items.all_items,

      rec_stage_1: items_rec_stages_1,
      rec_stage_2: items_rec_stages_2,
      rec_stage_3: items_rec_stages_3,

      pf_stage_1: items_pf_stages_1,
      pf_stage_2: items_pf_stages_2,
      pf_stage_3: items_pf_stages_3,

      item_items: items_items,

      modalEdit: true
    })

    setTimeout( () => {
      this.myDropzoneOld = new Dropzone("#for_img_edit_old", this.dropzoneOptions);
      this.myDropzoneNew = new Dropzone("#for_img_edit_new", this.dropzoneOptions);
    }, 300 )
  }

  async openNew(){
    let res = await this.getData('get_all_for_new');

    var items_pf_stages_1 = [],
			items_pf_stages_2 = [],
			items_pf_stages_3 = [],
			
			items_rec_stages_1 = [],
			items_rec_stages_2 = [],
			items_rec_stages_3 = [],

      items_items = [];

    this.setState({
      editItem: res.item,
      item_rec: res.item_rec,
      item_pf: res.item_pf,
      item_pf_render: res.item_pf.all,
      item_items_all: res.item_items.all_items,
      item_items_render: res.item_items.all_items,

      rec_stage_1: items_rec_stages_1,
      rec_stage_2: items_rec_stages_2,
      rec_stage_3: items_rec_stages_3,

      pf_stage_1: items_pf_stages_1,
      pf_stage_2: items_pf_stages_2,
      pf_stage_3: items_pf_stages_3,

      item_items: items_items,

      modalNew: true
    })

    setTimeout( () => {
      this.myDropzoneOld = new Dropzone("#for_img_edit_old", this.dropzoneOptions);
      this.myDropzoneNew = new Dropzone("#for_img_edit_new", this.dropzoneOptions);
    }, 300 )
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

  closeMenu(){
    this.setState({
      anchorEl: null,
      openMenu: false,
      openMenuType: null,
      openMenuitem: null
    })
  }

  openMenu(type, item, event){
    this.setState({
      anchorEl: event.currentTarget,
      openMenu: true,
      openMenuType: type,
      openMenuitem: item
    })
  }

  chooseStage(stage){
    if( this.state.openMenuType == 'rec' ){
      let check = false;

      let rec = stage == 1 ? this.state.rec_stage_1 : stage == 2 ? this.state.rec_stage_2 : stage == 3 ? this.state.rec_stage_3 : [];

      rec = rec ? rec : [];	
      
      rec.map((this_item) => {
        if(parseInt(this.state.openMenuitem.id) == parseInt(this_item.item_id) ){
          check = true;
        }
      })

      if( !check ){

        rec.push({item_id: this.state.openMenuitem.id, name: this.state.openMenuitem.name, count: 0, sort: 0, ei_name: this.state.openMenuitem.ei_name});

        if( stage == 1 ){
					this.setState({
						rec_stage_1: rec
					});
				}
				
				if( stage == 2 ){
					this.setState({
						rec_stage_2: rec
					});
				}
				
				if( stage == 3 ){
					this.setState({
						rec_stage_3: rec
					});
				}
      }
    }

    if( this.state.openMenuType == 'pf' ){
      let check = false;

      let rec = stage == 1 ? this.state.pf_stage_1 : stage == 2 ? this.state.pf_stage_2 : stage == 3 ? this.state.pf_stage_3 : [];

      rec = rec ? rec : [];	
      
      rec.map((this_item) => {
        if(parseInt(this.state.openMenuitem.id) == parseInt(this_item.item_id) ){
          check = true;
        }
      })

      if( !check ){

        rec.push({item_id: this.state.openMenuitem.id, name: this.state.openMenuitem.name, count: 0, sort: 0, ei_name: this.state.openMenuitem.ei_name});

        if( stage == 1 ){
					this.setState({
						pf_stage_1: rec
					});
				}
				
				if( stage == 2 ){
					this.setState({
						pf_stage_2: rec
					});
				}
				
				if( stage == 3 ){
					this.setState({
						pf_stage_3: rec
					});
				}
      }
    }

    this.closeMenu();
  }

  forwardItem(item){
    let check = false;

    let rec = this.state.item_items;

    rec = rec ? rec : [];	
    
    rec.map((this_item) => {
      if(parseInt(item.id) == parseInt(this_item.item_id) ){
        check = true;
      }
    })

    if( !check ){

      rec.push({item_id: item.id, name: item.name, count: 1, is_add: 0});

      this.setState({
        item_items: rec
      });
    }
  }

  changeData(type, arr, data, key, event){
    if( type == 'rec' ){
      let rec = arr == 'rec_stage_1' ? this.state.rec_stage_1 : arr == 'rec_stage_2' ? this.state.rec_stage_2 : arr == 'rec_stage_3' ? this.state.rec_stage_3 : [];

      rec[ key ][ data ] = event.target.value;

      if( arr == 'rec_stage_1' ){
        this.setState({
          rec_stage_1: rec
        });
      }
      
      if( arr == 'rec_stage_2' ){
        this.setState({
          rec_stage_2: rec
        });
      }
      
      if( arr == 'rec_stage_3' ){
        this.setState({
          rec_stage_3: rec
        });
      }
    }

    if( type == 'pf' ){
      let rec = arr == 'pf_stage_1' ? this.state.pf_stage_1 : arr == 'pf_stage_2' ? this.state.pf_stage_2 : arr == 'pf_stage_3' ? this.state.pf_stage_3 : [];

      rec[ key ][ data ] = event.target.value;

      if( arr == 'pf_stage_1' ){
        this.setState({
          pf_stage_1: rec
        });
      }
      
      if( arr == 'pf_stage_2' ){
        this.setState({
          pf_stage_2: rec
        });
      }
      
      if( arr == 'pf_stage_3' ){
        this.setState({
          pf_stage_3: rec
        });
      }
    }

    if( type == 'item' ){
      let rec = this.state.item_items;

      if( data == 'is_add' ){
        rec[ key ][ data ] = event.target.checked === true ? 1 : 0;
      }else{
        rec[ key ][ data ] = event.target.value;
      }
      
      this.setState({
        item_items: rec
      });
    }
  }

  delItem(type, arr, key){
    if( type == 'rec' ){
      let rec = arr == 'rec_stage_1' ? this.state.rec_stage_1 : arr == 'rec_stage_2' ? this.state.rec_stage_2 : arr == 'rec_stage_3' ? this.state.rec_stage_3 : [];

      rec.splice(key, 1);

      rec = rec ? rec : [];

      if( arr == 'rec_stage_1' ){
        this.setState({
          rec_stage_1: rec
        });
      }
      
      if( arr == 'rec_stage_2' ){
        this.setState({
          rec_stage_2: rec
        });
      }
      
      if( arr == 'rec_stage_3' ){
        this.setState({
          rec_stage_3: rec
        });
      }
    }

    if( type == 'pf' ){
      let rec = arr == 'pf_stage_1' ? this.state.pf_stage_1 : arr == 'pf_stage_2' ? this.state.pf_stage_2 : arr == 'pf_stage_3' ? this.state.pf_stage_3 : [];

      rec.splice(key, 1);

      rec = rec ? rec : [];

      if( arr == 'pf_stage_1' ){
        this.setState({
          pf_stage_1: rec
        });
      }
      
      if( arr == 'pf_stage_2' ){
        this.setState({
          pf_stage_2: rec
        });
      }
      
      if( arr == 'pf_stage_3' ){
        this.setState({
          pf_stage_3: rec
        });
      }
    }

    if( type == 'item' ){
      let rec = this.state.item_items;

      rec.splice(key, 1);

      rec = rec ? rec : [];

      this.setState({
        item_items: rec
      });
    }
  }

  saveImg(dropzone, name, id, type){
    dropzone.on("sending", (file, xhr, data) => {
      let file_type = (file.name).split('.');
      file_type = file_type[file_type.length - 1];
      file_type = file_type.toLowerCase();
      
      data.append("filetype", 'user_'+id+'.'+file_type);
      data.append("filename", 'user_'+id);
      data.append("typeFile", type);
      data.append("name", name);
    });

    dropzone.on("queuecomplete", (data) => {

      var check_img = false;

      dropzone['files'].map(function(item, key){
        if( item['status'] == "error" ){
          check_img = true;
        }
      })
      
      if( check_img ){
        alert('Ошибка при загрузке фотографии '+type)
      }
    })
  }

  async saveEditItem(){
    if( this.myDropzoneOld['files'].length > 0 ){
      
      let name = this.state.editItem.name,
        id = this.state.editItem.id,
        type = 'old';

      this.myDropzoneOld.on("sending", (file, xhr, data) => {
        let file_type = (file.name).split('.');
        file_type = file_type[file_type.length - 1];
        file_type = file_type.toLowerCase();
        
        data.append("typeFile", type);
        data.append("name", name);
        data.append("id", id);
      });
  
      this.myDropzoneOld.on("queuecomplete", (data) => {
  
        var check_img = false;
  
        var myDropzoneNew = this.myDropzoneNew;

        this.myDropzoneOld['files'].map((item, key) => {
          if( item['status'] == "error" ){
            check_img = true;
          }

          if( item['status'] == "success" ){
            if( myDropzoneNew['files'][0] && myDropzoneNew['files'][0]["status"] == 'success' ){
              this.setState({ 
                modalEdit: false, 
                editItem: null, 
                ItemTab: '1'
              })

              this.getItems();
            }
          }
        })
        
        if( check_img ){
          alert('Ошибка при загрузке фотографии '+type)
        }
      })
    }

    if( this.myDropzoneNew['files'].length > 0 ){
      let name = this.state.editItem.name,
        id = this.state.editItem.id,
        type = 'new';

      this.myDropzoneNew.on("sending", (file, xhr, data) => {
        let file_type = (file.name).split('.');
        file_type = file_type[file_type.length - 1];
        file_type = file_type.toLowerCase();
        
        data.append("typeFile", type);
        data.append("name", name);
        data.append("id", id);
      });
  
      this.myDropzoneNew.on("queuecomplete", (data) => {
        var check_img = false;
  
        var myDropzoneOld = this.myDropzoneOld;

        this.myDropzoneNew['files'].map((item, key) => {  
          if( item['status'] == "error" ){
            check_img = true;
          }

          if( item['status'] == "success" ){
            if( myDropzoneOld['files'][0] && myDropzoneOld['files'][0]["status"] == 'success' ){
              this.setState({ 
                modalEdit: false, 
                editItem: null, 
                ItemTab: '1'
              })

              this.getItems();
            }
          }
        })
        
        if( check_img ){
          alert('Ошибка при загрузке фотографии '+type)
        }
      })
    }

    let data = {
      item: this.state.editItem,
      rec_stage_1: this.state.rec_stage_1,
      rec_stage_2: this.state.rec_stage_2,
      rec_stage_3: this.state.rec_stage_3,

      pf_stage_1: this.state.pf_stage_1,
      pf_stage_2: this.state.pf_stage_2,
      pf_stage_3: this.state.pf_stage_3,

      item_items: this.state.item_items,
    };

    let res = await this.getData('saveEditItem', data);

    if( res.st === false ){
      alert(res.text);
    }else{
      this.openSnack('Данные обновлены');

      if( this.myDropzoneOld['files'].length > 0 ){
        this.myDropzoneOld.processQueue();
      }

      if( this.myDropzoneNew['files'].length > 0 ){
        this.myDropzoneNew.processQueue();
      }
    }
  }

  async saveNewItem(){
    let data = {
      item: this.state.editItem,
      rec_stage_1: this.state.rec_stage_1,
      rec_stage_2: this.state.rec_stage_2,
      rec_stage_3: this.state.rec_stage_3,

      pf_stage_1: this.state.pf_stage_1,
      pf_stage_2: this.state.pf_stage_2,
      pf_stage_3: this.state.pf_stage_3,

      item_items: this.state.item_items,
    };

    let res = await this.getData('saveNewItem', data);

    console.log( res )

    if( res.st === false ){
      alert(res.text);
    }else{
      this.openSnack('Данные обновлены');

      if( this.myDropzoneOld['files'].length > 0 ){
      
        let name = this.state.editItem.name,
          id = res.id,
          type = 'old';
  
        this.myDropzoneOld.on("sending", (file, xhr, data) => {
          let file_type = (file.name).split('.');
          file_type = file_type[file_type.length - 1];
          file_type = file_type.toLowerCase();
          
          data.append("typeFile", type);
          data.append("name", name);
          data.append("id", id);
        });
    
        this.myDropzoneOld.on("queuecomplete", (data) => {
    
          var check_img = false;
    
          var myDropzoneNew = this.myDropzoneNew;
  
          this.myDropzoneOld['files'].map((item, key) => {
            if( item['status'] == "error" ){
              check_img = true;
            }
  
            if( item['status'] == "success" ){
              if( myDropzoneNew['files'][0] && myDropzoneNew['files'][0]["status"] == 'success' ){
                this.setState({ 
                  modalNew: false, 
                  editItem: null, 
                  ItemTab: '1'
                })
  
                this.getItems();
              }
            }
          })
          
          if( check_img ){
            alert('Ошибка при загрузке фотографии '+type)
          }
        })
      }
  
      if( this.myDropzoneNew['files'].length > 0 ){
        let name = this.state.editItem.name,
          id = res.id,
          type = 'new';
  
        this.myDropzoneNew.on("sending", (file, xhr, data) => {
          let file_type = (file.name).split('.');
          file_type = file_type[file_type.length - 1];
          file_type = file_type.toLowerCase();
          
          data.append("typeFile", type);
          data.append("name", name);
          data.append("id", id);
        });
    
        this.myDropzoneNew.on("queuecomplete", (data) => {
          var check_img = false;
    
          var myDropzoneOld = this.myDropzoneOld;
  
          this.myDropzoneNew['files'].map((item, key) => {  
            if( item['status'] == "error" ){
              check_img = true;
            }
  
            if( item['status'] == "success" ){
              if( myDropzoneOld['files'][0] && myDropzoneOld['files'][0]["status"] == 'success' ){
                this.setState({ 
                  modalNew: false, 
                  editItem: null, 
                  ItemTab: '1'
                })
  
                this.getItems();
              }
            }
          })
          
          if( check_img ){
            alert('Ошибка при загрузке фотографии '+type)
          }
        })
      }

      if( this.myDropzoneOld['files'].length > 0 ){
        this.myDropzoneOld.processQueue();
      }

      if( this.myDropzoneNew['files'].length > 0 ){
        this.myDropzoneNew.processQueue();
      }
    }
  }

  changeTab(event, value){

    this.setState({
      myDropzoneOld: this.myDropzoneOld['files'],
      myDropzoneNew: this.myDropzoneNew['files'],
    })

    this.setState({ 
      ItemTab: value 
    })

    if( parseInt(value) == 1 ){
      setTimeout( () => {
        this.myDropzoneOld = new Dropzone("#for_img_edit_old", this.dropzoneOptions);
        this.myDropzoneNew = new Dropzone("#for_img_edit_new", this.dropzoneOptions);

        if( this.state.myDropzoneOld[0] ){
          var mockFileOld = { 
            name: this.state.myDropzoneOld[0].name,
            size: this.state.myDropzoneOld[0].size, 
            type: this.state.myDropzoneOld[0].type, 
            status: this.state.myDropzoneOld[0].status,
            url: this.state.myDropzoneOld[0].dataURL,
            dataURL: this.state.myDropzoneOld[0].dataURL
          };

          this.myDropzoneOld.emit("addedfile", mockFileOld);
          this.myDropzoneOld.emit("thumbnail", mockFileOld, this.state.myDropzoneOld[0].dataURL);
          this.myDropzoneOld.files.push(this.state.myDropzoneOld[0]);
        }

        if( this.state.myDropzoneNew[0] ){
          var mockFileNew = { 
            name: this.state.myDropzoneNew[0].name,
            size: this.state.myDropzoneNew[0].size, 
            type: this.state.myDropzoneNew[0].type, 
            status: this.state.myDropzoneNew[0].status,
            url: this.state.myDropzoneNew[0].dataURL,
            dataURL: this.state.myDropzoneNew[0].dataURL
          };

          this.myDropzoneNew.emit("addedfile", mockFileNew);
          this.myDropzoneNew.emit("thumbnail", mockFileNew, this.state.myDropzoneNew[0].dataURL);
          this.myDropzoneNew.files.push(this.state.myDropzoneNew[0]);
        }
      }, 300 )
    }
  }

  closeSnack(){
    this.setState({
      is_snack: false,
      textSnack: ''
    })
  }

  openSnack(text){
    this.setState({
      is_snack: true,
      textSnack: text
    })
  }

  searchPf(event){
    let all_data = this.state.item_pf.all;
    let name = event.target.value;

    this.setState({
      searchPf: name
    })

    let data_to_render = [];

    all_data.map( (item) => {
      if( item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ){
        data_to_render.push(item)
      }
    })

    this.setState({
      item_pf_render: data_to_render
    })
  }

  searchItems(event){
    let all_data = this.state.item_items_all;
    let name = event.target.value;

    this.setState({
      searchItems: name
    })

    let data_to_render = [];

    all_data.map( (item) => {
      if( item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ){
        data_to_render.push(item)
      }
    })

    this.setState({
      item_items_render: data_to_render
    })
  }

  closeEdit(){
    this.setState({ 
      modalEdit: false, 
      editItem: null, 
      ItemTab: '1' 
    })

    this.getItems();
  }

  closeNew(){
    this.setState({ 
      modalNew: false, 
      editItem: null, 
      ItemTab: '1' 
    })

    this.getItems();
  }

  changeSort(key_cat, key_item, event){
    let value = event.target.value;
    let data = this.state.cats;
    
    data[ key_cat ]['items'][ key_item ]['sort'] = value;

    this.setState({
      cats: data
    })
  }

  async saveSort(item_id, event){
    let data = {
      id: item_id,
      sort: event.target.value
    };

    let res = await this.getData('saveSort', data);
  }

  render(){
    const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={this.closeSnack.bind(this)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
  

    return (
      <>
        <Backdrop open={this.state.is_load} style={{ zIndex: 999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.is_snack}
          autoHideDuration={6000}
          onClose={this.closeSnack.bind(this)}
          message={this.state.textSnack}
          action={action}
        />
        
        <Dialog
          open={this.state.modalEdit}
          fullWidth={true}
          maxWidth={'md'}
          onClose={ this.closeEdit.bind(this) }
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
                            <TabList onChange={ this.changeTab.bind(this) } variant="fullWidth">
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
                                  <Grid item xs={12} sm={6}>
                                    <MyTextInput label="Название" value={ this.state.editItem.name } func={ this.changeItem.bind(this, 'name') } />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <MyTextInput label="Короткое название (20 сим.)" value={ this.state.editItem.short_name } func={ this.changeItem.bind(this, 'short_name') } />
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item xs={12}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} sm={4}>
                                    <MySelect data={this.state.types} value={this.state.editItem.type} func={ this.changeItem.bind(this, 'type') } disabled={true} label='Тип' />
                                  </Grid>
                                  <Grid item xs={12} sm={4}>
                                    <MySelect data={this.state.cat_list} value={this.state.editItem.category_id} func={ this.changeItem.bind(this, 'category_id') } label='Категория' />
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
                                  
                                  { parseInt(this.state.editItem.category_id) == 6 ?
                                    <Grid item xs={12} sm={4}>
                                      <MyTextInput label="Объем" value={ this.state.editItem.weight } func={ this.changeItem.bind(this, 'weight') } />
                                    </Grid>
                                      :
                                    <Grid item xs={12} sm={4}>
                                      <MyTextInput label="Вес" value={ this.state.editItem.weight } func={ this.changeItem.bind(this, 'weight') } />
                                    </Grid>
                                  }

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
                                    { this.state.editItem.img_new.length > 0 ?
                                      <img src={'https://storage.yandexcloud.net/site-img/'+this.state.editItem.img_new+'600х400.jpg?'+this.state.editItem.img_new_update} style={{maxWidth: 300, maxHeight: 300}} />
                                        :
                                      <div style={{maxWidth: 300, maxHeight: 300}}/>
                                    }
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
                                    { this.state.editItem.img_app.length > 0 ?
                                      <img src={'https://storage.yandexcloud.net/site-img/'+this.state.editItem.img_app+'600х600.jpg?'+this.state.editItem.img_new_update} style={{maxWidth: 300, maxHeight: 300}} />
                                        :
                                      <div style={{maxWidth: 300, maxHeight: 300}}/>
                                    }
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
                          <TabPanel value="2">

                            <Grid container spacing={3}>

                              { !this.state.item_rec ? null :
                                <Grid item xs={12} sm={4}>
                                  <Table size='small'>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Название</TableCell>
                                        <TableCell></TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      { this.state.item_rec.all.map( (item, key) =>
                                        <TableRow key={key}>
                                          <TableCell>{item.name}</TableCell>
                                          <TableCell>
                                            <DehazeIcon onClick={this.openMenu.bind(this, 'rec', item)} />
                                          </TableCell>
                                        </TableRow>
                                      ) }
                                    </TableBody>
                                  </Table>
                                </Grid>
                              }

                              { !this.state.item_rec ? null :
                                <Grid item xs={12} sm={8}>
                                  <TableStages title={'1 этап'} type={'rec'} arr={'rec_stage_1'} data={this.state.rec_stage_1} changeData={this.changeData.bind(this)} delItem={this.delItem.bind(this)} />
                                  <TableStages title={'2 этап'} type={'rec'} arr={'rec_stage_2'} data={this.state.rec_stage_2} changeData={this.changeData.bind(this)} delItem={this.delItem.bind(this)} />
                                  <TableStages title={'3 этап'} type={'rec'} arr={'rec_stage_3'} data={this.state.rec_stage_3} changeData={this.changeData.bind(this)} delItem={this.delItem.bind(this)} />
                                </Grid>
                              }
                              
                            </Grid>

                          </TabPanel>
                          <TabPanel value="3">

                            <Grid container spacing={3}>

                              { !this.state.item_pf ? null :
                                <Grid item xs={12} sm={4}>
                                  <Table size='small'>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Название</TableCell>
                                        <TableCell></TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>

                                      <TableRow>
                                        <TableCell colSpan={2}>
                                          <MyTextInput label="Поиск" value={ this.state.searchPf } func={ this.searchPf.bind(this) } />
                                        </TableCell>
                                      </TableRow>

                                      { this.state.item_pf_render.map( (item, key) =>
                                        <TableRow key={key}>
                                          <TableCell>{item.name}</TableCell>
                                          <TableCell>
                                            <DehazeIcon onClick={this.openMenu.bind(this, 'pf', item)} />
                                          </TableCell>
                                        </TableRow>
                                      ) }
                                    </TableBody>
                                  </Table>
                                </Grid>
                              }

                              { !this.state.item_rec ? null :
                                <Grid item xs={12} sm={8}>
                                  <TableStages title={'1 этап'} type={'pf'} arr={'pf_stage_1'} data={this.state.pf_stage_1} changeData={this.changeData.bind(this)} delItem={this.delItem.bind(this)} />
                                  <TableStages title={'2 этап'} type={'pf'} arr={'pf_stage_2'} data={this.state.pf_stage_2} changeData={this.changeData.bind(this)} delItem={this.delItem.bind(this)} />
                                  <TableStages title={'3 этап'} type={'pf'} arr={'pf_stage_3'} data={this.state.pf_stage_3} changeData={this.changeData.bind(this)} delItem={this.delItem.bind(this)} />
                                </Grid>
                              }

                            </Grid>

                          </TabPanel>
                          <TabPanel value="4">

                            <Grid container spacing={3}>

                              { !this.state.item_pf ? null :
                                <Grid item xs={12} sm={4}>
                                  <Table size='small'>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Название</TableCell>
                                        <TableCell></TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>

                                      <TableRow>
                                        <TableCell colSpan={2}>
                                          <MyTextInput label="Поиск" value={ this.state.searchItems } func={ this.searchItems.bind(this) } />
                                        </TableCell>
                                      </TableRow>

                                      { this.state.item_items_render.map( (item, key) =>
                                        <TableRow key={key}>
                                          <TableCell>{item.name}</TableCell>
                                          <TableCell>
                                            <AddIcon onClick={this.forwardItem.bind(this, item)} style={{ cursor: 'pointer' }} />
                                          </TableCell>
                                        </TableRow>
                                      ) }
                                    </TableBody>
                                  </Table>
                                </Grid>
                              }

                              { !this.state.item_rec ? null :
                                <Grid item xs={12} sm={8}>
                                  <Table size='small'>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell colSpan={5} style={{ textAlign: 'center' }}>{this.props.title}</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>Название</TableCell>
                                        <TableCell>Количество</TableCell>
                                        <TableCell>Авт. добавление</TableCell>
                                        <TableCell></TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      { this.state.item_items.map( (item, key) =>
                                        <TableRow key={key}>
                                          <TableCell>{item.name}</TableCell>
                                          <TableCell>
                                            <MyTextInput label="" value={item.count} func={ this.changeData.bind(this, 'item', 'item_items', 'count', key) } />
                                          </TableCell>
                                          <TableCell>
                                            <MyCheckBox label="" value={ parseInt(item.is_add) == 1 ? true : false } func={ this.changeData.bind(this, 'item', 'item_items', 'is_add', key) } />
                                          </TableCell>
                                          <TableCell>
                                            <CloseIcon onClick={ this.delItem.bind(this, 'item', '', key) } style={{ cursor: 'pointer' }} />
                                          </TableCell>
                                        </TableRow>
                                      ) }
                                    </TableBody>
                                  </Table>
                                </Grid>
                              }

                            </Grid>

                          </TabPanel>
                        </TabContext>
                      </Grid>

                    </Grid>

                    <Menu
                      anchorEl={this.state.anchorEl}
                      open={this.state.openMenu}
                      onClose={this.closeMenu.bind(this)}
                    >
                      <MenuItem onClick={this.chooseStage.bind(this, 1)}>1 этап</MenuItem>
                      <MenuItem onClick={this.chooseStage.bind(this, 2)}>2 этап</MenuItem>
                      <MenuItem onClick={this.chooseStage.bind(this, 3)}>3 этап</MenuItem>
                    </Menu>

                  </Grid>
                  
                </>
                  :
                null
              }
            </Grid>
              
          </DialogContent>
          <DialogActions>
            <Button onClick={this.saveEditItem.bind(this)} color="primary">Сохранить</Button>
          </DialogActions>
        </Dialog>
        
        <Dialog
          open={this.state.modalNew}
          fullWidth={true}
          maxWidth={'md'}
          onClose={ this.closeNew.bind(this) }
        >
          <DialogTitle>Новый товар</DialogTitle>
          <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
            
            <Grid container spacing={3}>
                
                {this.state.editItem && this.state.modalNew ?
                  
                    <Grid item xs={12}>

                      <Grid container spacing={3}>

                        <Grid item xs={12}>
                          <TabContext value={this.state.ItemTab}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                              <TabList onChange={ this.changeTab.bind(this) } variant="fullWidth">
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
                                    <Grid item xs={12} sm={6}>
                                      <MyTextInput label="Название" value={ this.state.editItem.name } func={ this.changeItem.bind(this, 'name') } />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <MyTextInput label="Короткое название (20 сим.)" value={ this.state.editItem.short_name } func={ this.changeItem.bind(this, 'short_name') } />
                                    </Grid>
                                  </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={4}>
                                      <MySelect data={this.state.types} value={this.state.editItem.type} func={ this.changeItem.bind(this, 'type') } disabled={true} label='Тип' />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                      <MySelect data={this.state.cat_list} value={this.state.editItem.category_id} func={ this.changeItem.bind(this, 'category_id') } label='Категория' />
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
                                    { parseInt(this.state.editItem.category_id) == 6 ?
                                      <Grid item xs={12} sm={4}>
                                        <MyTextInput label="Объем" value={ this.state.editItem.weight } func={ this.changeItem.bind(this, 'weight') } />
                                      </Grid>
                                        :
                                      <Grid item xs={12} sm={4}>
                                        <MyTextInput label="Вес" value={ this.state.editItem.weight } func={ this.changeItem.bind(this, 'weight') } />
                                      </Grid>
                                    }
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
                                      { this.state.editItem.img_new.length > 0 ?
                                        <img src={'https://storage.yandexcloud.net/site-img/'+this.state.editItem.img_new+'600х400.jpg?'+this.state.editItem.img_new_update} style={{maxWidth: 300, maxHeight: 300}} />
                                          :
                                        <div style={{maxWidth: 300, maxHeight: 300}}/>
                                      }
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
                                      { this.state.editItem.img_app.length > 0 ?
                                        <img src={'https://storage.yandexcloud.net/site-img/'+this.state.editItem.img_app+'600х600.jpg?'+this.state.editItem.img_new_update} style={{maxWidth: 300, maxHeight: 300}} />
                                          :
                                        <div style={{maxWidth: 300, maxHeight: 300}}/>
                                      }
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
                            <TabPanel value="2">

                              <Grid container spacing={3}>

                                { !this.state.item_rec ? null :
                                  <Grid item xs={12} sm={4}>
                                    <Table size='small'>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>Название</TableCell>
                                          <TableCell></TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        { this.state.item_rec.all.map( (item, key) =>
                                          <TableRow key={key}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                              <DehazeIcon onClick={this.openMenu.bind(this, 'rec', item)} />
                                            </TableCell>
                                          </TableRow>
                                        ) }
                                      </TableBody>
                                    </Table>
                                  </Grid>
                                }

                                { !this.state.item_rec ? null :
                                  <Grid item xs={12} sm={8}>
                                    <TableStages title={'1 этап'} type={'rec'} arr={'rec_stage_1'} data={this.state.rec_stage_1} changeData={this.changeData.bind(this)} delItem={this.delItem.bind(this)} />
                                    <TableStages title={'2 этап'} type={'rec'} arr={'rec_stage_2'} data={this.state.rec_stage_2} changeData={this.changeData.bind(this)} delItem={this.delItem.bind(this)} />
                                    <TableStages title={'3 этап'} type={'rec'} arr={'rec_stage_3'} data={this.state.rec_stage_3} changeData={this.changeData.bind(this)} delItem={this.delItem.bind(this)} />
                                  </Grid>
                                }
                                
                              </Grid>

                            </TabPanel>
                            <TabPanel value="3">

                              <Grid container spacing={3}>

                                { !this.state.item_pf ? null :
                                  <Grid item xs={12} sm={4}>
                                    <Table size='small'>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>Название</TableCell>
                                          <TableCell></TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>

                                        <TableRow>
                                          <TableCell colSpan={2}>
                                            <MyTextInput label="Поиск" value={ this.state.searchPf } func={ this.searchPf.bind(this) } />
                                          </TableCell>
                                        </TableRow>

                                        { this.state.item_pf_render.map( (item, key) =>
                                          <TableRow key={key}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                              <DehazeIcon onClick={this.openMenu.bind(this, 'pf', item)} />
                                            </TableCell>
                                          </TableRow>
                                        ) }
                                      </TableBody>
                                    </Table>
                                  </Grid>
                                }

                                { !this.state.item_rec ? null :
                                  <Grid item xs={12} sm={8}>
                                    <TableStages title={'1 этап'} type={'pf'} arr={'pf_stage_1'} data={this.state.pf_stage_1} changeData={this.changeData.bind(this)} delItem={this.delItem.bind(this)} />
                                    <TableStages title={'2 этап'} type={'pf'} arr={'pf_stage_2'} data={this.state.pf_stage_2} changeData={this.changeData.bind(this)} delItem={this.delItem.bind(this)} />
                                    <TableStages title={'3 этап'} type={'pf'} arr={'pf_stage_3'} data={this.state.pf_stage_3} changeData={this.changeData.bind(this)} delItem={this.delItem.bind(this)} />
                                  </Grid>
                                }

                              </Grid>

                            </TabPanel>
                            <TabPanel value="4">

                              <Grid container spacing={3}>

                                { !this.state.item_pf ? null :
                                  <Grid item xs={12} sm={4}>
                                    <Table size='small'>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>Название</TableCell>
                                          <TableCell></TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>

                                        <TableRow>
                                          <TableCell colSpan={2}>
                                            <MyTextInput label="Поиск" value={ this.state.searchItems } func={ this.searchItems.bind(this) } />
                                          </TableCell>
                                        </TableRow>

                                        { this.state.item_items_render.map( (item, key) =>
                                          <TableRow key={key}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                              <AddIcon onClick={this.forwardItem.bind(this, item)} style={{ cursor: 'pointer' }} />
                                            </TableCell>
                                          </TableRow>
                                        ) }
                                      </TableBody>
                                    </Table>
                                  </Grid>
                                }

                                { !this.state.item_rec ? null :
                                  <Grid item xs={12} sm={8}>
                                    <Table size='small'>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell colSpan={5} style={{ textAlign: 'center' }}>{this.props.title}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell>Название</TableCell>
                                          <TableCell>Количество</TableCell>
                                          <TableCell>Авт. добавление</TableCell>
                                          <TableCell></TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        { this.state.item_items.map( (item, key) =>
                                          <TableRow key={key}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                              <MyTextInput label="" value={item.count} func={ this.changeData.bind(this, 'item', 'item_items', 'count', key) } />
                                            </TableCell>
                                            <TableCell>
                                              <MyCheckBox label="" value={ parseInt(item.is_add) == 1 ? true : false } func={ this.changeData.bind(this, 'item', 'item_items', 'is_add', key) } />
                                            </TableCell>
                                            <TableCell>
                                              <CloseIcon onClick={ this.delItem.bind(this, 'item', '', key) } style={{ cursor: 'pointer' }} />
                                            </TableCell>
                                          </TableRow>
                                        ) }
                                      </TableBody>
                                    </Table>
                                  </Grid>
                                }

                              </Grid>

                            </TabPanel>
                          </TabContext>
                        </Grid>

                      </Grid>

                      <Menu
                        anchorEl={this.state.anchorEl}
                        open={this.state.openMenu}
                        onClose={this.closeMenu.bind(this)}
                      >
                        <MenuItem onClick={this.chooseStage.bind(this, 1)}>1 этап</MenuItem>
                        <MenuItem onClick={this.chooseStage.bind(this, 2)}>2 этап</MenuItem>
                        <MenuItem onClick={this.chooseStage.bind(this, 3)}>3 этап</MenuItem>
                      </Menu>

                    </Grid>
                  
                  
                    :
                  null
                }
              </Grid>
              
          </DialogContent>
          <DialogActions>
            <Button onClick={this.saveNewItem.bind(this)} color="primary">Сохранить</Button>
          </DialogActions>
        </Dialog>
        
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <Button onClick={this.openNew.bind(this)} color="primary" variant='contained'>Новый товар</Button>
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
                          <TableCell style={{ width: '2%' }}>id</TableCell>

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
                            <TableCell>{item.id}</TableCell>
                            <TableCell onClick={this.openItem.bind(this, it)}>{it.name}</TableCell>
                            <TableCell>
                              <MyTextInput label="" value={it.sort} func={ this.changeSort.bind(this, key, k) } onBlur={this.saveSort.bind(this, it.id)} />
                            </TableCell>

                            <TableCell> 
                              { parseInt(it.is_show) == 1 ? <VisibilityIcon /> : <VisibilityOffIcon /> } 
                            </TableCell>
                            <TableCell> 
                              { parseInt(it.show_site) == 1 ? <VisibilityIcon /> : <VisibilityOffIcon /> } 
                            </TableCell>
                            <TableCell> 
                              { parseInt(it.show_program) == 1 ? <VisibilityIcon /> : <VisibilityOffIcon /> } 
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

export function SiteItems() {
  return (
    <SiteItems_ />
  );
}