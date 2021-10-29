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
import { useAxios } from '../../services/base-service';

export const DeactivateAccount: React.FC = (): React.ReactElement => {
    const [successAlert, setSuccessAlert] = useState<boolean>(false);
    const [failureAlert, setFailureAlert] = useState<boolean>(false);
    const [{data: response, loading, error: apiError}, execute] = useAxios({
        url: '/user/active',
        method: 'POST'
    });
    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        execute({
            data: {
            }
        });
    };

    const DeactivateSuccessAlert: React.FC = (): React.ReactElement => {
        return (
            <Alert variant="success" onClose={() => setSuccessAlert(false)} dismissible>
                The Email of your Account has changed successfully.
            </Alert>
        );
    };
    
    const DeactivateFailureAlert: React.FC = (): React.ReactElement => {
        return (
            <Alert variant="danger" onClose={() => setFailureAlert(false)} dismissible>
                Something went wrong. Please try again later.
            </Alert>
        );
    };

    return (
        <Card>
            <Card.Header className="d-flex align-items-center justify-content-between bg-white">
                <span className="d-flex align-items-center "><button className="btn btn-white d-md-block d-lg-none"><FaChevronLeft /></button>Deactivate Account</span>
            </Card.Header>
            <Col className="card-content mx-auto">
                <Form className="details-form p-5">
                    { successAlert && <DeactivateSuccessAlert /> }
                    { failureAlert && <DeactivateFailureAlert /> }
                    Click on the below button in order to Deactivate your account.
                    <Button onClick={handleFormSubmit} className="btn btn-success w-100">Deactivate</Button>
                </Form>
            </Col>
        </Card>
    );
}