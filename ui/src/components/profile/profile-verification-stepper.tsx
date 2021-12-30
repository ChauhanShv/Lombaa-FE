import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { useHistory } from 'react-router-dom';
import { useAppContext, ActionTypes } from '../../contexts';
import { makeStyles } from '@mui/styles';
import { MdDone } from "react-icons/md";

const useStyles = makeStyles({
    step: {
        '& .css-ascpo7-MuiStepLabel-root.Mui-disabled': {
            cursor: 'pointer',
        }
    },
    stepLabel: {
        fontWeight: 600,
        fontFamily: 'Poppins !important',
        '& .MuiStepLabel-label': {
            fontWeight: 600,
            fontFamily: 'Poppins !important',
            color: '#B6C2C8',
        },
        '& .MuiStepLabel-label.Mui-completed': {
            fontWeight: 600,
            fontFamily: 'Poppins !important',
            color: '#00AF41',
        },
        '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
            marginTop: '10px',
        }
    },
});

interface ProfileVerificationStepperProps {
    onVerify: (nonVerifiedStep: string) => void;
}

export const ProfileVerificationStepper: React.FC<ProfileVerificationStepperProps> = ({ onVerify }: ProfileVerificationStepperProps): React.ReactElement => {
    const classes = useStyles();
    const { state, dispatch } = useAppContext();
    const userData = state?.user?.metaData;

    const stepContent = [
        {
            stepLabel: 'Facebook',
            completed: !!userData?.isFacebookVerified
        },
        {
            stepLabel: 'Google',
            completed: !!userData?.isGoogleVerified
        },
        {
            stepLabel: 'Email',
            completed: !!userData?.isEmailVerified
        },
        {
            stepLabel: 'Phone',
            completed: !!userData?.isPhoneVerified,
        },
        {
            stepLabel: 'Photo',
            completed: !!userData?.profilePictureId,
        },
    ].sort(function (x, y) {
        return Number(y.completed) - Number(x.completed);
    });;

    const getNonVerifiedStepLabel = () => {
        for (const content of stepContent) {
            if (!content.completed) {
                return content.stepLabel;
            }
        }
    }

    useEffect(() => {
        onVerify(getNonVerifiedStepLabel() || '');
    }, []);

    const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 13,
            left: 'calc((-50% + 2em) - 16px) !important',
            right: 'calc((50% + 2em) - 16px) !important',
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundColor: '#00AF41',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundColor: '#00AF41',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            height: 5,
            border: 0,
            backgroundColor: '#B6C2C8',
            borderRadius: 1,
        },
    }));

    const ColorlibStepIconRoot = styled('div')<{
        ownerState: { completed?: boolean; active?: boolean };
    }>(({ theme, ownerState }) => ({
        backgroundColor: '#B6C2C8',
        zIndex: 1,
        color: '#fff',
        width: '2.1rem',
        height: '2.1rem',
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            backgroundColor: '#00AF41',
        }),
        ...(ownerState.completed && {
            backgroundColor: '#00AF41',
        }),
    }));

    function ColorlibStepIcon(props: any) {
        const { active, completed, className } = props;
        const navigate = useHistory();

        const icons: { [index: string]: any } = {
            1: completed ? <MdDone /> : '1',
            2: completed ? <MdDone /> : '2',
            3: completed ? <MdDone /> : '3',
            4: completed ? <MdDone /> : '4',
            5: completed ? <MdDone /> : '5',
        };

        const handleStepClick = (event: any) => {
            if (!completed) {
                const stepLabel = stepContent[icons[Number(props.icon)] - 1].stepLabel;
                switch (stepLabel) {
                    case 'Google':
                    case 'Facebook':
                    case 'Photo':
                        navigate.push('/settings');
                        break;
                    case 'Email':
                        navigate.push('/settings/change-email');
                        break;
                    case 'Phone':
                        navigate.push('/settings/change-phone');
                        break;
                }
            }
        }

        return (
            <ColorlibStepIconRoot onClick={handleStepClick} ownerState={{ completed, active }} className={className}>
                {icons[String(props.icon)]}
            </ColorlibStepIconRoot>
        );
    }

    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper
                alternativeLabel
                activeStep={(stepContent.findIndex(step => step.completed === false) ?? stepContent.length) - 1}
                connector={<ColorlibConnector />}>
                {stepContent.map((step, index) => (
                    <Step className={classes.step} completed={step?.completed} key={index}>
                        <StepLabel className={classes.stepLabel} StepIconComponent={ColorlibStepIcon}>
                            {step.stepLabel}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}