import React, { useState } from 'react';
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
} from '@mui/material';
import { Button } from 'react-bootstrap';
import { useAxios } from '../../services';
import { ReportAbuseModalProps } from './types';

export const ReportAbuseModal: React.FC<ReportAbuseModalProps> = ({
    onClose
}: ReportAbuseModalProps): React.ReactElement => {

    const [reason, setReason] = useState<string>('');
    const [otherReason, setOtherReason] = useState<string>('');
    const options = [
        "Inappropriate for kids",
        "Promotes Hate",
        "Sexual Content",
        "Fake Product",
        "Illegal / Dangerous Product",
        "Other",
    ];
    const [{ data, loading }, execute] = useAxios({
        url: '/',
        method: 'POST',
    });

    return (
        <Dialog fullWidth={true} maxWidth="xs" open={true} >
            <DialogTitle>
                Report Abuse
            </DialogTitle>
            <Divider />
            <DialogContent>
                <DialogContentText>
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
                    <Button variant="success">
                        Report
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}