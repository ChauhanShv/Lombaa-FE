import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { filter, isEmpty, isArray } from 'lodash';
import {
    useForm,
    FormProvider,
    FieldValues,
    ResolverResult,
    UnpackNestedValue
} from 'react-hook-form';
import * as yup from "yup";
import { useParams } from 'react-router-dom';
import { useAxios } from '../../services/base-service';
import {
    EditCategoryDropDown,
    DragAndDrop,
    EditFormFields,
    ListingSuccessfulTile,
} from '.';
import { LocationDropdown } from '../create-post';
import {
    Category,
    SubCategory,
    Field,
    FieldValue as CreatePostFieldValue,
} from '../../types';
import { Media } from './types';

interface EditPostProps {
    categories: Category[];
}

export const EditPost: React.FC<EditPostProps> = ({
    categories
}: EditPostProps): React.ReactElement => {
    const { productId } = useParams<{ productId: string }>();
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
    const [location, setLocation] = useState<object | null>(null);
    const [media, setMedia] = useState<Media[]>([]);
    const [successData, setSuccessData] = useState<any>({
        title: '',
        description: '',
        file: '',
        media: [],
    });

    const customResolver = async (
        values: UnpackNestedValue<FieldValues>
    ): Promise<ResolverResult<FieldValues>> => {
        const yupShape: any = {
            location: yup.string().required('Location is required'),
        };
        if (selectedSubCategory) {
            const fields: Field[] = selectedSubCategory.fields;
            fields.forEach((field: Field) => {
                switch (field.fieldType) {
                    case 'text':
                    case 'label':
                    case 'title':
                    case 'email':
                    case 'date':
                    case 'textArea':
                    case 'dropdown':
                    case 'switch':
                    case 'tagView':
                    case 'price':
                        if (field.isRequired) {
                            yupShape[field.id] = yup.string().required(`${field.label} is required`);
                        } else {
                            yupShape[field.id] = yup.string();
                        }
                        break;
                    case 'checkbox':
                        yupShape[field.id] = yup.array().nullable().min(1, `${field.label} is required`);
                    default:
                        return null;
                }
            });
        }
        const schema = yup.object().shape({ ...yupShape });
        try {
            await schema.validate(values, { abortEarly: false });
            return Promise.resolve({
                values,
                errors: {}
            });
        } catch (err: any) {
            const validationErrors: any = {};
            err.inner.forEach((e: yup.ValidationError) => {
                if (e.path) {
                    validationErrors[e.path] = {
                        ...e,
                    };
                }
            });
            return Promise.resolve({
                values,
                errors: validationErrors,
            });
        }
    };
    const formMethods = useForm({
        mode: 'all',
        resolver: customResolver
    });
    const { handleSubmit, formState: { errors } } = formMethods;
    const [{ data: editPostRes, loading: editPostLoading }, execute] = useAxios({
        url: `/product/edit/${productId}`,
        method: 'POST',
    });
    const [{ data: productDetail, loading: productLoading }, productDetailExecute] = useAxios({
        url: `/product/${productId}`,
        method: 'GET',
    });

    useEffect(() => {
        productDetailExecute({});
    }, []);

    const onSubmit = (values: any) => {
        if (!isEmpty(errors)) {
            return false;
        }
        const postData: any = {
            categoryId: values?.subCategory,
            fields: [],
            media: media.map((i: Media) => ({ token: i.token, isPrimary: i.isPrimary })),
            location: location ? location : {
                city: productDetail?.product?.location?.city?.id,
                country: productDetail?.product?.location?.country?.id,
                region: productDetail?.product?.location?.region?.id,
            },
        };
        selectedSubCategory?.fields.forEach((field: Field) => {
            const value: any = {};
            if ([
                'text',
                'textArea',
                'email',
                'date',
                'price',
                'title',
                'description',
                'label'
            ].includes(field.fieldType)) {
                value.id = null;
                value.value = values[field.id];
                if (field.fieldType === 'title') {
                    setSuccessData({
                        ...successData,
                        title: values[field.id],
                    });
                }
                if (field.fieldType === 'description') {
                    setSuccessData({
                        ...successData,
                        description: values[field.id],
                    });
                }
            } else {
                const selectedValue: CreatePostFieldValue = field.values.filter((item: CreatePostFieldValue) => {
                    if (isArray(values[field.id])) {
                        return item.id === values[field.id][0];
                    }
                    return item.id === values[field.id];
                })[0];
                if (selectedValue) {
                    value.id = selectedValue.id;
                    value.value = selectedValue.value;
                }
            }
            postData.fields.push({
                id: field.id,
                value,
            });
        });
        execute({
            data: postData,
        });
    };

    const handleFormSubmit = (event: any) => {
        event.preventDefault();
        handleSubmit(onSubmit)();
    };

    const onSubCategorySelected = (subCat: string) => {
        if (subCat) {
            const selectedSubCat = categories.map((cat: Category) => {
                return filter(cat.subCategories, { id: subCat });
            }).filter(i => i.length)[0] || [];
            setSelectedSubCategory(selectedSubCat[0] || {});
        } else {
            setSelectedSubCategory(null);
        }
    };

    const onCitySelected = (location: object) => {
        setLocation(location);
    };

    const updateMedia = (updatedMedia: Media[]) => {
        setMedia([
            ...updatedMedia,
        ]);
        setSuccessData({
            ...successData,
            file: updatedMedia[0]?.url || '',
            media: updatedMedia,
        });
    };

    return editPostRes?.success ? <ListingSuccessfulTile {...successData} /> : (
        <Container className="p-4 pt-lg-5">
            <FormProvider {...formMethods}>
                <Form onSubmit={handleFormSubmit} noValidate>
                    <h1 className="mb-3 h2">What are you listing today?</h1>
                    <Row>
                        <Col lg="4">
                            {productLoading ? (
                                <Spinner animation="grow" />
                            ) : (
                                <DragAndDrop
                                    updateMedia={updateMedia}
                                    productDetail={productDetail?.product}
                                />
                            )}
                        </Col>
                        <Col lg={8}>
                            <div className="shadow p-3 p-lg-5 h-100">
                                <EditCategoryDropDown
                                    productDetail={productDetail?.product}
                                    categories={categories}
                                    onSubCategorySelected={onSubCategorySelected}
                                />
                                {!!selectedSubCategory?.fields?.length &&
                                    <>
                                        <LocationDropdown
                                            onCitySelected={onCitySelected}
                                            defaultValue={productDetail?.product?.location?.city?.id}
                                        />
                                        <EditFormFields
                                            fields={selectedSubCategory?.fields}
                                            fieldValues={productDetail?.product?.productFields}
                                        />
                                        <Col lg={8} className="mx-auto">
                                            <div className="d-flex justify-content-end">
                                                <Button
                                                    variant="success"
                                                    className="btn-lg w-100 fw-bold mb-2 rounded btn-fullround text-success me-2 text-center"
                                                    type="submit"
                                                >
                                                    {editPostLoading ? (
                                                        <Spinner animation="border" role="status"></Spinner>
                                                    ) : 'POST AD'}
                                                </Button>
                                            </div>
                                            <p className="text-center text-muted mb-5">
                                                <small>
                                                    By clicking on Post Ad, you accept the Terms of Use, confirm that you will abide by the Safety Tips, and declare that this posting does not include any Prohibited Items.
                                                </small>
                                            </p>
                                        </Col>
                                    </>
                                }
                            </div>
                        </Col>
                    </Row>
                </Form>
            </FormProvider>
        </Container>
    );
};