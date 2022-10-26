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

class TenderCell extends React.Component {
  render(){

    const item = this.props.item;
    const vendor = this.props.vendor;

    let price = this.props.vendor_items_price.find( (it) => parseInt(it.item_id) == parseInt(item.id) && parseInt(it.vendor_id) == parseInt(vendor.id) );

    if( !price ){
      price = '';
    }else{
      price = price.price;
    }

      /*<MySelect
        data={this.state.towns}
        value={this.state.town}
        func={this.changeSelect.bind(this)}
        label=""
      />
      
        {`${Number(
            vendor.price.find(
              (it) => it.item_id === item.id
            ).price
          ).toFixed(2)} P`}
      */

    return (
      <>
        <TableCell className='tdcity'>
          { price == '' ? null :
            <MySelect
              data={this.props.cities}
              value={''}
              func={ () => {} }
              label=""
            />
          }
        </TableCell>
        <TableCell className='tdprice'>
          {price}
        </TableCell>
      </>
    )
  }
}

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

      towns: [
        { id: '1', name: 'Все' },
        { id: '2', name: 'ТЛТ' },
        { id: '3', name: 'СМР' },
      ],
      town: '',

      vendors: [],
      vendor: [],

      vendor_items_price: [],

      cats: [],

      newCats: [],
      newCat: ''
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
      newCats: data.cats
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
      newCat: ''
    });
  }

  changeCat(event, value){
    this.setState({
      newCat: value,
      vendor: [],
    });
  }

  async getDataTable() {
    const data = {
      city_id: this.state.city,
      vendors: this.state.vendor,
      cat: this.state.newCat
    };

    let res = await this.getData('get_data', data);

    console.log(res);

    this.setState({
      cats: res.items,
      vendor_items_price: res.vendor_items_price,
      vendors: res.vendors,
      newCities: res.cities,
      
    });
  }

  changeSelect(event) {
    this.setState({
      town: event.target.value,
    });

  }

  render() {
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

          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              style={{ whiteSpace: 'nowrap' }}
              onClick={this.getDataTable.bind(this)}
            >
              Обновить данные
            </Button>
          </Grid>
        </Grid>

        {!this.state.cats.length ? null : (
          <Grid container spacing={3} >
            <Grid item xs={12} sm={12}>
              <TableContainer sx={{ maxHeight: { xs: 'none', sm: 700 } }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: '#d87093' }}>
                        Категория
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#d87093' }}>
                        Параметры
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#d87093' }}>
                        Все
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#d87093' }}>
                        Тольятти
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#d87093' }}>
                        Самара
                      </TableCell>
                      {this.state.vendors.map((vendor, key) => (
                        
                        <TableCell
                          key={key}
                          style={{
                            whiteSpace: 'nowrap',
                            backgroundColor: '#d87093',
                            minWidth: 300
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
                        <TableRow >
                          <TableCell
                            colSpan={`${5 + this.state.vendors.length * 2}`}
                            sx={{
                              backgroundColor: '#98FB98',
                            }}
                          >
                            {item.name}
                          </TableCell>
                        </TableRow>

                        {item.cats.map((category, key_cat) => (
                          <React.Fragment key={key_cat}>
                            <TableRow
                              sx={{ '& td': { backgroundColor: '#40E0D0' } }}
                            >
                              <TableCell>{category.name}</TableCell>
                              <TableCell></TableCell>
                              {key_cat === 0 ? (
                                <TableCell colSpan={3}>
                                  Зафиксированные цены
                                </TableCell>
                              ) : (
                                <React.Fragment key={key_cat}>
                                  <TableCell></TableCell>
                                  <TableCell></TableCell>
                                  <TableCell></TableCell>
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
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                {this.state.vendors.map((vendor, key) => (
                                  <TenderCell key={key} vendor_items_price={this.state.vendor_items_price} cities={this.state.newCities} item={item} vendor={vendor} />

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
