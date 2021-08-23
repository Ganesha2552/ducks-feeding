/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container:{
    marginTop: theme.spacing(12),
    width:'100%',
    height:'100vh'


  },iframestyle:{
    width:'100%',
    height:'100%'
  }
}));
const Dashboard:React.FC=()=>{
  const classes = useStyles();

  return (
    <Grid className={classes.container} xs={12} >
    <iframe className={classes.iframestyle} src="https://analytics.zoho.com/open-view/2392865000000007976"></iframe>        

    </Grid>


    );
}

  
  export default Dashboard;