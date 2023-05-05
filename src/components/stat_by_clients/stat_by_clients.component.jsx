import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MySelect, formatDateMin, MyDatePickerNewViews, MyAlert } from '../../stores/elements';

import queryString from 'query-string';

class StatByClients_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'stat_by_clients',
      module_name: '',
      is_load: false,

      openAlert: false,
      err_status: true,
      err_text: '',

      dataPoints: [],
      dataCities: [],
      all_data: [],
      dataDates: [],

      date_start: '',
      date_end: ''
    };
  }

  async componentDidMount() {
    const data = await this.getData('get_all');

    this.setState({
      module_name: data.module_info.name,
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
      });
  }

  async changeCity(event) {
    const data = {
      city_id: event.target.value,
    };

    const res = await this.getData('get_zones', data);

    this.setState({
      zones: res.zones,
      city: event.target.value,
    });
  }

  async save(item) {
    let res;

    if (this.state.mark === 'newZone') {
      const data = {
        point_id: item.point_id,
        name: item.zone_name,
        sum_div: item.sum_div,
        sum_div_driver: item.sum_div_driver,
        free_drive: item.free_drive,
        new_zone: item.new_zone,
      };

      res = await this.getData('save_new', data);
    }

    if (this.state.mark === 'editZone') {
      const data = {
        point_id: item.point_id,
        name: item.zone_name,
        sum_div: item.sum_div,
        sum_div_driver: item.sum_div_driver,
        free_drive: item.free_drive,
        new_zone: item.new_zone,
        zone_id: item.id,
      };

      res = await this.getData('save_edit', data);
    }

    if(!res.st) {
      this.setState({
        openAlert: true,
        err_status: res.st,
        err_text: res.text,
      });
    } else {
      setTimeout( () => {
        this.update();
      }, 300)
    }
  }

  async update() {
    const city_id = this.state.city;

    const data = {
      city_id: city_id,
      date_start: this.state.date_start,
      date_end: this.state.date_end
    };

    const res = await this.getData('get_data', data);

    console.log(res)

    this.setState({
      dataPoints: res.points,
      dataCities: res.cities,
      all_data: res.all_data,
      dataDates: res.date_list,
    })
  }

  changeDateRange(type, data){
    this.setState({
      [type]: formatDateMin(data)
    })
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <MyAlert 
          isOpen={this.state.openAlert} 
          onClose={() => this.setState({ openAlert: false }) } 
          status={this.state.err_status} 
          text={this.state.err_text} />

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

         
          <Grid item xs={12} sm={6}>
            <MyDatePickerNewViews
              label="Дата от"
              views={['month', 'year']}
              value={this.state.date_start}
              func={this.changeDateRange.bind(this, 'date_start')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyDatePickerNewViews
              label="Дата до"
              views={['month', 'year']}
              value={this.state.date_end}
              func={this.changeDateRange.bind(this, 'date_end')}
            />
          </Grid>
            

          <Grid item xs={12} sm={3}>
            <Button onClick={this.update.bind(this)} variant="contained">
              Обновить
            </Button>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TableContainer>
              <Table size={'small'}>
                <TableHead>
                  <TableRow>
                    <TableCell>Точка</TableCell>
                    <TableCell></TableCell>

                    { this.state.dataDates.map( (item, key) =>
                      <TableCell key={key} style={{ textAlign: 'center' }}>{item.new_date}</TableCell>
                    ) }

                    <TableCell style={{ borderLeft: '1px solid #e5e5e5' }}>Итого</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  
                  { this.state.dataCities.map( (city, c_key) =>
                    <React.Fragment key={c_key}>
                      {city.points.map( (item, key) =>
                        <React.Fragment key={key}>
                          <TableRow>
                            <TableCell rowSpan={5}>{item.name}</TableCell>
                            <TableCell>Новые клиенты</TableCell>
                            { this.state.dataDates.map( (it, kk) =>
                              item.stat.map( (st, k) => 
                                it.new_date == st.new_date ?
                                  <TableCell key={k} style={{ textAlign: 'center' }}>{st.new_users}</TableCell>
                                    :
                                  null
                              )
                            ) }
                            <TableCell style={{ borderLeft: '1px solid #e5e5e5' }}>{item.svod.new_users}</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Количество заказов</TableCell>
                            { this.state.dataDates.map( (it, kk) =>
                              item.stat.map( (st, k) => 
                                it.new_date == st.new_date ?
                                  <TableCell key={k} style={{ textAlign: 'center' }}>{st.count}</TableCell>
                                    :
                                  null
                              )
                            ) }
                            <TableCell style={{ borderLeft: '1px solid #e5e5e5' }}>{item.svod.count}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Средний чек</TableCell>
                            { this.state.dataDates.map( (it, kk) =>
                              item.stat.map( (st, k) => 
                                it.new_date == st.new_date ?
                                  <TableCell key={k} style={{ textAlign: 'center' }}>{st.avg_summ}</TableCell>
                                    :
                                  null
                              )
                            ) }
                            <TableCell style={{ borderLeft: '1px solid #e5e5e5' }}>{item.svod.avg_summ}</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Ушедшие клиенты</TableCell>
                            { this.state.dataDates.map( (it, kk) =>
                              item.stat.map( (st, k) => 
                                it.new_date == st.new_date ?
                                  <TableCell key={k} style={{ textAlign: 'center' }}>{st.lost_users.lost_users}</TableCell>
                                    :
                                  null
                              )
                            ) }
                            <TableCell style={{ borderLeft: '1px solid #e5e5e5' }}>{item.svod.lost_users}</TableCell>
                          </TableRow>
                          <TableRow style={{ borderBottom: '10px solid #e5e5e5' }}>
                            <TableCell>Вернувшиеся клиенты</TableCell>
                            { this.state.dataDates.map( (it, kk) =>
                              item.stat.map( (st, k) => 
                                it.new_date == st.new_date ?
                                  <TableCell key={k} style={{ textAlign: 'center' }}>{st.lost_users.return_users}</TableCell>
                                    :
                                  null
                              )
                            ) }
                            <TableCell style={{ borderLeft: '1px solid #e5e5e5' }}>{item.svod.return_users}</TableCell>
                          </TableRow>


                          
                        </React.Fragment>
                      )}

                      <React.Fragment>
                        <TableRow>
                          <TableCell rowSpan={5}>Итого {city.name}</TableCell>
                          <TableCell>Новые клиенты</TableCell>
                          { this.state.dataDates.map( (it, kk) =>
                            city.data.map( (st, k) => 
                              it.new_date == st.new_date ?
                                <TableCell key={k} style={{ textAlign: 'center' }}>{st.new_users}</TableCell>
                                  :
                                null
                            )
                          ) }
                          
                        </TableRow>

                        <TableRow>
                          <TableCell>Количество заказов</TableCell>
                          { this.state.dataDates.map( (it, kk) =>
                            city.data.map( (st, k) => 
                              it.new_date == st.new_date ?
                                <TableCell key={k} style={{ textAlign: 'center' }}>{st.count}</TableCell>
                                  :
                                null
                            )
                          ) }
                          
                        </TableRow>
                        <TableRow>
                          <TableCell>Средний чек</TableCell>
                          { this.state.dataDates.map( (it, kk) =>
                            city.data.map( (st, k) => 
                              it.new_date == st.new_date ?
                                <TableCell key={k} style={{ textAlign: 'center' }}>{st.avg_summ}</TableCell>
                                  :
                                null
                            )
                          ) }
                          
                        </TableRow>

                        <TableRow>
                          <TableCell>Ушедшие клиенты</TableCell>
                          { this.state.dataDates.map( (it, kk) =>
                            city.data.map( (st, k) => 
                              it.new_date == st.new_date ?
                                <TableCell key={k} style={{ textAlign: 'center' }}>{st.lost_users.lost_users}</TableCell>
                                  :
                                null
                            )
                          ) }
                          
                        </TableRow>
                        <TableRow style={{ borderBottom: '10px solid #e5e5e5' }}>
                          <TableCell>Вернувшиеся клиенты</TableCell>
                          { this.state.dataDates.map( (it, kk) =>
                            city.data.map( (st, k) => 
                              it.new_date == st.new_date ?
                                <TableCell key={k} style={{ textAlign: 'center' }}>{st.lost_users.return_users}</TableCell>
                                  :
                                null
                            )
                          ) }
                          
                        </TableRow>
                      </React.Fragment>

                      <TableRow style={{ borderBottom: '10px solid #e5e5e5', height: 100 }} />
                          
                    </React.Fragment>
                  )}

                      <React.Fragment>
                        <TableRow>
                          <TableCell rowSpan={5}>Итого в сети</TableCell>
                          <TableCell>Новые клиенты</TableCell>
                          { this.state.dataDates.map( (it, kk) =>
                            this.state.all_data.map( (st, k) => 
                              it.new_date == st.new_date ?
                                <TableCell key={k} style={{ textAlign: 'center' }}>{st.new_users}</TableCell>
                                  :
                                null
                            )
                          ) }
                          
                        </TableRow>

                        <TableRow>
                          <TableCell>Количество заказов</TableCell>
                          { this.state.dataDates.map( (it, kk) =>
                            this.state.all_data.map( (st, k) => 
                              it.new_date == st.new_date ?
                                <TableCell key={k} style={{ textAlign: 'center' }}>{st.count}</TableCell>
                                  :
                                null
                            )
                          ) }
                          
                        </TableRow>
                        <TableRow>
                          <TableCell>Средний чек</TableCell>
                          { this.state.dataDates.map( (it, kk) =>
                            this.state.all_data.map( (st, k) => 
                              it.new_date == st.new_date ?
                                <TableCell key={k} style={{ textAlign: 'center' }}>{st.avg_summ}</TableCell>
                                  :
                                null
                            )
                          ) }
                          
                        </TableRow>

                        <TableRow>
                          <TableCell>Ушедшие клиенты</TableCell>
                          { this.state.dataDates.map( (it, kk) =>
                            this.state.all_data.map( (st, k) => 
                              it.new_date == st.new_date ?
                                <TableCell key={k} style={{ textAlign: 'center' }}>{st.lost_users.lost_users}</TableCell>
                                  :
                                null
                            )
                          ) }
                          
                        </TableRow>
                        <TableRow style={{ borderBottom: '10px solid #e5e5e5' }}>
                          <TableCell>Вернувшиеся клиенты</TableCell>
                          { this.state.dataDates.map( (it, kk) =>
                            this.state.all_data.map( (st, k) => 
                              it.new_date == st.new_date ?
                                <TableCell key={k} style={{ textAlign: 'center' }}>{st.lost_users.return_users}</TableCell>
                                  :
                                null
                            )
                          ) }
                          
                        </TableRow>
                      </React.Fragment>

                      

                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </>
    );
  }
}

export function StatByClients() {
  return <StatByClients_ />;
}

