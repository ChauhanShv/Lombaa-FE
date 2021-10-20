import React from 'react';
import { Modal } from 'react-bootstrap';
import './register.css';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';

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
                        <form action="" method="">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="name" placeholder="Enter your name" value="" />
                                <FaUser/>
                            </div>
                            <div className="form-group mb-3">
                                <input type="email" className="form-control" name="email" placeholder="Enter email address" value="" />
                                <FaEnvelope/>
                            </div>
                            <div className="form-group mb-3">
                            <input type="text" className="form-control" name="name" placeholder="Phone Number" value="" />
                            <FaPhone/>
                        </div>
                            <div className="form-group mb-3">
                                <input type="password" name="password" className="form-control" placeholder="Enter password" value="" />
                                <FaLock/>
                            </div>
                            <div className="form-group mb-3">
                                <input type="password" className="form-control" name="password_confirmation" placeholder="Confirm Password" />
                                <FaEyeSlash/>
                            </div>
                            <div className="form-group text-center mt-3">
                                <button id="signup-button" type="submit" className="btn btn-primary w-100">Register</button>
                                
                            </div>
                        </form>
                        <div className="text-center mt-3 mb-3">Already have an account? <a className="login" href="#loginModal3" data-dismiss="modal" data-toggle="modal">Login</a></div>
                    </div>
            <div className="row justify-content-center mb-5">
            <div className="col-5">
                <a href="#" className="btn btn-outline-success w-100"><FaGoogle/> Via Google</a>
            </div> 
            <div className="col-5">
                <a href="#" className="btn btn-outline-success w-100"><FaFacebook/> Via Facebook</a>
                </div>
            </div>
                </div>
            </div>
        </Modal>
    );
};