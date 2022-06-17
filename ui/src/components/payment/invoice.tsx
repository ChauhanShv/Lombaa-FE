import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography, Button, LinearProgress } from '@mui/material';
import { Container, Table } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { useAxios } from '../../services';
import { useAppContext } from '../../contexts';
import { InvoiceData } from './types';
import "./payment.css";

export const Invoice: React.FC = (): React.ReactElement => {

    const { invoiceId } = useParams<{ invoiceId: string }>();
    const { state } = useAppContext();
    const [invoiceData, setInvoiceData] = useState<InvoiceData>();

    const [{ data: invoiceRes, loading: loadingInvoice }] = useAxios({
        url: `/invoice/${invoiceId}`,
        method: 'GET',
    }, { manual: false });
    const [{ data: invoicePDFResponse }, getInvoicePDF] = useAxios({
        url: `/order/invoice/${invoiceId}.pdf`,
        method: 'GET',
    });

    const downloadInvoicePDF = () => {
        getInvoicePDF({});
    }

    const downloadFile = (blob: Blob, fileName: string) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        const invoiceDate: string = moment(invoiceData?.data?.createdAt).format("DD-MM-YYYY");
        const invoiceNumber: string | undefined = invoiceData?.data?.invoiceNumber;
        saveAs(blob, `Invoice_${invoiceNumber}_${invoiceDate}.pdf`);
    };

    useEffect(() => {
        if (invoiceRes?.success) {
            setInvoiceData(invoiceRes?.data);
        }
    }, [invoiceRes]);
    useEffect(() => {
        if (invoicePDFResponse) {
            downloadFile(new Blob([invoicePDFResponse]), "Invoice.pdf");
        }
    }, [invoicePDFResponse]);

    return (
        <Box>
            {loadingInvoice ? (
                <Container>
                    <LinearProgress />
                </Container>
            ) : (
                <Box>
                    <Container id="invoiceTemplate" className="p-lg-5">
                        <Grid m={1}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                height="100px"
                                width="100%"
                                sx={{ backgroundColor: 'primary.main' }}
                            >
                                <img
                                    className='invoice-header-logo'
                                    src="/images/logo.svg"
                                    alt="Lombaa Logo"
                                />
                            </Box>
                            <Box m={2}>
                                <Grid display="flex" justifyContent="space-between">
                                    <Typography className='invoiceaddress' textAlign="start" variant="body1">
                                        <Typography>
                                            {invoiceData?.merchantAddress?.address_line_1}
                                        </Typography>
                                        <Typography>
                                            {invoiceData?.merchantAddress?.address_line_2}
                                        </Typography>
                                        <Typography>
                                            {`${invoiceData?.merchantAddress?.city} - ${invoiceData?.merchantAddress?.postal_code}`}
                                        </Typography>
                                        <Typography>
                                            {`${invoiceData?.merchantAddress?.state}, ${invoiceData?.merchantAddress?.country}`}
                                        </Typography>
                                    </Typography>
                                    <Typography fontWeight={700} variant="h5">
                                        Invoice No: {invoiceData?.data?.invoiceNumber}
                                    </Typography>
                                </Grid>
                                <Box mt={2} p={2} sx={{ backgroundColor: '#F5F5F5' }}>
                                    <Grid item p={1} lg={4} md={6} sm={12} sx={{ backgroundColor: '#ECECEC' }}>
                                        <Typography fontWeight={600}>
                                            PAYMENT ID:
                                            <Typography className="d-inline" fontWeight={500}>
                                                {' '}{invoiceData?.data?.invoiceNumber}
                                            </Typography>
                                        </Typography>
                                        <Typography fontWeight={600}>
                                            BILL DATE:
                                            <Typography className="d-inline" fontWeight={500}>
                                                {' '}{moment(invoiceData?.data?.createdAt).format("DD-MM-YYYY")}
                                            </Typography>
                                        </Typography>
                                        <Typography fontWeight={600}>
                                            CLIENT:
                                            <Typography className="d-inline" fontWeight={500}>
                                                {' '}{invoiceData?.data?.user?.name}
                                            </Typography>
                                        </Typography>
                                        <Typography fontWeight={600}>
                                            DESCRIPTION:
                                            <Typography className="d-inline" fontWeight={500}>
                                                {' '}{invoiceData?.data?.packageDescription}
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
                                                <td className="fw-bold">
                                                    Payment ID: {invoiceData?.data?.invoiceNumber}
                                                </td>
                                                <td className='text-end'>
                                                    {`${invoiceData?.data?.package?.price}`}
                                                </td>
                                                <td className='text-end'>
                                                    {`${invoiceData?.data?.package?.price}`}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td className='text-end invoice-table-head'>
                                                    TOTAL, {invoiceData?.data?.package?.currency}
                                                </td>
                                                <td className='text-end invoice-table-head'>
                                                    {invoiceData?.data?.package?.price}
                                                </td>
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
                                                {' '}{invoiceData?.merchantBank?.bank}
                                            </Typography>
                                        </Typography>
                                        <Typography fontWeight={600}>
                                            ACCT NAME:
                                            <Typography className="d-inline" fontWeight={500}>
                                                {' '}{invoiceData?.merchantBank?.acct_name}
                                            </Typography>
                                        </Typography>
                                        <Typography fontWeight={600}>
                                            ACCT NO:
                                            <Typography className="d-inline" fontWeight={500}>
                                                {' '}{invoiceData?.merchantBank?.acct_number}
                                            </Typography>
                                        </Typography>
                                        <Typography fontWeight={600}>
                                            ACCT SORT CODE:
                                            <Typography className="d-inline" fontWeight={500}>
                                                {' '}{invoiceData?.merchantBank?.acct_sort_code}
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
                        </Grid>
                        {/* <Box textAlign="center" color="#fff" sx={{ backgroundColor: 'primary.main', p: 1 }}>
                            LOMBAA ONLINE MARKETPLACE SINGAPORE LTD RC WWW.LOMBAA.SG
                        </Box> */}
                    </Container>
                    <Container>
                        <Box my={4} pb={8} textAlign='center'>
                            <Button sx={{ color: '#FFFFFF' }} onClick={downloadInvoicePDF} variant="contained">
                                Download Invoice PDF
                            </Button>
                        </Box>
                    </Container>
                </Box>
            )}
        </Box>
    );
}