import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInOut, slideIn } from '../animations';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { BsExclamationTriangleFill } from 'react-icons/bs';

const Alert = ({ type, message }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 2000); // Auto-close the alert after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const getIconAndColor = () => {
    switch (type) {
      case 'success':
        return { icon: <FaCheck className="text-xl text-emerald-700" />, color: 'emerald' };
      case 'warning':
        return { icon: <BsExclamationTriangleFill className="text-xl text-orange-700" />, color: 'orange' };
      case 'danger':
        return { icon: <BsExclamationTriangleFill className="text-xl text-red-700" />, color: 'red' };
      case 'info':
        return { icon: <BsExclamationTriangleFill className="text-xl text-blue-700" />, color: 'blue' };
      default:
        return { icon: null, color: 'gray' };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          {...slideIn}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className={`fixed z-50 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-${color}-300 shadow-md flex items-center gap-4 pl-6`}
        >
          {icon}
          <p className={`text-xl text-${color}-700`}>{message}</p>
          <button
            onClick={handleClose}
            className={`text-${color}-700`}
            style={{ marginLeft: 'auto' }}
          >
            <FaTimes className="text-xl" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
