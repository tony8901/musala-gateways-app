import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, FormGroup, Input, Label, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';


const FormRegister = () => {    
    const [visible, setVisible] = useState(false);
    const [link, setLink] = useState(true);
    const [headerText, setHeaderText] = useState('');
    const [bodyText, setBodyText] = useState('');
    const [style, setStyle] = useState({});

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Required'),
            username: Yup.string()
                .required('Required'),
            password: Yup.string()
                .required('Required')
        }),
        onSubmit: async (values) => {
            try {
                const data = await axios.post('/api/auth/register', values);
                console.log(data.status);
                if (data.status === 200) {
                    setStyle({ 'backgroundColor': 'rgb(174 239 184 / 85%)', 'color': '#38546c' });
                    setVisible(true);
                    setHeaderText('Sign In');
                    setLink(false);
                    setBodyText('Everything is ok :) ');
                }
            }
            catch (error) {
                setStyle({ 'backgroundColor': 'rgb(239 174 174 / 85%)', 'color': '#38546c' });
                setVisible(true);
                setLink(true);
                setHeaderText("Something is wrong :( ");
                console.log(error);
                setBodyText(error.response.data.message);
            }
        }
    });

    return (
        <div>
            <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <Label for="inputEmail">
                        Email
                    </Label>
                    <Input
                        id="inputEmail"
                        name="email"
                        placeholder="enter a email"
                        type='text'
                        {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}
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
                        Sign In
                    </Button>
                </FormGroup>
            </Form>
            <Toast isOpen={visible}>
                <ToastHeader style={style}>{headerText}</ToastHeader>
                <ToastBody>{bodyText} <Link hidden={link} to={"/login"} >Go Login</Link></ToastBody>
            </Toast>
        </div>
    )
}
export default FormRegister;