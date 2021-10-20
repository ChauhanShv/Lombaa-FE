import React from 'react';
import { Modal, Alert } from 'react-bootstrap';
import './login.css';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
import Form from 'react-bootstrap/Form'
import FormCheck from 'react-bootstrap/FormCheck'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
interface LoginProps {
    show: boolean;
    onClose: Function;
};
export const Login: React.FC<LoginProps> = ({
    show,
    onClose,
}): React.ReactElement => {
    return (
        <Modal show={show} onHide={onClose} className="">
            <div className="log-reg-pop">
                <div className="pt-3 modal-login">
                    
                    <div className="modal-body">
                        <p className="ml-3"><strong>Welcome back!</strong></p>	
                        <Alert variant="danger">
                            This is a alert—check it out!
                        </Alert>
                        <form action="" method="">
                          
                            <FloatingLabel controlId="floatingInput" label="Your Email address" className="mb-3" >
                                <Form.Control type="email" placeholder="name@example.com" />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingInput" label="Password" className="mb-3" >
                                <Form.Control type="password" placeholder="Password" />
                            </FloatingLabel>

                            <div className="form-group mb-3 d-flex justify-content-between align-items-center">
                                <Form.Check name="usertype" label="Remember Me" inline type="checkbox" aria-label="radio 1" />
                                <Button variant="link">Forgot Password?</Button>
                            </div>
                         
                            <div className="form-group text-center mt-3">
                                <button id="signup-button" type="submit" className="btn btn-primary w-100">Login</button>
                                
                            </div>
                        </form>
                    </div>
                    <div className="text-center mb-4">Don't have an account? <Button className="px-0" variant="link">Register</Button></div>
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