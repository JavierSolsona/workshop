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
import { GET_ALL_REPARATIONS } from '../../constants/url';
import axios from "axios";
import { HOME } from '../../constants/routes';
import Button from '@material-ui/core/Button';

class ReparationsListByDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repataions: []
    };  
  };
  
  goToHome = () => {
    this.props.history.push(HOME);
  }
  
  componentDidMount(){
    axios.get(GET_ALL_REPARATIONS)
    .then( response => {
        this.setState({ repataions: response.data  });
    }).catch( err => {
      console.log(err);
    })
  } 
  
  render() {
    const { classes } = this.props;
    const { repataions } = this.state;
    return (
      <Grid container>
        <Grid item xs={12} sm={12} className={classes.item} justify="space-between">
          <Typography variant="h5">
            Reparations list order by date
          </Typography>
            <Button variant="contained" color="primary" onClick={this.goToHome}>
              Go Back
            </Button>
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
              {repataions.map((reparation) => (
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

export default withStyles(styles)(ReparationsListByDate);
