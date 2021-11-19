import React, { useEffect } from 'react';
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';
import { useAxios } from '../../services/base-service';

export const CategorySelector: React.FC = () => {
    const [responseData, setResponseData] = React.useState<any>();
    const [formSubmit, setFormSubmit] = React.useState<boolean>(false);
    const [subCategoryData, setSubCategoryData] = React.useState<any>();
    const [subCategorySelector, setSubCategorySelector] = React.useState<boolean>();

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
            setSubCategorySelector(true);
            setSubCategoryData({});
            var index = responseData.findIndex((category: any) => category.name === e.target.value);
            setSubCategoryData(responseData[index]?.subCategories);
        }
    }

    const handleSubCategoryChange = (e: any) => {
        if (e.target.value) {
            setFormSubmit(true);
        }
    };

    return (
        <Container>
            <Row className="g-2">
                <Col md>
                    <FloatingLabel label="Category" className="mb-3">
                        <Form.Select onChange={handleCategoryChange}>
                            <option>Select Category</option>
                            {responseData && (
                                <>
                                    {console.log(responseData)}
                                    {responseData?.map((category: any) => {
                                        return (
                                            <option key={category?.name} value={category?.name}>
                                                {category?.name}
                                            </option>
                                        );
                                    })}
                                </>
                            )}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col md>
                    {subCategorySelector && (
                        <FloatingLabel label="Sub-Category">
                            <Form.Select onChange={handleSubCategoryChange}>
                                <option>Select Sub Category</option>
                                <>
                                    {subCategoryData?.map((category: any) => {
                                        return (
                                            <option key={category?.name} value={category?.name}>
                                                {category?.name}
                                            </option>
                                        );
                                    })}
                                </>
                            </Form.Select>
                        </FloatingLabel>
                    )}
                </Col>
            </Row>
            <Row>
                <Col md>
                    {formSubmit && (
                        <Button>Submit</Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
}