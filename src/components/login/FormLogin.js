import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, FormGroup, Input, Label, Toast, ToastBody, ToastHeader } from 'reactstrap';
import axios from 'axios';


const FormLogin = () => {
    const [visible, setVisible] = useState(false);
    const [link, setLink] = useState(true);
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
                    setLink(false);
                    setBodyText('Everything is ok :) ');
                } else if (data.status === 401) {
                    setStyle({ 'backgroundColor': 'rgb(239 174 174 / 85%)', 'color': '#38546c' });
                    setVisible(true);
                    setLink(true);
                    setHeaderText("Something is wrong :( ");
                    setBodyText(data.data);
                }
            }
            catch (error) {
                setStyle({ 'backgroundColor': 'rgb(239 174 174 / 85%)', 'color': '#38546c' });
                setVisible(true);
                setLink(true);
                setHeaderText("Something is wrong :( ");
                console.log(error);
                setBodyText(error.response.data);
            }
        }
    });

    return (
        <div>
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
                    <Label for="inputPassword" style={{margin:'5px'}}>
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
                <ToastBody>{bodyText} <Link hidden={link} to={"/home"} >Go Home</Link></ToastBody>
            </Toast>
        </div>
    );
} 
export default FormLogin;