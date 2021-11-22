import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { useAppContext, ActionTypes } from '../../contexts';
import { makeStyles } from '@mui/styles';
import { MdDone } from "react-icons/md";

const useStyles = makeStyles({
});

export const ProfileVerificationStepper: React.FC = (): React.ReactElement => {
    const classes = useStyles();
    const { state, dispatch } = useAppContext();
    const userData = state?.user?.metaData;

    const stepContent = [
        {
            stepLabel: 'Facebook',
            stepValue: userData?.isFacebookVerified,
            completed: !!userData?.isFacebookVerified
        },
        {
            stepLabel: 'Google',
            stepValue: userData?.isGoogleVerified,
            completed: !!userData?.isGoogleVerified
        },
        {
            stepLabel: 'Email',
            stepValue: userData?.isEmailVerified,
            completed: !!userData?.isEmailVerified
        },
        {
            stepLabel: 'Phone',
            stepValue: userData?.isPhoneVerified,
            completed: !!userData?.isPhoneVerified,
        },
        {
            stepLabel: 'Photo',
            stepValue: userData?.profilePictureId,
            completed: !!userData?.profilePictureId,
        },
    ].sort(function (x, y) {
        return Number(y.completed) - Number(x.completed);
    });;

    const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 13,
            left: 'calc((-50% + 2em) - 16px) !important',
            right: 'calc((50% + 2em) - 16px) !important',
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundColor: 'green',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundColor: 'green',
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
            backgroundColor: 'green',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
            backgroundColor: 'green',
        }),
    }));

    function ColorlibStepIcon(props: any) {
        const { active, completed, className } = props;
      
        const icons: { [index: string]: React.ReactElement } = {
          1: completed ? <MdDone /> : '1',
          2: completed ? <MdDone /> : '2',
          3: completed ? <MdDone /> : '3',
          4: completed ? <MdDone /> : '4',
          5: completed ? <MdDone /> : '5',
        };
      
        return (
          <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
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
                    <Step completed={step?.completed} key={index}>
                        <StepLabel className={classes.stepLabel} StepIconComponent={ColorlibStepIcon}>{step.stepLabel}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}