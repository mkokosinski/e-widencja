import React from "react";
import { Switch, Route } from "react-router-dom";

import { ThemeProvider } from "styled-components";

import { darkTheme } from "../Theme";

import { StyledLayout, Menu, Body } from "./LayoutStyles";
import Navbar from "../navbar/Navbar";

import test from "../navbar/itemDecorator.svg";

const Layout = () => {
  console.log(test);
  return (
    <ThemeProvider theme={darkTheme}>
      <StyledLayout>
        <Menu>
          <Navbar />
        </Menu>
        <Body>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Body>
      </StyledLayout>
    </ThemeProvider>
  );
};

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default Layout;
