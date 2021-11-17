import React from 'react';
import { Stepper, Step } from 'react-form-stepper';
import { useAppContext, ActionTypes } from '../../contexts';
import './profile.css';

export const ProfileVerificationStepper: React.FC = (): React.ReactElement => {

    const { state, dispatch } = useAppContext();
    const userData = state?.user?.metaData;

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
                connectorStateColors={true}
                className=""
                stepClassName="step-connect"
                connectorStyleConfig={ConnectorStyleProps}
                styleConfig={StepStyleDTO}>
                <Step label="Facebook" active={userData?.isFacebookVerified ? true : false} />
                <Step label="Google" active={userData?.isGoogleVerified ? true : false} />
                <Step label="Email" active={userData?.isEmailVerified ? true : false} />
                <Step label="Phone" active={userData?.isPhoneVerified ? true : false} />
                <Step label="Photo" active={userData?.profilePictureId ? true : false} />
            </Stepper>
        </>
    );
};