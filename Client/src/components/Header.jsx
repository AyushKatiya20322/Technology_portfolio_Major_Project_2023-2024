import React, { useState, useEffect } from 'react';
import { Logo, Avatar } from '../assets';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdLogout, MdShoppingCart } from '../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase.config';
import { setUserNull } from '../context/actions/userActions';
import { setCartOn } from '../context/actions/displayCartAction';
import { isActiveStyles, isNotActiveStyles } from '../utils/styles';
import { buttonClick, slideTop } from '../animations';

const Header = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const firebaseAuth = getAuth(app);

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      setIsMenuOpen(false);
    }
  };

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navigate('/login', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  const navLinks = [
    { path: '/', title: 'Home' },
    { path: '/menu', title: 'Menu' },
    { path: '/services', title: 'Services' },
    { path: '/aboutus', title: 'About Us' },
  ];

  return (
    <header className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6">
      <NavLink to="/" className="flex items-center justify-center gap-4">
        <img src={Logo} className="w-12" alt="" />
        <p className="font-semibold text-xl">Radhe Radhe</p>
      </NavLink>
      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex items-center justify-center gap-16">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              className={({ isActive }) =>
                isActive ? isActiveStyles : isNotActiveStyles
              }
              to={link.path}
            >
              {link.title}
            </NavLink>
          ))}
        </ul>
        <motion.div
          {...buttonClick}
          onClick={() => dispatch(setCartOn())}
          className="relative cursor-pointer"
        >
          <MdShoppingCart className="text-3xl text-textColor" />
          {cart?.length > 0 && (
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 -right-1">
              <p className="text-primary text-base font-semibold">
                {cart?.length}
              </p>
            </div>
          )}
        </motion.div>
        {user ? (
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            <div className="w-12 h12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
              <motion.img
                className="w-full h-full object-cover"
                src={user?.picture ? user?.picture : Avatar}
                whileHover={{ scale: 0.5 }}
                referrerPolicy="no-referrer"
              />
            </div>
            {isMenuOpen && (
              <motion.div
                {...slideTop}
                className="px-6 py-4 w-48 bg-white backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4"
              >
                {user?.user_id === process.env.REACT_APP_ADMIN_ID && (
                  <Link
                    className="hover:text-red-500 text-xl text-textColor"
                    to="/dashboard/home"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  className="hover:text-red-500 text-xl text-textColor"
                  to="/profile"
                >
                  My Profile
                </Link>
                <Link
                  className="hover:text-red-500 text-xl text-textColor"
                  to="/user-orders"
                >
                  Orders
                </Link>
                <hr />
                <motion.div
                  {...buttonClick}
                  onClick={signOut}
                  className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-200 hover:bg-gray-200 gap-3"
                >
                  <MdLogout className="text-2xl text-textColor group-hover:: text-headingColor" />
                  <p className="text-textColor text-xl group-hover::text-textColor text-xl">
                    Sign Out
                  </p>
                </motion.div>
              </motion.div>
            )}
          </div>
        ) : (
          <NavLink to="/login">
            <motion.button
              {...buttonClick}
              className="px-4 py-4 rounded-md shadow-md bg-lightOverlay border border-red-300 cursor-pointer"
            >
              Login
            </motion.button>
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
