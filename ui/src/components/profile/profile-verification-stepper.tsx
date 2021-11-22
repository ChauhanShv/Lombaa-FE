import React from 'react';
import { Stepper, Step } from 'react-form-stepper';
import { useAppContext, ActionTypes } from '../../contexts';
import './profile.css';

export const ProfileVerificationStepper: React.FC = (): React.ReactElement => {

    const { state, dispatch } = useAppContext();
    const userData = state?.user?.metaData;

    const stepContent = [
        {
            stepLabel: 'Facebook',
            stepValue: userData?.isFacebookVerified,
        },
        {
            stepLabel: 'Google',
            stepValue: userData?.isGoogleVerified,
        },
        {
            stepLabel: 'Email',
            stepValue: userData?.isEmailVerified,
        },
        {
            stepLabel: 'Phone',
            stepValue: userData?.isPhoneVerified,
        },
        {
            stepLabel: 'Photo',
            stepValue: userData?.profilePictureId,
        },
    ];

    const activeStepContent = stepContent.filter((step) => {
        if (step.stepValue) {
            return step;
        }
    });

    const inActiveStepContent = stepContent.filter((step) => {
        if (step.stepValue === 0 || step.stepValue === null) {
            return step;
        }
    });

    const ConnectorStyleProps = {
        disabledColor: '#B6C2C8',
        activeColor: '#B6C2C8',
        completedColor: 'green',
        style: 'solid',
        size: 6,
    };

    const StepStyleDTO = {
        activeBgColor: '#B6C2C8',
        activeTextColor: '#fff',
        completedBgColor: 'green',
        completedTextColor: '#fff',
        inactiveBgColor: '#B6C2C8',
        inactiveTextColor: '#fff',
        size: '2.1rem',
        circleFontSize: '1rem',
        labelFontSize: '0.875rem',
        borderRadius: '50%',
        fontWeight: '600',
    };

    return (
        <>
            <Stepper
                connectorStateColors={true}
                className=""
                stepClassName="step-connect"
                connectorStyleConfig={ConnectorStyleProps}
                styleConfig={StepStyleDTO}>
                {activeStepContent.map((step) => {
                    return (
                        <Step label={step.stepLabel} completed={true} />
                    );
                })}
                {inActiveStepContent.map((step) => {
                    return (
                        <Step label={step.stepLabel} completed={false} />
                    );
                })}
            </Stepper>
        </>
    );
};