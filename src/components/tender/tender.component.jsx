import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MyAutocomplite, MySelect } from '../../stores/elements';

const queryString = require('query-string');


class Tender_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'tender',
      module_name: '',
      is_load: false,

      cities: [],
      city: '',

      newCities: [],

      vendors: [],
      vendor: [],

      cats: [],

      newCats: [],
      newCat: '',

    };
  }

  async componentDidMount() {
    let data = await this.getData('get_all');

    console.log(data);

    this.setState({
      module_name: data.module_info.name,
      cities: data.cities,
      city: data.cities[0].id,
      vendors: data.vendors,
      newCats: data.cats,
    });

    document.title = data.module_info.name;
  }

  getData = (method, data = {}) => {
    this.setState({
      is_load: true,
    });

    return fetch('https://jacochef.ru/api/index_new.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify({
        method: method,
        module: this.state.module,
        version: 2,
        login: localStorage.getItem('token'),
        data: JSON.stringify(data),
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.st === false && json.type == 'redir') {
          window.location.pathname = '/';
          return;
        }

        if (json.st === false && json.type == 'auth') {
          window.location.pathname = '/auth';
          return;
        }

        setTimeout(() => {
          this.setState({
            is_load: false,
          });
        }, 300);

        return json;
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          is_load: false,
        });
      });
  };

  changeCity(event) {
    this.setState({
      city: event.target.value,
    });
  }

  changeVendor(event, value) {
    this.setState({
      vendor: value,
      newCat: '',
    });
  }

  changeCat(event, value) {
    this.setState({
      newCat: value,
      vendor: [],
    });
  }

  async getDataTable() {
    const data = {
      city_id: this.state.city,
      vendors: this.state.vendor,
      cat: this.state.newCat,
    };

    const res = await this.getData('get_data', data);

    console.log(res)

    this.getDataTableCell(res);

  }

  getDataTableCell(res) {
    const vendors = res.vendors;

    const items = res.vendor_items_price;

    const vendors_items = vendors.map((el) => {
      el.price = [];

      items.forEach((it) => {
        if (it.vendor_id === el.id) {
          el.price.push(it);
        }
      });

      return el;
    });

    this.setState({
      cats: res.items,
      vendors: vendors_items,
      newCities: res.cities,
    });
  }

  changeSelect(vendor_id, cat_id, price_vendor, event) {
    // console.log(vendor_id, cat_id, price_vendor, event.target.value)

    const vendors = this.state.vendors;
    const newCities = this.state.newCities;
    const cats = this.state.cats;

    cats.forEach(cat => {
      cat.cats.forEach(it => {
        it.items.forEach(item => {

            if(item.id === cat_id && event.target.value === '') {

              if(vendor_id === item.vendor_all) {
                item.city_all = null;
                item.price_all = null;
                item.vendor_all = null;
              }

              if(vendor_id === item.vendor_tlt) {
                item.city_tlt = null;
                item.price_tlt = null;
                item.vendor_tlt = null;
              }

              if(vendor_id === item.vendor_smr) {
                item.city_smr = null;
                item.price_smr = null;
                item.vendor_smr = null;
              }
            }
     
            if(item.id === cat_id && event.target.value === -1) {
              item.city_tlt = null;
              item.price_tlt = null;
              item.vendor_tlt = null;

              item.city_smr = null;
              item.price_smr - null;
              item.vendor_smr = null;

              item.city_all = newCities.find(city => city.id === event.target.value)
              item.price_all = price_vendor;
              item.vendor_all = vendor_id;
            } 

            if(item.id === cat_id && event.target.value === '1') {
              item.city_all = null;
              item.price_all = null;
              item.vendor_all = null;

              if(!!item.city_tlt && !!item.city_smr && item.vendor_smr === vendor_id) {
                item.city_smr = null;
                item.price_smr = null;
                item.vendor_smr = null;
              }

              item.city_tlt = newCities.find(city => city.id === event.target.value)
              item.price_tlt = price_vendor;
              item.vendor_tlt = vendor_id;
            } 

            if(item.id === cat_id && event.target.value === '2') {
              item.city_all = null;
              item.price_all = null;
              item.vendor_all = null;

              if(!!item.city_tlt && !!item.city_smr && item.vendor_tlt === vendor_id) {
                item.city_tlt = null;
                item.price_tlt = null;
                item.vendor_tlt = null;
              }

              item.city_smr = newCities.find(city => city.id === event.target.value)
              item.price_smr = price_vendor;
              item.vendor_smr = vendor_id;
            } 
          
        })
      })
    })


    vendors.forEach(vendor => {
      vendor.price.forEach(price => {

        if(price.item_id === cat_id && price.vendor_id === vendor_id) {

          price.city = newCities.find(city => city.id === event.target.value)

        } 

        if (price.item_id === cat_id && price.vendor_id !== vendor_id) {

          if(price.city) {

            if(price.city.id === event.target.value || event.target.value === - 1) {

              price.city = null

            } else if (price.city.id === -1 && event.target.value !== - 1) {

              price.city = null

            }
          } 
        }
        
      })

    })

    // console.log(vendors)

    this.setState({
      vendors,
      cats,
    });

  }

  async saveData () {
    const data = {
      city_id: this.state.city,
      vendors: this.state.vendors,
      vendor: this.state.vendor,
      cat: this.state.newCat,
      cats: this.state.cats,
    };

    console.log(data);

    const res = await this.getData('save', data);

    console.log(res)
  }

  render() {

    console.log('render')

    return (
      <>
        <Backdrop open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
        </Grid>

        <Grid container spacing={3} justifyContent="center" mb={5}>

          <Grid item xs={12} sm={3}>
            <MySelect
              data={this.state.cities}
              value={this.state.city}
              func={this.changeCity.bind(this)}
              label="Город"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MyAutocomplite
              label="Поставщик"
              multiple={true}
              data={this.state.vendors}
              value={this.state.vendor}
              func={this.changeVendor.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MyAutocomplite
              label="Категория"
              multiple={false}
              data={this.state.newCats}
              value={this.state.newCat}
              func={this.changeCat.bind(this)}
            />
          </Grid>

          <Grid container spacing={3} item sm={3}>

          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              style={{ whiteSpace: 'nowrap' }}
              onClick={this.getDataTable.bind(this)}
            >
              Обновить данные
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              style={{ whiteSpace: 'nowrap', backgroundColor: '#00a550', color: 'white' }}
              onClick={this.saveData.bind(this)}
            >
              Сохранить изменения
            </Button>
          </Grid>

          </Grid>

        </Grid>

        {!this.state.cats.length ? null : (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TableContainer sx={{ maxHeight: { xs: 'none', sm: 650 } }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Категория</TableCell>
                      <TableCell>Параметры</TableCell>
                      <TableCell>Все</TableCell>
                      <TableCell>Тольятти</TableCell>
                      <TableCell>Самара</TableCell>
                      {this.state.vendors.map((vendor, key) => (
                        <TableCell
                          key={key}
                          style={{
                            whiteSpace: 'nowrap',
                            minWidth: 300,
                            textAlign: 'center'
                          }}
                          colSpan={2}
                        >
                          {vendor.name}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {this.state.cats.map((item, key) => (
                      <React.Fragment key={key}>
                        <TableRow>
                          <TableCell
                            colSpan={`${5 + this.state.vendors.length * 2}`}
                            sx={{
                              backgroundColor: '#ADD8E6',
                            }}
                          >
                            {item.name}
                          </TableCell>
                        </TableRow>

                        {item.cats.map((category, key_cat) => (
                          <React.Fragment key={key_cat}>
                            <TableRow
                              sx={{ '& td': { backgroundColor: '#ADD8E6' } }}
                            >
                              <TableCell>{category.name}</TableCell>
                              <TableCell></TableCell>
                              {key_cat === 0 ? (
                                <TableCell colSpan={3}>
                                  Зафиксированные цены
                                </TableCell>
                              ) : (
                                <React.Fragment key={key_cat}>
                                  <TableCell colSpan={3}></TableCell>
                                </React.Fragment>
                              )}
                              {this.state.vendors.map((vendor, key) => (
                                <React.Fragment key={key}>
                                  <TableCell colSpan={2}></TableCell>
                                </React.Fragment>
                              ))}
                            </TableRow>

                            {category.items.map((item, k) => (
                              <TableRow key={k} hover>
                                <TableCell className="td_color">
                                  {item.name}
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell>{item.city_all ? item.price_all : '' }</TableCell>
                                <TableCell>{item.city_tlt ? item.price_tlt : ''}</TableCell>
                                <TableCell>{item.city_smr ? item.price_smr : '' }</TableCell>
                                {this.state.vendors.map((vendor, key) => (
                                 <React.Fragment key={key}>
                                 {vendor.price.find(
                                   (it) => it.item_id === item.id
                                 ) ? (
                                   <>
                                     <TableCell className='tdcity'>
                                       <MySelect
                                         data={this.state.newCities}
                                         value={vendor.price.find((it) => it.item_id === item.id).city ? vendor.price.find((it) => it.item_id === item.id).city.id : ''}
                                         func={this.changeSelect.bind(this, vendor.id, item.id, vendor.price.find((it) => it.item_id === item.id).price)}
                                         label=""
                                       />
                                     </TableCell>
                                     <TableCell
                                       className='tdprice'
                                     >
                                       {vendor.price.find((it) => it.item_id === item.id).price}
                                     </TableCell>
                                   </>
                                 ) : (
                                   <>
                                     <TableCell colSpan={2}></TableCell>
                                   </>
                                 )}
                               </React.Fragment>
                                ))}
                              </TableRow>
                            ))}
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        )}
      </>
    );
  }
}

export function Tender() {
  return <Tender_ />;
}
