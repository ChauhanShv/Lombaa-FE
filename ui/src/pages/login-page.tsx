import React, { useState } from 'react';
import { useAppContext, ActionTypes } from '../contexts';

export const LoginPage: React.FC = () => {
    const { dispatch } = useAppContext();
    const [user, setUser] = useState<string>('');
    const doLogin = () => {
        dispatch({
            type: ActionTypes.LOGIN,
            payload: {
                user,
            },
        });
    };
    return (
        <div>
            <h1>Login Page</h1>
            <input type="text" onChange={(e: React.FormEvent<HTMLInputElement>) => setUser(e.currentTarget.value)} />
            <br />
            <button onClick={doLogin}>Login</button>
        </div>
    );
};