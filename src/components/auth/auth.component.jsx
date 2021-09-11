import React from 'react';

import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const queryString = require('query-string');

import itemsStore from '../../stores/items-store';
import config from '../../stores/config';


export class Auth extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {    
      number: '',
      pass: ''
    };
  }
    
  componentDidMount = () => {
  }
    
  login(){
    fetch(config.urlApi, {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify({
        type: 'login_center', 
        number: this.state.number,
        pass: this.state.pass
      })
    }).then(res => res.json()).then(json => {
      if( json['st'] ){
        itemsStore.setToken(json.token, json.name);
       
        setTimeout( () => {
          window.location.href = '/';
        }, 500 )
        
      }else{
        alert(json.text)
      }
    });
  }
  
  handleKeyPress(target) {
    if(target.charCode==13){
      if( this.state.number.length > 0 && this.state.pass.length > 0 ){
        this.login();
      }
    }
  }
  
  render() {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ height: '100vh' }}
      >
        <Grid container item xs={3}>
          <img alt="Жако доставка роллов и пиццы" src="../assets/logo.png" style={{ height: 'auto', width: 'inherit' }} />
        </Grid>
            
        <Grid container item xs={3} direction="column">
          
          <FormControl>
            <InputLabel htmlFor="my-input">Номер телефона</InputLabel>
            <Input 
              id="my-input" 
              type="login" 
              aria-describedby="my-helper-text" 
              value={ this.state.number } 
              onChange={ (event) => { this.setState({ number: event.target.value }) } } 
              onKeyPress={this.handleKeyPress}
            />
          </FormControl>
          
          <FormControl>
            <InputLabel htmlFor="my-input2">Пароль</InputLabel>
            <Input 
              id="my-input2" 
              type='password' 
              aria-describedby="my-helper-text" 
              value={ this.state.pass } 
              onChange={ (event) => { this.setState({ pass: event.target.value }) } } 
              onKeyPress={this.handleKeyPress}
            />
          </FormControl>
          
          <FormControl style={{ paddingTop: 8 }}>
            <Button variant="contained" style={{ backgroundColor: '#CC0033', color: '#fff' }} onClick={this.login.bind(this)}>Войти</Button>
          </FormControl>
          
        </Grid>
            
      </Grid>
    )
  }
}