
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import DeviceList from './components/device/DeviceList';
import LoginForm from "./components/login/Login";
import BookList from './components/book/BookList';
import NotAccess from './components/error/NotAccess';
import ErrorPage from './components/error/ErrorPage';

class App extends Component {
  render() {
    return (
        <Router>
          <Routes>
            <Route path='/' Component={Home}/> 
            <Route path='/devices' Component={DeviceList}/>
            <Route path='/books' Component={BookList}/>
            <Route path='/login' Component={LoginForm}/>
            <Route path='/access' Component={NotAccess}/>
            <Route path='/error' Component={ErrorPage}/>
          </Routes>
        </Router>
    );
  }
}

export default App;
