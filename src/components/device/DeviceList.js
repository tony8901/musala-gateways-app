import React, { Component } from 'react';
import { Table, Input } from 'reactstrap';
import AppNavbar from '../navbar/AppNavbar';

class DeviceList extends Component {
  state = {
    devices: []
  };

  async componentDidMount() {
    try {
      const response = await fetch('/api/devices');
      const body = await response.json();
      this.setState({ devices: body });      
    } catch (error) {
      window.location.href = '/error';
    }
  }

  render() {
    const { devices } = this.state;
    return (
      <div className="App">
        <header className="App-header">
            <AppNavbar/>
          <div className="App-intro">
            <h2>devices</h2>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>
                    id
                  </th>
                  <th>
                    vendor
                  </th>
                  <th>
                    status
                  </th>
                </tr>
              </thead>
              <tbody>
                  {devices.map(device =>
                    <><tr key={device.uid}><td> {device.uid}</td>
                    <td>{device.vendor}</td>
                    <td><Input type='checkbox' checked={device.status} disabled></Input></td></tr></>
                  )}
              </tbody>
            </Table>
          </div>
        </header>
      </div>
    );
  }
}
export default DeviceList;
