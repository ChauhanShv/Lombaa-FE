import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
    Dialog,
    DialogTitle,
    Divider,
    CircularProgress,
    Box,
    Button,
} from '@mui/material';
import { useAxios } from '../../services';
import { ProductDetailsModalProps } from './types';
import { ProductFields, ProductDetail } from '../product-detail/types';

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
    productId,
    slug,
    onClose,
}: ProductDetailsModalProps) => {

    const [productDetail, setProductDetail] = useState<ProductDetail>();
    const [{ data, loading }, execute] = useAxios({
        url: `/product/${productId}`,
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
        if (data?.success) {
            setProductDetail(data?.product);
        }
    }, [data]);

    return (
        <Dialog fullWidth={true} maxWidth="xs" open={true}>
            <DialogTitle>
                Product Details
            </DialogTitle>
            <Divider />
            {loading ? (
                <CircularProgress color="primary" />
            ) : (
                <div className="p-4">
                    <Row className="mb-3">
                        {productDetail && productDetail.productFields?.map((productField: ProductFields, index: number) =>
                            <React.Fragment key={index}>
                                {!['title', 'price'].includes(productField.field.fieldType) && (
                                    <Col xs={6} md={4}>
                                        <p className='text-muted m-0'>
                                            {productField.field.label}
                                        </p>
                                        <Col>
                                            <p>{productField.value}</p>
                                        </Col>
                                    </Col>
                                )}
                            </React.Fragment>
                        )}
                    </Row>
                    <Box textAlign="center">
                        <Button
                            variant='contained'
                            color="secondary"
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </Box>
                </div>
            )}
        </Dialog>
    );
};