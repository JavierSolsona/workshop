import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import { CLIENTS } from '../../constants/url';
import axios from 'axios';
import qs from 'qs';

class Create extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      rut: '',
      email: ''
    };  
  };
  
  goBack = () => {
    this.props.history.goBack();
  }
  
  handleSubmit = () => {
    const { name, rut, email } = this.state;
    axios.post(CLIENTS,
        qs.stringify({
            'name':name,
            'rut' : rut,
            'email': email
        })
    ).then( () => {
        alert('Success');
        this.setState({
          name: '',
          rut: '',
          email: ''
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
                 Insert Client Data
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
                 label="Name"
                 onChange={this.handleChange}
                 name="name"
                 value={this.state.name}
                 validators={['required']}
                 errorMessages={["This field is required"]}
                 fullWidth
                 InputLabelProps={{required: true}}
                 variant="outlined"
             />
           </Grid>
           <Grid item xs={12} sm={6}>
             <TextValidator
                 label="Rut"
                 onChange={this.handleChange}
                 name="rut"
                 value={this.state.rut}
                 validators={['required']}
                 errorMessages={["This field is required"]}
                 fullWidth
                 InputLabelProps={{required: true}}
                 variant="outlined"
             />
           </Grid>
           <Grid item xs={12} sm={6}>
             <TextValidator
                 label="Email"
                 onChange={this.handleChange}
                 name="email"
                 value={this.state.email}
                 validators={['required', 'isEmail']}
                 errorMessages={["This field is required", "Email not valid"]}
                 fullWidth
                 InputLabelProps={{required: true}}
                 variant="outlined"
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
