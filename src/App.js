
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import DeviceList from './components/device/DeviceList';
import NotAccess from './components/error/NotAccess';
import ErrorPage from './components/error/ErrorPage';
import WelcomePage from './components/welcome/WelcomePage';
import GatewayList from './components/gateway/GatewayList';
import Login from './components/login/Login';
import Register from './components/login/Register';
import DeviceRegister from './components/device/DeviceRegister';
import GatewayRegister from './components/gateway/GatewayRegister';

class App extends Component {
  render() {
    return (
        <Router>
          <Routes>
            <Route path='/' Component={WelcomePage}/>;
            <Route path='/home' Component={Home}/> 
            <Route path='/devices' Component={DeviceList}/>
            <Route path='/gateways' Component={GatewayList}/>
            <Route path='/login' Component={Login}/>
            <Route path='/access' Component={NotAccess}/>
            <Route path='/error' Component={ErrorPage}/>
            <Route path='/register' Component={Register}/>
            <Route path='/devices/register' Component={DeviceRegister}/>
            <Route path='/gateways/register' Component={GatewayRegister}/>
          </Routes>
        </Router>
    );
  }
}

export default App;
