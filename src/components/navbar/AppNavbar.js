import React, { Component } from 'react';
import { Button, Navbar, NavbarBrand, NavbarText } from 'reactstrap';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            const user = jwtDecode(token);

            const logout = () => {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }

            return <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
                <NavbarText>{user.sub}</NavbarText>
                <Button onClick={logout}>Salir</Button>
            </Navbar>;
        } else {
            return <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
            </Navbar>;
        }
    }
}