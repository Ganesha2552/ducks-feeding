import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import validate from "./validateRegister";
import useRegister from "./useRegister";
import Alert from "@material-ui/lab/Alert";
import { FormHelperText, Snackbar } from "@material-ui/core";
import { CLEAR_MESSAGE } from "../../actions/types";
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
}));

export default function Register() {
  const classes = useStyles();
  const [successful, setSuccessful] = useState(false);
  const { handleChange, handleSubmit, values, errors } = useRegister(validate);

  const { message } = useSelector((state: any) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    if (message !== undefined && message === "Registration Successful!") {
      setSuccessful(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
  }, [message]);
  const handleClose=()=>{
    dispatch({
      type: CLEAR_MESSAGE,
    });
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      
        <Snackbar open={message !== undefined && message !== ""} autoHideDuration={6000} anchorOrigin={{vertical:"top",horizontal:"right"}} key="top" onClose={handleClose}>
        <Alert onClose={handleClose} severity={!successful ? "error" : "success"}>
        {message}
        </Alert>
      </Snackbar>
       

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth={true}
                id="firstName"
                label="First Name"
                autoFocus
                value={values.fname}
                onChange={(e) => handleChange(e, "fname")}
                error={errors.fname !== ""}
                helperText={
                  <span className={classes.errormsg}>{errors.fname}</span>
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth={true}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => handleChange(e, "lname")}
                value={values.lname}
                error={errors.lname !== ""}
                helperText={
                  <span className={classes.errormsg}>{errors.lname}</span>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth={true}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => handleChange(e, "email")}
                error={errors.email !== ""}
                helperText={
                  <span className={classes.errormsg}>{errors.email}</span>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth={true}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => handleChange(e, "password")}
                error={errors.password !== ""}
                helperText={
                  <span className={classes.errormsg}>{errors.password}</span>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth={true}
                name="password2"
                label="Retype password"
                type="password"
                id="password"
                autoComplete="password"
                onChange={(e) => handleChange(e, "password2")}
                error={errors.password2 !== ""}
                helperText={
                  <span className={classes.errormsg}>{errors.password2}</span>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="terms"
                    className={classes.checkboxcolor}
                    onChange={(e) => handleChange(e, "terms")}
                    color="primary"
                   
                  />
                }
                
                label="I Agree to the Terms &amp; Conditions"
              />
              {errors.terms &&<FormHelperText className={classes.errormsg}>{errors.terms}</FormHelperText>}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth={true}
            variant="contained"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
