import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Box,
    Radio,
    Divider,
    FormLabel,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Typography,
    OutlinedInput,
    CircularProgress,
} from '@mui/material';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAxios } from '../../services';
import { ReportChatModalProps } from './types';

export const ReportChatModal: React.FC<ReportChatModalProps> = ({
    onClose,
    onReport,
}: ReportChatModalProps): React.ReactElement => {
    const [reason, setReason] = useState<string>('');
    const [otherReason, setOtherReason] = useState<string>('');
    const { chatId } = useParams<{ chatId: string }>();
    const options = [
        "Inappropriate for kids",
        "Promotes Hate",
        "Sexual Content",
        "Fake Product",
        "Illegal / Dangerous Product",
        "Other",
    ];
    const [{ data, loading }, execute] = useAxios({
        url: '/chat/report',
        method: 'POST',
    });

    useEffect(() => {
        if (data?.success) {
            onClose();
            onReport();
        }
    }, [data]);

    const handleReportAbuse = () => {
        execute({
            data: {
                comment: otherReason ? otherReason : reason,
                value: otherReason ? otherReason : reason,
                chatId: chatId,
            }
        });
    }

    return (
        <Dialog fullWidth={true} maxWidth="xs" open={true} >
            <DialogTitle>
                Report Abuse
            </DialogTitle>
            <Divider />
            <DialogContent>
                {loading && (
                    <Box m={4}>
                        <CircularProgress color="success" />
                    </Box>
                )}
                <DialogContentText className={`${loading ? 'd-none' : ''}`}>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                            Choose an Option
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            onChange={(event) => setReason(event.target.value)}
                        >
                            {options.map((option: string) =>
                                <FormControlLabel
                                    key={option}
                                    value={option}
                                    control={<Radio />}
                                    label={option}
                                />
                            )}
                        </RadioGroup>
                    </FormControl>
                    {reason === 'Other' && (
                        <FormControl>
                            <Typography variant='subtitle1'>
                                Specify a reason
                            </Typography>
                            <OutlinedInput
                                id="outlined-basic"
                                label={null}
                                value={otherReason}
                                onChange={(event) => setOtherReason(event.target.value)}
                            />
                        </FormControl>
                    )}
                </DialogContentText>
                <Box
                    mt={2}
                    display="flex"
                    justifyContent="space-between"
                >
                    <Button onClick={onClose} variant="outline-secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleReportAbuse} variant="success">
                        Report
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};