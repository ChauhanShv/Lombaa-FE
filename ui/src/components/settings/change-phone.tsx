import React, { useState, useEffect } from 'react';
import {
    Card,
    Form,
    FloatingLabel,
    Button,
    Alert,
    Spinner,
    Col,
    Row,
} from 'react-bootstrap';
import {
    FaChevronLeft,
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { useAxios } from '../../services';
import { MOBILE_REGEX } from '../../constants';
import { ChangePhoneFormFeilds, AlertType } from './types';
import { useAppContext, ActionTypes } from '../../contexts';
import { getAPIErrorMessage } from '../../utils';

const schema = yup.object().shape({
    countryCode: yup.string().required('Enter Country Code'),
    phoneNumber: yup.string().matches(
        MOBILE_REGEX,
        'Mobile Number is invalid'
    ).required('Mobile number is required'),
}).required();

export const ChangePhone: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useAppContext();
    const [alert, setAlert] = useState<AlertType>({});
    const [phoneCodeData, setPhoneCodeData] = useState<any[]>([]);
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<ChangePhoneFormFeilds>({
        resolver: yupResolver(schema),
        defaultValues: {
            phoneNumber: state.user?.metaData?.phoneNumber,
        }
    });
    const [{ data: response, loading, error: apiError }, execute] = useAxios({
        url: '/user/phone',
        method: 'PUT'
    });
    const [{ data: phoneCodeResponse }, phoneCodeExecute] = useAxios({
        url: 'locations/countries',
        method: 'GET',
    });

    useEffect(() => {
        phoneCodeExecute({});
    }, []);
    useEffect(() => {
        if (phoneCodeResponse?.success) {
            setPhoneCodeData(phoneCodeResponse.response);
        }
    }, [phoneCodeResponse]);

    useEffect(() => {
        if (response?.success) {
            setAlert({
                variant: 'success',
                message: 'Phone changed successfully',
            });
            dispatch({
                type: ActionTypes.UPDATE_PROFILE,
                payload: {
                    metaData: {
                        ...state?.user?.metaData,
                        phoneNumber: getValues().phoneNumber,
                    },
                }
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
                    phoneCode: values.countryCode,
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
                            {alert.message || getAPIErrorMessage(apiError)}
                        </Alert>
                    )}
                    <Row>
                        <Col md={4}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Code"
                                className="mb-3"
                            >
                                <Form.Select
                                    {...register('countryCode')}
                                    placeholder="Phone"
                                    className={getErrorClassName('countryCode')}
                                >
                                    {!!phoneCodeData.length && phoneCodeData.map((phone: any) =>
                                        <option value={phone.phoneCode} key={phone.id}>
                                            {'+'}{phone.phoneCode}
                                        </option>
                                    )}
                                </Form.Select>
                                {getErrorText('countryCode')}
                            </FloatingLabel>
                        </Col>
                        <Col md={8}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Phone Number"
                                className="mb-3"
                            >
                                <Form.Control
                                    {...register('phoneNumber')}
                                    type="number"
                                    placeholder="Phone"
                                    className={getErrorClassName('phoneNumber')}
                                />
                                {getErrorText('phoneNumber')}
                            </FloatingLabel>
                        </Col>
                    </Row>
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