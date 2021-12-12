import React, { useState, useEffect } from 'react';
import {
    Card,
    Form,
    FloatingLabel,
    Button,
    Alert,
    Spinner,
    Col,
} from 'react-bootstrap';
import {
    FaChevronLeft,
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { useAxios } from '../../services';
import { MOBILE_REGEX, COMMON_ERROR_MESSAGE } from '../../constants';
import { ChangePhoneFormFeilds, AlertType } from './types';
import { useAppContext } from '../../contexts';

const schema = yup.object().shape({
    phoneNumber: yup.string().matches(
        MOBILE_REGEX,
        'Mobile Number is invalid'
    ).required('Mobile number is required'),
}).required();

export const ChangePhone: React.FC = (): React.ReactElement => {
    const { state } = useAppContext();
    const [alert, setAlert] = useState<AlertType>({});
    const { register, handleSubmit, formState: { errors } } = useForm<ChangePhoneFormFeilds>({
        resolver: yupResolver(schema),
        defaultValues: {
            phoneNumber: state.user?.metaData?.phoneNumber,
        }
    });
    const [{data: response, loading, error: apiError}, execute] = useAxios({
        url: '/user/phone',
        method: 'PUT'
    });

    useEffect(() => {
        if (response?.success) {
            setAlert({
                variant: 'success',
                message: 'Phone changed successfully',
            });
        }
    }, [response]);

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleSubmit(onSubmit)();
    };
    const onSubmit = (values: any) => {
        if (isEmpty(errors)) {
            execute({
                data: {
                    phone: values.phoneNumber,
                }
            });
        }
    };
    const getErrorText = (field: string): React.ReactElement | null => {
        const errorMessages: any = {
            ...errors
        };
        if (errorMessages[field]) {
            return (
                <Form.Text className="text-danger">
                    {errorMessages[field]?.message}
                </Form.Text>
            );
        }
        return null;
    };
    const getErrorClassName = (field: string): string => {
        const errorMessages: any = {
            ...errors
        };
        return errorMessages[field] ? 'is-invalid' : '';
    };
    return (
        <Card>
            <Card.Header className="d-flex align-items-center justify-content-between bg-white">
                <span className="d-flex align-items-center "><button className="btn btn-white d-md-block d-lg-none"><FaChevronLeft /></button>Change Phone</span>
            </Card.Header>
            <Col md={8} className="card-content col-md-8 mx-auto">
                <Form onSubmit={handleFormSubmit} className="details-form p-5">
                    {(apiError || alert.message) && (
                        <Alert variant={alert.message ? 'success' : 'danger'} onClose={() => setAlert({})} dismissible>
                            {alert.message || COMMON_ERROR_MESSAGE}
                        </Alert>
                    )}
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Phone Number"
                        className="mb-3"
                    >
                        <Form.Control 
                            {...register('phoneNumber')} 
                            type="phoneNumber" 
                            placeholder="Phone" 
                            className={getErrorClassName('email')}
                        />
                        {getErrorText('email')}
                    </FloatingLabel>
                    {errors.phoneNumber ? 'Phone Number is Invalid' : null }
                    <Button type="submit" className="btn btn-success w-100">
                        {
                            loading ? (
                                <Spinner animation="border" role="status"></Spinner>
                            ) : 'Save'
                        }
                    </Button>
                </Form>
            </Col>
        </Card>
    );
}