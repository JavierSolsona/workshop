import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { REPARATIONS } from '../../constants/url';
import axios from "axios";
import Button from '@material-ui/core/Button';

class Reparations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reparations: []
    };  
  };
  
  componentDidMount(){
    axios.get(REPARATIONS + "/" + this.props.match.params.idCar)
    .then( response => {
        this.setState({ reparations: response.data  });
    }).catch( err => {
      console.log(err);
    })
  }
  
  goBack = () => {
    this.props.history.goBack();
  }
  
  render() {
    const { classes } = this.props;
    const { reparations } = this.state;
    return (
      <Grid container>        
        <Grid container className={classes.item}>
          <Grid item xs={6} sm={6}>
            <Grid container justify="flex-start">
              <Typography variant="h5">
                Reparations list
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Grid container justify="flex-end">
              <Button variant="contained" color="primary" onClick={this.goBack}>
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
                <TableCell>Date</TableCell>
                <TableCell>Car Plate</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reparations.map((reparation) => (
                <TableRow key={reparation.id}>
                  <TableCell component="th" scope="row">
                    {reparation.id}
                  </TableCell>
                  <TableCell>{reparation.date}</TableCell>
                  <TableCell>{reparation.Car.plate}</TableCell>
                  <TableCell>{reparation.description}</TableCell>
                  <TableCell>{reparation.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    );
  }
}

export default withStyles(styles)(Reparations);
