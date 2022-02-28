import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    OverlayTrigger,
    Popover,
    Button,
    Row,
    Col,
} from 'react-bootstrap';
import { useAxios } from '../../../services';
import { ActionTypes, useAppContext } from '../../../contexts';
import { Category } from '../../../types';
import './header.css';

export const CategoryPopover: React.FC = (): React.ReactElement => {
    const { dispatch } = useAppContext();
    const [popularCategories, setPopularCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [otherCategories, setOtherCategories] = useState<Category[]>([]);
    const [{ data }] = useAxios({
        url: '/category',
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
        const { code, response = [] } = data || {};
        if (code === 200) {
            dispatch({
                type: ActionTypes.CATEGORIES,
                payload: {
                    category: data?.response,
                }
            })
            const popularCat: Category[] = [];
            const otherCat: Category[] = [];
            response.map((item: Category) => {
                if (item.subCategories.length) {
                    if (popularCat.length < 6) {
                        popularCat.push(item);
                    } else {
                        otherCat.push(item);
                    }
                }
            });
            setPopularCategories(popularCat);
            setOtherCategories(otherCat);
        }
    }, [data]);

    return (
        <>
            {popularCategories.map((category: Category) => {
                return (
                    <OverlayTrigger
                        key={category?.id}
                        trigger={['click']}
                        placement='bottom-start'
                        transition={true}
                        rootClose
                        show={selectedCategory === category.id}
                        onToggle={(nextShow) => {
                            if (!nextShow) {
                                setSelectedCategory('');
                            }
                        }}
                        overlay={
                            <Popover className="head-cat" id={`popover-positioned-bottom`} onMouseLeave={() => setSelectedCategory('')}>
                                <Popover.Body className="px-3 container d-flex flex-wrap">
                                    <Row className='w-100'>
                                        <Col md={3} className="py-3 text-center">
                                            <Row className="w-100">
                                                <Col md={2} className="pe-0">
                                                    <img width="24" height="24" src={category?.icon?.url || "https://dummyimage.com/100/007bff/efefef"} />
                                                </Col>
                                                <Col md={10} className="text-start">
                                                    <ul>
                                                        {category.subCategories.map((subCategory: any) =>
                                                            <li key={subCategory?.id}>
                                                                <Link to={`/product-listing/${subCategory?.id}`} onClick={() => setSelectedCategory('')}>
                                                                    {subCategory?.name}
                                                                </Link>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <Button
                            className="bg-dark border-dark"
                            onClick={() => setSelectedCategory(category.id)}
                            onMouseEnter={() => setSelectedCategory(category.id)}
                        >
                            {category?.name}
                        </Button>
                    </OverlayTrigger>
                )
            })}
            {!!otherCategories.length && (
                <OverlayTrigger
                    key='bottom'
                    placement='bottom-end'
                    trigger={['click']}
                    show={selectedCategory === 'other'}
                    onToggle={(nextShow) => {
                        if (!nextShow) {
                            setSelectedCategory('');
                        }
                    }}
                    overlay={
                        <Popover className="head-cat" id={`popover-positioned-bottom`} onMouseLeave={() => setSelectedCategory('')}>
                            <Popover.Body className="px-3 container d-flex flex-wrap">
                                <Col className="w-100">
                                    <Row md={3} className="py-3">
                                        {otherCategories.map((category: Category) =>
                                            <ul>
                                                <Row>
                                                    <Col md={2} className="pe-0">
                                                        <img width="24" height="24" src={category?.icon?.url || "https://dummyimage.com/100/007bff/efefef"} />
                                                    </Col>
                                                    <Col md={10}>
                                                        <h4 className="">{category?.name}</h4>
                                                        {category.subCategories.map((subCategory: any) =>
                                                            <li key={subCategory?.id}>
                                                                <Link to={`/product-listing/${subCategory?.id}`} onClick={() => setSelectedCategory('')}>{subCategory?.name}</Link>
                                                            </li>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </ul>
                                        )}
                                    </Row>
                                </Col>
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <Button
                        className="bg-dark border-dark"
                        onClick={() => setSelectedCategory('other')}
                        onMouseEnter={() => setSelectedCategory('other')}
                    >
                        Others
                    </Button>
                </OverlayTrigger>
            )}
        </>
    );
}
