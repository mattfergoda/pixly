import React from "react";
import { } from "react-router-dom";
import { Nav, NavItem, Navbar, NavbarBrand, NavLink } from "reactstrap";

/**
 * Navigation bar component
 * Displays links to the various routes for Pixly
 *
 * App -> Navigation
 */
function Navigation() {
  return (
    <Navbar className="Navigation bg-primary navbar-expand-sm" dark >

      <NavbarBrand href="/">
        Pix.ly
      </NavbarBrand>

        <Nav className="ms-auto " navbar>

          <NavItem>
            <NavLink href="/images" className="">All Images</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/new">Add New Image</NavLink>
          </NavItem>

        </Nav>

    </Navbar>
  );
}

export default Navigation;