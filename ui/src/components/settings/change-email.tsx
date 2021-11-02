import React, {useState, useEffect} from 'react';
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
import { useAxios } from '../../services/base-service';
import { isEmpty } from 'lodash';
import { ChangeEmailFormFeilds, AlertType } from './types';
import { useAppContext } from '../../contexts';
import { COMMON_ERROR_MESSAGE } from '../../constants';
import { getAPIErrorMessage } from '../../utils';

const schema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
}).required();

export const ChangeEmail: React.FC = (): React.ReactElement => {
    const { state } = useAppContext();
    const [alert, setAlert] = useState<AlertType>({});
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ChangeEmailFormFeilds>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: state.user?.metaData?.email
        }
    });
    const [{data: response, loading, error: apiError}, execute] = useAxios({
        url: '/user/email',
        method: 'PUT'
    });

    useEffect(() => {
        if (response?.success) {
            setAlert({
                variant: 'success',
                message: 'Email changed successfully',
            });
        }
    }, [response]);

    const onSubmit = (values: any) => {
        if (isEmpty(errors)) {
            execute({
                data: {
                    ...values,
                }
            });
        }
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleSubmit(onSubmit)();
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
                <span className="d-flex align-items-center "><button className="btn btn-white d-md-block d-lg-none"><FaChevronLeft /></button>Change Email</span>
            </Card.Header>
            <Col md={8} className="card-content mx-auto">
                <Form onSubmit={handleFormSubmit} className="details-form p-5">
                    {(apiError || alert.message) && (
                        <Alert variant={alert.message ? 'success' : 'danger'} onClose={() => setAlert({})} dismissible>
                            {alert.message || getAPIErrorMessage(apiError)}
                        </Alert>
                    )}
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        className="mb-3"
                    >
                        <Form.Control 
                            {...register('email')} 
                            type="text" 
                            placeholder="Email" 
                            className={getErrorClassName('email')}
                        />
                        {getErrorText('email')}
                    </FloatingLabel>
                    <Button type="submit" className="btn btn-success w-100">
                        {
                            loading ? (
                                <Spinner animation="border" role="status"></Spinner>
                            ) : 'Update'
                        }
                    </Button>
                </Form>
            </Col>
        </Card>
    );
}