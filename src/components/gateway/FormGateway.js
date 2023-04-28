import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Button, Form, FormGroup, Input, Label, Toast, ToastBody, ToastHeader } from "reactstrap";
import { Link } from "react-router-dom";
import instance from "../../utils/instance";

const FormGateway = () => {
    const [visible, setVisible] = useState(false);
    const [link, setLink] = useState(true);
    const [headerText, setHeaderText] = useState('');
    const [bodyText, setBodyText] = useState('');
    const [style, setStyle] = useState({});

    const formik = useFormik({
        initialValues: {
            name: '',
            ip: ''
        },
        validationSchema: Yup.object({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required'),
        ip: Yup.string()
            .matches(
                /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                'Invalid IP address'
            )
            .required('Required')
        }),
        onSubmit: async (values) => {
            try {
                const response = await instance.post('/gateways', values);
                console.log(values);
                console.log(response);
                if (response.status === 200) {
                    setStyle({ 'backgroundColor': 'rgb(174 239 184 / 85%)', 'color': '#38546c' });
                    setVisible(true);
                    setHeaderText('New Device');
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
                setBodyText(error.message);
            }
        }
    });

    return (
        <div>
            <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <Label for="inputName">
                        Name
                    </Label>
                    <Input
                        id="inputName"
                        name="name"
                        placeholder="enter a name"
                        type='text'
                        {...formik.getFieldProps('name')} />
                    {formik.touched.name && formik.errors.name ? (
                        <div>{formik.errors.name}</div>
                    ) : null}
                    <Label for="inputIp" style={{ margin: '5px' }}>
                        ip Address
                    </Label>
                    <Input
                        id="inputIp"
                        name="ip"
                        placeholder="enter a ip"
                        type="ip"
                        {...formik.getFieldProps('ip')} />
                    {formik.touched.ip && formik.errors.ip ? (
                        <div>{formik.errors.ip}</div>
                    ) : null}
                    <Button color='primary' type='submit' style={{ marginTop: '15px' }}>
                        Submit
                    </Button>
                </FormGroup>
            </Form>
            <Toast isOpen={visible}>
                <ToastHeader style={style}>{headerText}</ToastHeader>
                <ToastBody>{bodyText} <Link hidden={link} to={"/gateways"} >Go Gateways</Link></ToastBody>
            </Toast>
        </div>
    );

}
export default FormGateway;