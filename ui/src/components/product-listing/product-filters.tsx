import React, { useEffect, useState } from 'react';
import { Container, Breadcrumb, Dropdown, Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { MoreFiltersModal } from '.';
import { useAppContext } from '../../contexts';
import { ProductFilterProps } from './types';
import { Categories, Fields } from '../create-post';

export const ProductFilters: React.FC<ProductFilterProps> = ({
    productList
}: ProductFilterProps): React.ReactElement => {

    const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false);
    const [dropdownFields, setDropdownFields] = useState<Fields[]>([]);
    const [fieldValues, setFieldValues] = useState<any>({});
    const { categoryId } = useParams<{ categoryId: string }>();
    const { state } = useAppContext();
    const category = state?.category;

    useEffect(() => {
        if (!!category.length) {
            category.map((categoryData: Categories) => {
                const subCat = categoryData?.subCategories.find((subCategories) => subCategories.id === categoryId) || false;
                if (subCat && !!subCat.fields.length) {
                    setDropdownFields(subCat.fields.filter((field) => field.fieldType === 'dropdown'));
                }
            });
        }
        console.log(fieldValues, '111222');
    }, [productList, categoryId]);

    const handleFilterChange = (e: any, fieldLabel: string) => {
        console.log(e.target.checked, 'e target check');
        if (e.target.checked) {
            const checkedLabel = fieldLabel.toLowerCase().replace('_', ' ');
            setFieldValues({
                ...fieldValues,
                [`${checkedLabel}`]: {
                    value: [e.target.value],
                },
            });
            console.log({
                ...fieldValues,
                [`${checkedLabel}`]: {
                    value: [e.target.value],
                },
            }, '12233456');
        }
        //setFieldValues({ ...fieldValues, [`${fieldLabel}`]: { value: [] } })
    };

    return (
        <>
            <MoreFiltersModal
                showMoreFilters={showMoreFilters}
                onCloseMoreFilters={() => setShowMoreFilters(false)}
            />

            <Container className="pt-4 pt-lg-4">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                        Library
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Data</Breadcrumb.Item>
                </Breadcrumb>
                <h1 className="h4 text-secondary mb-1">Get The Best Deals On Used Cars in Ghana</h1>
                <p className="mb-2">Thousands of cars to choose from Kia, Honda, Volkswagen, Toyota and more under $70,000 in Ghana</p>
            </Container>

            <div className="fixed-filters mb-3">
                <Container className="">
                    {(!!dropdownFields.length) && dropdownFields.map((dropdownField, dropdownFieldIndex) =>
                        <Dropdown className="d-inline mx-2" key={dropdownField.id}>
                            <Dropdown.Toggle variant="outline-dark rounded btn-fullround" id="dropdown-autoclose-true">
                                {dropdownField.label}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="pre-scrollable">
                                {dropdownField.values.map((dropdownValue) =>
                                    <div className="px-2 py-2" key={dropdownValue.id}>
                                        <Form.Group>
                                            <Form.Check
                                                type="checkbox"
                                                label={dropdownValue.value}
                                                value={dropdownValue.value}
                                                onChange={(e) =>
                                                    handleFilterChange(e, dropdownField.label)
                                                }
                                            />
                                        </Form.Group>
                                    </div>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
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

                    {/* <Button
                        className="outline-dark rounded btn-fullround"
                        onClick={() => setShowMoreFilters(true)}
                    >
                        More Filters
                    </Button> */}
                </Container>
            </div>
        </>
    );
}