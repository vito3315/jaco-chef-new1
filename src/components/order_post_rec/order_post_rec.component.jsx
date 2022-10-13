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

import { MySelect, MyTextInput } from '../../stores/elements';

const queryString = require('query-string');

class OrderPostRec_Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    
      points: [],
      point: '0',

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
        point: this.props.points[0].id,
      });
    }
  }

  changePoint(event) {
    let data = event.target.value;

    this.setState({
      point: data
    });

  }

  save() {
    this.props.save(this.state.point);

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
        maxWidth={'md'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
        </DialogTitle>
 
        <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
        <Grid item xs={12} sm={4}>
            <MySelect
              data={this.state.points}
              value={this.state.point}
              func={this.changePoint.bind(this)}
              label="Точка"
            />
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button 
          onClick={this.save.bind(this, this.state.point)}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
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

      searchItem: '',

      cats: [
        {
            "id": "1",
            "name": "Продукты",
            "cats": [
                {
                    "id": "3",
                    "name": "Сыра и молочные продукты",
                    "items": [
                        {
                            "id": "96",
                            "name": "Сыр Пармезан",
                            "pf_name": "Сыр тертый пармезан",
                            "ei_name": "кг.",
                            "percent": [{id: '1', name: "200"}, { id: '2', name: "300"}],
                            "los_percent": "0.5",
                            "show_in_rev": "1",
                            "cat_id": "3",
                            "storage_name": "Холодильники",
                            "is_show": "1",
                            "handle_price": "780.071"
                        },
                        {
                            "id": "156",
                            "name": "Сыр сливочный Люкс",
                            "pf_name": "Сыр сливочный в Рукаве кондит.",
                            "ei_name": "кг",
                            "percent": "170",
                            "los_percent": "2.5",
                            "show_in_rev": "1",
                            "cat_id": "3",
                            "storage_name": "Холодильники",
                            "is_show": "1",
                            "handle_price": "365"
                        },
                        {
                            "id": "131",
                            "name": "Сыр Моцарелла",
                            "pf_name": "Сыр Моцарелла",
                            "ei_name": "кг.",
                            "percent": "150",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "3",
                            "storage_name": "Холодильники",
                            "is_show": "1",
                            "handle_price": "517.5"
                        },
                        {
                            "id": "167",
                            "name": "Сыр тостовый",
                            "pf_name": "Сыр тост. ЧИЗБУРГЕР...",
                            "ei_name": "шт",
                            "percent": "150",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "3",
                            "storage_name": "Холодильники",
                            "is_show": "1",
                            "handle_price": "11.89"
                        }
                    ]
                },
                {
                    "id": "4",
                    "name": "Морепродукты",
                    "items": [
                        {
                            "id": "117",
                            "name": "Лосось без головы",
                            "pf_name": "Лосось, Мясо (без шкуры)",
                            "ei_name": "кг.",
                            "percent": "200",
                            "los_percent": "32",
                            "show_in_rev": "1",
                            "cat_id": "4",
                            "storage_name": "Морозилки",
                            "is_show": "0",
                            "handle_price": "600"
                        },
                        {
                            "id": "160",
                            "name": "Угорь, мясо",
                            "pf_name": "Угорь, Мясо (без шкуры)",
                            "ei_name": "кг",
                            "percent": "40",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "4",
                            "storage_name": "Морозилки",
                            "is_show": "0",
                            "handle_price": "0"
                        },
                        {
                            "id": "197",
                            "name": "Стружка тунца",
                            "pf_name": "Стружка тунца",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "1",
                            "show_in_rev": "1",
                            "cat_id": "4",
                            "storage_name": "Кухня Роллы, Стеллаж Кухня ",
                            "is_show": "1",
                            "handle_price": "2000"
                        },
                        {
                            "id": "199",
                            "name": "Окунь Изумидай",
                            "pf_name": "Окунь Изумидай ",
                            "ei_name": "кг.",
                            "percent": "200",
                            "los_percent": "9",
                            "show_in_rev": "1",
                            "cat_id": "4",
                            "storage_name": "Кухня Роллы, Морозилки",
                            "is_show": "1",
                            "handle_price": "620"
                        },
                        {
                            "id": "204",
                            "name": "Тестовый товар",
                            "pf_name": "Бахилы полиэтиленовые",
                            "ei_name": "шт",
                            "percent": "70",
                            "los_percent": "15",
                            "show_in_rev": "1",
                            "cat_id": "4",
                            "storage_name": "Кухня Пицца, Стеллаж Кухня ",
                            "is_show": "0",
                            "handle_price": "517"
                        },
                        {
                            "id": "124",
                            "name": "Лосось, Стейки",
                            "pf_name": "Лосось, Мясо (без шкуры)",
                            "ei_name": "кг.",
                            "percent": "200",
                            "los_percent": "20",
                            "show_in_rev": "1",
                            "cat_id": "4",
                            "storage_name": "Морозилки",
                            "is_show": "1",
                            "handle_price": "1200"
                        },
                        {
                            "id": "165",
                            "name": "Лососевый замес",
                            "pf_name": "Лососевый замес",
                            "ei_name": "кг.",
                            "percent": "20",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "4",
                            "storage_name": "Морозилки",
                            "is_show": "1",
                            "handle_price": "800"
                        },
                        {
                            "id": "158",
                            "name": "Лосось, Мясо ",
                            "pf_name": "Лосось, Мясо (без шкуры)",
                            "ei_name": "кг",
                            "percent": "40",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "4",
                            "storage_name": "Морозилки",
                            "is_show": "1",
                            "handle_price": "0"
                        },
                        {
                            "id": "35",
                            "name": "Лосось, Trim-C",
                            "pf_name": "Лосось, Мясо (без шкуры)",
                            "ei_name": "кг.",
                            "percent": "200",
                            "los_percent": "26",
                            "show_in_rev": "1",
                            "cat_id": "4",
                            "storage_name": "Морозилки",
                            "is_show": "1",
                            "handle_price": "1730.02"
                        },
                        {
                            "id": "34",
                            "name": "Лосось, Trim-D",
                            "pf_name": "Лосось, Мясо (без шкуры)",
                            "ei_name": "кг.",
                            "percent": "200",
                            "los_percent": "20",
                            "show_in_rev": "1",
                            "cat_id": "4",
                            "storage_name": "Морозилки",
                            "is_show": "1",
                            "handle_price": "1730.02"
                        },
                        {
                            "id": "147",
                            "name": "Угорь, 30% соуса",
                            "pf_name": "Угорь, Мясо (без шкуры)",
                            "ei_name": "кг.",
                            "percent": "200",
                            "los_percent": "52",
                            "show_in_rev": "0",
                            "cat_id": "4",
                            "storage_name": "Морозилки",
                            "is_show": "1",
                            "handle_price": "2100"
                        },
                        {
                            "id": "103",
                            "name": "Угорь, 10% соуса",
                            "pf_name": "Угорь, Мясо (без шкуры)",
                            "ei_name": "кг.",
                            "percent": "200",
                            "los_percent": "48",
                            "show_in_rev": "1",
                            "cat_id": "4",
                            "storage_name": "Морозилки",
                            "is_show": "1",
                            "handle_price": "1648"
                        },
                        {
                            "id": "104",
                            "name": "Угорь, 2% соуса",
                            "pf_name": "Угорь, Мясо (без шкуры)",
                            "ei_name": "кг.",
                            "percent": "200",
                            "los_percent": "42",
                            "show_in_rev": "1",
                            "cat_id": "4",
                            "storage_name": "Морозилки",
                            "is_show": "1",
                            "handle_price": "1650"
                        },
                        {
                            "id": "25",
                            "name": "Креветки тигровые ",
                            "pf_name": "Креветки тигр. разм.",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "18.7",
                            "show_in_rev": "1",
                            "cat_id": "4",
                            "storage_name": "Морозилки",
                            "is_show": "1",
                            "handle_price": "980"
                        },
                        {
                            "id": "164",
                            "name": "Крабовые палочки",
                            "pf_name": "Крабовые палочки нарезанные",
                            "ei_name": "кг",
                            "percent": "100",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "4",
                            "storage_name": "Морозилки",
                            "is_show": "1",
                            "handle_price": "340"
                        },
                        {
                            "id": "18",
                            "name": "Икра масаго",
                            "pf_name": "Икра масаго красная",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "4",
                            "storage_name": "Морозилки",
                            "is_show": "1",
                            "handle_price": "1090"
                        },
                        {
                            "id": "50",
                            "name": "Нори премиум",
                            "pf_name": "Нори",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "4",
                            "storage_name": "Кухня Роллы",
                            "is_show": "1",
                            "handle_price": "4.8"
                        }
                    ]
                },
                {
                    "id": "5",
                    "name": "Мясные изделия",
                    "items": [
                        {
                            "id": "155",
                            "name": "Бекон 0,8 кг.",
                            "pf_name": "Бекон размороженный ",
                            "ei_name": "кг",
                            "percent": "150",
                            "los_percent": "1",
                            "show_in_rev": "1",
                            "cat_id": "5",
                            "storage_name": "Морозилки",
                            "is_show": "0",
                            "handle_price": "500"
                        },
                        {
                            "id": "133",
                            "name": "Ветчина Новый стиль",
                            "pf_name": "Ветчина нарезанная",
                            "ei_name": "кг.",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "5",
                            "storage_name": "Холодильники",
                            "is_show": "1",
                            "handle_price": "324.39"
                        },
                        {
                            "id": "137",
                            "name": "Куриное филе",
                            "pf_name": "Куриное филе разморожен.",
                            "ei_name": "кг.",
                            "percent": "200",
                            "los_percent": "10",
                            "show_in_rev": "1",
                            "cat_id": "5",
                            "storage_name": "Морозилки",
                            "is_show": "1",
                            "handle_price": "451"
                        },
                        {
                            "id": "143",
                            "name": "Пепперони",
                            "pf_name": "Пепперони",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "5",
                            "storage_name": "Морозилки",
                            "is_show": "1",
                            "handle_price": "548"
                        },
                        {
                            "id": "149",
                            "name": "Бекон 0,5 кг.",
                            "pf_name": "Бекон размороженный ",
                            "ei_name": "кг.",
                            "percent": "200",
                            "los_percent": "1",
                            "show_in_rev": "1",
                            "cat_id": "5",
                            "storage_name": "Морозилки",
                            "is_show": "1",
                            "handle_price": "574"
                        }
                    ]
                },
                {
                    "id": "7",
                    "name": "Соуса",
                    "items": [
                        {
                            "id": "184",
                            "name": "Соус бальзамик (Heinze)",
                            "pf_name": "Соус бальзамик",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "10",
                            "show_in_rev": "0",
                            "cat_id": "7",
                            "storage_name": "Холодильники",
                            "is_show": "0",
                            "handle_price": "306.25"
                        },
                        {
                            "id": "200",
                            "name": "Соус Барбекю",
                            "pf_name": "Соус барбекю",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "1",
                            "show_in_rev": "1",
                            "cat_id": "7",
                            "storage_name": "Кухня Пицца, Холодильники",
                            "is_show": "1",
                            "handle_price": "384.47"
                        },
                        {
                            "id": "122",
                            "name": "Соус унаги",
                            "pf_name": "Соус унаги",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "10",
                            "show_in_rev": "1",
                            "cat_id": "7",
                            "storage_name": "Холодильники",
                            "is_show": "1",
                            "handle_price": "235.33"
                        },
                        {
                            "id": "78",
                            "name": "Соус соевый порционный",
                            "pf_name": "Соус соевый 40 г",
                            "ei_name": "шт",
                            "percent": "600",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "7",
                            "storage_name": "Стеллажи складские",
                            "is_show": "1",
                            "handle_price": "7.99"
                        },
                        {
                            "id": "177",
                            "name": "Соус Бургер 1 кг.",
                            "pf_name": "Соус Бургер (МакcТейсти Heinze)",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "1",
                            "show_in_rev": "1",
                            "cat_id": "7",
                            "storage_name": "Холодильники",
                            "is_show": "1",
                            "handle_price": "291"
                        },
                        {
                            "id": "146",
                            "name": "Соус ранч, чесночный 1 кг.",
                            "pf_name": "Соус Ранч (Heinz)",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "1",
                            "show_in_rev": "0",
                            "cat_id": "7",
                            "storage_name": "Холодильники",
                            "is_show": "0",
                            "handle_price": "412"
                        },
                        {
                            "id": "130",
                            "name": "Томатный соус",
                            "pf_name": "Томатный соус",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "1",
                            "show_in_rev": "1",
                            "cat_id": "7",
                            "storage_name": "Стеллаж Кухня ",
                            "is_show": "1",
                            "handle_price": "182"
                        },
                        {
                            "id": "37",
                            "name": "Майонез, 56%",
                            "pf_name": "Майонез",
                            "ei_name": "кг.",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "7",
                            "storage_name": "Холодильники",
                            "is_show": "1",
                            "handle_price": "113.26"
                        }
                    ]
                },
                {
                    "id": "8",
                    "name": "Консервация",
                    "items": [
                        {
                            "id": "153",
                            "name": "Ананасы, резаные без фирмы",
                            "pf_name": "Ананасы, без сиропа",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "49",
                            "show_in_rev": "1",
                            "cat_id": "8",
                            "storage_name": "Стеллаж Кухня ",
                            "is_show": "0",
                            "handle_price": "217.24"
                        },
                        {
                            "id": "152",
                            "name": "Ананасы",
                            "pf_name": "Ананасы, без сиропа",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "40",
                            "show_in_rev": "1",
                            "cat_id": "8",
                            "storage_name": "Стеллаж Кухня ",
                            "is_show": "1",
                            "handle_price": "217.24"
                        },
                        {
                            "id": "138",
                            "name": "Халапеньо, резаный, общий вес",
                            "pf_name": "Халапеньо, без росола",
                            "ei_name": "кг",
                            "percent": "250",
                            "los_percent": "41",
                            "show_in_rev": "0",
                            "cat_id": "8",
                            "storage_name": "Стеллаж Кухня ",
                            "is_show": "0",
                            "handle_price": "215"
                        }
                    ]
                },
                {
                    "id": "9",
                    "name": "Закуски и выпечка",
                    "items": [
                        {
                            "id": "20",
                            "name": "Картофель фри 9х9",
                            "pf_name": "Картофель фри 9*9",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "9",
                            "storage_name": "Морозилки",
                            "is_show": "1",
                            "handle_price": "208"
                        },
                        {
                            "id": "157",
                            "name": "Краст 35см",
                            "pf_name": "Краст 35см",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "9",
                            "storage_name": "Кухня Пицца",
                            "is_show": "1",
                            "handle_price": "70"
                        }
                    ]
                },
                {
                    "id": "10",
                    "name": "Бакалея",
                    "items": [
                        {
                            "id": "1",
                            "name": "Васаби порц. 5 г.",
                            "pf_name": "Васаби 5г.",
                            "ei_name": "шт",
                            "percent": "300",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "10",
                            "storage_name": "Стеллажи складские",
                            "is_show": "1",
                            "handle_price": "2.1"
                        },
                        {
                            "id": "198",
                            "name": "Кунжут жареный черный",
                            "pf_name": "Кунжут жареный черный",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "10",
                            "storage_name": "Кухня Роллы",
                            "is_show": "1",
                            "handle_price": "360"
                        },
                        {
                            "id": "182",
                            "name": "Паста ",
                            "pf_name": "Паста (Макфа)",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "10",
                            "storage_name": "Стеллаж Кухня ",
                            "is_show": "1",
                            "handle_price": "160"
                        },
                        {
                            "id": "19",
                            "name": "Имбирь порц., 30 г.",
                            "pf_name": "Имбирь 30 г.",
                            "ei_name": "шт",
                            "percent": "300",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "10",
                            "storage_name": "Стеллажи складские",
                            "is_show": "1",
                            "handle_price": "9"
                        },
                        {
                            "id": "105",
                            "name": "Уксус рисовый",
                            "pf_name": "Уксус рисовый",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "10",
                            "storage_name": "Стеллаж, Стол, Кухонный работник",
                            "is_show": "1",
                            "handle_price": "60.89"
                        },
                        {
                            "id": "98",
                            "name": "Паста острарая Табаджан",
                            "pf_name": "Табаджан (острый соус)",
                            "ei_name": "кг.",
                            "percent": "400",
                            "los_percent": "2",
                            "show_in_rev": "0",
                            "cat_id": "10",
                            "storage_name": "Холодильники",
                            "is_show": "1",
                            "handle_price": "597.83"
                        },
                        {
                            "id": "129",
                            "name": "Чеснок гранулир.",
                            "pf_name": "Чеснок гранулир.",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "10",
                            "storage_name": "Кухня Роллы",
                            "is_show": "1",
                            "handle_price": "315"
                        },
                        {
                            "id": "132",
                            "name": "Орегано",
                            "pf_name": "Орегано",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "10",
                            "storage_name": "Стеллаж Кухня ",
                            "is_show": "1",
                            "handle_price": "295"
                        },
                        {
                            "id": "93",
                            "name": "Сухари панировочные",
                            "pf_name": "Сухари панировочные",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "10",
                            "storage_name": "Стеллажи складские",
                            "is_show": "1",
                            "handle_price": "175"
                        },
                        {
                            "id": "29",
                            "name": "Кунжут жареный белый",
                            "pf_name": "Кунжут жареный белый",
                            "ei_name": "кг.",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "10",
                            "storage_name": "Кухня Роллы",
                            "is_show": "1",
                            "handle_price": "320"
                        },
                        {
                            "id": "46",
                            "name": "Мука, 10 кг.",
                            "pf_name": "Мука Алейка",
                            "ei_name": "кг",
                            "percent": "160",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "10",
                            "storage_name": "Кухня Пицца",
                            "is_show": "1",
                            "handle_price": "35"
                        },
                        {
                            "id": "67",
                            "name": "Рис, круглый, Краснодарский",
                            "pf_name": "Рис",
                            "ei_name": "кг",
                            "percent": "160",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "10",
                            "storage_name": "Стеллаж, Стол, Кухонный работник",
                            "is_show": "1",
                            "handle_price": "80"
                        },
                        {
                            "id": "74",
                            "name": "Сахар",
                            "pf_name": "Сахар",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "10",
                            "storage_name": "Стеллаж, Стол, Кухонный работник",
                            "is_show": "1",
                            "handle_price": "61.3"
                        },
                        {
                            "id": "183",
                            "name": "Соль крупная",
                            "pf_name": "Соль крупная",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "10",
                            "storage_name": "Стеллаж Кухня ",
                            "is_show": "1",
                            "handle_price": "25"
                        },
                        {
                            "id": "85",
                            "name": "Соль мелкая",
                            "pf_name": "Соль мелкая",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "10",
                            "storage_name": null,
                            "is_show": "0",
                            "handle_price": "25"
                        },
                        {
                            "id": "73",
                            "name": "Сахар порц., 5 гр.",
                            "pf_name": "Сахар пакетированный (5гр)",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "10",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "0.96"
                        },
                        {
                            "id": "154",
                            "name": "Соль порц., 1 г.",
                            "pf_name": "Соль порционная 1 г",
                            "ei_name": "шт",
                            "percent": "150",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "10",
                            "storage_name": "Барная стойка",
                            "is_show": "1",
                            "handle_price": "0.2"
                        },
                        {
                            "id": "140",
                            "name": "Масло подсолнечное",
                            "pf_name": "Масло подсолнечное",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "10",
                            "storage_name": "Стеллаж Кухня ",
                            "is_show": "1",
                            "handle_price": "145"
                        },
                        {
                            "id": "39",
                            "name": "Масло Фритюрное ",
                            "pf_name": "Масло фритюрное",
                            "ei_name": "литр",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "10",
                            "storage_name": "Кухня Роллы",
                            "is_show": "1",
                            "handle_price": "130"
                        }
                    ]
                },
                {
                    "id": "11",
                    "name": "Овощи свежие",
                    "items": [
                        {
                            "id": "51",
                            "name": "Огурцы свежие",
                            "pf_name": "Огурцы нарезанные",
                            "ei_name": "кг.",
                            "percent": "100",
                            "los_percent": "35",
                            "show_in_rev": "1",
                            "cat_id": "11",
                            "storage_name": "Холодильники",
                            "is_show": "1",
                            "handle_price": "80"
                        },
                        {
                            "id": "135",
                            "name": "Перец сладкий красный и зелёный",
                            "pf_name": "Перец нарезанный",
                            "ei_name": "кг.",
                            "percent": "100",
                            "los_percent": "30",
                            "show_in_rev": "1",
                            "cat_id": "11",
                            "storage_name": "Холодильники",
                            "is_show": "1",
                            "handle_price": "250"
                        },
                        {
                            "id": "134",
                            "name": "Шампиньоны",
                            "pf_name": "Шампиньоны",
                            "ei_name": "кг.",
                            "percent": "100",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "11",
                            "storage_name": "Холодильники",
                            "is_show": "1",
                            "handle_price": "220"
                        },
                        {
                            "id": "162",
                            "name": "Томаты черри",
                            "pf_name": "Томаты черри нарезанные",
                            "ei_name": "кг.",
                            "percent": "100",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "11",
                            "storage_name": "Холодильники",
                            "is_show": "1",
                            "handle_price": "400"
                        },
                        {
                            "id": "163",
                            "name": "Салат Айсберг",
                            "pf_name": "Салат Айсберг нарезанный",
                            "ei_name": "кг.",
                            "percent": "100",
                            "los_percent": "10",
                            "show_in_rev": "1",
                            "cat_id": "11",
                            "storage_name": "Холодильники",
                            "is_show": "1",
                            "handle_price": "240"
                        }
                    ]
                },
                {
                    "id": "12",
                    "name": "Товары на продажу",
                    "items": [
                        {
                            "id": "8",
                            "name": "Aqua Minerale Не Газ 0,5л",
                            "pf_name": "Aqua Minerale Не газ.",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "12",
                            "storage_name": "Барная стойка, Холодильник Бар",
                            "is_show": "1",
                            "handle_price": "28.86"
                        },
                        {
                            "id": "201",
                            "name": "Evervess Блэк-рояль 0,5",
                            "pf_name": "Evervess Блэк-рояль 0,5",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "12",
                            "storage_name": "Барная стойка, Холодильник Бар",
                            "is_show": "1",
                            "handle_price": "53.04"
                        },
                        {
                            "id": "202",
                            "name": "Evervess Апельсин 0,5",
                            "pf_name": "Evervess Апельсин 0,5",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "12",
                            "storage_name": "Барная стойка, Холодильник Бар",
                            "is_show": "1",
                            "handle_price": "53.04"
                        },
                        {
                            "id": "203",
                            "name": "Evervess Лимон лайм 0,5",
                            "pf_name": "Evervess Лимон лайм 0,5",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "12",
                            "storage_name": "Барная стойка, Холодильник Бар",
                            "is_show": "1",
                            "handle_price": "53.04"
                        },
                        {
                            "id": "9",
                            "name": "Aqua Minerale Газ 0,5л",
                            "pf_name": "7Up 0.6 л",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "12",
                            "storage_name": "Барная стойка",
                            "is_show": "0",
                            "handle_price": "1"
                        },
                        {
                            "id": "144",
                            "name": "Соус барбекью дип-топ",
                            "pf_name": "Соус барбекью HEINZ",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "12",
                            "storage_name": "Холодильник Бар",
                            "is_show": "1",
                            "handle_price": "11.8"
                        },
                        {
                            "id": "145",
                            "name": "Соус чесночный дип-топ",
                            "pf_name": "Соус чесночный HEINZ",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "12",
                            "storage_name": null,
                            "is_show": "0",
                            "handle_price": "9.5"
                        },
                        {
                            "id": "6",
                            "name": "Соус сырный дип-топ",
                            "pf_name": "Соус сырный HEINZ",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "12",
                            "storage_name": "Холодильник Бар",
                            "is_show": "1",
                            "handle_price": "12.5"
                        },
                        {
                            "id": "81",
                            "name": "Сок Фруктовый сад Мультифрукт 0,2л",
                            "pf_name": "Сок Мультифрукт 0,2л",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "12",
                            "storage_name": "Барная стойка, Холодильник Бар",
                            "is_show": "1",
                            "handle_price": "26.14"
                        },
                        {
                            "id": "83",
                            "name": "Сок Фруктовый сад Яблочный 0,2л.",
                            "pf_name": "Сок Яблоко 0,2л",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "12",
                            "storage_name": "Барная стойка, Холодильник Бар",
                            "is_show": "1",
                            "handle_price": "26.14"
                        },
                        {
                            "id": "79",
                            "name": "Сок Фруктовый сад Апельсин 0,2л.",
                            "pf_name": "Сок Апельсин 0,2л",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "12",
                            "storage_name": "Барная стойка, Холодильник Бар",
                            "is_show": "1",
                            "handle_price": "26.14"
                        },
                        {
                            "id": "82",
                            "name": "Сок Фруктовый сад Мультифрукт 0,95л",
                            "pf_name": "Сок Мультифрукт 0,95л",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "12",
                            "storage_name": "Барная стойка, Холодильник Бар",
                            "is_show": "1",
                            "handle_price": "85.81"
                        },
                        {
                            "id": "84",
                            "name": "Сок Фруктовый сад Яблочный 0,95л",
                            "pf_name": "Сок Яблоко 0,95 л",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "12",
                            "storage_name": "Барная стойка, Холодильник Бар",
                            "is_show": "1",
                            "handle_price": "85.81"
                        },
                        {
                            "id": "80",
                            "name": "Сок Фруктовый сад Апельсин 0,95л",
                            "pf_name": "Сок Апельсин 0,95 л",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "12",
                            "storage_name": "Барная стойка, Холодильник Бар",
                            "is_show": "1",
                            "handle_price": "85.81"
                        },
                        {
                            "id": "97",
                            "name": "7Up 0,6л",
                            "pf_name": "7Up 0.6 л",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "12",
                            "storage_name": "Барная стойка",
                            "is_show": "0",
                            "handle_price": "53.04"
                        },
                        {
                            "id": "57",
                            "name": "Pepsi 0,6л",
                            "pf_name": "Pepsi 0.6л",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "12",
                            "storage_name": "Барная стойка",
                            "is_show": "0",
                            "handle_price": "53.04"
                        },
                        {
                            "id": "43",
                            "name": "Mirinda 0,6л",
                            "pf_name": "Mirinda 0.6л",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "12",
                            "storage_name": "Барная стойка",
                            "is_show": "0",
                            "handle_price": "53.04"
                        },
                        {
                            "id": "150",
                            "name": "Чизкейк классический",
                            "pf_name": "Чизкейк Нью-Йорк клас.",
                            "ei_name": "Кусоч",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "12",
                            "storage_name": "Морозилки",
                            "is_show": "1",
                            "handle_price": "62"
                        },
                        {
                            "id": "121",
                            "name": "Маффин шоколадный",
                            "pf_name": "Маффин шоколадный",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "12",
                            "storage_name": "Морозилки",
                            "is_show": "1",
                            "handle_price": "30"
                        }
                    ]
                },
                {
                    "id": "13",
                    "name": "Прочее",
                    "items": [
                        {
                            "id": "55",
                            "name": "Палочки бамбуковые",
                            "pf_name": "Палочки",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "13",
                            "storage_name": "Стол Упаковочный",
                            "is_show": "1",
                            "handle_price": "1.38"
                        },
                        {
                            "id": "112",
                            "name": "Макиса",
                            "pf_name": "Макиса",
                            "ei_name": "шт",
                            "percent": "100",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "13",
                            "storage_name": "Кухня Роллы",
                            "is_show": "1",
                            "handle_price": "105"
                        },
                        {
                            "id": "13",
                            "name": "Буклет рекламный",
                            "pf_name": "Буклет рекламный",
                            "ei_name": "шт",
                            "percent": "0",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "13",
                            "storage_name": "Стеллажи складские",
                            "is_show": "1",
                            "handle_price": "2"
                        },
                        {
                            "id": "168",
                            "name": "Размешиватель прямой,",
                            "pf_name": "Размешиватель прямой",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "13",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "1.4"
                        },
                        {
                            "id": "176",
                            "name": "Таблетки для кофемашины",
                            "pf_name": "Таблетки для кофемашины",
                            "ei_name": "шт",
                            "percent": "100",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "13",
                            "storage_name": "Барная стойка",
                            "is_show": "1",
                            "handle_price": "18"
                        },
                        {
                            "id": "178",
                            "name": "Порошок для декальцинации",
                            "pf_name": "Порошок для декальцинации",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "13",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "1500"
                        }
                    ]
                },
                {
                    "id": "21",
                    "name": "Составляющие для горячих напитков",
                    "items": [
                        {
                            "id": "186",
                            "name": "Сироп - соленая карамель",
                            "pf_name": "Сироп - соленая карамель",
                            "ei_name": "л",
                            "percent": "100",
                            "los_percent": "0.5",
                            "show_in_rev": "1",
                            "cat_id": "21",
                            "storage_name": "Барная стойка",
                            "is_show": "1",
                            "handle_price": "550"
                        },
                        {
                            "id": "188",
                            "name": "Помпа для сиропов",
                            "pf_name": "Помпа-дозатор для сиропов 5 мл.",
                            "ei_name": "шт",
                            "percent": "100",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "21",
                            "storage_name": "Барная стойка",
                            "is_show": "1",
                            "handle_price": "600"
                        },
                        {
                            "id": "161",
                            "name": "Молоко",
                            "pf_name": "Молоко",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "21",
                            "storage_name": "Холодильник Бар",
                            "is_show": "1",
                            "handle_price": "90"
                        },
                        {
                            "id": "2",
                            "name": "Кофе зерновой",
                            "pf_name": "Кофе, зерновой",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "21",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "1300"
                        },
                        {
                            "id": "45",
                            "name": "Молочный шоколад",
                            "pf_name": "7Up 0.6 л",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "21",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "0",
                            "handle_price": "760"
                        },
                        {
                            "id": "125",
                            "name": "Фильтрованная вода",
                            "pf_name": "Фильтрованная вода",
                            "ei_name": "л",
                            "percent": "10",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "21",
                            "storage_name": "Кухня Пицца",
                            "is_show": "1",
                            "handle_price": "0.5"
                        },
                        {
                            "id": "77",
                            "name": "Сливки растворимые премиум",
                            "pf_name": "7Up 0.6 л",
                            "ei_name": "кг",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "21",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "0",
                            "handle_price": "795"
                        },
                        {
                            "id": "170",
                            "name": "Чай брусника-каркаде ",
                            "pf_name": "Чай брусника-каркаде",
                            "ei_name": "шт",
                            "percent": "100",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "21",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "0",
                            "handle_price": "0"
                        },
                        {
                            "id": "169",
                            "name": "Чай облепиховый ",
                            "pf_name": "7Up 0.6 л",
                            "ei_name": "шт",
                            "percent": "100",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "21",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "0",
                            "handle_price": "0"
                        },
                        {
                            "id": "114",
                            "name": "Чай зелен., пакет.",
                            "pf_name": "Чай зеленый Тесс",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "21",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "3.84"
                        },
                        {
                            "id": "115",
                            "name": "Чай чёрный, пакет.",
                            "pf_name": "Чай черный Тесс",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "21",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "3.8"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2",
            "name": "Хозяйственные товары",
            "cats": [
                {
                    "id": "6",
                    "name": "Кухонные приспособления",
                    "items": [
                        {
                            "id": "63",
                            "name": "Пленка пищевая (Желтая) 45см",
                            "pf_name": "Пленка пищевая 45см",
                            "ei_name": "шт",
                            "percent": "170",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "6",
                            "storage_name": "Стеллаж Кухня ",
                            "is_show": "1",
                            "handle_price": "146.84"
                        },
                        {
                            "id": "109",
                            "name": "Фольга ",
                            "pf_name": "Фольга (30см*80 метров)",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "6",
                            "storage_name": "Стол Упаковочный",
                            "is_show": "1",
                            "handle_price": "248"
                        }
                    ]
                },
                {
                    "id": "14",
                    "name": "Приборы",
                    "items": [
                        {
                            "id": "14",
                            "name": "Вилка чёрная (Без упаковки)",
                            "pf_name": "Вилка черная, одноразовая",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "14",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "2.1"
                        },
                        {
                            "id": "151",
                            "name": "Нож черный",
                            "pf_name": "Нож одноразовый черный",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "14",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "0",
                            "handle_price": "2.14"
                        },
                        {
                            "id": "185",
                            "name": "Вилка чёрная в инд. уп.",
                            "pf_name": "Вилка черная, одноразовая",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "14",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "2.1"
                        }
                    ]
                },
                {
                    "id": "15",
                    "name": "Салфетки",
                    "items": [
                        {
                            "id": "127",
                            "name": "Салфетки",
                            "pf_name": "Салфетки",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "15",
                            "storage_name": "Стеллажи складские",
                            "is_show": "0",
                            "handle_price": "0.31"
                        },
                        {
                            "id": "5",
                            "name": "Полотенца V",
                            "pf_name": "Полотенца бумажные",
                            "ei_name": "пачка",
                            "percent": "150",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "15",
                            "storage_name": "Стеллаж Кухня ",
                            "is_show": "1",
                            "handle_price": "0.23"
                        },
                        {
                            "id": "166",
                            "name": "Салфетки красные бумажные, в инд. уп. 4 шт.",
                            "pf_name": "Салфетки в инд. уп.",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "15",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "3.8"
                        },
                        {
                            "id": "70",
                            "name": "Салфетки красные бумажные",
                            "pf_name": "Салфетки",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "15",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "0.31"
                        },
                        {
                            "id": "71",
                            "name": "Салфетки вискозные",
                            "pf_name": "Салфетки вискозные",
                            "ei_name": "пачка",
                            "percent": "150",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "15",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "9.98"
                        }
                    ]
                },
                {
                    "id": "16",
                    "name": "Одноразовые предметы одежды",
                    "items": [
                        {
                            "id": "171",
                            "name": "Маска медицинская ",
                            "pf_name": "Маска медицинская",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "16",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "1.54"
                        },
                        {
                            "id": "172",
                            "name": "Маска в рулоне",
                            "pf_name": "Маска в рулоне",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "16",
                            "storage_name": "Барная стойка",
                            "is_show": "1",
                            "handle_price": "63"
                        },
                        {
                            "id": "10",
                            "name": "Бахилы",
                            "pf_name": "Бахилы полиэтиленовые",
                            "ei_name": "шт",
                            "percent": "100",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "16",
                            "storage_name": "Стеллажи складские",
                            "is_show": "1",
                            "handle_price": "0.44"
                        },
                        {
                            "id": "110",
                            "name": "Халат одноразовый",
                            "pf_name": "Халат одноразовый",
                            "ei_name": "шт",
                            "percent": "100",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "16",
                            "storage_name": "Стеллажи складские",
                            "is_show": "1",
                            "handle_price": "59"
                        },
                        {
                            "id": "119",
                            "name": "Шапочка одноразовая",
                            "pf_name": "Шапочка одноразовая",
                            "ei_name": "шт",
                            "percent": "100",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "16",
                            "storage_name": "Стеллажи складские",
                            "is_show": "1",
                            "handle_price": "2.9"
                        },
                        {
                            "id": "58",
                            "name": "Перчатки эластомер L",
                            "pf_name": "Перчатки эластомер L",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "16",
                            "storage_name": "Стеллаж Кухня ",
                            "is_show": "1",
                            "handle_price": "0.95"
                        },
                        {
                            "id": "59",
                            "name": "Перчатки эластомер M",
                            "pf_name": "Перчатки эластомер M",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "16",
                            "storage_name": "Стеллаж Кухня ",
                            "is_show": "1",
                            "handle_price": "0.95"
                        },
                        {
                            "id": "123",
                            "name": "Перчатки эластомер XL",
                            "pf_name": "Перчатки эластомер XL",
                            "ei_name": "шт",
                            "percent": "150",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "16",
                            "storage_name": "Стеллаж Кухня ",
                            "is_show": "1",
                            "handle_price": "1.1"
                        },
                        {
                            "id": "60",
                            "name": "Перчатки эластомер S",
                            "pf_name": "Перчатки эластомер S",
                            "ei_name": "шт",
                            "percent": "150",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "16",
                            "storage_name": "Стеллаж Кухня ",
                            "is_show": "1",
                            "handle_price": "0.95"
                        },
                        {
                            "id": "62",
                            "name": "Перчатки резиновые",
                            "pf_name": "Перчатки резиновые",
                            "ei_name": "пачка",
                            "percent": "100",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "16",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "29.81"
                        },
                        {
                            "id": "61",
                            "name": "Перчатки полиэтиленовые",
                            "pf_name": "Перчатки полиэтиленовые",
                            "ei_name": "пачка",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "16",
                            "storage_name": "Стол Упаковочный",
                            "is_show": "1",
                            "handle_price": "0.19"
                        },
                        {
                            "id": "175",
                            "name": "Перчатки Ластомер",
                            "pf_name": "Перчатки Ластомер",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "16",
                            "storage_name": "Стеллаж Кухня ",
                            "is_show": "1",
                            "handle_price": "343"
                        }
                    ]
                },
                {
                    "id": "17",
                    "name": "Предметы бытовой химии",
                    "items": [
                        {
                            "id": "205",
                            "name": "Средство дезинфицирующие для рук",
                            "pf_name": "Средство дезинфицирующие для рук",
                            "ei_name": "литр",
                            "percent": "150",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "17",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "141.68"
                        },
                        {
                            "id": "47",
                            "name": "Мыло жидкое",
                            "pf_name": "Мыло жидкое",
                            "ei_name": "л",
                            "percent": "150",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "17",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "33.53"
                        },
                        {
                            "id": "52",
                            "name": "Освежитель воздуха",
                            "pf_name": "Освежитель воздуха",
                            "ei_name": "шт",
                            "percent": "150",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "17",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "56"
                        },
                        {
                            "id": "128",
                            "name": "Чистящее средство для фритюра",
                            "pf_name": "Для фритюр, Ника блеск, Санита",
                            "ei_name": "шт",
                            "percent": "150",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "17",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "70.73"
                        },
                        {
                            "id": "118",
                            "name": "Чистящее средство для унитаза",
                            "pf_name": "Для унитаза Ника Санит, Чистин",
                            "ei_name": "шт",
                            "percent": "150",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "17",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "78.93"
                        },
                        {
                            "id": "174",
                            "name": "Чистящее средство для стекол",
                            "pf_name": "Средство для стекол",
                            "ei_name": "шт",
                            "percent": "1",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "17",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "53.8"
                        },
                        {
                            "id": "159",
                            "name": "Ника-2",
                            "pf_name": "Ника-2",
                            "ei_name": "литр",
                            "percent": "150",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "17",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "104.63"
                        },
                        {
                            "id": "65",
                            "name": "Прогресс 1л",
                            "pf_name": "Прогресс",
                            "ei_name": "л",
                            "percent": "150",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "17",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "50"
                        }
                    ]
                },
                {
                    "id": "18",
                    "name": "Приспособления для уборки",
                    "items": [
                        {
                            "id": "100",
                            "name": "Тряпка для пола",
                            "pf_name": "Тряпка для пола",
                            "ei_name": "шт",
                            "percent": "150",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "18",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "30"
                        },
                        {
                            "id": "41",
                            "name": "Мешок для мусора 240л",
                            "pf_name": "Мешок мусора 240л",
                            "ei_name": "пачка",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "18",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "14.69"
                        },
                        {
                            "id": "42",
                            "name": "Мешок для мусора, 60л.",
                            "pf_name": "Мешок мусора 35л",
                            "ei_name": "пачка",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "18",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "1.2"
                        },
                        {
                            "id": "16",
                            "name": "Губки для посуды",
                            "pf_name": "Губки для посуды",
                            "ei_name": "пачка",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "18",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "3.48"
                        },
                        {
                            "id": "15",
                            "name": "Губка металлическая",
                            "pf_name": "Губка металлическая",
                            "ei_name": "пачка",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "18",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "27"
                        }
                    ]
                },
                {
                    "id": "19",
                    "name": "Другое",
                    "items": [
                        {
                            "id": "101",
                            "name": "Туалетная бумага для клиентов",
                            "pf_name": "Туалетная бумага, Джамбо, ширина 9,5.",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "19",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "43.12"
                        },
                        {
                            "id": "102",
                            "name": "Туалетная бумага для сотруд.",
                            "pf_name": "Туалетная бумага, Казаночка",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "19",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "11.15"
                        },
                        {
                            "id": "32",
                            "name": "Липкая лента от Мух",
                            "pf_name": "Ловушки для мух",
                            "ei_name": "шт",
                            "percent": "100",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "19",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "17.18"
                        },
                        {
                            "id": "21",
                            "name": "Клеевая ловушка от Тараканов",
                            "pf_name": "Ловушки для тараканов",
                            "ei_name": "шт",
                            "percent": "100",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "19",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "13.93"
                        }
                    ]
                },
                {
                    "id": "20",
                    "name": "Канцелярия",
                    "items": [
                        {
                            "id": "187",
                            "name": "Стикер Жако",
                            "pf_name": "Стикеры Жако",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "10",
                            "show_in_rev": "1",
                            "cat_id": "20",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "0.8"
                        },
                        {
                            "id": "191",
                            "name": "Магнитик",
                            "pf_name": "Магнитик",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "1",
                            "show_in_rev": "1",
                            "cat_id": "20",
                            "storage_name": "Барная стойка",
                            "is_show": "1",
                            "handle_price": "0"
                        },
                        {
                            "id": "192",
                            "name": "Открытка",
                            "pf_name": "Открытка",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "1",
                            "show_in_rev": "1",
                            "cat_id": "20",
                            "storage_name": "Барная стойка",
                            "is_show": "1",
                            "handle_price": "4.7"
                        },
                        {
                            "id": "195",
                            "name": "Стикер для салатника",
                            "pf_name": "Стикер для салатника",
                            "ei_name": "шт",
                            "percent": "100",
                            "los_percent": "1",
                            "show_in_rev": "1",
                            "cat_id": "20",
                            "storage_name": "Барная стойка",
                            "is_show": "1",
                            "handle_price": "3.98"
                        },
                        {
                            "id": "206",
                            "name": "Листовка",
                            "pf_name": "Листовка",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "20",
                            "storage_name": "Стол Упаковочный",
                            "is_show": "1",
                            "handle_price": "0.87"
                        },
                        {
                            "id": "31",
                            "name": "Чековая лента, ширина 80мм",
                            "pf_name": "Чековая лента _нал 80 мм",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "20",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "58.35"
                        },
                        {
                            "id": "120",
                            "name": "Этикет лента",
                            "pf_name": "Этикет лента, для Этикет пистолета",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "20",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "20.46"
                        },
                        {
                            "id": "17",
                            "name": "Зиплок",
                            "pf_name": "Зиплок 10*100",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "20",
                            "storage_name": "Барная стойка",
                            "is_show": "1",
                            "handle_price": "0.28"
                        },
                        {
                            "id": "38",
                            "name": "Маркер",
                            "pf_name": "Маркер Перманентный",
                            "ei_name": "шт",
                            "percent": "150",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "20",
                            "storage_name": "Стол Упаковочный",
                            "is_show": "1",
                            "handle_price": "19"
                        },
                        {
                            "id": "173",
                            "name": "Лифлет",
                            "pf_name": "Лифлет",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "20",
                            "storage_name": "Стол Упаковочный",
                            "is_show": "1",
                            "handle_price": "7.3"
                        },
                        {
                            "id": "76",
                            "name": "Скотч",
                            "pf_name": "Скотч",
                            "ei_name": "шт",
                            "percent": "100",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "20",
                            "storage_name": "Стол Упаковочный",
                            "is_show": "1",
                            "handle_price": "53.21"
                        },
                        {
                            "id": "68",
                            "name": "Ручка шариковая Синяя",
                            "pf_name": "Ручка шариковая",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "20",
                            "storage_name": "Стол Упаковочный",
                            "is_show": "1",
                            "handle_price": "5.53"
                        },
                        {
                            "id": "75",
                            "name": "Скобы для степлера",
                            "pf_name": "Скобы (24*6)",
                            "ei_name": "пачка",
                            "percent": "400",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "20",
                            "storage_name": "Стол Упаковочный",
                            "is_show": "1",
                            "handle_price": "13.01"
                        },
                        {
                            "id": "179",
                            "name": "Резинки канцелярские",
                            "pf_name": "Резинки канцелярские",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "20",
                            "storage_name": "Стеллаж для Бытовой химии",
                            "is_show": "1",
                            "handle_price": "42.06"
                        },
                        {
                            "id": "49",
                            "name": "Наклейки на Боксы",
                            "pf_name": "Наклейки на боксы",
                            "ei_name": "шт",
                            "percent": "10",
                            "los_percent": "0",
                            "show_in_rev": "0",
                            "cat_id": "20",
                            "storage_name": "Кухня Пицца",
                            "is_show": "1",
                            "handle_price": "0.3"
                        }
                    ]
                },
                {
                    "id": "22",
                    "name": "Одноразовая упаковка",
                    "items": [
                        {
                            "id": "11",
                            "name": "Бокс для роллов 1 секции Черный",
                            "pf_name": "Бокс для роллов 1 секция Черный",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "22",
                            "storage_name": "Стеллажи складские",
                            "is_show": "1",
                            "handle_price": "3.9"
                        },
                        {
                            "id": "12",
                            "name": "Бокс для роллов 2 секции Черный",
                            "pf_name": "Бокс для роллов 2 секции Черный",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "22",
                            "storage_name": "Стеллажи складские",
                            "is_show": "1",
                            "handle_price": "3.9"
                        },
                        {
                            "id": "26",
                            "name": "Крышка 250мл для горяч. напит.",
                            "pf_name": "Крышка на стакан 250мл",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "22",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "2.1"
                        },
                        {
                            "id": "27",
                            "name": "Крышка 350мл. для гор. напит",
                            "pf_name": "Крышка на стакан 350 мл",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "22",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "2.3"
                        },
                        {
                            "id": "54",
                            "name": "Пакет маечка, белый",
                            "pf_name": "Пакеты маечка",
                            "ei_name": "шт",
                            "percent": "400",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "22",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "1.99"
                        },
                        {
                            "id": "64",
                            "name": "Подложки",
                            "pf_name": "Подложки",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "22",
                            "storage_name": "Стеллажи складские",
                            "is_show": "1",
                            "handle_price": "1.85"
                        },
                        {
                            "id": "89",
                            "name": "Стакан 250мл. (бумажный, для горяч. напит)",
                            "pf_name": "Стакан 250мл",
                            "ei_name": "шт",
                            "percent": "300",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "22",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "4.1"
                        },
                        {
                            "id": "90",
                            "name": "Стакан 300мл Пепси",
                            "pf_name": "Стакан 300мл",
                            "ei_name": "шт",
                            "percent": "400",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "22",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "1.96"
                        },
                        {
                            "id": "91",
                            "name": "Стакан 350мл. (бумажный, для горяч. напит)",
                            "pf_name": "Стакан 350мл",
                            "ei_name": "шт",
                            "percent": "300",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "22",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "6.5"
                        },
                        {
                            "id": "126",
                            "name": "Соусничка 50 гр.",
                            "pf_name": "Соусничка 50 гр",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "22",
                            "storage_name": "Стеллажи складские",
                            "is_show": "1",
                            "handle_price": "1.78"
                        },
                        {
                            "id": "139",
                            "name": "Коробка для пиццы 35 см",
                            "pf_name": "Коробка для пиццы",
                            "ei_name": "шт",
                            "percent": "600",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "22",
                            "storage_name": "Стеллажи складские",
                            "is_show": "1",
                            "handle_price": "30.3"
                        },
                        {
                            "id": "148",
                            "name": "Пакет для пиццы",
                            "pf_name": "Пакет для пиццы",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "22",
                            "storage_name": "Стеллаж Бар",
                            "is_show": "1",
                            "handle_price": "2.65"
                        },
                        {
                            "id": "180",
                            "name": "Коробка под пасту 500 мл",
                            "pf_name": "Коробка под пасту",
                            "ei_name": "шт",
                            "percent": "200",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "22",
                            "storage_name": "Стеллажи складские",
                            "is_show": "1",
                            "handle_price": "16.77"
                        },
                        {
                            "id": "181",
                            "name": "Салатник 750 мл",
                            "pf_name": "Салатник",
                            "ei_name": "шт",
                            "percent": "300",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "22",
                            "storage_name": "Стеллажи складские",
                            "is_show": "1",
                            "handle_price": "21.25"
                        },
                        {
                            "id": "196",
                            "name": "Крышка прозрачная для салатника",
                            "pf_name": "Крышка прозрачная  для салатника",
                            "ei_name": "шт",
                            "percent": "0",
                            "los_percent": "0",
                            "show_in_rev": "1",
                            "cat_id": "22",
                            "storage_name": "Стеллажи складские, Стол Упаковочный",
                            "is_show": "1",
                            "handle_price": "8.65"
                        }
                    ]
                }
            ]
        }
      ],

      freeItems: [
        {
            "id": "7",
            "name": "Соус кисло-сладкий дип-топ",
            "pf_name": "Бахилы полиэтиленовые",
            "ei_name": "шт",
            "percent": "100",
            "los_percent": "0",
            "show_in_rev": "0",
            "cat_id": "0",
            "storage_name": "Холодильник Бар",
            "is_show": "0",
            "handle_price": "6.5"
        },
        {
            "id": "28",
            "name": "Крышка для Стакана 300мл. холод.",
            "pf_name": "Крышка для Стакана 300мл. холод.",
            "ei_name": "шт",
            "percent": "10",
            "los_percent": "0",
            "show_in_rev": "0",
            "cat_id": "0",
            "storage_name": "Стеллаж Бар",
            "is_show": "0",
            "handle_price": "1.74"
        },
        {
            "id": "30",
            "name": "Лента чековая, ширина 57мм, для б/н",
            "pf_name": "Чековая лента б/н",
            "ei_name": "шт",
            "percent": "400",
            "los_percent": "0",
            "show_in_rev": "0",
            "cat_id": "0",
            "storage_name": "Стеллаж Бар",
            "is_show": "0",
            "handle_price": "20"
        },
        {
            "id": "33",
            "name": "Ложка чайная",
            "pf_name": "Ложка чайная",
            "ei_name": "шт",
            "percent": "200",
            "los_percent": "0",
            "show_in_rev": "0",
            "cat_id": "0",
            "storage_name": "Стеллаж Бар",
            "is_show": "0",
            "handle_price": "0.38"
        },
        {
            "id": "40",
            "name": "Мешок для мусора 120л",
            "pf_name": "Мешок мусора 120л",
            "ei_name": "пачка",
            "percent": "200",
            "los_percent": "0",
            "show_in_rev": "0",
            "cat_id": "0",
            "storage_name": "Стеллаж для Бытовой химии",
            "is_show": "0",
            "handle_price": "110"
        },
        {
            "id": "53",
            "name": "Пакет для Закусок",
            "pf_name": "Пакеты маечка",
            "ei_name": "шт",
            "percent": "400",
            "los_percent": "0",
            "show_in_rev": "0",
            "cat_id": "0",
            "storage_name": "Кухня Роллы",
            "is_show": "1",
            "handle_price": "1"
        },
        {
            "id": "56",
            "name": "Пекинская капуста",
            "pf_name": "Пекинская капуста нарезанная",
            "ei_name": "кг.",
            "percent": "100",
            "los_percent": "13",
            "show_in_rev": "0",
            "cat_id": "0",
            "storage_name": "Холодильники",
            "is_show": "0",
            "handle_price": "80"
        },
        {
            "id": "88",
            "name": "Стакан 200мл (пластиковый, для холод.напит)",
            "pf_name": "Стакан 200мл",
            "ei_name": "шт",
            "percent": "10",
            "los_percent": "0",
            "show_in_rev": "0",
            "cat_id": "0",
            "storage_name": "Стеллаж Бар",
            "is_show": "0",
            "handle_price": "2"
        },
        {
            "id": "94",
            "name": "Сыр тост. ",
            "pf_name": "Сыр тост. ЧИЗБУРГЕР...",
            "ei_name": "шт",
            "percent": "150",
            "los_percent": "0",
            "show_in_rev": "0",
            "cat_id": "0",
            "storage_name": "Холодильники",
            "is_show": "0",
            "handle_price": "8"
        },
        {
            "id": "95",
            "name": "Сыр сливочный",
            "pf_name": "Сыр сливочный в Рукаве кондит.",
            "ei_name": "кг",
            "percent": "170",
            "los_percent": "2.5",
            "show_in_rev": "0",
            "cat_id": "0",
            "storage_name": "Холодильники",
            "is_show": "0",
            "handle_price": "395"
        },
        {
            "id": "99",
            "name": "Томаты свежие",
            "pf_name": "Томаты нарезанные",
            "ei_name": "кг.",
            "percent": "100",
            "los_percent": "35",
            "show_in_rev": "0",
            "cat_id": "0",
            "storage_name": "Холодильники",
            "is_show": "0",
            "handle_price": "120"
        },
        {
            "id": "108",
            "name": "ФК. Рулет куриный варено копченый.",
            "pf_name": "Куриное филе разморожен.",
            "ei_name": "кг",
            "percent": "10",
            "los_percent": "0",
            "show_in_rev": "0",
            "cat_id": "0",
            "storage_name": "Холодильники",
            "is_show": "0",
            "handle_price": "300"
        },
        {
            "id": "116",
            "name": "Чернила, для Этикет пистолета",
            "pf_name": "Чернила, для Этикет пистолета",
            "ei_name": null,
            "percent": "150",
            "los_percent": "0",
            "show_in_rev": "0",
            "cat_id": "0",
            "storage_name": "Барная стойка",
            "is_show": "0",
            "handle_price": "1"
        },
        {
            "id": "136",
            "name": "Маслины, резаные, вес общий",
            "pf_name": "7Up 0.6 л",
            "ei_name": "шт",
            "percent": "200",
            "los_percent": "51",
            "show_in_rev": "0",
            "cat_id": "0",
            "storage_name": "Стеллаж Кухня ",
            "is_show": "0",
            "handle_price": "170"
        },
        {
            "id": "141",
            "name": "Дрожжи, пакмая голд, ангел, инстантные",
            "pf_name": "Дрожжи",
            "ei_name": "кг",
            "percent": "200",
            "los_percent": "0",
            "show_in_rev": "0",
            "cat_id": "0",
            "storage_name": "Стеллаж Кухня ",
            "is_show": "0",
            "handle_price": "348.76"
        },
        {
            "id": "142",
            "name": "Кукурузная мука",
            "pf_name": "Кукурузная мука",
            "ei_name": "кг",
            "percent": "400",
            "los_percent": "0",
            "show_in_rev": "0",
            "cat_id": "0",
            "storage_name": "Стеллаж Кухня ",
            "is_show": "0",
            "handle_price": "80"
        },
        {
            "id": "189",
            "name": "Мороженное пломбир",
            "pf_name": "Мороженное пломбир",
            "ei_name": "шт",
            "percent": "0",
            "los_percent": "1",
            "show_in_rev": "0",
            "cat_id": "0",
            "storage_name": "Морозилки",
            "is_show": "0",
            "handle_price": "140.6"
        },
        {
            "id": "190",
            "name": "Сырные палочки",
            "pf_name": "Сырные палочки",
            "ei_name": "шт",
            "percent": "0",
            "los_percent": "1",
            "show_in_rev": "0",
            "cat_id": "0",
            "storage_name": "Морозилки",
            "is_show": "0",
            "handle_price": "449.02"
        }
      ],

      data: [
        {
          id_point: '1',
          name: 'Петров',
          date_creation: '2022-10-05',
          time_creation: '19:30',
        },
        {
          id_point: '1',
          name: 'Сидоров',
          date_creation: '2022-10-05',
          time_creation: '19:30',
        },
        {
          id_point: '2',
          name: 'Иванов',
          date_creation: '2022-10-05',
          time_creation: '19:30',
        },
        {
          id_point: '2',
          name: 'Сергеев',
          date_creation: '2022-10-05',
          time_creation: '19:30',
        },
      ],

      dataPoint: [],

      modalDialog: false,
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

    document.title = data.module_info.name;

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

    const dataFilter = this.state.data;

    const dataPoint = dataFilter.filter((el) => event.target.value === el.id_point);

    this.setState({
      point: data,
      dataPoint
    });

    // setTimeout( () => {
    //   this.updateData();
    // }, 50 )
  }

  async search() {
    let data = {
      item: this.state.searchItem,
    };

    console.log(data);

    // let res = await this.getData('get_all_search', data);

    // this.setState({
    //   cats: res.cats,
    //   freeItems: res.items_free,
    // });
  }

  openModal() {
    this.setState({
      modalDialog: true
      });
  }

  saveItem(point) {
    console.log(point);
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <OrderPostRec_Modal 
          open={this.state.modalDialog}
          onClose={() => {
            this.setState({ modalDialog: false });
          }}
          points={this.state.points}
          save={this.saveItem.bind(this)}
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

          <Grid item xs={12} sm={4}>
            <MyTextInput
              label="Поиск"
              value={this.state.searchItem}
              func={(event) => {
                this.setState({ searchItem: event.target.value });
              }}
              onBlur={this.search.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Button 
            disabled={this.state.point < 1 ? true : false}
            variant={this.state.point < 1 ? 'outlined' : 'contained'}
            onClick={this.openModal.bind(this)}
            >
              Сохранить изменения</Button>
          </Grid>

          {this.state.point < 1 ? null : (
          <Grid item xs={12} sm={8} mb={1}>
            {this.state.cats.map((item, key) => (
              <Accordion key={key}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{item.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {item.cats.map((category, key_cat) => (
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
                                <TableCell style={{ width: '2%' }}>#</TableCell>
                                <TableCell style={{ width: '30%' }}>Заготовка</TableCell>
                                <TableCell style={{ width: '25%' }}>Товар</TableCell>
                                <TableCell style={{ width: '13%' }}>Объем (упак.)</TableCell>
                                <TableCell style={{ width: '30%' }}>Поставщик</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {category.items.map((it, key) => (
                                <TableRow key={key} sx={{ '& td': { border: 0 } }}
                                  style={ key % 2 ? { background: 'white' } : { background: '#e7e7e7' } }
                                >
                                  <TableCell>{it.id}</TableCell>
                                  <TableCell>{it.pf_name}</TableCell>
                                  <TableCell>{it.name}</TableCell>
                                  <TableCell>
                                    {!Array.isArray(it.percent) ? it.percent : 
                                        <MySelect
                                        data={it.percent}
                                        value={it.percent[0].id}
                                        // func={this.changePoint.bind(this)}
                                      />
                                    }
                                    </TableCell>
                                  <TableCell>{it.storage_name}</TableCell>
                                </TableRow>
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
                  <AccordionDetails
                    style={{ width: '100%', overflow: 'scroll' }}
                  >
                    <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ width: '2%' }}>#</TableCell>
                          <TableCell style={{ width: '30%' }}>Заготовка</TableCell>
                          <TableCell style={{ width: '25%' }}>Товар</TableCell>
                          <TableCell style={{ width: '13%' }}>Объем (упак.)</TableCell>
                          <TableCell style={{ width: '30%' }}>Поставщик</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                      {this.state.freeItems.map((it, key) => (
                        <TableRow key={key} sx={{ '& td': { border: 0 } }} style={ key % 2 ? { background: 'white' } : { background: '#e7e7e7' } } >
                          <TableCell>{it.id}</TableCell>
                          <TableCell>{it.pf_name}</TableCell>
                          <TableCell>{it.name}</TableCell>
                          <TableCell>{it.percent}</TableCell>
                          <TableCell>{it.storage_name}</TableCell>
                         </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    </TableContainer>
                  </AccordionDetails>
                </AccordionDetails>
              </Accordion>
            )}
          </Grid>
          )}

          {this.state.point < 1 || !this.state.dataPoint.length ? null : (
          <Grid item xs={12} sm={4} mb={1}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography>История изменений</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {this.state.dataPoint.map((item, i) => (
                    <Accordion key={i}>
                      <AccordionSummary>
                        <Typography mr={8}>
                          {item.date_creation} {item.time_creation}
                        </Typography>
                        <Typography>
                          {item.name}
                        </Typography>
                      </AccordionSummary>
                    </Accordion>
                  ))}
              </AccordionDetails>
            </Accordion>
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
