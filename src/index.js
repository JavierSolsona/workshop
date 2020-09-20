import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { ThemeProvider } from '@material-ui/styles';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';
import  history from './history';
import theme from './styles/theme.js';
import { HOME, CLIENTS, REPARATIONS_LIST } from './constants/routes';
import Home from './components/Home';
import Clients from './components/Clients/Clients';
import ReparationsListByDate from './components/Reparations/ReparationsListByDate';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router history={history}>
      <React.Fragment>
        <Switch>
          <Route exact path={HOME} component={Home}/>
          <Route exact path={CLIENTS} component={Clients}/>
          <Route exact path={REPARATIONS_LIST} component={ReparationsListByDate}/>
        </Switch>
      </React.Fragment>
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
