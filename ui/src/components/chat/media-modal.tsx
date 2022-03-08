import React from 'react';
import { Modal } from 'react-bootstrap';
import { MediaModalProps } from './types';

export const MediaModal: React.FC<MediaModalProps> = ({
    mediaSrc,
    onClose,
}: MediaModalProps): React.ReactElement => {
    return (
        <Modal show={true} size="xl">
            <Modal.Header className="m-3" closeButton onHide={onClose}>
            </Modal.Header>
            <img className="m-3" src={mediaSrc} alt='Image Modal' />
        </Modal>
    );
};
