import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaBookmark } from 'react-icons/fa';
import { MdBookmarkBorder, MdBookmark } from 'react-icons/md';
import { FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment, ClickAwayListener, Tooltip } from '@mui/material';
import { SearchFieldValue } from './types';
import { useAxios } from '../../../services';
import { useAppContext } from '../../../contexts';
import './header.css';

export const ProductSearchBox: React.FC = (): React.ReactElement => {
    const { state } = useAppContext();
    const [searchFields, setSearchFields] = useState<SearchFieldValue[]>([]);
    const [searchValue, setSearchValue] = useState<string | null>();
    const [showFieldsBox, setShowFieldsBox] = useState<boolean>(true);
    const [savedSearch, setSavedSearch] = useState<boolean>(false);
    const [showSaveIcon, setShowSaveIcon] = useState<boolean>(false);
    const location = useLocation();

    const [{ data: searchResponse, loading: searchLoading }, searchExecute] = useAxios({
        url: `/product/category?search=${searchValue}`,
        method: 'GET',
    });

    const [{ data: saveSearchResponse, loading: saveSearchLoading }, saveSearchExecute] = useAxios({
        url: '/user/savesearch',
        method: 'POST',
    });

    useEffect(() => {
        if (searchResponse?.success) {
            setSearchFields(searchResponse?.products);
        }
    }, [searchResponse]);

    useEffect(() => {
        const executeSearchApi = debounce(() => {
            searchExecute({
                url: `/product/category?search=${searchValue}`,
            });
        }, 300);
        if (searchValue && searchValue.length >= 2) {
            executeSearchApi();
        } else {
            setSearchFields([]);
        }
    }, [searchValue]);

    const handleSearchInputChange = (event: any) => {
        setSearchValue(event.target.value);
        if (!event.target.value) {
            setSavedSearch(false);
        }
        setShowSaveIcon(false);
    };

    const handleOptionClick = (field: SearchFieldValue) => {
        setSearchValue(field.name);
        setShowFieldsBox(false);
        setShowSaveIcon(true);
    };

    const handleSaveSearch = () => {
        saveSearchExecute({
            data: {
                search: searchValue,
                filters: state?.filters,
            }
        });
        setSavedSearch(true);
        setShowFieldsBox(false);
    };

    const handleClickAway = () => {
        setShowFieldsBox(false);
    }

    return (
        <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClickAway}>
            <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="type-your-search-input">Type your search</InputLabel>
                <OutlinedInput
                    type='text'
                    value={searchValue}
                    autoComplete='off'
                    onFocus={() => setShowFieldsBox(true)}
                    onChange={handleSearchInputChange}
                    endAdornment={
                        <InputAdornment position="end">
                            {showSaveIcon && searchValue && location.pathname.includes('product-list') && state.session.isLoggedIn && (
                                <Tooltip arrow title="Save Search">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleSaveSearch}
                                        onMouseDown={(e) => { e.preventDefault() }}
                                        edge="end"
                                    >
                                        {savedSearch ? (
                                            <MdBookmark />
                                        ) : (
                                            <MdBookmarkBorder />
                                        )}
                                    </IconButton>
                                </Tooltip>
                            )}
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => { setShowFieldsBox(false) }}
                                onMouseDown={(e) => { e.preventDefault() }}
                                edge="end"
                            >
                                <FaSearch />
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Type your search"
                />
                {showFieldsBox && !!searchValue && !!searchFields.length && (
                    <div className="search-list-box">
                        <ul className="search-list">
                            {searchFields.map((field: SearchFieldValue, index: number) =>
                                <Link
                                    to={`/product-listing/${field.id}`}
                                    onClick={() => handleOptionClick(field)}
                                    key={field.id + index.toString()}
                                >
                                    <li className="search-list-item">{field.title}</li>
                                </Link>
                            )}
                        </ul>
                    </div>
                )}
            </FormControl>
        </ClickAwayListener>
    );
}