import { memo } from "react";

import "./Header.css";
import Menu from "../../../../assets/icons/Menu";
import PropTypes from "prop-types";
const Header = memo(({ onClick }) => {
    return (
        <div className="header-wrapper">
            <div className="header-inner">
                <div className="header-menu-btn" onClick={onClick}>
                    <Menu />
                </div>
                <div className="header-logo">
                    HOSPITAL MANAGEMENT SYSTEM (HMS)
                </div>
            </div>
        </div>
    );
});

Header.propTypes = {
    onClick: PropTypes.func,
};
Header.displayName = "Header";

export default Header;
