import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import FirstSlide from '../../../../../html/images/slide.png';
import SecondSlide from '../../../../../html/images/slide2.png';

export const ImageCarousel:React.FC = ():React.ReactElement => {
    return (
      <Row>
        <Col className="mx-auto mt-5">
            <div id="carousel-thumb" className="carousel slide carousel-fade carousel-thumbnails mb-5" data-ride="carousel">
            {/* Slides */}
            <div className="carousel-inner" role="listbox">
              <div className="carousel-item active">
                <img className="d-block w-100" src={FirstSlide} alt="First slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={SecondSlide} alt="Second slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={FirstSlide} alt="Third slide" />
              </div>
            </div>
            {/* // Slides
            Controls */}
            <a className="carousel-control-prev" href="#carousel-thumb" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only"></span>
            </a>
            <a className="carousel-control-next" href="#carousel-thumb" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only"></span>
            </a>
            {/* Controls */}
            <ol className="carousel-indicators">
                <li data-target="#carousel-thumb" data-slide-to="0" className="active"> 
                    <img className="d-block w-100 img-fluid" src={FirstSlide} />
                </li>
                <li data-target="#carousel-thumb" data-slide-to="1">
                    <img className="d-block w-100 img-fluid" src={SecondSlide} />
                </li>
                <li data-target="#carousel-thumb" data-slide-to="2">
                    <img className="d-block w-100 img-fluid" src={FirstSlide} />
                </li>
            </ol>
          </div>
        </Col>
      </Row>
    );
};
