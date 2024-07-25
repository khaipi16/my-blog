import React, { useState } from "react";



const Months = ({ month, children }) => {
    const [extend, setExtend] = useState(false);

    const toggleExtend = () => {
        setExtend(!extend);
    };

    return (
        <div className={`month ${extend ? 'expanded' : ''}`}>
            <button className="btn btn-link month-title month-title" onClick={toggleExtend}>
                {month}
                {extend ? '-' : '+'}
            </button>
            {extend && children}
        </div>
        
    )
}

export default Months