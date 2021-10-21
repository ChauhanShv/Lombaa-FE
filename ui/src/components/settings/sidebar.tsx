import React from 'react';;
import { ListGroup, Card } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight, } from 'react-icons/fa';

export const SideBar: React.FC = (): React.ReactElement => {
    return (
        <Card className="sidenav bg-light">
            <Card.Header className="d-flex align-items-center"> <button className="btn btn-white"><FaChevronLeft /></button> Settings</Card.Header>
            <ListGroup className="mb-3">
                <ListGroup.Item className="active py-3" action href="">Personal details
                    <FaChevronRight /></ListGroup.Item>
                <ListGroup.Item action href="" className="py-3">Business information <FaChevronRight /></ListGroup.Item>
            </ListGroup>

            <ListGroup>
                <ListGroup.Item className="py-3" action href="">Personal details
                    <FaChevronRight /></ListGroup.Item>
                <ListGroup.Item className=" py-3" action href="">Business information <FaChevronRight /></ListGroup.Item>
            </ListGroup>
        </Card>
    );
};