import React, { useState } from "react";
import { useHistory } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const NavBar = () => {
  const history = useHistory();

  const handleChange = (e, newValue) => {
    history.push(newValue);
  };

  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={history.location.pathname}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab value='/' label="Home" />
        <Tab value='/favorites' label="Favorites" />
      </Tabs>
    </AppBar>
  );
};

export default NavBar;