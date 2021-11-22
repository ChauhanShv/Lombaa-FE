import { Link } from 'react-router-dom';
import {
    OverlayTrigger,
    Popover,
} from 'react-bootstrap';

export const CategoryPopover: React.FC = (): React.ReactElement => {
    return (
        <OverlayTrigger
            trigger="click"
            key='bottom'
            placement='bottom'
            overlay={
                <Popover className="head-cat" id={`popover-positioned-bottom`}>
                    <Popover.Body className="px-5 shadow d-flex justify-content-between flex-wrap">
                        <div className="p-3">
                            <h4>Cars</h4>
                            <ul>
                                <li><Link to="">Used Cars</Link></li>
                                <li><Link to="">Parallel Imports</Link></li>
                                <li><Link to="">New Cars</Link></li>
                                <li><Link to="">Commercial Vehicles</Link></li>
                                <li><Link to="">Car Rental</Link></li>
                                <li><Link to="">Other Vehicles</Link></li>
                                <li><Link to="">Specials</Link></li>
                            </ul>
                        </div>
                        <div className="p-3">
                            <h4>Cars</h4>
                            <ul>
                                <li><Link to="">Used Cars</Link></li>
                                <li><Link to="">Parallel Imports</Link></li>
                                <li><Link to="">New Cars</Link></li>
                                <li><Link to="">Commercial Vehicles</Link></li>
                                <li><Link to="">Car Rental</Link></li>
                                <li><Link to="">Other Vehicles</Link></li>
                                <li><Link to="">Specials</Link></li>
                            </ul>
                        </div>
                        <div className="p-3">
                            <h4>Cars</h4>
                            <ul>
                                <li><Link to="">Used Cars</Link></li>
                                <li><Link to="">Parallel Imports</Link></li>
                                <li><Link to="">New Cars</Link></li>
                                <li><Link to="">Commercial Vehicles</Link></li>
                                <li><Link to="">Car Rental</Link></li>
                                <li><Link to="">Other Vehicles</Link></li>
                                <li><Link to="">Specials</Link></li>
                            </ul>
                        </div>
                        <div className="p-3">
                            <h4>Cars</h4>
                            <ul>
                                <li><Link to="">Used Cars</Link></li>
                                <li><Link to="">Parallel Imports</Link></li>
                                <li><Link to="">New Cars</Link></li>
                                <li><Link to="">Commercial Vehicles</Link></li>
                                <li><Link to="">Car Rental</Link></li>
                                <li><Link to="">Other Vehicles</Link></li>
                                <li><Link to="">Specials</Link></li>
                            </ul>
                        </div>
                        <div className="p-3">
                            <h4>Cars</h4>
                            <ul>
                                <li><Link to="">Used Cars</Link></li>
                                <li><Link to="">Parallel Imports</Link></li>
                                <li><Link to="">New Cars</Link></li>
                                <li><Link to="">Commercial Vehicles</Link></li>
                                <li><Link to="">Car Rental</Link></li>
                                <li><Link to="">Other Vehicles</Link></li>
                                <li><Link to="">Specials</Link></li>
                            </ul>
                        </div>
                    </Popover.Body>
                </Popover>
            }
        >
            <Link to="">Popover on bottom</Link>
        </OverlayTrigger>
    );
}