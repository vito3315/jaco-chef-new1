import { makeAutoObservable } from 'mobx';
import moment from "moment-timezone";
import config from './config';

const queryString = require('query-string');

import { configure } from "mobx"

configure({
  enforceActions: "never",
  useProxies: "ifavailable"
})

class ItemsStore {
  // Don't need decorators now
  
  items = '';
  itemsPromo = '';
  promoName = '';
  allItems = '';
  allItemsCat = '';
  banners = '';
  AllPrice = 0;
  sum_div = 0;
  
  cityName = 0;
  cityNameRU = '';
  
  promo = null;
  userToken = null;
  userName = '';

  activePage = '';

  need_dops = '';
  free_items = '';
  cart_data = '';
    
  typeOrder = 0;
  
  clientNumber = '';
  
  clear = false;
  
  MyPromos = '';
  updateMyPromos = '';
  
  dateTimeDel = null;
  
  free_drive = 0;
  
  setMyPromos = (items) => {
    this.MyPromos = JSON.stringify( items );
    
    this.updateMyPromos = new Date();
    
    localStorage.setItem('MyPromos', JSON.stringify(items) );
  };

  getMyPromos(){
    return this.MyPromos.length == 0 ? [] : JSON.parse(this.MyPromos, true);
  };
  
  setSumDiv = (items) => {
    this.sum_div = parseInt( items );
  };

  getSumDiv(){
    return this.sum_div;
  };
  
  setDops = (items) => {
    this.need_dops = JSON.stringify(items);
  };

  getDops(){
    return this.need_dops.length == 0 ? [] : JSON.parse(this.need_dops, true);
  };
  
  setFreeItems = (items) => {
    this.free_items = JSON.stringify(items);
  };

  getFreeItems(){
    return this.free_items.length == 0 ? [] : JSON.parse(this.free_items, true);
  };
  
  setCityRU = (city) => {
    this.cityNameRU = city;
  };
  
  getCityRU(){
    //return this.cityNameRU;
    return this.cityNameRU && this.cityNameRU.length > 0 ? this.cityNameRU : 'Город';
  };

  setCity = (city) => {
    this.cityName = city;
  };
  
  getCity(){
    return this.cityName;
  };

  setAllPrice = (price) => {
    this.AllPrice = price;
  };
  
  getAllPrice(){
    return this.AllPrice;
  };

  setPage = (activePage) => {
    this.activePage = activePage;
  };
  
  getPage(){
    return this.activePage;
  };

  setToken = (userToken, userName) => {
    this.userToken = userToken;
    this.setUserName(userName);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', userToken);
    }
  };
  
  getUserName(){
    return this.userName && this.userName.length > 0 ? this.userName : '';
  }
  
  setUserName(userName){
    this.userName = userName;
  }
  
  getToken(){
    return this.userToken;
  };

  getInfoPromo(promoName){
    fetch(config.urlApi, {
      method: 'POST',
      headers: {
          'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify({
          type: 'get_promo', 
          city_id: itemsStore.getCity(),
          promo_name: promoName
      })
  }).then(res => res.json()).then(json => {
    
      console.log( json )
    
      itemsStore.setPromo( JSON.stringify(json), promoName );
      let check_promo = itemsStore.checkPromo();
              
      if( check_promo.st === false ){
        localStorage.removeItem('promo_name')
      }
      
      //return check_promo;
    })
  }
  
  setPromo = (promo, name) => {
    this.promo = promo;
    
    localStorage.setItem('promo_name', name);
  };
  
  getPromo(){
    return JSON.parse(this.promo, true);
    //localStorage.setItem('my_cart', this.items);
  };

  checkPromo(){
    let orderInfo = itemsStore.getCartData();
    itemsStore.setItemsPromo([]);
    
    let tmp = 0,
        allPrice = 0,
        by_time = !orderInfo.orderTimes || parseInt( orderInfo.orderTimes ) == 1 ? 0 : orderInfo.orderPredDay + ' ' + orderInfo.orderPredTime;   
        
    let promo_info = this.getPromo();
    let my_cart = this.getItems();  
    let allItems = this.getAllItems();
      
    let new_my_cart = [];
      
    my_cart.forEach( (el_cart, key_cart) => {
      new_my_cart.push({
        name: el_cart.name,
        item_id: el_cart.item_id,
        count: el_cart.count,
        one_price: el_cart.one_price,
        all_price: parseInt(el_cart.one_price) * parseInt(el_cart.count)
      });
    })
    
    my_cart = new_my_cart;  
      
    this.setItems(my_cart);  
      
    let cart_new_promo = [];    
    allPrice = my_cart.reduce( (sum, item) => sum + parseInt(item['all_price']), tmp );
    
    let type_order = 0,
        point_id_dev = 0,
        point_id_pic = 0;
    
    if( orderInfo.orderType || orderInfo.orderType == 0 ){
      type_order = parseInt( orderInfo.orderType ) ?? 0;
      point_id_dev = orderInfo.orderAddr ? parseInt( orderInfo.orderAddr.point_id ) : 0;
      point_id_pic = parseInt( orderInfo.orderPic ) ?? 0;
    }
    
    let this_date = '',
        this_time = '',
        this_dow = '';
    
    if( by_time == 0 ){
      this_date = moment(new Date()).tz("Europe/Samara").format("YYYY-MM-DD");
      this_time = moment(new Date()).tz("Europe/Samara").format("H:mm");
      this_dow = parseInt(moment(new Date()).tz("Europe/Samara").format("E"));
    }else{
      this_date = moment(by_time).tz("Europe/Samara").format("YYYY-MM-DD");
      this_time = moment(by_time).tz("Europe/Samara").format("H:mm");
      this_dow = parseInt(moment(by_time).tz("Europe/Samara").format("E"));
    }
    
    
    
    if( promo_info ){
      if( !promo_info.status_promo ){
        return {
          st: false,
          text: 'Промокод не найден или уже активирован'
        }
      }
      
      if( promo_info.limits.date.min && promo_info.limits.date.max ){
        if( this_date >= promo_info.limits.date.min && this_date <= promo_info.limits.date.max ){
          
        }else{
          return {
            st: false,
            text: 'Действует с '+promo_info.limits.date.min+' по '+promo_info.limits.date.max+' '+promo_info.promo_text.false
          }
        }
      }
      
      if( promo_info.limits.time.min != 0 && promo_info.limits.time.max != 0 ){
        if( this_time >= promo_info.limits.time.min && this_time <= promo_info.limits.time.max ){
          
        }else{
          return {
            st: false,
            text: this_time+' Действует с '+promo_info.limits.time.min+' по '+promo_info.limits.time.max+' '+promo_info.promo_text.false
          }
        }
      }
      
      if( promo_info.limits.point_id != 0 ){
        if( (type_order == 0 && point_id_dev == promo_info.limits.point_id) || (type_order == 1 && point_id_pic == promo_info.limits.point_id) ){
          
        }else{
          return {
            st: false,
            text: 'Адрес для доставки или самовывоза указан некорректно. Проверьте правильность введённых данных.'
          }
        }
      }
      
      if( promo_info.limits.summ.min != 0 || promo_info.limits.summ.max != 0 ){
        if( allPrice >= promo_info.limits.summ.min && (promo_info.limits.summ.max >= allPrice || promo_info.limits.summ.max == 0) ){
          
        }else{
          return {
            st: false,
            text: 'Сумма от '+promo_info.limits.summ.min+' до '+promo_info.limits.summ.max+'  Общая сумма вашего заказа превышает допустимую стоимость для применения промокода.'
          }
        }
      }
      
      if( promo_info.limits.dows ){
        if( parseInt(promo_info.limits.dows[ this_dow ]) == 0 ){
          return {
            st: false,
            text: 'Указанный вами день недели недоступен для применения промокода. Пожалуйста, выберите другую дату.'
          }
        }
      }
      
      if( promo_info.limits.type_order ){
        if( 
          parseInt( promo_info.limits.type_order ) == 1
            || 
          (parseInt( promo_info.limits.type_order ) == 3 && type_order == 0)  
            || 
          (parseInt( promo_info.limits.type_order ) == 2 && type_order == 1) ){
          
        }else{
          
          let type_ = '';
          
          if( parseInt( promo_info.limits.type_order ) == 1 ){
            type_ = 'Все типы заказов';
          }else{
            if( parseInt( promo_info.limits.type_order ) == 2 ){
              type_ = 'Только самовывоз';
            }else{
              if( parseInt( promo_info.limits.type_order ) == 4 ){
                type_ = 'Только доставка';
              }else{
                type_ = 'Только в зале';
              }
            }
          }
          
          return {
            st: false,
            text: 'Действует '+type_
          }
        }
      }
      
      if( promo_info.limits.only_kassa ){
        if( parseInt( promo_info.limits.only_kassa ) == 1 ){
          return {
            st: false,
            text: 'Указанный вами промокод действителен только при оплате на кассе.'
          }
        }
      }
      
      if( promo_info.limits.items.length > 0 ){
        let check = 0;
        let this_item = null;
        let this_item_check = null;
        
        promo_info.limits.items.map((need_item)=>{
          this_item = new_my_cart.find( (item) => item.item_id == need_item );
          
          let check = allItems.find( (item) => item.id == need_item );
          
          if( check && check.name ){
            this_item_check += check.name+', '
            
            if( this_item ){
              check ++;
            }
          }
          
          
        })
        
        if( promo_info.limits.items.length != check ){
          return {
            st: false,
            text: 'Позиции, которые должны быть в корзине: '+this_item_check
          }
        }
      }
      
      itemsStore.free_drive = parseInt(promo_info.limits.free_drive);
      
      let all_price = 0,
          count_sale = 0,
          this_item = null;
      
      //скидка
      if( parseInt(promo_info.promo_action) == 1 ){
        //товары
        if( parseInt(promo_info.sale.cat_sale) == 1 ){
          count_sale = parseInt(promo_info.sale.count_sale);
          
          my_cart.forEach( (el_cart, key_cart) => {
            this_item = allItems.find( (item) => item.id == el_cart.item_id );
            
            if( parseInt(this_item.type) != 3 && parseInt(this_item.type) != 4 ){
              promo_info.sale.sale_action.forEach( (el_promo) => {
                if( parseInt(el_cart.item_id) == parseInt(el_promo) ){
                  
                  if( parseInt(promo_info.sale.type_price) == 1 ){
                    //рубли  
                    
                    if( count_sale > 0 ){
                      all_price = (parseInt(el_cart.one_price) * parseInt(el_cart.count)) - parseInt(count_sale);
                      
                      if( all_price <= 0 ){
                        all_price = 1;
                      }
                      
                      count_sale -= (parseInt(el_cart.one_price) * parseInt(el_cart.count));
                      
                      my_cart[ key_cart ].all_price = all_price;
                    }
                  }else{
                    //проценты  
                    
                    all_price = parseInt(el_cart.all_price) - ((parseInt(el_cart.all_price) / 100) * parseInt(count_sale));
                    my_cart[ key_cart ].all_price = parseInt(all_price);
                  }
                }
              })
            }
          })
        }
        
        //категории
        if( parseInt(promo_info.sale.cat_sale) == 2 ){
          count_sale = parseInt(promo_info.sale.count_sale);
          
          my_cart.forEach( (el_cart, key_cart) => {
            this_item = allItems.find( (item) => item.id == el_cart.item_id );
            
            if( parseInt(this_item.type) != 3 && parseInt(this_item.type) != 4 ){
              promo_info.sale.sale_action.forEach( (el_promo) => {
                if( parseInt(this_item.cat_id) == parseInt(el_promo) ){
                  
                  if( parseInt(promo_info.sale.type_price) == 1 ){
                    //рубли  
                    
                    if( count_sale > 0 ){
                      all_price = (parseInt(el_cart.one_price) * parseInt(el_cart.count)) - parseInt(count_sale);
                      
                      if( all_price <= 0 ){
                        all_price = 1;
                      }
                      
                      count_sale -= (parseInt(el_cart.one_price) * parseInt(el_cart.count));
                      
                      my_cart[ key_cart ].all_price = all_price;
                    }
                  }else{
                    //проценты  
                    all_price = parseInt(el_cart.all_price) - ((parseInt(el_cart.all_price) / 100) * parseInt(count_sale));
                    my_cart[ key_cart ].all_price = parseInt(all_price);
                  }
                }
              })
            }
          })
        }
        
        //все кроме допов и напитков
        if( parseInt(promo_info.sale.cat_sale) == 3 ){
          count_sale = parseInt(promo_info.sale.count_sale);
          
          my_cart.forEach( (el_cart, key_cart) => {
            this_item = allItems.find( (item) => item.id == el_cart.item_id );
            
            if( parseInt(this_item.type) != 3 && parseInt(this_item.type) != 4 ){
              if( parseInt(promo_info.sale.type_price) == 1 ){
                //рубли  
                
                if( count_sale > 0 ){
                  all_price = (parseInt(el_cart.one_price) * parseInt(el_cart.count)) - parseInt(count_sale);
                  
                  if( all_price <= 0 ){
                    all_price = 1;
                  }
                  
                  count_sale -= (parseInt(el_cart.one_price) * parseInt(el_cart.count));
                  
                  my_cart[ key_cart ].all_price = all_price;
                }
              }else{
                //проценты  
                all_price = parseInt(el_cart.all_price) - ((parseInt(el_cart.all_price) / 100) * parseInt(count_sale));
                my_cart[ key_cart ].all_price = parseInt(all_price);
              }
            }
          })
        }
        
        tmp = 0;
        allPrice = 0;
        
        allPrice = my_cart.reduce( (sum, item) => sum + item['all_price'], tmp );
        
        itemsStore.setAllPrice(allPrice);
        
        return {
          st: true,
          text: promo_info.promo_text.true
        }
      }
      
      //добавление товара
      if( parseInt(promo_info.promo_action) == 2 ){
        promo_info.items_add.forEach((el) => {
          this_item = allItems.find( (item) => item.id == el.item_id );
          
          cart_new_promo.push({
            item_id: el.item_id,
            count: el.count,
            one_price: this_item['price'],
            all_price: el.price,
          });
        });
        
        tmp = 0;
        allPrice = 0;
        
        allPrice = my_cart.reduce( (sum, item) => sum + parseInt(item['all_price']), tmp );
        
        tmp = 0;
        
        allPrice += cart_new_promo.reduce( (sum, item) => sum + parseInt(item['all_price']), tmp );
        
        itemsStore.setItemsPromo(cart_new_promo);
        itemsStore.setAllPrice(allPrice);
      }
      
      //товар за цену
      if( parseInt(promo_info.promo_action) == 3 ){
        if( promo_info.items_on_price.length > 0 ){
          my_cart.forEach( (el_cart, key_cart) => {
            promo_info.items_on_price.forEach( (el_promo) => {
              if( parseInt(el_cart.item_id) == parseInt(el_promo.id) ){
                my_cart[ key_cart ].new_one_price = parseInt(el_promo.price)
                my_cart[ key_cart ].all_price = parseInt(el_promo.price) * parseInt(el_cart.count)
              }
            });
          });
          
          tmp = 0;
          allPrice = 0;
          
          allPrice = my_cart.reduce( (sum, item) => sum + parseInt(item['all_price']), tmp );
          itemsStore.setAllPrice(allPrice);
        }
      }
      
      this.setItems(my_cart);
      
      return {
        st: true,
        text: promo_info.promo_text.true
      }
    }else{
      return {
        st: false,
        text: 'Промокод не найден',
        test: promo_info
      }
    }
  }

  setItemsPromo = (items) => {
    this.itemsPromo = JSON.stringify(items);
  };

  getItemsPromo(){
    return this.itemsPromo.length == 0 ? [] : JSON.parse(this.itemsPromo, true);
  };

  setAllItemsCat = (items) => {
    this.allItemsCat = JSON.stringify(items);
  };

  getAllItemsCat(){
    return this.allItemsCat.length == 0 ? [] : JSON.parse(this.allItemsCat, true);
  };

  setItems = (items) => {
    let tmp = 0,
        allPrice = 0;
    
    let cart_new_promo = this.getItemsPromo();
        
    allPrice = items.reduce( (sum, item) => sum + parseInt(item['all_price']), tmp );
    
    tmp = 0;
        
    allPrice += cart_new_promo.reduce( (sum, item) => sum + parseInt(item['all_price']), tmp );
    
    this.setAllPrice(allPrice);
    
    this.items = JSON.stringify(items);
    if (typeof window !== 'undefined') {
      let my_cart = items.filter( (item) => item.count > 0 );
      my_cart = JSON.stringify(my_cart);
      
      localStorage.setItem('my_cart', my_cart);
    }
  };
  
  saveCartData = (items) => {
    let cartData = JSON.stringify(items);
    this.cart_data = cartData;
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartData', cartData);
    }
  };
  
  getCartData(){
    if (typeof window !== 'undefined') {
      if( localStorage.getItem('cartData') ){
        return JSON.parse( localStorage.getItem('cartData') );
      }else{
        return [];
      }
    }
  };
  
  setAllItems = (items) => {
    this.allItems = JSON.stringify(items);
    
    this.checkCart();
  };

  checkCart(){
    let cart = this.getItems();
    let allItems = this.getAllItems();
    let new_cart = [];
    
    cart.forEach(item => {
      
      let originalItem = allItems.find( (it) => parseInt(it.id) == parseInt(item.item_id) )
      
      new_cart.push({
        name: item.name,
        item_id: item.item_id,
        count: item.count,
        one_price: parseInt( originalItem.price ),
        all_price: parseInt( originalItem.price ) * parseInt( item.count )
      })
    });
    
    this.setItems( new_cart );
  }
  
  getItems(){
    return this.items.length == 0 ? [] : JSON.parse(this.items, true);
  };
  
  getAllItems(){
    return this.allItems.length == 0 ? [] : JSON.parse(this.allItems, true);
  };

  AddItem(id){
    let my_cart = itemsStore.getItems();
    let all_items = itemsStore.getAllItems();
    let promo = itemsStore.getPromo();
    
    let free_items = itemsStore.getFreeItems();
    
    if( all_items.length > 0 ){
      let cart_info = my_cart.find( (item) => item.item_id == id );
      let count_ = 0;
      
      if( cart_info ){
        count_ = parseInt(cart_info.count);
      }
      
      let item_info = all_items.find( (item) => item.id == id );
      
      if(item_info){
        let count = count_ + 1,
            price = parseInt(item_info['price']);
          
        let max_count = itemsStore.check_max_count( parseInt(id) );    
        
        if( parseInt(max_count) >= count ){
          
          let check_add = free_items.filter( (item) => parseInt(item.this_item_id) == parseInt(id) && parseInt(item.is_add) == 1 );
          
          let check_in_cart = my_cart.some( (item) => parseInt(item.item_id) == parseInt(id) );
          
          if( !check_in_cart ){
            my_cart.push({
              name: item_info.name,
              item_id: id,
              count: count,
              one_price: price,
              all_price: count * price
            })
          }else{
            my_cart.forEach((item, key) => {
              if( parseInt(item.item_id) == parseInt(id) ){
                my_cart[key]['count'] = count;
                my_cart[key]['all_price'] = count * price;
              }
            });
          }
          
          check_add.map( (add_item) => {
            let check_item_add = all_items.find( (item) => parseInt(item.id) == parseInt(add_item.item_id) );
            
            if( check_item_add ){
              
              let check_in_cart = my_cart.some( (item) => parseInt(item.item_id) == parseInt(add_item.item_id) );
          
              if( !check_in_cart ){
                my_cart.push({
                  name: check_item_add.name,
                  item_id: add_item.item_id,
                  count: parseInt(add_item.count) * count,
                  one_price: 0,
                  all_price: 0
                })
              }else{
                my_cart.forEach((item, key) => {
                  if( parseInt(item.item_id) == parseInt(add_item.item_id) ){
                    my_cart[key]['count'] = parseInt(add_item.count) * count;
                    my_cart[key]['all_price'] = 0;
                  }
                });
              }
              
            }
          } )
          
          itemsStore.setItems(my_cart);
          
          if( promo ){
            itemsStore.checkPromo();
          }
          
          return count;
        }
        
        return count - 1;
      }
    }else{
      return 0;
    }
  }

  AddCountItem(id, NewCount){
    let my_cart = itemsStore.getItems();
    let all_items = itemsStore.getAllItems();
    let promo = itemsStore.getPromo();
    
    if( all_items.length > 0 ){
      let cart_info = my_cart.find( (item) => parseInt(item.item_id) == parseInt(id) );
      let count_ = 0;
      
      if( cart_info ){
        count_ = parseInt(cart_info.count);
      }
      
      let item_info = all_items.find( (item) => parseInt(item.id) == parseInt(id) );
      
      if(item_info){
        let count = parseInt(NewCount),
            price = parseInt(item_info['price']);
          
        let max_count = itemsStore.check_max_count( parseInt(id) );    
        
        if( parseInt(max_count) >= count ){
          let check_in_cart = my_cart.some( (item) => parseInt(item.item_id) == parseInt(id) );
            if( !check_in_cart ){
              my_cart.push({
                name: item_info.name,
                item_id: id,
                count: count,
                one_price: price,
                all_price: count * price
              })
            }else{
              my_cart.forEach((item, key) => {
                if( item.item_id == id ){
                  my_cart[key]['count'] = count;
                  my_cart[key]['all_price'] = count * price;
                }
              });
            }
          
          itemsStore.setItems(my_cart);
          
          if( promo ){
            itemsStore.checkPromo();
          }
          
          return count;
        }
        
        return count - 1;
      }
    }else{
      return 0;
    }
  }
  
  MinusItem(id){
    let my_cart = itemsStore.getItems();
    let all_items = itemsStore.getAllItems();
    let promo = itemsStore.getPromo();
    
    if( all_items.length > 0 ){
      let cart_info = my_cart.find( (item) => item.item_id == id );
      
      if( !cart_info ){
        return 0;
      }
      
      let item_info = all_items.find( (item) => item.id == id ),
          count = parseInt(cart_info.count) - 1,
          price = item_info['price'];
      
      if( count <= 0 ){
        count = 0;
      }    
          
      let max_count = 0;
      let free_items = itemsStore.getFreeItems();
      
      if( count >= 0 ){
        
        let check_add = free_items.filter( (item) => parseInt(item.this_item_id) == parseInt(id) && parseInt(item.is_add) == 1 );
        
        
        my_cart.map( (item, key) => {
          if( item.item_id == id ){
            my_cart[key]['count'] = count;
            my_cart[key]['all_price'] = count * price;
          }
        } )
        
        itemsStore.setItems(my_cart)
        
        setTimeout( () => {
          my_cart.map( (item, key) => {
            max_count = itemsStore.check_max_count(item.item_id)
            
            if( parseInt(max_count) < 0 ){
              my_cart[key]['count'] = parseInt(item.count) + parseInt(max_count);
              my_cart[key]['all_price'] = ( parseInt(item.count) + parseInt(max_count) ) * parseInt(item.one_price);
            }
          })
          
          
          check_add.map( (add_item) => {
            let check_item_add = all_items.find( (item) => parseInt(item.id) == parseInt(add_item.item_id) );
            
            if( check_item_add ){
              
              let check_in_cart = my_cart.some( (item) => parseInt(item.item_id) == parseInt(add_item.item_id) );
          
              if( !check_in_cart ){
                my_cart.push({
                  name: check_item_add.name,
                  item_id: add_item.item_id,
                  count: parseInt(add_item.count) * count,
                  one_price: 0,
                  all_price: 0
                })
              }else{
                my_cart.forEach((item, key) => {
                  if( parseInt(item.item_id) == parseInt(add_item.item_id) ){
                    my_cart[key]['count'] = parseInt(add_item.count) * count;
                    my_cart[key]['all_price'] = 0;
                  }
                });
              }
              
            }
          } )
          
          
          itemsStore.setItems(my_cart)
        }, 300 )
        
      }
    
      if( promo ){
        itemsStore.checkPromo();
      }
      
      return count;
    }else{
      return 0;
    }
  }

  delItem(id){
    let my_cart = itemsStore.getItems();
    let all_items = itemsStore.getAllItems();
    let promo = itemsStore.getPromo();
    
    if( all_items.length > 0 ){
      let cart_info = my_cart.find( (item) => item.item_id == id );
      
      if( !cart_info ){
        return 0;
      }
      
      let item_info = all_items.find( (item) => item.id == id ),
          count = 0,
          price = item_info['price'];
      
      if( count <= 0 ){
        count = 0;
      }    
          
      if( count >= 0 ){
        my_cart.map( (item, key) => {
          if( item.item_id == id ){
            my_cart[key]['count'] = count;
            my_cart[key]['all_price'] = count * price;
          }
        } )
        
        itemsStore.setItems(my_cart)
        
        let max_count = 0;
        
        setTimeout( () => {
          my_cart.map( (item, key) => {
            max_count = itemsStore.check_max_count(item.item_id)
            
            if( parseInt(max_count) < 0 ){
              my_cart[key]['count'] = parseInt(item.count) + parseInt(max_count);
              my_cart[key]['all_price'] = ( parseInt(item.count) + parseInt(max_count) ) * parseInt(item.one_price);
            }
          })
          
          itemsStore.setItems(my_cart)
        }, 300 )
      }
    
      if( promo ){
        itemsStore.checkPromo();
      }
      
      return count;
    }else{
      return 0;
    }
  }
  
  check_need_dops(){
    let my_cart = itemsStore.getItems();
    let all_items = itemsStore.getAllItems();
    
    if( !all_items || all_items.length == 0 ){
      return [];
    }
    
    let count_pizza = 0,
        count_rolls = 0;
        
    let need_dops = itemsStore.getDops();
        
    if( need_dops.length == 0 ){
      return [];
    }
    
    my_cart.forEach(el => {
      let this_item = all_items.find( (item) => item.id == el.item_id );
      
      if( !this_item ){
        return [];
      }
      
      if( parseInt(this_item['cat_id']) == 14 ){
        count_pizza += parseInt(el.count)
      }else{
        if( parseInt(this_item['cat_id']) !== 14 && parseInt(this_item['cat_id']) !== 5 && parseInt(this_item['cat_id']) !== 6 && parseInt(this_item['cat_id']) !== 7 ){
          count_rolls += parseInt(el.count)
        }
      }
    });
    
    let all_need_dops = [];
    
    if( count_rolls > 0 && count_pizza == 0 ){
      all_need_dops = need_dops['rolls'];
    }
    
    if( count_rolls == 0 && count_pizza > 0 ){
      all_need_dops = need_dops['pizza'];
    }
    
    if( count_rolls > 0 && count_pizza > 0 ){
      all_need_dops = [...need_dops['rolls'], ...need_dops['pizza']];
    }
    
    if( count_rolls == 0 && count_pizza == 0 ){
      all_need_dops = [...need_dops['rolls'], ...need_dops['pizza']];
    }
    
    let my_dops = [],
        add_my_dop = [];
    
    my_cart.forEach(el => {
      let this_item = all_items.find( (item) => item.id == el.item_id );
      
      if( !this_item ){
        return [];
      }
      
      if( parseInt(this_item['cat_id']) == 7 ){
        my_dops.push( this_item );
      }
    });
    
    my_dops.forEach( (my_d) => {
      let check_dop = false;
      
      all_need_dops.forEach( (need_dop) => {
        if( parseInt( need_dop.id ) == parseInt( my_d.id ) ){
          check_dop = true;
        }
      });
      
      if( !check_dop ){
        add_my_dop.push( my_d );
      }
    });
    
    all_need_dops = [...all_need_dops, ...add_my_dop];
    
    return all_need_dops;
  }
  
  check_max_count(item_id){
    let free_dops_in_cart = [];
    let unic_id = [];
    
    let my_cart = itemsStore.getItems();
    let my_cart_promo = itemsStore.getItemsPromo();
    let free_items = itemsStore.getFreeItems();
    let all_items = itemsStore.getAllItems();
    
    let check_item = all_items.find( (item) => parseInt(item.id) == parseInt(item_id) );
    
    if( parseInt(check_item.type) != 3 || (parseInt(check_item.id) !== 17 && parseInt(check_item.id) !== 237) ){
      return 99;
    }
    
    if( !free_items ){
      return 99;
    }
    
    let all_max_count = 0;
    let my_free_count = 0;
    
    my_cart.forEach((item_cart, key) => {
      
      let item_info = all_items.find( (item) => parseInt(item.id) == parseInt(item_cart['item_id']) );
      let check_free = free_items.find( (item) => parseInt(item['this_item_id']) == parseInt(item_cart['item_id']) );
      
      if( check_free && check_free.max_count && parseInt(item_info.type) != 3 ){
        all_max_count += parseInt(check_free.max_count);
      }
      
      if( parseInt(item_info.id) == 17 || parseInt(item_info.id) == 237 ){
        my_free_count += parseInt(item_cart['count']);
      }
      
      free_items.forEach( (item) => {
        if( parseInt(item_cart['item_id']) == parseInt(item['this_item_id']) ){
          item['count_in_cart'] = parseInt(item_cart['count']);
          
          free_dops_in_cart.push( item );
          unic_id.push( parseInt(item['item_id']) );
        }
      });
    });
    
    my_cart_promo.forEach((item_cart, key) => {
      
      let item_info = all_items.find( (item) => parseInt(item.id) == parseInt(item_cart['item_id']) );
      let check_free = free_items.find( (item) => parseInt(item['this_item_id']) == parseInt(item_cart['item_id']) );
      
      if( check_free && check_free.max_count && parseInt(item_info.type) != 3 ){
        all_max_count += parseInt(check_free.max_count);
      }
      
      if( parseInt(item_info.id) == 17 || parseInt(item_info.id) == 237 ){
        my_free_count += parseInt(item_cart['count']);
      }
      
      free_items.forEach( (item) => {
        if( parseInt(item_cart['item_id']) == parseInt(item['this_item_id']) ){
          item['count_in_cart'] = parseInt(item_cart['count']);
          
          free_dops_in_cart.push( item );
          unic_id.push( parseInt(item['item_id']) );
        }
      });
    });
    
    unic_id = [...new Set(unic_id)];
    
    let new_free_dop = [];
    
    unic_id.forEach( (unic_item, key) => {
      free_dops_in_cart.forEach( (item_free) => {
        if( parseInt(unic_item) == parseInt(item_free['item_id']) ){
          let check = false;
          
          new_free_dop.forEach( (el, k) => {
            if( parseInt( el['item_id'] ) == parseInt(unic_item) ){
              check = true;
              new_free_dop[k]['count'] += item_free['count_in_cart'] * item_free['max_count'];
            }
          });
          
          if( !check ){
            new_free_dop.push({
              item_id: parseInt(unic_item),
              count_in_cart: item_free['count_in_cart'],
              count: item_free['count_in_cart'] * item_free['max_count']
            });
          }
        }
      })
    });
    
    let max_count = 99;
    
    if( new_free_dop.length > 0 ){
      
      max_count = new_free_dop.find( (item) => parseInt(item['item_id']) == 17 );
      if( max_count ){
        max_count = parseInt(max_count['count']);
        
        if( my_free_count >= max_count ){
          return max_count - my_free_count;
        }
        
      }
    }
    
    return max_count;
  }
  
  check_max_count_old(item_id){
    let free_dops_in_cart = [];
    let unic_id = [];
    
    let my_cart = itemsStore.getItems();
    let free_items = itemsStore.getFreeItems();
    
    if( !free_items ){
      return 99;
    }
    
    my_cart.forEach((item_cart, key) => {
      free_items.forEach( (item) => {
        if( parseInt(item_cart['item_id']) == parseInt(item['this_item_id']) ){
          item['count_in_cart'] = parseInt(item_cart['count']);
          
          free_dops_in_cart.push( item );
          unic_id.push( parseInt(item['item_id']) );
        }
      });
    });
    
    unic_id = [...new Set(unic_id)];
    
    let new_free_dop = [];
    
    unic_id.forEach( (unic_item, key) => {
      free_dops_in_cart.forEach( (item_free) => {
        if( parseInt(unic_item) == parseInt(item_free['item_id']) ){
          let check = false;
          
          new_free_dop.forEach( (el, k) => {
            if( parseInt( el['item_id'] ) == parseInt(unic_item) ){
              check = true;
              new_free_dop[k]['count'] += item_free['count_in_cart'] * item_free['max_count'];
            }
          });
          
          if( !check ){
            new_free_dop.push({
              item_id: parseInt(unic_item),
              count: item_free['count_in_cart'] * item_free['max_count']
            });
          }
        }
      })
    });
    
    let max_count = 99;
    
    new_free_dop.forEach(el => {
      if( parseInt( el['item_id'] ) == parseInt(item_id) ){
        max_count = parseInt(el['count']);
      }
    });
    
    return max_count;
  }
  
  constructor() {
    if (typeof window !== 'undefined') {
      if( localStorage.getItem('my_cart') ){
        let cart = JSON.parse(localStorage.getItem('my_cart'));
        let allItems = this.getAllItems();
        let new_cart = [];
        
        cart.forEach(item => {
          new_cart.push({
            name: item.name,
            item_id: item.item_id,
            count: item.count,
            one_price: parseInt( item.one_price ),
            all_price: parseInt( item.one_price ) * parseInt( item.count )
          })
        });
        
        this.setItems( new_cart );
      }
      if( localStorage.getItem('token') ){
        this.setToken( localStorage.getItem('token') );
      }
      if( localStorage.getItem('cartData') ){
        this.cartData = localStorage.getItem('cartData');
      }
      if( localStorage.getItem('promo_name') ){
        setTimeout(()=>{
          this.getInfoPromo( localStorage.getItem('promo_name') )
        }, 300)
      }
      
      if( localStorage.getItem('MyPromos') && localStorage.getItem('MyPromos').length > 0 ){
        this.setMyPromos( JSON.parse(localStorage.getItem('MyPromos'), true) );
      }
    }
    
    makeAutoObservable (this);
  }
}

const itemsStore = new ItemsStore();

export default itemsStore;
export { ItemsStore };