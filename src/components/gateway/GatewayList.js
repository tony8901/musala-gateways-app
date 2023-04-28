import React, { Component } from 'react';
import { Alert, Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col, FormGroup, Input, Label, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import AppNavbar from '../navbar/AppNavbar';
import instance from '../../utils/instance';
import { Link } from 'react-router-dom';

class GatewayList extends Component {

  state = {
    gateways: [],
    allDevices: [],
    error: '',
    showModal: false,
    selectedGateway: null,
    selectedDevices: []
  };

  async componentDidMount() {
    try {
      const response = await instance.get('/gateways');
      const body = await response.data;
      this.setState({ gateways: body });
      console.log(body);
      instance.get('/devices')
        .then(response => {
          this.setState({ allDevices: response.data });
        })
        .catch(error => {
          // Manejar errores
        });
    } catch (error) {
      if (error.code === 'ERR_BAD_REQUEST') {
        window.location.href = '/access';
      } else {
        window.location.href = '/error';
      }

    }
  };

  /*generado por IA Bing */
  handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      instance.delete('/gateways/' + id)
        .then(response => {
          // Actualizar la lista de gateways después de eliminar uno
          this.componentDidMount();
          console.log(response);
        })
        .catch(error => {
          // Manejar errores
          console.log(error);
          this.setState({ error: error.response.data });
          setTimeout(() => {
            this.setState({ error: '' });
          }, 5000);
        });
    }
  }

  /* generado po IA Bing*/
  handleManageDevices = (gateway) => {
    this.setState({
      showModal: true,
      selectedGateway: gateway,
      selectedDevices: gateway.devices.map(device => device.id)
    });
  }

  /* generado po IA Bing*/
  handleCloseModal = () => {
    this.setState({ showModal: false, selectedGateway: null });
  }

  /* generado po IA Bing*/
  handleDeviceSelection = (deviceId) => {
    this.setState(prevState => {
      if (prevState.selectedDevices.includes(deviceId)) {
        return { selectedDevices: prevState.selectedDevices.filter(id => id !== deviceId) };
      } else {
        return { selectedDevices: [...prevState.selectedDevices, deviceId] };
      }
    });
  }

  /* generado po IA Bing*/
  handleSave = () => {
    const { selectedGateway, selectedDevices } = this.state;
    // Agregar nuevos dispositivos al gateway seleccionado
    selectedDevices.forEach(deviceId => {
      if (!selectedGateway.devices.some(device => device.id === deviceId)) {
        instance.post('/gateways/' + selectedGateway.id + '/' + deviceId)
          .then(response => {
            // Actualizar la lista de dispositivos del gateway seleccionado
            console.log(response);
            this.componentDidMount();
          })
          .catch(error => {
            // Manejar errores
            console.log(error);
            this.setState({ error: error.response.data });
            setTimeout(() => {
              this.setState({ error: '' });
            }, 5000);
          });
      }
    });

    // Eliminar dispositivos del gateway seleccionado
    selectedGateway.devices.forEach(device => {
      if (!selectedDevices.includes(device.id)) {
        // Lógica para eliminar el dispositivo del gateway seleccionado
        instance.delete('/gateways/' + selectedGateway.id + '/' + device.id)
          .then(response => {
            // Actualizar la lista de dispositivos del gateway seleccionado
            console.log(response);
            this.componentDidMount();
          })
          .catch(error => {
            // Manejar errores
            console.log(error);
            this.setState({ error: error.response.data });
            setTimeout(() => {
              this.setState({ error: '' });
            }, 5000);
          });
      }
    });
    this.handleCloseModal();
  }

  render() {
    const { gateways, allDevices, error, showModal, selectedDevices } = this.state;
    return (
      <div className="App">
        <AppNavbar />
        {error && <Alert color="danger">{error}</Alert>}
        <Row style={{ justifyContent: 'lefth', alignItems: 'top', margin: '3rem' }}>
          <h2>gateways</h2>
          <div style={{ display: 'flex' }}>
            <Link to='/gateways/register'>New Gateway</Link>
          </div>
          {gateways.map(gateway =>
            <Col sm='3'>
              <Card
                className="my-2"
                color="primary"
                outline
                style={{
                  width: '18rem'
                }}>
                <CardHeader>
                  Gateway: {gateway.id}
                </CardHeader>
                <CardBody>
                  <CardTitle tag="h5">
                    {gateway.name}
                  </CardTitle>
                  <CardText>
                    <tr>{gateway.ip}</tr>
                  </CardText>
                </CardBody>
                <ListGroup flush>
                  <tr style={{ marginLeft: "10px" }}>Devices: </tr>
                  {gateway.devices.map(device =>
                    <ListGroupItem tag="ul">id: {device.id} vendor: {device.vendor} created: {device.dateCreated}</ListGroupItem>
                  )}
                </ListGroup>
                <CardFooter style={{ overflow: 'hidden', display: 'flex', justifyContent: 'end' }}>
                  {/*generado por IA Bing */}
                  <Button color='primary' style={{ marginRight: '5px' }} onClick={() => this.handleManageDevices(gateway)}>
                    Manage Devices
                  </Button>
                  <Button onClick={() => this.handleDelete(gateway.id)}>Delete</Button>
                </CardFooter>
              </Card>
            </Col>
          )}
        </Row>

        {/*generado por IA Bing */}
        {/* Modal para administrar dispositivos */}
        <Modal isOpen={showModal} toggle={this.handleCloseModal}>
          <ModalHeader toggle={this.handleCloseModal}>Manage Devices</ModalHeader>
          <ModalBody>
            {/* Mostrar lista de dispositivos con casillas de verificación aquí */}
            {allDevices.map(device =>
              <FormGroup check key={device.id}>
                <Label check>
                  <Input type="checkbox" checked={selectedDevices.includes(device.id)} onChange={() => this.handleDeviceSelection(device.id)} />{' '}
                  {device.vendor}
                </Label>
              </FormGroup>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSave}>Save</Button>{' '}
            <Button color="secondary" onClick={this.handleCloseModal}>Cancel</Button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}
export default GatewayList;