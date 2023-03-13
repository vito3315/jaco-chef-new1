import React from 'react';

import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import queryString from 'query-string';

class Auth_ extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            module: 'auth',
            module_name: '',
            is_load: false,

            modalDialog: false,
            dialogTitle: '',
            dialogText: ''
        };
    }

    componentDidMount() {
        if((window.location.protocol == 'http:' || window.location.protocol == 'http') && window.location.hostname != 'localhost'){
            window.location.href = 'https://jacosoft-dop.ru'+window.location.pathname;
        }
    }

    getData = (method, data = {}) => {

        this.setState({
            is_load: true
        })

        return fetch('https://jacochef.ru/api/index_new.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: queryString.stringify({
                method: method,
                module: this.state.module,
                version: 2,
                //login: '+79879340391',
                login: localStorage.getItem('login'),
                data: JSON.stringify(data)
            })
        }).then(res => res.json()).then(json => {

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
                    is_load: false
                })
            }, 300)

            return json;
        })
            .catch(err => {
                console.log(err)
            });
    }

    async updateData() {
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

    async auth() {
        let data = {
            login: document.getElementById('phone').value,
            pwd: document.getElementById('password').value
        };

        let res = await this.getData('auth', data);

        console.log(res)

        if (res.st === false) {
            setTimeout(() => {
                this.setState({
                    modalDialog: true,
                    dialogTitle: 'Предупреждение',
                    dialogText: res.text
                })
            }, 500)
        } else {
            localStorage.setItem('token', res.token)

            setTimeout(() => {
                window.location.pathname = '/'
            }, 300)
        }
    }

    // функция проверка телефона
    checkPhone(e) {

        let v = event.target.value;
        let maxLen = 0;

        v       = v.replace(/[^\d+]/ig, "");
        maxLen  = v.substring(0, 1) == '+' ? 12 : 11;
        v       = v.substring(0, maxLen);
        document.getElementById('phone').value = v;

        return;
    }

    render() {
        return (
            <>
                <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                <Dialog
                    open={this.state.modalDialog}
                    onClose={() => { this.setState({ modalDialog: false }) }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.state.dialogTitle}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">{this.state.dialogText}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { this.setState({ modalDialog: false }) }} color="primary" autoFocus>Хорошо</Button>
                    </DialogActions>
                </Dialog>

                <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                            <Avatar style={{ borderRadius: 0, width: '100%', height: 150, margin: 0, backgroundColor: '#fff' }}>
                                <img alt="Жако доставка роллов и пиццы" src="../assets/img_other/Favikon.png" style={{ height: '100%' }} />
                            </Avatar>
                            <form style={{ width: '100%' }} noValidate>
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
                                    onChange={this.checkPhone.bind(this)}
                                   
                                />
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
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    onClick={this.auth.bind(this)}
                                >
                                    Войти
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <a href="/registration" style={{ color: '#c03' }}>Восстановить пароль</a>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    }
}

export function Auth() {
    return (
        <Auth_ />
    );
}