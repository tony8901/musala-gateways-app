import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Button, Form, FormGroup, Input, Label, Toast, ToastBody, ToastHeader } from "reactstrap";
import { Link } from "react-router-dom";
import instance from "../../utils/instance";

const FormDevice = () => {
    const [visible, setVisible] = useState(false);
    const [link, setLink] = useState(true);
    const [headerText, setHeaderText] = useState('');
    const [bodyText, setBodyText] = useState('');
    const [style, setStyle] = useState({});

    const formik = useFormik({
        initialValues: {
            vendor: '',
            dateCreated: '',
            status: false
        },
        validationSchema: Yup.object({
            vendor: Yup.string()
            .min(2, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required'),
            dateCreated: Yup.date()
                .required('Required')
        }),
        onSubmit: async (values) => {
            try {
                const response = await instance.post('/devices', values);
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
                    <Label for="inputVendor">
                        Vendor
                    </Label>
                    <Input
                        id="inputVendor"
                        name="vendor"
                        placeholder="enter a vendor"
                        type='text'
                        {...formik.getFieldProps('vendor')} />
                    {formik.touched.vendor && formik.errors.vendor ? (
                        <div>{formik.errors.vendor}</div>
                    ) : null}
                    <Label for="inputDate" style={{ margin: '5px' }}>
                        Date Created
                    </Label>
                    <Input
                        id="inputDate"
                        name="dateCreated"
                        placeholder="enter a date"
                        type="date"
                        {...formik.getFieldProps('dateCreated')} />
                    {formik.touched.dateCreated && formik.errors.dateCreated ? (
                        <div>{formik.errors.dateCreated}</div>
                    ) : null}
                    <FormGroup switch style={{margin:'15px 5px 10px 5px'}}>
                        <Label check>Status</Label>
                        <Input 
                            id="status"
                            name="status" 
                            type="switch" 
                            role="switch"
                            checked={formik.values.status}
                            onChange={formik.handleChange}
                        />                        
                    </FormGroup>
                    <Button color='primary' type='submit' style={{ marginTop: '15px' }}>
                        Submit
                    </Button>
                </FormGroup>
            </Form>
            <Toast isOpen={visible}>
                <ToastHeader style={style}>{headerText}</ToastHeader>
                <ToastBody>{bodyText} <Link hidden={link} to={"/devices"} >Go Devices</Link></ToastBody>
            </Toast>
        </div>
    );

}
export default FormDevice;