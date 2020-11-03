import * as React from 'react';
import { ReactChildren } from "react";
import styles from "./accordion.module.scss"
import classnames from "classnames";

type AccordionSectionProps = {
    title: string,
    id: string,
    isOpen: boolean,
    onClick: (slug: string) => void,
    children: ReactChildren,
};

const AccordionSection = ({ title, id, isOpen, onClick, children}: AccordionSectionProps) => {

    const handleClick = e => {
        e.preventDefault();
        onClick(id)
    }

    return (
        <div className={classnames( styles["accordion-section"], { [styles["accordion-section--open"]]: isOpen })}>
            <a className={styles["accordion-section__title"]} id={id} onClick={handleClick}>{title}</a>
            <div className={styles["accordion-section__body"]}>
                {children}
            </div>
        </div>
    );
};

export default AccordionSection;
