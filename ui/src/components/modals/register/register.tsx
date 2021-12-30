import React, { useEffect, useState } from 'react';
import { Modal, Alert, Spinner, Form, FloatingLabel, Button, Nav, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { isEmpty } from 'lodash';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { getAPIErrorMessage } from '../../../utils';
import { RegisterProps, FormFields, AccountType } from './types';
import { PASSWORD_REGEX, NAME_MIN_LENGTH, TIN_MIN_LENGTH, MOBILE_REGEX, TIN_REGEX } from '../../../constants';
import { GOOGLE_CLIENTID, FB_APPID } from '../../../config';
import { useAxios } from '../../../services/base-service';
import { useAppContext, ActionTypes } from '../../../contexts';
import './register.css';

const schema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().matches(
        PASSWORD_REGEX,
        'Password should contain minimum 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
    ),
    accountType: yup.string().required('Account type is required'),
}).required();

export const Register: React.FC<RegisterProps> = ({
    show,
    openLogin,
    onClose,
}: RegisterProps): React.ReactElement => {
    const { register, handleSubmit, getValues, formState: { errors, isDirty }, setValue } = useForm<FormFields>({
        resolver: yupResolver(schema),
    });
    const [selectedAccountType, setSelectedAccountType] = useState<AccountType>(AccountType.INDIVIDUAL);
    const [phoneCodeData, setPhoneCodeData] = useState<any[]>([]);
    const [submitClicked, setSubmitClicked] = useState<boolean>(false);
    const { dispatch } = useAppContext();
    const [{ data: registerRes, loading, error: apiError }, execute] = useAxios({
        url: '/user',
        method: 'POST',
    });
    const [{ data: googleRes, loading: googleLoading, error: googleApiError }, googleExecute] = useAxios({
        url: '/auth/google',
        method: 'POST',
    });
    const [{ data: fbRes, loading: fbLoading, error: fbApiError }, fbExecute] = useAxios({
        url: '/auth/facebook',
        method: 'POST',
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
        const { success, response, metadata } = registerRes || fbRes || googleRes || {};
        if (success) {
            dispatch({
                type: ActionTypes.LOGIN,
                payload: {
                    token: response?.token,
                    metaData: metadata?.user,
                }
            });
            onClose();
        }
    }, [registerRes, googleRes, fbRes]);

    const getErrorText = (field: string): React.ReactElement | null => {
        if (!submitClicked && !isDirty) {
            return null;
        }
        const errorMessages: any = {
            ...errors
        };
        const formValues = getValues();

        if (formValues.accountType === AccountType.INDIVIDUAL) {
            if (!formValues.name) {
                errorMessages.name = {
                    message: 'Name is required',
                };
            } else if (formValues.name?.length < NAME_MIN_LENGTH) {
                errorMessages.name = {
                    message: 'Name is invalid. Enter atleast 3 characters for Name',
                };
            }
        }
        if (formValues.accountType === AccountType.BUSINESS) {
            if (!formValues.businessName) {
                errorMessages.businessName = {
                    message: 'Busines name is required',
                };
            } else if (formValues.businessName?.length < NAME_MIN_LENGTH) {
                errorMessages.businessName = {
                    message: 'Busines name is invalid',
                };
            }
            if (!formValues.tinNumber) {
                errorMessages.tinNumber = {
                    message: 'TIN number is required'
                }
            } else if (formValues.tinNumber?.length < TIN_MIN_LENGTH && !formValues.tinNumber.match(TIN_REGEX)) {
                errorMessages.tinNumber = {
                    message: 'Enter valid TIN number with atleast 6 characters',
                }
            }
            if (!formValues.phoneNumber) {
                errorMessages.phoneNumber = {
                    message: 'Phone Number is Required',
                }
            } else if (!formValues.phoneNumber.match(MOBILE_REGEX)) {
                errorMessages.phoneNumber = {
                    message: 'Phone Number is Invalid',
                }
            }
        }

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

    const PhoneCode = (): React.ReactElement => {
        return (
            <Form.Group>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Code"
                    className="mb-3"
                >
                    <Form.Select
                        {...register('phoneCode')}
                        placeholder="Code"
                        className={getErrorClassName('phoneCode')}
                    >
                        {!!phoneCodeData.length && phoneCodeData.map((phone: any) =>
                            <option value={phone.phoneCode} key={phone.id}>
                                {`+${phone.phoneCode} ${phone.name}`}
                            </option>
                        )}
                    </Form.Select>
                    {getErrorText('phoneCode')}
                </FloatingLabel>
            </Form.Group>
        );
    }

    const getIndividualFields = (): React.ReactElement => {
        return (
            <>
                <Form.Group className="mb-3">
                    <FloatingLabel label="Your Name" className="mb-3">
                        <Form.Control
                            {...register("name")}
                            placeholder="Your Name"
                            isValid={!!errors.name}
                            className={getErrorClassName('name')}
                        />
                        {getErrorText('name')}
                    </FloatingLabel>
                </Form.Group>
                <Row>
                    <Col md={6}>
                        <PhoneCode />
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Your phone number" className="mb-3">
                                <Form.Control
                                    {...register("phoneNumber")}
                                    type="number"
                                    placeholder="Your phone number"
                                    isValid={!!errors.phoneNumber}
                                    className={getErrorClassName('phoneNumber')}
                                />
                                {getErrorText('phoneNumber')}
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
            </>
        );
    };

    const getBusinessFields = (): React.ReactElement => {
        return (
            <>
                <Form.Group className="mb-3">
                    <FloatingLabel label="TIN number" className="mb-3">
                        <Form.Control
                            {...register("tinNumber")}
                            placeholder="TIN number"
                            isValid={!!errors.tinNumber}
                            className={getErrorClassName('tinNumber')}
                        />
                        {getErrorText('tinNumber')}
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel label="Legal business name" className="mb-3">
                        <Form.Control
                            {...register("businessName")}
                            placeholder="Legal business name"
                            isValid={!!errors.businessName}
                            className={getErrorClassName('businessName')}
                        />
                        {getErrorText('businessName')}
                    </FloatingLabel>
                </Form.Group>
                <Row>
                    <Col md={4}>
                        <PhoneCode />
                    </Col>
                    <Col md={8}>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Business phone number" className="mb-3">
                                <Form.Control
                                    {...register("phoneNumber")}
                                    type="number"
                                    placeholder="Business phone number"
                                    isValid={!!errors.phoneNumber}
                                    className={getErrorClassName('phoneNumber')}
                                />
                                {getErrorText('phoneNumber')}
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
            </>
        );
    };

    const getFieldsOnAccountType = (): React.ReactElement | null => {
        if (selectedAccountType) {
            return selectedAccountType === AccountType.INDIVIDUAL ? getIndividualFields() : getBusinessFields();
        }
        return null;
    };
    const isFormValid = (formValues: any): boolean => {
        if (!isEmpty(errors)) {
            return false;
        }
        if (formValues.accountType === AccountType.INDIVIDUAL) {
            if (!formValues.name || formValues.name.length < NAME_MIN_LENGTH) {
                return false;
            }
        }
        if (formValues.accountType === AccountType.BUSINESS) {
            if (!formValues.businessName || formValues.businessName.length < NAME_MIN_LENGTH) {
                return false;
            }
        }
        return true;
    };
    const onSubmit = (values: any) => {
        if (isFormValid(values)) {
            execute({
                data: {
                    ...values,
                }
            });
        }
    };
    const handleAccountTypeChange = (accountType: string) => {
        if (accountType === 'business') {
            setSelectedAccountType(AccountType.BUSINESS);
            setValue('tinNumber', '');
            setValue('businessName', '');
            setValue('phoneNumber', '');
        } else {
            setSelectedAccountType(AccountType.INDIVIDUAL);
            setValue('name', '');
            setValue('phoneNumber', '');
        }
    }
    const handleFormSubmit = (event: React.FormEvent) => {
        setSubmitClicked(true);
        event.preventDefault();
        handleSubmit(onSubmit)();
    };
    const handleLoginClick = () => {
        onClose();
        openLogin(true);
    };

    const showAPIErrorMessage = () => {
        if (!apiError && !fbApiError && !googleApiError) {
            return null;
        }
        return (
            <Alert variant="danger">
                {getAPIErrorMessage(apiError || fbApiError || googleApiError)}
            </Alert>
        );
    };
    const googleSuccess = (gRes: any) => {
        googleExecute({
            data: {
                accessToken: gRes.accessToken,
            },
        });
    }
    const facebookSuccess = (fbRes: any) => {
        fbExecute({
            data: {
                accessToken: fbRes.accessToken
            },
        });
    }

    return (
        <Modal show={show} onHide={onClose}>
            <div className="log-reg-pop">
                <div className="pt-3 modal-login">
                    <div className="modal-body px-0">
                        <Modal.Header closeButton>
                            <p className="ml-3"><strong>Create your account!</strong></p>
                        </Modal.Header>
                        {showAPIErrorMessage()}
                        <Form onSubmit={handleFormSubmit} noValidate>
                            <FloatingLabel label="Email address" className="mb-3">
                                <Form.Control
                                    {...register("email")}
                                    type="email"
                                    placeholder="Your Email"
                                    isValid={!!errors.email}
                                    className={getErrorClassName('email')}
                                />
                                {getErrorText('email')}
                            </FloatingLabel>
                            <FloatingLabel label="Password" className="mb-3" >
                                <Form.Control
                                    {...register("password")}
                                    type="password"
                                    placeholder="Password"
                                    isValid={!!errors.password}
                                    className={getErrorClassName('password')}
                                />
                                {getErrorText('password')}
                            </FloatingLabel>

                            <div className="form-group mb-3">
                                <Form.Check
                                    label="Individual"
                                    inline
                                    type="radio"
                                    id="Individual"
                                    value={AccountType.INDIVIDUAL}
                                    checked={selectedAccountType === AccountType.INDIVIDUAL}
                                    {...register("accountType")}
                                    onChange={() => handleAccountTypeChange(AccountType.INDIVIDUAL)}
                                    isValid={!!errors.accountType}
                                    className={getErrorClassName('accountType')}
                                />
                                <Form.Check
                                    label="Business"
                                    id="Business"
                                    inline
                                    type="radio"
                                    value={AccountType.BUSINESS}
                                    checked={selectedAccountType === AccountType.BUSINESS}
                                    {...register("accountType")}
                                    onChange={() => handleAccountTypeChange(AccountType.BUSINESS)}
                                    isValid={!!errors.accountType}
                                    className={getErrorClassName('accountType')}
                                />
                                {getErrorText('accountType')}
                            </div>
                            {selectedAccountType && getFieldsOnAccountType()}
                            <div className="form-group text-center mt-3">
                                <button type="submit" className="btn btn-success w-100">
                                    {
                                        loading ? (
                                            <Spinner animation="border" role="status"></Spinner>
                                        ) : 'Register'
                                    }
                                </button>
                            </div>
                        </Form>
                        <div className="text-center mt-3 mb-3">Already have an account?
                            <Nav.Link className='login-link' onClick={handleLoginClick}>Login</Nav.Link>
                        </div>
                    </div>
                    <div className="row justify-content-center mb-5">
                        <div className="col-12">
                            <GoogleLogin
                                clientId={GOOGLE_CLIENTID}
                                render={renderProps => (
                                    <Button
                                        className="glog-btn w-100"
                                        variant="outline-link"
                                        onClick={renderProps.onClick}
                                        disabled={googleLoading}
                                    >
                                        <img src="images/google.svg" /> Continue with Google
                                    </Button>
                                )}
                                buttonText="Login"
                                onSuccess={googleSuccess}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        <div className="col-12 mt-3">
                            <FacebookLogin
                                render={renderProps => (
                                    <Button
                                        className="fblog-btn w-100"
                                        variant="outline-link"
                                        onClick={renderProps.onClick}
                                        disabled={fbLoading}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 90 90"><g><path d="M90,15.001C90,7.119,82.884,0,75,0H15C7.116,0,0,7.119,0,15.001v59.998   C0,82.881,7.116,90,15.001,90H45V56H34V41h11v-5.844C45,25.077,52.568,16,61.875,16H74v15H61.875C60.548,31,59,32.611,59,35.024V41   h15v15H59v34h16c7.884,0,15-7.119,15-15.001V15.001z"></path></g></svg> Continue with Facebook
                                    </Button>
                                )}
                                appId={FB_APPID}
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={facebookSuccess}
                                onFailure={facebookSuccess}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};