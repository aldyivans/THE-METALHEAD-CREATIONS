import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, NavLink } from 'react-router-dom';
import MhcLogo from '../../assets/the-metalhead-creations-logo.png';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      authenticated: false
    }
  }

  handleEmail(event) {
    this.setState({ email: event.target.value })
  }

  handlePassword(event) {
    this.setState({ password: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();

    var invalid = this.refs.invalid;
    var emailEmpty = this.refs.emailEmpty;
    var passwordEmpty = this.refs.passwordEmpty;
    var inputEmailEmpty = this.refs.inputEmailEmpty;
    var inputPasswordEmpty = this.refs.inputPasswordEmpty;
    var self = this;

    if(this.state.email === ""){
      inputEmailEmpty.style.border = "2px solid #dc3545"
      emailEmpty.innerHTML = "field can't be empty!"
    } else {
      inputEmailEmpty.style.border = "1px solid #ccc"
      emailEmpty.innerHTML = ""
    }

    if(this.state.password === ""){
      inputPasswordEmpty.style.border = "2px solid #dc3545"
      passwordEmpty.innerHTML = "field can't be empty!"
    } else {
      inputPasswordEmpty.style.border = "1px solid #ccc"
      passwordEmpty.innerHTML = ""
    }

    if(this.state.email !== "" && this.state.password !== ""){
      const user = {
        email: this.state.email,
        password: this.state.password
      }

      axios.post('/login', user).then(response => {
        if(response) {
          localStorage.setItem('mhc-user-token', response.data.token)
          localStorage.setItem('mhc-user-id', response.data.id)
          self.state.authenticated = true;
          self.props.history.push('/')
          console.log(response)
        }
      }).catch(e => {
        if(e.response) {
          invalid.innerHTML = "invalid username or password!"
          console.log('error', e.response);
        }
      })
    }
  }

  render() {
    const auth = localStorage.getItem('mhc-user-token');
    if(auth) return <Redirect to="/" />

    return (
      <div className="container">
        <div className="row flex-row-reverse py-5">
          <div className="col-12 mb-4 d-block d-md-none text-center">
              <img src={ MhcLogo } className="w-50" alt="mhc"/>
          </div>

          <div className="col-12 col-md-6 border-none border-left text-right">
            <div className="col-11 d-none d-md-inline-block text-center">
              <img src={ MhcLogo } className="w-50 mb-3" alt="mch" />
            </div>
            <div className="col-12 col-md-11 bg-light shadow p-4 d-inline-block text-left">
              <div className="text-center">
                <h5 className="pt-3 pb-1 m-0 font-weight-bold">Login</h5>
                <span className="text-danger" ref="invalid"></span>
              </div>
              <form onSubmit={ this.handleSubmit.bind(this) }>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email" className="form-control" id="email" ref="inputEmailEmpty" onChange={ this.handleEmail.bind(this) } value={ this.state.email }/>
                  <span className="text-danger" ref="emailEmpty"></span>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" ref="inputPasswordEmpty" onChange={ this.handlePassword.bind(this) } value={ this.state.password }/>
                  <span className="text-danger" ref="passwordEmpty"></span>
                </div>
                <button type="submit" className="btn btn-primary mb-3 w-100 font-weight-bold">Submit</button>
                <p className="text-center m-0">Not Yet Registered? <NavLink to="/register">Register</NavLink></p>
              </form>
                  
            </div>
          </div>

          <div className="col-12 col-md-6 mt-5 m-md-0 d-flex align-items-center">
            <div className="col-12 col-md-11 p-0">
              <div>
                <h2>A Place To Share Your Hellish Creations</h2>
              </div>
              <p className="text-justify m-0">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
                
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;