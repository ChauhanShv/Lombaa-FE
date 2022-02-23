import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { FaInfoCircle, FaSmile, FaMicrophone, FaTelegramPlane } from 'react-icons/fa';
import { IoReload } from 'react-icons/io5'; 
import { useAxios } from '../../services';
import { useAppContext } from '../../contexts';
import { ChatContentProps, ChatMessage } from './types';
import './chat-page.css';

export const ChatContent: React.FC<ChatContentProps> = ({
    chatMessages,
    onReloadChat,
}: ChatContentProps): React.ReactElement => {

    const { chatId } = useParams<{ chatId: string }>();
    const { state } = useAppContext();
    const userData = state?.user?.metaData;
    const [message, setMessage] = useState<string>('');
    const messageEndRef = useRef<HTMLDivElement>(null);
    const [messageList, setMessageList] = useState<ChatMessage[]>(chatMessages);
    const [{ data, loading, error }, execute] = useAxios({
        url: '/chat/sendMessage',
        method: 'POST',
    });
    const [{ data: deleteChatRes, loading: deleteChatLoading }, deleteChatExecute] = useAxios({
        url: '/chat/delete',
        method: 'DELETE',
    });

    useEffect(() => {
        if (data?.success) {
            setMessageList([...messageList, { text: message, postedById: userData?.id }]);
            setMessage('');
        }
        scrollToBottom();
    }, [data]);

    useEffect(() => {
        scrollToBottom();
    }, []);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }; 

    const handleSendMessageClick = () => {
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

    return (
        <Col lg={8} className="border">
            <div className="settings-tray bg-light">
                <div className="friend-drawer no-gutters">
                    <img className="profile-image-avatar" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg" alt="" />
                    <div className="text">
                        <h6>Robo Cop</h6>
                        <p className="text-muted">Layin' down the law since like before Christ...</p>
                    </div>
                    <span className="settings-tray--right">
                        <div style={{ padding: '0.375rem 0.75rem', }}>
                            <IoReload onClick={onReloadChat} className="m-0" />
                        </div>
                        <DropdownButton
                            variant="transparent"
                            align={{ lg: 'end' }}
                            title={<FaInfoCircle className="m-0" />}
                            id="dropdown-menu-align-responsive-1"
                        >
                            <Dropdown.Item onClick={handleChatDelete} eventKey="1">Delete Chat</Dropdown.Item>
                            <Dropdown.Item eventKey="2">About</Dropdown.Item>
                        </DropdownButton>

                    </span>
                </div>
            </div>
            <div className="chat-panel">
                {messageList && !!messageList.length && messageList.map((message: ChatMessage, index: number) =>
                    <>
                        {message.postedById === userData?.id || message.postedById === undefined ? (
                            <div className="w-100" key={index}>
                                <div className="col text-end">
                                    <div className="chat-bubble chat-bubble--right">
                                        {message.text}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div ref={index === messageList.length ? messageEndRef : null} className="w-100">
                                <div className="col">
                                    <div className="chat-bubble chat-bubble--left">
                                        {message.text}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
                <div ref={messageEndRef} />
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="chat-box-tray">
                        <FaSmile />
                        <input
                            type="text"
                            value={message}
                            placeholder="Type your message here..."
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <FaMicrophone />
                        <FaTelegramPlane onClick={handleSendMessageClick} />
                    </div>
                </div>
            </div>
        </Col>
    );
};