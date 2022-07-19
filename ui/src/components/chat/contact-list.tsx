import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { useHistory, useParams } from 'react-router-dom';
import { ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import { useAxios } from '../../services';
import { Loader } from '..';
import { Contacts } from './types';
import './chat-page.css';

const LIMIT: number = 20;
const chatTypeArr: string[] = ['buy', 'sell'];
export const ContactList: React.FC = (): React.ReactElement => {
    const { chatType, chatId } = useParams<{ chatType: string, chatId: string }>();
    const history = useHistory();
    const [contactList, setContactList] = useState<Contacts[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [{ data: contactResponse, loading: contactLoading }, contactExecute] = useAxios({
        url: '',
        method: 'GET',
    });

    const getContacts = (start: number = 0): void => {
        if (offset >= 0) {
            contactExecute({
                url: `/chat/${chatType === 'buy' ? 'buyer' : 'seller'}`,
                params: {
                    offset: start,
                    limit: LIMIT,
                }
            });
        }
    }

    useEffect(() => {
        setContactList([]);
        getContacts(0);
    }, [chatType]);

    useEffect(() => {
        if (contactResponse?.data?.length) {
            if (offset === 0) {
                setContactList([...contactResponse.data]);
            } else {
                setContactList([...contactList, ...contactResponse.data]);
            }
            setOffset(offset + LIMIT);
        }
    }, [contactResponse]);

    const handleUserTypeToggleChange = (event: any, type: string) => {
        if (chatTypeArr.includes(type)) {
            history.push(`/chat/${type}`);
        }
    };

    const handleProfileThumbnailClick = (e: any, chatId: string) => {
        history.push(`/chat/${chatType}/${chatId}`);
    };

    const onListScroll = debounce((e) => {
        if (!contactResponse?.data?.length || LIMIT > contactList.length) {
            return;
        }
        const bottom = Math.floor(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
        if (bottom) {
            getContacts(offset + LIMIT);
        }
    }, 500);

    return (
        <div className="cl-container">
            <div className="at-top p-3 cl-header">
                <div className="w-100 text-center">
                    <ToggleButtonGroup
                        color="standard"
                        value={chatType}
                        onChange={handleUserTypeToggleChange}
                        exclusive
                        aria-label="Basic example"
                    >
                        <ToggleButton value="buy">Buying</ToggleButton>
                        <ToggleButton value="sell">Selling</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
            <div className='scrollable-wrap' onScroll={onListScroll}>
                {!!contactList.length && contactList.map((user: Contacts) =>
                    <div
                        key={user.id}
                        className={`p-3 friend-drawer friend-drawer--onhover ${chatId === user.id && 'active'}`}
                        onClick={(e) => handleProfileThumbnailClick(e, user.id)}
                    >
                        <img
                            className='profile-image-avatar'
                            src={user?.product?.media[0]?.file?.url || '/images/user-circle.svg'}
                            alt={user.to?.name}
                        />
                        <div className='text'>
                            <Typography variant="h6" noWrap>
                                {user.product?.title}
                            </Typography>
                            <Typography variant="overline" noWrap>
                                {user.to?.name}
                            </Typography>
                            <Typography variant="body2" noWrap>
                                {user.lastMessage?.text}
                            </Typography>
                        </div>
                    </div>
                )}
                <div className='p-3 friend-drawer'>
                    {!!contactLoading && <Loader />}
                </div>
            </div>
        </div>
    );
};