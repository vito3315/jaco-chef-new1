import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { formatDateMin, MyDatePickerNewViews } from '../../stores/elements';

import queryString from 'query-string';

var am5locales_ru_RU = {
  Jan: 'Янв',
  January: 'Янв',
  Feb: 'Фев',
  February: 'Фев',
  Mar: 'Мар',
  March: 'Мар',
  Apr: 'Апр',
  April: 'Апр',
  May: 'Май',
  Jun: 'Июн',
  June: 'Июн',
  Jul: 'Июл',
  July: 'Июл',
  Aug: 'Авг',
  August: 'Авг',
  Sep: 'Сен',
  September: 'Сен',
  Oct: 'Окт',
  October: 'Окт',
  Nov: 'Ноя',
  November: 'Ноя',
  Dec: 'Дек',
  December: 'Дек',
};

class StatByClients_Modal extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose.bind(this)}
        fullScreen={this.props.fullScreen}
        fullWidth
        maxWidth="calc(95% - 32px)"
      >
        <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
          <Grid item xs={12}>
            <h2 style={{ textAlign: 'center' }}>
              Итого {this.props.city}: {this.props.name}
            </h2>
            <div id={this.props.id} style={{ width: '100%', height: '500px' }}/>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.props.onClose.bind(this)}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

class StatByClients_ extends React.Component {
  chartnewusers = null;

  constructor(props) {
    super(props);

    this.state = {
      module: 'stat_by_clients',
      module_name: '',
      is_load: false,

      dataPoints: [],
      dataCities: [],
      all_data: [],
      dataDates: [],

      date_start: '',
      date_end: '',

      modalDialog: false,
      fullScreen: false,
      id: null,
      name: '',
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
  };

  handleResize() {
    if (window.innerWidth < 601) {
      this.setState({
        fullScreen: true,
      });
    } else {
      this.setState({
        fullScreen: false,
      });
    }
  }

  async update() {
    const city_id = this.state.city;

    const data = {
      city_id: city_id,
      date_start: this.state.date_start,
      date_end: this.state.date_end,
    };

    const res = await this.getData('get_data', data);

    this.setState({
      dataPoints: res.points,
      dataCities: res.cities,
      all_data: res.all_data,
      dataDates: res.date_list,
    });
  }

  changeDateRange(type, data) {
    this.setState({
      [type]: formatDateMin(data),
    });
  }

  openGraphModal(id, city, data) {
    this.handleResize();

    let myData;

    const allData = this.state.all_data;

    if (id === 'newUsers') {
      if (data) {
        myData = data.reduce((newData, item) => {
          newData.push({ date: item.new_date, count: item.new_users });
          return newData;
        }, []);
      } else {
        myData = allData.reduce((newData, item) => {
          newData.push({ date: item.new_date, count: item.new_users });
          return newData;
        }, []);
      }

      this.setState({
        name: 'Новые клиенты по месяцам',
      });
    }

    if (id === 'orders') {
      if (data) {
        myData = data.reduce((newData, item) => {
          newData.push({ date: item.new_date, count: item.count });
          return newData;
        }, []);
      } else {
        myData = allData.reduce((newData, item) => {
          newData.push({ date: item.new_date, count: item.count });
          return newData;
        }, []);
      }

      this.setState({
        name: 'Количество заказов по месяцам',
      });
    }

    if (id === 'avgSumm') {
      if (data) {
        myData = data.reduce((newData, item) => {
          newData.push({ date: item.new_date, count: item.avg_summ });
          return newData;
        }, []);
      } else {
        myData = allData.reduce((newData, item) => {
          newData.push({ date: item.new_date, count: item.avg_summ });
          return newData;
        }, []);
      }

      this.setState({
        name: 'Средний чек по месяцам',
      });
    }

    if (id === 'lostUsers') {
      if (data) {
        myData = data.reduce((newData, item) => {
          newData.push({
            date: item.new_date,
            count: item.lost_users.lost_users,
          });
          return newData;
        }, []);
      } else {
        myData = allData.reduce((newData, item) => {
          newData.push({
            date: item.new_date,
            count: item.lost_users.lost_users,
          });
          return newData;
        }, []);
      }

      this.setState({
        name: 'Ушедшие клиенты по месяцам',
      });
    }

    if (id === 'returnUsers') {
      if (data) {
        myData = data.reduce((newData, item) => {
          newData.push({
            date: item.new_date,
            count: item.lost_users.return_users,
          });
          return newData;
        }, []);
      } else {
        myData = allData.reduce((newData, item) => {
          newData.push({
            date: item.new_date,
            count: item.lost_users.return_users,
          });
          return newData;
        }, []);
      }

      this.setState({
        name: 'Вернувшиеся клиенты по месяцам',
      });
    }

    this.setState({
      modalDialog: true,
      city,
      id,
    });

    setTimeout(() => {
      this.renderGraph(myData, id);
    }, 300);
  }

  renderGraph(MyData, id) {
    if (this.chartnewusers) {
      this.chartnewusers.dispose();
    }

    var root = am5.Root.new(id);
    this.chartnewusers = root;

    root.locale = am5locales_ru_RU;

    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: 'zoomX',
        layout: root.verticalLayout,
      })
    );

    var data = [];

    MyData.map((item) => {
      let date = item.date.split('-');

      data.push({
        date: new Date(date[0], parseInt(date[1]) - 1, 1).getTime(),
        value: parseInt(item.count),
      });
    });

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: 'month', count: 1 },
        startLocation: 0.5,
        endLocation: 0.5,
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30,
        }),
      })
    );

    xAxis.get('dateFormats')['day'] = 'MM/dd';
    xAxis.get('periodChangeDateFormats')['day'] = 'MM/dd';
    xAxis.get('dateFormats')['month'] = 'MMMM';

    // Create series правка 1 Новые клиенты по месяцам
    function createSeries(name, field, data) {
      var series = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field,
          valueXField: 'date',
          tooltip: am5.Tooltip.new(root, {}),
          maskBullets: false,
        })
      );

      // правка radius: 5->3
      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 2,
            fill: series.get('fill'),
          }),
        });
      });

      series.strokes.template.set('strokeWidth', 3);
      series
        .get('tooltip')
        .label.set('text', '[bold]{name}[/]\n{valueX.formatDate()}: {valueY}');
      series.data.setAll(data);
    }

    createSeries('Всего', 'value', data);

    // Add cursor
    chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'zoomXY',
        xAxis: xAxis,
      })
    );

    xAxis.set(
      'tooltip',
      am5.Tooltip.new(root, {
        themeTags: ['axis'],
      })
    );

    yAxis.set(
      'tooltip',
      am5.Tooltip.new(root, {
        themeTags: ['axis'],
      })
    );
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <StatByClients_Modal
          onClose={() => this.setState({ modalDialog: false })}
          fullScreen={this.state.fullScreen}
          open={this.state.modalDialog}
          city={this.state.city}
          name={this.state.name}
          id={this.state.id}
        />

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
            <TableContainer sx={{ maxHeight: { xs: 'none', sm: 1000 } }}>
              <Table stickyHeader size="small">
                <TableHead style={{ position: 'sticky', top: 0, zIndex: 7 }}>
                  <TableRow>
                    <TableCell sx={{ zIndex: 30, minWidth: 200, left: 0 }}>Точка</TableCell>
                    <TableCell sx={{ zIndex: 30, left: 200 }}></TableCell>
                    {this.state.dataDates.map((item, key) => <TableCell key={key} style={{ textAlign: 'center', minWidth: 100 }}>{item.new_date}</TableCell>)}
                    <TableCell style={{ borderLeft: '1px solid #e5e5e5', minWidth: 100 }}>Итого</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {this.state.dataCities.map((city, c_key) => (
                    <React.Fragment key={c_key}>
                      {city.points.map((item, key) => (
                        <React.Fragment key={key}>

                          <TableRow>
                            <TableCell variant="head" style={{minWidth: 200, position: 'sticky', left: 0, border: 'none'}}></TableCell>
                            <TableCell variant="head" style={{minWidth: 250, position: 'sticky', left: 200}}>Новые клиенты</TableCell>
                            {this.state.dataDates.map(it =>
                              item.stat.map((st, k) =>
                                it.new_date == st.new_date ? (
                                  <TableCell key={k} style={{ textAlign: 'center' }}>{st.new_users}</TableCell>
                                ) : null
                              )
                            )}
                            <TableCell style={{ borderLeft: '1px solid #e5e5e5' }}>{item.svod.new_users}</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell variant="head" style={{minWidth: 200, position: 'sticky', left: 0, border: 'none'}}></TableCell>
                            <TableCell variant="head" style={{minWidth: 250, position: 'sticky', left: 200}}>Количество заказов</TableCell>
                            {this.state.dataDates.map(it =>
                              item.stat.map((st, k) =>
                                it.new_date == st.new_date ? (
                                  <TableCell key={k} style={{ textAlign: 'center' }}>{st.count}</TableCell>
                                ) : null
                              )
                            )}
                            <TableCell style={{ borderLeft: '1px solid #e5e5e5' }}>{item.svod.count}</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell variant="head" style={{minWidth: 200, position: 'sticky', left: 0, border: 'none'}}>{item.name}</TableCell>
                            <TableCell variant="head" style={{minWidth: 250, position: 'sticky', left: 200}}>Средний чек</TableCell>
                            {this.state.dataDates.map((it, kk) =>
                              item.stat.map((st, k) =>
                                it.new_date == st.new_date ? (
                                  <TableCell key={k} style={{ textAlign: 'center' }}>{st.avg_summ}</TableCell>
                                ) : null
                              )
                            )}
                            <TableCell style={{ borderLeft: '1px solid #e5e5e5' }}>{item.svod.avg_summ}</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell variant="head" style={{minWidth: 200, position: 'sticky', left: 0, border: 'none'}}></TableCell>
                            <TableCell variant="head" style={{minWidth: 250, position: 'sticky', left: 200}}>Ушедшие клиенты</TableCell>
                            {this.state.dataDates.map((it, kk) =>
                              item.stat.map((st, k) =>
                                it.new_date == st.new_date ? (
                                  <TableCell key={k} style={{ textAlign: 'center' }}>{st.lost_users.lost_users}</TableCell>
                                ) : null
                              )
                            )}
                            <TableCell style={{ borderLeft: '1px solid #e5e5e5' }}>{item.svod.lost_users}</TableCell>
                          </TableRow>

                          <TableRow style={{ borderBottom: '10px solid #e5e5e5' }}>
                            <TableCell variant="head" style={{minWidth: 200, position: 'sticky', left: 0}}></TableCell>
                            <TableCell variant="head" style={{minWidth: 250, position: 'sticky', left: 200}}>Вернувшиеся клиенты</TableCell>
                            {this.state.dataDates.map((it, kk) =>
                              item.stat.map((st, k) =>
                                it.new_date == st.new_date ? (
                                  <TableCell key={k} style={{ textAlign: 'center' }}>{st.lost_users.return_users}</TableCell>
                                ) : null
                              )
                            )}
                            <TableCell style={{ borderLeft: '1px solid #e5e5e5', position: 'sticky', left: 0 }}>{item.svod.return_users}</TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))}

                      <React.Fragment>
                        <TableRow sx={{ cursor: 'pointer', '& td': { '&:hover': { color: '#c03' } } }}
                          onClick={this.openGraphModal.bind(this, 'newUsers', city.name, city.data)}
                        >
                          <TableCell variant="head" style={{minWidth: 200, position: 'sticky', left: 0, border: 'none'}}></TableCell>
                          <TableCell variant="head" style={{minWidth: 250, position: 'sticky', left: 200}}>Новые клиенты</TableCell>
                          {this.state.dataDates.map((it, kk) =>
                            city.data.map((st, k) =>
                              it.new_date == st.new_date ? (
                                <TableCell key={k} style={{ textAlign: 'center' }}>{st.new_users}</TableCell>
                              ) : null
                            )
                          )}
                        </TableRow>
                        
                        <TableRow sx={{ cursor: 'pointer', '& td': { '&:hover': { color: '#c03' } } }}
                          onClick={this.openGraphModal.bind(this, 'orders', city.name, city.data)}
                        >
                          <TableCell variant="head" style={{minWidth: 200, position: 'sticky', left: 0, border: 'none'}}></TableCell>
                          <TableCell variant="head" style={{minWidth: 250, position: 'sticky', left: 200}}>Количество заказов</TableCell>
                          {this.state.dataDates.map((it, kk) =>
                            city.data.map((st, k) =>
                              it.new_date == st.new_date ? (
                                <TableCell key={k} style={{ textAlign: 'center' }}>{st.count}</TableCell>
                              ) : null
                            )
                          )}
                        </TableRow>

                        <TableRow>
                          <TableCell variant="head" style={{minWidth: 200, position: 'sticky', left: 0, border: 'none'}}>Итого {city.name}</TableCell>
                          <TableCell variant="head" style={{minWidth: 250, position: 'sticky', left: 200, cursor: 'pointer', '&:hover': { color: '#c03' } }}
                            onClick={this.openGraphModal.bind(this, 'avgSumm', city.name, city.data)}>Средний чек</TableCell>
                          {this.state.dataDates.map((it, kk) =>
                            city.data.map((st, k) =>
                              it.new_date == st.new_date ? (
                                <TableCell onClick={this.openGraphModal.bind(this, 'avgSumm', city.name, city.data)}
                                  style={{minWidth: 250, position: 'sticky', left: 200, textAlign: 'center', cursor: 'pointer', '&:hover': { color: '#c03' } }}
                                  key={k}
                                >
                                  {st.avg_summ}
                                </TableCell>
                              ) : null
                            )
                          )}
                        </TableRow>
                       
                        <TableRow sx={{ cursor: 'pointer', '& td': { '&:hover': { color: '#c03' } } }}
                          onClick={this.openGraphModal.bind(this, 'lostUsers', city.name, city.data)}
                        >
                          <TableCell variant="head" style={{minWidth: 200, position: 'sticky', left: 0, border: 'none'}}></TableCell>
                          <TableCell variant="head" style={{minWidth: 250, position: 'sticky', left: 200}}>Ушедшие клиенты</TableCell>
                          {this.state.dataDates.map((it, kk) =>
                            city.data.map((st, k) =>
                              it.new_date == st.new_date ? (
                                <TableCell key={k} style={{ textAlign: 'center' }}>{st.lost_users.lost_users}</TableCell>
                              ) : null
                            )
                          )}
                        </TableRow>

                        <TableRow sx={{ borderBottom: '10px solid #e5e5e5', cursor: 'pointer', '& td': { '&:hover': { color: '#c03' } } }}
                          onClick={this.openGraphModal.bind(this, 'returnUsers', city.name, city.data)}
                        >
                          <TableCell variant="head" style={{minWidth: 200, position: 'sticky', left: 0}}></TableCell>
                          <TableCell variant="head" style={{minWidth: 250, position: 'sticky', left: 200}}>Вернувшиеся клиенты</TableCell>
                          {this.state.dataDates.map((it, kk) =>
                            city.data.map((st, k) =>
                              it.new_date == st.new_date ? (
                                <TableCell key={k} style={{ textAlign: 'center' }}>{st.lost_users.return_users}</TableCell>
                              ) : null
                            )
                          )}
                        </TableRow>
                      </React.Fragment>

                      <TableCell colSpan={this.state.dataDates.length + 3} style={{borderBottom: '10px solid #e5e5e5', height: 100}}></TableCell>
                    </React.Fragment>
                  ))}

                  <React.Fragment>
                    <TableRow>
                      <TableCell rowSpan={6} variant="head" style={{ minWidth: 200, position: 'sticky', left: 0 }}>Итого в сети</TableCell>
                      <TableCell variant="head" sx={{cursor: this.state.dataDates.length ? 'pointer' : null, '&:hover': {color: this.state.dataDates.length ? '#c03' : null},
                          minWidth: 250, position: 'sticky', left: 200}}
                          onClick={this.state.dataDates.length ? this.openGraphModal.bind(this, 'newUsers', 'в сети', null) : null}
                      >Новые клиенты</TableCell>

                      {this.state.dataDates.map((it, kk) =>
                        this.state.all_data.map((st, k) =>
                          it.new_date == st.new_date ? (
                            <TableCell key={k} sx={{cursor: this.state.dataDates.length ? 'pointer' : null,
                                '&:hover': {color: this.state.dataDates.length ? '#c03' : null },
                                minWidth: 250, position: 'sticky', left: 200, textAlign: 'center'}}
                                onClick={this.state.dataDates.length ? this.openGraphModal.bind(this, 'newUsers', 'в сети', null) : null}
                            >
                              {st.new_users}
                            </TableCell>
                          ) : null
                        )
                      )}
                    </TableRow>

                    <TableRow sx={{cursor: this.state.dataDates.length ? 'pointer' : null, '& td': { '&:hover': { color: this.state.dataDates.length ? '#c03' : null} }}}
                      onClick={this.state.dataDates.length ? this.openGraphModal.bind(this, 'orders', 'в сети', null) : null}
                    >
                      <TableCell variant="head" style={{ minWidth: 250, position: 'sticky', left: 200 }}>Количество заказов</TableCell>
                      {this.state.dataDates.map((it, kk) =>
                        this.state.all_data.map((st, k) =>
                          it.new_date == st.new_date ? (
                            <TableCell key={k} style={{ textAlign: 'center' }}>{st.count}</TableCell>
                          ) : null
                        )
                      )}
                    </TableRow>
                   
                    <TableRow sx={{cursor: this.state.dataDates.length ? 'pointer' : null, '& td': { '&:hover': { color: this.state.dataDates.length ? '#c03' : null} }}}
                      onClick={this.state.dataDates.length ? this.openGraphModal.bind(this, 'avgSumm', 'в сети', null) : null}
                    >
                      <TableCell variant="head" style={{ minWidth: 250, position: 'sticky', left: 200 }}>Средний чек</TableCell>
                      {this.state.dataDates.map((it, kk) =>
                        this.state.all_data.map((st, k) =>
                          it.new_date == st.new_date ? (
                            <TableCell key={k} style={{ textAlign: 'center' }}>{st.avg_summ}</TableCell>
                          ) : null
                        )
                      )}
                    </TableRow>
                 
                    <TableRow sx={{cursor: this.state.dataDates.length ? 'pointer' : null, '& td': { '&:hover': { color: this.state.dataDates.length ? '#c03' : null} }}}
                      onClick={this.state.dataDates.length ? this.openGraphModal.bind(this, 'lostUsers', 'в сети', null) : null}
                    >
                      <TableCell variant="head" style={{ minWidth: 250, position: 'sticky', left: 200 }}>Ушедшие клиенты</TableCell>
                      {this.state.dataDates.map((it, kk) =>
                        this.state.all_data.map((st, k) =>
                          it.new_date == st.new_date ? (
                            <TableCell key={k} style={{ textAlign: 'center' }}>{st.lost_users.lost_users}</TableCell>
                          ) : null
                        )
                      )}
                    </TableRow>
                    
                    <TableRow sx={{cursor: this.state.dataDates.length ? 'pointer' : null, '& td': { '&:hover': { color: this.state.dataDates.length ? '#c03' : null} }}}
                      onClick={this.state.dataDates.length ? this.openGraphModal.bind(this, 'returnUsers', 'в сети', null) : null}
                    >
                      <TableCell variant="head" style={{ minWidth: 250, position: 'sticky', left: 200 }}>Вернувшиеся клиенты</TableCell>
                      {this.state.dataDates.map((it, kk) =>
                        this.state.all_data.map((st, k) =>
                          it.new_date == st.new_date ? (
                            <TableCell key={k} style={{ textAlign: 'center' }}>{st.lost_users.return_users}</TableCell>
                          ) : null
                        )
                      )}
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
