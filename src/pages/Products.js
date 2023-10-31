import React, { useState } from 'react'
import Header from './components/Header'
import useFetch from '../hooks/useFetch';
import ProductBox from './components/ProductBox';
import Spinner from './components/Spinner';
import Style from './Product.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Breadcrumb from './components/Breadcrumb';
import { useAuth } from '../hooks/Auth';

const Products = () => {
    const endpoint = "product";
    const auth = useAuth();
    const { data, isLoading, error, refetch } = useFetch(endpoint);


    return (
        <>
            <Header />
            {auth.isLoggedIn ? <Breadcrumb /> : null}
            <section className={`${Style.productContainer}`}>
                <div className={`${Style.sidebar}`}>
                    <p className={Style.textCenter}>

                    </p>
                </div>
                <div className={`${Style.products}`}>
                    {isLoading ? <Spinner /> : (
                        <div className='columns' style={{ width: '100%', flexWrap: 'wrap' }}>
                            {data.product ? (
                                <>
                                    {data.product.map((product, index) => (
                                        <ProductBox key={index} data={product} />
                                    ))}
                                </>
                            ) : null}
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default Products