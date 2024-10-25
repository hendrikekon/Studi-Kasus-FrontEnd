import React, { useEffect, useState } from 'react';
import './index.css';
import Profile from '../../components/Profile';
import Address from '../../components/Address';
import AddAddress from '../../components/AddAddress';
import Logout from '../../components/Logout';
import Order from '../../components/Order';
import { useLocation } from 'react-router-dom';


const Account = ({ setIsLoggedIn }) => {
    const location = useLocation();
    const [selectedAction, setSelectedAction] = useState('Profile');


    useEffect(() => {
        if (location.state && location.state.selectedAction) {
            setSelectedAction(location.state.selectedAction);
        }
    }, [location.state]);
    
    const handleAddressAdded = () => {
        setSelectedAction('Address');
    };

    const renderContent = ()=>{
        switch(selectedAction){
            case 'Profile':
                return <Profile />
                // return <div>Profile Content</div>;
            case 'Order':
                return <Order/>
            case 'Address':
                return <Address onAddAddressClick={() => setSelectedAction('Add Address')}/>
                // return <div>Change Address Content</div>;
            case 'Add Address':
                return <AddAddress onAddressAdded={handleAddressAdded}/>
                // return <div>Add Address</div>;
            case 'Logout':
                return <Logout setIsLoggedIn={setIsLoggedIn} />
                // return <div>Logout Content</div>;
            default:
                return <Profile />
                // return <div>Profile Content</div>;
        }
    }

    return(
        <div className='account-container'>
            <div className='account-group'>
                <p>Account</p>
                <div className='account-list' onClick={() => setSelectedAction('Profile')}>
                    Profile
                </div>
                <div className='account-list' onClick={() => setSelectedAction('Order')}>
                    Pemesanan
                </div>
                <div className='account-list' onClick={() => setSelectedAction('Address')}>
                    Address
                </div>
                <div className='account-list' onClick={() => setSelectedAction('Logout')}>
                    Logout
                </div>
            </div>
            <div className='account-action'>
                {renderContent()}
            </div>
            {/* <p>Halaman Account</p> */}
        </div>
    )
};

export default Account