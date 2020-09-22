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
import BuildIcon from '@material-ui/icons/Build';
import axios from 'axios';

import styles from './styles';
import { CARS } from '../../constants/url';
import { REPARATIONS, CARS_CREATE } from '../../constants/routes';

class Cars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: []
    };  
  };
  
  componentDidMount(){
    axios.get(CARS + "/" + this.props.match.params.idClient)
    .then( response => {
        this.setState({ cars: response.data  });
    }).catch( err => {
      console.log(err);
    })
  }
  
  goBack = () => {
    this.props.history.goBack();
  }
  
  gotoReparations = (id) => {
    this.props.history.push(REPARATIONS.replace(':idCar', id));
  }
  
  gotoAdd = () => {
    this.props.history.push(CARS_CREATE.replace(':idClient', this.props.match.params.idClient));
  }
  
  render() {
    const { classes } = this.props;
    const { cars } = this.state;
    return (
      <Grid container>
        <Grid container className={classes.item}>
          <Grid item xs={6} sm={6}>
            <Grid container justify="flex-start">
              <Typography variant="h5">
                Car list
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
                <TableCell>Client</TableCell>
                <TableCell>Plate</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell component="th" scope="row">
                    {car.id}
                  </TableCell>
                  <TableCell>{car.Client.name}</TableCell>
                  <TableCell>{car.plate}</TableCell>
                  <TableCell>{car.brand}</TableCell>
                  <TableCell>{car.color}</TableCell>
                  <TableCell>
                    <Button onClick={() => this.gotoReparations(car.id)}>
                      <BuildIcon/>
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

export default withStyles(styles)(Cars);
