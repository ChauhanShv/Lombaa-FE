import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Chat } from '../components';

export const ChatPage: React.FC = (): React.ReactElement => {
    const { chatType } = useParams<{ chatType: string }>();
    return ['buy', 'sell'].includes(chatType) ? (
        <Chat />
    ) : (
        <Redirect to='/chat/buy'/>
    )
};