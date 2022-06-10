import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';
import { TabContentProps, ProductTabListProps, Product } from './types';
import { ProfileProductTile } from '.';
import { LinearProgress } from '@mui/material';

export const EmptyTabContent: React.FC<TabContentProps> = ({
    tabTitle
}: TabContentProps): React.ReactElement => {
    return (
        <div style={{ textAlign: 'center' }} className="pt-15 pb-15">
            <img width="30%" src="/images/no-products-placeholder.png" className='text-center mt-3' />
            <p className="tab-placeholder-text">
                {`We could not fetch anything for ${tabTitle} tab. There is no data available.`}
            </p>
            <Link to="create-post">
                <Button variant="success">Sell Your Item</Button>
            </Link>
        </div>
    );
}

export const ProductTabList: React.FC<ProductTabListProps> = ({
    productList,
    listingTabName,
    loading
}: ProductTabListProps): React.ReactElement => {

    const [productListing, setProductListing] = useState<Product[]>(productList);

    const handleProductItemDelete = (productId: string) => {
        const productToDelete: Product | undefined = productListing.find((product) => product?.id === productId);
        const newProductListing: Product[] = productListing;
        if (productToDelete) {
            newProductListing.splice(productListing.indexOf(productToDelete), 1);
            setProductListing([...newProductListing]);
        }
    };

    useEffect(() => {
        setProductListing(productList);
    }, [productList]);

    return (
        <Row className="row">
            {loading ? (
                <div className="p-2 py-4">
                    <LinearProgress />
                </div>
            ) : (productListing && !!productListing.length) ? productListing.map((product: Product) =>
                <ProfileProductTile
                    key={product.id}
                    productId={product.id}
                    slug={product.slug}
                    title={product.title}
                    summary={product.rejectReason ? product.rejectReason : ""}
                    description={product.description}
                    categoryName={product.category.name}
                    postedOnDate={moment(product.postedAt).format('LL')}
                    mediaSrc={
                        (product.productMedia?.find((media) => !!media.isPrimary)?.file?.url ||
                            product?.productMedia[0]?.file?.url) ||
                        '/images/placeholder-image.jpg'
                    }
                    isFavouritesTab={listingTabName === 'Favourites' ? true : false}
                    onDelete={handleProductItemDelete}
                />
            ) : (
                <EmptyTabContent tabTitle={listingTabName} />
            )}
        </Row>
    );
}