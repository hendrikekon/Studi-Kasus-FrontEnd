import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../../app/api/order';
// import { clearItem } from '../../app/features/Carts/actions';
import { CLEAR_ITEM } from '../../app/features/Carts/constants';
import './index.css';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const cartItems = useSelector((state) => state.cart);
    const userToken = useSelector((state) => state.auth.token);
    const [deliveryFee, setDeliveryFee] = useState(10000);
    const [selectedService, setSelectedService] = useState('rekomendasi');
    const selectedAddress = location.state?.address;

    console.log(userToken)

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            alert('Please select a delivery address.');
            return;
        }

        try {
            const orderData = {
                delivery_fee: deliveryFee,
                delivery_address: selectedAddress._id,
            };
            const response = await createOrder(orderData);
            console.log('saved succesfully', response.data)
            dispatch({ type: CLEAR_ITEM });

            navigate('/invoices', {state: {orderId: response.data._id}});
            
        } catch (error) {
            console.error('Error placing order', error);
        }
    };

    const handleDeliveryChange = (event) => {
        const service = event.target.value;
        setSelectedService(service);
        
        const deliveryFees = {
            rekomendasi: 10000,
            jnt: 12000,
            jne: 13000,
            ninja: 15000,
            anteraja: 8000,
            sicepat: 9000,
        };

        setDeliveryFee(deliveryFees[service] || 10000);
    };

    return (
        <div className='order-container'>
            <div className='order-group'>
                <div className='order-select-address-list'>
                    <NavLink to={'/selectaddress'}>Kembali</NavLink>
                </div>
            </div>
            <div className='order-group'>
                <h2 className='order-title'>Order Summary</h2>
                    <div className='order-list'>
                        {cartItems.map((item) => (
                            <div key={item._id}>
                                <p>{item.name} x {item.qty}</p>
                                <p>Price: Rp. {item.price*item.qty}</p>
                            </div>
                        ))}
                    </div>
                    <p className='order-list-price'>Total Price: Rp. {cartItems.reduce((total, item) => total + item.price * item.qty, 0)}</p>

                    <h3 className='order-delivery-tittle'>Delivery Information</h3>
                    {selectedAddress ? (
                        <div className='order-address-selected'>
                            <p><strong>Recipient Name:</strong> {selectedAddress.nama}</p>
                            <p>{selectedAddress.kelurahan}, {selectedAddress.kecamatan}, {selectedAddress.kabupaten}, {selectedAddress.provinsi}</p>
                            <p><strong>Detail:</strong> {selectedAddress.detail}</p>
                        </div>
                    ) : (
                        <p className='order-noaddress-selected'>No address selected.</p>
                    )}

                    <h3 className='order-delivery-fee'>Delivery Fee: Rp. {deliveryFee}</h3>
                    <select onChange={handleDeliveryChange} value={selectedService} className='order-select-delivery'>
                        <option value="rekomendasi">Rekomendasi</option>
                        <option value="jnt">J&T</option>
                        <option value="jne">JNE</option>
                        <option value="ninja">Ninja Express</option>
                        <option value="anteraja">AnterAja</option>
                        <option value="sicepat">SiCepat</option>
                    </select>

                    <h3 className='order-total-Price'>
                        <strong>Total Order Price:</strong>
                        Rp. {cartItems.reduce((total, item) => total + item.price * item.qty, 0) + deliveryFee}
                    </h3>

                    <button onClick={handlePlaceOrder} className='btn-order'>Place Order</button>
                </div>
            </div>
            
    );
};

export default Checkout;
