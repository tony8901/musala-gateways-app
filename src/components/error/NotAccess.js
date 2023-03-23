import React from 'react';
import { Container } from 'reactstrap';
import AppNavbar from '../navbar/AppNavbar';

const NotAccess = () => {
  return (
    <div>
        <AppNavbar/>
        <Container fluid>
          <h1 className="display-3">Error</h1>
          <p className="lead">I'm sorry but you don't have acces to this resource! :( </p>
          <p className="lead">Pleace <a href='/login'>Login</a></p>
        </Container>
    </div>
  );
};

export default NotAccess;