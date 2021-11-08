import React, { useState } from 'react';
import {
    ListGroup,
    Card,
    Form,
    FloatingLabel,
    Image,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    FaChevronLeft,
    FaGoogle,
    FaFacebook
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ActionTypes, useAppContext } from '../contexts';
import { PASSWORD_REGEX } from '../constants';
import { useAxios } from '../services/base-service';

const schema = yup.object().shape({
    currentPassword: yup.string().required('Password is required'),
    newPassword: yup.string().matches(
        PASSWORD_REGEX,
        'Password should contain minimum 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
    ),
    reTypePassword: yup.string().matches(
        PASSWORD_REGEX,
        'Password should contain minimum 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
    ),
}).required();
export const ChangePassword: React.FC = (): React.ReactElement => {
    const { register, handleSubmit, getValues, formState: { isValid, errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (values: any) => {
        // if (isFormValid(values)) {
        //     execute({
        //         data: {
        //             ...values,
        //         }
        //     });
        // }
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleSubmit(onSubmit)();
    };

    return (
        <Card>
            <Card.Header className="d-flex align-items-center justify-content-between bg-white">
                <span className="d-flex align-items-center "><button className="btn btn-white d-md-block d-lg-none"><FaChevronLeft /></button> Change Password</span>
                <button className="btn btn-success">Save</button>
            </Card.Header>
            <div className="card-content col-md-8 mx-auto">
                <div className="details-form p-3 text-center">
                    <Form onSubmit={handleFormSubmit} noValidate>
                        <FloatingLabel controlId="floatingInput" label="Enter your current password" className="mb-3">
                            <Form.Control type="password" placeholder="Enter your current password" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="New password" className="mb-3">
                            <Form.Control type="password" placeholder="New password" {...register('newPassword')} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Re-type new password" className="mb-3">
                            <Form.Control type="password" placeholder="Re-type new password" {...register('reTypePassword')} />
                        </FloatingLabel>
                        <button type="submit" className="btn btn-lg btn-success w-100 mb-3">Change</button>
                        <Link to="/forgot-password">
                            <button className="link btn text-success">Forgot Password?</button>
                        </Link>
                    </Form>
                </div>
            </div>
        </Card>
    );
};