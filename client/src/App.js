import React, { Component } from 'react';
import Login, {} from './components/Login/Login';
import Register from './components/Register/Register';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Navbar from './components/Navbar/Navbar';
import NavbarBottom from './components/NavbarBottom/NavbarBottom';
import Forum from './components/Forum/Forum';
import Message from './components/Message/Message';
import Profile from './components/Profile/Profile';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      userId: '',
      username: '',
      avatar: '',
      fullname: '',
      forums: [],
      user: []
    }
  }

  componentDidMount() {
    console.log("hahay", this)
    this.getUserData();
    this.getAllUsers();
    this.getAllPosts();
  }

  getUserData() {
    const userId = localStorage.getItem('mhc-user-id')
    
    axios.get('/user/' + userId).then(res => {
      this.setState({
        userId: res.data.userId,
        avatar: res.data.userData.avatar,
        username: res.data.userData.username,
        fullname: res.data.userData.fullname
      })
    })
    .catch( err => {
      console.log('error', err)
    })
  }

  getAllUsers() {
    axios.get('/user').then(res => {
      console.log('user',res)
    })
  }

  getAllPosts() {
    axios.get('/forum').then(res => {
      console.log('forum',res)
      this.setState({
        forums: res.data.dataForum
      })
    })
  }

  render() {
    return (
      <BrowserRouter>
      	<div className="container-fluid bg-light p-0">
	      	<Navbar userId={this.state.userId} fullname={this.state.fullname} username={this.state.username} avatar={this.state.avatar} />
      		<Switch>
            <Route path="/" render={(props) => 
              <Forum {...props} forums={this.state.forums} getUserData={this.getUserData.bind(this)} getAllPosts={this.getAllPosts.bind(this)} userId={this.state.userId} username={this.state.username} avatar={this.state.avatar} />
            } exact />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/message" render={(props) => 
              <Message {...props} userId={this.state.userId} username={this.state.username} avatar={this.state.avatar} />
            } />
            <Route path="/profile/:id" render={(props) => 
              <Profile {...props} getAllPosts={this.getAllPosts.bind(this)} forums={this.state.forums} userId={this.state.userId} fullname={this.state.fullname} avatar={this.state.avatar} />
            } />
      			<Route component={PageNotFound} />
      		</Switch>
          <NavbarBottom />
      	</div>
      </BrowserRouter>
    );
  }
}

export default App;
