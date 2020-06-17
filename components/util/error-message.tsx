import React from "react";

const ErrorMessage = ({text, children}: {text: string, children?: React.Component}) => (
    <div style={{color: "red"}}>
        <p>{text}</p>
        {children}
    </div>
);

export default ErrorMessage;
