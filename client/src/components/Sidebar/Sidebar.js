import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {

	componentDidMount() {
		this.props.getUserData()
	}

  render() {
  	const auth = localStorage.getItem('mhc-user-token');
    if(!auth) return null

    return (
      <div className="col-3" >
	      <div className="card border-0 rounded-0 shadow">
					<ul className="list-group list-group-flush">
						<li className="list-group-item">
				      <div className="profile-link">
				      	<NavLink to={"profile/"+ this.props.userId}>
									<div className="ava">
										<img src={this.props.avatar} alt="User Avatar"/>
									</div>
									<div className="ml-2">
										<span className="font-weight-bold">{this.props.username}</span>
									</div>
				      	</NavLink>
							</div>
						</li>
			      <li className="list-group-item"><NavLink to="/">Feeds</NavLink></li>
		      	<li className="list-group-item"><NavLink to="/">Open Forum</NavLink></li>
					</ul>
	      </div>
	      <div className="copy">
		      <span>&copy; 2018 THE METALHEAD CREATIONS</span>
	      </div>
			</div>
    );
  }
}

export default Sidebar;