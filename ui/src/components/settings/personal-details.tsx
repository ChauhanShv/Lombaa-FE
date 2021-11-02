import React, { useState, useEffect, useRef } from 'react';
import './settings.css';
import {
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
import ToggleButton from 'react-bootstrap/ToggleButton';
import {
    FaChevronLeft,
    FaGoogle,
    FaFacebook
} from 'react-icons/fa';
import ReactCrop, { Crop } from 'react-image-crop';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppContext, ActionTypes } from '../../contexts';
import { isEmpty } from 'lodash';
import { useAxios } from '../../services/base-service';
import 'react-image-crop/dist/ReactCrop.css';
import { getAPIErrorMessage } from '../../utils';
import { PersonalDetailsProps, ImageModalProps } from './types';
import { AiOutlineEdit } from 'react-icons/ai';
import './settings.css';

const standardSchema = yup.object().shape({
    name: yup.string(),
    location: yup.string(),
    birthday: yup.string(),
    sex: yup.string(),
    memberSince: yup.string(),
    bio: yup.string(),
    lastActiveAt: yup.string(),
}).required();

const buisnessSchema = yup.object().shape({
    yearOfEstablishment: yup.string(),
    aboutBuisness: yup.string(),
}).required();

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
            memberSince: state.user?.metaData?.memberSince,
            lastActiveAt: state.user?.metaData?.lastActiveAt,
        }, 
    });
    const { register: registerBuissness, handleSubmit: handleSubmitBuisness, formState: { errors: buisnessErrors} } = useForm({
        resolver: yupResolver(buisnessSchema),
        defaultValues: {

        },
    })
    //API Call Remaining
    const [{ data: response, loading, error: apiError }, execute] = useAxios({
        url: '/user/update',
        method: 'POST',
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
    }, [response]);

    const onSubmit = (values: any) => {
        if (isEmpty(errors)) {
            execute({
                data: {
                    name: values.name ? values.name : state.user?.metaData?.name,
                    location: values.location ? values.location : state.user?.metaData?.location,
                    birthday: values.birthday ? values.birthday : state.user?.metaData?.birthday,
                    sex: values.sex ? values.sex : state.user?.metaData?.sex,
                    bio: values.bio ? values.bio : state.user?.metaData?.bio,
                }
            });
        }
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleSubmit(onSubmit)();
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
                        <Form.Group controlId="formFile" className="mb-3">
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
                    {state.user?.metaData?.accountType==="standard" ? ( <>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Full Name"
                            className="mb-3"
                        >
                            <Form.Control 
                                {...register('name')}
                                type="text"
                                placeholder="Full Name"
                            />
                            {getErrorText('name')}
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingSelect" label="Select Location" className="mb-3">
                            <Form.Select {...register('location')} aria-label="Floating label select example">
                                <option>Select Location</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Birthday"
                            className="mb-3"
                        >
                            <Form.Control {...register('birthday')} type="date" placeholder="Select Birthday" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingSelect" label="Sex" className="mb-3">
                            <Form.Select {...register('sex')} aria-label="Floating label select example">
                                <option>Do Not Specify</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel controlId="bioText" label="Bio" className="mb-3">
                            <Form.Control
                                style={{height: '120px'}}
                                as="textarea"
                                type="text"
                                placeholder="Bio" 
                                {...register('bio')}
                            />
                            {getErrorText('bio')}
                        </FloatingLabel>
                        <FloatingLabel controlId="memberSinceText" label="Member Since" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Member Since" 
                                {...register('memberSince')}
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="lastActiveText" label="Last Active" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Last Active" 
                                {...register('lastActiveAt')}
                            />
                        </FloatingLabel> </>)
                        :  (
                            <>
                                <FloatingLabel controlId="year-of-establish" label="Year Of Establishment" className="mb-3">
                                    <Form.Control
                                        placeholder="Establishment Year" />
                                </FloatingLabel>
                                <FloatingLabel controlId="aboutBuisness" label="About Buisness" className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="About Buisness" />
                                </FloatingLabel>
                            </>
                        )
                    }
                    <p className="mb-3"><strong>Connect your social media accounts for smoother experience!</strong></p>
                    <ListGroup as="ul" className="connectsocial mb-3">
                        <ListGroup.Item as="li">
                            <span><FaGoogle />  Google</span>
                            <span>
                                <Form.Check
                                    id='connect-google'
                                    type="switch"
                                    checked={state.user?.metaData?.isGoogleVerified ? true : false}
                                    onChange={(e) => {e.preventDefault}}
                                /> 
                            </span>
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                            <span><FaFacebook /> Facebook</span>
                            <span>
                                <Form.Check
                                    id='connect-facebook'
                                    type="switch"
                                    checked={state.user?.metaData?.isFacebookVerified ? true : false}
                                />
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