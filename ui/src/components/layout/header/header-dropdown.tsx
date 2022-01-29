import React from 'react';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { MdLogout } from 'react-icons/md';
import { MdSettings } from 'react-icons/md';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useAppContext, ActionTypes } from '../../../contexts';
import './header.css'

export const HeaderDropdown: React.FC = (): React.ReactElement => {

    const { state, dispatch } = useAppContext();
    const { user } = state;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleDropdownClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    }
    const handleCloseDropdown = (e: any) => {
        setAnchorEl(null);
    }

    const handleSignOutClick = () => {
        dispatch({
            type: ActionTypes.LOGOUT,
        })
    }

    return (
        <>
            <img
                id="demo-positioned-button"
                className="rounded-circle"
                width="36"
                height="36"
                src={user?.metaData?.profilePicture?.url || "/images/user-circle.svg"}
                alt={user?.metaData?.profilePicture?.url}
                onClick={handleDropdownClick}
                onMouseEnter={handleDropdownClick}
            //onMouseLeave={handleCloseDropdown}
            /> {'  '}
            {anchorEl ?
                <FaChevronDown className='profile-icon' /> :
                <FaChevronUp className='profile-icon' />
            }
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                id="menu-dropdown"
                aria-labelledby="demo-positioned-button"
                MenuListProps={{ 'aria-labelledby': 'profile-image' }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <MenuItem onClick={() => setAnchorEl(null)}>
                        <ListItemIcon>
                            <CgProfile height="1.5rem" width="1.5rem" />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </MenuItem>
                </Link>
                <Link to="/settings" style={{ textDecoration: 'none', color: 'inherit', marginBottom: '10px' }}>
                    <MenuItem onClick={() => setAnchorEl(null)}>
                        <ListItemIcon>
                            <MdSettings height="1.5rem" width="1.5rem" />
                        </ListItemIcon>
                        <ListItemText>Account Settings</ListItemText>
                    </MenuItem>
                </Link>
                <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />
                <MenuItem sx={{ marginTop: '10px' }} onClick={handleSignOutClick}>
                    <ListItemIcon>
                        <MdLogout height="1.5rem" width="1.5rem" />
                    </ListItemIcon>
                    <ListItemText>Sign Out</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};