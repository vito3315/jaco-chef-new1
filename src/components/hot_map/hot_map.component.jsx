import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Typography from '@mui/material/Typography';

import { MySelect, MyDatePickerNew, MyTimePicker, MyCheckBox } from '../../stores/elements';

const queryString = require('query-string');

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

export class HotMap extends React.Component {
  map = null;
  heatmap = null;
  myGeoObject = null;

  constructor(props) {
    super(props);
        
    this.state = {
      module: 'hot_map',
      module_name: '',
      is_load: false,
      
      cities: [],
      city_id: '',
      
      date_start: formatDate(new Date()),
      date_end: formatDate(new Date()),
      time_start: '00:00',
      time_end: '23:59',

      statAllCount: '',
      statTrueCount: '',

      is_new: 0,

      isDrawing: true,

    };
  }
  
  async componentDidMount(){
    
    let data = await this.getData('get_all');
    
    this.setState({
      cities: data.cities,
      city_id: data.cities[0].id,
      module_name: data.module_info.name
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
    });
  }
   
  changeCity(event){
    let data = event.target.value;
    
    this.setState({
      city_id: data
    })
    
    setTimeout( () => {
      //this.updateData();
    }, 50 )
  }
  
  async updateData(){

    if(this.state.statAllCount) {
       this.setState({
        statAllCount: '',
        statTrueCount: '',
      })
    }

    this.setState({
      isDrawing: true
    })

    let data = {
      city_id: this.state.city_id,
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      time_start: this.state.time_start,
      time_end: this.state.time_end,
      is_new: this.state.is_new,
    };
    
    let res = await this.getData('get_orders', data);
    
    console.log( res )

    this.getOrders(res.points, res.all_points)
  }
  
  getOrders(home, all_points){
    //let objectManager = new ymaps.ObjectManager();
    
    var new_data = [];
				
    all_points.map(function(item){
      new_data.push([
        parseFloat(item[0]),
        parseFloat(item[1])
      ])
    })

    
    if( !this.map ){
      ymaps.ready(() => {
        this.map = new ymaps.Map('map', {
          center: [home[0].home.latitude, home[0].home.longitude],
          zoom: 11
        }, {
          searchControlProvider: 'yandex#search'
        })
        
        var gradients = [
          {
            0.1: 'rgba(128, 255, 0, 0.7)',
            0.2: 'rgba(255, 255, 0, 0.8)',
            0.7: 'rgba(234, 72, 58, 0.9)',
            1.0: 'rgba(162, 36, 25, 1)'
          }, {
            0.1: 'rgba(162, 36, 25, 0.7)',
            0.2: 'rgba(234, 72, 58, 0.8)',
            0.7: 'rgba(255, 255, 0, 0.9)',
            1.0: 'rgba(128, 255, 0, 1)'
          }
        ],
        radiuses = [5, 10, 20, 30],
        opacities = [0.4, 0.6, 0.8, 1];

       
        ymaps.modules.require(['Heatmap'], (Heatmap) => {
          this.heatmap = new Heatmap(new_data, {
              gradient: gradients[0],
              radius: radiuses[1],
              opacity: opacities[2]
          });
          this.heatmap.setMap(this.map);
        });

        //return ;
        

        home.map( (item, key) => {
          //дом
          let myGeoObject1 = new ymaps.GeoObject({
            geometry: {
              type: "Point",
              coordinates: [item.home.latitude, item.home.longitude]
            },
          }, {
            preset: 'islands#blackDotIcon', 
            iconColor: 'black'
          })

          this.map.geoObjects.add(myGeoObject1);

          let points_zone = [];

          item.zone.map( (zon, k) => {
            points_zone.push( JSON.parse(zon['zone']) );
          } )
          
          let myGeoObject2 = [];

          for(var poly = 0; poly < points_zone.length; poly++){
						myGeoObject2[poly] = new ymaps.Polygon([points_zone[poly]], {
							hintContent: ""
						}, {
							fillColor: 'rgba(187, 0, 37, 0)',
							strokeColor: 'rgb(187, 0, 37)',
							strokeWidth: 5
						});

						this.map.geoObjects.add(myGeoObject2[poly]);

					}

          this.map.geoObjects.events.add('click', this.changeColorPolygon.bind(this));
          
        })
        
      });
    }else{
      
      this.map.geoObjects.removeAll()
      this.heatmap.destroy();

      this.map.setCenter([home[0].home.latitude, home[0].home.longitude]);

      var gradients = [
        {
          0.1: 'rgba(128, 255, 0, 0.7)',
          0.2: 'rgba(255, 255, 0, 0.8)',
          0.7: 'rgba(234, 72, 58, 0.9)',
          1.0: 'rgba(162, 36, 25, 1)'
        }, {
          0.1: 'rgba(162, 36, 25, 0.7)',
          0.2: 'rgba(234, 72, 58, 0.8)',
          0.7: 'rgba(255, 255, 0, 0.9)',
          1.0: 'rgba(128, 255, 0, 1)'
        }
      ],
      radiuses = [5, 10, 20, 30],
      opacities = [0.4, 0.6, 0.8, 1];

     
      ymaps.modules.require(['Heatmap'], (Heatmap) => {
        var heatmap = new Heatmap(new_data, {
          gradient: gradients[0],
          radius: radiuses[1],
          opacity: opacities[2]
        });
        heatmap.setMap(this.map);
      });
      

      home.map( (item, key) => {
        //дом
        let myGeoObject1 = new ymaps.GeoObject({
          geometry: {
            type: "Point",
            coordinates: [item.home.latitude, item.home.longitude]
          },
        }, {
          preset: 'islands#blackDotIcon', 
          iconColor: 'black'
        })

        this.map.geoObjects.add(myGeoObject1);

        let points_zone = [];

        item.zone.map( (zon, k) => {
          points_zone.push( JSON.parse(zon['zone']) );
        } )

        let myGeoObject2 = [];

        for(var poly = 0; poly < points_zone.length; poly++){
          myGeoObject2[poly] = new ymaps.Polygon([points_zone[poly]], {
            hintContent: ""
          }, {
            fillColor: 'rgba(187, 0, 37, 0)',
            strokeColor: 'rgb(187, 0, 37)',
            strokeWidth: 5
          });
          this.map.geoObjects.add(myGeoObject2[poly]);
        }

        this.map.geoObjects.events.add('click', this.changeColorPolygon.bind(this));

      } )
    }
  }

  async getCount(){
    var new_this_zone = [];
		
    this.map.geoObjects.each(function (geoObject) {
			new_this_zone = new_this_zone.concat( geoObject.geometry.getCoordinates() );
		});

    let data = {
      city_id: this.state.city_id,
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      time_start: this.state.time_start,
      time_end: this.state.time_end,
      is_new: this.state.is_new,
      
      zone: new_this_zone[ new_this_zone.length - 1 ]
    };

    let res = await this.getData('getCount', data);

    this.setState({
      statAllCount: res.all_count,
      statTrueCount: res.true + ' ( ' + res.true_percent + '% ) ',
    })

    console.log( res )
  }

  changeDateRange(data, event){
    this.setState({
      [data]: formatDate(event)
    })
  }

  changeData(type, event){

    let data = '';

    if( type == 'is_new' ){
      data = event.target.checked == true ? 1 : 0;
    }else{
      data = event.target.value;
    }

    this.setState({
      [ type ]: data
    })
  }

  startDrawing() {

  this.setState({ 
    isDrawing: !this.state.isDrawing
  })

  ymaps.geoQuery(this.map.geoObjects).setOptions('strokeColor', 'rgb(187, 0, 37)')

  // Создаем многоугольник, используя класс GeoObject.
  this.myGeoObject = new ymaps.GeoObject({
    geometry: {
      type: "Polygon",
      coordinates: [  ],
      fillRule: "nonZero"
    }				
  }, {
    // Описываем опции геообъекта.
    // Цвет заливки.
    fillColor: '#00FF00',
    // Цвет обводки.
    strokeColor: '#0000FF',
    // Общая прозрачность (как для заливки, так и для обводки).
    opacity: 0.5,
    // Ширина обводки.
    strokeWidth: 5,
    // Стиль обводки.
    strokeStyle: 'shortdash'
  });

  this.map.geoObjects.add(this.myGeoObject);

  this.myGeoObject.editor.startDrawing();

  }

  stopDrawing() {

    this.setState({ 
      isDrawing: !this.state.isDrawing
    })
  
    this.myGeoObject.editor.stopDrawing();
  
  }

  changeColorPolygon(event) {

    event.get('target').options.set({strokeColor: 'rgb(255, 255, 0)'})

    const result = ymaps.geoQuery(this.map.geoObjects).search('options.strokeColor = "rgb(255, 255, 0)"')

    if(result._objects.length > 1) {
      result.setOptions('strokeColor', 'rgb(187, 0, 37)')
    }

    if(result) {
      this.map.geoObjects.add(result._objects[0]);
    }

  }

  render(){
    return (
      <>
        <Backdrop open={this.state.is_load} style={{ zIndex: 99 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <MySelect data={this.state.cities} value={this.state.city_id} func={ this.changeCity.bind(this) } label='Город' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MyCheckBox value={ this.state.is_new == 1 ? true : false } func={ this.changeData.bind(this, 'is_new') } label='Только новые клиенты' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" onClick={this.updateData.bind(this)}>Обновить данные</Button>
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyDatePickerNew label="Дата от" value={ this.state.date_start } func={ this.changeDateRange.bind(this, 'date_start') } />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MyTimePicker label="Время от" value={this.state.time_start} func={ this.changeData.bind(this, 'time_start') } />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MyDatePickerNew label="Дата до" value={ this.state.date_end } func={ this.changeDateRange.bind(this, 'date_end') } />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MyTimePicker label="Время до" value={this.state.time_end} func={ this.changeData.bind(this, 'time_end') } />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={this.getCount.bind(this)}>Подсчитать количество</Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button variant="contained" 
            onClick={this.state.isDrawing ? this.startDrawing.bind(this) : this.stopDrawing.bind(this)}
            >{this.state.isDrawing ? 'Включить область редактирования' : 'Выключить область редактирования'}</Button>
          </Grid>
          
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography>Заказов в зоне: {this.state.statTrueCount}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Всего заказов в городе: {this.state.statAllCount}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12}>
            <div id="map" name="map" style={{ width: '100%', height: 700, paddingTop: 10 }} />
          </Grid>
        </Grid>
      </>
    )
  }
}
