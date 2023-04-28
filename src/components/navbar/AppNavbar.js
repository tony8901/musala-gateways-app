import React, { Component } from 'react';
import { Button, Navbar, NavbarBrand, NavbarText } from 'reactstrap';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export default class AppNavbar extends Component {    
    render() {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            const user = jwtDecode(token);

            const logout = () => {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }

            return <Navbar color="dark" dark expand="md">
                <div style={{display:'block'}}>
                <NavbarBrand tag={Link} to="/home">Home</NavbarBrand>      
                <div><Button color="link"><Link to="/devices">Devices</Link></Button>
                <Button color="link"><Link to="/gateways">Gateways</Link></Button></div></div>
                <div style={{alignItems:'end'}}>
                <NavbarText style={{marginRight:'5px'}}>{user.sub} |</NavbarText>
                <Link onClick={logout}>Log Out</Link></div>
            </Navbar>;
        } else {
            return <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={Link} to="/home">Home</NavbarBrand>
                <div style={{alignItems:'end'}}>
                    <Link to='/register' style={{marginRight: '5px'}}>Sign In</Link>
                    <NavbarText style={{marginRight: '5px'}}>|</NavbarText>
                    <Link to='/login'>Login</Link>
                </div>
            </Navbar>;
        }
    }
}