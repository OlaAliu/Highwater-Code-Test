import React from 'react';
import Style from './Dashboard.module.css'
import DashHead from './DashHead';

const Mainbox = () => {
    return (
        <section className={`${Style.mainBox}`}>
            <DashHead />
            <section>
                <div className="columns">
                    <div className={`${Style.counter} column is-3`}>
                        lol
                    </div>
                    <div className={`${Style.counter} column is-3`}>
                        lonely
                    </div>
                    <div className={`${Style.counter} column is-3`}>
                        alone
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Mainbox