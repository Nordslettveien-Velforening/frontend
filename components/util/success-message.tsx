import React from "react";

const SuccessMessage = ({text, children}: {text: string, children?: React.Component}) => (
    <div style={{color: "green"}}>
        <p>{text}</p>
        {children}
    </div>
);

export default SuccessMessage;
