
import React, { useState} from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SiHomebridge, BsToggles2, MdLogout, MdSearch } from '../assets/icons';
import { buttonClick, fadeInOut , slideTop} from '../animations';
import { motion } from 'framer-motion';
import { Avatar } from '../assets';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../config/firebase.config';
import { setUserNull } from '../context/actions/userActions';



const DBHeader = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const firebaseAuth = getAuth(app);
  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navigate('/login', { replace: true });
      })
      .catch((err) => console.log(err));
  };
  
  const Home = () => {
        navigate('/mainpage', { replace: true });
      }
     
  
  

  return (
    <motion.div
      {...fadeInOut}
      className="w-full flex items-center justify-between gap-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <motion.p
          className="text-2xl text-headingColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Welcome to our Website{' '}
          {user?.name && (
            <motion.span
              className="block text-base text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {`Hello ${user?.name}...!`}
            </motion.span>
          )}
        </motion.p>
      </div>

      <div className="flex items-center justify-center gap-4">
        <motion.div
          className="flex items-center justify-center gap-3 px-4 py-2 bg-lightOverlay backdrop-blur-md rounded-md shadow-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <MdSearch className="text-gray-400 text-2xl" />
          <input
            type="text"
            placeholder="Search Here..."
            className="border-none outline-none bg-transparent w-32 text-base font-semibold text-textColor"
          />
          <BsToggles2 className="text-gray-400 text-2xl" />
        </motion.div>

        <motion.div
          {...buttonClick}
          className="w-10 h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center"
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.8, rotate: -10 }}
        >
          <SiHomebridge className="text-gray-400 text-xl"onClick={Home} />
        </motion.div>

        <div className="flex items-center justify-center gap-2">
          

          {user ? (
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
           <div className="flex items-center justify-center gap-2">
          <motion.div
            className="w-10 h-10 rounded-md shadow-md cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.2, rotate: 5 }}
          >
            <motion.img
              className="w-full h-full object-cover"
              src={user?.picture ? user?.picture : Avatar}
              whileHover={{ scale: 1.2, rotate: -5 }}
              referrerPolicy="no-referrer"
            />
          </motion.div>
            </div>
            {isMenuOpen && (
              <motion.div
                {...slideTop}
                className="z-50 px-2 py-2 w-28 bg-white backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4"
              >
                
             
                <Link
                  className="text-center items-center  hover:text-red-500 text-xl text-textColor"
                  to="/user-orders"
                >
                  Orders
                </Link>
                
               
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
          <motion.div
            onClick={signOut}
            {...buttonClick}
            className="w-10 h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.8, rotate: -10 }}
          >
            <MdLogout className="text-gray-400 text-xl" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DBHeader;
