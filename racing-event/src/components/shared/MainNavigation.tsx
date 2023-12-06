import {Link} from 'react-router-dom';

const MainNavigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand text-danger custom-font ms-3 fs-4" to="/"><img style={{width: "80px"}} className="me-3" src="./images/shared/main-logo.png"/>F1 Race Event</Link>
                <button type="button" className="navbar-toggler me-3" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end me-5" id="navbarCollapse">
                    <ul className="navbar-nav ms-3">
                        <li className='nav-item'><Link className='nav-link' to="/">Hjem</Link></li>
                        <li className='nav-item'><Link className='nav-link' to="Drivers">Deltagere</Link></li>
                        <li className='nav-item'><Link className='nav-link' to="Game">Spill</Link></li>
                    </ul>
                </div>
        </nav>

    )
}

export default MainNavigation;