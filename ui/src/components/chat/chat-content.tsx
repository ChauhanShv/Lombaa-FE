import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { DropdownButton, Dropdown, Form, Button } from 'react-bootstrap';
import { Typography } from '@mui/material';
import { FaInfoCircle, FaTelegramPlane, FaPaperclip, FaChevronLeft } from 'react-icons/fa';
import { BsChatSquareText } from 'react-icons/bs';
import { IoReload } from 'react-icons/io5';
import { debounce } from 'lodash';
import { useAxios } from '../../services';
import { useAppContext } from '../../contexts';
import { MediaModal } from '.';
import { Chat, User } from './types';
import './chat-page.css';

const LIMIT: number = 50;
export const ChatContent: React.FC = (): React.ReactElement => {
    const { chatId } = useParams<{ chatId: string }>();
    const { state } = useAppContext();
    const userData = state?.user?.metaData;
    const [offset, setOffset] = useState<number>(0);
    const [message, setMessage] = useState<string>('');
    const [messageList, setMessageList] = useState<Chat[]>([]);
    const [toUser, setToUser] = useState<User | null>();
    const [mediaModalUrl, setMediaModalUrl] = useState<string>('');
    const navigation = useHistory();
    const [{ data: sendMessageData }, execute] = useAxios({
        url: '/chat/sendMessage',
        method: 'POST',
    });
    const [{ data: deleteChatResponse }, deleteChatExecute] = useAxios({
        url: '/chat/delete',
        method: 'DELETE',
    });
    const [{ data: sendMediaResponse }, executeSendMedia] = useAxios({
        url: '/chat/media',
        method: 'POST',
    });
    const [{ data: chatResponse }, getChatExecute] = useAxios({
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
    useEffect(() => {
        if (sendMediaResponse?.success) {
            execute({
                data: {
                    chatId: chatId,
                    media: sendMediaResponse?.metadata?.file,
                },
            });
        }
    }, [sendMediaResponse]);
    useEffect(() => {
        if (deleteChatResponse?.success) {
            navigation.push('/chat/buy');
        }
    }, [deleteChatResponse]);

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

    const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const formData = new FormData();
            formData.append('image', event.target.files[0]);
            executeSendMedia({ data: formData });
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
                    {mediaModalUrl && (
                        <MediaModal
                            mediaSrc={mediaModalUrl}
                            onClose={() => setMediaModalUrl('')}
                        />
                    )}
                    <div className="settings-tray bg-light">
                        <div className="friend-drawer no-gutters">
                            <Link to={`/chat/buy`} className="btn d-md-block d-lg-none">
                                <FaChevronLeft />
                            </Link>
                            <img
                                className="profile-image-avatar"
                                src={toUser.profilePicture?.url || '/images/user-circle.svg'}
                                alt={toUser?.name}
                            />
                            <div className="text">
                                <Typography variant="subtitle1">
                                    {toUser?.name}
                                </Typography>
                                <Typography variant="body2">
                                    {chatResponse?.data?.product[0]?.title}
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
                                                {message.media ? (
                                                    <img
                                                        role="button"
                                                        height="120px"
                                                        width="120px"
                                                        style={{ margin: '0 auto', }}
                                                        src={message?.media?.url}
                                                        alt={message.media?.url}
                                                        onClick={() => setMediaModalUrl(message?.media?.url)}
                                                    />
                                                ) : message.text}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-100">
                                        <div className="col text-start">
                                            <div className="chat-bubble chat-bubble--left">
                                                {message.media ? (
                                                    <img
                                                        role="button"
                                                        height="120px"
                                                        width="120px"
                                                        src={message?.media?.url}
                                                        alt={message.media?.url}
                                                        onClick={() => setMediaModalUrl(message?.media?.url)}
                                                    />
                                                ) : message.text}
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
                        {message ? (
                            <FaTelegramPlane onClick={sendMessage} />
                        ) : (
                            <Form.Group className="mx-2">
                                <Form.Label>
                                    <FaPaperclip />
                                    <Form.Control
                                        className="d-none"
                                        type="file"
                                        accept='image/*'
                                        onChange={handleMediaUpload}
                                    />
                                </Form.Label>
                            </Form.Group>
                        )}
                    </div>
                </>
            ) : (
                <div className='text-center no-chat-selected' style={{ verticalAlign: 'middle' }}>
                    <BsChatSquareText />
                    <Typography variant="h5">
                        No Coversations Yet
                    </Typography>
                    <Link to="/create-post">
                        <Button className="mt-3 btn-success rounded fs-5 p-3">
                            Post Free Ad
                        </Button>
                    </Link>
                </div>
            )}
        </>
    );
};