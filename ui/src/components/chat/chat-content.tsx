import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { FaInfoCircle, FaSmile, FaMicrophone, FaTelegramPlane } from 'react-icons/fa';
import { useAxios } from '../../services';
import { useAppContext } from '../../contexts';
import { ChatContentProps, ChatMessage } from './types';
import './chat-page.css';

export const ChatContent: React.FC<ChatContentProps> = ({
    chatMessages
}: ChatContentProps): React.ReactElement => {

    const { chatId } = useParams<{ chatId: string }>();
    const { state } = useAppContext();
    const userData = state?.user?.metaData;
    const [message, setMessage] = useState<string>('');
    const [messageList, setMessageList] = useState<ChatMessage[]>(chatMessages);
    const [{ data, loading, error }, execute] = useAxios({
        url: '/chat/sendMessage',
        method: 'POST',
    });

    useEffect(() => {
        if (data?.success) {
            setMessageList([...messageList, { text: message, postedById: userData?.id }]);
            setMessage('');
        }
    }, [data]);

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

    return (
        <Col lg={8} className="p-0 border">
            <div className="settings-tray bg-light">
                <div className="friend-drawer no-gutters">
                    <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg" alt="" />
                    <div className="text">
                        <h6>Robo Cop</h6>
                        <p className="text-muted">Layin' down the law since like before Christ...</p>
                    </div>
                    <span className="settings-tray--right">

                        <DropdownButton
                            variant="transparent"
                            align={{ lg: 'end' }}
                            title={<FaInfoCircle className="m-0" />}
                            id="dropdown-menu-align-responsive-1"
                        >
                            <Dropdown.Item eventKey="1">Action 1</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Action 2</Dropdown.Item>
                        </DropdownButton>

                    </span>
                </div>
            </div>
            <div className="chat-panel">
                <div className="w-100">
                    <div className="col-md-3">
                        <div className="chat-bubble chat-bubble--left">
                            Hello dude!
                        </div>
                    </div>
                </div>
                <div className="w-100">
                    <div className="col-md-3 offset-md-9">
                        <div className="chat-bubble chat-bubble--right">
                            Hello dude!
                        </div>
                    </div>
                </div>
                {messageList.map((message: ChatMessage, index: number) =>
                    <>
                        {message.postedById === userData?.id ? (
                            <div className="w-100" key={index}>
                                <div className="col-md-3 offset-md-9">
                                    <div className="chat-bubble chat-bubble--right">
                                        {message.text}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-100">
                                <div className="col-md-3">
                                    <div className="chat-bubble chat-bubble--left">
                                        {message.text}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
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