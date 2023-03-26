import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

const WelcomePage = () => {
    const go = () => {
        window.location.href = '/home';
    }
  return (
    <Container>
      <Row>
        <Col>
          <h1>Bienvenido a nuestra aplicación</h1>
          <p>
            Esta es una aplicación de ejemplo que muestra cómo utilizar JWT con Spring en el backend y React en el frontend.
          </p>
          <Button color="primary" onClick={go}>Comenzar</Button>
        </Col>
        <Col>
          {/* Aquí puedes agregar una imagen o cualquier otro contenido */}
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomePage;