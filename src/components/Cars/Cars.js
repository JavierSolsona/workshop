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
import { CARS } from '../../constants/url';
import { REPARATIONS } from '../../constants/routes';
import axios from "axios";
import Button from '@material-ui/core/Button';
import BuildIcon from '@material-ui/icons/Build';

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
  
  gotoReparations(id){
    this.props.history.push(REPARATIONS.replace(':idCar', id));
  }
  
  render() {
    const { classes } = this.props;
    const { cars } = this.state;
    return (
      <Grid container>
        <Grid item xs={12} sm={12} className={classes.item} justify="space-between">
          <Typography variant="h5">
            Car list
          </Typography>
          <Button variant="contained" color="primary" onClick={this.goBack}>
            Go Back
          </Button>
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
