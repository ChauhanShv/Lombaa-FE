import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useAxios } from '../../services';
import { FaBars, FaSearch } from 'react-icons/fa';
import { useAppContext } from '../../contexts';
import './chat-page.css';

export const ChatSidebar: React.FC = (): React.ReactElement => {
    const navigator = useHistory();
    const { state } = useAppContext();
    const currentUserData = state?.user?.metaData;
    const [{ data: buyerResponse, loading: buyerLoading, error: buyerError }, buyerExecute] = useAxios({
        url: '/chat/buyer?offset=0&limit=5',
        method: 'GET',
    }, { manual: false });
    const [{ data: sellerResponse, loading: sellerLoading, error: sellerError }, sellerExecute] = useAxios({
        url: '/chat/seller?offset=0&limit=5',
        method: 'GET',
    }, { manual: false });
    const [userType, setUserType] = useState<string>('seller');
    const [userData, setUserData] = useState([]);

    const handleUserTypeToggleChange = (event: any, type: string) => {
        setUserType(type);
        if (type !== null) {
            if (type === 'seller') {
                setUserData(sellerResponse?.data);
            } else {
                setUserData(buyerResponse?.data);
            }
        }
    };

    const handleProfileThumbnailClick = (e: any, chatId: string) => {
        navigator.push(`/chat/${chatId}`);
    };

    useEffect(() => {
        setUserData(sellerResponse?.data);
    }, [sellerResponse]);

    useEffect(() => {
        if (userType === 'buyer') {
            setUserData(buyerResponse?.data);
        } else {
            setUserData(sellerResponse?.data);
        }
    }, [userType]);

    return (
        <Col lg={4} className="p-0 border">
            <div className="at-top bg-light">
                <div className="settings-tray">
                    <img className="profile-image" src={currentUserData?.profilePicture?.url} alt="Profile img" />
                    <span className="settings-tray--right">
                        <FaBars />
                    </span>
                </div>
                <div className="w-100 text-center">
                    <ToggleButtonGroup color="standard" value={userType} onChange={handleUserTypeToggleChange} exclusive aria-label="Basic example">
                        <ToggleButton value="seller">Sellers</ToggleButton>
                        <ToggleButton value="buyer">Buyers</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div className="search-box">
                    <div className="input-wrapper border">
                        <FaSearch />
                        <input placeholder="Search or start new chat" type="text" />
                    </div>
                </div>
            </div>
            {sellerLoading || buyerLoading ? (
                <>{'loading...'}</>
            ) : (
                <div className='scrollable-wrap'>
                    {userData && !!userData.length && userData.map((user: any) =>
                        <div
                            key={user?.id}
                            className='friend-drawer friend-drawer--onhover'
                            onClick={(e) => handleProfileThumbnailClick(e, user?.id)}
                        >
                            <img className='profile-image' src={user?.[userType]?.profilePicture?.url} alt="" />
                            <div className='text'>
                                <h6>{user?.[userType]?.name}</h6>
                                <p>{user?.product?.fields?.title}</p>
                            </div>
                            <span className='time text-muted small'>{ }</span>
                        </div>
                    )}
                </div>
            )}
        </Col>
    );
};