import React from 'react';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaBars, FaBell, FaCalendarAlt } from 'react-icons/fa';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo-jhipster.png" alt="Logo" />
  </div>
);

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo w-full position-absolute">
    <nav className="flex items-center justify-center w-full">
      <div className="container mx-auto py-1 flex items-center justify-center text-center">
        <FaCalendarAlt className="text-white text-xl md:text-xl mr-4" />
        <div className="text-white text-xl md:text-xl lg:text-2xl font-extrabold text-center">
          {/* Display "AMEM" on small screens and full name on medium and larger screens */}
          <span className="block md:hidden">AMEM</span> {/* Show "AMEM" on small screens */}
          <span className="hidden md:block">Alumni Management with Event Management</span>{' '}
          {/* Show full name on medium screens and larger */}
        </div>
      </div>
    </nav>
  </NavbarBrand>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" className="px-2 text-white" />
      <span>Home</span>
    </NavLink>
  </NavItem>
);
