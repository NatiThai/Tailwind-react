import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ManinLayout = props => {
    return(
        <div className="min-h-full bg-gray-50 font-body">
            <div className="h-screen flex flex-col">
            <Header {...props} />
            <div className="main">
                {props.children}
            </div>
            <Footer />
        </div>
        </div>
    );
};

export default ManinLayout;