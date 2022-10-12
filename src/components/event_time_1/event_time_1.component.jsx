import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

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

import CloseIcon from '@mui/icons-material/Close';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';

import { MySelect, MyAutocomplite, MyTimePicker, MyDatePickerNew } from '../../stores/elements';

const queryString = require('query-string');

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

class EventTime1_Modal extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);

    this.state = {
      item: {},
      fullScreen: false,
    };
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props.event);

    if (!this.props.event) {
      return;
    }

    if (this.props.event !== prevProps.event) {
      this.setState({
        item: this.props.event,
      });
    }
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

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

  changeTimeStart(data, event) {
    // console.log(item)

    const item = this.state.item;

    item[data] = event.target.value;

    this.setState({
      item
    });
  }

  changeTimeEnd(data, event) {
    // console.log(item)

    const item = this.state.item;

    item[data] = event.target.value;

    this.setState({
      item
    });
  }

  changeDateRange(data, value) {
   
    const item = this.state.item;

    item[data] = formatDate(value);

    this.setState({
      item
    });
  }

  save() {
    this.props.save(this, this.state.item);

    this.setState({
      item: this.props.event ? this.props.event : {},
    });

    this.props.onClose();
  }

  onClose() {
    this.setState({
      item: this.props.event ? this.props.event : {},
    });

    this.props.onClose();
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.onClose.bind(this)}
        fullScreen={this.state.fullScreen}
        fullWidth={true}
        maxWidth={this.props.method !== "Особый день" ? 'md' : 'lg'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="button">
          <Typography style={{ fontWeight: 'normal' }}>{this.props.method}</Typography>
          {this.state.fullScreen ? (
            <IconButton
              onClick={this.onClose.bind(this)}
              style={{ cursor: 'pointer' }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>

        <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
          <Grid container spacing={3} mb={3} item xs={12}>
          {this.props.method !== "Особый день" ? null :

            <Grid item sm={3} xs={12}>
              <MyDatePickerNew
                label="Дата"
                value={this.state.item.data}
                func={this.changeDateRange.bind(this, 'data')}
              />
            </Grid>
          }
        
          <Grid item sm={this.props.method !== "Особый день" ? 4 : 3} xs={6}>
            <MyTimePicker
              value={this.state.item.time_start}
              func={this.changeTimeStart.bind(this, 'time_start')}
              label="Время начала"
            />
          </Grid>
          
          <Grid item sm={this.props.method !== "Особый день" ? 4 : 3} xs={6}>
            <MyTimePicker
              value={this.state.item.time_end}
              func={this.changeTimeEnd.bind(this, 'time_end')}
              label="Время окончания"
              />
          </Grid>
         
          <Grid item sm={this.props.method !== "Особый день" ? 4 : 3} xs={12}>
            <MyAutocomplite
              label="Количество"
              multiple={false}
              freeSolo={true}
              func={(event, value) => {
                const item = this.state.item
                item.quantity = value
                this.setState({ item })}}
              data={this.state.item.array}
              value={this.state.item.quantity}
            />
          </Grid>
          </Grid>
        
        </DialogContent>

        <DialogActions>
          <Button onClick={this.save.bind(this)}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

class EventTime1_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'event_time_1',
      module_name: '',
      is_load: false,

      points: [],
      point: '0',
      modalDialog: false,
      method: '',

      item: [
        {
          id: '1',
          id_row: '1',
          data: '2022-10-05',
          time_start: '19:30',
          time_end: '20:30',
          quantity: 10,
        },
        {
          id: '1',
          id_row: '2',
          data: '2022-10-06',
          time_start: '19:30',
          time_end: '20:30',
          quantity: 20,
        },
      ],

      itemNew: {
        id: '',
        id_row: '',
        data: '',
        time_start: '',
        time_end: '',
        quantity: 0,
        array: [{name: '5'}, {name: '10'}, {name: '15'}, {name: '20'}]
      },

      event: {},

      cardData: [
        {
          id: '1',
          day_id: '1',
          day_week: 'Понедельник',
          data: [
            {
              id_row: '1',
              time_start: '19:30',
              time_end: '20:30',
              quantity: 20,
            },
            {
              id_row: '2',
              time_start: '20:30',
              time_end: '21:30',
              quantity: 30,
            },
          ],
        },
        {
          id: '1',
          day_id: '2',
          day_week: 'Вторник',
          data: [
            {
              id_row: '1',
              time_start: '19:30',
              time_end: '20:30',
              quantity: 20,
            },
            {
              id_row: '2',
              time_start: '20:30',
              time_end: '21:30',
              quantity: 30,
            },
          ],
        },
        {
          id: '1',
          day_id: '3',
          day_week: 'Среда',
          data: [
            {
              id_row: '1',
              time_start: '19:30',
              time_end: '20:30',
              quantity: 20,
            },
            {
              id_row: '2',
              time_start: '20:30',
              time_end: '21:30',
              quantity: 30,
            },
          ],
        },
        {
          id: '1',
          day_id: '4',
          day_week: 'Четверг',
          data: [
            {
              id_row: '1',
              time_start: '19:30',
              time_end: '20:30',
              quantity: 20,
            },
            {
              id_row: '2',
              time_start: '20:30',
              time_end: '21:30',
              quantity: 30,
            },
          ],
        },
        {
          id: '1',
          day_id: '5',
          day_week: 'Пятница',
          data: [
            {
              id_row: '1',
              time_start: '19:30',
              time_end: '20:30',
              quantity: 20,
            },
            {
              id_row: '2',
              time_start: '20:30',
              time_end: '21:30',
              quantity: 30,
            },
          ],
        },
        {
          id: '1',
          day_id: '6',
          day_week: 'Суббота',
          data: [
            {
              id_row: '1',
              time_start: '19:30',
              time_end: '20:30',
              quantity: 20,
            },
            {
              id_row: '2',
              time_start: '20:30',
              time_end: '21:30',
              quantity: 30,
            },
          ],
        },
        {
          id: '1',
          day_id: '7',
          day_week: 'Воскресенье',
          data: [
            {
              id_row: '1',
              time_start: '19:30',
              time_end: '20:30',
              quantity: 20,
            },
            {
              id_row: '2',
              time_start: '20:30',
              time_end: '21:30',
              quantity: 30,
            },
          ],
        },
      ],
    };
  }

  async componentDidMount() {
    let data = await this.getData('get_all');

    // console.log( data )

    this.setState({
      points: data.points,
      point: data.points[0].id,
      module_name: data.module_info.name,
    });

    // document.title = data.module_info.name;

    // setTimeout( () => {
    //   this.updateData();
    // }, 50 )
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

  changePoint(event) {
    let data = event.target.value;

    this.setState({
      point: data,
    });

    // setTimeout( () => {
    //   this.updateData();
    // }, 50 )
  }

  openModal(method, item, event) {

    const itemNew = this.state.itemNew;

    itemNew.id = this.state.point;
    
      this.setState({
        modalDialog: true,
        method,
        event: itemNew
      });
  
  }

  saveItem(event, item) {
    console.log(item);
    // console.log(data);
  }

  deleteItemAccordion(id) {
    // console.log(id)
  }

  deleteItemCard(id) {
    // console.log(id)
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Grid container spacing={3} mb={2}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
        </Grid>

        {/* модалка */}
        <EventTime1_Modal 
          open={this.state.modalDialog}
          onClose={() => {
            this.setState({ modalDialog: false });
          }}
          method={this.state.method}
          event={this.state.event}
          save={this.saveItem.bind(this)}
        />

        {/* выбор и кнопка */}
        <Grid container spacing={3} justifyContent="center" direction="column">
          <Grid
            container
            spacing={3}
            justifyContent="center"
            item
            xs={12}
          >
            <Grid item xs={12} sm={4}>
              <MySelect
                data={this.state.points}
                value={this.state.point}
                func={this.changePoint.bind(this)}
                label="Точка"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                disabled={this.state.point < 1 ? true : false}
                variant={this.state.point < 1 ? 'outlined' : 'contained'}
                style={{ whiteSpace: 'nowrap' }}
                onClick={this.openModal.bind(this, 'Особый день')}
              >
                Добавить особый день
              </Button>
            </Grid>
          </Grid>

          {/* аккардион */}
          {this.state.point < 1 ? null : (
            <Grid container justifyContent="center" spacing={3} p={3}>
              <Grid item sm={5} xs={12}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                  >
                    <Typography style={{ whiteSpace: 'nowrap' }}>
                      Особые дни
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Accordion>
                    <TableContainer>

                      <Table size="small" style={{ whiteSpace: 'nowrap' }}>
                        <TableHead>
                          <TableRow>
                            <TableCell style={{ width: '30%' }}  >
                              Дата
                            </TableCell>
                            <TableCell style={{ width: '30%' }}  >
                              Время
                            </TableCell>
                            <TableCell style={{ width: '30%' }}  >
                              Доставка
                            </TableCell>
                            <TableCell style={{ width: '10%' }}  ></TableCell>
                          </TableRow>
                        </TableHead>
                        {this.state.item.map((item, key) => (
                          <TableBody
                            key={key + 100}
                            sx={{
                              '& td': { border: 0 },
                              borderBottom: 1,
                              borderColor: 'divider',
                            }}
                          >
                            <TableRow>
                              <TableCell  >{item.data}</TableCell>
                              <TableCell  >
                                {item.time_start} - {item.time_end}
                              </TableCell>
                              <TableCell  >{item.quantity}</TableCell>
                              <TableCell  >
                                <CloseIcon
                                  onClick={this.deleteItemAccordion.bind(
                                    this,
                                    item.id_row
                                  )}
                                  style={{ cursor: 'pointer' }}
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        ))}
                      </Table>
                    </TableContainer>
                
                    </Accordion>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          )}
        </Grid>

        {/* карточки/таблица */}
        {this.state.point < 1 && this.state.cardData.length ? null : (
          <Grid container item xs={12} spacing={3} direction="row">
            {this.state.cardData.map((item, key) => (
              <Grid item sm={3}  key={key}>
                <Card
                  variant="outlined"
                  sx={{
                    border: 1,
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Grid align="center">{item.day_week}</Grid>
                  <Divider />
                  <Table size="small" style={{ whiteSpace: 'nowrap' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ maxWidth: '40%' }}>Время</TableCell>
                        <TableCell style={{ maxWidth: '40%' }}>
                          {' '}
                          Доставка
                        </TableCell>
                        <TableCell style={{ maxWidth: '20%' }}></TableCell>
                      </TableRow>
                    </TableHead>
                    {item.data.map((item, key) => (
                      <TableBody
                        key={key + 100}
                        sx={{
                          '& td': { border: 0 },
                          borderBottom: 1,
                          borderColor: 'divider',
                        }}
                      >
                        <TableRow>
                          <TableCell>
                            {item.time_start} - {item.time_end}
                          </TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>
                            <CloseIcon
                              onClick={this.deleteItemCard.bind(
                                this,
                                item.id_row
                              )}
                              style={{ cursor: 'pointer' }}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ))}
                  </Table>
                  <Button size="sm" fullWidth={true} onClick={this.openModal.bind(this, 'Добавить в текущие заказы')}>
                    Добавить
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </>
    );
  }
}

export function EventTime1() {
  return <EventTime1_ />;
}
