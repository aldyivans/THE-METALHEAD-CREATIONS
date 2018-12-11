import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import MhcIcon from '../../assets/mhc-logo.png';
import ProfileIcon from '../../assets/profile-blk.png';
import MessageIcon from '../../assets/message-blk.png';
import './Navbar.css'

class NavBar extends Component {

	constructor() {
		super();
		this.state = {
			topic: '',
			search: ''
		}
	}

	editMenuDown() {
		console.log("edit menu", this.refs.editMenu)
		var x = this.refs.editMenu;

		if (x.style.display === "block") {
			x.style.display = "none"
		} else {
			x.style.display = "block"
		}
	}

	logOut() {
		localStorage.clear()
		window.location.reload();
	}

	handleSearch(e) {
		this.setState({
			search: e.target.value
		});
	}

  render() {

  	// var inputSearch = this.state.search;

  	const auth = localStorage.getItem('mhc-user-token');
    if(!auth) return null

    return (
      <div className="navbar bg-white shadow-sm">
	      <div className="container justify-content-center">
		      <div className="row w-100 align-items-center">
			      <div className="col-3">
						  <NavLink className="navbar-brand mhc-logo" to="/"><img src={MhcIcon} className="" alt="MHC logo"/></NavLink>
			      </div>
			      <div className="col-6">
				      <div className="input-group border rounded">
							  <input type="text" placeholder="Search..." className="form-control border-0" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={this.handleSearch.bind(this)} />
							  <div className="input-group-append">
							    <span className="input-group-text bg-white border-0" id="basic-addon2">
							    	<svg aria-hidden="true" data-prefix="fas" data-icon="search" className="svg-inline--fa fa-search fa-w-16" style={{width: '20px'}} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
							    </span>
							  </div>
							</div>
			      </div>
			      <div className="col-3 text-right">
				      <div className="d-flex justify-content-end align-items-center">
					      <button className="bg-white border-0 p-0 mr-4" onClick={this.editMenuDown.bind(this)}>
									<div className="profile-icon">
										<img src={ProfileIcon} className="w-100" alt="profile icon"/>
									</div>
								</button>
					      <NavLink to="/message" className="btn bg-white border-0 text-dark p-0 mr-4">
					      	<div className="message-icon">
										<img src={MessageIcon} className="w-100" alt="message icon"/>
					      	</div>
								</NavLink>
								<button className="bg-white border-0 p-0" onClick={this.editMenuDown.bind(this)}>
									<div className="profile-icon">
										<img src={ProfileIcon} className="w-100" alt="profile icon"/>
									</div>
								</button>
								<div className="menu" ref="editMenu">
					      	<ul>
										<li><NavLink to={"profile/"+ this.props.userId} className="btn bg-white border-0 text-dark">
											<span>My Profile</span>
										</NavLink></li>
									  <li><button className="btn bg-white border-0 text-dark"  type="submit" onClick={this.logOut}>Log Out</button></li>
					      	</ul>
					      </div>
				      </div>
			      </div>
		      </div>
	      </div>
			</div>
    );
  }
}

export default NavBar;