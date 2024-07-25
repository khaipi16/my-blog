import { useState } from "react";
import React from "react";


export const Year = ({ year, children }) => {
    const [extend, setExtend] = useState(false);

    const toggleExtend = () => {
        setExtend(!extend);
    };


    return (
        <div className={`year ${extend ? 'expanded' : ''}`}>
            <button className="btn btn-link year-title" onClick={toggleExtend}>
                {year}
                {extend ? '-' : '+'}
            </button>
            {extend && children}
        </div>

    );
};