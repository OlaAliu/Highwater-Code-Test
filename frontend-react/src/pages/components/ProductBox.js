import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react';
import './header.css'
import { useNavigate } from 'react-router-dom';
import { useHook } from '../../hooks/Hook';

const ProductBox = ({ data }) => {
    const navigate = useNavigate();
    const hook = useHook();

    return (
        <div className='column is-4'>
            <div className="card">
                <div className="card-image">
                    <figure className="image is-fullwidth" style={{ padding: 30 }}>
                        <img src={`${hook.api}${data.image}`} alt={data.category} height={'75px'} />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4">{data.name.length > 18 ? `${data.name.substring(0, 18)}...` : data.name}</p>
                        </div>
                    </div>

                    <div className="content">
                        <FontAwesomeIcon icon="dollar-sign" /> {data.price}
                        <br />
                        <span>
                            Product Type: <strong>{data.type}</strong>
                        </span>
                        <br />
                        <button
                            className='coloredButton mt-5'
                            onClick={() => {
                                navigate(`/product/purchase/${data.id}`)
                            }}
                        >
                            Purchase
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductBox