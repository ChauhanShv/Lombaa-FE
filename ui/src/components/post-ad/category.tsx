import React, { useEffect } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import { useAxios } from '../../services/base-service';

export const CategorySelector: React.FC = (): React.ReactElement => {
    const [responseData, setResponseData] = React.useState<any>([]);
    const [subCategoryData, setSubCategoryData] = React.useState<any>([]);

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

    const handleCategoryChange = (e: any) => {
        if (e.target.value) {
            var index = responseData.findIndex((category: any) => category.id === e.target.value);
            console.log(index);
            setSubCategoryData(responseData[index]?.subCategories[0].fields[0].values);
            console.log(subCategoryData);
        }
    }

    const handleSubCategoryChange = (e: any) => {
        if (e.target.value) {
        }
    };

    return (
        <>
            <FloatingLabel className="mb-3" controlId="floatingSelect" label="Select Category">
                <Form.Select aria-label="Select Category" onChange={handleCategoryChange}>
                    <option>Select Category</option>
                    {responseData && (
                        <>
                            {responseData?.map((category: any) => {
                                return (
                                    <option key={category?.id} value={category?.id}>
                                        {category?.name}
                                    </option>
                                );
                            })}
                        </>
                    )}
                </Form.Select>
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="floatingSelect" label="Select Sub Category">
                <Form.Select aria-label="Select Sub Category" onChange={handleSubCategoryChange}>
                    <option>Select Sub Category</option>
                    <>
                        {subCategoryData?.map((category: any) => {
                            return (
                                <option key={category?.name} value={category?.name}>
                                    {category?.value}
                                </option>
                            );
                        })}
                    </>
                </Form.Select>
            </FloatingLabel>
        </>
    );
}