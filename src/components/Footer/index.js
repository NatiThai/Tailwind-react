import React from "react";

const Footer =({
    ...otherProps
}) => {
    return(
        <Footer className="bg-white">
            <div>
                <span className="text-base">
                    <i class="fa fa-copyright" aria-hidden="true"></i>
                </span>
            </div>
        </Footer>
    );
};

export default Footer;