import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../app/features/Auth/actions';
import './index.css'


const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.auth.user);

    useEffect(() =>{
        dispatch(fetchProfile())
    },[dispatch]);
    
    if(!profile) return <p>Loading...</p>;

    return(
        <div className='profile-container'>
            <p>Halaman Profile</p>
            <div className='profile-list'>
                <p><strong>Nama: </strong>{profile.full_name} </p>
            </div>
            <div className='profile-list'>
                <p><strong>Email: </strong>{profile.email} </p>
            </div>
        </div>
    )
}

export default Profile;