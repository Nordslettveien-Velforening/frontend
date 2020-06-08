import React from "react";

const ErrorMessage = ({text, children}) => (
    <div style={{color: "red"}}>
        <p>{text}</p>
        {children}
    </div>
);

export default ErrorMessage;
