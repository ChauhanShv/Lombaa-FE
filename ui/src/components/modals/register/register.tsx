import React from 'react';
import { Modal, Alert } from 'react-bootstrap';

import './register.css';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import Form from 'react-bootstrap/Form'
import FormCheck from 'react-bootstrap/FormCheck'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

interface RegisterProps {
    show: boolean;
    onClose: Function;
};
export const Register: React.FC<RegisterProps> = ({
    show,
    onClose,
}: RegisterProps): React.ReactElement => {
    return (
        <Modal show={show} onHide={onClose}>
            <div className="log-reg-pop">
                <div className="pt-3 modal-login">

                    <div className="modal-body">
                        <p className="ml-3"><strong>Create your account!</strong></p>
                        <Alert variant="danger">
                            This is a alert—check it out!
                        </Alert>
                        <form action="" method="">
                          
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" >
                                <Form.Control type="email" placeholder="name@example.com" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Password" className="mb-3" >
                                <Form.Control type="password" placeholder="Password" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Confirm Password" className="mb-3" >
                                <Form.Control type="password" placeholder="Confirm Password" />
                            </FloatingLabel>


                            <div className="form-group mb-3">
                                <Form.Check name="usertype" label="Individual" inline type="radio" aria-label="radio 1" />
                                <Form.Check name="usertype" label="Business" inline type="radio" aria-label="radio 1" />
                            </div>

                            <FloatingLabel controlId="floatingInput" label="Enter your name" className="mb-3" >
                                <Form.Control type="text" placeholder="John Smith" />
                            </FloatingLabel>
                            
                            <FloatingLabel controlId="floatingInput" label="Your Phone Number" className="mb-3" >
                                <Form.Control type="tel" placeholder="Your Phone Number" />
                            </FloatingLabel>
                            
                            <FloatingLabel controlId="floatingInput" label="TIN Number" className="mb-3" >
                                <Form.Control type="number" placeholder="TIN Number" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Legal Business Name" className="mb-3" >
                                <Form.Control type="text" placeholder="Legal Business Name" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Business Phone Number" className="mb-3" >
                                <Form.Control type="tel" placeholder="Business Phone Number" />
                            </FloatingLabel>


                            <div className="form-group text-center mt-3">
                                <button id="signup-button" type="submit" className="btn btn-primary w-100">Register</button>

                            </div>
                        </form>
                        <div className="text-center mt-3 mb-3">Already have an account?                         
                        <Button variant="link">Login</Button>
                        </div>
                    </div>
                    <div className="row justify-content-center mb-5">
                        <div className="col-5">
                            <Button className="w-100" variant="outline-success"><FaGoogle /> Via Google</Button>                            
                        </div>
                        <div className="col-5">
                            <Button className="w-100" variant="outline-success"><FaFacebook /> Via Facebook</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};