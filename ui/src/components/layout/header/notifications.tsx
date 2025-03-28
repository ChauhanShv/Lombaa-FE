import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, Badge, Fade, Typography } from '@mui/material';
import { Row, Col } from 'react-bootstrap';
import { debounce } from 'lodash';
import { FaBell, FaCommentDots } from 'react-icons/fa';
import { useAxios } from '../../../services';
import { Notification } from './types';

const LIMIT: number = 20;
export const Notifications: React.FC = (): React.ReactElement => {

    const [{ data, loading, error }, execute] = useAxios({
        url: '/notification?offset=0&limit=10',
        method: 'GET',
    }, { manual: false });
    const [{ data: seenResponse }, executeSeenNotification] = useAxios({
        url: '/notification/seen',
        method: 'POST',
    });
    const [{ data: deleteResponse }, executeDeleteNotification] = useAxios({
        url: '/notification',
        method: 'DELETE',
    });
    const [{ data: chatCountRes }] = useAxios({
        url: '/notification/chat/count',
        method: 'GET',
    }, { manual: false });
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [offset, setOffset] = useState<number>(0);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuItemClicked = (event: any, notification: Notification) => {
        executeSeenNotification({
            data: {
                id: [notification?.id],
            },
        });
        setAnchorEl(null);
    };
    const handleChatMessagesSeen = () => {
        const notificationIds: Array<string> =
            chatCountRes?.data?.count?.rows?.map((notification: Notification) => notification?.id);
        executeSeenNotification({
            data: {
                id: [...notificationIds],
            },
        });
    }
    const handleDeleteNotifictaion = (notification: Notification) => {
        executeDeleteNotification({
            data: {
                id: [notification?.id],
            },
        });
    };
    const getNotifications = (start: number = 0) => {
        if (offset >= 0) {
            execute({
                url: '/notification',
                params: {
                    offset: start,
                    limit: LIMIT,
                },
                method: 'GET',
            });
        }
    };

    const onListScroll = debounce((e) => {
        if (!data?.data?.length || LIMIT > notifications.length) {
            return;
        }
        const bottom = Math.floor(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
        if (bottom) {
            getNotifications(offset + LIMIT);
        }
    }, 500);

    useEffect(() => {
        if (data?.success && !!data?.data?.rows?.length) {
            if (offset === 0) {
                setNotifications(data?.data?.rows);
            } else {
                setNotifications([...notifications, ...data?.data?.rows]);
            }
            setOffset(offset + LIMIT);
        }
    }, [data]);
    useEffect(() => {
        if (seenResponse?.success) {
            //navigator.push(`/${notificationLink}` || '');
            execute({});
        }
    }, [seenResponse]);
    useEffect(() => {
        if (deleteResponse?.success) {
            execute({});
        }
    }, [deleteResponse]);

    return (
        <>
            <li className="nav-item icon-item me-3">
                <Link
                    className="nav-link"
                    to="/chat/buy"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Chats"
                    onClick={handleChatMessagesSeen}
                >
                    <Badge
                        badgeContent={(chatCountRes?.success && !seenResponse?.success) ? chatCountRes?.data?.count?.count : 0}
                        color="secondary"
                        sx={{ color: '#fff' }}
                    >
                        <FaCommentDots />
                    </Badge>
                </Link>
            </li>
            <li className="nav-item icon-item me-3">
                <Link
                    className="nav-link"
                    to="#"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Notifications"
                    onClick={handleClick}
                >
                    <Badge
                        badgeContent={data?.data?.count || 0}
                        color="secondary"
                        sx={{ color: '#fff' }}
                    >
                        <FaBell />
                    </Badge>
                </Link>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button',
                    }}
                    sx={{
                        maxHeight: '50%',
                        padding: 0,
                        '& .MuiList-root.MuiMenu-list': {
                            paddingTop: '0px',
                            paddingBottom: '0px',
                        }
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    onScroll={onListScroll}
                >
                    {!!notifications?.length ? notifications?.map((notification: Notification) =>
                        <MenuItem
                            onClick={(event) => handleMenuItemClicked(event, notification)}
                            key={notification.id}
                            sx={{
                                display: 'block',
                                padding: '0.75rem',
                                backgroundColor: `${!notification.seenAt ? '#E0E0E0' : '#fff'}`,
                                width: '420px',
                            }}
                        >
                            <Row>
                                <Col md={12}>
                                    <Typography
                                        mx={1}
                                        mt={1}
                                        noWrap={true}
                                        fontWeight={600}
                                        color="primary"
                                        variant="body1"
                                    >
                                        {notification?.text}
                                    </Typography>
                                </Col>
                                {/* <Col md={1}>
                                    <FaTrash
                                        className={notificationId === notification.id ? '' : 'd-none'}
                                        color="#CC0000"
                                        onClick={() => handleDeleteNotifictaion(notification)}
                                    />
                                </Col> */}
                            </Row>
                            <Typography
                                mb={1}
                                mx={1}
                                fontWeight={500}
                                variant="subtitle2"
                                noWrap={true}
                            >
                                {notification?.description}
                            </Typography>
                        </MenuItem>
                    ) : (
                        <MenuItem>No notifications available</MenuItem>
                    )}
                </Menu>
            </li>
        </>
    );
};