import React, { useEffect, useState } from 'react';
import { Container, Breadcrumb, Dropdown, Form, FormControl, Button } from 'react-bootstrap';
import { find } from 'lodash';
import { MoreFiltersModal } from '.';
import { useAppContext } from '../../contexts';
import { ProductFilterProps } from './types';
import { Category, SubCategory, Field, KeyValuePair } from '../../types';

export const ProductFilters: React.FC<ProductFilterProps> = ({
    categoryId,
    sort,
    onFilterChange
}: ProductFilterProps): React.ReactElement => {
    const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>(sort || '');
    const [filter, setFilter] = useState<any>({});
    const { state } = useAppContext();
    const categories: Category[] = state?.category;
    const category: SubCategory = categories.map((cat: Category) => 
        cat.subCategories.filter((subCat: SubCategory) => subCat.id === categoryId)[0]
    ).filter((i: any) => i)[0];

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
        formFilterUrl()
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
        setFilter({...newFilter});
    };

    const getFilterDD = (field: Field) => {
        if (field.fieldType !== 'dropdown') {
            return null;
        }
        return (
            <Dropdown className="d-inline mx-2" key={field.id}>
                <Dropdown.Toggle variant="outline-dark rounded btn-fullround" id="dropdown-autoclose-true">
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
        <>{console.log('abhi1', filter)}
            <MoreFiltersModal
                showMoreFilters={showMoreFilters}
                onCloseMoreFilters={() => setShowMoreFilters(false)}
            />
            <Container className="pt-4 pt-lg-4">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>{category?.name}</Breadcrumb.Item>
                </Breadcrumb>
                <p className="mb-2">{category?.description}</p>
            </Container>

            <div className="fixed-filters mb-3">
                <Container className="">
                    <Dropdown
                        className="d-inline mx-2"
                    >
                        <Dropdown.Toggle variant="outline-dark rounded btn-fullround">
                            Sort By {sortDD[sortBy] ? `: ${sortDD[sortBy]}` : ''}
                        </Dropdown.Toggle>
                        {getSortDD()}
                    </Dropdown>
                    {category.fields.map((field: Field) => getFilterDD(field) )}
                    {find(category.fields, { fieldType: 'price' }) && (
                        <Dropdown className="d-inline mx-2">
                            <Dropdown.Toggle variant="outline-dark rounded btn-fullround" id="dropdown-autoclose-true">
                                Budget:
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="pre-scrollable">
                                <div className="px-3 py-1">
                                    <FormControl className="mb-3" type="number" placeholder='Min price' width="auto" />
                                    <FormControl className="mb-3" type="number" placeholder='Max price' width="auto" />
                                    <Button>Apply</Button>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}

                    {/* <Button
                        className="outline-dark rounded btn-fullround"
                        onClick={() => setShowMoreFilters(true)}
                    >
                        More Filters
                    </Button> */}
                </Container>
            </div>
        </>
    ) : <></>
}