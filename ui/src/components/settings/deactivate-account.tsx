import React, { useState, useEffect } from 'react';
import {
    Card,
    Form,
    Button,
    Alert,
    Col,
    Row,
    Container,
} from 'react-bootstrap';
import {
    FaChevronLeft,
} from 'react-icons/fa';
import { getAPIErrorMessage } from '../../utils';
import { useAxios } from '../../services';
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
            <Container className="card-content mx-auto">
                <Form className="details-form p-5 d-flex">
                    {(apiError || alert.message) && (
                        <Alert variant={alert.message ? 'success' : 'danger'} onClose={() => setAlert({})} dismissible>
                            {alert.message || getAPIErrorMessage(apiError)}
                        </Alert>
                    )}
                    <Row>
                    <Col sm={12}>
                        <p>You can deactivate your account here. Be careful, all your profile data will be lost after that.</p>
                    </Col>
                    <Col sm={3}>
                        <Button onClick={handleFormSubmit} className="btn btn-danger w-100">Deactivate</Button>
                    </Col>
                    </Row>
                </Form>
            </Container>
        </Card>
    );
}