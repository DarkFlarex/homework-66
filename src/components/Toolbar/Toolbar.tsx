import {NavLink} from "react-router-dom";

const Toolbar = () => {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">
                    Calories tracker
                </NavLink>

            </div>
        </nav>
    );
};

export default Toolbar;