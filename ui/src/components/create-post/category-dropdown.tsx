import React from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { getErrorClassName } from '../../utils';
import { Category, SubCategory } from '../../types';

interface CategoryProps {
    categories: Category[],
    onSubCategorySelected: (subCat: string) => void,
};

export const CategoryDropDown: React.FC<CategoryProps> = ({
    categories,
    onSubCategorySelected
}: CategoryProps): React.ReactElement => {
    const { register, formState: { errors } } = useFormContext();
    const [subCategories, setSubCategories] = React.useState<SubCategory[]>([]);

    const handleCategoryChange = (e: React.FormEvent<HTMLSelectElement>) => {
        // @ts-ignore
        const { value } = e.target;
        let newSubCat: SubCategory[] = [];
        newSubCat = categories.filter((cat: Category) => cat.id === value)[0]?.subCategories || [];
        setSubCategories(newSubCat);
        onSubCategorySelected("");
    }
    const handleSubCategoryChange = (e: React.FormEvent<HTMLSelectElement>): void => {
        // @ts-ignore
        const { value = "" } = e.target;
        onSubCategorySelected(value);
    };

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
                    onChange={handleCategoryChange}
                >
                    <option value="">Select Category</option>
                    {categories.map((category: Category) =>
                        <option key={category?.id} value={category?.id}>
                            {category?.name}
                        </option>
                    )}
                </Form.Select>
                {getErrorText('category')}
            </FloatingLabel>
            {!!subCategories?.length && (
                <FloatingLabel className="mb-3" controlId="subcategory-select" label="Select Sub Category">
                    <Form.Select
                        className={getErrorClassName('subCategory', errors)}
                        aria-label="Select Sub Category"
                        {...register('subCategory')}
                        onChange={handleSubCategoryChange}
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
            )}
        </>
    );
}