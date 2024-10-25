import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setKeyword, fetchProduct } from '../../app/features/Product/actions';
import './index.css';
import { getCategories } from '../../app/api/product';
import imgCart from '../../assets/img/cart.png';
import imgLogo from '../../assets/img/logo1.png';

const Navigation = ({ isLoggedIn, setIsLoggedIn }) => {
    const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const cartItems = useSelector(state => state.cart);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const fetchCategories = async() => {
            try {
                const response = await getCategories();
                console.log(response);
                setCategories(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCategories();
    }, [])

    const handleMenu = () => {
        dispatch(setCategory('')); 
        dispatch(setKeyword('')); 
        dispatch(fetchProduct()); 
        setSearchKeyword('');
      };

    const handleCategoryChange = (category) => {
        const selectedCategory = category
        // const selectedCategory = event.target.value;
        console.log(selectedCategory); 
        dispatch(setCategory(selectedCategory));
        setIsDropdownOpen(false);
    };


    const handleSearch = (e) => {
        e.preventDefault();
        console.log(e)
        dispatch(setKeyword(searchKeyword));
        dispatch(fetchProduct());
    };

    const getTotalCartItems = () => {
        return cartItems.reduce((total, item) => total + item.qty, 0);
    };
    
    return (
        <div>
            <div className="navbar">
                <h4 className="navbar-brand">
                    <img src={imgLogo} alt="Logo" className="imgLogo" />
                    <NavLink to="/" onClick={handleMenu} className="linkMenu">                        
                        Eduwork-Store
                    </NavLink>
                </h4>
                <ul className="link-wrapper">
                    <li className="link">
                        <NavLink to="/" onClick={handleMenu} className="linkMenu">Home</NavLink>
                    </li>
                    <li className="link">
                        <div className="dropdown linkMenu">
                            <button onClick={toggleDropdown} className="dropdown-toggle">
                                Category
                            </button>
                            
                                <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                                    {categories.map((category) => (
                                        <li key={category._id}>
                                            <button onClick={() => handleCategoryChange(category.name)} className="link-category">{category.name}</button>
                                        </li>
                                    ))}

                                </ul>
                            
                        </div>
                    </li>
                    <li className="link">
                    <form onSubmit={handleSearch} >
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="search-bar" 
                                value={searchKeyword} 
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                        </form>
                    </li>
                    <li className="link cart-link">
                        <NavLink to={isLoggedIn ? '/cart' : '/login'} className="linkMenu">
                        <img src={imgCart} alt='imgCart' className='imgCart'></img>
                        {getTotalCartItems() > 0 && (
                                <span className="cart-badge">{getTotalCartItems()}</span>
                            )}
                        </NavLink>
                    </li>
                    {isLoggedIn ? (
                        <>
                            <li className="link">
                                <NavLink to="/account" className="linkMenu">Account</NavLink>
                            </li>
                        </>
                    ) : (
                        <li className="link">
                            <NavLink to="/login" className="linkMenu">Login</NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navigation