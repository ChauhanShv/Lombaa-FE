import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

export const OptionalDetailsForm: React.FC = (): React.ReactElement => {
    return (
        <>
            <h5 className="mb-3">Optional details</h5>
            <p className="text-muted">With these details, buyers can find your listing more easily and ask fewer questions.</p>

            <h6 className="text-muted">Features</h6>
            <FloatingLabel className="mb-5" controlId="floatingSelect" label="Features">
                <Form.Select aria-label="Floating label select example">
                    <option>Select Features</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </FloatingLabel>


            <h5 className="mb-3">Deal Method</h5>
            <div className="mb-5">
                <Form.Check label="Meet-up" />
                <Form.Check label="Delivery" />
            </div>

            <h5 className="mb-3">Payment methods</h5>
            <div className="mb-5">
                Coming Soon...
            </div>
        </>
    );
};