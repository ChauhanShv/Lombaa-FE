import React, { useEffect } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import { useAxios } from '../../services/base-service';
import { useFormContext } from 'react-hook-form';
import { getPostSubCategoryComponent } from '.';

interface CategoryProps {
    onCategorySelected: any,
    onSubCategorySelected: any,
};

export const CategorySelector: React.FC<CategoryProps> = ({ onCategorySelected, onSubCategorySelected }: CategoryProps): React.ReactElement => {
    const [responseData, setResponseData] = React.useState<any>([]);
    const [subCategoryData, setSubCategoryData] = React.useState<any>(null);
    const [subCategoryFields, setSubCategoryFields] = React.useState<any>(null);

    const { register, formState: { errors } } = useFormContext();

    const [{ data: response, loading, error: apiError }, execute] = useAxios({
        url: '/category',
        method: 'GET',
    });

    useEffect(() => {
        execute();
    }, []);

    useEffect(() => {
        if (response?.success) {
            setResponseData(response?.response);
        }
    }, [response]);

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

    const handleCategoryChange = (e: any) => {
        e.preventDefault();
        if (e.target.value) {
            const index = responseData.findIndex((category: any) => category.id === e.target.value);
            setSubCategoryData(responseData[index]?.subCategories);
            onCategorySelected(responseData);
        } else {
            setSubCategoryData(null);
            onCategorySelected(null);
        }
    }
    const handleSubCategoryChange = (e: any) => {
        e.preventDefault();
        if (e.target.value) {
            const index = subCategoryData.findIndex((category: any) => category.id === e.target.value);
            setSubCategoryFields(subCategoryData[index]);
            onSubCategorySelected(subCategoryData);
        } else {
            setSubCategoryFields(null);
            onSubCategorySelected(null);
        }
    };

    return (
        <>
            <FloatingLabel className="mb-3" controlId="floatingSelect" label="Select Category">
                <Form.Select
                    className={getErrorClassName('category')}
                    aria-label="Select Category"
                    {...register('category')}
                    onChange={handleCategoryChange}
                >
                    <option value="">Select Category</option>
                    {responseData && (
                        <>
                            {responseData?.map((category: any) =>
                                <option key={category?.id} value={category?.id}>
                                    {category?.name}
                                </option>
                            )}
                        </>
                    )}
                </Form.Select>
                {getErrorText('category')}
            </FloatingLabel>
            {subCategoryData && (
                <FloatingLabel className="mb-3" controlId="floatingSelect" label="Select Sub Category">
                    <Form.Select
                        className={getErrorClassName('subCategory')}
                        aria-label="Select Sub Category"
                        {...register('subCategory')}
                        onChange={handleSubCategoryChange}
                    >
                        <option value="">Select Sub-Category</option>
                        {subCategoryData?.map((category: any) =>
                            <option key={category?.id} value={category?.id}>
                                {category?.name}
                            </option>
                        )}
                    </Form.Select>
                    {getErrorText('subCategory')}
                </FloatingLabel>
            )}
            {responseData && subCategoryData && subCategoryFields && (
                <>
                    {getPostSubCategoryComponent(subCategoryFields)}
                </>
            )}
        </>
    );
}