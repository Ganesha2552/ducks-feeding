import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import useLogin from "./useLogin";
import validate from "./validateLogin";
import { CLEAR_MESSAGE } from "../../actions/types";
import { history } from "../../helpers/history";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#419BE4",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#2196f3',
    color:'#fafafa',
    "&:hover": {
      backgroundColor: "#419BE4",
      color:"#ffffff"
    }
  },
  checkboxcolor:{
    color:'#2196f3',
   
  },
  errormsg: {
    color: "#f44336",
  },
 
}));

export default function Login() {
  const classes = useStyles();
  const [successful, setSuccessful] = useState(false);
  const { handleChange, handleSubmit, values, errors } = useLogin(validate);

  const { message } = useSelector((state: any) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    if (message !== undefined && message === "Login Successful!") {
      setSuccessful(true);
      setTimeout(() => {
        history.push("/")
        window.location.reload();
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth={true}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={values.email}
                onChange={(e) => handleChange(e, "email")}
                error={errors.email !== ""}
                helperText={
                  <span className={classes.errormsg}>{errors.email}</span>
                }
          />
          <TextField
            variant="outlined"
            margin="normal"
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
          <FormControlLabel
            control={<Checkbox value="remember" className={classes.checkboxcolor} color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth={true}
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}