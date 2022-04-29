import React from "react";

const Footer =({
    ...otherProps
}) => {
    return(
        <footer className="bg-white">
            <div className="w-full max-w-6xl mx-auto py-9 px-2.5">
                <span className="text-base">
                copyright <i className="fa fa-copyright" aria-hidden="true" /> 2022
                </span>
            </div>
        </footer>
    );
};

export default Footer;