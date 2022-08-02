import React from "react";
import "./DropdownSelector.css"

const DropdownSelector = ({optionsConstants, changeOption, query}) => {
    return(
        <div className="dropdown-container">
            <select className="select" name="cars" id="cars" onChange={changeOption} value={query}>
                <option className="option" value="" disabled selected hidden>Select your news</option>
                {optionsConstants.map((option,key) => {
                        return ( <option key={key} className="option" value={option.value}>{option.placeholder}</option> );
                
                })}
            </select>
        </div>
    );
}

export default DropdownSelector;