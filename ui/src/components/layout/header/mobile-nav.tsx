import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import {
    FaCommentDots,
    FaList,
    FaHome,
    FaCamera,
    FaBars
} from 'react-icons/fa';

export const MobileNav: React.FC = (): React.ReactElement => {
    return (
        <Navbar className="mobile-fnav navbar navbar-dark bg-white d-flex justify-content-betweeen d-lg-none" fixed="bottom">
            <Link className="w-100 text-center" to="/">
                <FaHome /><br />
                Home
            </Link>
            <Link className="w-100 text-center" to="/profile">
                <FaList /><br />
                My Listing
            </Link>
            <Link className="w-100 text-center" to="/create-post">
                <FaCamera /><br />
                Sell
            </Link>
            <Link className="w-100 text-center" to="/chat/buy">
                <FaCommentDots /><br />
                Inbox
            </Link>
            <Link className="w-100 text-center" to="/settings">
                <FaBars /><br />
                Menu
            </Link>
        </Navbar>
    );
}