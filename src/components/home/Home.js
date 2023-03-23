import React, { Component } from 'react';
import AppNavbar from '../navbar/AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Button color="link"><Link to="/books">Books</Link></Button>
                    <Button color="link"><Link to="/devices">Devices</Link></Button>
                    <Button color="link"><Link to="/login">Login</Link></Button>
                </Container>
            </div>
        );
    }
}
export default Home;