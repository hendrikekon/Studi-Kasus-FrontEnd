import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchAddresses } from '../../app/features/Address/actions';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';

const SelectAddress = () => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const addresses = useSelector(state => state.address.deliveryAddress || []);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchAddresses());
        };
        fetchData();
    }, [dispatch]);

    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
    };

    const onConfirmAddress = () => {
        if (!selectedAddress) {
            alert('Please select an address.');
            return;
        }
        navigate('/checkout', { state: { address: selectedAddress } });
    };

    return (
        <div className='select-address-container'>
            <div className='select-address-group1'>
                <div className='select-address-list'>
                    <NavLink to={'/cart'}>Kembali</NavLink>
                </div>
                <div className='select-address-list'>
                    <NavLink to={'/account'} state={{ selectedAction: 'Add Address' }}>Tambah Alamat</NavLink>
                </div>
            </div>
            <div className='select-address-group2'>
                <h3 className='select-address-title'>Select Address</h3>
                {addresses.length > 0 ? (
                    <ul className='select-address-ul'>
                        {addresses.map((address) => (
                            <li key={address._id} className='select-address-li'>
                                <label className='select-address-label'>
                                    <input 
                                        className='radio-address'
                                        type="radio" 
                                        name="address" 
                                        onChange={() => handleSelectAddress(address)} 
                                    />
                                    {`${address.nama}, ${address.kelurahan}, ${address.kecamatan}, ${address.kabupaten}, ${address.provinsi}`}
                                </label>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='p-no-address'>No addresses found. Please add one.</p>
                )}
                <button onClick={onConfirmAddress} className='btn-select-address'>
                    Confirm Address
                </button>
            </div>
            
        </div>
    );
};

export default SelectAddress;
