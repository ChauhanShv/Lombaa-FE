import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { useHistory, useParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
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
        const bottom = Math.floor(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
        if (bottom) {
            getContacts(offset + LIMIT);
        }
    }, 500);

    return (
        <div className="cl-container">
            <div className="at-top p-3 cl-header">
                <div className="w-100 text-center">
                    <ToggleButtonGroup color="standard" value={chatType} onChange={handleUserTypeToggleChange} exclusive aria-label="Basic example">
                        <ToggleButton value="buy">Buying</ToggleButton>
                        <ToggleButton value="sell">Selling</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div className="search-box">
                    <div className="input-wrapper border">
                        <FaSearch />
                        <input placeholder="Search chat" type="text" />
                    </div>
                </div>
            </div>
            <div className='scrollable-wrap' onScroll={onListScroll}>
                {!!contactList.length && contactList.map((user: Contacts) =>
                    <div
                        key={user.id}
                        className={`p-3 friend-drawer friend-drawer--onhover ${chatId === user.id && 'active'}`}
                        onClick={(e) => handleProfileThumbnailClick(e, user.id)}
                    >
                        <img className='profile-image-avatar' src={user.to?.profilePicture.url} alt={user.to?.name} />
                        <div className='text'>
                            <h6>{user.to?.name}</h6>
                            <p>{user.product.title}</p>
                        </div>
                        <span className='time text-muted small'>{ }</span>
                    </div>
                )}
                <div className='p-3 friend-drawer friend-drawer--onhover'>
                    {!!contactLoading && <Loader />}
                </div>
            </div>
        </div>
    );
};