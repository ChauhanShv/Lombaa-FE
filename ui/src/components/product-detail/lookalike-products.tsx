import React, { useEffect, useState } from 'react';
import { useAxios } from '../../services';
import { ProductCard } from '../product-card';

export const LookalikeProducts: React.FC = (): React.ReactElement => {
    const [lookalikeProducts, setLookalikeProducts] = useState<any[]>();
    const [{ data, loading, error }, execute] = useAxios({
        url: '',
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
        if (data?.success) {
            setLookalikeProducts(data?.response);
        }
    }, [data]);

    return (
        <>
            { }
        </>
    );
}