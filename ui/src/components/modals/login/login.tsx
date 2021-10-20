import React from 'react';
import { Modal } from 'react-bootstrap';
import './login.css';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
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
                        <form action="" method="">
                            <div className="form-group mb-3">
                                <input type="email" className="form-control" placeholder="Enter email address" value="" name="email" />
                                <FaEnvelope/>
                            </div>
                            <div className="form-group mb-3">
                                <input type="password" name="password" className="form-control" placeholder="Enter password" value="" />
                                <FaLock/>
                            </div>
                            <div className="row">
                                <div className="col text-left">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="item_checkbox" name="item_checkbox" value="option1" />
                                        <span className="custom-control-label">&nbsp;Remember Me</span>
                                    </label>
                                </div>
                                <div className="col text-end">
                                    <a href="" className="text-danger">Forgot Password ?</a>
                                </div>
                            </div>
                            <div className="form-group text-center mt-3">
                                <button id="signup-button" type="submit" className="btn btn-primary w-100">Login</button>
                                
                            </div>
                        </form>
                    </div>
                    <div className="text-center mb-4">Don't have an account? <a className="register" href="#registerModal3" data-dismiss="modal" data-toggle="modal">Register</a></div>
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