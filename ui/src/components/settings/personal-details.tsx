import React, { useState, useEffect } from 'react';
import './settings.css';
import {
    Row,
    Col,
    Button,
    ListGroup,
    Card,
    Form,
    FloatingLabel,
    Image,
    Alert,
    Spinner,
} from 'react-bootstrap';
import {
    FaChevronLeft,
    FaGoogle,
    FaFacebook
} from 'react-icons/fa';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AiOutlineEdit } from 'react-icons/ai';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useAppContext, ActionTypes } from '../../contexts';
import { isEmpty } from 'lodash';
import { useAxios } from '../../services';
import { getAPIErrorMessage } from '../../utils';
import { GOOGLE_CLIENTID, FB_APPID } from '../../config';
import { ImageCropModal } from '.';
import { AlertType } from './types';
import './settings.css';

const standardSchema = yup.object().shape({
    name: yup.string().required('Name is Required'),
    location: yup.string().required('Location is Required'),
    birthday: yup.string().nullable().required('Date of Birth is Required'),
    sex: yup.string().required('Please Enter your Gender'),
    bio: yup.string().required('Bio is Required')
        .min(20, 'Please Enter at least 20 letters bio')
        .max(5000, 'Bio should not exceed more than 5000 characters'),
});

const businessSchema = yup.object().shape({
    businessName: yup.string().required('Please enter name of your business'),
    yearOfEstablishment: yup.string().nullable().required('Please Enter Year of Establishment'),
    aboutBusiness: yup.string().required('This Field is Required')
        .min(20, 'Please Enter at least 20 characters')
        .max(5000, 'About Business should not exceed more than 5000 characters'),
});

export const PersonalDetails: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useAppContext();
    const userData = state.user?.metaData;
    const [alert, setAlert] = useState<AlertType>({});
    const [imageSrc, setImageSrc] = useState<any>();
    const [openCropModal, setOpenCropModal] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(standardSchema),
        defaultValues: {
            name: userData?.name,
            location: userData?.location,
            birthday: userData?.birthday,
            sex: userData?.sex,
            bio: userData?.bio,
            memberSince: moment(userData?.memberSince).format('DD-MM-YYYY'),
            lastActiveAt: userData?.lastActiveAt,
        },
    });
    const { register: registerBusiness, handleSubmit: handleSubmitBusiness, formState: { errors: businessErrors } } = useForm({
        resolver: yupResolver(businessSchema),
        defaultValues: {
            businessName: userData?.name,
            yearOfEstablishment: userData?.yearOfEstablishment,
            aboutBusiness: userData?.aboutBusiness,
        },
    });
    const [{ data: response, loading, error: apiError }, execute] = useAxios({
        url: '/user/update',
        method: 'POST',
    });
    const [{ data: profileImageRes, loading: profileImageLoading, error: profileImageError }, profileImageExecute] = useAxios({
        url: '/user/picture',
        method: 'PUT',
    });
    const [{ data: googleResponse, loading: googleLoading, error: googleError }, googleExecute] = useAxios({
        url: '/user/google',
        method: 'PUT',
    });
    const [{ data: facebookResponse, loading: facebookLoading, error: facebookError }, facebookExecute] = useAxios({
        url: '/user/facebook',
        method: 'PUT'
    });
    const [{ data: googleDeleteResponse, loading: googleDeleteLoading, error: googleDeleteError }, googleDeleteExecute] = useAxios({
        url: '/user/google',
        method: 'DELETE',
    });
    const [{ data: fbDeleteResponse, loading: fbDeleteLoading, error: fbDeleteError }, fbDeleteExecute] = useAxios({
        url: '/user/facebook',
        method: 'DELETE',
    });

    useEffect(() => {
        if (response?.success) {
            setAlert({
                variant: 'success',
                message: response?.message || 'User Updated Successfully',
            });
            dispatch({
                type: ActionTypes.UPDATE_PROFILE,
                payload: {
                    metaData: response?.metadata?.user,
                }
            });
        }
        if (googleResponse?.success) {
            dispatch({
                type: ActionTypes.UPDATE_PROFILE,
                payload: {
                    metaData: googleResponse?.metadata?.user,
                }
            })
        }
        if (facebookResponse?.success) {
            dispatch({
                type: ActionTypes.UPDATE_PROFILE,
                payload: {
                    metaData: facebookResponse?.metadata?.user,
                }
            })
        }
        if (googleDeleteResponse?.success) {
            dispatch({
                type: ActionTypes.UPDATE_PROFILE,
                payload: {
                    metaData: googleDeleteResponse?.metadata?.user,
                }
            })
        }
        if (fbDeleteResponse?.success) {
            dispatch({
                type: ActionTypes.UPDATE_PROFILE,
                payload: {
                    metaData: fbDeleteResponse?.metadata?.user,
                }
            })
        }
        if (profileImageRes?.success) {
            dispatch({
                type: ActionTypes.UPDATE_PROFILE,
                payload: {
                    metaData: profileImageRes?.metadata?.user,
                }
            })
        }
    }, [response, googleResponse, facebookResponse, googleDeleteResponse, fbDeleteResponse, profileImageRes]);

    const handleGoogleDisconnect = () => {
        const confirmDisconnect = confirm('Are you sure you want to disconnect from your google account');
        if (confirmDisconnect) {
            googleDeleteExecute({});
        }
        else return;
    };
    const handleFacebookDisconnect = () => {
        const confirmDisconnect = confirm('Are you sure you want to disconnect from your facebook account');
        if (confirmDisconnect) {
            fbDeleteExecute({});
        }
        else return;
    }

    const responseGoogle = (response: any) => {
        if (response.accessToken) {
            googleExecute({
                data: {
                    accessToken: response.accessToken
                }
            });
        }
    };
    const responseFacebook = (response: any) => {
        if (response.accessToken) {
            facebookExecute({
                data: {
                    accessToken: response.accessToken
                }
            });
        }
    }

    const onSubmit = (values: any) => {
        if (isEmpty(errors)) {
            if (userData?.accountType === "standard") {
                execute({
                    data: {
                        name: values.name,
                        location: values.location,
                        birthday: values.birthday,
                        sex: values.sex,
                        bio: values.bio,
                        memberSince: values.memberSince,
                        accountType: 'standard',
                    }
                });
            } else {
                execute({
                    data: {
                        businessName: values.businessName,
                        yearOfEstablishment: values.yearOfEstablishment,
                        aboutBusiness: values.aboutBusiness,
                        accountType: 'business',
                    }
                })
            }
        }
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (userData?.accountType === "standard") {
            handleSubmit(onSubmit)();
        } else {
            handleSubmitBusiness(onSubmit)();
        }
    };

    const getErrorText = (field: string): React.ReactElement | null => {
        const errorMessages: any = {
            ...errors,
            ...businessErrors,
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
            ...errors,
            ...businessErrors,
        };
        return errorMessages[field] ? 'is-invalid' : '';
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setImageSrc(reader.result));
            reader.readAsDataURL(event.target.files[0]);
        }
        setOpenCropModal(true);
    };

    const onImageCropComplete = (croppedImageBlob: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(croppedImageBlob);
        const formData = new FormData();
        formData.append('image', croppedImageBlob);
        profileImageExecute({ data: formData });
    }

    return (
        <Card>
            <Card.Header className="d-flex align-items-center justify-content-between bg-white">
                <span className="d-flex align-items-center ">
                    <button className="btn btn-white d-md-block d-lg-none">
                        <FaChevronLeft />
                    </button>
                    {userData?.accountType === 'standard' ? 'Personal Details' : 'Business Information'}
                </span>
            </Card.Header>
            <Col md={8} className="card-content mx-auto">
                <Form onSubmit={handleFormSubmit} className="details-form p-3">
                    <div className="text-center">
                        <Image
                            className="profile-image"
                            src={userData?.profilePicture?.url || "/images/user-circle.svg"}
                            roundedCircle
                        />
                        <Form.Group className="mb-3">
                            <Form.Label className='profile-image-label'>
                                <AiOutlineEdit className="upload-image" />
                                <Form.Control style={{ display: 'none' }} type="file" onChange={handleImageUpload} />
                            </Form.Label>
                        </Form.Group>
                    </div>
                    {openCropModal &&
                        <ImageCropModal
                            show={openCropModal}
                            image={imageSrc}
                            onClose={() => { setOpenCropModal(false) }}
                            onImageCropComplete={onImageCropComplete}
                        />
                    }
                    {(apiError || alert.message) && (
                        <Alert variant={alert.message ? 'success' : 'danger'} onClose={() => setAlert({})} dismissible>
                            {alert.message || getAPIErrorMessage(apiError)}
                        </Alert>
                    )}
                    {userData?.accountType === "standard" ? (
                        <>
                            <FloatingLabel
                                label="Full Name"
                                className="mb-3"
                            >
                                <Form.Control
                                    {...register('name')}
                                    type="text"
                                    placeholder="Full Name"
                                    className={getErrorClassName('name')}
                                />
                                {getErrorText('name')}
                            </FloatingLabel>
                            <FloatingLabel label="Location" className="mb-3">
                                <Form.Select {...register('location')} className={getErrorClassName('location')}>
                                    <option>--Select Location---</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                                {getErrorText('location')}
                            </FloatingLabel>
                            <FloatingLabel
                                label="Birthday"
                                className="mb-3 mt-3"
                            >
                                <Form.Control
                                    {...register('birthday')}
                                    type="date"
                                    placeholder="Select Birthday"
                                    className={getErrorClassName('birthday')}
                                />
                            </FloatingLabel>
                            <FloatingLabel label="Sex" className="mb-3">
                                <Form.Select {...register('sex')} aria-label="Floating label select example">
                                    <option>Do Not Specify</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="other">Other</option>
                                </Form.Select>
                            </FloatingLabel>
                            <FloatingLabel label="Bio" className="mb-3">
                                <Form.Control
                                    style={{ height: '120px' }}
                                    as="textarea"
                                    type="text"
                                    placeholder="Bio"
                                    {...register('bio')}
                                    className={getErrorClassName('bio')}
                                />
                                {getErrorText('bio')}
                            </FloatingLabel>
                        </>) : (
                        <>
                            <FloatingLabel label="Business Name" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Name of Business"
                                    className={getErrorClassName('businessName')}
                                    {...registerBusiness('businessName')}
                                />
                                {getErrorText('businessName')}
                            </FloatingLabel>
                            <FloatingLabel label="Year Of Establishment" className="mb-3">
                                <Form.Control
                                    type="date"
                                    placeholder="Establishment Year"
                                    className={getErrorClassName('yearOfEstablishment')}
                                    {...registerBusiness('yearOfEstablishment')}
                                />
                                {getErrorText('yearOfEstablishment')}
                            </FloatingLabel>
                            <FloatingLabel label="About Business" className="mb-3">
                                <Form.Control
                                    as="textarea"
                                    style={{ height: '120px' }}
                                    placeholder="About Business"
                                    className={getErrorClassName('aboutBusiness')}
                                    {...registerBusiness('aboutBusiness')}
                                />
                                {getErrorText('aboutBusiness')}
                            </FloatingLabel>
                        </>
                    )}
                    <Form.Group as={Row} controlId="memberSinceText">
                        <Form.Label column sm="4">
                            Member Since
                        </Form.Label>
                        <Form.Label column sm="8">
                            {moment(userData?.memberSince).format('DD-MM-YYYY')}
                        </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="lastActiveAtText">
                        <Form.Label column sm="4">
                            Last Active At
                        </Form.Label>
                        <Form.Label column sm="8">
                            {moment(userData?.lastActiveAt).format('DD-MM-YYYY')}
                        </Form.Label>
                    </Form.Group>
                    <p className="mb-3"><strong>Connect your social media accounts for smoother experience!</strong></p>
                    <ListGroup as="ul" className="connectsocial mb-3">
                        <ListGroup.Item as="li">
                            <span><FaGoogle />  Google</span>
                            <span>
                                {!userData?.isGoogleVerified ?
                                    (
                                        <GoogleLogin
                                            clientId={GOOGLE_CLIENTID}
                                            render={renderProps => (
                                                <Form.Check
                                                    id='connect-google'
                                                    type="switch"
                                                    checked={userData?.isGoogleVerified}
                                                    onChange={renderProps.onClick}
                                                />
                                            )}
                                            buttonText="Login"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        />
                                    ) : (
                                        <Form.Check
                                            id='connect-google'
                                            type="switch"
                                            checked={userData?.isGoogleVerified}
                                            onChange={handleGoogleDisconnect}
                                        />
                                    )
                                }
                            </span>
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                            <span><FaFacebook /> Facebook</span>
                            <span>
                                {!userData?.isFacebookVerified ?
                                    (
                                        <FacebookLogin
                                            appId={FB_APPID}
                                            autoLoad={false}
                                            fields='name,email,picture'
                                            render={renderProps => (
                                                <Form.Check
                                                    id='connect-facebook'
                                                    type="switch"
                                                    checked={userData?.isFacebookVerified}
                                                    onChange={renderProps.onClick}
                                                />
                                            )}
                                            callback={responseFacebook}
                                            onFailure={responseFacebook}
                                        />
                                    ) : (
                                        <Form.Check
                                            id='connect-facebook'
                                            type="switch"
                                            checked={userData?.isFacebookVerified}
                                            onChange={handleFacebookDisconnect}
                                        />
                                    )
                                }
                            </span>
                        </ListGroup.Item>
                    </ListGroup>
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
};