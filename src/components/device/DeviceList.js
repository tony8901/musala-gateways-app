import React, { Component } from 'react';
import { Row, CardTitle, CardText, CardFooter, Col, Card, CardHeader, CardBody, Input, Label, Button, Alert } from 'reactstrap';
import AppNavbar from '../navbar/AppNavbar';
import instance from '../../utils/instance';
import { Link } from 'react-router-dom';

class DeviceList extends Component {
  state = {
    devices: [],
    error: ''
  };

  async componentDidMount() {
    try {
      const response = await instance.get('/devices');
      const body = await response.data;
      this.setState({ devices: body });
      console.log(body);
    } catch (error) {
      if (error.code === 'ERR_BAD_REQUEST') {
        window.location.href = '/access';
      } else {
        window.location.href = '/error';
      }

    }
  }
  handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      instance.delete('/devices/' + id)
        .then(response => {
          // Actualizar la lista de dispositivos después de eliminar uno
          this.componentDidMount();
          console.log(response);
        })
        .catch(error => {
          // Manejar errores
          this.setState({ error: error.response.data });
          setTimeout(() => {
            this.setState({ error: '' });
          }, 5000);
        });
    }
  }

  render() {
    const { devices, error } = this.state;
    return (
      <div className="App">
        <AppNavbar />
        {error && <Alert color="danger">{error}</Alert>}
        <Row style={{ justifyContent: 'lefth', alignItems: 'center', margin: '15px' }}>
          <h2>Devices</h2>
          <Link to='/devices/register'>New Device</Link>
          {devices.map(device =>
            <Col sm='3'>
              <Card
                className="my-2"
                color="primary"
                outline
                style={{
                  width: '18rem'
                }}
              >
                <CardHeader>
                  Device: {device.id}
                </CardHeader>
                <CardBody>
                  <CardTitle tag="h5">
                    Vendor: {device.vendor}
                  </CardTitle>
                  <CardText>
                    <tr>Date created: {device.dateCreated}</tr>
                    <tr>
                      <Label check style={{ marginRight: "5px" }}>Status: </Label>
                      <Input type="switch" checked={device.status} disabled />
                    </tr>
                  </CardText>
                  <CardFooter style={{ padding: '10px 0px', display: 'flex', justifyContent: 'end' }}>
                    <Button onClick={() => this.handleDelete(device.id)}>Delete</Button>
                  </CardFooter>
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}
export default DeviceList;
