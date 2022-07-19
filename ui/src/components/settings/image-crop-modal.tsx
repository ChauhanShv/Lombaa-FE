import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { ImageModalProps } from './types';

export const ImageCropModal: React.FC<ImageModalProps> = ({ onClose, show, image, onImageCropComplete }: ImageModalProps): React.ReactElement => {
    const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, width: 100, height: 100, unit: '%', aspect: 3 / 4 });
    const [completedCrop, setCompletedCrop] = useState<Crop>({ x: 0, y: 0, width: 0, height: 0, unit: 'px' });
    const [completedCropImage, setCompletedCropImage] = useState<any>();
    const imgRef = useRef<any>();
    const previewCanvasRef = useRef<any>(image);

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }
        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX: any = image.naturalWidth / image.width;
        const scaleY: any = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );
        canvas.toBlob((blob: any) => {
            setCompletedCropImage(blob);
        }, 'image/png', 1);
    }, [completedCrop]);

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header>
                <Modal.Title className="m-3">Crop Your Image</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <ReactCrop
                    ruleOfThirds
                    className='ReactCrop text-center'
                    crop={crop}
                    src={image}
                    onImageLoaded={onLoad}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                />
                <div className="d-none">
                    <canvas
                        ref={previewCanvasRef}
                        className="d-none"
                        // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                        style={{
                            width: Math.round(completedCrop?.width ?? 0),
                            height: Math.round(completedCrop?.height ?? 0)
                        }}
                    />
                    <img className="d-none" src={completedCropImage} style={{ width: '150px', height: '150px' }} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-success" onClick={() => { onImageCropComplete(completedCropImage); onClose(); }}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
};