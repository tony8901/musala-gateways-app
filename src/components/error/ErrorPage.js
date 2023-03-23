import React from 'react';
import { Container } from 'reactstrap';
import AppNavbar from '../navbar/AppNavbar';

const ErrorPage = () => {
  return (
    <div>
      <AppNavbar/>
        <Container fluid>
          <h1 className="display-3">Error</h1>
          <p className="lead">Something is wrong! :( </p>
        </Container>
    </div>
  );
};

export default ErrorPage;