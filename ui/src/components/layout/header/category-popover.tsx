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
    const [{ data }, execute] = useAxios({
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
        <>
            {categories.map((category: any) =>
                <OverlayTrigger
                    key='bottom'
                    placement='bottom-end'
                    trigger='hover'
                    overlay={
                        <Popover className="head-cat" id={`popover-positioned-bottom`}>
                            <Popover.Body className="px-5 shadow d-flex flex-wrap">
                                <div className='p-3' key={category?.id}>
                                    <ul>
                                        {category.subCategories.map((subCategory: any) =>
                                            <li key={subCategory?.id}>
                                                <Link to="">{subCategory?.name}</Link>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <Button className="bg-dark border-dark">{category?.name}</Button>
                </OverlayTrigger>
            )}
        </>
    );
}
