import React, { useState } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Form, FloatingLabel } from 'react-bootstrap';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
    CategorySelector,
    DragAndDrop,
    getPostSubCategoryComponent,
    SubCategories,
    Fields
} from '.';


const postAdFormSchema = yup.object().shape({
    category: yup.string().required(),
    subCategory: yup.string().required(),
    dynamicSelect: yup.string().required('This is a required field'),
    dynamicInput: yup.string().required('This Field is Required'),
});

export const PostAdForm: React.FC = (): React.ReactElement => {
    const [isForSale, setIsForSale] = useState<Number>(1);
    const [price, setPrice] = useState<Number>(0.00);
    const [subCategorySelected, setSubCategorySelected] = useState<SubCategories | null>(null);

    const formMethods = useForm({
        resolver: yupResolver(postAdFormSchema),
    });
    const { register, handleSubmit, formState: { errors } } = formMethods;

    const getErrorText = (field: string): React.ReactElement | null => {
        const errorMessages: any = {
            ...errors
        };
        if (errorMessages[field]) {
            return (
                <Form.Text className="text-danger">
                    {errorMessages[field]?.message}
                </Form.Text>
            );
        }
        return null;
    };
    const getErrorClassName = (field: string): string => {
        const errorMessages: any = {
            ...errors,
        };
        return errorMessages[field] ? 'is-invalid' : '';
    };

    const handlePriceChange = (event: any) => {
        setPrice(event.target.value);
        if (isForSale !== 1) {
            setPrice(0);
        }
    };

    const onSubmit = (values: any) => {
    };

    const handleFormSubmit = (event: any) => {
        event.preventDefault();
        handleSubmit(onSubmit)();
    };

    return (
        <Container className="p-4 pt-lg-5">
            <FormProvider {...formMethods}>
                <Form onSubmit={handleFormSubmit}>
                    <h1 className="mb-3 h2">What are you listing today?</h1>
                    <Row className="">
                        <Col lg={4}>
                            <DragAndDrop />
                        </Col>
                        <Col lg={8}>
                            <div className="shadow p-3 p-lg-5 h-100">
                                <CategorySelector
                                    onSubCategorySelected={setSubCategorySelected}
                                />
                                {!!subCategorySelected?.fields?.length && (getPostSubCategoryComponent(subCategorySelected.fields))}
                                <div className="d-flex justify-content-end">
                                    <Button variant="fullround" className="btn-success rounded btn-lg" type="submit">List Now</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </FormProvider>
        </Container>
    );
};
