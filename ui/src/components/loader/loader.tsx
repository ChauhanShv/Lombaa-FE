import {
    Spinner,
    Container,
    Row,
    Col
} from "react-bootstrap";

interface LoaderProps {
    show?: boolean;
};
export const Loader: React.FC<LoaderProps> = ({ show = true }: LoaderProps): React.ReactElement | null => {
    return show ? (
        <Container fluid="md" className="text-center">
            <Row>
                <Col>
                    <Spinner animation="border" variant="success" />
                </Col>
            </Row>
        </Container>
    ) : null;
};