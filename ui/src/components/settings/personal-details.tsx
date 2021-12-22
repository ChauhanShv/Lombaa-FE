import React, { useState, useEffect } from 'react';
import './settings.css';
import {
    Row,
    Col,
    Button,
    Card,
    Form,
    FloatingLabel,
    Image,
    Alert,
    Spinner,
} from 'react-bootstrap';
import { FaChevronLeft } from 'react-icons/fa';
import moment from 'moment';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AiOutlineEdit } from 'react-icons/ai';
import { SocialMediaConnect, AccountTypeSelector, LocationSelector } from '.';
import { useAppContext, ActionTypes } from '../../contexts';
import { isEmpty } from 'lodash';
import { useAxios } from '../../services';
import { getAPIErrorMessage } from '../../utils';
import { ImageCropModal } from '.';
import { AlertType } from './types';
import './settings.css';

const standardSchema = yup.object().shape({
    name: yup.string().required('Name is Required'),
    country: yup.string().required('Country is Required'),
    region: yup.string().required('Region is Required'),
    city: yup.string().required('City is Required'),
    location: yup.string().required('Location is Required'),
    birthday: yup.string().nullable().required('Date of Birth is Required'),
    sex: yup.string().nullable().required('Please Enter your Gender'),
    bio: yup.string().nullable().required('Bio is Required')
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
    const [accountType, setAccountType] = useState<string>(userData?.accountType);
    const [openCropModal, setOpenCropModal] = useState<boolean>(false);
    const [locationId, setLocationId] = useState<object>({});
    const formMethods = useForm({
        resolver: yupResolver(standardSchema),
        defaultValues: {
            name: userData?.name,
            location: userData?.location,
            birthday: userData?.birthday,
            sex: userData?.sex,
            bio: userData?.bio,
        },
    });
    const { register: registerBusiness, handleSubmit: handleSubmitBusiness, formState: { errors: businessErrors } } = useForm({
        resolver: yupResolver(businessSchema),
        defaultValues: {
            businessName: userData?.businessName,
            yearOfEstablishment: userData?.yearOfEstablishment,
            aboutBusiness: userData?.aboutBusiness,
        },
    });
    const { register, handleSubmit, formState: { errors } } = formMethods;
    const [{ data: response, loading, error: apiError }, execute] = useAxios({
        url: '/user/update',
        method: 'POST',
    });
    const [{ data: profileImageRes, loading: profileImageLoading, error: profileImageError }, profileImageExecute] = useAxios({
        url: '/user/picture',
        method: 'PUT',
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
            if (userData?.accountType !== accountType) {
                dispatch({
                    type: ActionTypes.UPDATE_PROFILE,
                    payload: {
                        metaData: {
                            ...state.user?.metaData,
                            accountType: accountType,
                        }
                    }
                });
            }
        }
        if (profileImageRes?.success) {
            dispatch({
                type: ActionTypes.UPDATE_PROFILE,
                payload: {
                    metaData: profileImageRes?.metadata?.user,
                }
            })
        }
    }, [response, profileImageRes]);

    const onSubmit = (values: any) => {
        if (isEmpty(errors)) {
            if (userData?.accountType === "standard") {
                execute({
                    data: {
                        name: values.name,
                        location: locationId,
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

    const handleOnAccountTypeChange = (accountType: string) => {
        setAccountType(accountType);
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
                <FormProvider {...formMethods}>
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
                                    <Form.Control style={{ display: 'none' }} type="file" accept='image/*' onChange={handleImageUpload} />
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
                            <Alert variant={alert.message ? 'success' : 'danger'} onClose={() => setAlert({})}>
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
                                <LocationSelector onCitySelected={(data: object) => setLocationId(data)} />
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
                                    {getErrorText('birthday')}
                                </FloatingLabel>
                                <FloatingLabel label="Sex" className="mb-3">
                                    <Form.Select {...register('sex')} aria-label="Floating label select example">
                                        <option>Do Not Specify</option>
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                        <option value="other">Other</option>
                                    </Form.Select>
                                    {getErrorText('sex')}
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
                                {moment(userData?.memberSince).format('LLL')}
                            </Form.Label>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="lastActiveAtText">
                            {userData?.lastActiveAt && (
                                <>
                                    <Form.Label column sm="4">
                                        Last Active At
                                    </Form.Label>
                                    <Form.Label column sm="8">
                                        {moment(userData?.lastActiveAt).format('LLL')}
                                    </Form.Label>
                                </>
                            )}
                        </Form.Group>

                        <AccountTypeSelector onChangeAccountType={handleOnAccountTypeChange} />

                        <SocialMediaConnect />

                        <Button type="submit" className="btn btn-success w-100">
                            {
                                loading ? (
                                    <Spinner animation="border" role="status"></Spinner>
                                ) : 'Save'
                            }
                        </Button>
                    </Form>
                </FormProvider>
            </Col>
        </Card>
    );
};