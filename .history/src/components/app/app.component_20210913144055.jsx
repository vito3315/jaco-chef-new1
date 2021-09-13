import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinkIcon from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { NavLink as Link, Switch, Route, Redirect } from 'react-router-dom';

import { useHistory } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <LinkIcon color="inherit" href="https://material-ui.com/">
        Your Website
      </LinkIcon>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
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
}));

class Header extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      
      module: 'header',
      
      open: false,
      menu: [],
      full_menu: []
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
        
        <Drawer
          variant="persistent"
          classes={{
            paper: clsx(this.state.classes.drawerPaper, !this.state.open && this.state.classes.drawerPaperClose),
          }}
          open={this.state.open}
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
        
        </Drawer>
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
    
    console.log( 'history', history.location.pathname )
    
    let check_header = true;
    
    if( history.location.pathname == '/auth/' ){
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
        
              { !check_header ? null :
                <Box pt={4}>
                  <Copyright />
                </Box>
              }
            </Container>
          </main>
        </div>
      </ThemeProvider>
    );
}