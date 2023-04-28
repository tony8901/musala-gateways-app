import React from 'react';
import { Card, CardBody, CardHeader, Col, Row }from 'reactstrap';
import AppNavbar from '../navbar/AppNavbar';
import FormGateway from './FormGateway';


const GatewayRegister = () => {
  return (
    <div>
      <AppNavbar />
      <div>
        <Row style={{ justifyContent: 'center', alignItems: 'center', margin: '3rem' }}>
          <Col sm='4'>
            <Card
              className="my-2"
              color="primary"
              outline
              style={{
                width: '18rem'
              }}
            >
              <CardHeader>
                Gateway Form
              </CardHeader>
              <CardBody id='cardBody'>
                <FormGateway />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default GatewayRegister;