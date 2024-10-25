import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getInvoiceByOrder } from '../../app/api/order';
import './index.css';


const Invoices = () => {
    const location = useLocation();
    const orderId = location.state?.orderId;
    const [invoiceData, setInvoiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvoice = async () => {
            if (!orderId) {
                setError('Order ID is missing.');
                setLoading(false);
                return;
            }

            try {
                const response = await getInvoiceByOrder(orderId);
                setInvoiceData(response.data); // Set the invoice data
                setLoading(false);
            } catch (err) {
                console.error('Error fetching invoice:', err);
                setError('Failed to fetch invoice data.');
                setLoading(false);
            }
        };

        fetchInvoice();
    }, [orderId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className='invoices-container'>
            <h3><strong>Invoices</strong></h3>
            <div className='invoices-group'>
                <div className='invoices-list'>
                    <p className='invoices-label'>Status:</p>
                    <p className='invoices-info'>{invoiceData.payment_status}</p>
                </div>
                <div className='invoices-list'>
                    <p className='invoices-label'>Invoices ID:</p>
                    <p className='invoices-info'>{invoiceData._id}</p>
                </div>
                <div className='invoices-list'>
                    <p className='invoices-label'>Total Price:</p>
                    <p className='invoices-info'>Rp. {invoiceData.total}</p>
                </div>
                <div className='invoices-list'>
                    <p className='invoices-label'>Billed to:</p>
                    <div className='invoices-info-group'>
                        <p className='invoices-info'>{invoiceData.user.full_name}</p>
                        <p className='invoices-info'>{invoiceData.user.email}</p>
                    </div>
                </div>
                <div className='invoices-list'>
                    <p className='invoices-label'>Delivery Address:</p>
                    <div className='invoices-info-group'>
                        <p className='invoices-info'>{invoiceData.delivery_address.detail}</p>
                        <p className='invoices-info'>{invoiceData.delivery_address.kelurahan}, {invoiceData.delivery_address.kecamatan}, {invoiceData.delivery_address.kabupaten}, {invoiceData.delivery_address.provinsi}</p>
                    </div>
                    
                </div>
                <div className='invoices-list'>
                    <p className='invoices-label'>Payment to:</p>
                    <div className='invoices-info-group'>
                        <p className='invoices-info'>Hendrik Eko N</p>
                        <p className='invoices-info'>Email: hendrik25@gmail.com</p>
                        <p className='invoices-info'>Bank: BCA</p>
                        <p className='invoices-info'>Account Number: xxxx-xxxx-xxxx-888-94</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoices;
