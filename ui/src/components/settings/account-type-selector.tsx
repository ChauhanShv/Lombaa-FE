import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { AccountType, AccountTypeSelectorProps } from './types';
import { useAppContext, ActionTypes } from '../../contexts';

export const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({ onChangeAccountType }: AccountTypeSelectorProps): React.ReactElement => {
    const { state, dispatch } = useAppContext();
    const userData = state.user?.metaData;
    const [selectedAccountType, setSelectedAccountType] = useState<AccountType>(userData?.accountType);

    const handleAccountTypeChange = (event: any) => {
        setSelectedAccountType(event.target.value);
        dispatch({
            type: ActionTypes.UPDATE_PROFILE,
            payload: {
                metaData: {
                    ...state.user?.metaData,
                    accountType: event.target.value,
                }
            }
        });
        onChangeAccountType(event.target.value);
    }

    return (
        <div className="form-group mb-3">
            <Form.Label column xs="4">AccountType</Form.Label>
            <Form.Check
                label="Individual"
                inline
                type="radio"
                id="Individual"
                value={AccountType.INDIVIDUAL}
                checked={selectedAccountType === AccountType.INDIVIDUAL}
                onChange={handleAccountTypeChange}
            />
            <Form.Check
                label="Business"
                id="Business"
                inline
                type="radio"
                value={AccountType.BUSINESS}
                checked={selectedAccountType === AccountType.BUSINESS}
                onChange={handleAccountTypeChange}
            />
        </div>
    );
}