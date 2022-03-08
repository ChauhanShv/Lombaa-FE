import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import { useAxios } from '../../services';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { ActionTypes, useAppContext } from '../../contexts';

interface VerifyEmailProps {
    token: string;
};

export const VerifyEmail: React.FC<VerifyEmailProps> = ({ token }: VerifyEmailProps): React.ReactElement => {
    const { state, dispatch } = useAppContext();
    const [{ data, loading }, execute] = useAxios({
        url: '/user/email',
        method: 'POST',
    });

    useEffect(() => {
        execute({
            data: {
                token: token,
            }
        });
    }, []);
    useEffect(() => {
        dispatch({
            type: ActionTypes.UPDATE_PROFILE,
            payload: {
                metaData: {
                    ...state.user?.metaData,
                    isEmailVerified: 1,
                },
            }
        });
    }, [data]);

    return (
        <Container className="p-5">
            <Row>
                <Col md={12}>
                    <Card>
                        <Card.Header>
                            <h3>Email Verification</h3>
                        </Card.Header>
                        <Form className="card-content text-center p-5 col-lg-6 mx-auto" noValidate>
                            <h4 className="mb-4">
                                {loading ?
                                    <Spinner animation="border" /> :
                                    data.success ?
                                        'Your Email has been verified successfully' :
                                        'Email verification failed'
                                }
                            </h4>
                            <Button
                                href="/"
                                target='_blank'
                                type='submit'
                                className="btn btn-lg btn-success w-100 mb-3"
                            >
                                Go to Home Page <BsFillArrowRightCircleFill />
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}