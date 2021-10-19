import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
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

import { NavLink as Link, Switch, Route, Redirect } from 'react-router-dom';

import { useHistory } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import routes from '../../../server/routes';

const queryString = require('query-string');

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

const drawerWidth = 300;

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});


class Header extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      
      module: 'header',
      
      open: false,
      menu: [],
      full_menu: [],
      
      left: false
    };
  }
  
  async componentDidMount(){
    
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
        this.state.history.push("/");
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
  
  render(){
    return (
      <>
        <AppBar className={clsx(this.state.classes.appBar, this.state.open && this.state.classes.appBarShift)}>
          <Toolbar className={this.state.classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen.bind(this)}
              className={clsx(this.state.classes.menuButton, this.state.open && this.state.classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={this.state.classes.title}>
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
            <div className={this.state.classes.toolbarIcon}>
            
              <Autocomplete
                size="small"
                options={this.state.full_menu}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => {
                  if( newValue ){
                    this.state.history.push("/"+newValue.key_query+"/");
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
                  <Typography className={this.state.classes.heading}>{ item.parent.name }</Typography>
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
    const classes = useStyles();
    let history = useHistory();
    
    let check_header = true;
    
    if( 
      history.location.pathname == '/auth/' || 
      history.location.pathname == '/auth' || 
      history.location.pathname == '/registration/' ||
      history.location.pathname == '/registration'
    ){
      check_header = false;
    }
    
    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          { !check_header ? null :
            <>
              <CssBaseline />
              <Header classes={classes} history={history} />
            </>
          }
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth={false} className={classes.container}>
        
              <Switch>
                { routes.map( (item, key) =>
                  <Route
                    key={key}
                    path={item.path}
                    exact={ item.exact }
                    component={ item.component }
                  />
                ) }
                
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
              </Switch>
        
            </Container>
          </main>
        </div>
      </ThemeProvider>
    );
}