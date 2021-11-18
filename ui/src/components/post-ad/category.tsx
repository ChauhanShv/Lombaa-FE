import React, { useEffect } from 'react';
import { Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import { useAxios } from '../../services/base-service';

export const CategorySelector: React.FC = () => {
    const [responseData, setResponseData] = React.useState<any>();
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
        console.log(responseData);
    }, [response]);

    const handleCategoryChange = () => {
    }

    return (
        <Container>
            <Row className="g-2">
                <Col md>
                    <FloatingLabel label="Category" className="mb-3">
                        <Form.Select onChange={handleCategoryChange}>
                            <option>Select Category</option>
                            {responseData && (
                                <>
                                    {responseData?.map((category: any) => {
                                        return (
                                            <option key={category?.name}>
                                                {category?.name}
                                            </option>
                                        );
                                    })}
                                </>
                            )}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>
        </Container>
    );
}