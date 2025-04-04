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
import { Link } from 'react-router-dom';
import { useAppContext, ActionTypes } from '../../contexts';
import { getAPIErrorMessage } from '../../utils';
import { useAxios } from '../../services';
import { AlertPopup } from '../alert-popup';
import { AlertType } from './types';

export const DeactivateAccount: React.FC = (): React.ReactElement => {
    const { dispatch } = useAppContext();
    const [alert, setAlert] = useState<AlertType>({});
    const [alertPopup, setShowAlertPopup] = useState<boolean>(false);

    const [{ data: response, loading, error: apiError }, execute] = useAxios({
        url: '/user/active',
        method: 'PUT'
    });

    useEffect(() => {
        if (response?.success) {
            setAlert({
                variant: 'success',
                message: 'Account deactivated successfully',
            });
            dispatch({
                type: ActionTypes.LOGOUT,
            })
        }
    }, [response]);

    const handleDeactivation = () => {
        execute({
            data: {
                status: 0,
            }
        });
    };

    return (
        <Card>
            <Card.Header className="d-flex align-items-center justify-content-between bg-white">
                <span className="d-flex align-items-center my-lg-1 settings-font-header">
                    <Link to="/settings" className="btn btn-white d-md-block d-lg-none">
                        <FaChevronLeft />
                    </Link>Deactivate Account
                </span>
            </Card.Header>
            <Container className="card-content mx-auto col-11">
                <Form className="details-form py-5">
                    {alertPopup && (
                        <AlertPopup
                            title='Deactivate Account'
                            description='Are you sure you want to deactivate your account?'
                            onOk={handleDeactivation}
                            onClose={() => setShowAlertPopup(false)}
                        />
                    )}
                    {(apiError || alert.message) && (
                        <Alert variant={alert.message ? 'success' : 'danger'} onClose={() => setAlert({})} dismissible>
                            {alert.message || getAPIErrorMessage(apiError)}
                        </Alert>
                    )}
                    <Row>
                        <Col lg={8}>
                            <p>
                                You can deactivate your account here. Be careful, all your profile data will be lost after that.
                            </p>
                        </Col>
                        <Col lg={4}>
                            <Button
                                onClick={() => setShowAlertPopup(true)}
                                className="btn btn-danger w-100"
                            >
                                Deactivate
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Card>
    );
}