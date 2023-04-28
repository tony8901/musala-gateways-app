import React, { Component } from 'react';
import AppNavbar from '../navbar/AppNavbar';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <div>Hello Word!</div>
            </div>
        );
    }
}
export default Home;