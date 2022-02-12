import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';
import { Loader } from '..';
import { TabContentProps, ProductTabListProps, Product } from './types';
import { ProfileProductTile } from '.';

export const EmptyTabContent: React.FC<TabContentProps> = ({
    tabTitle
}: TabContentProps): React.ReactElement => {
    return (
        <div style={{ textAlign: 'center' }} className="pt-15 pb-15">
            <img width="40%" src="/images/placeholder-image.jpg" className='text-center mt-3' />
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
    loading,
    listingTabName,
}: ProductTabListProps): React.ReactElement => {
    return (
        <Row className="row">
            {loading ? <Loader show={loading} /> : (productList && !!productList.length) ? productList.map((product: Product) =>
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
                />
            ) : (
                <EmptyTabContent tabTitle={listingTabName} />
            )}
        </Row>
    );
}