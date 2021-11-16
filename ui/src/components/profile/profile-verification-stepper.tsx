import React from 'react';
import { Stepper, Step } from 'react-form-stepper';
import './profile-verification-stepper.css';

export const ProfileVerificationStepper = () => {

    const ConnectorStyleProps = {
        disabledColor: '#DBDBDB',
        activeColor: 'green',
        completedColor: 'green',
        style: 'solid',
        size: 5,
    };

    const StepStyleDTO = {
        activeBgColor: 'green',
        activeTextColor: '#fff',
        completedBgColor: 'green',
        completedTextColor: '#fff',
        inactiveBgColor: '#DBDBDB',
        inactiveTextColor: '#fff',
        size: '2em',
        circleFontSize: '1rem',
        labelFontSize: '0.875rem',
        borderRadius: '50%',
        fontWeight: '600',
    };

    return (
        <>
            <Stepper
                activeStep={2}
                connectorStateColors={true}
                className=""
                stepClassName="step-connect"
                connectorStyleConfig={ConnectorStyleProps}
                styleConfig={StepStyleDTO}>
                <Step label="Facebook" />
                <Step label="Google" />
                <Step label="Email" />
                <Step label="Phone" />
                <Step label="Photo" />
            </Stepper>
        </>
    );
};