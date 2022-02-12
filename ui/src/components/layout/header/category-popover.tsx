import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    OverlayTrigger,
    Popover,
    Button,
} from 'react-bootstrap';
import { useAxios } from '../../../services';
import { ActionTypes, useAppContext } from '../../../contexts';
import { Category } from '../../../types';

export const CategoryPopover: React.FC = (): React.ReactElement => {
    const [popularCategories, setPopularCategories] = useState<Category[]>([]);
    const { dispatch } = useAppContext();
    const [otherCategories, setOtherCategories] = useState<Category[]>([]);
    const [{ data }, execute] = useAxios({
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
                        overlay={
                            <Popover className="head-cat" id={`popover-positioned-bottom`}>
                                <Popover.Body className="px-5 shadow d-flex flex-wrap">
                                    <div className='p-3 text-center'>
                                        <ul>
                                            <div className='row'>
                                                <div className="col pe-0">
                                                    <img width="24" height="24" src={category?.icon?.url || "https://dummyimage.com/100/007bff/efefef"} />
                                                </div>
                                                <div className="col">
                                                    {category.subCategories.map((subCategory: any) =>
                                                        <li key={subCategory?.id}>
                                                            <Link to={`/product-listing/${subCategory?.id}`}>
                                                                {subCategory?.name}
                                                            </Link>
                                                        </li>
                                                    )}
                                                </div>
                                            </div>
                                        </ul>
                                    </div>
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <Button className="bg-dark border-dark">{category?.name}</Button>
                    </OverlayTrigger>
                )
            })}
            {!!otherCategories.length && (
                <OverlayTrigger
                    key='bottom'
                    placement='bottom-end'
                    trigger="click"
                    overlay={
                        <Popover className="head-cat" id={`popover-positioned-bottom`}>
                            <Popover.Body className="px-5 shadow d-flex flex-wrap">
                                {otherCategories.map((category: Category) =>
                                    <div className='p-3 text-center' key={category?.id}>
                                        <ul>
                                            <div className='row'>
                                                <div className="col col-md-2 pe-0">
                                                    <img width="24" height="24" src={category?.icon?.url || "https://dummyimage.com/100/007bff/efefef"} />
                                                </div>
                                                <div className="col col-md-10">
                                                    <h3 className="text-center">{category?.name}</h3>
                                                    {category.subCategories.map((subCategory: any) =>
                                                        <li key={subCategory?.id}>
                                                            <Link to="">{subCategory?.name}</Link>
                                                        </li>
                                                    )}
                                                </div>
                                            </div>
                                        </ul>
                                    </div>
                                )}
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <Button className="bg-dark border-dark">Others</Button>
                </OverlayTrigger>
            )}
        </>
    );
}
