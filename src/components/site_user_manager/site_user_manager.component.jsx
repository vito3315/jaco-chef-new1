import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MySelect, MyCheckBox, MyAutocomplite, MyTextInput, MyDatePickerNew } from '../../stores/elements';

import Dropzone from "dropzone";

const queryString = require('query-string');

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

class SiteUserManager_ extends React.Component {
    dropzoneOptions = {
        autoProcessQueue: false,
        autoQueue: true,
        maxFiles: 1,
        timeout: 0,
        parallelUploads: 10,
        acceptedFiles: "image/jpeg,image/png",
        addRemoveLinks: true,
        url: "https://jacochef.ru/src/img/users/upload.php",
    };
    myDropzone = null;
    isInit = false;

    constructor(props) {
        super(props);

        this.state = {
            module: 'site_user_manager',
            module_name: '',
            is_load: false,

            cats: [],
            allItems: [],
            vendor_items: [],

            modalItemEdit: false,
            modalItemNew: false,

            itemEdit: null,
            itemName: '',

            checkArtDialog: false,
            checkArtList: [],

            freeItems: [],




            point_list: [],
            point_list_render: [],
            point_id: 0,

            app_list: [],
            chose_app: null,
            //app_id: -1,
            app_id: "",

            users: [],
            editUser: null,
            modalUserEdit: false,
            modalUserNew: false,

            textDel: '',
            textSearch: '',
            delModal: false,

            graphModal: false,
            graphType: 0
        };
    }

    async componentDidMount() {

        let data = await this.getData('get_all');

        console.log('apps=', data.apps);
        this.setState({
            module_name: data.module_info.name,
            point_list: data.points,
            app_list: data.apps,
        })

        setTimeout(() => {
            this.changeSort('point_id', { target: { value: data.points[0]['id'] } })
        }, 500)

        document.title = data.module_info.name;
    }

    getData = (method, data = {}, is_load = true) => {

        if (is_load == true) {
            this.setState({
                is_load: true
            })
        }

        return fetch('https://jacochef.ru/api/index_new.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: queryString.stringify({
                method: method,
                module: this.state.module,
                version: 2,
                login: localStorage.getItem('token'),
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
                setTimeout(() => {
                    this.setState({
                        is_load: false
                    })
                }, 300)
                console.log(err)
            });
    }

    changeSort(type, event) {
        this.setState({
            [type]: event.target.value
        })

        setTimeout(() => {
            this.getUsers();
        }, 300)
    }

    async getUsers() {
        let data = {
            point_id: this.state.point_id,
            app_id: this.state.app_id,
            search: this.state.textSearch,
        };

        let res = await this.getData('getUsers', data);

        this.setState({
            users: res
        })
    }

    async openEditUser(user_id) {
        let data = {
            user_id: user_id
        };

        let res = await this.getData('getUser', data);
        let chose_app;
        // хак для автокомплита
        console.log('res.user', res.user);

        res.user.app_id = res.appointment.find((app) =>
            parseInt(app.id) == parseInt(res.user.app_id));
        //chose_app = res.appointment.find((app) =>
           // parseInt(app.id) == parseInt(res.user.app_id));
        
        // res.user.app_id = null;
        this.setState({
            editUser: res,
            chose_app: res.user.app_id,
            modalUserEdit: true
        })

        //todo тест

        setTimeout(() => {
            console.log('data_app=', this.state.editUser.appointment);
            console.log('user=', this.state.editUser.user);
            console.log('value_app=', this.state.editUser.user.app_id);
        }, 300)

        setTimeout(() => {
            this.sortPoint();

            this.myDropzone = new Dropzone("#for_img_edit", this.dropzoneOptions);
        }, 300)
    }

    async openNewUser() {
        let res = await this.getData('getAllForNew');

        // хак для автокомплита
        res.user.app_id = null;
        this.setState({
            editUser: res,
            modalUserNew: true
        })


        setTimeout(() => {
            this.sortPoint();

            this.myDropzone = new Dropzone("#for_img_new", this.dropzoneOptions);
        }, 300)

    }

    changeItem(data, event) {

        let vendor = this.state.editUser;

        if (data == 'birthday') {
            vendor.user[data] = formatDate(event);
        } else {
            if (data == 'acc_to_kas') {
                vendor.user[data] = event.target.checked === true ? 1 : 0;
            } else {
                vendor.user[data] = event.target.value;
            }
        }

        this.setState({
            editUser: vendor
        })

        if (data == 'city_id') {
            setTimeout(() => {
                this.sortPoint();
            }, 300)
        }

        
    }

    // функция поиска по телефону или Фамилии
    search(data, event) {

        let v = event.target.value;
       

        this.setState({
            textSearch: v
        })

        setTimeout(() => {
            this.getUsers();
        }, 300)
    }

    sortPoint() {
        let city_id = this.state.editUser ? this.state.editUser.user.city_id : 0;
        let points = this.state.editUser.point_list;
        let points_render = [];

        if (parseInt(city_id) == -1) {
            points_render = points;
        } else {
            points_render = points.filter((item) => parseInt(item.city_id) == parseInt(city_id) || parseInt(item.city_id) == -1);
        }

        this.setState({
            point_list_render: points_render
        })
    }

    async saveEditUser() {

        let is_graph = false;
        var editUser_user = this.state.editUser;


        //editUser_user.user.app_id = editUser_user.app_id.id;
       // editUser_user.user.app_id = editUser_user.user.app_id.id;
        editUser_user.user.app_id = this.state.chose_app !== null ? this.state.chose_app.id : 0;

        this.state.app_list.map((item, key) => {
            //todo переделать
            // if( parseInt(this.state.editUser.user.app_id) == parseInt(item.id) ){
            if (parseInt(editUser_user.user.app_id) == parseInt(item.id)) {

                if (parseInt(item.is_graph) == 1 && parseInt(this.state.graphType) == 0) {
                    is_graph = true;
                }
            }
        })

        if (is_graph === true) {
            this.setState({
                graphModal: true
            })

            return;
        }

        //todo 
        // if( parseInt(this.state.editUser.user.app_id) == 0 && this.state.textDel.length == 0 ){
        if (parseInt(editUser_user.user.app_id) == 0 && this.state.textDel.length == 0) {

            this.setState({
                delModal: true
            })

            return;
        }

        if (this.myDropzone['files'].length > 0 && this.isInit === false) {
            this.isInit = true;

            this.myDropzone.on("sending", (file, xhr, data) => {
                let user_id = this.state.editUser.user.id;

                let file_type = (file.name).split('.');
                file_type = file_type[file_type.length - 1];
                file_type = file_type.toLowerCase();

                data.append("filetype", 'user_' + user_id + '.' + file_type);
                data.append("filename", 'user_' + user_id);

                this.getOrientation(file, function (orientation) {
                    data.append("orientation", orientation);
                })
            });

            this.myDropzone.on("queuecomplete", (data) => {

                var check_img = false;

                this.myDropzone['files'].map(function (item, key) {
                    if (item['status'] == "error") {
                        check_img = true;
                    }
                })

                if (check_img) {
                    alert('Ошибка при загрузке фотографии')
                    return;
                }

                this.setState({
                    delModal: false,
                    modalUserEdit: false,
                    editUser: null
                })

                this.isInit = false;
                this.getUsers();
            })
        }

        let data = {
            // user: this.state.editUser,
            user: editUser_user,
            textDel: this.state.textDel,
            graphType: this.state.graphType
        };

        let res = await this.getData('saveEditUser', data);

        if (res.st === false) {
            alert(res.text);
        } else {

            if (this.myDropzone['files'].length == 0) {
                this.isInit = false;

                this.setState({
                    delModal: false,
                    modalUserEdit: false,
                    editUser: null
                })

                this.getUsers();
            } else {
                this.myDropzone.processQueue();
            }
        }
    }

    async saveNewUser() {
        let is_graph = false;
        let is_graph_ = false;

        // хак для нормальной работы атокомплита должность
       // let app_origin      = this.state.editUser.user.app_id;
        let editUser_user = this.state.editUser;
        //let editUser_user = this.state.editUser;
        // todo
        //this.state.editUser.user.app_id
        editUser_user.user.app_id = this.state.chose_app !== null ? this.state.chose_app.id : 0;

        // todo
        console.log('chose_app=' + this.state.chose_app);

        this.state.app_list.map((item, key) => {
            // if( parseInt(this.state.editUser.user.app_id) == parseInt(item.id) ){
            if (parseInt(editUser_user.user.app_id) == parseInt(item.id)) {

                if (parseInt(item.is_graph) == 1) {
                    is_graph_ = true;
                }

                if (parseInt(item.is_graph) == 1 && parseInt(this.state.graphType) == 0) {
                    is_graph = true;
                }
            }
        })

        if (is_graph_ === true && this.myDropzone['files'].length == 0) {
            alert('Необходимо фотография сотрудника');
            return;
        }

        if (this.myDropzone['files'].length > 0 && this.isInit === false) {
            this.isInit = true;

            this.myDropzone.on("sending", (file, xhr, data) => {
                let user_id = this.state.editUser.user.id;

                let file_type = (file.name).split('.');
                file_type = file_type[file_type.length - 1];
                file_type = file_type.toLowerCase();

                data.append("filetype", 'user_' + user_id + '.' + file_type);
                data.append("filename", 'user_' + user_id);

                this.getOrientation(file, function (orientation) {
                    data.append("orientation", orientation);
                })
            });

            this.myDropzone.on("queuecomplete", (data) => {

                var check_img = false;

                this.myDropzone['files'].map(function (item, key) {
                    if (item['status'] == "error") {
                        check_img = true;
                    }
                })

                if (check_img) {
                    alert('Ошибка при загрузке фотографии')
                    return;
                }

                // картинка прелоадер
                this.setState({
                    modalUserNew: false,
                    editUser: null,
                    is_load: false
                })

                this.isInit = false;
                this.getUsers();
            })
        }

        let data = {
            // user: this.state.editUser,
            user: editUser_user,
            graphType: is_graph === true ? 1 : 0
        };

        let res = await this.getData('saveNewUser', data);

        if (res.st === false) {
            alert(res.text);
        } else {

            if (res.sms === false) {
                alert('Ошибка в отправке смс');
            }

            if (this.myDropzone['files'].length == 0) {
                this.isInit = false;

                this.setState({
                    modalUserNew: false,
                    editUser: null
                })

                this.getUsers();
            } else {
                let user = this.state.editUser;
                user.user.id = res.user_id;

                // хак что бы не сбивалась должность
                console.log('app_origin='+ app_origin);
                user.user.app_id = app_origin;

                // картинка прелоадер
                this.setState({
                    editUser: user
                })

                setTimeout(() => {
                    this.myDropzone.processQueue();
                    this.setState({
                        is_load: true
                    })
                    // todo
                    console.log('new_app_origi' + this.state.editUser.user.app_id);
                }, 400)
            }
        }


    }

    getOrientation(file, callback) {
        var reader = new FileReader();

        reader.onload = function (event) {
            var view = new DataView(event.target.result);

            if (view.getUint16(0, false) != 0xFFD8) return callback(-2);

            var length = view.byteLength,
                offset = 2;

            while (offset < length) {
                var marker = view.getUint16(offset, false);
                offset += 2;

                if (marker == 0xFFE1) {
                    if (view.getUint32(offset += 2, false) != 0x45786966) {
                        return callback(-1);
                    }
                    var little = view.getUint16(offset += 6, false) == 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    var tags = view.getUint16(offset, little);
                    offset += 2;

                    for (var i = 0; i < tags; i++)
                        if (view.getUint16(offset + (i * 12), little) == 0x0112)
                            return callback(view.getUint16(offset + (i * 12) + 8, little));
                } else if ((marker & 0xFF00) != 0xFF00) break;
                else offset += view.getUint16(offset, false);
            }

            return callback(-1);
        };

        reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
    };
    //todo
    getUser() {
        return this.state.editUser;
    }

    render() {
        console.log('test');
        return (
            <>
                <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                <Dialog open={this.state.delModal} onClose={() => { this.setState({ delModal: false, textDel: '' }) }}>
                    <DialogTitle>Причина увольнения</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Увольнение происходит не сразу, а в полночь
                        </DialogContentText>
                        <Grid container spacing={3} style={{ paddingBottom: 10, paddingTop: 20 }}>
                            <Grid item xs={12}>
                                <MyTextInput label="Причина увольнения" value={this.state.textDel} func={(event) => { this.setState({ textDel: event.target.value }) }} />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" onClick={this.saveEditUser.bind(this)}>Уволить</Button>
                        <Button onClick={() => { this.setState({ delModal: false, textDel: '' }) }}>Отмена</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.graphModal} onClose={() => { this.setState({ graphModal: false, graphType: 0 }) }}>
                    <DialogTitle>С какого периода применить изменения ?</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3} style={{ paddingBottom: 10, paddingTop: 20 }}>

                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" onClick={() => { this.setState({ graphType: 1 }); this.saveEditUser() }} style={{ width: '100%' }}>С текущего периода</Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" onClick={() => { this.setState({ graphType: 2 }); this.saveEditUser() }} style={{ width: '100%' }}>Со следующего периода</Button>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" onClick={() => { this.setState({ graphType: -1 }); this.saveEditUser() }} style={{ width: '100%' }}>Без изменений</Button>
                            </Grid>

                        </Grid>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={this.state.modalUserEdit}
                    fullWidth={true}
                    maxWidth={'md'}
                    onClose={() => { this.setState({ modalUserEdit: false, editUser: null }) }}
                >
                    <DialogTitle>Редактирвоание сотрудника</DialogTitle>
                    <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>

                        <Grid container spacing={3}>

                            {this.state.editUser && this.state.modalUserEdit ?
                                <>
                                    <Grid item xs={12}>

                                        <Grid container spacing={3}>

                                            <Grid item xs={12}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={4}>
                                                        <MyTextInput label="Фамилия" value={this.state.editUser.user.fam} func={this.changeItem.bind(this, 'fam')} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <MyTextInput label="Имя" value={this.state.editUser.user.name} func={this.changeItem.bind(this, 'name')} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <MyTextInput label="Отчество" value={this.state.editUser.user.otc} func={this.changeItem.bind(this, 'otc')} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={4}>
                                                        <MyTextInput label="Номер телефона" value={this.state.editUser.user.login} func={this.changeItem.bind(this, 'login')} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <MyDatePickerNew label="Дата рождения" value={this.state.editUser.user.birthday} func={this.changeItem.bind(this, 'birthday')} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={6}>
                                                        <img src={'https://storage.yandexcloud.net/user-img/max-img/' + this.state.editUser.user['img_name'] + '?' + this.state.editUser.user['img_update']} style={{ maxWidth: 300, maxHeight: 300 }} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <div className="dropzone" id="for_img_edit" style={{ width: '100%', minHeight: 150 }} />
                                                    </Grid>
                                                </Grid>

                                            </Grid>


                                            <Grid item xs={12}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={4}>
                                                        <MyTextInput label="Код авторизации (4 цифры)" value={this.state.editUser.user.auth_code} func={this.changeItem.bind(this, 'auth_code')} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <MyTextInput label="ИНН" value={this.state.editUser.user.inn} func={this.changeItem.bind(this, 'inn')} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <MyCheckBox label="Работает официально" value={parseInt(this.state.editUser.user.acc_to_kas) == 1 ? true : false} func={this.changeItem.bind(this, 'acc_to_kas')} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={4}>
                                                        <MyAutocomplite data={this.state.editUser.appointment} value={this.state.chose_app} func={(event, data) => {
                                                            this.setState({ chose_app: data })
                                                        }} multiple={false} label='Должность' />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <MySelect data={this.state.editUser.cities} value={this.state.editUser.user.city_id} func={this.changeItem.bind(this, 'city_id')} label='Город' />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <MySelect data={this.state.point_list_render} value={this.state.editUser.user.point_id} func={this.changeItem.bind(this, 'point_id')} label='Точка' />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TableContainer component={Paper}>
                                                    <Table size={'small'}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell style={{ minWidth: 125 }}>Дата</TableCell>
                                                                <TableCell>Кто обновлял</TableCell>
                                                                <TableCell>Имя</TableCell>
                                                                <TableCell>Телефон</TableCell>
                                                                <TableCell>Код авторизации</TableCell>
                                                                <TableCell>ИНН</TableCell>
                                                                <TableCell>Должность</TableCell>
                                                                <TableCell>Город</TableCell>
                                                                <TableCell>Точка</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {this.state.editUser.user.history.map((item, key) =>
                                                                <TableRow key={key}>
                                                                    <TableCell style={{ minWidth: 125 }}>{item.date_time_update}</TableCell>
                                                                    <TableCell>{item.update_name}</TableCell>
                                                                    <TableCell>{item.name}</TableCell>
                                                                    <TableCell>{item.login}</TableCell>
                                                                    <TableCell>{item.auth_code}</TableCell>
                                                                    <TableCell>{item.inn}</TableCell>
                                                                    <TableCell>{item.app_name}</TableCell>
                                                                    <TableCell>{item.city_name}</TableCell>
                                                                    <TableCell>{item.point_name}</TableCell>
                                                                </TableRow>
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Grid>

                                        </Grid>

                                    </Grid>

                                </>
                                :
                                null
                            }
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.saveEditUser.bind(this)} color="primary">Сохранить</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.modalUserNew}
                    fullWidth={true}
                    maxWidth={'md'}
                    onClose={() => { this.setState({ modalUserNew: false, editUser: null }) }}
                >
                    <DialogTitle>Новый сотрудник</DialogTitle>
                    <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>

                        <Grid container spacing={3}>

                            {this.state.editUser && this.state.modalUserNew ?
                                <>
                                    <Grid item xs={12}>

                                        <Grid container spacing={3}>

                                            <Grid item xs={12}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={4}>
                                                        <MyTextInput label="Фамилия" value={this.state.editUser.user.fam} func={this.changeItem.bind(this, 'fam')} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <MyTextInput label="Имя" value={this.state.editUser.user.name} func={this.changeItem.bind(this, 'name')} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <MyTextInput label="Отчество" value={this.state.editUser.user.otc} func={this.changeItem.bind(this, 'otc')} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={4}>
                                                        <MyTextInput label="Номер телефона" value={this.state.editUser.user.login} func={this.changeItem.bind(this, 'login')} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <MyDatePickerNew label="Дата рождения" value={this.state.editUser.user.birthday} func={this.changeItem.bind(this, 'birthday')} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={6}>
                                                        <img src={'https://storage.yandexcloud.net/user-img/max-img/' + this.state.editUser.user['img_name'] + '?' + this.state.editUser.user['img_update']} style={{ maxWidth: 300, maxHeight: 300 }} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <div className="dropzone" id="for_img_new" style={{ width: '100%', minHeight: 150 }} />
                                                    </Grid>
                                                </Grid>

                                            </Grid>


                                            <Grid item xs={12}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={4}>
                                                        <MyTextInput label="Код авторизации (4 цифры)" value={this.state.editUser.user.auth_code} func={this.changeItem.bind(this, 'auth_code')} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <MyTextInput label="ИНН" value={this.state.editUser.user.inn} func={this.changeItem.bind(this, 'inn')} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <MyCheckBox label="Работает официально" value={parseInt(this.state.editUser.user.acc_to_kas) == 1 ? true : false} func={this.changeItem.bind(this, 'acc_to_kas')} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={4}>
                                                        <MyAutocomplite data={this.state.editUser.appointment} value={this.state.chose_app} func={(event, data) => {
                                                            this.setState({ chose_app: data })
                                                        }} multiple={false} label='Должность' />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <MySelect data={this.state.editUser.cities} value={this.state.editUser.user.city_id} func={this.changeItem.bind(this, 'city_id')} label='Город' />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <MySelect data={this.state.point_list_render} value={this.state.editUser.user.point_id} func={this.changeItem.bind(this, 'point_id')} label='Точка' />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                </>
                                :
                                null
                            }
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.saveNewUser.bind(this)} color="primary">Сохранить</Button>
                    </DialogActions>
                </Dialog>


                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <h1>{this.state.module_name}</h1>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <MySelect data={this.state.point_list} value={this.state.point_id} func={this.changeSort.bind(this, 'point_id')} label='Точка' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <MySelect data={this.state.app_list} value={this.state.app_id} func={this.changeSort.bind(this, 'app_id')} label='Должность' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <MyTextInput label="Поиск по телефону/имени" value={this.state.textSearch} func={this.search.bind(this, 'search')} />
                    </Grid>
                    
                    <Grid item xs={12} sm={3}>
                        <Button onClick={this.openNewUser.bind(this)} variant="contained">Добавить сотрудника</Button>
                    </Grid>

                    <Grid item xs={12}>

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Фото</TableCell>
                                        <TableCell>Телефон</TableCell>
                                        <TableCell>Имя</TableCell>
                                        <TableCell>Должность</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.users.map((item, key) =>
                                        <TableRow key={key} onClick={this.openEditUser.bind(this, item.id)}>
                                            <TableCell>{key + 1}</TableCell>
                                            <TableCell>
                                                {item['img_name'] === null ? null :
                                                    <img src={'https://storage.yandexcloud.net/user-img/min-img/' + item['img_name'] + '?' + item['img_update']} style={{ maxWidth: 100, maxHeight: 100 }} />
                                                }
                                            </TableCell>
                                            <TableCell>{item.login}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.app_name}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>


                </Grid>
            </>
        )
    }
}

export function SiteUserManager() {
    return (
        <SiteUserManager_ />
    );
}