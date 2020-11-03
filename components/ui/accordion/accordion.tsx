import * as React from 'react';
import { ReactChildren, useState } from "react";
import AccordionSection from "./accordion-section";

const Accordion = ({ children }) => {

    const [openSections, setOpenSections] = useState({})

    const handleSectionClick = (id) => {
        console.log("Click on", id)
        const isOpen = !!openSections[id]
        setOpenSections({...openSections, [id]: !isOpen})
    }

    return (
        <div>
            { children.map(child => (
                <AccordionSection key={child.props.id} title={child.props.title} id={child.props.id} isOpen={!!openSections[child.props.id]} onClick={handleSectionClick}>
                    {child.props.children}
                </AccordionSection>
            ))}
        </div>
    );
};

export default Accordion;
