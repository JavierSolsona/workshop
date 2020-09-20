import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { CLIENTS, REPARATIONS_LIST } from '../../constants/routes';

class Home extends React.Component {
  
  goToClients = () => {
    this.props.history.push(CLIENTS);
  }
  
  goToReparations = () => {
    this.props.history.push(REPARATIONS_LIST);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" onClick={this.goToClients}>
            Clients
        </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" onClick={this.goToReparations}>
            Reparations
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
