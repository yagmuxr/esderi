import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import PropTypes from "prop-types";  
import Search from "../Modals/Search/Search";
import { useState } from "react";

const MainLayout = ({ children }) => {
    const [isSearchShow, setIsSearchShow] = useState(false);

    return (
        <div className="main-layout">
            <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow} />
            <Header setIsSearchShow={setIsSearchShow} />
            {children}
            <Footer />
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node 
};

export default MainLayout;
