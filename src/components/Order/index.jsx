import React, { useEffect, useState, Fragment } from "react";
import { getOrders } from "../../app/api/order";
import './index.css';
import imgRightChevron from '../../assets/img/right-chevron.png';
import imgDownChevron from '../../assets/img/down-chevron.png';
import { useNavigate } from "react-router-dom";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [expandedOrderIds, setExpandedOrderIds] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=> {
        const fetchOrder = async() => {
            try {
                const response = await getOrders();
                setOrders(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrder();
    }, []);

    const toggleOrderDetails = (orderId) => {
        setExpandedOrderIds((prev) => 
            prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
        );
    };

    const calculateOrderTotal = (order) => {
        const totalItems = order.order_items.reduce((total, item) => total + (item.price * item.qty), 0);
        return totalItems + order.delivery_fee;
    };

    const handleInvoice = (order) =>{
        navigate('/invoices', {state: {orderId: order._id}});
    }

    return (
        <div className="order-container">
            <div className="order-group">
                <p><strong>Orders</strong></p>
                <div className="order-list">
                    <table className='order-table'>
                        <thead>
                            <tr>
                                <th className='order-header'></th>
                                <th className='order-header'>Order ID</th>
                                <th className='order-header'>Total</th>
                                <th className='order-header'>Status</th>
                                <th className='order-header'>Invoices</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <Fragment key={order._id}>
                                    <tr>
                                        <td className='order-info'>
                                            <button onClick={() => toggleOrderDetails(order._id)}>
                                                {expandedOrderIds.includes(order._id) ? 
                                                    <img src={imgDownChevron} alt="Down Chevron" className="img-chevron"></img> 
                                                    : <img src={imgRightChevron} alt="Right Chevron" className="img-chevron"></img> }
                                            </button>
                                        </td>
                                        <td className='order-info'>{order.order_number}</td>
                                        <td className='order-info'>{calculateOrderTotal(order)}</td>
                                        <td className='order-info'>{order.status}</td>
                                        <td className='order-info'>
                                            <button className="btn-order-invoices" onClick={() => handleInvoice(order)}>Invoices</button>
                                        </td>
                                    </tr>
                                    {expandedOrderIds.includes(order._id) && (
                                        <tr>
                                            <td colSpan="5">
                                                <table className='order-details-table'>
                                                    <thead>
                                                        <tr>
                                                            <th className='order-header'>Barang</th>
                                                            <th className='order-header'>Jumlah</th>
                                                            <th className='order-header'>Total Harga</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {order.order_items.map(item => (
                                                            <tr key={item._id}>
                                                                <td className='order-info'>{item.name}</td>
                                                                <td className='order-info'>{item.qty}</td>
                                                                <td className='order-info'>{item.price * item.qty}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Order;
