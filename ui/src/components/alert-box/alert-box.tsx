import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface AlertBoxProps {
    title: string,
    description: string,
    onClose: () => void,
    onOk: () => void,
}

export const AlertBox = ({ title, description, onClose, onOk }: AlertBoxProps) => {
    return (
        <Modal show={true}>
            <Modal.Dialog className="m-0">
                <Modal.Header className="p-4" closeButton onHide={() => onClose()}>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{description}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => onClose()}>Close</Button>
                    <Button variant="primary" onClick={() => onOk()}>Ok</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
}