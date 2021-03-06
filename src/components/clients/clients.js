import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import axios from 'axios';

import { CLIENTS } from '../../constants/url';
import { CARS, CLIENTS_CREATE } from '../../constants/routes';
import styles from './styles';

class Clients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: []
    };
  };
  
  componentDidMount(){
    axios.get(CLIENTS)
    .then( response => {
        this.setState({ clients: response.data  });
    }).catch( err => {
      console.log(err);
    })
  }
  
  goBack = () => {
    this.props.history.goBack();
  }
  
  gotoCars = (id) => {
    this.props.history.push(CARS.replace(':idClient', id));
  }
  
  gotoAdd = () => {
    this.props.history.push(CLIENTS_CREATE);
  }
  
  render() {
    const { classes } = this.props;
    const { clients } = this.state;
    return (
      <Grid container>
        <Grid container className={classes.item}>
          <Grid item xs={6} sm={6}>
            <Grid container justify="flex-start">
              <Typography variant="h5">
                Client list
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Grid container justify="flex-end">
              <Button variant="contained" color="primary" onClick={this.gotoAdd}>
                Add
              </Button>
              <Button variant="contained" color="primary" className={classes.marginButton} onClick={this.goBack}>
                Go Back
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>RUT</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell component="th" scope="row">
                    {client.id}
                  </TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.rut}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>
                    <Button onClick={() => this.gotoCars(client.id)}>
                      <DirectionsCarIcon/>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    );
  }
}

export default withStyles(styles)(Clients);
