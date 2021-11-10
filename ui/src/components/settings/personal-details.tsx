import React, { useState, useEffect, useRef } from 'react';
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
    Modal,
    Spinner,
} from 'react-bootstrap';
import {
    FaChevronLeft,
    FaGoogle,
    FaFacebook
} from 'react-icons/fa';
import moment from 'moment';
import ReactCrop, { Crop } from 'react-image-crop';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AiOutlineEdit } from 'react-icons/ai';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useAppContext, ActionTypes } from '../../contexts';
import { isEmpty } from 'lodash';
import { useAxios } from '../../services/base-service';
import 'react-image-crop/dist/ReactCrop.css';
import { getAPIErrorMessage } from '../../utils';
import { ImageModalProps } from './types';
import { GOOGLE_CLIENTID, FB_APPID } from '../../config';
import './settings.css';

const standardSchema = yup.object().shape({
    name: yup.string().required('Name is Required'),
    location: yup.string().required('Location is Required'),
    birthday: yup.string().required('Date of Birth is Required'),
    sex: yup.string(),
    memberSince: yup.string(),
    bio: yup.string().required('Bio is Required')
    .min(100, 'Please Enter at least 100 letters bio')
    .max(5000, 'Bio should not exceed more than 5000 characters'),
    lastActiveAt: yup.string(),
}).required();

const businessSchema = yup.object().shape({
    yearOfEstablishment: yup.string().required('Please Enter Year of Establishment'),
    aboutBusiness: yup.string().required('This Field is Required')
    .min(100, 'Please Enter at least 100 characters')
    .max(5000, 'About Business should not exceed more than 5000 characters'),
});

export interface AlertType {
    variant?: string;
    message?: string;
};

export const ImageCropModal: React.FC<ImageModalProps> = ({onClose, show, image}: ImageModalProps): React.ReactElement => {
    const [crop, setCrop] = useState<Crop>({x: 0, y: 0, width: 0, height: 0, unit: 'px', aspect: 16/9});
    const [completedCrop, setCompletedCrop] = useState<Crop>({x: 0, y: 0, width: 0, height: 0, unit: 'px'});
    const imgRef = useRef<any>(image);
    const previewCanvasRef = useRef<any>(null);
    const handleOnCrop = (crop: any) => {
        setCrop({crop});
    };
    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
          return;
        }    
        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;
    
        const scaleX: any = image.naturalWidth / image.width;
        const scaleY: any = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;
    
        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;
    
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';
    }, [completedCrop]);
    
    return(
        <Modal md={12} show={show} onHide={onClose}>
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Crop Your Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReactCrop
                        ruleOfThirds
                        className='ReactCrop'
                        crop={crop} 
                        src={image}
                        onChange={handleOnCrop}
                        onComplete={(c) => setCompletedCrop(c)}
                    />
                    <canvas
                        ref={previewCanvasRef}
                        // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                        style={{
                            width: Math.round(completedCrop?.width ?? 0),
                            height: Math.round(completedCrop?.height ?? 0)
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => onClose()}>Save Changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
};

export const PersonalPetails: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useAppContext();
    const [alert, setAlert] = useState<AlertType>({});
    const [imageSrc, setImageSrc] = useState<string>('');
    const [openCropModal,setOpenCropModal] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(standardSchema),
        defaultValues: {
            name: state.user?.metaData?.name,
            location: state.user?.metaData?.location,
            birthday: state.user?.metaData?.birthday,
            sex: state.user?.metaData?.sex,
            bio: state.user?.metaData?.bio,
            memberSince: moment(state?.user?.metaData?.memberSince).format('DD-MM-YYYY'),
            lastActiveAt: state.user?.metaData?.lastActiveAt,
        }, 
    });
    const { register: registerBusiness, handleSubmit: handleSubmitBusiness, formState: { errors: businessErrors} } = useForm({
        resolver: yupResolver(businessSchema),
        defaultValues: {
            yearOfEstablishment: state.user?.metaData?.yearOfEstablishment,
            aboutBusiness: state.user?.metaData?.aboutBusiness,
        },
    });
    const [{ data: response, loading, error: apiError }, execute] = useAxios({
        url: '/user/update',
        method: 'POST',
    });
    const [{data: googleResponse, loading: googleLoading, error: googleError}, googleExecute] = useAxios({
        url: '/user/google',
        method: 'PUT',
    });
    const [{data: facebookResponse, loading: facebookLoading, error: facebookError}, facebookExecute] = useAxios({
        url: '/user/facebook',
        method: 'PUT'
    });
    const [{data: googleDeleteResponse, loading: googleDeleteLoading, error: googleDeleteError}, googleDeleteExecute] = useAxios({
        url: '/user/google',
        method: 'DELETE',
    });
    const [{data: fbDeleteResponse, loading: fbDeleteLoading, error: fbDeleteError}, fbDeleteExecute] = useAxios({
        url: '/user/facebook',
        method: 'DELETE',
    });

    useEffect(() => {
        if(response?.success) {
            setAlert({
                variant: 'success',
                message: response?.message || 'User Updated Successfully',
            });
        }
        dispatch({
            type: ActionTypes.UPDATE_PROFILE,
            payload: {
                token: response?.response?.token,
                user: response?.metadata,
            }
        });
    }, [response, googleResponse, facebookResponse, googleDeleteResponse, fbDeleteResponse]);

    const handleGoogleDisconnect = () => {
        googleDeleteExecute({});
    };
    const handleFacebookDisconnect = () => {
        fbDeleteExecute({});
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
            if(state.user?.metaData?.accountType === "standard") {
                execute({
                    data: {
                        name: values.name,
                        location: values.location,
                        birthday: values.birthday,
                        sex: values.sex,
                        bio: values.bio,
                        memberSince: values.memberSince,
                    }
                });
            } else {
                execute({
                    data: {
                        yearOfEstablishment: values.yearOfEstablishment,
                        aboutBusiness: values.aboutBusiness,
                    }
                })
            }
        }
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if(state?.user?.metaData?.accountType === "standard") {
            handleSubmit(onSubmit)();
        } else {
            handleSubmitBusiness(onSubmit)();
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
            ...errors,
            ...businessErrors,
        };
        return errorMessages[field] ? 'is-invalid' : '';
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]) {
            setImageSrc(URL.createObjectURL(event.target.files[0]));
        }
        setOpenCropModal(true);
    };

    return (
        <Card>
            <Card.Header className="d-flex align-items-center justify-content-between bg-white">
                <span className="d-flex align-items-center "><button className="btn btn-white d-md-block d-lg-none"><FaChevronLeft /></button> Personal details</span>
                <button className="btn btn-success">Save</button>
            </Card.Header>
            <div className="card-content col-md-8 mx-auto">
                <Form onSubmit={handleFormSubmit} className="details-form p-3">
                    <p className="text-center">
                        <Image style={{width: '150px', height: '150px'}} src={imageSrc || "https://dummyimage.com/100/007bff/efefef"} roundedCircle />
                        <Form.Group className="mb-3">
                            <Form.Label className='profile-image-label'>
                                <AiOutlineEdit className="upload-image" />
                            </Form.Label>
                            <Form.Control style={{display: 'none'}} type="file" onChange={handleImageUpload} />
                        </Form.Group>
                    </p>
                    {openCropModal && <ImageCropModal show={openCropModal} image={imageSrc} onClose={() => {setOpenCropModal(false)}} />}
                    {(apiError || alert.message) && (
                            <Alert variant={alert.message ? 'success' : 'danger'} onClose={() => setAlert({})} dismissible>
                                {alert.message || getAPIErrorMessage(apiError)}
                            </Alert>
                    )}
                    {state.user?.metaData?.accountType === "standard" ? (
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
                        <FloatingLabel label="Select Location" className="mb-3">
                            <Form.Select 
                                {...register('location')} 
                                aria-label="Floating label select example"
                                className={getErrorClassName('location')}
                            >
                                <option>Select Location</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel
                            label="Birthday"
                            className="mb-3"
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
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel label="Bio" className="mb-3">
                            <Form.Control
                                style={{height: '120px'}}
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
                                <FloatingLabel label="Year Of Establishment" className="mb-3">
                                    <Form.Control
                                        placeholder="Establishment Year" 
                                        className={getErrorClassName('yearOfEstablishment')}
                                        {...registerBusiness('yearOfEstablishment')}
                                    />
                                </FloatingLabel>
                                <FloatingLabel label="About Business" className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="About Business"
                                        className={getErrorClassName('aboutBusiness')}
                                        {...registerBusiness('aboutBusiness')}
                                    />
                                </FloatingLabel>
                        </>
                    )}
                    <Form.Group as={Row} controlId="memberSinceText">
                        <Form.Label column sm="4">
                            Member Since
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly {...register('memberSince')} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="lastActiveAtText">
                        <Form.Label column sm="4">
                            Last Active At
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly {...register('lastActiveAt')} />
                        </Col>
                    </Form.Group>
                    <p className="mb-3"><strong>Connect your social media accounts for smoother experience!</strong></p>
                    <ListGroup as="ul" className="connectsocial mb-3">
                        <ListGroup.Item as="li">
                        <span><FaGoogle />  Google</span>
                        <span>
                            {!state?.user?.metaData?.isGoogleVerified ? 
                                (
                                    <GoogleLogin
                                        clientId={GOOGLE_CLIENTID}
                                        render={renderProps => (
                                            <Form.Check
                                                id='connect-google'
                                                type="switch"
                                                checked={state?.user?.metaData?.isGoogleVerified}
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
                                        checked={state?.user?.metaData?.isGoogleVerified}
                                        onChange={handleGoogleDisconnect}
                                    />
                                )
                            }
                        </span>
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                            <span><FaFacebook /> Facebook</span>
                            <span>
                                {!state?.user?.metaData?.isFacebookVerified ? 
                                    (
                                        <FacebookLogin
                                            appId={FB_APPID}
                                            autoLoad={false}
                                            fields='name,email,picture'
                                            render={renderProps => (
                                                <Form.Check
                                                    id='connect-facebook'
                                                    type="switch"
                                                    checked={state?.user?.metaData?.isFacebookVerified}
                                                    onChange={state?.user?.metaData?.isFacebookVerified ? null :renderProps.onClick}
                                                />
                                            )}
                                            callback={responseFacebook}
                                            onFailure={responseFacebook}
                                        />
                                    ) : (
                                        <Form.Check
                                            id='connect-facebook'
                                            type="switch"
                                            checked={state?.user?.metaData?.isFacebookVerified}
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
            </div>
        </Card>
    );
};