import React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { MdLogout } from 'react-icons/md';
import { MdSettings } from 'react-icons/md';
import { useAppContext, ActionTypes } from '../../../contexts';

export const HeaderDropdown: React.FC = (): React.ReactElement => {

    const { state, dispatch } = useAppContext();
    const { user, session } = state;
    const userData = state?.user?.metaData;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleDropdownClick = (event: any) => {
        setAnchorEl(event.currentTarget);
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
            //onMouseLeave={(e) => setAnchorEl(null)}
            />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
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