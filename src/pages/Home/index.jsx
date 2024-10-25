import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct, nextPage, prevPage } from '../../app/features/Product/actions';
import CardProduct from '../../components/CardProduct';
import CardProductPlaceholder from '../../components/CardProductPlaceholder';
import './index.css';
import Pagination from '../../components/Paginate';
import Tag from '../../components/Tag';


const Home = ({ isLoggedIn }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => {
        console.log('Current state:', state.product.category);
        return state.product.data || [];
    })
        // state.product.data || []);
    const totalItems = useSelector((state) => state.product.totalItems);
    const isLoading = useSelector((state) => state.product.status) === 'process';
    const currentPage = useSelector((state) => state.product.currentPage);
    const productsPerPage = useSelector((state) => state.product.perPage);
    const category = useSelector((state) => state.product.category);

    useEffect(() => {
        dispatch(fetchProduct());
        
    }, [dispatch, currentPage, category]);
        console.log('Fetched products:', products);
        console.log('Total items after fetch:', totalItems);
    const handleNextPage = () => {
        dispatch(nextPage());
    };

    const handlePrevPage = () => {
        dispatch(prevPage());
    };


    const indexOfLastProduct = currentPage * productsPerPage;

    return (
        <div>
            <div className='tag-page'>
                <div className='tag-list'>
                    <Tag />
                </div>
            </div>
            <div className='product-page'>
                <div className="product-list">
                    {isLoading ? (
                        <>
                            <CardProductPlaceholder />
                            <CardProductPlaceholder />
                            <CardProductPlaceholder />
                        </>
                    ) : products.length > 0 ? (
                        
                        products.map(product => (
                            <CardProduct key={product._id} product={product} isLoggedIn={isLoggedIn}/>
                        ))
                    ) : (
                        <p>No Products Available</p>
                    )}
                </div>    
                <div className="pagination">
                    <Pagination 
                        handlePrevPage={handlePrevPage}
                        handleNextPage={handleNextPage}
                        currentPage={currentPage}
                        totalItems={totalItems}
                        productsPerPage={productsPerPage}
                        indexOfLastProduct={indexOfLastProduct}
                    />
                </div>
            </div>
        </div>
        
        
    );
};

export default Home