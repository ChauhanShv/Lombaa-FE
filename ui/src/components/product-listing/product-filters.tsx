import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Dropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Breadcrumbs, Typography } from '@mui/material';
import { find } from 'lodash';
import { MoreFiltersModal } from '.';
import { ActionTypes, useAppContext } from '../../contexts';
import { useAxios } from '../../services';
import { ProductFilterProps } from './types';
import { Category, SubCategory, Field, KeyValuePair } from '../../types';
import { NONAME } from 'dns';

export const ProductFilters: React.FC<ProductFilterProps> = ({
    categoryId,
    sort,
    onFilterChange
}: ProductFilterProps): React.ReactElement => {
    const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>(sort || '');
    const [filter, setFilter] = useState<any>({});
    const [budget, setBudget] = useState<any>({
        min: '',
        max: '',
    });
    const [searchFilter, setSearchFilter] = useState<any>([]);
    const { state, dispatch } = useAppContext();
    const navigate = useHistory();
    const categories: Category[] = state?.category;
    const category: SubCategory = categories.map((cat: Category) =>
        cat.subCategories.filter((subCat: SubCategory) => subCat.id === categoryId)[0]
    ).filter((i: any) => i)[0];
    const categoryFilter = categories.find((cat: Category) =>
        cat.subCategories.find((subCat: SubCategory) => subCat?.id === categoryId)
    );

    const formFilterUrl = () => {
        let filterArr: string[] = [];
        Object.keys(filter).map((item: string) => {
            if (filter[item].length) {
                filterArr.push(`${item}$${filter[item].join(',')}`);
            }
        });
        onFilterChange([sortBy, filterArr.length ? `filter=${filterArr.join(',')}` : ''].filter((i: string) => i).join('&'));
    };

    useEffect(() => {
        formFilterUrl();
        const newSearchFilter: any[] = [];
        Object.keys(filter).map((item: string, index: number) => {
            newSearchFilter.push({
                key: item,
                values: filter[item],
            });
        });
        setSearchFilter([...newSearchFilter]);
        dispatch({
            type: ActionTypes.PRODUCT_FILTERS,
            payload: {
                filters: [...newSearchFilter],
            },
        });
    }, [sortBy, filter]);

    const sortDD: KeyValuePair = {
        'sortby=postedAt&sortorder=asc': 'Oldest',
        'sortby=postedAt&sortorder=desc': 'Latest',
    };
    if (category && find(category.fields, { fieldType: 'price' })) {
        sortDD['sortby=price&sortorder=asc'] = 'Price - Low to High';
        sortDD['sortby=price&sortorder=desc'] = 'Price - High to Low';
    }

    const handleFilterChange = (e: any, field: string) => {
        const newFilter: any = filter;
        const value: string = e.target.value;
        if (e.target.checked) {
            const newValues: string[] = newFilter[field] ?? [];
            newValues.push(value);
            newFilter[field] = newValues;
        } else {
            const newValues: string[] = newFilter[field] ?? [];
            newValues.splice(newValues.indexOf(value), 1);
            newFilter[field] = newValues;
        }
        setFilter({ ...newFilter });
    };

    const handleApplyBudgetFilter = () => {

    }

    const handleSubCatChange = (e: any, subCatId: string) => {
        navigate.push(`/product-listing/${subCatId}`);
    };

    const getSubCategory = () => {
        return (
            <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle variant="outline-dark rounded btn-fullround mb-2">
                    Category
                </Dropdown.Toggle>
                <Dropdown.Menu className='pre-scrollable'>
                    {categoryFilter?.subCategories?.map((subCat: SubCategory) =>
                        <Dropdown.Item
                            onClick={(e) => handleSubCatChange(e, subCat?.id)}
                            className="px-2 py-2"
                            key={subCat?.id}
                        >
                            <Form.Group>
                                <Form.Check
                                    type="radio"
                                    label={subCat?.name}
                                    value={subCat?.id}
                                    checked={subCat?.id === categoryId}
                                    onChange={(e) => handleSubCatChange(e, subCat?.id)}
                                />
                            </Form.Group>
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        );
    }

    const getFilterDD = (field: Field) => {
        if (field.fieldType !== 'dropdown') {
            return null;
        }
        return (
            <Dropdown className="d-inline mx-2" key={field.id}>
                <Dropdown.Toggle variant="outline-dark rounded btn-fullround mb-2" id="dropdown-autoclose-true">
                    {field.label}
                </Dropdown.Toggle>
                <Dropdown.Menu className="pre-scrollable">
                    {field.values.map((dropdownValue) =>
                        <div className="px-2 py-2" key={dropdownValue.id}>
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    label={dropdownValue.value}
                                    value={dropdownValue.value}
                                    onChange={(e) => handleFilterChange(e, field.label)}
                                />
                            </Form.Group>
                        </div>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    const onSortChange = (sortValue: string) => {
        setSortBy(sortValue);
    };

    const getSortDD = () => {
        return (
            <Dropdown.Menu className="pre-scrollable">
                {Object.keys(sortDD).map((item) =>
                    <Dropdown.Item key={item} onClick={() => onSortChange(item)}>{sortDD[item]}</Dropdown.Item>)}
            </Dropdown.Menu>
        );
    };

    return category ? (
        <>
            <MoreFiltersModal
                showMoreFilters={showMoreFilters}
                onCloseMoreFilters={() => setShowMoreFilters(false)}
            />
            <Container className="pt-4 pt-lg-4">
                <Breadcrumbs separator=">">
                    <Link to="/">Home</Link>
                    <Link to="#">{category?.name}</Link>
                </Breadcrumbs>
                <Typography variant="subtitle2" className="mt-3 mb-2 fw-normal">
                    {category?.description}
                </Typography>
            </Container>

            <div className="fixed-filters mb-3">
                <Container className="">
                    {getSubCategory()}
                    <Dropdown
                        className="d-inline mx-2"
                    >
                        <Dropdown.Toggle
                            style={{ fontSize: '12px !important', }}
                            variant="outline-dark rounded btn-fullround mb-2"
                        >
                            Sort By {sortDD[sortBy] ? `: ${sortDD[sortBy]}` : ''}
                        </Dropdown.Toggle>
                        {getSortDD()}
                    </Dropdown>
                    {category.fields.map((field: Field) => getFilterDD(field))}
                    {find(category.fields, { fieldType: 'price' }) && (
                        <Dropdown className="d-inline mx-2">
                            <Dropdown.Toggle variant="outline-dark rounded btn-fullround mb-2" id="dropdown-autoclose-true">
                                Budget: {`${budget.min || ''} - ${budget.max || ''}`}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="pre-scrollable">
                                <div className="px-3 py-1">
                                    <FormControl
                                        className="mb-3"
                                        type="number"
                                        placeholder='Min price'
                                        width="auto"
                                        value={budget.min}
                                        onChange={(e) => setBudget({
                                            ...budget,
                                            min: e.target.value,
                                        })}
                                    />
                                    <FormControl
                                        className="mb-3"
                                        type="number"
                                        placeholder='Max price'
                                        width="auto"
                                        value={budget.max}
                                        onChange={(e) => setBudget({
                                            ...budget,
                                            max: e.target.value,
                                        })}
                                    />
                                    <Button className="p-0" onClick={handleApplyBudgetFilter}>
                                        <Dropdown.Item className="p-2 bg-transparent text-white">
                                            Apply
                                        </Dropdown.Item>
                                    </Button>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </Container>
            </div>
        </>
    ) : <></>
}