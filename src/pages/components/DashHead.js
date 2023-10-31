import React from 'react';
import Style from './Dashboard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DashHead = ({ title }) => {
    return (
        <>
            <div className={`${Style.headerBox}`}>
                <section>
                    <h3 className={Style.headerTitle}>
                        {title}
                    </h3>
                </section>
            </div>
        </>
    )
}

export default DashHead