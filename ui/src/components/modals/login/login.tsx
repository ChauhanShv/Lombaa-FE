import React from 'react';
import { Modal } from 'react-bootstrap';
import './login.css';

interface LoginProps {
    show: boolean;
    onClose: Function;
};
export const Login: React.FC<LoginProps> = ({
    show,
    onClose,
}): React.ReactElement => {
    return (
        <Modal show={show} onHide={onClose}>
            <div className="modal-dialog modal-login">
                <div className="modal-content pt-3">
                    
                    <div className="modal-body">
                        <p className="ml-3"><strong>Welcome back!</strong></p>	
                        <form action="" method="">
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Enter email address" value="" name="email" />
                                <i className="fa fa-envelope"></i>
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" className="form-control" placeholder="Enter password" value="" />
                                <i className="fa fa-lock"></i>
                            </div>
                            <div className="row">
                                <div className="col text-left">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="item_checkbox" name="item_checkbox" value="option1" />
                                        <span className="custom-control-label">&nbsp;Remember Me</span>
                                    </label>
                                </div>
                                <div className="col text-right">
                                    <a href="" className="text-danger">Forgot Password ?</a>
                                </div>
                            </div>
                            <div className="form-group text-center mt-3">
                                <button id="signup-button" type="submit" className="btn btn-primary w-100">Login</button>
                                
                            </div>
                        </form>
                    </div>
                    <div className="text-center mb-3">Don't have an account? <a className="register" href="#registerModal3" data-dismiss="modal" data-toggle="modal">Register</a></div>
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