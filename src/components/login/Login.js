import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row, Toast, ToastBody, ToastHeader } from 'reactstrap';
import AppNavbar from '../navbar/AppNavbar';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [visible, setVisible] = useState(false);
  const [headerText, setHeaderText] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [style, setStyle] = useState({});

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Required'),
      password: Yup.string()
        .required('Required')
    }),
    onSubmit: async (values) => {
      try {
        const data = await axios.post('/api/auth/login', values);
        console.log(data.status);
        if (data.status === 200) {
          localStorage.setItem('token', data.data.token);
          console.log(localStorage.getItem('token'));
          setStyle({ 'backgroundColor': 'rgb(174 239 184 / 85%)', 'color': '#38546c' });
          setVisible(true);
          setHeaderText('Login');
          setBodyText('Everything is ok :) ');
        } else if (data.status === 202) {
          setStyle({ 'backgroundColor': 'rgb(239 174 174 / 85%)', 'color': '#38546c' });
          setVisible(true);
          setHeaderText("Something is wrong :( ");
          setBodyText(data.data);
        }
      }
      catch (error) {
        setStyle({ 'backgroundColor': 'rgb(239 174 174 / 85%)', 'color': '#38546c' });
        setVisible(true);
        setHeaderText("Something is wrong :( ");
        setBodyText(error.message);
      }
    }
  });

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
                Login Form
              </CardHeader>
              <CardBody>
                <Form onSubmit={formik.handleSubmit}>
                  <FormGroup>
                    <Label for="inputUsername">
                      Username
                    </Label>
                    <Input
                      id="inputUsername"
                      name="username"
                      placeholder="enter a username"
                      type='text'
                      {...formik.getFieldProps('username')} />
                    {formik.touched.username && formik.errors.username ? (
                      <div>{formik.errors.username}</div>
                    ) : null}
                    <Label for="inputPassword">
                      Password
                    </Label>
                    <Input
                      id="inputPassword"
                      name="password"
                      placeholder="enter a password"
                      type="password"
                      {...formik.getFieldProps('password')} />
                    {formik.touched.password && formik.errors.password ? (
                      <div>{formik.errors.password}</div>
                    ) : null}
                    <Button color='primary' type='submit' style={{ marginTop: '15px' }}>
                      Login
                    </Button>
                  </FormGroup>
                </Form>
                <Toast isOpen={visible}>
                  <ToastHeader style={style}>{headerText}</ToastHeader>
                  <ToastBody>{bodyText}Go to <Link to={"/home"} >Home</Link></ToastBody>
                </Toast>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default LoginForm;