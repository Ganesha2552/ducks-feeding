import React from "react";
import { logout } from "../../actions/auth";
import { makeStyles } from "@material-ui/core/styles";
import {  useSelector,useDispatch } from "react-redux";

import logo from "../../images/logo/logo192.png";
import { AppBar, Tab, Tabs, Toolbar } from "@material-ui/core";
import { isMobile } from "react-device-detect";
import ListAltIcon from "@material-ui/icons/ListAlt";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import DashboardIcon from "@material-ui/icons/Dashboard";
const Navbar: React.FC = () => {
  const useStyles = makeStyles({
    logo: {
      maxWidth: 40,
    },
    appbar: {
      backgroundColor: "#4791db",
      color: "#fafafa",
    },
    tabs: {
      marginLeft: "auto",
    },
    tabstyle: {
      fontSize: "12px",
    },
    mobilelogotext: {
      fontSize: "10px",
    },
    mobiletoolbar: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  });
  const dispatch = useDispatch();

  const onLogoutClick = (e:any) => {
    e.preventDefault();
    dispatch(logout());
  };
  const classes = useStyles();
  const auth = useSelector((state: any) => state.auth);
  const user = Object.keys(auth.user).length > 0 ? auth.user : {};
  const isAdmin = Object.keys(user).length > 0 && user.isadmin;
  const isAuthenticated = Object.keys(user).length > 0;
  
  const [value, setValue] = React.useState(window.location.pathname.split('/')[1]);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    if(['dashboard','formfeed','formview'].indexOf(newValue)>0){
      setValue(newValue);
         window.location.href="/"+newValue
    }else{
      window.location.href="/";
    }
  };
  if (!isMobile) {
    if (isAuthenticated) {
      if (isAdmin) {
        return (
          <AppBar className={classes.appbar}>
            <Tabs value={value} onChange={handleChange}>
              <Toolbar>
                <img src={logo} alt="Duck Research" className={classes.logo} />{" "}
                <h2>Duck Feeding Research</h2>
              </Toolbar>

              <Tab
                label={
                  <div>
                    <DashboardIcon />
                    <div>Dashboard</div>
                  </div>
                }
                className={classes.tabs}
                value={'dashboard'}
              />
              <Tab
                label={
                  <div>
                    <PowerSettingsNewIcon />
                    <div>Logout</div>
                  </div>
                }
                onClick={onLogoutClick}
              />
            </Tabs>
          </AppBar>
        );
      } else {
        return (
          <AppBar className={classes.appbar}>
            <Tabs value={value} onChange={handleChange} className="">
              <Toolbar>
                <img src={logo} alt="Duck Research" className={classes.logo} />{" "}
                <h2>Duck Feeding Research</h2>
              </Toolbar>

              <Tab
                className={classes.tabs}
                label={
                  <div>
                    <ListAltIcon />
                    <div>Form</div>
                  </div>
                }
                value={'formfeed'}
              ></Tab>

              <Tab
                label={
                  <div>
                    <LibraryBooksIcon />
                    <div>Records</div>
                  </div>
                }
                value={"formview"}
              />
              <Tab
                label={
                  <div>
                    <PowerSettingsNewIcon />
                    <div>Logout</div>
                  </div>
                }
                onClick={onLogoutClick}
              />
            </Tabs>
          </AppBar>
        );
      }
    } else {
      return (
        <AppBar className={classes.appbar}>
          <Toolbar>
            <img src={logo} alt="Duck Research" className={classes.logo} />{" "}
            <h2>Duck Feeding Research</h2>
          </Toolbar>
        </AppBar>
      );
    }
  } else {
    if (isAuthenticated) {
      if (isAdmin) {
        return (
          <AppBar className={classes.appbar}>
            <Tabs value={value} onChange={handleChange} className="">
              <Toolbar className={classes.mobiletoolbar}>
                <div>
                  <img
                    src={logo}
                    alt="Duck Research"
                    className={classes.logo}
                  ></img>
                  <div className={classes.mobilelogotext}>
                    Duck Feeding Research
                  </div>
                </div>
              </Toolbar>

              <Tab
                label={
                  <div>
                    <DashboardIcon />
                    <div className={classes.tabstyle}>Dashboard</div>
                  </div>
                }
                value={'dashboard'}
              ></Tab>

              <Tab
                label={
                  <div>
                    <PowerSettingsNewIcon />
                    <div className={classes.tabstyle}>Logout</div>
                  </div>
                }
                onClick={onLogoutClick}
              />
            </Tabs>
          </AppBar>
        );
      } else {
        return (
          <AppBar className={classes.appbar}>
            <Tabs value={value} onChange={handleChange} className="">
              <Toolbar className={classes.mobiletoolbar}>
                <div>
                  <img
                    src={logo}
                    alt="Duck Research"
                    className={classes.logo}
                  ></img>
                  <div className={classes.mobilelogotext}>
                    Duck Feeding Research
                  </div>
                </div>
              </Toolbar>

              <Tab
                label={
                  <div>
                    <ListAltIcon />
                    <div className={classes.tabstyle}>Form</div>
                  </div>
                }
                value={"formfeed"}
              ></Tab>

              <Tab
                label={
                  <div>
                    <LibraryBooksIcon />
                    <div className={classes.tabstyle}>Records</div>
                  </div>
                }
                value={"formview"}
              />
              <Tab
                label={
                  <div>
                    <PowerSettingsNewIcon />
                    <div className={classes.tabstyle}>Logout</div>
                  </div>
                }
                onClick={onLogoutClick}
              />
            </Tabs>
          </AppBar>
        );
      }
    } else {
      return (
        <AppBar className={classes.appbar}>
          <Toolbar className={classes.mobiletoolbar}>
            <div>
              <img
                src={logo}
                alt="Duck Research"
                className={classes.logo}
              ></img>
              <div className={classes.mobilelogotext}>
                Duck Feeding Research
              </div>
            </div>
          </Toolbar>
        </AppBar>
      );
    }
  }
};

export default Navbar;
