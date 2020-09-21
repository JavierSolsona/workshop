import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import { REPARATIONS } from '../../constants/url';
import axios from 'axios';
import qs from 'qs';

class Create extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      price: '',
      date: ''
    };  
  };
  
  goBack = () => {
    this.props.history.goBack();
  }
  
  handleSubmit = () => {
    const { description, price, date } = this.state;
    axios.post(REPARATIONS  + "/" + this.props.match.params.idCar,
        qs.stringify({
            'description':description,
            'price' : price,
            'date': date
        })
    ).then( () => {
        alert('Success');
        this.setState({
          description: '',
          price: '',
          date: ''
        });
    }).catch( err => {
        console.log(err);
    })
  }
  
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value  });
  }

  render() {
    const { classes } = this.props;
    return (
      <ValidatorForm
         ref="form"
         onSubmit={this.handleSubmit}
         className={classes.form}
      >
         <Grid container className={classes.item}>
           <Grid item xs={6} sm={6}>
             <Grid container justify="flex-start">
               <Typography variant="h5">
                 Insert Reparation Data
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
         <Grid container spacing={6}>
           <Grid item xs={12} sm={6}>
             <TextValidator
                 label="Date"
                 onChange={this.handleChange}
                 name="date"
                 value={this.state.date}
                 validators={['required']}
                 errorMessages={["This field is required"]}
                 fullWidth
                 InputLabelProps={{required: true, shrink: true}}
                 variant="outlined"
                 type="date"
             />
           </Grid>
           <Grid item xs={12} sm={6}>
             <TextValidator
                 label="Price"
                 onChange={this.handleChange}
                 name="price"
                 value={this.state.price}
                 validators={['required']}
                 errorMessages={["This field is required"]}
                 fullWidth
                 InputLabelProps={{required: true}}
                 variant="outlined"
             />
           </Grid>
           <Grid item xs={12} sm={6}>
             <TextValidator
                 label="Description"
                 onChange={this.handleChange}
                 name="description"
                 value={this.state.description}
                 validators={['required']}
                 errorMessages={["This field is required"]}
                 fullWidth
                 InputLabelProps={{required: true}}
                 variant="outlined"
                 multiline
                 rows={4}
                 rowsMax={4}
             />
           </Grid>
         </Grid>
         <Grid container justify="center" className={classes.submitContainer}>
           <Button variant="contained" color="primary" type="submit">Submit</Button>
         </Grid>
      </ValidatorForm>
    );
  }
}

export default withStyles(styles)(Create);
