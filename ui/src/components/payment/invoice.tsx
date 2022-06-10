import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { Container, Table } from 'react-bootstrap';
import moment from 'moment';
import { useAxios } from '../../services';
import { InvoiceData } from './types';
import "./payment.css";

export const Invoice: React.FC = (): React.ReactElement => {

    const { packageId } = useParams<{ packageId: string }>();
    const [invoiceData, setInvoiceData] = useState<InvoiceData>();
    const [{ data: orderRes, loading: laodingOrder }] = useAxios({
        url: '/order',
        method: 'POST',
        data: {
            package: packageId,
        },
    }, { manual: false });

    useEffect(() => {
        if (orderRes?.success) {
            setInvoiceData(orderRes?.data);
        }
    }, [orderRes]);

    return (
        <Container className="p-lg-5">
            <Box m={1}>
                <Box
                    display="flex"
                    justifyContent="center"
                    height="100px"
                    width="100%"
                    sx={{ backgroundColor: 'primary.main' }}
                >
                    <img
                        height="100px"
                        width="220px"
                        src="/images/logo.svg"
                        alt="Lombaa Logo"
                    />
                </Box>
                <Box m={2}>
                    <Grid display="flex" justifyContent="space-between">
                        <Typography variant="body1">
                            <Typography>Jiji.ng Online Marketplace Nigeria Ltd RC 1370574</Typography>
                            <Typography>4th Floor, Epic Tower, 235 Ikorodu Road</Typography>
                            <Typography>Ilupeju, Lagos</Typography>
                        </Typography>
                        <Typography fontWeight={700} variant="h5">
                            Invoice No: 1345790
                        </Typography>
                    </Grid>
                    <Box mt={2} p={2} sx={{ backgroundColor: '#F5F5F5' }}>
                        <Grid p={1} lg={4} md={6} sm={12} sx={{ backgroundColor: '#ECECEC' }}>
                            <Typography fontWeight={600}>
                                PAYMENT ID:
                                <Typography className="d-inline" fontWeight={500}>
                                    {' '}1345790
                                </Typography>
                            </Typography>
                            <Typography fontWeight={600}>
                                BILL DATE:
                                <Typography className="d-inline" fontWeight={500}>
                                    {' '}{moment(invoiceData?.date).format("DD-MM-YYYY")}
                                </Typography>
                            </Typography>
                            <Typography fontWeight={600}>
                                CLIENT:
                                <Typography className="d-inline" fontWeight={500}>
                                    {' '}1345790
                                </Typography>
                            </Typography>
                            <Typography fontWeight={600}>
                                DESCRIPTION:
                                <Typography className="d-inline" fontWeight={500}>
                                    {' '}{invoiceData?.itemName}
                                </Typography>
                            </Typography>
                        </Grid>
                    </Box>
                    <Box mt={2} mb={3}>
                        <Table bordered>
                            <thead className="invoice-table-head">
                                <tr>
                                    <th>NAME OF DEPOSITOR *</th>
                                    <th className='text-end'>UNIT PRICE</th>
                                    <th className='text-end'>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="fw-bold">Payment ID: 1345790</td>
                                    <td className='text-end'>{`${invoiceData?.unitPrice}`}</td>
                                    <td className='text-end'>{`${invoiceData?.unitPrice}`}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td className='text-end invoice-table-head'>TOTAL, {invoiceData?.currency}</td>
                                    <td className='text-end invoice-table-head'>{invoiceData?.unitPrice}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Box>
                    <Box mt={2} p={2} sx={{ backgroundColor: '#F5F5F5' }}>
                        ACCOUNT DETAILS:
                        <Box sx={{ mt: 1, p: 1, backgroundColor: '#ECECEC' }}>
                            <Typography fontWeight={600}>
                                BANK:
                                <Typography className="d-inline" fontWeight={500}>
                                    {' '}Zenith Bank
                                </Typography>
                            </Typography>
                            <Typography fontWeight={600}>
                                ACCT NAME:
                                <Typography className="d-inline" fontWeight={500}>
                                    {' '}Jiji.ng Online Account
                                </Typography>
                            </Typography>
                            <Typography fontWeight={600}>
                                ACCT NO:
                                <Typography className="d-inline" fontWeight={500}>
                                    {' '}1014931843
                                </Typography>
                            </Typography>
                            <Typography fontWeight={600}>
                                ACCT SORT CODE:
                                <Typography className="d-inline" fontWeight={500}>
                                    {' '}1345790
                                </Typography>
                            </Typography>
                        </Box>
                    </Box>
                    <Box mt={2}>
                        <Typography fontWeight={600} variant="h6">
                            * Always include your PAYMENT ID at NAME OF DEPOSITOR
                        </Typography>
                        <Typography mt={1} fontWeight={600} variant="h6">
                            a{')'} For Cash/teller payment always include your PAYMENT ID as Depositor's name.
                        </Typography>
                        <Typography mt={1} fontWeight={600} variant="h6">
                            b{')'} For Transfer always include your PAYMENT ID in the narration.
                        </Typography>
                        <Typography mt={1} fontWeight={600} variant="h6">
                            c{')'} Your invoice will be due after the next 10 days of billing date.
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box textAlign="center" color="#fff" sx={{ backgroundColor: 'primary.main', p: 1 }}>
                LOMBAA ONLINE MARKETPLACE SINGAPORE LTD RC WWW.LOMBAA.SG
            </Box>
        </Container>
    );
}