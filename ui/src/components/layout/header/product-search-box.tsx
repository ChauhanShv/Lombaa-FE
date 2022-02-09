import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaBookmark } from 'react-icons/fa';
import { MdBookmarkBorder, MdBookmark } from 'react-icons/md';
import { FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment } from '@mui/material';
import { SearchFieldValue } from './types';
import { useAxios } from '../../../services';
import { useAppContext } from '../../../contexts';
import './header.css';

export const ProductSearchBox: React.FC = (): React.ReactElement => {
    const { state } = useAppContext();
    const [searchFields, setSearchFields] = useState<SearchFieldValue[]>([]);
    const [searchValue, setSearchValue] = useState<string | null>();
    const [savedSearches, setSavedSearches] = useState<any[]>();
    const location = useLocation();

    const [{ data: searchResponse, loading: searchLoading }, searchExecute] = useAxios({
        url: `/product/category?search=${searchValue}`,
        method: 'GET',
    });

    const [{ data: saveSearchResponse, loading: saveSearchLoading }, saveSearchExecute] = useAxios({
        url: '/user/savesearch',
        method: 'POST',
    });

    const handleSearchInputChange = (event: any) => {
        setSearchValue(event.target.value);
        const executeSearchApi = debounce(() => {
            searchExecute({
                url: `/product/category?search=${event.target.value}`,
            });
        }, 1000);
        executeSearchApi();
    }

    useEffect(() => {
        if (searchResponse?.success) {
            setSearchFields(searchResponse?.products);
        }
    }, [searchResponse]);

    useEffect(() => {
        if (saveSearchResponse?.success) {
            setSavedSearches(saveSearchResponse?.data);
        }
    }, [saveSearchResponse]);

    const handleSaveSearch = () => {
        saveSearchExecute({
            data: {
                search: searchValue,
                data: state?.filters,
            }
        });
    };

    return (
        <>
            <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="type-your-search-input">Type your search</InputLabel>
                <OutlinedInput
                    id="type-your-search-input"
                    type='text'
                    value={searchValue}
                    onChange={handleSearchInputChange}
                    endAdornment={
                        <InputAdornment position="end">
                            {location.pathname.includes('product-list') && (
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleSaveSearch}
                                    onMouseDown={(e) => { e.preventDefault() }}
                                    edge="end"
                                >
                                    <MdBookmark />
                                </IconButton>
                            )}
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => { }}
                                onMouseDown={(e) => { e.preventDefault() }}
                                edge="end"
                            >
                                <FaSearch />
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Type your search"
                />
                {!!searchValue && !!searchFields.length && (
                    <div className="search-list-box">
                        <ul className="search-list">
                            {searchFields.map((field: SearchFieldValue) =>
                                <Link
                                    to={`/product-listing/${field.id}`}
                                    onClick={() => setSearchValue(field.name)}
                                    key={field.id}
                                >
                                    <li className="search-list-item">{field.name}</li>
                                </Link>
                            )}
                        </ul>
                    </div>
                )}
            </FormControl>
        </>
    );
}