import React, { Component } from 'react';
 import { NavLink } from 'react-router-dom';
import './NavbarBottom.css'

class NavBar extends Component {
  render() {
  	const auth = localStorage.getItem('mhc-user-token');
    if(!auth) return null

    return (
      <div className="navbar-bottom container d-sm-none">
        <div className="row text-center">
          <div className="col-12 p-1 bg-dark"></div>
          <div className="col-4 border p-3 bg-white"><h5>Notif</h5></div>
          <div className="col-4 border p-3 bg-white"><NavLink to="/messages"><h5>Message</h5></NavLink></div>
          <div className="col-4 border p-3 bg-white"><h5>Profile</h5></div>
        </div>
      </div>
    );
  }
}

export default NavBar;