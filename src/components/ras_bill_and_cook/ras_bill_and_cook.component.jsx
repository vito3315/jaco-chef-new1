import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MySelect, MyDatePickerNew } from '../../stores/elements';

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

class RasBillAndCook_ extends React.Component {
  click = false;

  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'ras_bill_and_cook',
      module_name: '',
      is_load: false,
      
      points: [],
      point: 0,
      
      rev_list: [],
      rev: 0,
      cats: [],
      
      date_end: formatDate(new Date())
    };
  }
  
  async componentDidMount(){
    let data = await this.getData('get_all');
    
    this.setState({
      points: data.points,
      point: data.points[0].id,
      module_name: data.module_info.name,
    })
    
    document.title = data.module_info.name;
    
    setTimeout( () => {
      this.changePoint({ target: { value: data.points[0].id } });
    }, 300 )
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
      console.log( err )
    });
  }
   
  async updateData(){
    let data = {
      point_id: this.state.point,
      date_start: this.state.rev,
      date_end: this.state.date_end,
    };
    
    let res = await this.getData('show', data);
    
    console.log( res )
    
    this.setState({
      cats: res.cats
    })
  }
  
  async changePoint(event){
    let point = event.target.value;
    
    let data = {
      point_id: point
    };
    
    let res = await this.getData('get_rev_list', data);

    this.setState({
      point: point,
      rev_list: res,
      rev: res[0].id
    })
  }

  async changeRev(event){
    let rev = event.target.value;
    
    this.setState({
      rev: rev
    })
  }

  changeDate(data){
    this.setState({
      date_end: formatDate(data)
    })
  }

  render(){
    return (
      <>
        <Backdrop className={this.state.classes.backdrop} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <MySelect classes={this.state.classes} data={this.state.points} value={this.state.point} func={ this.changePoint.bind(this) } label='Точка' />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MySelect classes={this.state.classes} data={this.state.rev_list} value={this.state.rev} func={ this.changeRev.bind(this) } label='Ревизия' />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MyDatePickerNew label='Дата до' value={this.state.date_end} func={ this.changeDate.bind(this) } />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={this.updateData.bind(this)}>Обновить данные</Button>
          </Grid>
        
          <Grid item xs={12}>
            
            { this.state.cats.map( (item, key) =>
              <Accordion key={key}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>{item.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  { item.cats.map( (cat, key_cat) => 
                    <Accordion key={key_cat}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <Typography>{cat.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        
                        <Table>
                  
                          <TableHead>
                            <TableRow>
                              <TableCell style={{ width: '5%' }}>#</TableCell>

                              <TableCell style={{ width: '20%' }}>Товар</TableCell>
                              <TableCell style={{ width: '20%' }}>Ревизия</TableCell>

                              <TableCell style={{ width: '15%' }}>Кол-во по накладным</TableCell>
                              <TableCell style={{ width: '15%' }}>Кол-во по продажам</TableCell>

                              <TableCell style={{ width: '15%' }}>Разница</TableCell>
                              <TableCell style={{ width: '10%' }}>Ед. измер</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            
                            { cat.items.map( (it, k) =>
                              <TableRow key={k}>
                                <TableCell>{k+1}</TableCell>
                                <TableCell>{it.name}</TableCell>
                                <TableCell>{it.count_rev}</TableCell>
                                <TableCell>{it.count_bill}</TableCell>
                                <TableCell>{it.count_ras}</TableCell>
                                <TableCell>{it.count_res}</TableCell>
                                <TableCell>{it.ei_name}</TableCell>
                              </TableRow>
                            ) }
                          
                          </TableBody>
                        
                        </Table>

                      </AccordionDetails>
                    </Accordion>
                  ) }
                </AccordionDetails>
              </Accordion>
            ) }
            

          </Grid>

          

          
        </Grid>
      </>
    )
  }
}

export function RasBillAndCook () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <RasBillAndCook_ classes={classes} history={history} />
  );
}