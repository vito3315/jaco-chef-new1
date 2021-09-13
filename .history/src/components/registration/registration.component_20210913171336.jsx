import React from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const queryString = require('query-string');

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 0,
    width: '100%',
    height: 150,
    margin: 0,
    backgroundColor: '#fff'
  },
  avatar2: {
    borderRadius: 0,
    width: '100%',
    height: 130,
    margin: 0,
    backgroundColor: '#fff'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

class Reg_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'auth',
      module_name: '',
      is_load: false,
      
      modalDialog: false,
      dialogTitle: '',
      dialogText: '',
      
      activeStep: 0,
      steps: ['Телефон', 'Подтверждение', 'Новый пароль'],
      
      phone: '',
      code: '',
      pwd: ''
    };
  }
  
  async componentDidMount(){
      
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
        login: '+79879340391',
        //login: localStorage.getItem('login'),
        data: JSON.stringify( data )
      })
    }).then(res => res.json()).then(json => {
      
      if( json.st === false && json.type == 'redir' ){
        this.state.history.push("/");
        return;
      }
      
      if( json.st === false && json.type == 'auth' ){
        this.state.history.push("/auth");
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
      showReady: this.state.showReady === true ? 1 : 0
    };
    
    let res = await this.getData('get_orders', data);
    
    this.setState({
      read: res.read,
      onstol: res.onstol,
      ordersQueue: res.prestol_new
    })
  }
  
  async nextStep(){
    if( this.state.activeStep == 0 ){
      let data = {
        login: document.getElementById('phone').value
      }
      
      let res = await this.getData('check_phone', data);
      
      if( res.st === false ){
        setTimeout( () => {
          this.setState({ 
            modalDialog: true,
            dialogTitle: 'Предупреждение',
            dialogText: res.text
          })
        }, 500 )
      }else{
        this.setState({ 
          activeStep: this.state.activeStep+1,
          phone: data.login
        })
      }
    }else if( this.state.activeStep == 1 ){
      let data = {
        login: this.state.phone,
			  code: document.getElementById('code').value
      }
      
      let res = await this.getData('check_code', data);
      
      if( res.st === false ){
        setTimeout( () => {
          this.setState({ 
            modalDialog: true,
            dialogTitle: 'Предупреждение',
            dialogText: res.text
          })
        }, 500 )
      }else{
        this.setState({ 
          activeStep: this.state.activeStep+1,
          code: data.code
        })
      }
    }else if( this.state.activeStep == 2 ){
      let data = {
        login: this.state.phone,
        code: this.state.code,
        pwd: document.getElementById('password').value
      }
      
      let res = await this.getData('save_new_pwd', data);
      
      if( res.st === false ){
        setTimeout( () => {
          this.setState({ 
            modalDialog: true,
            dialogTitle: 'Предупреждение',
            dialogText: res.text
          })
        }, 500 )
      }else{
        localStorage.setItem('token', res.token)
      
        setTimeout( () => {
          window.location.pathname = '/'
        }, 300)
      }
    }
  }
  
  enterNextStep(event){
    if( event.charCode == 13 ){
      this.nextStep();
    }
  }
  
  render(){
    return (
      <>
        <Backdrop className={this.state.classes.backdrop} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Dialog
          open={this.state.modalDialog}
          onClose={ () => { this.setState({ modalDialog: false }) } }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.state.dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{this.state.dialogText}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => { this.setState({ modalDialog: false }) } } color="primary" autoFocus>Хорошо</Button>
          </DialogActions>
        </Dialog>
        
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
            <div className={this.state.classes.paper}>
              <Avatar className={this.state.classes.avatar}>
                <img alt="Жако доставка роллов и пиццы" src="../assets/img_other/Favikon.png" style={{ height: '100%', width: 'inherit' }} />
                <img alt="Жако доставка роллов и пиццы" src="../assets/text.jpeg" style={{ height: '100%', width: 'inherit' }} />
              </Avatar>
              
              <Stepper activeStep={this.state.activeStep} alternativeLabel style={{ width: '100%' }}>
                {this.state.steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div className={this.state.classes.form} style={{ width: '100%' }}>
                
                { this.state.activeStep == 0 ?
                  <TextField
                    variant="outlined"
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="phone"
                    label="Номер телефона"
                    name="phone"
                    autoComplete="phone"
                    autoFocus
                    onKeyPress={ this.enterNextStep.bind(this) }
                  />  
                    :
                  null
                }
                
                { this.state.activeStep == 1 ?
                  <TextField
                    variant="outlined"
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="code"
                    label="Код из смс"
                    name="code"
                    autoComplete="code"
                    autoFocus
                    onKeyPress={ this.enterNextStep.bind(this) }
                  />  
                    :
                  null
                }
                
                { this.state.activeStep == 2 ?
                  <TextField
                    variant="outlined"
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onKeyPress={ this.enterNextStep.bind(this) }
                  />
                    :
                  null
                }
                                  
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={this.state.classes.submit}
                  onClick={ this.nextStep.bind(this) }
                >
                  Дальше
                </Button>
                <Grid container>
                  <Grid item xs>
                    <a href="/auth" variant="body2">Вернуться к авторизации</a>
                  </Grid>
                </Grid>
                
                
              </div>
              
              
            </div>
          </Grid>
        </Grid>
      </>
    )
  }
}

export function Reg () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <Reg_ classes={classes} history={history} />
  );
}