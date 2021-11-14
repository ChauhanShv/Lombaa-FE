import React, { useState, useEffect } from 'react';
import {
    Card,
    Form,
    Button,
    Alert,
    Col,
} from 'react-bootstrap';
import {
    FaChevronLeft,
} from 'react-icons/fa';
import { getAPIErrorMessage } from '../../utils';
import { useAxios } from '../../services/base-service';
import { AlertType } from './types';

export const DeactivateAccount: React.FC = (): React.ReactElement => {
    const [alert, setAlert] = useState<AlertType>({});

    const [{data: response, loading, error: apiError}, execute] = useAxios({
        url: '/user/active',
        method: 'POST'
    });
    useEffect(() => {
        if (response?.success) {
            setAlert({
                variant: 'success',
                message: 'Account deactivated successfully',
            });
        }
    }, [response]);
    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        execute({
            data: {}
        });
    };

    return (
        <Card>
            <Card.Header className="d-flex align-items-center justify-content-between bg-white">
                <span className="d-flex align-items-center "><button className="btn btn-white d-md-block d-lg-none"><FaChevronLeft /></button>Deactivate Account</span>
            </Card.Header>
            <Col className="card-content mx-auto">
                <Form className="details-form p-5">
                    {(apiError || alert.message) && (
                        <Alert variant={alert.message ? 'success' : 'danger'} onClose={() => setAlert({})} dismissible>
                            {alert.message || getAPIErrorMessage(apiError)}
                        </Alert>
                    )}
                    Click on the below button in order to Deactivate your account.
                    <Button onClick={handleFormSubmit} className="btn btn-success w-100">Deactivate</Button>
                </Form>
            </Col>
        </Card>
    );
}