import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import AppNavbar from '../navbar/AppNavbar';

class old extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/login' + (item.id ? '/' + item.id : ''), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
    });
    this.props.history.push('/clients');
}

  render() {
    return (
      <div>
        <AppNavbar />
        <div>
          <Row style={{justifyContent: 'center', alignItems:'center', marginTop: '2rem'}}>
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
                  Login Form
                </CardHeader>
                <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="inputUsername">
                      Username
                    </Label>
                    <Input
                      id="inputUsername"
                      name="username"
                      placeholder="enter a username"
                      type='text'
                    />
                    <Label for="inputPassword">
                      Password
                    </Label>
                    <Input
                      id="inputPassword"
                      name="password"
                      placeholder="enter a password"
                      type="password"
                    />
                  </FormGroup>
                  <Row style={{alignContent:'center', margin:'5px'}}>
                    <Button>
                      Login
                    </Button>
                  </Row>
                </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default old;