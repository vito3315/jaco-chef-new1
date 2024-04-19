import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import ErrorIcon from '@mui/icons-material/Error';

import Dropzone from 'dropzone';

import { MySelect, MyAutocomplite, MyAutocomplite2, MyDatePickerNew, formatDate, MyTextInput, MyCheckBox, MyAlert} from '../../stores/elements';

import queryString from 'query-string';
//import ReactPanZoom from 'react-image-pan-zoom-rotate';
import dayjs from 'dayjs';

import { create } from 'zustand'
//import { typeOf } from 'mathjs';

import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import ContrastIcon from '@mui/icons-material/Contrast';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';

import Draggable from 'react-draggable';

const useStore = create((set, get) => ({
  isPink: false,
  setPink: () => set((state) => ({ isPink: !state.isPink })),

  vendor_items: [],
  search_item: '',
  vendor_itemsCopy: [],

  all_ed_izmer: [],

  pq: '',
  count: '',
  fact_unit: '',
  summ: '',
  sum_w_nds: '',

  allPrice: 0,
  allPrice_w_nds: 0,

  bill_items_doc: [],
  bill_items: [],

  operAlert: false,
  err_status: true,
  err_text: '',

  points: [],
  point: '',
  point_name: '',

  search_vendor: '',

  docs: [],
  doc: '',

  vendors: [],
  vendorsCopy: [],

  types: [],
  type: '',

  fullScreen: false,

  kinds: [],
  doc_base_id: '',

  number: '',
  number_factur: '',

  date: null,
  date_factur: null,
  date_items: null,

  is_load_store: false,
  module: 'billing',

  imgs_bill: [],
  modalDialog: false,
  image: '',
  imgs_factur: [],

  vendor_name: '',

  bill_list: [],
  bill: null,

  is_new_doc: 0,

  users: [],
  user: [],

  comment: '',

  getData: (method, data = {}) => {
    set({
      is_load_store: true,
    });

    return fetch('https://jacochef.ru/api/index_new.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify({
        method: method,
        module: get().module,
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
          set({
            is_load_store: false,
          });
        }, 300);

        return json;
      })
      .catch((err) => {
        console.log(err);
        set({
          is_load_store: false,
        });
      });
  },

  changeAutocomplite: (type, data) => {
    set({
      [type]: data,
    })
  },

  changeItemChecked: (event, data) => {
    const value = event.target.checked === true ? 1 : 0;

    set({
      [data]: value,
    });
  },

  getDataBill: (res, point, items, docs) => {

    set({
      is_load_store: true,
    });

    const bill_items = res.bill_items.map((item) => {

      item.all_ed_izmer = item.pq_item.map(it => {
        it = { name: `${it.name} ${item.ed_izmer_name}`, id: it.id };
        return it;
      });

      item.fact_unit = (Number(item.fact_unit)).toFixed(2);
      item.price_item = item.price;

      const nds = get().check_nds_bill((Number(item.price_w_nds) - Number(item.price_item)) / (Number(item.price_item) / 100));

      if (nds) {
        item.nds = nds;
        item.summ_nds = (Number(item.price_w_nds) - Number(item.price_item)).toFixed(2)
      } else {
        item.summ_nds = (0).toFixed(2);
        item.nds = '';
      }

      return item;
    });

    const allPrice = (bill_items.reduce((all, item) => all + Number(item.price), 0)).toFixed(2);
    const allPrice_w_nds = (bill_items.reduce((all, item) => all + Number(item.price_w_nds), 0)).toFixed(2);
   
    set({
      vendor_items: items,
      vendor_itemsCopy: items,
      docs: docs.billings,
      point: point ?? [],
      point_name: point?.name ?? '',
      vendors: res?.vendors ?? [],
      vendor_name: res?.vendors[0]?.name ?? '',
      bill_list: res?.bill_hist,
      imgs_bill: res?.bill_imgs,
      allPrice,
      allPrice_w_nds,
      bill: res?.bill,
      bill_items,
      number: res.bill?.number,
      date: res.bill?.date && res.bill?.date !== "0000-00-00" ? dayjs(res.bill?.date) : null,
      date_items: res.bill?.date_items ? dayjs(res.bill?.date_items) : null,
      comment: res.bill?.comment,
      users: res?.users,
      user: res?.bill_users,
      types: types,
      is_load_store: false,
    });

  },

  closeDialog: () => {
    document.body.style.overflow = "";
    set({ modalDialog: false })
  },

  openImageBill: (image) => {
    get().handleResize();

    set({ 
      modalDialog: true, 
      image
    })
  },

  handleResize: () => {
    if (window.innerWidth < 601) {
      set({
        fullScreen: true,
      });
    } else {
      set({
        fullScreen: false,
      });
    }
  },

  changeDateRange(event, data) {
    set({
      [data]: event,
    });
  },

  changeInput(event, type) {
    set({
      [type]: event.target.value,
    });
  },

  search_doc: async (event, name) => {

    const search = event.target.value ? event.target.value : name ? name : '';

    if(search) {
        
      const docs = get().docs;
      const vendor_id = get().vendors[0]?.id;
      const point = get().point;
      
      const billing_id = docs.find(doc => doc.name === search)?.id;
      
      const obj = {
        billing_id,
        vendor_id,
        point_id: point.id,
      }
      
      const res = await get().getData('get_base_doc_data', obj);
      
      set({
        bill_items: [],
        bill_items_doc: [],
        search_item: '',
        vendor_items: res.items,
        vendor_itemsCopy: res.items,
        users: res.users,
        all_ed_izmer: [],
        pq: '',
        count: '',
        fact_unit: '',
        summ: '',
        sum_w_nds: '',
        bill_items_doc: res.billing_items,
      });

    } else {

      const point = get().point;
      const vendors = get().vendors;
      const docs = get().docs;

      if(point && vendors.length === 1 && docs.length) {
        
        const data = {
          point_id: point.id,
          vendor_id: vendors[0]?.id
        }
        
        const res = await get().getData('get_vendor_items', data);
        
        set({
          bill_items: [],
          bill_items_doc: [],
          vendor_items: res.items,
          vendor_itemsCopy: res.items,
          users: res.users,
          search_item: '',
          all_ed_izmer: [],
          pq: '',
          count: '',
          fact_unit: '',
          summ: '',
          sum_w_nds: '',
        });
      }

    }

    set({
      doc: search,
    });
  },

  search_vendors: async (event, name) => {
    const search = event.target.value ? event.target.value : name ? name : '';

    const vendorsCopy = get().vendorsCopy;

    const vendors = vendorsCopy.filter((value) => search ? value.name.toLowerCase() === search.toLowerCase() : value);

    if (search && vendors.length) {

      const point = get().point;

      const data = {
        point_id: point.id,
        vendor_id: vendors[0].id
      }

      const res = await get().getData('get_vendor_items', data);
      const docs = await get().getData('get_base_doc', data);

      set({
        vendor_items: res.items,
        vendor_itemsCopy: res.items,
        users: res.users,
        docs: docs.billings,
      });

    } else {
    
      set({
        bill_items: [],
        bill_items_doc: [],
        search_item: '',
        vendor_items: [],
        vendor_itemsCopy: [],
        all_ed_izmer: [],
        pq: '',
        count: '',
        fact_unit: '',
        summ: '',
        sum_w_nds: '',
        docs: [],
        doc: '',
      });

    }

    set({
      search_vendor: search,
      vendors,
    });
  },

  search_point: async (event, name) => {
    const search = event.target.value ? event.target.value : name ? name : '';

    const points = get().points;
    const point = points.find(item => item.name === search);
    
    set({
      bill_items: [],
      bill_items_doc: [],
      point: point ?? '',
      point_name: point?.name ?? '',
      search_vendor: '',
      search_item: '',
      vendor_items: [],
      vendor_itemsCopy: [],
      all_ed_izmer: [],
      pq: '',
      count: '',
      fact_unit: '',
      summ: '',
      sum_w_nds: '',
      users: [],
      docs: [],
      doc: ''
    });

    if(point) {
  
        const obj = {
          point_id: point.id
        }
  
        const res = await get().getData('get_vendors', obj)
  
        set({
          vendors: res.vendors,
          vendorsCopy: res.vendors,
        })

      } else {

        set({
          vendors: [],
          vendorsCopy: [],
        })

      }
  },

  setData: (...props) => {

    set(
      ...props
    )
  },

  search_vendor_items: (event, name) => {

    const search = event.target.value ? event.target.value : name ? name : '';

    const vendor_itemsCopy = JSON.parse(JSON.stringify(get().vendor_itemsCopy))

    let vendor_items = [];

    if (vendor_itemsCopy.length) {

      vendor_items = vendor_itemsCopy.filter((value) => search ? value.name.toLowerCase() === search.toLowerCase() : value);

      vendor_items.map((item) => {
        item.pq_item = item.pq_item.map(it => {
          it = { name: `${it.name} ${item.ed_izmer_name}`, id: it.id };
          return it;
        });
        return item;
      });

      set({
        vendor_items,
        all_ed_izmer: vendor_items.length ? vendor_items[0].pq_item : [],
        pq: vendor_items.length ? vendor_items[0].pq_item[0].id : '',
        count: '',
        fact_unit: '',
        summ: '',
        sum_w_nds: '',
      });

    }

    set({
      search_item: search,
    });
  },

  changeCount: (event) => {
    const count = event.target.value;

    const fact_unit = Number(get().pq) * Number(count);

    set({
      count,
      fact_unit: fact_unit ? fact_unit : '',
    });
  },

  changeData: async (data, event) => {
    get().handleResize();

    const value = event.target.value;
    
    if(data === 'type' && (parseInt(value) === 1 || parseInt(value) === 2)) {

      const point = get().point;
      const vendors = get().vendors;

        if(point && vendors.length === 1) {

          const data = {
            point_id: point.id,
            vendor_id: vendors[0]?.id
          }
          
          const res = await get().getData('get_vendor_items', data);
          
          set({
            bill_items: [],
            bill_items_doc: [],
            vendor_items: res.items,
            vendor_itemsCopy: res.items,
            users: res.users,
            search_item: '',
            all_ed_izmer: [],
            pq: '',
            count: '',
            fact_unit: '',
            summ: '',
            sum_w_nds: '',
            doc: '',
          });
        }
    }

    if(data === 'type' && (parseInt(value) === 3 || parseInt(value) === 2)) {
      let kinds = [];

      if( parseInt(value) === 2 ){
        kinds = [
          {
            "name": "Накладная",
            "id": "1"
          },
          {
            "name": "УПД",
            "id": "2"
          },
        ];
      } else {
        kinds = [
          {
            "name": "Накладная",
            "id": "1"
          },
          {
            "name": "УКД",
            "id": "2"
          },
        ];
      }

      set({
        kinds,
      });
    }

    // if(data === 'type' && parseInt(value) === 2){
    //   setTimeout( () => {
    //     set({
    //       DropzoneDop: new Dropzone("#img_bill_type", this.dropzoneOptions)
    //     })
    //   }, 500 )
      
    // } else {
    //   set({
    //     DropzoneDop: null
    //   })
    // }

    set({
      [data]: event.target.value
    });
  },

  reducePrice: () => {
    const bill_items = get().bill_items;

    const allPrice = (bill_items.reduce((all, item) => all + Number(item.price_item), 0)).toFixed(2);
    const allPrice_w_nds = (bill_items.reduce((all, item) => all + Number(item.price_w_nds), 0)).toFixed(2);

    set({
      allPrice,
      allPrice_w_nds
    })
  },

  deleteItem: (key) => {
    const bill_items = get().bill_items;

    bill_items.splice(key, 1);

    set({
      bill_items,
    });

    get().reducePrice();
  },

  closeAlert: () => {
    set({ operAlert: false });
  },

  addItem: () => {
    const { count, fact_unit, summ, sum_w_nds, all_ed_izmer, pq, vendor_items } = get();

    let bill_items = JSON.parse(JSON.stringify(get().bill_items));

    if (!count || !fact_unit || !summ || !sum_w_nds || !pq || !all_ed_izmer.length) {

      set({
        operAlert: true,
        err_status: false,
        err_text: 'Необходимо выбрать Товар / кол-во Товара / указать суммы',
      });

      return;
    }

    const nds = get().check_nds_bill((Number(sum_w_nds) - Number(summ)) / (Number(summ) / 100))

    if (!nds) {

      set({
        operAlert: true,
        err_status: false,
        err_text: 'Суммы указаны неверно',
      });

      return;
    }

    const range_price_item = get().check_price_item(vendor_items[0].price, vendor_items[0].vend_percent, summ, pq)

    if(range_price_item) {
      vendor_items[0].color = false;
    } else {
      vendor_items[0].color = true;
    }

    vendor_items[0].summ_nds = (Number(sum_w_nds) - Number(summ)).toFixed(2);
    vendor_items[0].nds = nds;
    vendor_items[0].pq = pq;
    vendor_items[0].all_ed_izmer = all_ed_izmer;
    vendor_items[0].count = count;
    vendor_items[0].fact_unit = (Number(fact_unit)).toFixed(2);
    vendor_items[0].price_item = summ;
    vendor_items[0].price_w_nds = sum_w_nds;

    const bill_items_doc = get().bill_items_doc;

    if(bill_items_doc.length) {
      const item = bill_items_doc.find(it => it.item_id === vendor_items[0].id);

      item.fact_unit = (Number(item.count) * Number(item.pq)).toFixed(2);
      item.summ_nds = (Number(item.price_w_nds) - Number(item.price)).toFixed(2);

      const nds = get().check_nds_bill((Number(item.price_w_nds) - Number(item.price)) / (Number(item.price) / 100))

      if(nds) {
        item.nds = nds;
      } else {
        item.nds = '';
      }

      vendor_items[0].data_bill = item;
    }

    bill_items.push(vendor_items[0]);

    const allPrice = (bill_items.reduce((all, item) => all + Number(item.price_item), 0)).toFixed(2);
    const allPrice_w_nds = (bill_items.reduce((all, item) => all + Number(item.price_w_nds), 0)).toFixed(2);

    set({
      bill_items,
      allPrice,
      allPrice_w_nds,
      count: '',
      fact_unit: '',
      summ: '',
      sum_w_nds: '',
    });
  },

  check_nds_bill: (value) => {
    let nds = [];
    nds[0] = 'без НДС';
    nds[10] = '10 %';
    nds[20] = '20 %';
    nds[18] = '18 %';
 
    return nds[Number(value)] ? nds[Number(value)] : false;
  },

  check_price_item: (price, percent, summ, pq) => {

    const res = Number(price) / 100 * Number(percent);

    const price_item = Number(summ) / Number(pq);

    if(price_item >= (Number(price) - res) && price_item <= (Number(price) + res)) {
      return true
    } else {
      return false
    }
  },

  changeDataTable: (event, type, id, key) => {
    const value = event.target.value;

    let bill_items = JSON.parse(JSON.stringify(get().bill_items));

    bill_items = bill_items.map((item, index) => {
      if (item.id === id && key === index) {

        item[type] = value;

        if (type === 'pq') {
          item.fact_unit = (Number(item[type]) * Number(item.count)).toFixed(2);

          const range_price_item = get().check_price_item(item.price, item.vend_percent, item.price_item, item.pq)
  
          if(range_price_item) {
            item.color = false;
          } else {
            item.color = true;
          }

        } 

        if (value && value !== '0' && value[0] !== '0' && type === 'count') {

          item.fact_unit = (Number(item[type]) * Number(item.pq)).toFixed(2);
          const range_price_item = get().check_price_item(item.price, item.vend_percent, item.price_item, item.pq)

          if(range_price_item) {
            item.color = false;
          } else {
            item.color = true;
          }

        } else {

          if (type === 'count') {
            item.fact_unit = 0;
          }
    
          item.color = true;

        }


        if(type === 'price_item' || type === 'price_w_nds') {
          const nds = get().check_nds_bill((Number(item.price_w_nds) - Number(item.price_item)) / (Number(item.price_item) / 100))

          const range_price_item = get().check_price_item(item.price, item.vend_percent, item.price_item, item.pq)
  
          if (nds) {
            item.nds = nds;
            item.summ_nds = (Number(item.price_w_nds) - Number(item.price_item)).toFixed(2)
          } else {
            item.summ_nds = 0;
            item.nds = '';
          }

          if(nds && range_price_item) {
            item.color = false;
          } else {
            item.color = true;
          }
        } 

      }

      return item;
    });

    if (type === 'price_item') {
      const allPrice = (bill_items.reduce((all, item) => all + Number(item.price_item), 0)).toFixed(2);

      set({
        allPrice,
      });
    }

    if (type === 'price_w_nds') {
      const allPrice_w_nds = (bill_items.reduce((all, item) => all + Number(item.price_w_nds), 0)).toFixed(2);

      set({
        allPrice_w_nds,
      });
    }

    set({
      bill_items,
    });
  }

}));

const bill_status = [
  {
      "id": "0",
      "name": "Все",
      "sum_w_nds": "0",
      "count": "0",
      "clr": "rgba(0, 0, 0, 0.04)",
  },
  {
      "id": "5",
      "name": "Шаблон",
      "sum_w_nds": "0",
      "count": "0",
      "clr": "#dcdcdc",
  },
  {
      "id": "2",
      "name": "Заведенная",
      "sum_w_nds": "0",
      "count": "0",
      "clr": "#ffcc00",
  },
  {
      "id": "7",
      "name": "Отправленная бухгалтеру",
      "sum_w_nds": "0",
      "count": "0",
      "clr": "#f5770a",
  },
  {
      "id": "8",
      "name": "Отправленная в 1с",
      "sum_w_nds": "0",
      "count": "0",
      "clr": "#1faee9",
  },
  {
      "id": "9",
      "name": "Вернулась из 1с",
      "sum_w_nds": "0",
      "count": "0",
      "clr": "#baacc7",
  },
  {
      "id": "1",
      "name": "Оплаченная",
      "sum_w_nds": "0",
      "count": "0",
      "clr": "#008000",
  },
  {
      "id": "10",
      "name": "Для ген дира",
      "sum_w_nds": "0",
      "count": "0",
      "clr": "#942f3d",
  },
  {
      "id": "3",
      "name": "Удаленная",
      "sum_w_nds": "0",
      "count": "0",
      "clr": "#000000",
  }
]

const types = [
  {
    "name": "Счет",
    "id": "1"
  },
  {
    "name": "Поступление",
    "id": "2"
  },
  {
    "name": "Коррекция",
    "id": "3"
  },
  {
    "name": "Возврат",
    "id": "4"
  },
]

function getOrientation(file, callback) {
	var reader = new FileReader();
  
	reader.onload = function(event) {
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
			}else if ((marker & 0xFF00) != 0xFF00) break;
			else offset += view.getUint16(offset, false);
		}
		  
	  return callback(-1);
	};
  
	reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
};

function MyTooltip(props) {
  const { children, name, ...other } = props;

  return (
    <Tooltip title={name} arrow placement="bottom-start"  {...other}
      componentsProps={{
        tooltip: {
          sx: { bgcolor: '#fff', color: '#000', fontSize: 16, border: '0.5px solid rgba(0, 0, 0, 0.87)',
            '& .MuiTooltip-arrow': {
              color: '#fff',
              '&::before': {
                backgroundColor: 'white',
                border: '0.5px solid black',
              },
            },
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
}

// модалка просмотра фото/картинок документов на страницах Новая / Просмотр / Редактирование накладной
class Billing_Modal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
      vertical: false,
      horizontal: false,
    };
  }

  setLeftRotate() {
    let rotate = this.state.rotate;
    rotate = rotate - 90;
 
    this.setState({
      rotate,
    });

  }

  setRigthRotate() {
    let rotate = this.state.rotate;
    rotate = rotate + 90;

    this.setState({
      rotate,
    });

  }

  setScaleHorizontal() {
    let scaleX = this.state.scaleX;

    if(scaleX < 0) {
      scaleX = scaleX * -1;
    } else {
      scaleX = -scaleX;
    }

    this.setState({
      scaleX,
    });
  }

  setScaleVertical() {
    let scaleY = this.state.scaleY;

    if(scaleY < 0) {
      scaleY = scaleY * -1;
    } else {
      scaleY = -scaleY;
    }

    this.setState({
      scaleY,
    });
  }

  setZoomIn() {
    let scaleY = this.state.scaleY;
    let scaleX = this.state.scaleX;

    if(scaleY < 0) {
      scaleY = scaleY - 0.5;
    } else {
      scaleY = scaleY + 0.5;
    }

    if(scaleX < 0) {
      scaleX = scaleX - 0.5;
    }  else {
      scaleX = scaleX + 0.5;
    }

    this.setState({
      scaleY,
      scaleX,
    });

  }

  setZoomOut() {
    let scaleY = this.state.scaleY;
    let scaleX = this.state.scaleX;
      
    if(scaleY < 0) {
      scaleY = scaleY + 0.5;
    } else {
      scaleY = scaleY - 0.5;
    }
    
    if(scaleX < 0) {
      scaleX = scaleX + 0.5;
    }  else {
      scaleX = scaleX - 0.5;
    }

    this.setState({
      scaleY,
      scaleX,
    });
    
  }

  setSplitVertical() {
    this.reset();

    const vertical = this.state.vertical;

    this.setState({
      vertical: !vertical,
      horizontal: false,
    });

  }

  setSplitHorizontal() {
    this.reset();

    const horizontal = this.state.horizontal;

    this.setState({
      horizontal: !horizontal,
      vertical: false
    });

  }

  reset() {
    this.setState({
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
    });
  }

  shouldComponentUpdate(nextState) {
    return nextState.rotate !== this.state.rotate || nextState.scaleY !== this.state.scaleY || nextState.scaleX !== this.state.scaleX;
  }

  render() {
    return (
      <>
        <div className='modal_btn'>
          <MyTooltip name='Повернуть на 90 градусов влево'>
            <IconButton onClick={this.setLeftRotate.bind(this)}>
              <RotateLeftIcon />
            </IconButton>
          </MyTooltip>
          <MyTooltip name='Повернуть на 90 градусов вправо'>
            <IconButton onClick={this.setRigthRotate.bind(this)}>
              <RotateRightIcon />
            </IconButton>
          </MyTooltip>
          <MyTooltip name='Перевернуть по вертикали'>
            <IconButton onClick={this.setScaleVertical.bind(this)}>
              <ContrastIcon />
            </IconButton>
          </MyTooltip>
          <MyTooltip name='Перевернуть по горизонтали'>
            <IconButton onClick={this.setScaleHorizontal.bind(this)}>
              <ContrastIcon style={{ transform: 'rotate(-90deg)'}}/>
            </IconButton>
          </MyTooltip>
          <MyTooltip name='Увеличить документ'>
            <IconButton onClick={this.setZoomIn.bind(this)}>
              <ZoomInIcon />
            </IconButton>
          </MyTooltip>
          <MyTooltip name='Уменьшить документ'>
            <IconButton onClick={this.setZoomOut.bind(this)}>
              <ZoomOutIcon />
            </IconButton>
          </MyTooltip>
          <MyTooltip name='Разделить экран по вертикали'>
            <IconButton onClick={this.setSplitVertical.bind(this)}>
              <VerticalSplitIcon />
            </IconButton>
          </MyTooltip>
          <MyTooltip name='Разделить экран по горизонтали'>
            <IconButton onClick={this.setSplitHorizontal.bind(this)}>
              <HorizontalSplitIcon />
            </IconButton>
          </MyTooltip>
          <MyTooltip name='Сбросить'>
            <IconButton onClick={this.reset.bind(this)}>
              <RestartAltIcon />
            </IconButton>
          </MyTooltip>
          <MyTooltip name='Закрыть'>
            <IconButton onClick={this.props.onClose.bind(this)}>
              <CloseIcon />
            </IconButton>
          </MyTooltip>
        </div>

        <div className="modal" onClick={this.props.onClose.bind(this)} style={{ width: this.state.vertical ? '50%' : '100%', height: this.state.horizontal ? '50vh' : '100vh'}}>
          <Draggable>
            <div>
              <div className="modal_content" style={{transform: `rotate(${this.state.rotate}deg) scale(${this.state.scaleX}, ${this.state.scaleY})`}}>
                <img 
                  src={this.props.image} 
                  alt="Image bill" 
                  className="image_bill"
                  onClick={(e) => e.stopPropagation()}
                  draggable="false"
                />
              </div>
            </div>
          </Draggable>
        </div>

        {this.state.vertical || this.state.horizontal ?
          <div className="modal"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)',  width: this.state.vertical ? '50%' : '100%',  height: this.state.horizontal ? '50vh' : '100vh', left: this.state.vertical ? '50%' : 0, top: this.state.horizontal ? '50%' : 0}}>
            <div className="modal_content">
              <img  src={this.props.image} alt="Image bill" className="image_bill" draggable="false" />
            </div>
          </div> 
        : null}

      </>
    );
  }
}

// Аккродион с данными из накладной для страниц Новая / Просмотр / Редактирование накладной
class Billing_Accordion extends React.Component {
  shouldComponentUpdate(nextProps) {
    var array1 = nextProps.bill_list;
    var array2 = this.props.bill_list;

    var is_same = array1.length == array2.length && array1.every(function (element, index) { return element === array2[index] });

    return !is_same;
  }

  render() {
    const { bill_list, bill_items, type } = this.props;

    return (
      <Grid item xs={12} sm={12} mb={5}>
        
        <AccordionDetails>
          <AccordionSummary style={{ cursor: 'default' }} expandIcon={<ExpandMoreIcon sx={{ opacity: 0 }} />} aria-controls="panel1a-content">
            <Grid item xs display="flex" flexDirection="row">
              <Typography style={{ width: '1%' }}></Typography>
              <Typography style={{ width: '3%' }}></Typography>
              <Typography style={{ width: '3%' }}></Typography>
              <Typography style={{ width: '10%' }}>
                Номер {type === 'edit' ? ' документа' : ' накладной'}
              </Typography>
              <Typography style={{ width: '10%' }}>
                Дата в {type === 'edit' ? ' документе' : ' накладной'}
              </Typography>
              <Typography style={{ width: '14%', minWidth: '200px' }}>Создатель</Typography>
              <Typography style={{ width: '10%' }}>Дата обновления</Typography>
              <Typography style={{ width: '14%', minWidth: '200px' }}>Редактор</Typography>
              <Typography style={{ width: '10%' }}>Время обновления</Typography>
              <Typography style={{ width: '17%', minWidth: '250px' }}>
                Тип {type === 'edit' ? ' документа' : ' накладной'}
              </Typography>
              <Typography style={{ width: '8%' }}>Сумма с НДС</Typography>
            </Grid>
          </AccordionSummary>

          {bill_list.map((item, i) => (
            <Accordion key={i}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" className="accordion_summary" style={{ paddingRight: '1%' }}>

                <Grid item xs display="flex" flexDirection='row'>

                  <Typography component="div" style={{ width: '1%', backgroundColor: item.color, marginRight: '1%' }}></Typography>
                  
                    <MyTooltip name="Нету бумажного носителя">
                      <Typography component="div" style={{ width: '3%', display: 'flex', alignItems: 'center' }}>
                        <MyCheckBox
                          value={false}
                          //func={this.props.changeCheck.bind(this, key, 'is_not_del')}
                          label=""
                        />
                      </Typography>
                    </ MyTooltip>

                    <MyTooltip name="С бумажным носителем все хорошо">
                      <Typography component="div" style={{ width: '3%', display: 'flex', alignItems: 'center' }}>
                        <MyCheckBox
                          value={false}
                          //func={this.props.changeCheck.bind(this, key, 'is_not_del')}
                          label=""
                        />
                      </Typography>
                    </MyTooltip>

                  <Typography style={{ width: '10%',  display: 'flex', alignItems: 'center' }}>
                    {item.number}
                  </Typography>

                  <Typography style={{ width: '10%',  display: 'flex', alignItems: 'center' }}>
                    {item.date}
                  </Typography>

                  <Typography style={{ width: '14%', minWidth: '200px', display: 'flex', alignItems: 'center' }}>
                    {item.creator_id}
                  </Typography>

                  <Typography style={{ width: '10%',  display: 'flex', alignItems: 'center' }}>
                    {item.date_update}
                  </Typography>

                  <Typography style={{ width: '14%', minWidth: '200px', display: 'flex', alignItems: 'center'}}>
                    {item.editor_id}
                  </Typography>

                  <Typography style={{ width: '10%',  display: 'flex', alignItems: 'center' }}>
                    {item.time_update}
                  </Typography>

                  <Typography style={{ width: '17%', minWidth: '250px',  display: 'flex', alignItems: 'center' }}>
                    {item.name}
                  </Typography>

                  <Typography style={{ width: '8%',  display: 'flex', alignItems: 'center' }}>
                    {item.sum_w_nds}
                  </Typography>
                </Grid>
              </AccordionSummary>

              <AccordionDetails style={{ width: '100%' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                      <TableCell>Товар</TableCell>
                      <TableCell>Объем упак.</TableCell>
                      <TableCell>Кол-во упак.</TableCell>
                      <TableCell>Кол-во</TableCell>
                      <TableCell>Сумма с НДС</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {bill_items?.map((item, key) => (
                      <TableRow key={key} hover>
                        <TableCell> {item.item_name} </TableCell>
                        <TableCell>{item.pq} {item.ed_izmer_name}</TableCell>
                        <TableCell>{item.count}</TableCell>
                        <TableCell>{item.fact_unit} {item.ed_izmer_name}</TableCell>
                        <TableCell> {item.price_w_nds} ₽</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionDetails>
        
      </Grid>
    );
  }
}

// Главная страница
class Billing_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'billing',
      module_name: '',
      is_load: false,

      date_start: formatDate(new Date()),
      date_end: formatDate(new Date()),

      bill_list: [],
      status: '',

      types: [],
      type: '',

      vendors: [],
      vendorsCopy: [],
      search_vendor: '',

      points: [],
      point: [],

      number: '',

      all_items: [],
      items: [],

      billings: [],
      bills: [],

      operAlert: false,
      err_status: true,
      err_text: '',
    };
  }

  async componentDidMount() {
    const data = await this.getData('get_all');

    //console.log('data', data)

    this.setState({
      module_name: 'Накладные',
      vendors: data.vendors,
      vendorsCopy: data.vendors,
      points: data.points,
      all_items: data.items,
      bill_list: bill_status,
      billings: bill_status,
      status: bill_status[0].id,
      types: types,
    });

    document.title = 'Накладные';

    setTimeout(() => {
      this.getLocalStorage();
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
        console.log(err);
        this.setState({
          is_load: false,
        });
      });
  };

  changeDateRange(data, event) {
    this.setState({
      [data]: event ? event : null,
    });

    setTimeout(() => {
      this.setLocalStorage();
    }, 300);
  }

  changeSelect(data, event) {
    this.setState({
      [data]: event.target.value,
    });

    setTimeout(() => {
      this.setLocalStorage();
    }, 300);
  }

  changeAutocomplite(type, event, data) {
    this.setState({
      [type]: data,
    });

    setTimeout(() => {
      this.setLocalStorage();
    }, 300);
  }

  changeInput(event) {
    this.setState({
      number: event.target.value,
    });

    setTimeout(() => {
      this.setLocalStorage();
    }, 300);
  }

  setLocalStorage() {
   
    const {date_start, date_end, status, type, search_vendor, point, number, items} = this.state;

    const dateStart = date_start ? dayjs(date_start).format('YYYY-MM-DD') : null;
    const dateEnd = date_end ? dayjs(date_end).format('YYYY-MM-DD') : null;

    const data = {
      dateStart, 
      dateEnd, 
      status, 
      type, 
      search_vendor, 
      point, 
      number, 
      items
    }

    console.log('setLocalStorage', data)

    localStorage.setItem('main_page_bill', JSON.stringify(data));
  }

  getLocalStorage() {

    const res = JSON.parse(localStorage.getItem('main_page_bill'));

    if(res) {
      const {dateStart, dateEnd, status, type, search_vendor, point, number, items} = res;
  
      const date_start = dateStart ? dayjs(dateStart) : null;
      const date_end = dateEnd ? dayjs(dateEnd) : null;
  
      this.setState({
        date_start,
        date_end,
        status, 
        type,
        search_vendor, 
        point, 
        number, 
        items
      });
    }
  }

  getOneBill(item) {
    const type = this.state.type;

    const data = {
      type: parseInt(type) === 1 ? 'bill_ex' : 'bill',
      id: item?.id,
      point_id: item?.point_id,
    }

    localStorage.setItem('one_bill', JSON.stringify(data));
  }

  // поиск/выбор поставщика
  search(event, value) {

    const search = event.target.value ? event.target.value : value ? value : '';

    const vendorsCopy = this.state.vendorsCopy;

    const vendors = vendorsCopy.filter((value) => search ? value.name.toLowerCase() === search.toLowerCase() : value);

    this.setState({
      search_vendor: search,
      vendors,
    });
  
  }

  // получение накладных по указанным фильтрам
  async getBillingList () {

    const { type, point } = this.state;

    if(type && point.length) {

      const { status, number, items, vendors, date_end, date_start } = this.state;
      
      const dateStart = date_start ? dayjs(date_start).format('YYYY-MM-DD') : '';
      const dateEnd = date_end ? dayjs(date_end).format('YYYY-MM-DD') : '';
      const vendor_id = vendors.length === 1 ? vendors[0].id : '';

      const point_id = point.reduce((points, point) => {
        point = { id: point.id };
        points = [...points,...[point]];
        return points
      }, [])

      const items_id = items.reduce((items, it) => {
        it = { id: it.id };
        items = [...items,...[it]];
        return items
      }, [])

      const data = {
        date_start: dateStart,
        date_end: dateEnd,
        items: items_id,
        vendor_id,
        point_id,
        number,
        status,
        type,
      }
  
      console.log('getBillingList', data)

      const res = await this.getData('get_billing_list', data);

      console.log('getBillingList', res);

      let billings = this.state.billings;

      billings = billings.map(status => {

        if(res.svod[status.id]) {
          status.count = res.svod[status.id].count
        } else {
          status.count = 0
        }

        return status
      })

      const bills = res.res.map(bill => {
        bill_status.map(item => {
          if(item.id === bill.status && bill.status !== '0') {
            bill.color = item.clr
          }
        })
        
        return bill
      })

      this.setState({
        bills,
        billings,
      });

    } else {

      this.setState({
        operAlert: true,
        err_status: false,
        err_text: 'Необходимо выбрать Тип / Точку',
      });

    }
    
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <MyAlert
          isOpen={this.state.operAlert}
          onClose={() => this.setState({ operAlert: false })}
          status={this.state.err_status}
          text={this.state.err_text}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button variant="contained">
              <Link style={{ color: '#fff' }} to="/billing/new">
                Новая накладная
              </Link>
            </Button>
          </Grid> 

          <Grid item xs={12} sm={4}>
            <MyDatePickerNew
              label="Дата от"
              value={this.state.date_start}
              func={this.changeDateRange.bind(this, 'date_start')}
              clearable={true}
              customActions={true}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MyDatePickerNew
              label="Дата до"
              value={this.state.date_end}
              func={this.changeDateRange.bind(this, 'date_end')}
              clearable={true}
              customActions={true}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MySelect
              data={this.state.types}
              value={this.state.type}
              multiple={false}
              is_none={false}
              func={this.changeSelect.bind(this, 'type')}
              label="Тип"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MyAutocomplite2
              label="Поставщик"
              freeSolo={true}
              multiple={false}
              data={this.state.vendors}
              value={this.state.search_vendor}
              func={this.search.bind(this)}
              onBlur={this.search.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MySelect
              data={this.state.bill_list}
              value={this.state.status}
              multiple={false}
              is_none={false}
              func={this.changeSelect.bind(this, 'status')}
              label="Статус"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MyTextInput
              label="Номер накладной"
              value={this.state.number}
              func={this.changeInput.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MyAutocomplite
              data={this.state.points}
              multiple={true}
              value={this.state.point}
              func={this.changeAutocomplite.bind(this, 'point')}
              label="Точка"
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <MyAutocomplite
              data={this.state.all_items}
              multiple={true}
              value={this.state.items}
              func={this.changeAutocomplite.bind(this, 'items')}
              label="Товары"
            />
          </Grid>

          <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { sm: 'row', xs: 'column' } }}>
            <Button variant="contained" sx={{ marginBottom: { sm: 0, xs: 1 } }}
              //onClick={this.getItems.bind(this)}
            >
              Проставить бумажный носитель
            </Button>

            <Button variant="contained" onClick={this.getBillingList.bind(this)}>
              Показать
            </Button>
          </Grid>

          <Grid item xs={12} style={{ marginBottom: 20 }} sm={6}>
            <TableContainer component={Paper}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                    <TableCell style={{ minWidth: '180px' }}>Тип</TableCell>
                    <TableCell>Количество</TableCell>
                    <TableCell style={{ minWidth: '150px' }}>Сумма с НДС</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.billings.map((item, key) => (
                    <TableRow key={key}>
                      <TableCell style={{ backgroundColor: item.clr, color: key !== 0 ? '#fff' : 'rgba(0, 0, 0, 0.8)' }}>{item.name}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>{item.sum_w_nds}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} style={{ marginBottom: 40 }} sm={12}>
            <TableContainer component={Paper}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                    <TableCell>#</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Бумажный носитель</TableCell>
                    <TableCell>Тип</TableCell>
                    <TableCell>Номер</TableCell>
                    <TableCell style={{ minWidth: '180px' }}>Дата накладной</TableCell>
                    <TableCell style={{ minWidth: '180px' }}>Поставщик</TableCell>
                    <TableCell style={{ minWidth: '180px' }}>Сумма с НДС</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.bills.map((item, key) => (
                    <TableRow key={key}>
                      <TableCell style={{ backgroundColor: item?.color ?? '#fff', color: item?.color ? '#fff' : 'rgba(0, 0, 0, 0.87)'}}>{key + 1}</TableCell>
                      <TableCell>
                        {parseInt(item.check_day) === 1 || parseInt(item.check_price) === 1 ? 
                          <MyTooltip name={item.err_items ? item.err_items : item.err_date}>
                            <Typography component="div" className="ceil_svg">
                              <ErrorIcon />
                            </Typography>
                          </MyTooltip>
                        : null}
                      </TableCell>
                      <TableCell>
                        <MyTooltip name="Есть в наличии">
                          <Typography component="div" className="ceil_tooltip">
                            <MyCheckBox
                              value={false}
                              //func={this.props.changeCheck.bind(this, key, 'is_not_del')}
                              label=""
                            />
                          </Typography>
                        </ MyTooltip>
                      </TableCell>
                      <TableCell>Прих</TableCell>
                      <TableCell style={{ cursor: 'pointer' }}>
                        <Link to="/billing/view" onClick={this.getOneBill.bind(this, item)} target="_blank">
                          {item.number}
                        </Link>
                      </TableCell>
                      <TableCell 
                        style={{ backgroundColor: parseInt(item.check_day) === 1 ? 'rgb(204, 0, 51)' : '#fff', cursor: 'pointer', color: parseInt(item.check_day) === 1 ? '#fff' : 'rgba(0, 0, 0, 0.87)' }}
                      >
                        <Link 
                          onClick={this.getOneBill.bind(this, item)}
                          to={`/billing/${parseInt(this.state.type) === 1 ? 'bill_ex' : 'bill'}/${item?.id}/${item?.point_id}`} target="_blank">
                          {item.date}
                        </Link>
                      </TableCell>
                      <TableCell>{item.vendor_name}</TableCell>
                      <TableCell 
                        style={{ backgroundColor: parseInt(item.check_price) === 1 ? 'rgb(204, 0, 51)' : '#fff', color: parseInt(item.check_price) === 1 ? '#fff' : 'rgba(0, 0, 0, 0.87)'}}
                      >
                        {item.sum_w_nds} ₽
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </>
    );
  }
}

function VendorItemsTableView(){
  const [bill_items] = useStore(state => [state.bill_items]);

  return (
    <>
     <Grid item xs={12} sm={12}>
        <h2>Товары в накладной</h2>
        <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)' }} />
     </Grid>

     <Grid item xs={12} style={{ marginBottom: 20 }} sm={12}>
      <TableContainer component={Paper}>
        <Table aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
              <TableCell style={{ minWidth: '150px' }}>Товар</TableCell>
              <TableCell style={{ minWidth: '130px' }}>В упак.</TableCell>
              <TableCell>Упак</TableCell>
              <TableCell style={{ minWidth: '130px' }}>Кол-во</TableCell>
              <TableCell>НДС</TableCell>
              <TableCell style={{ minWidth: '180px' }}>Сумма без НДС</TableCell>
              <TableCell style={{ minWidth: '180px' }}>Сумма НДС</TableCell>
              <TableCell style={{ minWidth: '150px' }}>Сумма с НДС</TableCell>
              <TableCell style={{ minWidth: '150px' }}>За 1 ед с НДС</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bill_items.map((item, key) => (
              <TableRow key={key} hover>
                <TableCell>{item.item_name}</TableCell>
                <TableCell>{item.pq} {item.ed_izmer_name}</TableCell>
                <TableCell>{item.count}</TableCell>
                <TableCell>{item.fact_unit} {item.ed_izmer_name}</TableCell>
                <TableCell>{item.nds}%</TableCell>
                <TableCell>{item.price} ₽</TableCell>
                <TableCell>{Number(item.price_w_nds) - Number(item.price)} ₽</TableCell>
                <TableCell>{item.price_w_nds} ₽</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     </Grid>
    </>
  )
}

// Страница просмотра одной Накладной
class Billing_View_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: 'billing',
      module_name: '',
      is_load: false,
      
      point: null,
      vendor: null,
      bill: null,
      imgs: [],
      bill_items: [],
      bill_list: [],
      users: [],

      modalDialog: false,
      fullScreen: false,
      image: ''
    };
  }

  async componentDidMount() {
    
    let data_bill = window.location.pathname;

    data_bill = data_bill.split('/');

    const bill = {
      id: data_bill[3],
      point_id: data_bill[4],
      type: data_bill[2],
    }

    const data = await this.getData('get_one', bill);

    const { setData } = this.props.store;

    setData({
      bill_items: data.bill_items,
    })

    const points = await this.getData('get_points');

    const point = points.points.find(point => point.id === data.bill.point_id);

    this.setState({
      bill: data.bill,
      point: point,
      vendor: data.vendors[0],
      imgs: data.bill_imgs,
      bill_items: data.bill_items,
      bill_list: data.bill_hist,
      users: data.bill_users,
    });

    document.title = 'Накладные';
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
        this.setState({
          is_load: false,
        });
      });
  };

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

  openImageBill (image) {
    
    this.handleResize();

    document.body.style.overflow = "hidden";

    this.setState({ 
      modalDialog: true, 
      image
    })
    
  }

  render() {
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>

        {!this.state.modalDialog ? null :
          <Billing_Modal
            onClose={() => {
              document.body.style.overflow = "";
              this.setState({ modalDialog: false })
            }}
            fullScreen={this.state.fullScreen}
            image={this.state.image}
          />
        }

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>Просмотр накладной: {this.state.bill?.number}</h1>
            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)' }} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid style={{ display: 'flex' }}>
              <Typography style={{ fontWeight: 'bold' }}>Точка:&nbsp;</Typography>
              <Typography>{this.state.point?.name}</Typography>
            </Grid>
            <Grid style={{ display: 'flex' }}>
              <Typography style={{ fontWeight: 'bold' }}>Поставщик:&nbsp;</Typography>
              <Typography>{this.state.vendor?.name}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Grid style={{ display: 'flex' }}>
              <Typography style={{ fontWeight: 'bold' }}>Номер накладой:&nbsp;</Typography>
              <Typography>{this.state.bill?.number}</Typography>
            </Grid>
            <Grid style={{ display: 'flex' }}>
              <Typography style={{ fontWeight: 'bold' }}>Тип накладой:&nbsp;</Typography>
              <Typography>{this.state.bill?.type_bill === '1' ? 'Приходная' : 'Возвратная'}</Typography>
            </Grid>
            <Grid style={{ display: 'flex' }}>
              <Typography style={{ fontWeight: 'bold' }}>Форма оплаты:&nbsp;</Typography>
              <Typography>{this.state.bill?.type_pay === '1' ? 'Безналичная' : 'Наличная'}</Typography>
            </Grid>
            <Grid style={{ display: 'flex' }}>
              <Typography style={{ fontWeight: 'bold' }}>Дата накладой:&nbsp;</Typography>
              <Typography>{this.state.bill?.date}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} display="flex" flexDirection="row" style={{ fontWeight: 'bold' }}>
            {!this.state.imgs.length ? 'Фото отсутствует' : 
              <>
                {this.state.imgs.map((img, key) => (
                  <img 
                    key={key} 
                    src={'https://storage.yandexcloud.net/bill/' + img} 
                    alt="Image bill" 
                    className="img_modal"
                    onClick={this.openImageBill.bind(this, 'https://storage.yandexcloud.net/bill/' + img)}
                  />
                ))}
              </>
            }
          </Grid>
        
          <VendorItemsTableView />

          <Grid item xs={12} sm={12} style={{ display: 'flex' }}>
            <Typography style={{ fontWeight: 'bold', color: '#9e9e9e' }}>Дата разгрузки:&nbsp;</Typography>
            <Typography>{this.state.bill?.date}</Typography>
          </Grid>

          <Grid item xs={12} sm={12} sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Typography component='span' style={{ fontWeight: 'bold', color: '#9e9e9e' }}>Сотрудники:&nbsp;</Typography>
            {this.state.users.map((user, key) => (
              <Typography key={key} component="span" mr={1}>
                {user.name}{this.state.users.length === 1 || this.state.users.at(-1) === user ? null : ', '}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={12} sm={12} style={{ display: 'flex' }}>
            <Typography style={{ fontWeight: 'bold', color: '#9e9e9e' }}>Комментарии:&nbsp;</Typography>
            <Typography></Typography>
          </Grid>

          <Grid item xs={12} sm={12} style={{ display: 'flex', marginBottom: 20 }}>
            <Typography style={{ fontWeight: 'bold', color: '#9e9e9e' }}>Причина удаления:&nbsp;</Typography>
            <Typography></Typography>
          </Grid>

          <Billing_Accordion
            bill_list={this.state.bill_list}
            bill_items={this.state.bill_items}
          />
        </Grid>
      </>
    );
  }
}

function FormVendorItems(){

  const [ vendor_items, search_item, all_ed_izmer, changeCount, changeData, addItem ] = useStore( state => [ state.vendor_items, state.search_item, state.all_ed_izmer, state.changeCount, state.changeData, state.addItem ]);
  const [ search_vendor_items, pq, count, fact_unit, summ, sum_w_nds ] = useStore( state => [ state.search_vendor_items, state.pq, state.count, state.fact_unit, state.summ, state.sum_w_nds ]);

  return (
    <>
      <Grid item xs={12} sm={12}>
        <h2>Товары поставщика</h2>
        <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)' }} />
      </Grid>

      <Grid item xs={12} sm={4}>
        <MyAutocomplite2
          label="Товар поставщика"
          freeSolo={true}
          multiple={false}
          data={ vendor_items }
          value={ search_item?.name }
          func={ (event, name) => search_vendor_items(event, name) }
          onBlur={ (event, name) => search_vendor_items(event, name) }
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <MySelect
          data={all_ed_izmer}
          value={pq}
          multiple={false}
          is_none={false}
          func={ event => changeData('pq', event) }
          label="Объем упаковки"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <MyTextInput
          type="number"
          label="Кол-во упаковок"
          value={count}
          func={changeCount}
        />
      </Grid>
        
      <Grid item xs={12} sm={2}>
        <MyTextInput label="Кол-вo" disabled={true} value={fact_unit} className='disabled_input' />
      </Grid>

      <Grid item xs={12} sm={4}>
        <MyTextInput
          type="number"
          label="Сумма без НДС"
          value={summ}
          func={ event => changeData('summ', event) }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <MyTextInput
          type="number"
          label="Сумма c НДС"
          value={sum_w_nds}
          func={ event => changeData('sum_w_nds', event) }
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <Button variant="contained" fullWidth style={{ height: '100%' }} onClick={addItem}>
          <AddIcon />
        </Button>
      </Grid>
    </>
  )
}

function VendorItemsTableEdit(){

  const [ deleteItem, changeDataTable ] = useStore( state => [ state.deleteItem, state.changeDataTable ]);
  const [ bill_items_doc, bill_items, allPrice, allPrice_w_nds ] = useStore( state => [ state.bill_items_doc, state.bill_items, state.allPrice, state.allPrice_w_nds ]);

  return (
    <>
      <Grid item xs={12} sm={12}>
        <h2>Товары в документе</h2>
        <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)' }} />
      </Grid>

      <Grid item xs={12} style={{ marginBottom: 20 }} sm={12}>
        <TableContainer component={Paper}>
          <Table aria-label="a dense table">
            <TableHead>
              <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                <TableCell style={{ minWidth: '150px' }}>Товар</TableCell>
                { bill_items_doc.length == 0 ? null : <TableCell style={{ minWidth: '130px' }}>Изменения</TableCell> }
                <TableCell style={{ minWidth: '130px' }}>В упак.</TableCell>
                <TableCell style={{ minWidth: '130px' }}>Упак</TableCell>
                <TableCell>Кол-во</TableCell>
                <TableCell style={{ minWidth: '100px' }}>НДС</TableCell>
                <TableCell style={{ minWidth: '130px' }}>Сумма без НДС</TableCell>
                <TableCell>Сумма НДС</TableCell>
                <TableCell style={{ minWidth: '130px' }}>Сумма с НДС</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bill_items.map((item, key) => (
                <React.Fragment key={key}>
                  {!item?.data_bill ? null :
                    <TableRow style={{ backgroundColor: item?.color ? 'rgb(255, 204, 0)' : '#fff' }}>
                      <TableCell rowSpan={2}>{item?.name ?? item.item_name}</TableCell>
                      <TableCell>До</TableCell>
                      <TableCell>{item?.data_bill?.pq} {item.ed_izmer_name}</TableCell>
                      <TableCell>{item?.data_bill?.count}</TableCell>
                      <TableCell style={{ whiteSpace: 'nowrap' }}>{item?.data_bill?.fact_unit} {item.ed_izmer_name}</TableCell>
                      <TableCell>{item?.data_bill?.nds}</TableCell>
                      <TableCell>{item?.data_bill?.price} ₽</TableCell>
                      <TableCell style={{ whiteSpace: 'nowrap' }}>{item?.data_bill?.summ_nds} ₽</TableCell>
                      <TableCell>{item?.data_bill?.price_w_nds} ₽</TableCell>
                      <TableCell rowSpan={2}>
                        <Button onClick={ () => deleteItem(key) } style={{ cursor: 'pointer' }} color="error" variant="contained">
                          <ClearIcon />
                        </Button>
                      </TableCell>
                      <TableCell rowSpan={2}>
                        {Number(item.count) === 0 ? Number(item.count).toFixed(2) : (Number(item.price_w_nds) / Number(item.count)).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  }

                  <TableRow hover style={{ backgroundColor: item?.color ? 'rgb(255, 204, 0)' : '#fff' }}>
                    {item?.data_bill ? null : <TableCell> {item?.name ?? item.item_name} </TableCell>}
                    {!item?.data_bill ? null : <TableCell>После</TableCell>}
                    <TableCell className="ceil_white">
                      <MySelect
                        data={item.all_ed_izmer}
                        value={item.pq}
                        multiple={false}
                        is_none={false}
                        func={(event) => changeDataTable(event, 'pq', item.id, key)}
                        label=""
                      />
                    </TableCell>
                    <TableCell className="ceil_white">
                      <MyTextInput
                        type="number"
                        label=""
                        value={item.count}
                        func={(event) => changeDataTable(event, 'count', item.id, key)}
                        onBlur={(event) => changeDataTable(event, 'count', item.id, key)}
                      />
                    </TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>{item.fact_unit} {item.ed_izmer_name}</TableCell>
                    <TableCell>{item.nds}</TableCell>
                    <TableCell className="ceil_white">
                      <MyTextInput
                        type="number"
                        label=""
                        value={item.price_item}
                        func={(event) => changeDataTable(event, 'price_item', item.id, key)}
                        onBlur={(event) => changeDataTable(event, 'price_item', item.id, key)}
                      />
                    </TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>{item.summ_nds} ₽</TableCell>
                    <TableCell className="ceil_white">
                      <MyTextInput
                        type="number"
                        label=""
                        value={item.price_w_nds}
                        func={(event) => changeDataTable(event, 'price_w_nds', item.id, key)}
                        onBlur={(event) => changeDataTable(event, 'price_w_nds', item.id, key)}
                      />
                    </TableCell>
                    {item?.data_bill ? null :
                      <>
                        <TableCell>
                          <Button onClick={ () => deleteItem(key) } style={{ cursor: 'pointer' }} color="error" variant="contained">
                            <ClearIcon />
                          </Button>
                        </TableCell>
                        <TableCell>
                          {Number(item.count) === 0 ? Number(item.count).toFixed(2) : (Number(item.price_w_nds) / Number(item.count)).toFixed(2)}
                        </TableCell>
                      </>
                    }
                  </TableRow>
                </React.Fragment>
              ))}
              { bill_items.length == 0 ? null : (
                <TableRow sx={{ '& td': { fontWeight: 'bold' } }}>
                  <TableCell>Итого:</TableCell>
                  { bill_items_doc.length == 0 ? null : <TableCell></TableCell> }
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="center">{allPrice} ₽</TableCell>
                  <TableCell></TableCell>
                  <TableCell align="center">{allPrice_w_nds} ₽</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  )
}

function FormHeader_new({ page }){

  const [points, point_name, search_point, types, type, changeData, search_vendors, vendors, search_vendor, kinds, doc_base_id, docs, doc, search_doc, changeInput, number, number_factur, changeDateRange, date, date_factur, fullScreen, vendor_name] = useStore( state => [ state.points, state.point_name, state.search_point, state.types, state.type, state.changeData, state.search_vendors, state.vendors, state.search_vendor, state.kinds, state.doc_base_id, state.docs, state.doc, state.search_doc, state.changeInput, state.number, state.number_factur, state.changeDateRange, state.date, state.date_factur, state.fullScreen, state.vendor_name]);

  return (
    <>
      {page === 'new' ? 
        <Grid item xs={12} sm={4}>
          <MyAutocomplite2
            data={points}
            value={point_name}
            multiple={false}
            func={ (event, name) => search_point(event, name) }
            onBlur={ (event, name) => search_point(event, name) }
            label="Точка"
          />
        </Grid>
        :
        <Grid item xs={12} sm={4}>
          <MyTextInput label="Точка" disabled={true} value={point_name} className='disabled_input'/>
        </Grid>
      }

      <Grid item xs={12} sm={4}>
        <MySelect
          data={types}
          value={type}
          multiple={false}
          is_none={false}
          func={ event => changeData('type', event) }
          label="Тип"
        />
      </Grid>

      {page === 'new' ? 
        <Grid item xs={12} sm={4}>
          <MyAutocomplite2
            label="Поставщик"
            freeSolo={true}
            multiple={false}
            data={vendors}
            value={search_vendor}
            func={ (event, name) => search_vendors(event, name) }
            onBlur={ (event, name) => search_vendors(event, name) }
          />
        </Grid>
        :
        <Grid item xs={12} sm={4}>
          <MyTextInput label="Поставщик" disabled={true} value={vendor_name} className='disabled_input'/>
        </Grid>
      }

      {parseInt(type) === 2 || parseInt(type) === 3 ? (
        <>
          <Grid item xs={12} sm={4}>
            <MySelect
              data={kinds}
              value={doc_base_id}
              multiple={false}
              is_none={false}
              func={ event => changeData('doc_base_id', event) }
              label="Документ"
            />
          </Grid>
          {parseInt(type) === 2 ?  <Grid item xs={12} sm={4}></Grid> : null}
        </>
      ) : null}

      {parseInt(type) === 3 || parseInt(type) === 4 ? (
        <>
          <Grid item xs={12} sm={4}>
            <MyAutocomplite2
              data={docs}
              multiple={false}
              value={doc}
              func={ (event, name) => search_doc(event, name) }
              onBlur={ (event, name) => search_doc(event, name) }
              label="Документ основание"
            />
          </Grid>
          {parseInt(type) === 4 ?  <Grid item xs={12} sm={4}></Grid> : null}
        </>
      ) : null}

      <Grid item xs={12} sm={6}>
        <MyTextInput
          label="Номер документа"
          value={number}
          func={ (event) => changeInput(event, 'number') }
        />
      </Grid>

      {parseInt(type) === 2 && !fullScreen ? 
        <Grid item xs={12} sm={6}>
          <MyTextInput
            label="Номер счет-фактуры"
            value={number_factur}
            func={ (event) => changeInput(event, 'number_factur') }
          />
        </Grid>
        : null
      }

      <Grid item xs={12} sm={6}>
        <MyDatePickerNew
          label="Дата документа"
          value={date}
          func={ (event) => changeDateRange(event, 'date') }
        />
      </Grid>

      {parseInt(type) === 2 && !fullScreen ? 
        <Grid item xs={12} sm={6}>
          <MyDatePickerNew
            label="Дата счет-фактуры"
            value={date_factur}
            func={ (event) => changeDateRange(event, 'date_factur') }
          />
        </Grid>
        : null
      }
    </>
  )
}

function FormImage_new({ page }){

  const [type, imgs_bill, openImageBill, fullScreen, imgs_factur, number_factur, changeInput, changeDateRange, date_factur] = useStore( state => [state.type, state.imgs_bill, state.openImageBill, state.fullScreen, state.imgs_factur, state.number_factur, state.changeInput, state.changeDateRange, state.date_factur]);

  return (
    <>
      <Grid item xs={12} sm={parseInt(type) === 2 ? 6 : 12}>
        <TableContainer>
          <Grid display="flex" flexDirection="row" style={{ fontWeight: 'bold' }}>
            {!imgs_bill.length ? page === 'new' ? null : 'Фото отсутствует' :
              <>
                {imgs_bill.map((img, key) => (
                  <img 
                    key={key} 
                    src={'https://storage.yandexcloud.net/bill/' + img} 
                    alt="Image bill" 
                    className="img_modal"
                    onClick={() => openImageBill('https://storage.yandexcloud.net/bill/' + img)}
                  />
                ))}
              </>
            }
          </Grid>
        </TableContainer>
      </Grid>

      {parseInt(type) === 2 && !fullScreen ? (
        <Grid item xs={12} sm={6} display="flex" flexDirection="row" style={{ fontWeight: 'bold' }}>
          {!imgs_factur.length ? page === 'new' ? null : 'Фото отсутствует' :
            <>
              {imgs_factur.map((img, key) => (
                <img 
                  key={key} 
                  src={'https://storage.yandexcloud.net/bill/' + img} 
                  alt="Image bill" 
                  className="img_modal"
                  onClick={() => openImageBill('https://storage.yandexcloud.net/bill/' + img)}
                />
              ))}
            </>
          }
        </Grid>
      ) : null}

      <Grid item xs={12} sm={parseInt(type) === 2 ? 6 : 12}>
        <div
          className="dropzone"
          id="img_bill"
          style={{ width: '100%', minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        />
      </Grid>

      {parseInt(type) === 2 && !fullScreen ? (
        <Grid item xs={12} sm={6}>
          <div
            className="dropzone"
            id="img_bill_type"
            style={{ width: '100%', minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          />
        </Grid>
      ) : null}

      {parseInt(type) === 2 && fullScreen ? 
        <>
          <Grid item xs={12}>
            <MyTextInput
              label="Номер счет-фактуры"
              value={number_factur}
              func={ (event) => changeInput(event, 'number_factur') }
            />
          </Grid>

          <Grid item xs={12}>
            <MyDatePickerNew
              label="Дата счет-фактуры"
              value={date_factur}
              func={ (event) => changeDateRange(event, 'date_factur') }
            />
          </Grid>

          <Grid item xs={12}>
            <TableContainer>
              <Grid display="flex" flexDirection="row" style={{ fontWeight: 'bold' }}>
                {!imgs_factur.length ? page === 'new' ? null : 'Фото отсутствует' :
                  <>
                    {imgs_factur.map((img, key) => (
                      <img 
                        key={key} 
                        src={'https://storage.yandexcloud.net/bill/' + img} 
                        alt="Image bill" 
                        className="img_modal"
                        onClick={() => openImageBill('https://storage.yandexcloud.net/bill/' + img)}
                      />
                    ))}
                  </>
                }
              </Grid>
            </TableContainer>
          </Grid>

          <Grid item xs={12}>
            <div
              className="dropzone"
              id="img_bill_type"
              style={{ width: '100%', minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            />
          </Grid>
        </>
        : null
      }
    </>
  )
}

function FormOther_new({ page }){

  const [type, date_items, changeDateRange, users, user, changeAutocomplite, comment, changeInput, changeItemChecked, is_new_doc] = useStore( state => [state.type, state.date_items, state.changeDateRange, state.users, state.user, state.changeAutocomplite, state.comment, state.changeInput, state.changeItemChecked, state.is_new_doc]);

  return (
    <>
      {parseInt(type) === 1 ? null :
        <>
          <Grid item xs={12} sm={6}>
            <MyDatePickerNew
              label="Дата разгрузки"
              value={date_items}
              func={ (event) => changeDateRange(event, 'date_items') }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MyAutocomplite
              data={users}
              multiple={true}
              value={user}
              func={(event, data) => changeAutocomplite('user', data)}
              label="Сотрудники"
            />
          </Grid>
        </>
      }

      <Grid item xs={12} sm={12}>
        <MyTextInput
          label="Комментарии"
          multiline={true}
          maxRows={3}
          value={comment}
          func={ (event) => changeInput(event, 'comment') }
        />
      </Grid>

      {page === 'new' ? null :
        <>
          <Grid item xs={12} sm={6} style={{ display: 'flex', marginBottom: 20 }}>
            <Typography style={{ fontWeight: 'bold', color: '#9e9e9e' }}>
              Причина удаления:&nbsp;
            </Typography>
            <Typography></Typography>
          </Grid>

          <Grid item xs={12} sm={6} style={{ display: 'flex', marginBottom: 20 }}>
            <Typography style={{ fontWeight: 'bold', color: '#9e9e9e' }}>Комментарий бухгалтера:&nbsp;</Typography>
            <Typography>Переделать фото</Typography>
          </Grid>
        </>
      }


      <Grid item xs={12} sm={12} display="flex" alignItems="center">
        <MyCheckBox
          value={parseInt(is_new_doc) === 1 ? true : false}
          func={ (event) => changeItemChecked(event, 'is_new_doc') }
          label=""
        />
        <Typography component="span" className="span_text">
          Поставщик привезет новый документ
        </Typography>
      </Grid>

    </>
  )
}

// Страница Новый документ
class Billing_New_ extends React.Component {
  dropzoneOptions = {
    autoProcessQueue: false,
    autoQueue: true,
    maxFiles: 10,
    timeout: 0,
    parallelUploads: 10,
    acceptedFiles: 'image/jpeg,image/png',
    addRemoveLinks: true,
    addRotateLinks: true,
    url: 'https://jacochef.ru/src/img/billing_items/upload.php',
  };

  myDropzone = null;

  constructor(props) {
    super(props);

    this.state = {
      module: 'billing',
      module_name: '',
      is_load: false,

      DropzoneDop: null
    };
  }

  async componentDidMount() {
    const data = await this.getData('get_points')

    const { setData } = this.props.store;

    setData({
      points: data.points,
      types: types,
    })

    this.setState({
      module_name: 'Новый документ',
    });

    document.title = 'Накладные';

    this.myDropzone = new Dropzone("#img_bill", this.dropzoneOptions);
   
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
        this.setState({
          is_load: false,
        });
      });
  };

  save_main_img(dropzone, point_id, bill_id){
    if( dropzone && dropzone['files'].length > 0 ){
      let i = 0;

      dropzone.on("sending", (file, xhr, data) => {
        let file_type = (file.name).split('.');
        file_type = file_type[file_type.length - 1];
        file_type = file_type.toLowerCase();
        
        i ++;
        data.append("filetype", 'bill_file_'+i+'_point_id_'+point_id+'_bill_id_'+bill_id+'.'+file_type);

        getOrientation(file, function(orientation) {
          data.append("orientation", orientation);
        })
      });
  
      //6304
      return dropzone.on("queuecomplete", (data) => {
        var check_img = false;
  
        dropzone['files'].map((item, key) => {  
          if( item['status'] == "error" ){
            check_img = true;
          }

          
        })
        
        if( check_img ){
          return {
            st: false,
            text: 'Ошибка при загрузке фотографии'
          };
        }else{
          return {
            st: true
          };
        }
      })
    }
  }

  async saveNewBill () {
    const {number, point, vendors, date, number_factur, date_factur, type, doc, doc_base_id, date_items, user, comment, is_new_doc, bill_items} = this.props.store;

    const dateBill = date ? dayjs(date).format('YYYY-MM-DD') : '';
    const dateFactur = date_factur ? dayjs(date_factur).format('YYYY-MM-DD') : '';
    const dateItems = date_items ? dayjs(date_items).format('YYYY-MM-DD') : '';

    const items = bill_items.reduce((newItems, item) => {

      let it = {};

      it.pq = item.pq;
      it.count = item.count;
      it.item_id = item.id;
      it.summ = item.price_item;
      it.summ_w_nds = item.price_w_nds;
      it.color = item.color;

      const nds = item.nds.split(' %')[0];

      if(nds === 'без НДС') {
        it.nds = -1
      } else {
        it.nds = nds;
      }

      newItems.push(it);

      return newItems;
    }, [])

    if( this.myDropzone ){
      console.log( 'main', this.myDropzone.files )
      if( this.myDropzone.files.length == 0 ){
        this.setState({
          operAlert: true,
          err_status: false,
          err_text: 'Нет изображения накладной',
        });

        return ;
      }
    }

    if( parseInt(type) == 2 ){
      if( !this.state.DropzoneDop || this.state.DropzoneDop.files.length == 0 ){
        this.setState({
          operAlert: true,
          err_status: false,
          err_text: 'Нет изображения счет фактуры',
        });

        return ;
      }
    }

    const data = {
      doc,
      type,
      items,
      number,
      comment,
      is_new_doc,
      users: user,
      doc_base_id,
      number_factur,
      date: dateBill,
      date_items: dateItems,
      date_factur: dateFactur,
      point_id: point?.id ?? '',
      vendor_id: vendors.length === 1 ? vendors[0]?.id : '',
    }

    console.log( this.myDropzone.files.length )

    console.log('saveNewBill data', data);

    //const res = await this.getData('save_new', data);
  }

  render() {
    const { isPink, operAlert, err_status, err_text, closeAlert, is_load_store, modalDialog, fullScreen, image, closeDialog } = this.props.store;

    // console.log( 'isPink', isPink )

    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load || is_load_store}>
          <CircularProgress color="inherit" />
        </Backdrop>

        {!modalDialog ? null :
          <Billing_Modal
            onClose={closeDialog}
            fullScreen={fullScreen}
            image={image}
          />
        }
        
        <MyAlert
          isOpen={operAlert}
          onClose={closeAlert}
          status={err_status}
          text={err_text}
        />

        <Grid container spacing={3} mb={10}>

          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)' }} />
          </Grid>

          <FormHeader_new page={'new'} />
          
          <FormImage_new page={'new'} />

          <FormVendorItems />

          <VendorItemsTableEdit />

          <FormOther_new page={'new'} />

          <Grid item xs={12} sm={4}>
            <Button variant="contained" fullWidth color="success" style={{ height: '100%' }} onClick={this.saveNewBill.bind(this)}>
              Сохранить
            </Button>
          </Grid>
         
        </Grid>
      </>
    );
  }
}

// Страница Редактирование документа
class Billing_Edit_ extends React.Component {
  dropzoneOptions = {
    autoProcessQueue: false,
    autoQueue: true,
    maxFiles: 1,
    timeout: 0,
    parallelUploads: 10,
    acceptedFiles: 'image/jpeg,image/png',
    addRemoveLinks: true,
    url: 'https://jacochef.ru/src/img/site_aktii/upload_img.php',
  };

  myDropzone = null;

  constructor(props) {
    super(props);

    this.state = {
      module: 'billing',
      module_name: '',
      is_load: false,
    };
  }

  async componentDidMount() {

    let data_bill = window.location.pathname;

    data_bill = data_bill.split('/');

    const bill = {
      id: data_bill[3],
      point_id: data_bill[4],
      type: data_bill[2],
    }

    const res = await this.getData('get_one', bill);
    const points = await this.getData('get_points');

    const point = points.points.find(point => point.id === res.bill.point_id);

    const data = {
      point_id: bill['point_id'],
      vendor_id: res?.vendors[0]?.id
    }

    const items = await this.getData('get_vendor_items', data);
    const docs = await this.getData('get_base_doc', data);

    const { getDataBill } = this.props.store;

    getDataBill(res, point, items.items, docs);

    document.title = 'Накладные';

    this.myDropzone = new Dropzone("#img_bill", this.dropzoneOptions);
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
        this.setState({
          is_load: false,
        });
      });
  };

  async saveNewBill () {
    const {number, point, vendors, date, number_factur, date_factur, type, doc, doc_base_id, date_items, user, comment, is_new_doc, bill_items} = this.props.store;

    const dateBill = date ? dayjs(date).format('YYYY-MM-DD') : '';
    const dateFactur = date_factur ? dayjs(date_factur).format('YYYY-MM-DD') : '';
    const dateItems = date_items ? dayjs(date_items).format('YYYY-MM-DD') : '';

    const items = bill_items.reduce((newItems, item) => {

      let it = {};

      it.pq = item.pq;
      it.count = item.count;
      it.item_id = item.id;
      it.summ = item.price_item;
      it.summ_w_nds = item.price_w_nds;

      const nds = item.nds.split(' %')[0];

      if(nds === 'без НДС') {
        it.nds = -1
      } else {
        it.nds = nds;
      }

      newItems.push([it]);

      return newItems;
    }, [])

    const data = {
      doc,
      type,
      items,
      number,
      comment,
      is_new_doc,
      users: user,
      doc_base_id,
      number_factur,
      date: dateBill,
      date_items: dateItems,
      date_factur: dateFactur,
      point_id: point?.id ?? '',
      vendor_id: vendors.length === 1 ? vendors[0]?.id : ''
    }

    console.log('saveNewBill data', data);

    //const res = await this.getData('save_new', data);
  }

  render() {

    const { isPink, operAlert, err_status, err_text, closeAlert, is_load_store, modalDialog, fullScreen, image, closeDialog, bill, bill_list, bill_items } = this.props.store;

    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load || is_load_store}>
          <CircularProgress color="inherit" />
        </Backdrop>

        {!modalDialog ? null :
          <Billing_Modal
            onClose={closeDialog}
            fullScreen={fullScreen}
            image={image}
          />
        }

        <MyAlert
          isOpen={operAlert}
          onClose={closeAlert}
          status={err_status}
          text={err_text}
        />

        <Grid container spacing={3} mb={10}>

          <Grid item xs={12} sm={12}>
            <h1>Редактирование документа:{' '}{bill?.number}</h1>
            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)' }} />
          </Grid>

          <FormHeader_new page={'edit'} />
          
          <FormImage_new page={'edit'} />

          <FormVendorItems />

          <VendorItemsTableEdit />
          
          <FormOther_new page={'edit'} />

          <Billing_Accordion
            bill_list={bill_list}
            bill_items={bill_items}
            type='edit'
          />

          <Grid item xs={12} sm={4}>
            <Button variant="contained" fullWidth color="success" style={{ height: '100%' }} onClick={this.saveNewBill.bind(this)}>
              Сохранить
            </Button>
          </Grid>
         
          <Grid item xs={12} sm={4}>
            <Button variant="contained" fullWidth style={{ height: '100%' }}
              //onClick={this.saveBill.bind(this)}
            >
              Удалить
            </Button>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Button variant="contained" fullWidth color="info" style={{ height: '100%' }}
              //onClick={this.saveBill.bind(this)}
            >
              Сохранить и отправить
            </Button>
          </Grid>
          
        </Grid>
      </>
    );
  }
}

const withStore = BaseComponent => props => {
  const store = useStore();
  return <BaseComponent {...props} store={store} />;
};

export function Billing() {
  return <Billing_ />;
}

const Billing_View_Store = withStore(Billing_View_)

export function BillingView() {
  return <Billing_View_Store />;
}

const Billing_New_Store = withStore(Billing_New_)

export function BillingNew() {
  return <Billing_New_Store />;
}

const Billing_Edit_Store = withStore(Billing_Edit_)

export function BillingEdit() {
  return <Billing_Edit_Store />;
}
