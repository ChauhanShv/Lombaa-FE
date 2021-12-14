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
import { useAxios } from '../../services/base-service';
import {
    CategoryDropDown,
    DragAndDrop,
    FormFields,
    ListingSuccessfulTile,
    Categories,
    SubCategories,
    Fields,
    FieldValues as CreatePostFieldValues,
} from '.';

interface CreatePostProps {
    categories: Categories[],
};

export const CreatePost: React.FC<CreatePostProps> = ({
    categories,
}: CreatePostProps): React.ReactElement => {
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategories | null>(null);
    const [filesToken, setFilesToken] = useState<Array<Object>>([]);
    const [successData, setSuccessData] = useState<any>({
        title: '',
        description: '',
        file: [],
    });
    const customResolver = async (
        values: UnpackNestedValue<FieldValues>
    ): Promise<ResolverResult<FieldValues>> => {
        const yupShape: any = {
            category: yup.string().required('Category is required'),
            subCategory: yup.string().required('Sub category is required'),
        };
        if (selectedSubCategory) {
            const fields: Fields[] = selectedSubCategory.fields;
            fields.forEach((field: Fields) => {
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
    const [{ data: createPostRes, loading: createPostLoading, error: createPostError }, execute] = useAxios({
        url: '/product',
        method: 'POST',
    });
    const [{ data: mediaApi, loading: mediaLoading, error: mediaApiError }, executeMedia] = useAxios({
        url: '/product/media',
        method: 'POST',
    });

    useEffect(() => {
        if (mediaApi?.Success && !filesToken.includes(mediaApi?.media?.token)) {
            setFilesToken([...filesToken, { token: mediaApi?.media?.token }]);
            if (filesToken.length === 0) {
                setSuccessData({
                    ...successData,
                    file: mediaApi?.media?.url,
                });
            }
        }
    }, [mediaApi]);

    const onSubmit = (values: any) => {
        if (!isEmpty(errors)) {
            return false;
        }
        const postData: any = {
            categoryId: values?.subCategory,
            fields: [],
            media: filesToken,
        };
        selectedSubCategory?.fields.forEach((field: Fields) => {
            const value: any = {};
            if ([
                'text',
                'textArea',
                'email',
                'date',
                'price',
                'title',
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
            } else {
                const selectedValue: CreatePostFieldValues = field.values.filter((item: CreatePostFieldValues) => {
                    if (isArray(values[field.id])) {
                        return item.id === values[field.id][0];
                    }
                    return item.id === values[field.id];
                })[0];
                value.id = selectedValue.id;
                value.value = selectedValue.value;
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
            const selectedSubCat = categories.map((cat: Categories) => {
                return filter(cat.subCategories, { id: subCat });
            }).filter(i => i.length)[0] || [];
            setSelectedSubCategory(selectedSubCat[0] || {});
        } else {
            setSelectedSubCategory(null);
        }
    };

    const onFilesUpload = async (files: Array<Blob>) => {
        const formData = new FormData();
        for (const file of files) {
            formData.append('media', file);
            try {
                await executeMedia({ data: formData });
            } catch (error: any) { }
            formData.delete('media');
        }
    }

    return createPostRes?.Success ? <ListingSuccessfulTile {...successData} /> : (
        <Container className="p-4 pt-lg-5">
            <FormProvider {...formMethods}>
                <Form onSubmit={handleFormSubmit} noValidate>
                    <h1 className="mb-3 h2">What are you listing today?</h1>
                    <Row>
                        <Col lg={filesToken.length ? 4 : 12}>
                            <DragAndDrop onFilesUpload={onFilesUpload} />
                        </Col>
                        {!!filesToken.length && (
                            <Col lg={8}>
                                <div className="shadow p-3 p-lg-5 h-100">
                                    <CategoryDropDown
                                        categories={categories}
                                        onSubCategorySelected={onSubCategorySelected}
                                    />
                                    {!!selectedSubCategory?.fields?.length && <FormFields fields={selectedSubCategory?.fields} />}
                                    <div className="d-flex justify-content-end">
                                        <Button variant="fullround" className="btn-success rounded btn-lg" type="submit">
                                            {createPostLoading ? (
                                                <Spinner animation="border" role="status"></Spinner>
                                            ) : 'List Now'}
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        )}
                    </Row>
                </Form>
            </FormProvider>
        </Container>
    );
};
