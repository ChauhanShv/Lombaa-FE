import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChatSidebar, ChatContent } from '.';
import { useAxios } from '../../services';
import './chat-page.css';

export const Chat: React.FC = (): React.ReactElement => {
    const { chatId } = useParams<{ chatId: string }>();
    const [{ data, loading, error }, execute] = useAxios({
        url: `/chat/${chatId}/messages?offset=0&limit=40`,
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
        execute({});
    }, [chatId]);

    return (
        <>
            <ChatSidebar />
            {loading ? 'Loading...' : <ChatContent chatMessages={data?.data} />}
        </>
    );
}
