import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';

import AssessmentIcon from '@mui/icons-material/Assessment';
import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import InfoIcon from '@mui/icons-material/Info';

import {
  MySelect,
  MyTextInput,
  MyTimePicker,
  MyDatePickerGraph,
  formatDate,
  MyAlert
} from '../../stores/elements';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

const queryString = require('query-string');

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <List sx={{ pt: 0 }}>
        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick('addAccount')}
        >
          <ListItemAvatar>
            <Avatar>
              <AccessTimeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Сменить часы на месяц" />
        </ListItem>

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick('addAccount')}
        >
          <ListItemAvatar>
            <Avatar>
              <SyncAltIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Сменить смену" />
        </ListItem>
        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick('addAccount')}
        >
          <ListItemAvatar>
            <Avatar>
              <HomeWorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Сменить точку" />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class HeaderItem extends React.Component {
  render() {
    return (
      <>
        <TableRow>
          <TableCell style={{ minWidth: 140, minHeight: 38 }}>
            Ур. кафе: {this.props.lv_cafe}
          </TableCell>
          <TableCell style={{ minWidth: 165, minHeight: 38 }}>
            Число месяца
          </TableCell>

          {this.props.kind == 'manager' ? null : <TableCell></TableCell>}

          {this.props.days.map((item, key) => (
            <TableCell
              className="min_block"
              style={{
                backgroundColor:
                  item.day == 'Пт' || item.day == 'Сб' || item.day == 'Вс'
                    ? '#ffe9bd'
                    : '#fff',
              }}
              key={key}
            >
              {item.date}
            </TableCell>
          ))}

          
            
          <TableCell></TableCell>

          {this.props.dataKey > 0 ? (
            <>
              <TableCell style={{ textAlign: 'center' }}></TableCell>
              <TableCell style={{ textAlign: 'center' }}></TableCell>
            </>
          ) : (
            <>
              <TableCell
                style={{ textAlign: 'center', cursor: 'pointer' }}
                onClick={ this.props.kind == 'manager' || this.props.kind == 'dir' ? () => {} : this.props.bonus_other ? () => {} : this.props.changeDopBonus}
              >
                {!this.props.bonus_other ? (
                  '+ / -'
                ) : parseInt(this.props.bonus_other) == 1 ? (
                  <AddIcon style={{ fontSize: 30, color: 'green' }} />
                ) : (
                  <CloseIcon style={{ fontSize: 30, color: 'red' }} />
                )}
              </TableCell>
              <TableCell
                style={{ textAlign: 'center', cursor: 'pointer' }}
                onClick={ this.props.kind == 'manager' || this.props.kind == 'dir' ? () => {} : this.props.changeLVDir}
              >
                Ур. дира: {this.props.lv_dir}
              </TableCell>
            </>
          )}

          <TableCell style={{ textAlign: 'center' }}></TableCell>
          <TableCell style={{ textAlign: 'center' }}></TableCell>
          <TableCell style={{ textAlign: 'center' }}></TableCell>
          <TableCell style={{ textAlign: 'center' }}></TableCell>
        </TableRow>

        <TableRow>
          <TableCell style={{ minWidth: 140, minHeight: 38 }}>
            Сотрудник
          </TableCell>
          <TableCell style={{ minWidth: 165, minHeight: 38 }}>
            Должность
          </TableCell>

          {this.props.kind == 'manager' ? null : <TableCell></TableCell>}

          {this.props.days.map((item, key) => (
            <TableCell
              className="min_block"
              style={{
                backgroundColor:
                  item.day == 'Пт' || item.day == 'Сб' || item.day == 'Вс'
                    ? '#ffe9bd'
                    : '#fff',
              }}
              key={key}
            >
              {item.day}
            </TableCell>
          ))}

          <TableCell style={{ textAlign: 'center' }}>За 1ч</TableCell>

          <TableCell style={{ textAlign: 'center' }}>Командный бонус</TableCell>
          <TableCell style={{ textAlign: 'center' }}>За часы</TableCell>
          <TableCell style={{ textAlign: 'center' }}>Ошибки</TableCell>
          <TableCell style={{ textAlign: 'center' }}>Бонус</TableCell>
            
          {this.props.show_zp == 1 || this.props.show_zp == 0 ? (
            <TableCell style={{ textAlign: 'center' }}>Всего</TableCell>
          ) : null}

          <TableCell style={{ textAlign: 'center' }}>Выдано</TableCell>
        </TableRow>

        <TableRow style={{ backgroundColor: '#e5e5e5' }}>
          <TableCell
            style={{ textAlign: 'center', cursor: 'pointer' }}
            colSpan={this.props.days.length + 3 + 7}
            onClick={ this.props.kind == 'manager' ? () => {} : this.props.editSmena ? this.props.editSmena.bind(this, this.props.item.smena_id) : () => { console.log('no_edit_smena') } }
          >
            {this.props.item.data}
          </TableCell>
        </TableRow>
      </>
    );
  }
}

class WorkSchedule_Table extends React.Component {
  shouldComponentUpdate(nextProps) {
    var array1 = nextProps.test;
    var array2 = this.props.test;

    var is_same =
      array1.length == array2.length &&
      array1.every(function (element, index) {
        return element === array2[index];
      });

    return !is_same;
  }

  render() {
    let check_period = this.props.test.find( item => item.row !== 'header' && parseInt(item.data.check_period) == 0 );

    return (
      <TableContainer component={Paper}>
        <Table
          id={
            this.props.numberChoose === 1
              ? 'table_graph_one'
              : 'table_graph_two'
          }
        >
          <TableBody>

            { !check_period ? null :
              <TableRow>
                <TableCell colSpan={25} style={{ textAlign: 'center', color: 'red', fontSize: '3rem' }}>Чтобы увидеть зарплату, надо закрыть все ошибки в модуле "Регистрация ошибок кухни"</TableCell>
              </TableRow>
            }

            {this.props.test.map((item, key) =>
              item.row == 'header' ? (
                
                <React.Fragment key={key}>
                  
                  <HeaderItem
                    bonus_other={this.props.number.bonus_other}
                    changeLVDir={this.props.changeLVDir.bind(this)}
                    changeDopBonus={this.props.changeDopBonus.bind(this)}
                    kind={this.props.kind}
                    show_zp={this.props.show_zp}
                    lv_dir={this.props.lv_dir}
                    lv_cafe={this.props.lv_cafe}
                    dataKey={key}
                    days={this.props.number.days}
                    item={item}
                    editSmena={this.props.editSmena.bind(this)}
                  />

                  { parseInt(key) == 0 && this.props.kind !== 'manager' && this.props.kind !== 'other' ? 
                    <TableRow>
                      <TableCell colSpan={25} style={{ textAlign: 'left', fontSize: '3rem', cursor: 'pointer' }} onClick={this.props.addSmena.bind(this)}>Добавить смену</TableCell>
                    </TableRow>
                      : 
                    null 
                  }

                </React.Fragment>
              ) : (
                <TableRow key={key}>
                  <TableCell
                    className="name_pinning"
                    onClick={ this.props.kind == 'manager' ? () => {} : this.props.openM.bind(this, item.data) }
                  >
                    {item.data.user_name}
                  </TableCell>
                  <TableCell style={{ minWidth: 165, minHeight: 38 }}>
                    {item.data.app_name}
                  </TableCell>

                  {this.props.kind == 'manager' ? null : (
                    <TableCell style={{ textAlign: 'center' }}>
                      <SyncAltIcon
                        style={{
                          cursor: 'pointer',
                          display: 'block',
                          margin: 'auto',
                        }}
                        onClick={this.props.mix.bind(this, item.data)}
                      />
                    </TableCell>
                  )}

                  {item.data.dates.map((date, date_k) => (
                    <TableCell
                      onClick={this.props.openH.bind(this, item.data,date.date)}
                      className="min_block"
                      style={{
                        backgroundColor: date.info ? date.info.color : '#fff',
                        color: date.info ? date.info.colorT : '#000',
                        cursor: 'pointer',
                      }}
                      key={date_k}
                    >
                      {date.info ? date.info.hours : ''}
                    </TableCell>
                  ))}

                  
                  
                  <TableCell
                    style={{
                      textAlign: 'center',
                      minWidth: 70,
                      cursor: 'pointer',
                    }}
                    onClick={ this.props.kind == 'manager' ? () => {} : this.props.pricePerHour.bind(this, item.data) }
                  >{item.data.price_p_h}</TableCell>

                  <TableCell style={{ textAlign: 'center' }}>{ parseInt(item.data.check_period) == 1 ? item.data.dop_bonus : ' - '}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{ parseInt(item.data.check_period) == 1 ? item.data.h_price : ' - '}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{ parseInt(item.data.check_period) == 1 ? item.data.err_price : ' - '}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{ parseInt(item.data.check_period) == 1 ? item.data.my_bonus : ' - '}</TableCell>
                    

                  {this.props.show_zp == 1 || this.props.show_zp == 0 ? (
                    <TableCell style={{ textAlign: 'center' }}>
                      { parseInt(item.data.check_period) == 1 ? (parseInt(item.data.dop_bonus) +
                        parseInt(item.data.dir_price) +
                        parseInt(item.data.dir_price_dop) +
                        parseInt(item.data.h_price) +
                        parseInt(item.data.my_bonus) -
                        parseInt(item.data.err_price) +
                        '') : ' - '}
                    </TableCell>
                  ) : null}

                  {item.data.app_type == 'driver' ? (
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                  ) : (
                    <TableCell
                      style={{ textAlign: 'center' }}
                      onClick={this.props.openZP.bind(
                        this,
                        item.data.id,
                        item.data.smena_id,
                        item.data.app_id,
                        this.props.numberChoose,
                        item.data
                      )}
                    >
                      {item.data.given}
                    </TableCell>
                  )}
                    
                 
                </TableRow>
              )
            )}
          </TableBody>

          {this.props.kind == 'other' ? null :
            <TableFooter sx={{ '& td': { color: 'rgba(0, 0, 0, 0.87)' } }}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>

                {this.props.kind == 'manager' ? null : <TableCell></TableCell>}

                {this.props.number.bonus.map((item, key) => (
                  <TableCell
                    className="min_block min_size"
                    style={{
                      backgroundColor: item.type == 'cur' ? '#98e38d' : '#fff',
                    }}
                    key={key}
                  >
                    {item.res}
                  </TableCell>
                ))}

                {this.props.kind == 'manager' ? null : (
                  <>
                    <TableCell
                      style={{
                        textAlign: 'center',
                        minWidth: 70,
                        cursor: 'pointer',
                      }}
                    ></TableCell>

                    <TableCell style={{ textAlign: 'center' }}>{this.props.number.other_summ.sum_dop_bonus_price}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{this.props.number.other_summ.sum_h_price}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{this.props.number.other_summ.sum_err_price}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{this.props.number.other_summ.sum_bonus_price}</TableCell>
                      
                    {this.props.show_zp == 1 || this.props.show_zp == 0 ? (
                      <TableCell style={{ textAlign: 'center' }}>
                        {this.props.number.other_summ.sum_to_given_price}
                      </TableCell>
                    ) : null}

                    <TableCell style={{ textAlign: 'center' }}>
                      {this.props.number.other_summ.sum_given_price}
                    </TableCell>
                  </>
                )}
              </TableRow>

              <TableRow>
                <TableCell></TableCell>
                <TableCell>Роллов</TableCell>

                {this.props.kind == 'manager' ? null : <TableCell></TableCell>}

                {this.props.number.bonus.map((item, key) => (
                  <TableCell className="min_block min_size" key={key}>
                    {item.count_rolls}
                  </TableCell>
                ))}

                {this.props.kind == 'manager' ? null : (
                  <>
                    <TableCell
                      style={{
                        textAlign: 'center',
                        minWidth: 70,
                        cursor: 'pointer',
                      }}
                    ></TableCell>

                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                      
                    {this.props.show_zp == 1 || this.props.show_zp == 0 ? (
                      <TableCell style={{ textAlign: 'center' }}></TableCell>
                    ) : null}

                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                  </>
                )}
              </TableRow>

              <TableRow>
                <TableCell></TableCell>
                <TableCell>Пиццы</TableCell>

                {this.props.kind == 'manager' ? null : <TableCell></TableCell>}

                {this.props.number.bonus.map((item, key) => (
                  <TableCell className="min_block min_size" key={key}>
                    {item.count_pizza}
                  </TableCell>
                ))}

                {this.props.kind == 'manager' ? null : (
                  <>
                    <TableCell
                      style={{
                        textAlign: 'center',
                        minWidth: 70,
                        cursor: 'pointer',
                      }}
                    ></TableCell>

                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                      
                    {this.props.show_zp == 1 || this.props.show_zp == 0 ? (
                      <TableCell style={{ textAlign: 'center' }}></TableCell>
                    ) : null}

                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                  </>
                )}
              </TableRow>

              <TableRow>
                <TableCell></TableCell>
                <TableCell className="min_size">
                  Заказы готовились больше 40 минут
                </TableCell>

                {this.props.kind == 'manager' ? null : <TableCell></TableCell>}

                {this.props.number.order_stat.map((item, key) => (
                  <TableCell className="min_block min_size" key={key}>
                    {item.count_false}
                  </TableCell>
                ))}

                {this.props.kind == 'manager' ? null : (
                  <>
                    <TableCell
                      style={{
                        textAlign: 'center',
                        minWidth: 70,
                        cursor: 'pointer',
                      }}
                    ></TableCell>

                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    
                    {this.props.show_zp == 1 || this.props.show_zp == 0 ? (
                      <TableCell style={{ textAlign: 'center' }}></TableCell>
                    ) : null}

                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                  </>
                )}
              </TableRow>
            </TableFooter>
          }
        </Table>
      </TableContainer>
    );
  }
}

class WorkSchedule_Table_without_functions extends React.Component {
  shouldComponentUpdate(nextProps) {
    // console.log(nextProps);

    // var array1 = nextProps.event;
    // var array2 = this.props.event;

    // var is_same =
    //   array1.length == array2.length &&
    //   array1.every(function (element, index) {
    //     return element === array2[index];
    //   });

    // return !is_same;
    return true;
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table
          id={
            this.props.numberChoose === 1
              ? 'table_graph_one'
              : 'table_graph_two'
          }
        >
          <TableBody>
            {this.props.test.map((item, key) =>
              item.row == 'header' ? (
                <HeaderItem
                  key={key}
                  bonus_other={this.props.number.bonus_other}
                  // changeLVDir={this.props.changeLVDir.bind(this)}
                  // changeDopBonus={this.props.changeDopBonus.bind(this)}
                  kind={this.props.kind}
                  show_zp={this.props.show_zp}
                  lv_dir={this.props.lv_dir}
                  lv_cafe={this.props.lv_cafe}
                  dataKey={key}
                  days={this.props.number.days}
                  item={item}
                />
              ) : (
                <TableRow key={key}>
                  <TableCell
                    className="name_pinning"
                    // onClick={this.props.openM.bind(this, item.data)}
                  >
                    {item.data.user_name}
                  </TableCell>
                  <TableCell style={{ minWidth: 165, minHeight: 38 }}>
                    {item.data.app_name}
                  </TableCell>

                  {this.props.kind == 'manager' ? null : (
                    <TableCell style={{ textAlign: 'center' }} />
                  )}

                  {item.data.dates.map((date, date_k) => (
                    <TableCell
                      onClick={this.props.openH.bind(this, item.data, date.date)}
                      className="min_block"
                      style={{
                        backgroundColor: date.info ? date.info.color : '#fff',
                        color: date.info ? date.info.colorT : '#000',
                        cursor: 'pointer',
                      }}
                      key={date_k}
                    >
                      {date.info ? date.info.hours : ''}
                    </TableCell>
                  ))}

                  {this.props.kind == 'manager' ? null : (
                    <>
                      <TableCell
                        style={{
                          textAlign: 'center',
                          minWidth: 70,
                          cursor: 'pointer',
                        }}
                        // onClick={this.props.pricePerHour.bind(this, item.data)}
                      >
                        {item.data.price_p_h}
                      </TableCell>

                      <TableCell style={{ textAlign: 'center' }}>{ parseInt(item.data.check_period) == 1 ? item.data.dop_bonus : ' - '}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{ parseInt(item.data.check_period) == 1 ? item.data.h_price : ' - '}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{ parseInt(item.data.check_period) == 1 ? item.data.err_price : ' - '}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{ parseInt(item.data.check_period) == 1 ? item.data.my_bonus : ' - '}</TableCell>
                        
                      {this.props.show_zp == 1 || this.props.show_zp == 0 ? (
                        <TableCell style={{ textAlign: 'center' }}>
                          { parseInt(item.data.check_period) == 1 ? (parseInt(item.data.dop_bonus) +
                            parseInt(item.data.dir_price) +
                            parseInt(item.data.dir_price_dop) +
                            parseInt(item.data.h_price) +
                            parseInt(item.data.my_bonus) -
                            parseInt(item.data.err_price) +
                            '') : ' - ' }
                        </TableCell>
                      ) : null}

                      {item.data.app_type == 'driver' ? (
                        <TableCell style={{ textAlign: 'center' }}></TableCell>
                      ) : (
                        <TableCell
                          style={{ textAlign: 'center' }}
                        >
                          {item.data.given}
                        </TableCell>
                      )}
                    </>
                  )}
                </TableRow>
              )
            )}
          </TableBody>

          {this.props.kind == 'other' ? null :
            <TableFooter sx={{ '& td': { color: 'rgba(0, 0, 0, 0.87)' } }}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>

                {this.props.kind == 'manager' ? null : <TableCell></TableCell>}

                {this.props.number.bonus.map((item, key) => (
                  <TableCell
                    className="min_block min_size"
                    style={{
                      backgroundColor: item.type == 'cur' ? '#98e38d' : '#fff',
                    }}
                    key={key}
                  >
                    {item.res}
                  </TableCell>
                ))}

                {this.props.kind == 'manager' ? null : (
                  <>
                    <TableCell
                      style={{
                        textAlign: 'center',
                        minWidth: 70,
                        cursor: 'pointer',
                      }}
                    ></TableCell>

                    <TableCell style={{ textAlign: 'center' }}>{this.props.number.other_summ.sum_dop_bonus_price}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{this.props.number.other_summ.sum_h_price}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{this.props.number.other_summ.sum_err_price}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{this.props.number.other_summ.sum_bonus_price}</TableCell>
                    
                    {this.props.show_zp == 1 || this.props.show_zp == 0 ? (
                      <TableCell style={{ textAlign: 'center' }}>
                        {this.props.number.other_summ.sum_to_given_price}
                      </TableCell>
                    ) : null}

                    <TableCell style={{ textAlign: 'center' }}>
                      {this.props.number.other_summ.sum_given_price}
                    </TableCell>
                  </>
                )}
              </TableRow>

              <TableRow>
                <TableCell></TableCell>
                <TableCell>Роллов</TableCell>

                {this.props.kind == 'manager' ? null : <TableCell></TableCell>}

                {this.props.number.bonus.map((item, key) => (
                  <TableCell className="min_block min_size" key={key}>
                    {item.count_rolls}
                  </TableCell>
                ))}

                {this.props.kind == 'manager' ? null : (
                  <>
                    <TableCell
                      style={{
                        textAlign: 'center',
                        minWidth: 70,
                        cursor: 'pointer',
                      }}
                    ></TableCell>

                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    
                    {this.props.show_zp == 1 || this.props.show_zp == 0 ? (
                      <TableCell style={{ textAlign: 'center' }}></TableCell>
                    ) : null}

                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                  </>
                )}
              </TableRow>

              <TableRow>
                <TableCell></TableCell>
                <TableCell>Пиццы</TableCell>

                {this.props.kind == 'manager' ? null : <TableCell></TableCell>}

                {this.props.number.bonus.map((item, key) => (
                  <TableCell className="min_block min_size" key={key}>
                    {item.count_pizza}
                  </TableCell>
                ))}

                {this.props.kind == 'manager' ? null : (
                  <>
                    <TableCell
                      style={{
                        textAlign: 'center',
                        minWidth: 70,
                        cursor: 'pointer',
                      }}
                    ></TableCell>

                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    
                    {this.props.show_zp == 1 || this.props.show_zp == 0 ? (
                      <TableCell style={{ textAlign: 'center' }}></TableCell>
                    ) : null}

                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                  </>
                )}
              </TableRow>

              <TableRow>
                <TableCell></TableCell>
                <TableCell className="min_size">
                  Заказы готовились больше 40 минут
                </TableCell>

                {this.props.kind == 'manager' ? null : <TableCell></TableCell>}

                {this.props.number.order_stat.map((item, key) => (
                  <TableCell className="min_block min_size" key={key}>
                    {item.count_false}
                  </TableCell>
                ))}

                {this.props.kind == 'manager' ? null : (
                  <>
                    <TableCell
                      style={{
                        textAlign: 'center',
                        minWidth: 70,
                        cursor: 'pointer',
                      }}
                    ></TableCell>

                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                    
                    {this.props.show_zp == 1 || this.props.show_zp == 0 ? (
                      <TableCell style={{ textAlign: 'center' }}></TableCell>
                    ) : null}

                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                  </>
                )}
              </TableRow>
            </TableFooter>
          }
        </Table>
      </TableContainer>
    );
  }
}

class WorkSchedule_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'work_schedule',
      module_name: '',
      is_load: false,

      points: [],
      mounths: [],
      point: '',
      mounth: '',

      one: null,
      two: null,
      test_one: [],
      test_two: [],

      isOpenModalH: false,
      isOpenModalM: false,
      isOpenModalHMini: false,

      userInfo: null,

      hList: [],
      mList: [],

      newTimeStart: '10:00',
      newTimeEnd: '22:00',

      openNewTimeAdd: false,

      otherAppList: [],
      otherApp: '',

      testVal: '',
      testOpen: false,

      mainMenu: false,
      mainMenuH: false,
      mainMenuSmena: false,
      show_bonus: false,
      mainMenuPrice: false,
      mainMenuLVDIR: false,
      mainMenuDopBonus: false,
      mainMenuZP: false,
      mainMenuPoints: false,

      show_zp_one: 0,
      show_zp_two: 0,
      kind: '',

      myOtherPoints: [],
      myOtherSmens: [],

      chooseUser: null,

      tabTable: 0,

      lv_cafe: 0,
      lv_dir: 0,
      arr_dir_lv: [],

      arrTimeAdd: [],
      typeTimeAdd: 0,

      isShowErr: false,
      isShowErrCam: false,

      showErr: null,
      showErrCam: null,

      errOrdersOneOrders: [],
      errOrdersTwoOrders: [],
      errOrdersOneCam: [],
      errOrdersTwoCam: [],

      newSmena: false,
      editSmena: false,
      allUsers: [],
      smena: null,
      newSmenaName: '',

      operAlert: false,
      err_status: true,
      err_text: '',
    };
  }

  async componentDidMount() {
    let data = {};

    let res = await this.getData('get_all', data);

    let hList = [];
    let mList = [];

    for (let h = 0; h <= 23; h++) {
      hList.push({
        id: h,
        name: h,
      });
    }

    for (let m = 0; m <= 50; m += 10) {
      mList.push({
        id: m,
        name: m,
      });
    }

    this.setState({
      points: res.point_list,
      point: res.point_list[0].id,

      mounths: res.mounths,
      mounth: res.mounths.find((item) => parseInt(item.is_active) == 1)['id'],

      hList: hList,
      mList: mList,

      module_name: res.module_info.name,
    });

    document.title = res.module_info.name;

    let arr_dir_lv = [];

    for (let i = 1; i <= 20; i++) {
      arr_dir_lv.push(i);
    }

    this.setState({
      arr_dir_lv: arr_dir_lv,
    });

    setTimeout(() => {
      this.updateData();
    }, 300);
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
        setTimeout(() => {
          this.setState({
            is_load: false,
          });
        }, 300);
        console.log(err);
      });
  };

  changeCheckOrders(event) {
    let data = event.target.checked;

    this.setState({
      showReady: data,
    });
  }

  async updateData() {
    let data = {
      point_id: this.state.point,
      mounth: this.state.mounth,
    };

    let res = await this.getData('get_graph', data);

    console.log( res )

    this.setState({
      one: res.date.one,
      two: res.date.two,

      test_one: res.one,
      test_two: res.two,

      show_zp_one: res.show_zp_one,
      show_zp_two: res.show_zp_two,
      kind: res.kind,

      lv_cafe: res.lv_cafe,
      lv_dir: res.lv_dir,

      errOrdersOneOrders: res.err.one.orders,
      errOrdersTwoOrders: res.err.two.orders,

      errOrdersOneCam: res.err.one.cam,
      errOrdersTwoCam: res.err.two.cam,

      isShowErr: false,
      showErr: null,

      tabTable: localStorage.getItem('tabTable') ? parseInt(localStorage.getItem('tabTable')) : parseInt(res.part) - 1
    });
  }

  async openH(item, this_date) {
    let data = {
      smena_id: item.smena_id,
      app_id: item.app_id,
      user_id: item.id,
      date: this_date,
      date_start: item.date,
    };

    let res = await this.getData('get_user_day', data);

    console.log( res )

    this.setState({
      isOpenModalH: true,
      userInfo: res.h_info,
      otherAppList: res.other_app,
      show_bonus: res.show_bonus,
    });
  }

  async openHMini(item, this_date) {
    let data = {
      smena_id: item.smena_id,
      app_id: item.app_id,
      user_id: item.id,
      date: this_date,
      date_start: item.date,
    };

    let res = await this.getData('get_user_day', data);

    console.log( res )

    this.setState({
      isOpenModalHMini: true,
      userInfo: res.h_info,
      //otherAppList: res.other_app,
      //show_bonus: res.show_bonus,
    });
  }

  async openM(item) {
    console.log( item )

    let data = {
      smena_id: item.smena_id,
      app_id: item.app_id,
      user_id: item.id,
      date: this.state.mounth,
      date_start: item.date,
    };

    console.log( data )

    let res = await this.getData('get_user_month', data);

    console.log( res )

    this.setState({
      isOpenModalM: true,
      userInfo: res.h_info,
      arrTimeAdd: res.hourse_days,
    });
  }

  delTime(key_time) {
    let userInfo = this.state.userInfo;

    userInfo.hours = userInfo.hours.filter(
      (item, key) => parseInt(key) != parseInt(key_time)
    );

    this.setState({
      userInfo: userInfo,
    });
  }

  changeHourse(type, key, event) {
    let userInfo = this.state.userInfo;

    userInfo.hours[key][[type]] = event.target.value;

    this.setState({
      userInfo: userInfo,
    });
  }

  async saveDayHourse() {
    let data = {
      date: this.state.userInfo.date,
      user_id: this.state.userInfo.user_id,
      smena_id: this.state.userInfo.smena_id,
      app_id: this.state.userInfo.app_id,
      hours: this.state.userInfo.hours,
      new_app: this.state.userInfo.new_app,
      mentor_id: this.state.userInfo.mentor_id,

      point_id: this.state.point
    };

    let res = await this.getData('save_user_day', data);

    if (res['st'] == true) {
      this.setState({
        mainMenu: false,
        mainMenuH: false,
        mainMenuSmena: false,
        isOpenModalH: false,
        userInfo: null,

        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      });

      setTimeout(() => {
        this.updateData();
      }, 300);
    } else {
      this.setState({
        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      })
    }
  }

  addTime() {
    let userInfo = this.state.userInfo;

    let check = userInfo.hours.find(
      (item) =>
        item.time_start == this.state.newTimeStart &&
        item.time_end == this.state.newTimeEnd
    );

    if (check) {
      this.setState({
        openNewTimeAdd: false,
      });

      return;
    }

    userInfo.hours.push({
      time_start: this.state.newTimeStart,
      time_end: this.state.newTimeEnd,
    });

    this.setState({
      userInfo: userInfo,
      openNewTimeAdd: false,
    });
  }

  async fastTime(type) {
    let data = {
      type: type,
      user_id: this.state.chooseUser.id,
      app_id: this.state.chooseUser.app_id,
      smena_id: this.state.chooseUser.smena_id,
      date: this.state.mounth,
    };

    let res = await this.getData('save_fastTime', data);

    // console.log( res );

    if (res['st'] == true) {
      this.setState({
        mainMenu: false,
        mainMenuH: false,
        mainMenuSmena: false,

        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      });

      setTimeout(() => {
        this.updateData();
      }, 300);
    } else {
      this.setState({
        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      })
    }
  }

  async fastSmena(smena_id) {
    let data = {
      new_smena_id: smena_id,
      user_id: this.state.chooseUser.id,
      app_id: this.state.chooseUser.app_id,
      smena_id: this.state.chooseUser.smena_id,
      date: this.state.mounth,
      part: this.state.tabTable,
    };

    let res = await this.getData('save_fastSmena', data);

    if (res['st'] == true) {
      this.setState({
        mainMenu: false,
        mainMenuH: false,
        mainMenuSmena: false,

        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      });

      setTimeout(() => {
        this.updateData();
      }, 300);
    } else {
      this.setState({
        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      })
    }
  }

  async changePriceH(price) {
    let data = {
      price: price,
      user_id: this.state.chooseUser.id,
      app_id: this.state.chooseUser.app_id,
      smena_id: this.state.chooseUser.smena_id,
      date: this.state.mounth,
      part: this.state.tabTable,
    };

    let res = await this.getData('save_userPriceH', data);

    // console.log( res );

    if (res['st'] == true) {
      this.setState({
        mainMenu: false,
        mainMenuH: false,
        mainMenuPrice: false,

        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      });

      this.updateData();
    } else {
      this.setState({
        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      })
    }
  }

  checkFastPoint(point) {

    console.log( point )

    if (confirm('Точно сменить точку с сегоднешнего дня ?')) {
      this.fastPoint(point.point_id, point.smena_id);
    }
  }

  async fastPoint(point_id, smena_id) {
    let data = {
      new_point_id: point_id,
      new_smena_id: smena_id,
      user_id: this.state.chooseUser.id,
      app_id: this.state.chooseUser.app_id,
      smena_id: this.state.chooseUser.smena_id,
    };

    let res = await this.getData('save_fastPoint', data);

    // console.log( res );

    if (res['st'] == true) {
      this.setState({
        mainMenu: false,
        mainMenuPoints: false,
        chooseUser: null,

        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      });

      setTimeout(() => {
        this.updateData();
      }, 300);
    } else {
      this.setState({
        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      })
    }
  }

  changeLVDir() {
    this.setState({
      mainMenuLVDIR: true,
    });
  }

  checkNewLvDir(LV) {
    if (confirm('Точно изменить уровень директора ?')) {
      this.newLvDir(LV);
    }
  }

  async newLvDir(LV) {
    let data = {
      date: this.state.mounth,
      point_id: this.state.point,
      dir_lv: LV,
    };

    let res = await this.getData('save_dir_lv', data);

    // console.log( res );

    if (res['st'] == true) {
      this.setState({
        mainMenuLVDIR: false,

        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      });

      setTimeout(() => {
        this.updateData();
      }, 300);
    } else {
      this.setState({
        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      })
    }
  }

  changeDopBonus() {
    this.setState({
      mainMenuDopBonus: true,
    });
  }

  checkDopBonus(type) {
    if (confirm('Точно ?')) {
      this.dop_bonus(type);
    }
  }

  async dop_bonus(type) {
    let data = {
      date: this.state.mounth,
      part: this.state.tabTable,
      point_id: this.state.point,
      type: type,
    };

    let res = await this.getData('save_dop_bonus', data);

    // console.log( res );

    if (res['st'] == true) {
      this.setState({
        mainMenuDopBonus: false,

        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      });

      this.updateData();
    } else {
      this.setState({
        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      })
    }
  }

  renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    pickersDayProps['selected'] = false;
    pickersDayProps['aria-selected'] = false;

    let arr = this.state.arrTimeAdd;
    let res = arr.find((item) => formatDate(item.date) == formatDate(date));

    if (res) {
      let backgroundColor = '#fff';

      if (parseInt(res.type) == 0) {
        backgroundColor = '#98e38d';
      } else {
        if (parseInt(res.type) == 1) {
          backgroundColor = '#3dcef2';
        } else {
          if (parseInt(res.type) == 2) {
            backgroundColor = '#1560bd';
          } else {
            backgroundColor = '#926eae';
          }
        }
      }

      return (
        <PickersDay
          {...pickersDayProps}
          style={{ backgroundColor: backgroundColor, color: '#fff' }}
          onClick={this.chooseDay.bind(this, date)}
        />
      );
    }

    return (
      <PickersDay
        {...pickersDayProps}
        onClick={this.chooseDay.bind(this, date)}
      />
    );
  };

  chooseDay(newValue, event) {
    let arr = this.state.arrTimeAdd;

    let res = arr.find((item) => formatDate(item.date) == formatDate(newValue));

    if (!res) {
      let time_start = '';
      let time_end = '';

      if (parseInt(this.state.typeTimeAdd) == 0) {
        time_start = '10:00';
        time_end = '22:00';
      }

      if (parseInt(this.state.typeTimeAdd) == 1) {
        time_start = '10:00';
        time_end = '16:00';
      }

      if (parseInt(this.state.typeTimeAdd) == 2) {
        time_start = '16:00';
        time_end = '22:00';
      }

      arr.push({
        date: formatDate(newValue),
        type: this.state.typeTimeAdd,
        time_start: time_start,
        time_end: time_end,
      });

      this.setState({
        arrTimeAdd: arr,
      });
    } else {
      let newArr = arr.filter(
        (item) => formatDate(item.date) != formatDate(newValue)
      );

      this.setState({
        arrTimeAdd: newArr,
      });
    }
  }

  chooseType(type) {
    this.setState({
      typeTimeAdd: type,
    });
  }

  async saveUserM() {
    let data = {
      dates: this.state.arrTimeAdd,
      point_id: this.state.point,
      date: this.state.mounth,

      user_id: this.state.userInfo.user.user_id,
      smena_id: this.state.userInfo.user.smena_id,
      app_id: this.state.userInfo.user.app_id,
    };

    let res = await this.getData('save_user_month', data);

    // console.log( res );

    if (res['st'] == true) {
      this.setState({
        isOpenModalM: false,
        userInfo: null,

        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      });

      setTimeout(() => {
        this.updateData();
      }, 300);
    } else {
      this.setState({
        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      })
    }
  }

  openZP(user_id, smena_id, app_id, part, user) {
    // console.log(user_id, smena_id, app_id, part, user)

    let fullPrice =
      parseInt(user.h_price) +
      parseInt(user.my_bonus) +
      parseInt(user.dir_price) +
      parseInt(user.dir_price_dop) +
      parseInt(user.dop_bonus) -
      parseInt(user.err_price);

    this.setState({
      mainMenuZP: true,
      userInfo: {
        name: user.user_name,
        app: user.full_app_name,
        fullPrice: fullPrice,
        given: user.given,
        date: this.state.mounth + (parseInt(part) == 1 ? '-01' : '-16'),
        user_id: user_id,
        smena_id: smena_id,
        app_id: app_id,
      },
    });
  }

  async saveGive() {
    let data = {
      date: this.state.userInfo.date,
      user_id: this.state.userInfo.user_id,
      smena_id: this.state.userInfo.smena_id,
      app_id: this.state.userInfo.app_id,
      give_price: this.state.userInfo.given,
    };

    let res = await this.getData('save_user_give_price', data);

    // console.log( res );

    if (res['st'] == true) {
      this.setState({
        mainMenuZP: false,
        userInfo: null,

        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      });

      setTimeout(() => {
        this.updateData();
      }, 300);
    } else {
      this.setState({
        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      })
    }
  }

  mix(item) {
    // console.log(item)
    this.setState({
      mainMenu: true,
      chooseUser: item,
    });
  }

  pricePerHour(item) {
    // console.log(item)
    this.setState({
      mainMenuPrice: true,
      chooseUser: item,
    });
  }

  async showErrOrder(id, row_id){
    let data = {
      id: id,
      row_id: row_id
    };

    let res = await this.getData('get_my_err_order', data);

    console.log( res )

    this.setState({
      showErr: res,
      isShowErr: true
    })
  }

  fakeOrders(){
    if (confirm('Точно обжаловать ?')) {
      this.saveFakeOrders();
    }
  }

  async saveFakeOrders(){
    let data = {
      err_id: this.state.showErr.err_id,
      row_id: this.state.showErr.row_id,
      order_id: this.state.showErr.order_id,
      text: this.state.showErr.new_text_1
    };

    console.log( data )

    let res = await this.getData('save_fake_orders', data);

    if (res['st'] == true) {
      this.setState({
        isShowErr: false,
        showErr: null,

        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      });

      setTimeout(() => {
        this.updateData();
      }, 300);
    } else {
      this.setState({
        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      })
    }
  }

  async showErrCam(id){
    let data = {
      id: id
    };

    let res = await this.getData('get_my_err_cam', data);

    console.log( res )

    this.setState({
      showErrCam: res,
      isShowErrCam: true
    })
  }

  fakeCam(){
    if (confirm('Точно обжаловать ?')) {
      this.saveFakeCam();
    }
  }

  async saveFakeCam(){
    let data = {
      id: this.state.showErrCam.id,
      text: this.state.showErrCam.text_one
    };

    let res = await this.getData('save_fake_cam', data);

    console.log( res )

    this.setState({
      showErrCam: res,
      isShowErrCam: true,

      operAlert: true,
      err_status: res.st,
      err_text: res.text,
    })
  }

  async addSmena(){
    let data = {
      point_id: this.state.point,
    };

    let res = await this.getData('getAllForNewSmena', data);

    console.log( res )

    this.setState({ 
      newSmena: true, 
      newSmenaName: '',
      allUsers: res.free_users
    });
  }

  async editSmena(id){
    let data = {
      id: id,
      point_id: this.state.point,
    };

    let res = await this.getData('getOneSmena', data);

    console.log( res )

    this.setState({ 
      editSmena: true, 
      smena: res.smena,
      newSmenaName: res.smena.name,
      allUsers: res.free_users,
    });
  }

  async saveNewSmena(){
    let data = {
      name: this.state.newSmenaName,
      point_id: this.state.point,
      users: this.state.allUsers
    };

    let res = await this.getData('saveNewSmena', data);

    console.log( res )

    if (res['st'] == true) {
      this.setState({
        newSmenaName: '',
        newSmena: false,
        allUsers: [],

        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      });

      setTimeout(() => {
        this.updateData();
      }, 300);
    } else {
      this.setState({
        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      })
    }
  }

  async saveEditSmena(){
    let data = {
      id: this.state.smena.id,
      name: this.state.newSmenaName,
      point_id: this.state.point,
      users: this.state.allUsers
    };

    let res = await this.getData('saveEditSmena', data);

    console.log( res )

    if (res['st'] == true) {
      this.setState({
        newSmenaName: '',
        editSmena: false,
        smena: null,
        allUsers: [],

        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      });

      setTimeout(() => {
        this.updateData();
      }, 300);
    } else {
      this.setState({
        operAlert: true,
        err_status: res.st,
        err_text: res.text,
      })
    }
  }

  async deleteSmena(){
    if (confirm("Удалить смену ?")) {
      let data = {
        id: this.state.smena.id,
        point_id: this.state.point,
        users: this.state.allUsers
      };
  
      let res = await this.getData('deleteSmena', data);
  
      console.log( res )
  
      if (res['st'] == true) {
        this.setState({
          newSmenaName: '',
          editSmena: false,
          smena: null,
          allUsers: [],

          operAlert: true,
          err_status: res.st,
          err_text: res.text,
        });
  
        setTimeout(() => {
          this.updateData();
        }, 300);
      } else {
        this.setState({
          operAlert: true,
          err_status: res.st,
          err_text: res.text,
        })
      }
    } 
  }

  changeNewSmenaUsers(user_id){

    const userList = this.state.allUsers;

    userList.map( (item, key) => {
      if( parseInt(item.id) == parseInt(user_id) ){ 
        userList[ key ]['is_my'] = parseInt(item.is_my) == 1 ? 0 : 1;
      }
    })

    this.setState({ 
      allUsers: userList
    })
  }

  render() {
    return (
      <>
        <Backdrop open={this.state.is_load} style={{ zIndex: 999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <MyAlert 
          isOpen={this.state.operAlert} 
          onClose={() => { this.setState({ operAlert: false }); }} 
          status={this.state.err_status} 
          text={this.state.err_text} />

        <Dialog
          onClose={() => {
            this.setState({ mainMenu: false });
          }}
          open={this.state.mainMenu}
        >
          {!this.state.chooseUser ? null : (
            <DialogTitle>
              {this.state.chooseUser.full_app_name}{' '}
              {this.state.chooseUser.user_name} {this.state.mounth}
            </DialogTitle>
          )}

          <List sx={{ pt: 0 }}>
            <ListItem
              button
              onClick={() => {
                this.setState({ mainMenu: false, mainMenuH: true });
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <AccessTimeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Сменить часы на месяц" />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                this.setState({
                  mainMenu: false,
                  mainMenuSmena: true,
                  myOtherSmens: this.state.chooseUser.other_smens,
                });
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <SyncAltIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Сменить смену" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                this.setState({
                  mainMenu: false,
                  mainMenuPoints: true,
                  myOtherPoints: this.state.chooseUser.other_points,
                });
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <HomeWorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Сменить точку" />
            </ListItem>
          </List>
        </Dialog>

        <Dialog
          onClose={() => { this.setState({ mainMenuH: false }); }}
          open={this.state.mainMenuH}
        >
          {!this.state.chooseUser ? null : (
            <DialogTitle>
              Часы {this.state.chooseUser.user_name} {this.state.mounth}
            </DialogTitle>
          )}

          <List sx={{ pt: 0 }}>
            <ListItem button onClick={this.fastTime.bind(this, 1)}>
              <ListItemAvatar>
                <Avatar>
                  <LooksOneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="С 1 числа 2/2 с 10 до 22 на месяц" />
            </ListItem>

            <ListItem button onClick={this.fastTime.bind(this, 2)}>
              <ListItemAvatar>
                <Avatar>
                  <LooksTwoIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Со 2 числа 2/2 с 10 до 22 на месяц" />
            </ListItem>
            <ListItem button onClick={this.fastTime.bind(this, 3)}>
              <ListItemAvatar>
                <Avatar>
                  <Looks3Icon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="С 3 числа 2/2 с 10 до 22 на месяц" />
            </ListItem>
            <ListItem button onClick={this.fastTime.bind(this, 4)}>
              <ListItemAvatar>
                <Avatar>
                  <Looks3Icon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="С 4 числа 2/2 с 10 до 22 на месяц" />
            </ListItem>
          </List>
        </Dialog>

        <Dialog
          onClose={() => { this.setState({ mainMenuSmena: false }); }}
          open={this.state.mainMenuSmena}
        >
          {!this.state.chooseUser ? null : (
            <DialogTitle>
              Смена {this.state.chooseUser.user_name} {this.state.mounth}
            </DialogTitle>
          )}

          <List sx={{ pt: 0 }}>
            {this.state.myOtherSmens.map((item, key) => (
              <ListItem
                key={key}
                button
                onClick={this.fastSmena.bind(this, item.id)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <AssessmentIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Dialog>

        <Dialog
          onClose={() => { this.setState({ mainMenuPoints: false }); }}
          open={this.state.mainMenuPoints}
        >
          {!this.state.chooseUser ? null : (
            <DialogTitle>
              Смена точка с сегоднешнего дня {this.state.chooseUser.user_name}
            </DialogTitle>
          )}

          <List sx={{ pt: 0 }}>
            {this.state.myOtherPoints.map((item, key) => (
              <ListItem key={key} button onClick={this.checkFastPoint.bind(this, item)}>
                <ListItemAvatar>
                  <Avatar>
                    <HomeWorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Dialog>

        <Dialog
          onClose={() => { this.setState({ mainMenuPrice: false }); }}
          open={this.state.mainMenuPrice}
        >
          {!this.state.chooseUser ? null : (
            <DialogTitle>
              Часовая ставка {this.state.chooseUser.user_name}{' '}
              {this.state.mounth}
            </DialogTitle>
          )}

          {!this.state.chooseUser ? null : (
            <List sx={{ pt: 0 }}>
              {this.state.chooseUser.price_arr.map((item, key) => (
                <ListItem
                  key={key}
                  button
                  onClick={this.changePriceH.bind(this, item)}
                  style={
                    parseFloat(this.state.chooseUser.price_p_h) ==
                    parseFloat(item)
                      ? { backgroundColor: 'green', color: '#fff' }
                      : {}
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <AssessmentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          )}
        </Dialog>

        <Dialog
          onClose={() => { this.setState({ mainMenuLVDIR: false }); }}
          open={this.state.mainMenuLVDIR}
        >
          <DialogTitle>Уровень директора {this.state.mounth}</DialogTitle>

          <List style={{ overflow: 'scroll' }}>
            {this.state.arr_dir_lv.map((item, key) => (
              <ListItem
                key={key}
                button
                style={
                  parseFloat(this.state.lv_dir) == parseFloat(item)
                    ? { backgroundColor: 'green', color: '#fff' }
                    : {}
                }
                onClick={this.checkNewLvDir.bind(this, item)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <AssessmentIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item + ' уровень'} />
              </ListItem>
            ))}
          </List>
        </Dialog>

        <Dialog
          onClose={() => { this.setState({ mainMenuDopBonus: false }); }}
          open={this.state.mainMenuDopBonus}
        >
          <DialogTitle>
            Командный бонус {this.state.mounth}-
            {parseInt(this.state.tabTable) == 0 ? '01' : '16'}
          </DialogTitle>

          <List sx={{ pt: 0 }}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: 'green' }}>
                  <CheckIcon style={{ color: '#fff' }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={'Выдать'}
                onClick={this.checkDopBonus.bind(this, 1)}
              />
            </ListItem>
            <ListItem button>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: 'red' }}>
                  <CloseIcon style={{ color: '#fff' }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={'Отказать'}
                onClick={this.checkDopBonus.bind(this, 2)}
              />
            </ListItem>
          </List>
        </Dialog>

        {!this.state.userInfo || this.state.mainMenuZP === false ? null : (
          <Dialog
            onClose={() => {
              this.setState({ mainMenuZP: false, userInfo: null });
            }}
            open={this.state.mainMenuZP}
          >
            <DialogTitle>
              {this.state.userInfo.app} {this.state.userInfo.name}{' '}
              {this.state.userInfo.date}
            </DialogTitle>

            <DialogContent>
              <Grid container spacing={3} style={{ marginTop: 10 }}>
                <Grid item xs={12} sm={12}>
                  <MyTextInput
                    label="Выданная сумма"
                    value={this.state.userInfo.given}
                    func={(event) => {
                      let userInfo = this.state.userInfo;
                      userInfo.given = event.target.value;
                      this.setState({ userInfo: userInfo });
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <span>Вся сумма: </span>
                  <span
                    style={{
                      color: '#c03',
                      borderBottom: '1px dotted #c03',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      let userInfo = this.state.userInfo;
                      userInfo.given = userInfo.fullPrice;
                      this.setState({ userInfo: userInfo });
                    }}
                  >
                    {this.state.userInfo.fullPrice}
                  </span>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Button
                style={{ backgroundColor: 'green', color: '#fff' }}
                onClick={this.saveGive.bind(this)}
              >
                Сохранить
              </Button>
              <Button
                style={{ backgroundColor: 'red', color: '#fff' }}
                onClick={() => {
                  this.setState({ mainMenuZP: false, userInfo: null });
                }}
              >
                Отмена
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {!this.state.userInfo || this.state.isOpenModalH === false ? null : (
          <Dialog
            open={this.state.isOpenModalH}
            onClose={() => {
              this.setState({ isOpenModalH: false });
            }}
            scroll="paper"
            fullWidth={true}
            maxWidth={'md'}
            id={'OpenModalH'}
          >
            <DialogTitle id="scroll-dialog-title">
              {this.state.userInfo.user.app_name +
                ' ' +
                this.state.userInfo.user.user_name +
                ' ' +
                this.state.userInfo.date}
            </DialogTitle>
            <DialogContent>
              <Typography style={{ marginBottom: 10 }}>
                {'Нагрузка: ' +
                  this.state.userInfo.user.my_load_h +
                  ' / Средняя нагрузка: ' +
                  this.state.userInfo.user.all_load_h}
              </Typography>
              
              {this.state.otherAppList.length == 0 ? null : (
                <MySelect
                  data={this.state.otherAppList}
                  value={this.state.userInfo.new_app}
                  func={(event) => {
                    let userInfo = this.state.userInfo;
                    userInfo.new_app = event.target.value;
                    this.setState({ userInfo: userInfo });
                  }}
                  label="Кем работает"
                />
              )}

              {this.state.userInfo.mentor_list.length == 0 ? null : (
                <MySelect
                  data={this.state.userInfo.mentor_list}
                  value={this.state.userInfo.mentor_id}
                  func={(event) => {
                    let userInfo = this.state.userInfo;
                    userInfo.mentor_id = event.target.value;
                    this.setState({ userInfo: userInfo });
                  }}
                  label="Наставник"
                />
              )}

              <Accordion
                style={{ marginTop: 20 }}
                expanded={this.state.openNewTimeAdd}
                onChange={() => {
                  this.setState({ openNewTimeAdd: !this.state.openNewTimeAdd });
                }}
              >
                <AccordionSummary expandIcon={<AddIcon />}>
                  <AccessTimeIcon style={{ marginRight: 10 }} />
                  <Typography>Добавить время</Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{ display: 'flex', flexDirection: 'row' }}
                >
                  <MyTimePicker
                    value={this.state.newTimeStart}
                    func={(event) => {
                      this.setState({ newTimeStart: event.target.value });
                    }}
                    label="Время начала работы"
                  />
                  <Typography width={'3%'}></Typography>
                  <MyTimePicker
                    value={this.state.newTimeEnd}
                    func={(event) => {
                      this.setState({ newTimeEnd: event.target.value });
                    }}
                    label="Время окончания работы"
                  />
                  <Typography width={'3%'}></Typography>
                  <Button
                    style={{
                      minWidth: '12%',
                      backgroundColor: 'red',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                    onClick={this.addTime.bind(this)}
                  >
                    Добавить
                  </Button>

                  {/* <AddIcon style={{ minWidth: 50, minHeight: 38, cursor: 'pointer' }} onClick={ this.addTime.bind(this) } /> */}
                </AccordionDetails>
              </Accordion>

              {this.state.userInfo.hours.map((item, key) => (
                <Accordion key={key}>
                  <AccordionSummary
                    expandIcon={
                      <CloseIcon onClick={this.delTime.bind(this, key)} />
                    }
                  >
                    <AccessTimeIcon style={{ marginRight: 10 }} />
                    <Typography>
                      {item.time_start + ' - ' + item.time_end}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <MyTimePicker
                      value={item.time_start}
                      func={this.changeHourse.bind(this, 'time_start', key)}
                      label="Время начала работы"
                    />
                    <Typography width={'3%'}></Typography>
                    <MyTimePicker
                      value={item.time_end}
                      func={this.changeHourse.bind(this, 'time_end', key)}
                      label="Время окончания работы"
                    />
                  </AccordionDetails>
                </Accordion>
              ))}

              {!this.state.userInfo.hist.length ? null : (
                <Accordion style={{ marginTop: 50 }} disabled>
                  <AccordionSummary>
                    <Typography>История</Typography>
                  </AccordionSummary>
                </Accordion>
              )}
              {this.state.userInfo.hist.map((item, key) => (
                <Accordion key={key}>
                  <AccordionSummary>
                    <Typography>
                      {item.date + ' - ' + item.user_name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    {item.items.map((it, k) => (
                      <Typography key={k}>
                        {it.time_start + ' - ' + it.time_end}{' '}
                        {it.app_name == '' ? '' : ' - ' + it.app_name}{' '}
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </DialogContent>
            <DialogActions
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Button
                style={{ backgroundColor: 'green', color: '#fff' }}
                onClick={this.saveDayHourse.bind(this)}
              >
                Сохранить
              </Button>
              <Button
                style={{ backgroundColor: 'red', color: '#fff' }}
                onClick={() => {
                  this.setState({ isOpenModalH: false });
                }}
              >
                Отмена
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {!this.state.userInfo || this.state.isOpenModalHMini === false ? null : (
          <Dialog
            open={this.state.isOpenModalHMini}
            onClose={() => {
              this.setState({ isOpenModalHMini: false });
            }}
            scroll="paper"
            fullWidth={true}
            maxWidth={'md'}
            id={'OpenModalH'}
          >
            <DialogTitle id="scroll-dialog-title">
              {this.state.userInfo.user.app_name +
                ' ' +
                this.state.userInfo.user.user_name +
                ' ' +
                this.state.userInfo.date}
            </DialogTitle>
            <DialogContent>
              
              {this.state.userInfo.hours.map((item, key) => (
                <Accordion key={key}>
                  <AccordionSummary>
                    <AccessTimeIcon style={{ marginRight: 10 }} />
                    <Typography>
                      {item.time_start + ' - ' + item.time_end}
                    </Typography>
                  </AccordionSummary>
                </Accordion>
              ))}

              {!this.state.userInfo.hist.length ? null : (
                <Accordion style={{ marginTop: 50 }} disabled>
                  <AccordionSummary>
                    <Typography>История</Typography>
                  </AccordionSummary>
                </Accordion>
              )}
              {this.state.userInfo.hist.map((item, key) => (
                <Accordion key={key}>
                  <AccordionSummary>
                    <Typography>
                      {item.date + ' - ' + item.user_name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    {item.items.map((it, k) => (
                      <Typography key={k}>
                        {it.time_start + ' - ' + it.time_end}{' '}
                        {it.app_name == '' ? '' : ' - ' + it.app_name}{' '}
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </DialogContent>
            <DialogActions
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Button
                style={{ backgroundColor: 'green', color: '#fff' }}
                onClick={() => {
                  this.setState({ isOpenModalHMini: false });
                }}
              >
                Закрыть
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {!this.state.userInfo || this.state.isOpenModalM === false ? null : (
          <Dialog
            open={this.state.isOpenModalM}
            onClose={() => {
              this.setState({ isOpenModalM: false });
            }}
            scroll="paper"
            fullWidth={true}
            maxWidth={'md'}
            id={'OpenModalM'}
          >
            <DialogTitle>
              {this.state.userInfo.user.app_name + ' ' + this.state.userInfo.user.user_name}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <List component="nav">
                    <ListItemButton
                      onClick={this.chooseType.bind(this, 0)}
                      style={{ backgroundColor: '#98e38d', color: '#fff' }}
                    >
                      <ListItemText primary="10:00 - 22:00" />
                      {this.state.typeTimeAdd === 0 ? <SendIcon /> : null}
                    </ListItemButton>

                    <ListItemButton
                      onClick={this.chooseType.bind(this, 1)}
                      style={{ backgroundColor: '#3dcef2', color: '#fff' }}
                    >
                      <ListItemText primary="10:00 - 16:00" />
                      {this.state.typeTimeAdd === 1 ? <SendIcon /> : null}
                    </ListItemButton>

                    <ListItemButton
                      onClick={this.chooseType.bind(this, 2)}
                      style={{ backgroundColor: '#1560bd', color: '#fff' }}
                    >
                      <ListItemText primary="16:00 - 22:00" />
                      {this.state.typeTimeAdd === 2 ? <SendIcon /> : null}
                    </ListItemButton>

                    <ListItemButton
                      style={{ backgroundColor: '#926eae', color: '#fff' }}
                    >
                      <ListItemText primary="Другое" />
                    </ListItemButton>
                  </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MyDatePickerGraph
                    year={this.state.mounth}
                    renderWeekPickerDay={this.renderWeekPickerDay}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Button
                style={{ backgroundColor: 'green', color: '#fff' }}
                onClick={this.saveUserM.bind(this)}
              >
                Сохранить
              </Button>
              <Button
                style={{ backgroundColor: 'red', color: '#fff' }}
                onClick={() => {
                  this.setState({ isOpenModalM: false });
                }}
              >
                Отмена
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {!this.state.showErr || this.state.isShowErr === false ? null : (
          <Dialog
            open={this.state.isShowErr}
            onClose={() => {
              this.setState({ isShowErr: false });
            }}
            scroll="paper"
            fullWidth={true}
            maxWidth={'md'}
            id={'OpenModalM'}
          >
            <DialogTitle>
              Ошибка по заказу №{this.state.showErr.order_id}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} className="cellErr">
                  <b>Ошибка заказа</b>
                  <span>{this.state.showErr.order_desc}</span>
                </Grid>
                <Grid item xs={12} sm={6} className="cellErr">
                  <b>Дата заказа</b>
                  <span>{this.state.showErr.date_time_order}</span>
                </Grid>

                <Grid item xs={12} sm={4} className="cellErr">
                  <b>Позиция</b>
                  <span>{this.state.showErr.item_name}</span>
                </Grid>
                <Grid item xs={12} sm={4} className="cellErr">
                  <b>Ошибка</b>
                  <span>{this.state.showErr.pr_name}</span>
                </Grid>
                <Grid item xs={12} sm={4} className="cellErr">
                  <b>Сумма</b>
                  <span>{this.state.showErr.my_price}</span>
                </Grid>

                <Grid item xs={12}>

                  {this.state.showErr.imgs.map( (item, key) =>
                    <a key={key} href={"https://jacochef.ru/src/img/err_orders/uploads/"+item} target='_blank'>
                      <img src={"https://jacochef.ru/src/img/err_orders/uploads/"+item} style={{ maxHeight: 150, maxWidth: 150, margin: 10 }} />
                    </a>
                  )}

                </Grid>

                <Grid item xs={12} sm={6}>
                  {this.state.showErr.new_text_1.length > 0 && parseInt(this.state.showErr.is_edit) == 0 ?
                    <div className="cellErr">
                      <b>Причина обжалования</b>
                      <span>{this.state.showErr.new_text_1}</span>
                    </div>
                      :
                    parseInt(this.state.showErr.is_edit) == 0 ? 
                      null 
                        :
                      <MyTextInput
                        label="Причина обжалования"
                        multiline={true}
                        disabled={ parseInt(this.state.showErr.is_edit) == 1 ? false : true }
                        maxRows={5}
                        value={this.state.showErr.new_text_1}
                        func={(event) => {
                          let userInfo = this.state.showErr;
                          userInfo.new_text_1 = event.target.value;
                          this.setState({ showErr: userInfo });
                        }}
                      />
                  }
                </Grid>
                <Grid item xs={12} sm={6}>
                  { this.state.showErr.new_text_2.length == 0 ? null :
                    <div className="cellErr">
                      <b>Ответ обжалования</b>
                      <span>{this.state.showErr.new_text_2}</span>
                    </div>
                  }
                </Grid>

                <Grid item xs={12} sm={6}>
                  { this.state.showErr.new_text_1.length > 0 && parseInt(this.state.showErr.is_edit) == 1 ?
                    <Button variant="contained" onClick={this.fakeOrders.bind(this)}>
                      Обжаловать
                    </Button>
                      :
                    null
                  }
                </Grid>

              </Grid>
            </DialogContent>
            
          </Dialog>
        )}

        {!this.state.showErrCam || this.state.isShowErrCam === false ? null : (
          <Dialog
            open={this.state.isShowErrCam}
            onClose={() => {
              this.setState({ isShowErrCam: false });
            }}
            scroll="paper"
            fullWidth={true}
            maxWidth={'md'}
            id={'OpenModalM'}
          >
            <DialogTitle>
              Ошибка №{this.state.showErrCam.id}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} className="cellErr">
                  <b>Ошибка</b>
                  <span>{this.state.showErrCam.fine_name}</span>
                </Grid>
                <Grid item xs={12} sm={6} className="cellErr">
                  <b>Дата время ошибки</b>
                  <span>{this.state.showErrCam.date_time_fine}</span>
                </Grid>

                <Grid item xs={12} className="cellErr">
                  <b>Комментарий</b>
                  <span>{this.state.showErrCam.comment}</span>
                </Grid>

                <Grid item xs={12}>

                  {this.state.showErrCam.imgs.map( (item, key) =>
                    <a key={key} href={"https://jacochef.ru/src/img/fine_err/uploads/"+item} target='_blank'>
                      <img src={"https://jacochef.ru/src/img/fine_err/uploads/"+item} style={{ maxHeight: 150, maxWidth: 150, margin: 10 }} />
                    </a>
                  )}

                </Grid>

                <Grid item xs={12} sm={6}>
                  {this.state.showErrCam.text_one.length > 0 && parseInt(this.state.showErrCam.is_edit) == 0 ?
                    <div className="cellErr">
                      <b>Причина обжалования</b>
                      <span>{this.state.showErrCam.text_one}</span>
                    </div>
                      :
                    parseInt(this.state.showErrCam.is_edit) == 0 ? 
                      null 
                        :
                      <MyTextInput
                        label="Причина обжалования"
                        multiline={true}
                        disabled={ parseInt(this.state.showErrCam.is_edit) == 1 ? false : true }
                        maxRows={5}
                        value={this.state.showErrCam.text_one}
                        func={(event) => {
                          let userInfo = this.state.showErrCam;
                          userInfo.text_one = event.target.value;
                          this.setState({ showErrCam: userInfo });
                        }}
                      />
                      
                  }
                </Grid>
                <Grid item xs={12} sm={6}>
                  { this.state.showErrCam.text_two.length == 0 ? null :
                    <div className="cellErr">
                      <b>Ответ обжалования</b>
                      <span>{this.state.showErrCam.text_two}</span>
                    </div>
                  }
                </Grid>

                <Grid item xs={12} sm={6}>
                  { this.state.showErrCam.text_one.length > 0 && parseInt(this.state.showErrCam.is_edit) == 1 ?
                    <Button variant="contained" onClick={this.fakeCam.bind(this)}>
                      Обжаловать
                    </Button>
                      :
                    null
                  }
                </Grid>

              </Grid>
            </DialogContent>
            
          </Dialog>
        )}

        <Dialog
          onClose={() => { this.setState({ newSmena: false, newSmenaName: '' }); }}
          open={this.state.newSmena}
        >
          <DialogTitle>Новая смена</DialogTitle>
          <DialogContent>

            <Grid container spacing={3} style={{ marginTop: 10 }}>
              <Grid item xs={12} sm={12}>
                <MyTextInput
                  label="Название смены"
                  value={this.state.newSmenaName}
                  func={(event) => this.setState({ newSmenaName: event.target.value }) }
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <List className='userSmenalist'>
                  { this.state.allUsers.map( (item, key) =>
                    <ListItemButton
                      key={item.id}
                      disableRipple={false}
                      selected={ parseInt(item.is_my) === 1 }
                      onClick={this.changeNewSmenaUsers.bind(this, item.id)}
                    >
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  ) }
                
                </List>
              </Grid>
            </Grid>

          </DialogContent>
          <DialogActions
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Button
              style={{ backgroundColor: 'green', color: '#fff' }}
              onClick={this.saveNewSmena.bind(this)}
            >
              Сохранить
            </Button>
            <Button
              style={{ backgroundColor: 'red', color: '#fff' }}
              onClick={() => {
                this.setState({ newSmena: false });
              }}
            >
              Отмена
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          onClose={() => { this.setState({ editSmena: false, newSmenaName: '' }); }}
          open={this.state.editSmena}
          fullWidth={true}
        >
          <DialogTitle>Редактирование смены</DialogTitle>
          <DialogContent>
            
            <Grid container spacing={3} >
              <Grid item xs={12} sm={12}>
                <span style={{ color: 'red', fontWeight: 'bold' }}>Все изменения применяются сразу</span>
              </Grid>

              <Grid item xs={12} sm={12}>
                <MyTextInput
                  label="Название смены"
                  value={this.state.newSmenaName}
                  func={(event) => this.setState({ newSmenaName: event.target.value }) }
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <List className='userSmenalist'>
                  { this.state.allUsers.map( (item, key) =>
                    <ListItemButton
                      key={item.id}
                      disableRipple={false}
                      selected={ parseInt(item.is_my) === 1 }
                      onClick={this.changeNewSmenaUsers.bind(this, item.id)}
                    >
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  ) }
                
                  <ListItemButton
                    disableRipple={false}
                    selected={ true }
                    onClick={this.deleteSmena.bind(this)}
                    className='SmenaDelete'
                  >
                    <ListItemText primary="Удалить смену" />
                  </ListItemButton>
                </List>
              </Grid>
            </Grid>

          </DialogContent>
          <DialogActions
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Button
              style={{ backgroundColor: 'green', color: '#fff' }}
              onClick={this.saveEditSmena.bind(this)}
            >
              Сохранить
            </Button>
            <Button
              style={{ backgroundColor: 'red', color: '#fff' }}
              onClick={() => {
                this.setState({ editSmena: false });
              }}
            >
              Отмена
            </Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={6}>
            <MySelect
              is_none={false}
              data={this.state.points}
              value={this.state.point}
              func={(event) => {
                this.setState({ point: event.target.value });
              }}
              label="Точка"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MySelect
              is_none={false}
              data={this.state.mounths}
              value={this.state.mounth}
              func={(event) => {
                this.setState({ mounth: event.target.value });
              }}
              label="Месяц"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={this.updateData.bind(this)}>
              Обновить данные
            </Button>
          </Grid>

          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={this.state.tabTable}
                onChange={(event, data) => {
                  localStorage.setItem('tabTable', data)
                  this.setState({ tabTable: data });
                }}
                centered
              >
                <Tab label="С 1 по 15 числа" {...a11yProps(0)} />
                <Tab label="С 16 по конец месяца" {...a11yProps(1)} />
              </Tabs>
            </Box>

            { this.state.kind == 'other' ? 
              <TabPanel value={this.state.tabTable} index={0}>
                {!this.state.one ? null : (
                  <WorkSchedule_Table_without_functions
                    number={this.state.one}
                    numberChoose={1}
                    test={this.state.test_one}
                    show_zp={this.state.show_zp_one}
                    kind={this.state.kind}
                    lv_dir={this.state.lv_dir}
                    lv_cafe={this.state.lv_cafe}
                    changeLVDir={this.changeLVDir.bind(this)}
                    changeDopBonus={this.changeDopBonus.bind(this)}
                    openM={this.openM.bind(this)}
                    openH={this.openHMini.bind(this)}
                    openZP={this.openZP.bind(this)}
                    mix={this.mix.bind(this)}
                    pricePerHour={this.pricePerHour.bind(this)}
                  />
                )}
              </TabPanel> 
                :
              <TabPanel value={this.state.tabTable} index={0}>
                {!this.state.one ? null : (
                  <WorkSchedule_Table
                    number={this.state.one}
                    numberChoose={1}
                    test={this.state.test_one}
                    show_zp={this.state.show_zp_one}
                    kind={this.state.kind}
                    lv_dir={this.state.lv_dir}
                    lv_cafe={this.state.lv_cafe}
                    changeLVDir={this.changeLVDir.bind(this)}
                    changeDopBonus={this.changeDopBonus.bind(this)}
                    openM={this.openM.bind(this)}
                    openH={this.openH.bind(this)}
                    openZP={this.openZP.bind(this)}
                    mix={this.mix.bind(this)}
                    pricePerHour={this.pricePerHour.bind(this)}
                    addSmena={this.addSmena.bind(this)}
                    editSmena={this.editSmena.bind(this)}
                  />
                )}
              </TabPanel>
            }
            
            { this.state.kind == 'other' ? 
              <TabPanel value={this.state.tabTable} index={1}>
                {!this.state.two ? null : (
                  <WorkSchedule_Table_without_functions
                    number={this.state.two}
                    numberChoose={2}
                    test={this.state.test_two}
                    show_zp={this.state.show_zp_two}
                    kind={this.state.kind}
                    lv_dir={this.state.lv_dir}
                    lv_cafe={this.state.lv_cafe}
                    changeLVDir={this.changeLVDir.bind(this)}
                    changeDopBonus={this.changeDopBonus.bind(this)}
                    openM={this.openM.bind(this)}
                    openH={this.openHMini.bind(this)}
                    openZP={this.openZP.bind(this)}
                    mix={this.mix.bind(this)}
                    pricePerHour={this.pricePerHour.bind(this)}
                  />
                )}
              </TabPanel>
                :
              <TabPanel value={this.state.tabTable} index={1}>
                {!this.state.two ? null : (
                  <WorkSchedule_Table
                    number={this.state.two}
                    numberChoose={2}
                    test={this.state.test_two}
                    show_zp={this.state.show_zp_two}
                    kind={this.state.kind}
                    lv_dir={this.state.lv_dir}
                    lv_cafe={this.state.lv_cafe}
                    changeLVDir={this.changeLVDir.bind(this)}
                    changeDopBonus={this.changeDopBonus.bind(this)}
                    openM={this.openM.bind(this)}
                    openH={this.openH.bind(this)}
                    openZP={this.openZP.bind(this)}
                    mix={this.mix.bind(this)}
                    pricePerHour={this.pricePerHour.bind(this)}
                    addSmena={this.addSmena.bind(this)}
                    editSmena={this.editSmena.bind(this)}
                  />
                )}
              </TabPanel>
            }
          </Box>

          <Grid item xs={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Номер заказа</TableCell>
                  <TableCell>Дата заказа</TableCell>
                  <TableCell>Ошибка</TableCell>
                  <TableCell>Довоз</TableCell>
                  <TableCell>Сумма ошибки</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              {parseInt(this.state.tabTable) == 0 ?
                <TableBody>
                  { this.state.errOrdersOneOrders.map( (item, key) =>
                    <TableRow key={key} onClick={this.showErrOrder.bind(this, item.id, item.row_id)}>
                      <TableCell>{item.order_id}</TableCell>
                      <TableCell>{item.date_time_order}</TableCell>
                      <TableCell>{item.err_name}</TableCell>
                      <TableCell>{ parseInt(item.new_order_id) == 0 ? null : <TimeToLeaveIcon /> }</TableCell>
                      <TableCell>{item.my_price}</TableCell>
                      <TableCell> {parseInt(item.new_status) == 1 && parseInt(item.is_edit) == 1 ? <InfoIcon /> : null } </TableCell>
                      
                    </TableRow>
                  ) }
                </TableBody>
                  :
                <TableBody>
                  { this.state.errOrdersTwoOrders.map( (item, key) =>
                    <TableRow key={key} onClick={this.showErrOrder.bind(this, item.id, item.row_id)}>
                      <TableCell>{item.order_id}</TableCell>
                      <TableCell>{item.date_time_order}</TableCell>
                      <TableCell>{item.err_name}</TableCell>
                      <TableCell>{ parseInt(item.new_order_id) == 0 ? null : <TimeToLeaveIcon /> }</TableCell>
                      <TableCell>{item.my_price}</TableCell>
                      <TableCell> {parseInt(item.new_status) == 1 && parseInt(item.is_edit) == 1 ? <InfoIcon /> : null } </TableCell>
                      
                    </TableRow>
                  ) }
                </TableBody>
              }
              <TableFooter>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter>
              
            </Table>
          </Grid>
          <Grid item xs={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Дата время совершения ошибки</TableCell>
                  <TableCell>Ошибка</TableCell>
                  <TableCell>Сумма ошибки</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              {parseInt(this.state.tabTable) == 0 ?
                <TableBody>
                  { this.state.errOrdersOneCam.map( (item, key) =>
                    <TableRow key={key} onClick={this.showErrCam.bind(this, item.id)}>
                      <TableCell>{key+1}</TableCell>
                      <TableCell>{item.date_time_fine}</TableCell>
                      <TableCell>{item.fine_name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell> {parseInt(item.is_edit) == 1 ? <InfoIcon /> : null } </TableCell>
                      
                    </TableRow>
                  ) }
                </TableBody>
                  :
                <TableBody>
                  { this.state.errOrdersTwoCam.map( (item, key) =>
                    <TableRow key={key} onClick={this.showErrCam.bind(this, item.id)}>
                      <TableCell>{key+1}</TableCell>
                      <TableCell>{item.date_time_fine}</TableCell>
                      <TableCell>{item.fine_name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell> {parseInt(item.is_edit) == 1 ? <InfoIcon /> : null } </TableCell>
                      
                    </TableRow>
                  ) }
                </TableBody>
              }
              <TableFooter>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter>
              
            </Table>
          </Grid>


        </Grid>
      </>
    );
  }
}

export function WorkSchedule() {
  return <WorkSchedule_ />;
}
