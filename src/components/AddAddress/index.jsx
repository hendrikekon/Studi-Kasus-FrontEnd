import React, { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import config from '../../config';
import { createAddress } from '../../app/api/address';

const AddAddress = ({onAddressAdded}) => {
    const [nama, setNama] = useState('');
    const [provinsi, setProvinsi] = useState([]);
    const [selectedProvinsi, setSelectedProvinsi] = useState({ code: '', name: '' });
    const [kabupaten, setKabupaten] = useState([]);
    const [selectedKabupaten, setSelectedKabupaten] = useState({ code: '', name: '' });
    const [kecamatan, setKecamatan] = useState([]);
    const [selectedKecamatan, setSelectedKecamatan] = useState({ code: '', name: '' });
    const [kelurahan, setKelurahan] = useState([]);
    const [selectedKelurahan, setSelectedKelurahan] = useState({ code: '', name: '' });
    const [detail, setDetail] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccesMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    // Fetch provinsi
    useEffect(() => {
        const fetchProvinsi = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/api/addressProv`);
                console.log(response.data);
                if (Array.isArray(response.data.data)) {
                    setProvinsi(response.data.data);
                } else {
                    console.error('Data is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching provinsi:', error);
            }
        };

        fetchProvinsi();
    }, []);

    // Handle provinsi
    const handleProvinsiChange = (e) => {
        const selectedProvinsiCode = e.target.value;
        const selectedProvinsiObj = provinsi.find(province => province.code === selectedProvinsiCode);
        
        if (selectedProvinsiObj) {
            setSelectedProvinsi({
                code: selectedProvinsiObj.code,
                name: selectedProvinsiObj.name
            });

            // Hapus Selected Kabupaten, KEcamatan, Kelurahan ketika Provinsi Berubah
            setSelectedKabupaten({ code: '', name: '' });
            setSelectedKecamatan({ code: '', name: '' });
            setSelectedKelurahan({ code: '', name: '' });
        }
    };

    // Fetch kabupaten Ketika Provinsi telah dipilih
    useEffect(() => {
        if (selectedProvinsi.code) {
            const fetchKabupaten = async () => {
                try {
                    const response = await axios.get(`${config.apiBaseUrl}/api/addressKab/${selectedProvinsi.code}`);
                    console.log(response.data);
                    if (Array.isArray(response.data.data)) {
                        setKabupaten(response.data.data);
                    } else {
                        console.error('Data is not an array:', response.data);
                    }
                } catch (error) {
                    console.error('Error fetching kabupaten:', error);
                }
            };

            fetchKabupaten();
        }
    }, [selectedProvinsi.code]);

    // Handle kabupaten
    const handleKabupatenChange = (e) => {
        const selectedKabupatenCode = e.target.value;
        const selectedKabupatenObj = kabupaten.find(regency => regency.code === selectedKabupatenCode);
        
        if (selectedKabupatenObj) {
            setSelectedKabupaten({
                code: selectedKabupatenObj.code,
                name: selectedKabupatenObj.name
            });

            // Hapus Selected Kecamatan ketika Kabupaten Berubah
            setSelectedKecamatan({ code: '', name: '' });
            setSelectedKelurahan({ code: '', name: '' });
        }
    };

    // Fetch kecamatan Ketika kabupaten telah dipilih
    useEffect(() => {
        if (selectedKabupaten.code) {
            const fetchKecamatan = async () => {
                try {
                    const response = await axios.get(`${config.apiBaseUrl}/api/addressKec/${selectedKabupaten.code}`);
                    console.log(response.data);
                    if (Array.isArray(response.data.data)) {
                        setKecamatan(response.data.data);
                    } else {
                        console.error('Data is not an array:', response.data);
                    }
                } catch (error) {
                    console.error('Error fetching kecamatan:', error);
                }
            };

            fetchKecamatan();
        }
    }, [selectedKabupaten.code]);

    // Handle kecamatan
    const handleKecamatanChange = (e) => {
        const selectedKecamatanCode = e.target.value;
        const selectedKecamatanObj = kecamatan.find(districts => districts.code === selectedKecamatanCode);
        
        if (selectedKecamatanObj) {
            setSelectedKecamatan({
                code: selectedKecamatanObj.code,
                name: selectedKecamatanObj.name
            });
        }
        // Hapus Selected Kelurahan ketika kecamatan Berubah
        setSelectedKelurahan({ code: '', name: '' });
    };

    // Fetch kelurahan Ketika kecamatan telah dipilih
    useEffect(() => {
        if (selectedKecamatan.code) {
            const fetchKelurahan = async () => {
                try {
                    const response = await axios.get(`${config.apiBaseUrl}/api/addressKel/${selectedKecamatan.code}`);
                    console.log(response.data);
                    if (Array.isArray(response.data.data)) {
                        setKelurahan(response.data.data);
                    } else {
                        console.error('Data is not an array:', response.data);
                    }
                } catch (error) {
                    console.error('Error fetching kelurahan:', error);
                }
            };

            fetchKelurahan();
        }
    }, [selectedKecamatan.code]);

    // Handle kelurahan
    const handleKelurahanChange = (e) => {
        const selectedKelurahanCode = e.target.value;
        const selectedKelurahanObj = kelurahan.find(villages => villages.code === selectedKelurahanCode);
        
        if (selectedKelurahanObj) {
            setSelectedKelurahan({
                code: selectedKelurahanObj.code,
                name: selectedKelurahanObj.name
            });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!nama) {
          newErrors.nama = 'Nama Alamat tidak boleh kosong';
        }
        if (!selectedProvinsi.name) {
          newErrors.provinsi = 'Pilih Provinsi';
        }
        if (!selectedKabupaten.name) {
          newErrors.kabupaten = 'Pilih Kabupaten';
        }
        if (!selectedKecamatan.name) {
            newErrors.kecamatan = 'Pilih Kecamatan';
        }
        if (!selectedKelurahan.name) {
            newErrors.kelurahan = 'Pilih Kelurahan';
        }        
        return newErrors;
    };

    const confirmError = () => setSuccesMessage(false);

    // Handle Submit
    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors({});
        setSuccesMessage(false);
        setErrorMessage(false);
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
        const data = { 
            nama: nama,
            provinsi: `Prov.${selectedProvinsi.name}`,
            kabupaten: selectedKabupaten.name,
            kecamatan: `Kec.${selectedKecamatan.name}`,
            kelurahan: `Kel.${selectedKelurahan.name}`,
            detail: detail
        };
        try {
            const response = await createAddress(data);
            console.log('Registration Successful', response);
            // console.log('Nama:', `${nama}`);
            // console.log('Selected Province:', `Prov.${selectedProvinsi.name}`);
            // console.log('Selected Kabupaten:', `${selectedKabupaten.name}`);
            // console.log('Selected Kecamatan:', `Kec.${selectedKecamatan.name}`);
            // console.log('Selected Kelurahan:', `Kel.${selectedKelurahan.name}`);
            // console.log('Detail:', `${detail}`);
            setSuccesMessage(true);
        } catch (error) {
            setErrorMessage(true);
            console.error('Registration Failed', error);
            
        }
        
    };

    const navAddress = () => {
        if (onAddressAdded) {
            onAddressAdded();
        }
    };


    return (
        <div>
            {successMessage && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Alamat Ditambahkan</p>
                        <button onClick={navAddress} className="confirm-button">Ok</button>
                    </div>
                </div>
            )}
            {errorMessage && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Gagal tambah Alamat. silahkan coba lagi</p>
                        <button onClick={confirmError} className="cancel-button">Coba Lagi</button>
                    </div>
                </div>
            )}
            <form className='form-add-address' onSubmit={handleSubmit}>
                <div className='add-address-list'>
                    <label className='add-address-label'>Nama Alamat:</label>
                    <input className='add-address-input' value={nama} onChange={(e) => setNama(e.target.value)} type='text' placeholder='e.g Rumah etc.' required />
                    {errors.nama && <p className="error">{errors.nama}</p>}
                </div>
                <div className='add-address-list'>
                    <label className='add-address-label'>Provinsi:</label>
                    <select className='add-address-select' value={selectedProvinsi.code} onChange={handleProvinsiChange}>
                        <option value="">Select Province</option>
                        {provinsi.map(province => (
                            <option key={province.code} value={province.code}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                    {errors.provinsi && <p className="error">{errors.provinsi}</p>}
                </div>
                <div className='add-address-list'>
                    <label className='add-address-label'>Kabupaten:</label>
                    <select className='add-address-select' value={selectedKabupaten.code} onChange={handleKabupatenChange} disabled={!selectedProvinsi.code}>
                        <option value="">Select Kabupaten</option>
                        {kabupaten.map(regency => (
                            <option key={regency.code} value={regency.code}>
                                {regency.name}
                            </option>
                        ))}
                    </select>
                    {errors.kabupaten && <p className="error">{errors.kabupaten}</p>}
                </div>
                <div className='add-address-list'>
                    <label className='add-address-label'>Kecamatan:</label>
                    <select className='add-address-select' value={selectedKecamatan.code} onChange={handleKecamatanChange} disabled={!selectedKabupaten.code}>
                        <option value="">Select Kecamatan</option>
                        {kecamatan.map(districts => (
                            <option key={districts.code} value={districts.code}>
                                {districts.name}
                            </option>
                        ))}
                    </select>
                    {errors.kecamatan && <p className="error">{errors.kecamatan}</p>}
                </div>
                <div className='add-address-list'>
                    <label className='add-address-label'>Kelurahan:</label>
                    <select className='add-address-select' value={selectedKelurahan.code} onChange={handleKelurahanChange} disabled={!selectedKecamatan.code}>
                        <option value="">Select Kelurahan</option>
                        {kelurahan.map(villages => (
                            <option key={villages.code} value={villages.code}>
                                {villages.name}
                            </option>
                        ))}
                    </select>
                    {errors.kelurahan && <p className="error">{errors.kelurahan}</p>}
                </div>
                <div className='add-address-list'>
                    <label className='add-address-label'>Detail:</label>
                    <input className='add-address-input' value={detail} onChange={(e) => setDetail(e.target.value)} type='text' placeholder='e.g Jl.Mawar Rt.01 Rw.01 etc.' required />
                    {errors.detail && <p className="error">{errors.detail}</p>}
                </div>
                {/* <div className='add-address-list'>
                    <p><strong>Selected Province:</strong> {selectedProvinsi.name}</p>
                    <p><strong>Selected Kabupaten:</strong> {selectedKabupaten.name}</p>
                    <p><strong>Selected Kecamatan:</strong> {selectedKecamatan.name}</p>
                    <p><strong>Selected Kelurahan:</strong> {selectedKelurahan.name}</p>
                </div> */}
                <div className='add-address-list'>
                    <input className='btn-add-address' type="submit" value="Submit" />
                </div>
            </form>
        </div>
        
    );
};

export default AddAddress;
