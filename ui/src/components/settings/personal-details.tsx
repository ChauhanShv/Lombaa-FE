import React, {useState} from 'react';
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
import {
    FaChevronLeft,
    FaGoogle,
    FaFacebook
} from 'react-icons/fa';
import ReactCrop from 'react-image-crop';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppContext } from '../../contexts';
import { isEmpty } from 'lodash';
import { useAxios } from '../../services/base-service';
import 'react-image-crop/dist/ReactCrop.css';
import { getAPIErrorMessage } from '../../utils';
import { PersonalDetailsProps, ImageModalProps } from './types';

const schema = yup.object().shape({
    name: yup.string(),
    location: yup.string(),
    birthday: yup.string(),
    sex: yup.string(),
});

export interface AlertType {
    variant?: string;
    message?: string;
};

export const ImageCropModal: React.FC<ImageModalProps> = ({onClose, show, image}: ImageModalProps): React.ReactElement => {
    const [crop, setCrop] = useState<Object>({aspect: 16/9});
    const handleOnCrop = (crop: any) => {
        console.log(crop);
        setCrop({crop});
    };
    return(
        <Modal md={12} show={show} onHide={onClose}>
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Crop Your Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReactCrop
                        className='ReactCrop'
                        crop={crop} 
                        src={ image }
                        onChange={handleOnCrop} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => onClose()}>Save Changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
};

export const PersonalPetails: React.FC = (): React.ReactElement => {
    const { state } = useAppContext();
    const [alert, setAlert] = useState<AlertType>({});
    const [imageSrc, setImageSrc] = useState<string>('');
    const [openCropModal,setOpenCropModal] = useState<boolean>(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: state.user?.name,
            location: state.user?.location,
            birthday: state.user?.birthday,
            sex: state.user?.sex,
        }, 
    });
    console.log('abhi', state);

    //API Call Remaining
    const [{ data: response, loading, error: apiError }, execute] = useAxios({
        url: '',
        method: 'PUT',
    });

    const onSubmit = (values: any) => {
        if (isEmpty(errors)) {
            execute({
                data: {
                    name: values.name ? values.name : state.user.name,
                    location: values.location ? values.location : state.user.location,
                    birthday: values.birthday ? values.birthday : state.user.birthday,
                    sex: values.sex ? values.sex : state.user.sex,
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
            console.log(event.target.files, event.target.files[0], 'Event Target Files');
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
                    </p>
                    {openCropModal && <ImageCropModal show={openCropModal} image={imageSrc} onClose={() => {setOpenCropModal(false)}} />}
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload your Profile Photo Here</Form.Label>
                        <Form.Control type="file" onChange={handleImageUpload} />
                    </Form.Group>
                    {(apiError || alert.message) && (
                            <Alert variant={alert.message ? 'success' : 'danger'} onClose={() => setAlert({})} dismissible>
                                {/* {alert.message || getAPIErrorMessage(apiError)} */}
                            </Alert>
                    )}
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
                            <option value="1">Do Not Specify</option>
                            <option value="2">Female</option>
                            <option value="3">Male</option>
                        </Form.Select>
                    </FloatingLabel>
                    <p className="mb-3"><strong>Connect your social media accounts for smoother experience!</strong></p>
                    <ListGroup as="ul" className="connectsocial mb-3">
                        <ListGroup.Item as="li">
                            <span><FaGoogle />  Google</span> <span>Toogle switch</span>
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                            <span><FaFacebook /> Facebook</span> <span>Toogle switch</span>
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