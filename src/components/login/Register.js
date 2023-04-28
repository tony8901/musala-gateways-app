import React from 'react';
import { Card, CardBody, CardHeader, Col, Row }from 'reactstrap';
import AppNavbar from '../navbar/AppNavbar';
import FormRegister from './FormRegister';


const Register = () => {
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
                Register Form
              </CardHeader>
              <CardBody id='cardBody'>
                <FormRegister />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Register;