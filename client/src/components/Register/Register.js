import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import MhcLogo from '../../assets/the-metalhead-creations-logo.png'
import axios from 'axios';

class Register extends Component {

  constructor() {
    super();
    this.state = {
      fullname: '',
      username: '',
      birthday: '',
      gender: '',
      address: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleFullname(event) {
    this.setState({ fullname: event.target.value });
  }

  handleUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleBirthday(event) {
    this.setState({ birthday: event.target.value });
  }

  handleGender(event) {
    this.setState({ gender: event.target.value });
  }

  handleAddress(event) {
    this.setState({ address: event.target.value });
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    var fullnameValid = this.refs.fullnameValid;
    var usernameValid = this.refs.usernameValid;
    var birthdayValid = this.refs.birthdayValid;
    var genderValid = this.refs.genderValid;
    var adressValid = this.refs.adressValid;
    var emailValid = this.refs.emailValid;
    var passwordValid = this.refs.passwordValid;
    var confirmPasswordValid = this.refs.confirmPasswordValid;

    const self = this;

    const userData = {
      fullname: this.state.fullname,
      username: this.state.username,
      birthday: this.state.birthday,
      gender: this.state.gender,
      address: this.state.address,
      email: this.state.email,
      password: this.state.confirmPassword
    };


    if(this.state.fullname === "") {
      fullnameValid.innerHTML = "field cannot be empty!"
    } else {
      fullnameValid.innerHTML = ""
    }

    if(this.state.username === "") {
      usernameValid.innerHTML = "field cannot be empty!"
    } else {
      usernameValid.innerHTML = ""
    }

    if(this.state.birthday === "") {
      birthdayValid.innerHTML = "field cannot be empty!"
    } else {
      birthdayValid.innerHTML = ""
    }

    if(this.state.gender === "") {
      genderValid.innerHTML = "field cannot be empty!"
    } else {
      genderValid.innerHTML = ""
    }

    if(this.state.adress === "") {
      adressValid.innerHTML = "field cannot be empty!"
    } else {
      adressValid.innerHTML = ""
    }

    if(this.state.email === "") {
      emailValid.innerHTML = "field cannot be empty!"
    } else {
      emailValid.innerHTML = ""
    }

    if(this.state.password === "") {
      passwordValid.innerHTML = "field cannot be empty!"
    } else {
      passwordValid.innerHTML = ""
    }

    if(this.state.confirmPassword === "") {
      confirmPasswordValid.innerHTML = "field cannot be empty!"
    } else if(this.state.confirmPassword !== this.state.password) {
      confirmPasswordValid.innerHTML = "password didn't match!"
    } else {
      confirmPasswordValid.innerHTML = ""
    }

    if(this.state.fullname !== "" &&
        this.state.username !== "" &&
        this.state.birthday !== "" &&
        this.state.gender !== "" &&
        this.state.adress !== "" &&
        this.state.email !== "" &&
        this.state.password !== "" &&
        this.state.confirmPassword !== "" &&
        this.state.confirmPassword === this.state.password
        ) {
      axios.post('/register', userData).then(res => {
        console.log(res)
        self.props.history.push('/login')
      }).catch( err => {
        console.log('error', err)
      })
    }
  }

  render() {
    const auth = localStorage.getItem('mhc-user-token');
    if(auth) return <Redirect to="/" />

    return (
      <div className="container">
        <div className="row py-5 justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 mb-4 text-center">
              <img src={ MhcLogo } className="w-50" alt="mhc"/>
          </div>

          <div className="col-12 text-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 bg-light shadow p-4 d-inline-block text-left">
              <h5 className="text-center my-3 font-weight-bold">Register Your Soul</h5>
              <form onSubmit={ this.handleSubmit.bind(this) }>
                <div className="form-group">
                  <label htmlFor="fullname">Fullname</label>
                  <input type="text" className="form-control" id="fullname" onChange={ this.handleFullname.bind(this) } value={ this.state.fullname } />
                  <small className="text-danger" ref="fullnameValid"></small>
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" id="username" onChange={ this.handleUsername.bind(this) } value={ this.state.username } />
                  <small className="text-danger" ref="usernameValid"></small>
                </div>
                <div className="form-group">
                  <label htmlFor="birthday">Birthday</label>
                  <input type="date" className="form-control" id="birthday" onChange={ this.handleBirthday.bind(this) } value={ this.state.birthday } />
                  <small className="text-danger" ref="birthdayValid"></small>
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select className="form-control" id="gender" onChange={ this.handleGender.bind(this) } value={ this.state.gender } >
                    <option disabled></option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  <small className="text-danger" ref="genderValid"></small>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input type="text" className="form-control" id="address" onChange={ this.handleAddress.bind(this) } value={ this.state.address } />
                  <small className="text-danger" ref="adressValid"></small>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" onChange={ this.handleEmail.bind(this) } value={ this.state.email } />
                  <small className="text-danger" ref="emailValid"></small>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" onChange={ this.handlePassword.bind(this) } value={ this.state.password }/>
                  <small className="text-danger" ref="passwordValid"></small>
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input type="password" className="form-control" id="confirmPassword" onChange={ this.handleConfirmPassword.bind(this) } value={ this.state.confirmPassword } />
                  <small className="text-danger" ref="confirmPasswordValid"></small>
                </div>
                <button type="submit" className="btn btn-primary mb-3 w-100 font-weight-bold">Submit</button>
                <p className="text-center m-0">Already Registered? <NavLink to="/">Login</NavLink></p>
              </form>
                  
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;