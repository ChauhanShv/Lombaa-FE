import React, { useState, useEffect } from 'react';
import { Modal, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { FaRegClipboard, FaCopy, FaRegCopy } from 'react-icons/fa';
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    EmailShareButton,
    EmailIcon,
} from 'react-share';
import { ProductShareModalProps } from './types';

export const ProductShareModal: React.FC<ProductShareModalProps> = ({
    onClose,
}: ProductShareModalProps): React.ReactElement => {

    const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);
    const productUrl = window.location.href;
    const shareTitle = "Hey, check out this product from lombaa!! ";
    const shareBody = "Hi, I found this product on lombaa, can you check please";

    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(productUrl);
        setIsLinkCopied(true);
    }

    useEffect(() => {
        if (isLinkCopied) {
            setTimeout(() => {
                setIsLinkCopied(false);
            }, 3000);
        }
    }, [isLinkCopied]);

    return (
        <Modal show={true}>
            <Modal.Dialog className="m-0">
                <Modal.Header className='p-4' closeButton onHide={onClose}>
                    <Modal.Title>Share this product</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <div className="share-product-icon">
                        <FacebookShareButton
                            url={productUrl}
                            quote={shareTitle}
                            hashtag='#lombaa'
                        >
                            <FacebookIcon size={45} round />
                        </FacebookShareButton>
                    </div>
                    <div className="share-product-icon">
                        <WhatsappShareButton
                            url={productUrl}
                            title={shareTitle}
                            separator=" "
                        >
                            <WhatsappIcon size={45} round />
                        </WhatsappShareButton>
                    </div>
                    <div className='share-product-icon'>
                        <TelegramShareButton
                            url={productUrl}
                            title={shareTitle}
                        >
                            <TelegramIcon size={45} round />
                        </TelegramShareButton>
                    </div>
                    <div className="share-product-icon">
                        <TwitterShareButton
                            url={productUrl}
                        >
                            <TwitterIcon size={45} round />
                        </TwitterShareButton>
                    </div>
                    <div className="share-product-icon">
                        <EmailShareButton
                            url={productUrl}
                            subject={shareTitle}
                            body={shareBody}
                            separator=" "
                        >
                            <EmailIcon size={45} round />
                        </EmailShareButton>
                    </div>
                    <div className='my-4'>or copy link</div>
                    {isLinkCopied ? (
                        <Alert
                            className="product-copied-alert"
                            variant="success"
                        >
                            <FaCopy />{'  '}Link Copied
                        </Alert>
                    ) : (
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder={productUrl}
                                disabled={true}
                                value={undefined}
                                className="copy-product-link-input"
                            />
                            <InputGroup.Text
                                onClick={copyLinkToClipboard}
                                role="button"
                                className="product-link-copy-button"
                            >
                                <FaRegClipboard />
                            </InputGroup.Text>
                        </InputGroup>
                    )}
                </Modal.Body>
            </Modal.Dialog>
        </Modal>
    );
}