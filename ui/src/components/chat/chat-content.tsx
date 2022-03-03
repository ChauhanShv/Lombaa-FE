import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Typography } from '@mui/material';
import { FaInfoCircle, FaTelegramPlane, FaChevronLeft } from 'react-icons/fa';
import { BsChatSquareText } from 'react-icons/bs';
import { IoReload } from 'react-icons/io5';
import { useAxios } from '../../services';
import { useAppContext } from '../../contexts';
import { Chat, User } from './types';
import './chat-page.css';
import { debounce } from 'lodash';

const LIMIT: number = 50;
export const ChatContent: React.FC = (): React.ReactElement => {
    const { chatId } = useParams<{ chatId: string }>();
    const { state } = useAppContext();
    const userData = state?.user?.metaData;
    const [offset, setOffset] = useState<number>(0);
    const [message, setMessage] = useState<string>('');
    const [messageList, setMessageList] = useState<Chat[]>([]);
    const [toUser, setToUser] = useState<User | null>();
    const [{ data: sendMessageData }, execute] = useAxios({
        url: '/chat/sendMessage',
        method: 'POST',
    });
    const [{ }, deleteChatExecute] = useAxios({
        url: '/chat/delete',
        method: 'DELETE',
    });
    const [{ data: chatResponse, loading: chatLoading }, getChatExecute] = useAxios({
        url: '',
        method: 'GET',
    });

    const getChat = (start: number = 0): void => {
        if (offset >= 0 && chatId) {
            getChatExecute({
                url: `/chat/${chatId}/messages`,
                params: {
                    offset: start,
                    limit: LIMIT,
                }
            });
        }
    }
    useEffect(() => {
        setMessageList([]);
        getChat(0);
    }, [chatId]);
    useEffect(() => {
        if (chatResponse?.success) {
            setToUser(chatResponse.data.to);
            if (offset === 0) {
                setMessageList([...chatResponse.data.messages]);
            } else {
                setMessageList([...messageList, ...chatResponse.data.messages]);
            }
            setMessage('');
            setOffset(offset + LIMIT);
        }
    }, [chatResponse]);
    useEffect(() => {
        if (sendMessageData?.data) {
            const newMessageList: Chat[] = messageList;
            newMessageList.unshift(sendMessageData.data);
            setMessageList([...newMessageList]);
            setMessage('');
        }
    }, [sendMessageData]);

    const sendMessage = () => {
        if (message) {
            execute({
                data: {
                    chatId: chatId,
                    text: message,
                },
            });
        }
    };

    const handleChatDelete = () => {
        deleteChatExecute({
            data: {
                id: chatId,
            },
        });
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }

    const onMessageScroll = debounce((e) => {
        const bottom = Math.ceil(e.target.scrollTop + e.target.clientHeight) === e.target.scrollHeight;
        if (bottom) {
            getChat(offset + LIMIT);
        }
    }, 500);

    return (
        <>
            {(chatId && toUser) ? (
                <>
                    <div className="settings-tray bg-light">
                        <div className="friend-drawer no-gutters">
                            <Link to={`/chat/buy`} className="btn btn-white d-md-block d-lg-none">
                                <FaChevronLeft />
                            </Link>
                            <img
                                className="profile-image-avatar"
                                src={toUser.profilePicture?.url || '/images/user-circle.svg'}
                                alt={toUser?.name}
                            />
                            <div className="text">
                                <Typography variant="h6">
                                    {toUser?.name}
                                </Typography>
                                <Typography variant="subtitle2">
                                    {}
                                </Typography>
                            </div>
                            <span className="settings-tray--right">
                                <div style={{ padding: '0.375rem 0.75rem', }}>
                                    <IoReload 
                                        onClick={() => { setMessageList([]); getChat(0); }} 
                                        className="m-0" 
                                    />
                                </div>
                                <DropdownButton
                                    variant="transparent"
                                    align='end'
                                    title={<FaInfoCircle className="m-0" />}
                                    id="dropdown-menu-align-responsive-1"
                                >
                                    <Dropdown.Item onClick={handleChatDelete} eventKey="1">
                                        Delete Chat
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="2">
                                        About
                                    </Dropdown.Item>
                                </DropdownButton>
                            </span>
                        </div>
                    </div>
                    <div className="chat-panel" onScroll={onMessageScroll}>
                        {!!messageList.length && messageList.map((message: Chat) =>
                            <div key={message.id}>
                                {message.postedBy.id === userData?.id ? (
                                    <div className="w-100">
                                        <div className="col text-end">
                                            <div className="chat-bubble chat-bubble--right">
                                                {message.text}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-100">
                                        <div className="col text-start">
                                            <div className="chat-bubble chat-bubble--left">
                                                {message.text}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="chat-box-tray">
                        <input
                            type="text"
                            value={message}
                            placeholder="Type your message here..."
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <FaTelegramPlane onClick={sendMessage} />
                    </div>
                </>
            ) : (
                <div className='text-center no-chat-selected' style={{ verticalAlign: 'middle' }}>
                    <BsChatSquareText />
                    <Typography variant="h5">No Chat Selected</Typography>
                </div>
            )}
        </>
    );
};