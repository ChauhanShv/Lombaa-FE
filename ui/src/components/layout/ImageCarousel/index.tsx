import React from 'react';

export const ImageCarousel:React.FC = ():React.ReactElement => {
    return (
        <>
            <div className="col-lg-9 col-xs-12 mx-auto">
            <div id="carousel-thumb" className="carousel slide carousel-fade carousel-thumbnails mb-5" data-ride="carousel">
             //Slides
             <div className="carousel-inner" role="listbox">
               <div className="carousel-item active">
                 <img className="d-block w-100" src="images/slide.png" alt="First slide" />
               </div>
               <div className="carousel-item">
                 <img className="d-block w-100" src="images/slide2.png" alt="Second slide" />
               </div>
               <div className="carousel-item">
                 <img className="d-block w-100" src="images/slide.png" alt="Third slide" />
               </div>
             </div>
             // Slides
             // Controls
             <a className="carousel-control-prev" href="#carousel-thumb" role="button" data-slide="prev">
               <span className="carousel-control-prev-icon" aria-hidden="true"></span>
               <span className="sr-only">Previous</span>
             </a>
             <a className="carousel-control-next" href="#carousel-thumb" role="button" data-slide="next">
               <span className="carousel-control-next-icon" aria-hidden="true"></span>
               <span className="sr-only">Next</span>
             </a>
             //Controls
             <ol className="carousel-indicators">
                <li data-target="#carousel-thumb" data-slide-to="0" className="active"> 
                    <img className="d-block w-100 img-fluid" src="images/slide.png" />
                </li>
                <li data-target="#carousel-thumb" data-slide-to="1">
                    <img className="d-block w-100 img-fluid" src="images/slide2.png" />
                </li>
                <li data-target="#carousel-thumb" data-slide-to="2">
                    <img className="d-block w-100 img-fluid" src="images/slide.png" />
                </li>
             </ol>
           </div>



            <div className="row post-list">
                <div className="col-12 col-md-4 mb-3 ">
                    <a href="#" className="ad-post bg-primary p-3 rounded text-white d-flex align-items-center justify-content-center flex-wrap  text-center">
                        <p><i className="fas fa-plus-circle"></i></p>
                        <h6>Want to see your stuff here ?</h6>
                        <p>Sell things in your community. It's quick safe and local.</p>
                        <p>
                            <button className="btn btn-success">Post an Ad for free!</button>
                        </p>
                    </a>
                </div>
                <div className="col-6 col-md-4 mb-3">
                    <div className="card">
                        <a href="#">
                            <img className="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ee8417f0ea2a50d53a12665820b54e23" />
                            <div className="d-flex justify-content-between p-3 position-absolute saved-wrap">
                                <small className="text-white">Today</small>
                                <button className="saved" id="fav"><i id="saved" className="far fa-heart"></i></button>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title text-success">Special title treatment</h4>
                                <p className="card-text"><strong>With supporting text below as a natural lead-in...</strong></p>
                                <p className="text-muted">Ashanti, Greater Accra lorelpsum...</p>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="col-6 col-md-4 mb-3">
                    <div className="card">
                        <a>
                            <img className="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ee8417f0ea2a50d53a12665820b54e23" />
                            <div className="d-flex justify-content-between p-3 position-absolute saved-wrap">
                                <small className="text-white">Today</small>
                                <button className="saved" id="fav"><i id="saved" className="far fa-heart"></i></button>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title text-success">Special title treatment</h4>
                                <p className="card-text"><strong>With supporting text below as a natural lead-in...</strong></p>
                                <p className="text-muted">Ashanti, Greater Accra lorelpsum...</p>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="col-6 col-md-4 mb-3">
                    <div className="card">
                    <a>
                        <img className="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ee8417f0ea2a50d53a12665820b54e23" />
                        <div className="d-flex justify-content-between p-3 position-absolute saved-wrap">
                            <small className="text-white">Today</small>
                            <button className="saved" id="fav"><i id="saved" className="far fa-heart"></i></button>
                        </div>
                        <div className="card-body">
                            <h4 className="card-title text-success">Special title treatment</h4>
                            <p className="card-text"><strong>With supporting text below as a natural lead-in...</strong></p>
                            <p className="text-muted">Ashanti, Greater Accra lorelpsum...</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        </div>
        </>
    );
};
