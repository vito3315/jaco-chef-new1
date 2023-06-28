import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MyAutocomplite, MyDatePickerNew, formatDate, MyAlert } from '../../stores/elements';

import queryString from 'query-string';

import dayjs from 'dayjs';

class KitchenStat_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'kitchen_stat',
      module_name: '',
      is_load: false,

      points: [],
      point: [],

      date_start: formatDate(new Date()),
      date_end: formatDate(new Date()),

      arrayOrdersByH: null,
      data: null,
      statAllItemsCount: null,
    };
  }

  async componentDidMount() {
    const data = await this.getData('get_all');

    this.setState({
      points: data.points,
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

  changePoint(data, event, value) {
    this.setState({
      [data]: value,
    });
  }

  changeDateRange(data, event) {
    this.setState({
      [data]: event ? event : '',
    });
  }

  async getStat() {
    const point = this.state.point;

    if (!point.length) {
      this.setState({
        openAlert: true,
        err_status: false,
        err_text: 'Выберите точку!',
      });

      return;
    }

    const date_start = this.state.date_start;
    const date_end = this.state.date_end;

    const point_list = point.reduce((list, item) => {
      list.push({ id: item.id, base: item.base });
      return list;
    }, []);

    const data = {
      start_date: dayjs(date_start).format('YYYY-MM-DD'),
      end_date: dayjs(date_end).format('YYYY-MM-DD'),
      point_list,
    };

    const res = await this.getData('get_this_stat', data);

    const arrayOrdersByH = Object.entries(res.orders_by_h).reduce((data, [key, value]) => {
        if (!isNaN(Number(key))) {

          if (key.startsWith('0')) {
            key = key.substring(1);
          }

          value = { ...{ h: key }, ...value };
          data = [...data, ...[value]];
        }

        return data;
      }, []).sort((a, b) => a.h - b.h);

    const statAllItemsCount = res.stat_all_items.reduce((count, item) => count + Number(item.count), 0);

    this.setState({
      data: res,
      arrayOrdersByH,
      statAllItemsCount,
    });
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <MyAlert
          isOpen={this.state.openAlert}
          onClose={() => this.setState({ openAlert: false })}
          status={this.state.err_status}
          text={this.state.err_text}
        />

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={5}>
            <MyAutocomplite
              label="Точки"
              multiple={true}
              data={this.state.points}
              value={this.state.point}
              func={this.changePoint.bind(this, 'point')}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyDatePickerNew
              label="Дата от"
              value={this.state.date_start}
              func={this.changeDateRange.bind(this, 'date_start')}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyDatePickerNew
              label="Дата до"
              value={this.state.date_end}
              func={this.changeDateRange.bind(this, 'date_end')}
            />
          </Grid>

          <Grid item xs={12} sm={1}>
            <Button onClick={this.getStat.bind(this)} variant="contained">
              Обновить
            </Button>
          </Grid>

          {!this.state.data ? null : (
            <>
              {/* таблица Оформленные заказы по часам */}
              {!this.state.arrayOrdersByH.length ? null : (
                <Grid item xs={12} sm={12} mt={5}>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={`${this.state.arrayOrdersByH.length}` + 2}>
                            <h2>Оформленные заказы по часам</h2>
                          </TableCell>
                        </TableRow>
                        
                        <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                          <TableCell sx={{ minWidth: 100 }}>Тип</TableCell>
                          {this.state.arrayOrdersByH.map((item, key) => (
                            <TableCell key={key} sx={{ minWidth: 50 }}>
                              {item.h}
                            </TableCell>
                          ))}
                          <TableCell sx={{ minWidth: 100 }}>Всего</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        <TableRow hover>
                          <TableCell>Роллы</TableCell>
                          {this.state.arrayOrdersByH.map((item, key) => (
                            <TableCell key={key}>{item.count_rolls}</TableCell>
                          ))}
                          <TableCell>
                            {this.state.data.orders_by_h.sv_r}
                          </TableCell>
                        </TableRow>

                        <TableRow hover>
                          <TableCell>готовые Роллы</TableCell>
                          {this.state.arrayOrdersByH.map((item, key) => (
                            <TableCell key={key}>{item.ready_rolls}</TableCell>
                          ))}
                          <TableCell></TableCell>
                        </TableRow>

                        <TableRow hover>
                          <TableCell>Пицца</TableCell>
                          {this.state.arrayOrdersByH.map((item, key) => (
                            <TableCell key={key}>{item.count_pizza}</TableCell>
                          ))}
                          <TableCell>
                            {this.state.data.orders_by_h.sv_p}
                          </TableCell>
                        </TableRow>

                        <TableRow hover>
                          <TableCell>готовая Пицца</TableCell>
                          {this.state.arrayOrdersByH.map((item, key) => (
                            <TableCell key={key}>{item.ready_pizza}</TableCell>
                          ))}
                          <TableCell></TableCell>
                        </TableRow>

                        <TableRow hover>
                          <TableCell>Заказы</TableCell>
                          {this.state.arrayOrdersByH.map((item, key) => (
                            <TableCell key={key}>{item.count_orders}</TableCell>
                          ))}
                          <TableCell>
                            {this.state.data.orders_by_h.sv_o}
                          </TableCell>
                        </TableRow>

                        <TableRow hover>
                          <TableCell>Доставки</TableCell>
                          {this.state.arrayOrdersByH.map((item, key) => (
                            <TableCell key={key}>{item.count_div}</TableCell>
                          ))}
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              )}

              {/* таблица Завершенные заказы по типу */}
              {!this.state.data.type_stat_new.length ? null : (
                <Grid item xs={12} sm={6} mt={5}>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={2}>
                            <h2>Завершенные заказы по типу</h2>
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                          <TableCell>Тип заказа</TableCell>
                          <TableCell>Количество</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {this.state.data.type_stat_new.map((item, key) => (
                          <TableRow hover key={key}>
                            <TableCell>{item.type_order}</TableCell>
                            <TableCell>{item.count}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              )}

              {/* таблица Заказы по статусу */}
              {!this.state.data.status_stat.length ? null : (
                <Grid item xs={12} sm={6} mt={5}>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={2}>
                            <h2>Заказы по статусу</h2>
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                          <TableCell>Статус заказа</TableCell>
                          <TableCell>Количество</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {this.state.data.status_stat.map((item, key) => (
                          <TableRow hover key={key}>
                            <TableCell>{item.status_order}</TableCell>
                            <TableCell>{item.count}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              )}

              {/* таблица Не завершенные заказы */}
              {!this.state.data.fake_orders.length ? null : (
                <Grid item xs={12} sm={12} mt={5}>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={6}>
                            <h2>Не завершенные заказы</h2>
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                          <TableCell sx={{ minWidth: 100 }}>№</TableCell>
                          <TableCell sx={{ minWidth: 100 }}>Дата</TableCell>
                          <TableCell sx={{ minWidth: 100 }}>Тип</TableCell>
                          <TableCell sx={{ minWidth: 100 }}>Статус</TableCell>
                          <TableCell sx={{ minWidth: 100 }}>Сборщик</TableCell>
                          <TableCell sx={{ minWidth: 100 }}>Курьер</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {this.state.data.fake_orders.map((item, key) => (
                          <TableRow hover key={key}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.date_time_order}</TableCell>
                            <TableCell>{item.type_order}</TableCell>
                            <TableCell>{item.status_order}</TableCell>
                            <TableCell>{item.kassir}</TableCell>
                            <TableCell>{item.driver}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              )}

              {/* аккордион Проданные позиции (разбивка сетов, без допов) */}
              {!this.state.data.stat_all_items.length ? null : (
                <Grid item xs={12} sm={6} mt={3} mb={3}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Grid sx={{ width: '100%', display: 'flex', flexDirection: { sm: 'row', xs: 'column' } }}>
                        <Typography sx={{ fontWeight: 'bold', marginRight: { sm: 3, xs: 0 }, marginBottom: { sm: 0, xs: 3 } }}>
                          Проданные позиции (разбивка сетов, без допов)
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>
                          Всего: {this.state.statAllItemsCount}
                        </Typography>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails style={{ width: '100%', overflow: 'hidden' }}>
                      <Table>
                        <TableHead>
                          <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                            <TableCell style={{ width: '70%' }}>Название</TableCell>
                            <TableCell style={{ width: '30%' }}>Кол-во</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {this.state.data.stat_all_items.map((item, key) => (
                            <TableRow key={key} hover>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.count}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow hover sx={{ '& td': { fontWeight: 'bold' } }}>
                            <TableCell>Всего</TableCell>
                            <TableCell>{this.state.statAllItemsCount}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              )}

              {/* аккордион Проданные позиции (все) */}
              {!this.state.data.all_items_all.length ? null : (
                <Grid item xs={12} sm={6} sx={{ marginTop: { xs: 0, sm: 3 } }} mb={3}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        Проданные позиции (все)
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ width: '100%', overflow: 'hidden' }}>
                      <Table>
                        <TableHead>
                          <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                            <TableCell style={{ width: '70%' }}>Название</TableCell>
                            <TableCell style={{ width: '30%' }}>Кол-во</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {this.state.data.all_items_all.map((item, key) => (
                            <TableRow key={key} hover>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.count}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              )}

              {/* аккордион Проданные позиции по категориям */}
              {!this.state.data.stat_cat.length ? null : (
                <Grid item xs={12} sm={6} mb={3}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        Проданные позиции по категориям
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ width: '100%', overflow: 'hidden' }}>
                      <Table>
                        <TableHead>
                          <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                            <TableCell style={{ width: '70%' }}>Позиция</TableCell>
                            <TableCell style={{ width: '30%' }}>Кол-во</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {this.state.data.stat_cat.map((item, key) => (
                            <TableRow key={key} hover>
                              <TableCell>{item?.name ?? item.cat_name}</TableCell>
                              <TableCell>{item.count}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              )}

              {/* аккордион Использованные промокоды */}
              {!this.state.data.promo_stat.length ? null : (
                <Grid item xs={12} sm={6} mb={3}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        Использованные промокоды
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ width: '100%', overflow: 'hidden' }}>
                      <Table>
                        <TableHead>
                          <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                            <TableCell style={{ width: '70%' }}>Промокод</TableCell>
                            <TableCell style={{ width: '30%' }}>Кол-во</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {this.state.data.promo_stat.map((item, key) => (
                            <TableRow key={key} hover>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.count}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </>
    );
  }
}

export function KitchenStat() {
  return <KitchenStat_ />;
}
