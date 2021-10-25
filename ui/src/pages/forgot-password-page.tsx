import React from 'react';
import { useParams } from 'react-router-dom';
import { EnterPassword, EnterEmail } from '../components';

export const ForgotPasswordPage: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    return token ? <EnterPassword /> : <EnterEmail />;
};