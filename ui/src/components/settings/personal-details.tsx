import React, {useEffect, useState} from 'react';
import './settings.css';
import {
    ListGroup,
    Card,
    Form,
    FloatingLabel,
    Image,
} from 'react-bootstrap';
import {
    FaChevronLeft,
    FaGoogle,
    FaFacebook
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppContext } from '../../contexts';
import { isEmpty } from 'lodash';
import { useAxios } from '../../services/base-service';

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

export const PersonalPetails: React.FC = (): React.ReactElement => {
    const { state } = useAppContext();
    const [alert, setAlert] = useState<AlertType>({});
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
                    location: values.location ? values.location : '',
                    birthday: values.birthday ? values.birthday : '',
                    sex: values.sex ? values.sex : '',
                }
            });
        }
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleSubmit(onSubmit)();
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
                        <Image src="https://dummyimage.com/100/007bff/efefef" roundedCircle />
                    </p>
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
                    <button type="submit" className="btn btn-success w-100">Save</button>
                </Form>
            </div>
        </Card>
    );
};