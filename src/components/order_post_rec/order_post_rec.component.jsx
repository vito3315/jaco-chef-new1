import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Snackbar from '@mui/material/Snackbar';

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import {
  MySelect,
  MyAutocomplite2,
  MyAutocomplite,
} from '../../stores/elements';

const queryString = require('query-string');

class OrderPostRec_Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      points: [],
      point: [],
    };
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props.event);

    if (!this.props.points) {
      return;
    }

    if (this.props.points !== prevProps.points) {
      this.setState({
        points: this.props.points,
      });
    }
  }

  choosePoint(event, value) {
    this.setState({
      point: value,
    });
  }

  save() {

    this.props.save(this.state.point)

    this.setState({
      points: this.props.points ? this.props.points : [],
    });

    this.props.onClose();
  }

  onClose() {
    this.setState({
      points: this.props.points ? this.props.points : [],
    });

    this.props.onClose();
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.onClose.bind(this)}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogTitle>Где применить</DialogTitle>

        <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
          <Grid item xs={12} sm={4}>
            <MyAutocomplite
              label="Точки"
              multiple={true}
              data={this.state.points}
              value={this.state.point}
              func={this.choosePoint.bind(this)}
            />
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

class OrderPostRec_TableItem extends React.Component {

  shouldComponentUpdate(nextProps) {
    return (nextProps.it.item_id_rec !== this.props.it.item_id_rec
         || nextProps.it.vendor_id_rec !== this.props.it.vendor_id_rec);
  }

  render(){
    const it = this.props.it;

    let vendors = [];
    let item = it.items.filter(el => el.id === it.item_id_rec);

    if( item.length > 0 ){
      vendors = item[0].vendors;
    }

    let pq = vendors.find(el => el.id === it.vendor_id_rec);

    if( pq ){
      pq = pq.pq;
    }else{
      pq = '';
    }

    return(
      <TableRow
        sx={{ '& td': { border: 0 } }}
        hover={true}
      >
        <TableCell>{it.id}</TableCell>
        <TableCell>{it.name}</TableCell>

        <TableCell>
          {it.items.length === 1 ? (
            it.items[0].name
          ) : (
            <MySelect
              data={it.items}
              value={it.item_id_rec}
              func={this.props.changeSelect.bind(
                this,
                it.id,
                'item_id_rec',
                this.props.type
              )}
            />
          )}
        </TableCell>

        <TableCell>
          {pq} {it.ei_name}
        </TableCell>

        <TableCell>
          <MySelect
            is_none={false}
            data={vendors}
            value={it.vendor_id_rec}
            func={this.props.changeSelect.bind(
                  this,
                  it.id,
                  'vendor_id_rec',
                  this.props.type
                )}
              />
        </TableCell>
      </TableRow>
    )
  }
}

class OrderPostRec_Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      cats: [],
      freeItems: [],

      search: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (!this.props) {
      return;
    }

    if (this.props !== prevProps) {

      if(this.state.search) {

        const searchValue = this.state.search;

        const catsFilter = JSON.parse(JSON.stringify(this.props.cats));

        const freeItems = JSON.parse(JSON.stringify(this.props.freeItems));

        catsFilter.map((cat) => {
          let arr = [];
  
          cat.cats.map((el) => {
            el.items = el.items.filter((value) =>
              value.name.toLowerCase().includes(searchValue.toLowerCase())
            );
  
            if (!el.items.length) {
              arr.push(el);
            }
  
            return el;
          });
  
          if (cat.cats.length === arr.length) {
            cat.all = 0;
          }
        });
  
        const freeItemsFilter = freeItems.filter((value) =>
          value.name.toLowerCase().includes(searchValue.toLowerCase())
        );
  
        this.setState({
          cats: catsFilter,
          freeItems: freeItemsFilter,
          items: this.props.items,
        });

      } else {

        this.setState({
          cats: JSON.parse(JSON.stringify(this.props.cats)),
          freeItems: JSON.parse(JSON.stringify(this.props.freeItems)),
          items: this.props.items,
        });

      }

  }
}

  search(event) {

    let searchValue;

    if (event.target.value) {
      searchValue = event.target.value ?? '';

      this.setState({
      search: searchValue
      });

    } else {
      searchValue = event.target.innerText ?? '';

      this.setState({
        search: searchValue
        });
    } 

    const catsFilter = this.state.cats;

    const freeItems = this.state.freeItems;

    if (searchValue !== '' || searchValue.length > 1) {
      catsFilter.map((cat) => {
        let arr = [];

        cat.cats.map((el) => {
          el.items = el.items.filter((value) =>
            value.name.toLowerCase().includes(searchValue.toLowerCase())
          );

          if (!el.items.length) {
            arr.push(el);
          }

          return el;
        });

        if (cat.cats.length === arr.length) {
          cat.all = 0;
        }
      });

      const freeItemsFilter = freeItems.filter((value) =>
        value.name.toLowerCase().includes(searchValue.toLowerCase())
      );

      this.setState({
        cats: catsFilter,
        freeItems: freeItemsFilter,
      });

    } else {
      
      this.setState({
        cats: JSON.parse(JSON.stringify(this.props.cats)),
        freeItems: JSON.parse(JSON.stringify(this.props.freeItems)),
      });
    }
  }

  render() {
    console.log( 'OrderPostRec_Table render' )

    return (
      <>
        <Grid item xs={12} sm={4}>
          <MyAutocomplite2
            label="Поиск"
            freeSolo={true}
            multiple={false}
            data={this.state.items}
            value={this.state.search}
            func={this.search.bind(this)}
            onBlur={this.search.bind(this)}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Button variant="contained" onClick={this.props.openModal.bind(this)}>
            Сохранить изменения
          </Button>
        </Grid>

        <Grid item xs={12} sm={12} mb={6}>
          {this.state.cats
            .filter((it) => it.all !== 0)
            .map((item, key) => (
              <Accordion key={key}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{item.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {item.cats
                    .filter((category) => category.items.length !== 0)
                    .map((category, key_cat) => (
                      <Accordion key={key_cat}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>{category.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                          style={{ width: '100%', overflow: 'scroll' }}
                        >
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell style={{ width: '2%' }}>
                                    #
                                  </TableCell>
                                  <TableCell style={{ width: '30%' }}>
                                    Заготовка
                                  </TableCell>
                                  <TableCell style={{ width: '25%' }}>
                                    Товар
                                  </TableCell>
                                  <TableCell style={{ width: '13%' }}>
                                    Объем (упак.)
                                  </TableCell>
                                  <TableCell style={{ width: '30%' }}>
                                    Поставщик
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {category.items.map((it, key) => (
                                  <OrderPostRec_TableItem key={key} it={it} changeSelect={this.props.changeSelect} type={1}/>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                </AccordionDetails>
              </Accordion>
            ))}

          {this.state.freeItems.length == 0 ? null : (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Без категории</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ width: '100%', overflow: 'scroll' }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width: '2%' }}>#</TableCell>
                        <TableCell style={{ width: '30%' }}>
                          Заготовка
                        </TableCell>
                        <TableCell style={{ width: '25%' }}>Товар</TableCell>
                        <TableCell style={{ width: '13%' }}>
                          Объем (упак.)
                        </TableCell>
                        <TableCell style={{ width: '30%' }}>
                          Поставщик
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {this.state.freeItems.map((it, key) => (
                        <OrderPostRec_TableItem key={key} it={it} changeSelect={this.props.changeSelect} type={2}/>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          )}
        </Grid>
      </>
    );
  }
}

class OrderPostRec_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'order_post_rec',
      module_name: '',
      is_load: false,

      points: [],
      point: '0',

      items: [],

      cats: [],

      freeItems: [],

      hist: [],

      modalDialog: false,
      snackbar: false,
      st: false,
      error: ''
    };
  }

  async componentDidMount() {
    let data = await this.getData('get_all');

    console.log(data);

    this.setState({
      points: data.point_list,
      point: data.point_list[0].id,
      module_name: data.module_info.name,
      cats: data.cats,
      freeItems: data.items_free,
      hist: data.hist,
      items: data.items,
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

  async changePoint(event) {
    let point = event.target.value;

    let data = await this.getData('get_all', point);

    this.setState({
      point,
      items: data.items,
      cats: data.cats,
      freeItems: data.items_free,
      hist: data.hist,
    });
  }

  openModal() {
    this.setState({
      modalDialog: true,
    });
  }

  findPQ(it){
    let vendors = [];
    let item = it.items.filter(el => el.id === it.item_id_rec);

    if( item.length > 0 ){
      vendors = item[0].vendors;
    }

    let pq = vendors.find(el => el.id === it.vendor_id_rec);

    if( pq ){
      pq = pq.pq;
    }else{
      pq = '';
    }

    return pq;
  }

  changeSelect(id, key, type, event) {
    // console.log(id, key, type, event.target.value)

    if (type === 1) {
      const cats = this.state.cats;

      cats.forEach((cat) => {
        cat.cats.forEach((it) => {
          it.items.forEach((el) => {
            if (el.id === id) {
              
              el[key] = event.target.value;

              if( key == 'vendor_id_rec' ){
                //console.log( this.findPQ(el) )
                el['pq'] = this.findPQ(el);
              }
            }
          });
        });
      });

      this.setState({
        cats
      });
    }

    if (type === 2) {
      const freeItems = this.state.freeItems;

      freeItems.forEach((el) => {
        if (el.id === id) {
          el[key] = event.target.value;
        }
      });

      this.setState({
        freeItems
      });
    }
  }

  async save(points) {
    // console.log(points);

    let data = {
      items: this.state.cats,
      items_free: this.state.freeItems,
      points
    };

    // console.log(data);

    let res = await this.getData('save_edit', data);

    // console.log(res)

    if(res.st) {

      this.setState({
        st: true,
        snackbar: true,
      });

      setTimeout(() => {
        this.update();
      }, 300);

    } else {

      this.setState({
        error: res.text,
        snackbar: true,
      });
      
    }

  }

  async update() {
    let point = this.state.point;

    // console.log(point)

    let data = await this.getData('get_all', point);

    // console.log(data);

    this.setState({
      items: data.items,
      cats: data.cats,
      freeItems: data.items_free,
      hist: data.hist,
    });
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Snackbar 
          open={this.state.snackbar} 
          autoHideDuration={30000}
          anchorOrigin={{  
            vertical: 'top',
            horizontal: 'center', 
          }}
          onClose={() => {
            this.setState({ snackbar: false });
          }}>
          <Alert 
            onClose={() => {
            this.setState({ snackbar: false });
            }} 
            severity={ this.state.st ? "success" : "error" } 
            sx={{ width: '100%' }}>
             { this.state.st ? 'Данные успешно сохранены!' : `${this.state.error}` }
          </Alert>
        </Snackbar>

        <OrderPostRec_Modal
          open={this.state.modalDialog}
          onClose={() => {
            this.setState({ modalDialog: false });
          }}
          points={this.state.points}
          save={this.save.bind(this)}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={4}>
            <MySelect
              data={this.state.points}
              value={this.state.point}
              func={this.changePoint.bind(this)}
              label="Точка"
            />
          </Grid>

          <OrderPostRec_Table
            cats={this.state.cats}
            freeItems={this.state.freeItems}
            items={this.state.items}
            openModal={this.openModal.bind(this)}
            changeSelect={this.changeSelect.bind(this)}
          />

          {!this.state.hist.length ? null : (
            <Grid pb={1} container justifyContent="center">
              <Grid item xs={10} sm={6}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                  >
                    <Typography>История изменений</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {this.state.hist.map((item, i) => (
                      <Accordion key={i}>
                        <AccordionSummary>
                          <Typography mr={8}>{item.date_time}</Typography>
                          <Typography>{item.user_name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {item.items.map((it, key_it) => (
                            <TableContainer key={key_it}>
                              <Table>
                                <TableBody>
                                  <TableRow
                                    sx={{
                                      '& td': {
                                        border: 0,
                                        paddingTop: 0,
                                        paddingBottom: 0,
                                      },
                                    }}
                                    hover={true}
                                  >
                                    <TableCell style={{ width: '30%' }}>
                                      {it.item_name}
                                    </TableCell>
                                    <TableCell style={{ width: '30%' }}>
                                      {it.pf_name}
                                    </TableCell>
                                    <TableCell style={{ width: '10%' }}>
                                      {it.pq}
                                    </TableCell>
                                    <TableCell style={{ width: '30%' }}>
                                      {it.vendor_name}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          )}
        </Grid>
      </>
    );
  }
}

export function OrderPostRec() {
  return <OrderPostRec_ />;
}
