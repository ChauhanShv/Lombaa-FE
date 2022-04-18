import React, { useEffect } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { getErrorClassName } from '../../utils';
import { Category, SubCategory } from '../../types';
import { ProductDetail } from '../product-detail/types';

interface CategoryProps {
    categories: Category[];
    onSubCategorySelected: (subCat: string) => void;
    productDetail: ProductDetail;
};

export const EditCategoryDropDown: React.FC<CategoryProps> = ({
    categories,
    onSubCategorySelected,
    productDetail,
}: CategoryProps): React.ReactElement => {
    const { register, formState: { errors } } = useFormContext();
    const [subCategories, setSubCategories] = React.useState<SubCategory[]>([]);

    const category = categories.find((cat: Category) =>
        cat.subCategories.find((subCat: SubCategory) => subCat?.id === productDetail?.category?.id)
    );
    const categoryId = category?.id;

    useEffect(() => {
        let newSubCat: SubCategory[] = [];
        newSubCat = categories.filter((cat: Category) => cat.id === categoryId)[0]?.subCategories || [];
        setSubCategories(newSubCat);
    });

    useEffect(() => {
        onSubCategorySelected(productDetail?.category?.id);
    }, [subCategories]);

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

    return (
        <>
            <FloatingLabel className="mb-3" controlId="category-select" label="Select Category">
                <Form.Select
                    className={getErrorClassName('category', errors)}
                    aria-label="Select Category"
                    {...register('category')}
                    disabled
                    value={categoryId}
                >
                    <option value="">Select Category</option>
                    {categories && categories.map((category: Category) =>
                        <option key={category?.id} value={category?.id}>
                            {category?.name}
                        </option>
                    )}
                </Form.Select>
                {getErrorText('category')}
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="subcategory-select" label="Select Sub Category">
                <Form.Select
                    className={getErrorClassName('subCategory', errors)}
                    aria-label="Select Sub Category"
                    {...register('subCategory')}
                    disabled
                    value={productDetail?.category?.id}
                >
                    <option value="">Select Sub-Category</option>
                    {subCategories?.map((category: SubCategory) =>
                        <option key={category?.id} value={category?.id}>
                            {category?.name}
                        </option>
                    )}
                </Form.Select>
                {getErrorText('subCategory')}
            </FloatingLabel>
        </>
    );
}