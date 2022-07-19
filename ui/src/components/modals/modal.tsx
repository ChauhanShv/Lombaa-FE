import React from 'react';
import { useAppContext, ActionTypes } from '../../contexts';
import { ModalType } from '../../types';
import { Login, Register } from '.';

export const ModalComponent = (): React.ReactElement | null => {
    const { state, dispatch } = useAppContext();
    const onLoginClick = (): void => {
        dispatch({
            type: ActionTypes.OPEN_MODAL,
            payload: {
                modal: ModalType.LOGIN,
            }
        });
    };

    const onRegisterClick = (): void => {
        dispatch({
            type: ActionTypes.OPEN_MODAL,
            payload: {
                modal: ModalType.REGISTER,
            }
        });
    };

    const onClose = (): void => {
        dispatch({
            type: ActionTypes.CLOSE_MODAL,
        });
    };
    switch(state.app.activeModal) {
        case ModalType.LOGIN:
            return <Login
                show={true}
                onClose={onClose}
                onRegisterClick={onRegisterClick}
            />;
        
        case ModalType.REGISTER:
            return <Register
                show={true}
                onClose={onClose}
                onLoginClick={onLoginClick}
            />;

        default:
            return null;
    }
}