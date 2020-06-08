import React from "react";

const SuccessMessage = ({text, children}) => (
    <div style={{color: "green"}}>
        <p>{text}</p>
        {children}
    </div>
);

export default SuccessMessage;
