import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

export default class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className="menu navbar fixed-top">
        <Navbar dark expand="md">
          <NavbarBrand href="/">Musicbook</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
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
          </Collapse>
        </Navbar>
        <div className="accounts">
        <AccountsUIWrapper />
      </div>
      </div>
    );
  }
}
