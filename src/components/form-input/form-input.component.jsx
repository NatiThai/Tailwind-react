import React from "react";
import "./styles.scss";

const FormInput = ({ handleChange, lable, ...otherProps }) => (
    <div className="group">
        <input className="form-input" onChange={handleChange} {...otherProps} />
        {lable ? (
           <lable className={`${otherProps.value.length ? 'shrink' : ''} form-input-lable `}>
            </lable>
            ) : null} 
    </div>
);

export default FormInput