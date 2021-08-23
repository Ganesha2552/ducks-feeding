import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { FormHelperText, Snackbar, Switch } from "@material-ui/core";
import { CLEAR_MESSAGE } from "../../actions/types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CountryType, countries } from "../../common/countryData";
import DateFnsUtils from "@date-io/date-fns";
import useForm from './useForm';
import validate from './validateForm';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#419BE4",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#2196f3",
    color: "#fafafa",
    "&:hover": {
      backgroundColor: "#419BE4",
      color: "#ffffff",
    },
  },
  checkboxcolor: {
    color: "#2196f3",
  },
  errormsg: {
    color: "#f44336",
  },
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));

const Landing: React.FC = () => {
  // const todayDate = new Date(new Date().toString().split("GMT")[0] + " UTC")
  //   .toISOString()
  //   .split(".")[0];
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [successful, setSuccessful] = useState(false);
  const classes = useStyles();
  const auth = useSelector((state: any) => state.auth);
  const { message } = useSelector((state: any) => state.message);
  const dispatch = useDispatch();
  const { handleChange, handleSubmit, values, errors } = useForm(validate);
  const user = Object.keys(auth.user).length > 0 ? auth.user : {};
  const isAdmin = Object.keys(user).length > 0 && user.isadmin;
  useEffect(() => {
    if (message !== undefined && message === "Entry added Successfully") {
      setSuccessful(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  

  const handleClose=()=>{
    dispatch({
      type: CLEAR_MESSAGE,
    });
  }

  const handleDateChange = (date: Date | null ) => {
    setSelectedDate(date)
    const min= date?.getMinutes();
    const hrs=date?.getHours();
    handleChange(((((hrs!==undefined && hrs < 10) ? '0' : '') + hrs)+':'+((min!==undefined && min < 10) ? '0' : '') + min),'time_fed')

  };
  if (isAdmin) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Snackbar
        open={message !== undefined && message !== ""}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        key="top"
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={!successful ? "error" : "success"}
        >
          {message}
        </Alert>
      </Snackbar>

      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Survey Form
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="ducks_count"
                name="ducks_count"
                variant="outlined"
                required
                fullWidth={true}
                id="ducks_count"
                label="Number of ducks fed"
                autoFocus
                value={values.ducks_count}
                onChange={(e) => handleChange(e, "ducks_count")}
                error={errors.ducks_count !== ""}
                helperText={
                  <span className={classes.errormsg}>{errors.ducks_count}</span>
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth={true}
                id="food_quantity"
                label="Quantity of food fed"
                name="food_quantity"
                autoComplete="food_quantity"
                onChange={(e) => handleChange(e, "food_quantity")}
                value={values.food_quantity}
                error={errors.food_quantity !== ""}
                helperText={
                  <span className={classes.errormsg}>
                    {errors.food_quantity}
                  </span>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth={true}
                id="food"
                label="Food Name"
                name="food"
                autoComplete="food"
                onChange={(e) => handleChange(e, "food")}
                error={errors.food !== ""}
                helperText={
                  <span className={classes.errormsg}>{errors.food}</span>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="food_type"
                options={[
                  "Grains",
                  "Fruits",
                  "Seeds & Nuts",
                  "Vegetables",
                  "Other",
                ]}
                getOptionLabel={(food_type) => food_type}
                onChange={(e) => handleChange(e, "food_type")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Type of Food"
                    variant="outlined"
                    error={errors.food_type !== ""}
                    helperText={
                      <span className={classes.errormsg}>{errors.food_type}</span>
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="place_fed"
                options={countries as CountryType[]}
                classes={{
                  option: classes.option,
                }}
                onChange={(e) => handleChange(e, "place_fed")}
                autoHighlight
                getOptionLabel={(option) => option.label}
                // renderOption={(option) => (
                //   <React.Fragment>
                //     <span>{countryToFlag(option.code)}</span>
                //     {option.label}
                //   </React.Fragment>
                // )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Place of Feeding"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                    error={errors.place_fed !== ""}
                    helperText={
                      <span className={classes.errormsg}>{errors.place_fed}</span>
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time_fed"
                  label="Time of Fed"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                error={errors.time_fed !== ""}
                helperText={
                  <span className={classes.errormsg}>{errors.time_fed}</span>
                }
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, "autoschedule_enable")
                    }
                    color="primary"
                    name="autoschedule_enable"
                    className={classes.checkboxcolor}
                  />
                }
                label="Enable dialy automatic insert of this record"
              />
              <FormHelperText>
                Note: This will auto push this record daily
              </FormHelperText>
              {errors.autoschedule_enable && (
                <FormHelperText className={classes.errormsg}>
                  {errors.autoschedule_enable}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth={true}
            variant="contained"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Submit Record
          </Button>
         
        </form>
      </div>
    </Container>
  );
  
};

export default Landing;
