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
      <Grid container alignItems="center" className={classes.container}>
        <Grid item xs={12} sm={6} className={classes.item}>
          <Grid container direction="row-reverse">
            <Button variant="contained" color="primary" className={classes.button} onClick={this.goToClients}>
              Clients
            </Button>
          </Grid>
        </Grid>
         <Grid item xs={12} sm={6} className={classes.item}>
           <Grid container direction="row">
            <Button variant="contained" color="primary" className={classes.button} onClick={this.goToReparations}>
              Reparations
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
