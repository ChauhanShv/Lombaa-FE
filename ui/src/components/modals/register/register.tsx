import React from 'react';
import { Modal } from 'react-bootstrap';
import './register.css';

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
            <div className="modal-dialog modal-login">
                <div className="modal-content pt-3">
                    
                    <div className="modal-body">
                        <p className="ml-3"><strong>Create your account!</strong></p>
                        <form action="" method="">
                            <div className="form-group">
                                <input type="text" className="form-control" name="name" placeholder="Enter your name" value="" />
                                <i className="fa fa-user"></i>
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" name="email" placeholder="Enter email address" value="" />
                                <i className="fa fa-envelope"></i>
                            </div>
                            <div className="form-group">
                            <input type="text" className="form-control" name="name" placeholder="Phone Number" value="" />
                            <i className="fa fa-phone"></i>
                        </div>
                            <div className="form-group">
                                <input type="password" name="password" className="form-control" placeholder="Enter password" value="" />
                                <i className="fa fa-lock"></i>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password_confirmation" placeholder="Confirm Password" />
                                <i className="fa fa-eye-slash"></i>
                            </div>
                            <div className="form-group text-center mt-3">
                                <button id="signup-button" type="submit" className="btn btn-primary w-100">Register</button>
                                
                            </div>
                        </form>
                        <div className="text-center mb-3">Already have an account? <a className="login" href="#loginModal3" data-dismiss="modal" data-toggle="modal">Login</a></div>
                    </div>
            <div className="row justify-content-center mb-4">
            <div className="col-5">
                <a href="#" className="btn btn-outline-success w-100"><i className="fab fa-google"></i> Via Google</a>
            </div> 
            <div className="col-5">
                <a href="#" className="btn btn-outline-success w-100"><i className="fab fa-facebook"></i> Via Facebook</a>
                </div>
            </div>
                </div>
            </div>
        </Modal>
    );
};