import {NavLink} from "react-router-dom";

const Toolbar = () => {
    return (
        <nav className="navbar navbar-dark bg-secondary mb-5 pt-3 pb-3">
            <div className="container">
                <NavLink to="/" className="navbar-brand">
                    Calories tracker
                </NavLink>
            </div>
        </nav>
    );
};

export default Toolbar;