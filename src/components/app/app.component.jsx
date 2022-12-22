import React, { Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const queryString = require('query-string');


const Home = React.lazy(() => import("../home"));
const Auth = React.lazy(() => import("../auth"));
const Reg = React.lazy(() => import("../registration"));

const LiveOrders = React.lazy(() => import("../live_orders"));
const Events = React.lazy(() => import("../events"));
const RasByBill = React.lazy(() => import("../ras_by_bill"));
const CategoryItems = React.lazy(() => import("../category_items"));
const VendorModule = React.lazy(() => import("../vendor_module"));

const VendorItemPrice = React.lazy(() => import("../vendor_item_price"));
const Tender = React.lazy(() => import("../tender"));
const WorkSchedule = React.lazy(() => import("../work_schedule"));

import { Revizion, RevizionNew } from '../revizion';
import { SiteSale2, SiteSale2_New, SiteSale2_Edit, SiteSale2_Stat, SiteSale2_StatList, SiteSale2_AnaliticList } from '../site_sale_2';

const DriveMapStatAll = React.lazy(() => import("../drive_map_stat_all"));
const DriverStat = React.lazy(() => import("../driver_stat"));
const Concenter = React.lazy(() => import("../concenter"));
const SocialNetwork = React.lazy(() => import("../socialnetwork"));
const CatWork = React.lazy(() => import("../cat_work"));

const AppWorkPoint = React.lazy(() => import("../app_work_point"));
const AppWork = React.lazy(() => import("../app_work"));
const AppWorkShow = React.lazy(() => import("../app_work_show"));
const SiteStatMarc = React.lazy(() => import("../site_stat_marc"));
const AdvertisingCompany = React.lazy(() => import("../advertising_company"));
const SitePageText = React.lazy(() => import("../site_page_text"));

const RasBillAndCook = React.lazy(() => import("../ras_bill_and_cook"));
const SkladItemsModule = React.lazy(() => import("../sklad_items_module"));
const SiteUserManager = React.lazy(() => import("../site_user_manager"));
const PromoItemsStat = React.lazy(() => import("../promo_items_stat"));
const SiteItems = React.lazy(() => import("../site_items"));
const StatErrCash = React.lazy(() => import("../stat_err_cash"));
const CloseBuy = React.lazy(() => import("../close_buy"));
const PolufabricatModule = React.lazy(() => import("../polufabricat_module"));
const Checkworks = React.lazy(() => import("../check_works"));
const CitiesModules = React.lazy(() => import("../cities_modules"));
const ZoneModules = React.lazy(() => import("../zone_modules"));
const CafeDirEdit = React.lazy(() => import("../cafe_dir_edit"));

const HotMap = React.lazy(() => import("../hot_map"));
const ShowCook = React.lazy(() => import("../show_cook"));
const СafeUprEdit = React.lazy(() => import("../cafe_upr_edit"));
const CheckCheck = React.lazy(() => import("../check_check"));
const OptionToWin = React.lazy(() => import("../option_to_win"));
const AppPerH = React.lazy(() => import("../app_per_h"));

const CountUsers = React.lazy(() => import("../count_users"));
const Fines = React.lazy(() => import("../fines"));
const FinesErr = React.lazy(() => import("../fines_err"));
const EventTime1 = React.lazy(() => import("../event_time_1"));
const ReceptModule = React.lazy(() => import("../recept_module"));
const OrderPostRec = React.lazy(() => import("../order_post_rec"));

const ListFakeUsers = React.lazy(() => import("../list_fake_users"));

import { SiteSaleMin, SiteSaleMin_New, SiteSaleMin_Edit, SiteSaleMin_StatList } from '../site_sale_min';

const theme = createTheme({
    palette: {
      primary: {
        main: '#c03',
      },
      def: {
        main: '#353b48',
        secondary: '#fff'
      },
    },
});

class Header extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      module: 'header',
      
      open: false,
      menu: [],
      full_menu: [],
      
      left: false
    };
  }
  
  async componentDidMount(){
    if((window.location.protocol == 'http:' || window.location.protocol == 'http') && window.location.hostname != 'localhost'){
      window.location.href = 'https://jacosoft-dop.ru'+window.location.pathname;
    }

    let data = await this.getData('get_all');
    
    this.setState({
      menu: data.info.left_menu,
      full_menu: data.info.full_menu,
    })
  }
  
  getData = (method, data = {}) => {
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
      
      console.log( json )
      
      if( json.st === false && json.type == 'redir' ){
        window.location.pathname = '/';
        return;
      }
      
      if( json.st === false && json.type == 'auth' ){
        window.location.pathname = '/auth';
        return;
      }
      
      return json;
    })
    .catch(err => { 
        console.log( err )
    });
  }
  
  handleDrawerOpen(){
    this.setState({
      open: true
    })
  }
  
  handleDrawerClose(){
    this.setState({
      open: false
    })
  }
  
  logOut(){
    localStorage.removeItem('token')
      
    setTimeout( () => {
      window.location.pathname = '/'
    }, 300)
  }

  render(){
    return (
      <>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen.bind(this)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap style={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        
        
        <React.Fragment >
          <SwipeableDrawer
            anchor={'left'}
            open={ this.state.open }
            onClose={ () => { this.setState({ open: false }) } }
            onOpen={ () => { this.setState({ open: true }) } }
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: 10 }}>
            
              <Autocomplete
                size="small"
                options={this.state.full_menu}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => {
                  if( newValue ){
                    window.location.pathname = "/"+newValue.key_query+"/";
                  }
                }}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Поиск" variant="outlined" />}
              />
              
              <IconButton onClick={this.handleDrawerClose.bind(this)}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            
            { this.state.menu.map( (item, key) =>
              <Accordion key={key} >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{ item.parent.name }</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  
                  <List style={{ width: '100%' }}>
                  
                    { item.chaild.map( (it, k) =>
                      <ListItem button key={k}>
                        <Link to={"/"+it.key_query+"/"}>
                          <ListItemText primary={ it.name } />
                        </Link>
                      </ListItem>
                    ) }
                  
                  </List>
                  
                </AccordionDetails>
              </Accordion>
            ) }

            

            <Accordion>
              <AccordionSummary onClick={this.logOut.bind(this)}>
                <Typography>Выйти из аккаунта</Typography>
              </AccordionSummary>
            </Accordion>

          </SwipeableDrawer>
        </React.Fragment>
        
        
        
      </>
    )
  }
}

function Status({ code, children }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) staticContext.status = code;
        return children;
      }}
    />
  );
}

export function NotFound() {
  return (
    <Status code={404}>
        <Grid container className="Contact mainContainer MuiGrid-spacing-xs-3" style={{ marginTop: 64 }}>
            <Grid item xs={12}>
                <Typography variant="h5" component="h1">404 Страница не найдена</Typography>
            </Grid>
            
        </Grid>
    </Status>
  );
}

export function App () {
    let history = useLocation();
    let check_header = true;
    
    if( 
      history.pathname == '/auth/' || 
      history.pathname == '/auth' || 
      history.pathname == '/registration/' ||
      history.pathname == '/registration'
    ){
      check_header = false;
    }
    
    return (
      <ThemeProvider theme={theme}>
        <div>
          { !check_header ? null :
            <>
              <CssBaseline />
              <Header />
            </>
          }
          <main style={{flexGrow: 1, overflow: 'auto'}}>
            <Container maxWidth={false} style={{ marginTop: 80 }}>
          
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  
                  <Route path={'/'} exact={ true } element={ <Home /> } />
                  <Route path={'/auth'} exact={ true } element={ <Auth /> } />
                  <Route path={'/registration'} exact={ true } element={ <Reg /> } />

                  <Route path={'/live_orders'} exact={ true } element={ <LiveOrders /> } />
                  <Route path={'/events'} exact={ true } element={ <Events /> } />
                  <Route path={'/ras_by_bill'} exact={ true } element={ <RasByBill /> } />
                  <Route path={'/category_items'} exact={ true } element={ <CategoryItems /> } />
                  <Route path={'/vendor_module'} exact={ true } element={ <VendorModule /> } />

                  <Route path={'/vendor_item_price'} exact={ true } element={ <VendorItemPrice /> } />
                  <Route path={'/tender'} exact={ true } element={ <Tender /> } />
                  <Route path={'/revizion'} exact={ true } element={ <Revizion /> } />
                  <Route path={'/revizion/new'} exact={ true } element={ <RevizionNew /> } />
                  <Route path={'/work_schedule'} exact={ true } element={ <WorkSchedule /> } />
                  <Route path={'/site_sale_2'} exact={ true } element={ <SiteSale2 /> } />
                  <Route path={'/site_sale_2/new'} exact={ true } element={ <SiteSale2_New /> } />
                  <Route path={'/site_sale_2/edit/:promoId'} exact={ true } element={ <SiteSale2_Edit /> } />
                  <Route path={'/site_sale_2/stat'} exact={ true } element={ <SiteSale2_Stat /> } />
                  <Route path={'/site_sale_2/stat_list'} exact={ true } element={ <SiteSale2_StatList /> } />
                  <Route path={'/site_sale_2/analitic_list'} exact={ true } element={ <SiteSale2_AnaliticList /> } />
                  <Route path={'/site_page_text'} exact={ true } element={ <SitePageText /> } />

                  <Route path={'/drive_map_stat_all'} exact={ true } element={ <DriveMapStatAll /> } />
                  <Route path={'/driver_stat'} exact={ true } element={ <DriverStat /> } />
                  <Route path={'/concenter'} exact={ true } element={ <Concenter /> } />
                  <Route path={'/socialnetwork'} exact={ true } element={ <SocialNetwork /> } />
                  <Route path={'/cat_work'} exact={ true } element={ <CatWork /> } />
                  <Route path={'/option_to_win'} exact={ true } element={ <OptionToWin /> } />
                  <Route path={'/cities_modules'} exact={ true } element={ <CitiesModules /> } />
                  <Route path={'/zone_modules'} exact={ true } element={ <ZoneModules /> } />
                  <Route path={'/app_per_h'} exact={ true } element={ <AppPerH /> } />
                  <Route path={'/cafe_dir_edit'} exact={ true } element={ <CafeDirEdit/> } />

                  <Route path={'/app_work_point'} exact={ true } element={ <AppWorkPoint /> } />
                  <Route path={'/app_work'} exact={ true } element={ <AppWork /> } />
                  <Route path={'/app_work_show'} exact={ true } element={ <AppWorkShow /> } />
                  <Route path={'/site_stat_marc'} exact={ true } element={ <SiteStatMarc /> } />
                  <Route path={'/advertising_company'} exact={ true } element={ <AdvertisingCompany /> } />

                  <Route path={'/ras_bill_and_cook'} exact={ true } element={ <RasBillAndCook /> } />
                  <Route path={'/sklad_items_module'} exact={ true } element={ <SkladItemsModule /> } />
                  <Route path={'/site_user_manager'} exact={ true } element={ <SiteUserManager /> } />
                  <Route path={'/promo_items_stat'} exact={ true } element={ <PromoItemsStat /> } />
                  <Route path={'/site_items'} exact={ true } element={ <SiteItems /> } />

                  <Route path={'/hot_map'} exact={ true } element={ <HotMap /> } />
                  <Route path={'/site_sale_min'} exact={ true } element={ <SiteSaleMin /> } />
                  <Route path={'/site_sale_min/new'} exact={ true } element={ <SiteSaleMin_New /> } />
                  <Route path={'/site_sale_min/edit/:promoId'} exact={ true } element={ <SiteSaleMin_Edit /> } />
                  <Route path={'/site_sale_min/stat_list'} exact={ true } element={ <SiteSaleMin_StatList /> } />
                  <Route path={'/stat_err_cash'} exact={ true } element={ <StatErrCash /> } />
                  <Route path={'/close_buy'} exact={ true } element={ <CloseBuy /> } />
                  <Route path={'/polufabricat_module'} exact={ true } element={ <PolufabricatModule /> } />
                  <Route path={'/check_works'} exact={ true } element={ <Checkworks /> } />

                  <Route path={'/show_cook'} exact={ true } element={ <ShowCook /> } />
                  <Route path={'/cafe_upr_edit'} exact={ true } element={ <СafeUprEdit /> } />
                  <Route path={'/check_check'} exact={ true } element={ <CheckCheck /> } />
                  <Route path={'/count_users'} exact={ true } element={ <CountUsers /> } />

                  <Route path={'/fines'} exact={ true } element={ <Fines /> } />
                  <Route path={'/fines_err'} exact={ true } element={ <FinesErr /> } />

                  <Route path={'/event_time_1'} exact={ true } element={ <EventTime1 /> } />
                  <Route path={'/recept_module'} exact={ true } element={ <ReceptModule /> } />
                  <Route path={'/order_post_rec'} exact={ true } element={ <OrderPostRec /> } />
                  
                  <Route path={'/list_fake_users'} exact={ true } element={ <ListFakeUsers /> } />

                  <Route
                    component={ () =>
                      <Status code={404}>
                        <Grid container className="Contact mainContainer MuiGrid-spacing-xs-3" style={{ marginTop: 64 }}>
                          <Grid item xs={12}>
                            <Typography variant="h5" component="h1">404 Страница не найдена</Typography>
                          </Grid>
                        </Grid>
                      </Status>
                    }
                  />

                </Routes>
              </Suspense>

            </Container>
          </main>
        </div>
      </ThemeProvider>
    );
}
