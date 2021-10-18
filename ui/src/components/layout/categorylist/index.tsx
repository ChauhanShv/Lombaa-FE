import React from 'react';

import './styles.css';

export const CategoryList: React.FC = (): React.ReactElement => {
    return (
        <>
            <section className="d-md-block d-lg-none">
                <h2 className="fs-6 px-3 pt-2 m-0 d-flex justify-content-between align-items-center">Browse Categories <a href="#" className="btn">See All</a></h2>
                <div className="mobcat-slider">
                    <div>
                        <a href="#" className="btn btn-light d-flex justify-content-center align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="w-100"><img width="40" className="m-0 mx-auto" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                            <span className="text-center w-100">Category <br/> <strong className="w-100 text-left">72,546</strong></span>
                        </a>
                    </div>
                    <div>
                        <a href="#" className="btn btn-light d-flex justify-content-center align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="w-100"><img width="40" className="m-0 mx-auto" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                            <span className="text-center w-100">Category <br/> <strong className="w-100 text-left">72,546</strong></span>
                        </a>
                    </div>
                    <div>
                        <a href="#" className="btn btn-light d-flex justify-content-center align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="w-100"><img width="40" className="m-0 mx-auto" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                            <span className="text-center w-100">Category <br/> <strong className="w-100 text-left">72,546</strong></span>
                        </a>
                    </div>
                    <div>
                        <a href="#" className="btn btn-light d-flex justify-content-center align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="w-100"><img width="40" className="m-0 mx-auto" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                            <span className="text-center w-100">Category <br/> <strong className="w-100 text-left">72,546</strong></span>
                        </a>
                    </div>
                    <div>
                        <a href="#" className="btn btn-light d-flex justify-content-center align-items-center flex-wrap" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="w-100"><img width="40" className="m-0 mx-auto" src=" https://dummyimage.com/100/007bff/efefef" /></span>
                            <span className="text-center w-100">Category <br/> <strong className="w-100 text-left">72,546</strong></span>
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};