import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    OverlayTrigger,
    Popover,
    Button,
} from 'react-bootstrap';
import { useAxios } from '../../../services';
import { Categories } from '../../create-post';

export const CategoryPopover: React.FC = (): React.ReactElement => {
    const [categories, setCategories] = useState<Categories[]>([]);
    const [{ data, loading }, execute] = useAxios({
        url: '/category',
        method: 'GET',
    });

    useEffect(() => {
        execute();
    }, []);
    useEffect(() => {
        if (data?.code === 200) {
            setCategories(data.response);
        }
    }, [data]);

    return (
        <OverlayTrigger
            trigger="click"
            key='bottom'
            placement='bottom'
            overlay={
                <Popover className="head-cat" id={`popover-positioned-bottom`}>
                    <Popover.Body className="px-5 shadow d-flex flex-wrap">
                        {categories.map((category: any, index: number) =>
                            <div className='p-3'>
                                <h4>{category?.name}</h4>
                                <ul>
                                    {category.subCategories.map((subCategory: any) =>
                                        <li><Link to="">{subCategory.name}</Link></li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </Popover.Body>
                </Popover>
            }
        >
            <Button className="bg-dark border-dark">Category</Button>
        </OverlayTrigger>
    );
}
