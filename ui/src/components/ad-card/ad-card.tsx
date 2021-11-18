import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ad-card.css';

export const AdCard: React.FC = (): React.ReactElement => {
    return (
        <>
            <div className="ad-card card">
                <Link to='/'>
                    <img className="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ee8417f0ea2a50d53a12665820b54e23" />
                    <div className="d-flex justify-content-between p-3 position-absolute saved-wrap">
                        <small className="text-white">Today</small>
                        <button className="saved" id="fav"><FaHeart /></button>
                    </div>
                    <div className="card-body">
                        <h4 className="card-title text-success">Special title treatment</h4>
                        <p className="card-text"><strong>With supporting text below as a natural lead-in...</strong></p>
                        <p className="text-muted">Ashanti, Greater Accra lorelpsum...</p>
                    </div>
                </Link>
                <Link to='/' className="p-0 ms-3 mb-3 usermeta">
                    <img className="rounded-circle me-2" width="30" height="30" src="/images/user-circle.svg" alt="Htmlstream" />
                    John Smith
                </Link>
            </div>
        </>
    );
};
