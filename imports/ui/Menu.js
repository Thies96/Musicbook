import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import AccountsUIWrapper from './AccountsUIWrapper';
import { withRouter } from "react-router-dom";

class Menu extends React.Component {

  //Logout Logik + redirect zur Startseite
  submitLogout(event) {
    event.preventDefault();
    Meteor.logout((error) =>{
      if(error){
        console.log(error.reason);
      } else {
        this.props.history.push('/');
      }
    });
  }
  render() {
    return (
      <div className="menu navbar fixed-top">
        <Navbar dark expand="md">
          <NavbarBrand href="/">Musicbook</NavbarBrand>
            <Nav navbar>
              <NavItem>
                <NavLink href="/">Homepage</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/App">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Profile">Profile</NavLink>
              </NavItem>
            </Nav>
            <Nav navbar right="true">
              <NavItem>
                <NavLink onClick= {this.submitLogout.bind(this)}>Logout</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}
export default withRouter(Menu);