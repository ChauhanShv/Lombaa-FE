import React from 'react';

import {
    ListGroup,
    Card,
    Form,
    FloatingLabel,
    Image,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    FaChevronLeft,
    FaGoogle,
    FaFacebook
} from 'react-icons/fa';

export const ChangePassword: React.FC = (): React.ReactElement => {
    return (
        <Card>
            <Card.Header className="d-flex align-items-center justify-content-between bg-white">
                <span className="d-flex align-items-center "><button className="btn btn-white d-md-block d-lg-none"><FaChevronLeft /></button> Change Password</span>
                <button className="btn btn-success">Save</button>
            </Card.Header>
            <div className="card-content col-md-8 mx-auto">
                <div className="details-form p-3 text-center">

                    <FloatingLabel controlId="floatingInput" label="Enter your current password" className="mb-3">
                        <Form.Control type="password" placeholder="Enter your current password" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="New password" className="mb-3">
                        <Form.Control type="password" placeholder="New password" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Re-type new password" className="mb-3">
                        <Form.Control type="password" placeholder="Re-type new password" />
                    </FloatingLabel>
                    <button className="btn btn-lg btn-success w-100 mb-3">Change</button>
                    <Link to="/forgot-password">
                        <button className="link btn text-success">Forgot Password?</button>
                    </Link>
                </div>
            </div>
        </Card>
    );
};