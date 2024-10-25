import React, { useEffect } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddresses } from '../../app/features/Address/actions';

const Address = ( {onAddAddressClick} ) => {
    const dispatch = useDispatch();
    // const addresses = useSelector(state => {
    //     console.log('Current state:', state);
    //     // return state.address.deliveryAddress.data || [];
    //     return state.address.deliveryAddress ? state.address.deliveryAddress : [];
    // });
    const addresses = useSelector(state => state.address.deliveryAddress || []);


    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchAddresses());
        };
        fetchData();

    },[dispatch])

    return(
        <div>
            <div>
            <button className='btn-add-address' onClick={ onAddAddressClick }>
                    Add Address
                </button>
            </div>
            <div>
                <p>Address</p>
                {addresses.length > 0 ? (
                    addresses.map(address => (
                        <div className='address-list' key={address._id}>
                            <p className='p-nama'><strong>{address.nama}</strong></p>
                            <p className='p-address'>{address.kelurahan}, {address.kecamatan}, {address.kabupaten}, {address.provinsi}</p>
                            <p className='p-detail'>{address.detail}</p>
                        </div>
                    ))
                ) : (
                    <p>No addresses found.</p>
                )}
            </div>
        </div>
    )
}

export default Address;