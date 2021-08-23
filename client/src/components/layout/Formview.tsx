import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import MUIDataTable,{FilterType,Responsive} from "mui-datatables";
import Alert from "@material-ui/lab/Alert";
import { FormHelperText, Snackbar, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import { getAllRecords,deleteFormRecord } from "../../actions/feeding";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { CLEAR_MESSAGE } from "../../actions/types";

interface optioninterface{
  filter: boolean,
    filterType: FilterType,
    responsive:Responsive,
    tableBodyHeight:string,
}
const useStyles = makeStyles((theme) => ({
  
  checkboxcolor: {
    color: "#2196f3",
    
  },
  errormsg: {
    color: "#f44336",
  },
  container:{
    marginTop: theme.spacing(12),
    marginRight:theme.spacing(1),
    marginLeft:theme.spacing(1),

  },disabledButton: {
    color: "#2196f3"
  },bodycontainer: {
    marginTop: theme.spacing(3),
  }
}));


const Formview: React.FC = () => {
  const { records } = useSelector((state: any) => state.records);
  const dispatch = useDispatch();
  const [data, setdata] = useState([[]] as any);
  const classes = useStyles();
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state: any) => state.message);
  const auth = useSelector((state: any) => state.auth);
  const user = Object.keys(auth.user).length > 0 ? auth.user : {};
  const isAdmin = Object.keys(user).length > 0 && user.isadmin;
  const columns = ["Number of Ducks Fed","Quantity of Food Fed (in lbs)", "Food Given", "Food Category","Place of Feeding","Time of Fed","Daily insert of this record","Delete Record"];
  useEffect(() => {
    let recordsArray=[]
    for (const key of Object.keys(records)) {
      const value = records[key]
        let recordArr=[value.ducks_count,value.food_quantity,value.food,value.food_type,value.place_fed,value.time_fed,
          value.autoschedule_enable?<ToggleOnIcon className={classes.checkboxcolor} fontSize="large"/>:<ToggleOffIcon  fontSize="large"/>,
          <DeleteForeverIcon fontSize="large" onClick={(e)=>{dispatch(deleteFormRecord(value._id))}}
          />]
        recordsArray.push(recordArr)
      };
      setdata(recordsArray)
      console.log('console::here')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records])
  useEffect(() => {
    dispatch(getAllRecords())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (message !== undefined && message === "Record Deleted Successfully") {
      setSuccessful(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);
  const handleClose=()=>{
    dispatch({
      type: CLEAR_MESSAGE,
    });
  }
  const options:optioninterface = {
    filter: true,
    filterType: 'dropdown',
    responsive:'standard',
    tableBodyHeight:"600px",
  };

  if (isAdmin) {
    return <Redirect to="/dashboard" />;
  }
  return (<Container component="main" className={classes.bodycontainer} >
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
  
  <Grid className={classes.container}>

<MUIDataTable
        title={"Records"}
        data={data}
        columns={columns}
        options={options}
      />
  </Grid>
  </Container>)
}
    
export default Formview;