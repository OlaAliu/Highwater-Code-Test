import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from './components/Header';
import Style from './Product.module.css';
import useFetch from '../hooks/useFetch';
import Spinner from './components/Spinner';
import { useHook } from '../hooks/Hook';
import CheckoutForm from './purchase/CheckoutForm';
import Layout from './purchase/Layout';

const Purchase = () => {
    const params = useParams();
    const hook = useHook();
    const navigate = useNavigate();
    const endpoint = `product/${params.id}`;
    const { data, isLoading, error, refetch } = useFetch(endpoint);

    return (
        <>
            <Header type={'checkout'} />
            {isLoading ? <Spinner /> : (
                <div className='columns' style={{ width: '100%', flexWrap: 'wrap' }}>
                    {data.single_product ? (
                        <section className={Style.checkoutSection}>
                            <div className={`${Style.columns} columns`}>
                                <div className='column'>
                                    <div className='box'>
                                        <Layout >
                                            <CheckoutForm
                                                price={data.single_product.price}
                                                type={data.single_product.type}
                                                onSuccessfulCheckout={() => navigate("/dashboard")}
                                            />
                                        </Layout>
                                    </div>
                                </div>
                                <div className='column is-4'>
                                    <div className='box'>
                                        <h4>
                                            Order Summary
                                        </h4>
                                        <hr />
                                        <div className='card-body'>
                                            <article class="media">
                                                <div class="media-left">
                                                    <figure class="image is-128x128">
                                                        <img src={`${hook.api}${data.single_product.image}`} />
                                                    </figure>
                                                </div>
                                                <div class="media-content">
                                                    <div class="content">
                                                        <p>
                                                            <strong>{data.single_product.name}</strong>
                                                            <br />
                                                            <small>$ {data.single_product.price}</small>
                                                            <br />
                                                            <span>
                                                                {data.single_product.type} product
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ) : null}
                </div>)}
        </>
    )
}

export default Purchase